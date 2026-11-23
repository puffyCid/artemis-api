import { FileError } from "../filesystem/errors";
import { MacosError } from "./errors";
import { take } from "../nom/parsers";
import { NomError } from "../nom/error";
import { Endian, nomUnsignedFourBytes } from "../nom/helpers";
import { nomUnsignedEightBytes } from "../nom/mod";
import { EncodingError } from "../encoding/errors";
import { Biome } from "../../types/macos/biome";
import { encode } from "../encoding/base64";
import { parseProtobuf } from "../encoding/protobuf";
import { getPlist } from "./plist";
import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../types/filesystem/accessor";
import { Accessor } from "../filesystem/accessor";

/**
 * A **very** experimental and simple function to parse BIOME data
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param [app_focus_only=true] Only parse App.InFocus Biome files. Default is true
 * @param alt_path Full path to alternative BIOME file
 * @returns Array of `Biome` objects
 */
export function parseBiome(protocol = AccessorProtocol.Host, app_focus_only = true, alt_path?: string): Biome[] {
  const paths = alt_path ? [ alt_path ] : [
    "/Users/*/Library/Biome/streams/*/*/local/*",
    "/Users/*/Library/Biome/streams/*/*/local/tombstone/*",
    "/private/var/db/biome/streams/*/*/local/*",
    "/private/var/db/biome/streams/*/*/local/tombstone/*",
  ];

  const accessor = new Accessor();
  const biome_array: Biome[] = [];
  for (const path of paths) {
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${path}: ${matches}`);
      continue;
    }

    for (const entry of matches) {
      if (entry.meta.kind !== EntryKind.File) {
        continue;
      }

      if (app_focus_only && !entry.meta.full_path.toLowerCase().includes("app.infocus")) {
        continue;
      }

      const records = extractBiome(entry, accessor);
      if (records instanceof MacosError) {
        console.warn(`Did not extract BIOMEs from ${entry}: ${records}`);
        continue;
      }

      const biome: Biome = {
        path: entry.meta.display_path,
        raw: [],
      };
      for (const record of records) {
        // Skip empty records
        if (
          record.protobuf_bytes.at(0) === undefined ||
          record.protobuf_bytes.at(0) === 0
        ) {
          continue;
        }

        if (record.protobuf_bytes.slice(0, 6).toString() === new Uint8Array([ 98, 112, 108, 105, 115, 116 ]).toString()) {
          // Sometimes BIOME files will contain binary plist instead of Protobuf data
          const plist_data = getPlist(record.protobuf_bytes);
          if (plist_data instanceof MacosError) {
            continue;
          }
          if (Array.isArray(plist_data)) {
            biome.plist_data = biome.plist_data?.concat(plist_data as Record<string, unknown>[]);
            continue;
          } else if (plist_data instanceof Uint8Array) {
            continue;
          }
          biome.plist_data?.push(plist_data);
          continue;
        }
        const results = parseProtobuf(record.protobuf_bytes);
        if (results instanceof EncodingError) {
          console.error(
            `Failed to parse all protobuf data for ${entry}: ${results}`,
          );
          biome.raw.push({ "unknown": encode(record.protobuf_bytes) });
          continue;
        }

        biome.raw.push(results);
      }

      biome_array.push(biome);
    }
  }

  return biome_array;
}

/**
 * Function to extract the bytes associated with the BIOME data
 * @param entry `GlobMatch` object to BIOME file
 * @param accessor `Accessor` instance to use to read BIOME data
 * @returns Array of `BiomeRecord` or `MacosError`
 */
function extractBiome(entry: GlobMatch, accessor: Accessor): BiomeRecord[] | MacosError {
  const raw_bytes = accessor.readFileHandle(entry.handle as FileHandle);
  if (raw_bytes instanceof FileError) {
    return new MacosError(`BIOME`, `failed to read '${entry.meta.display_path}': ${raw_bytes}`);
  }

  const check_sig = nomUnsignedFourBytes(raw_bytes, Endian.Le);
  if (check_sig instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header sig for '${entry.meta.display_path}': ${check_sig}`,
    );
  }
  let header_size = 56;

  // If SEGB sig is at start, then its version 2. Otherwise its version 1
  const segb_sig = 1111967059;
  if (check_sig.value !== segb_sig) {
    // Parse SEGB version 1
    const header_bytes = take(raw_bytes, header_size);
    if (header_bytes instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to get header data for '${entry.meta.display_path}': ${header_bytes}`,
      );
    }

    let remaining_bytes = header_bytes.remaining as Uint8Array;

    const record_size = 32;
    const records: BiomeRecord[] = [];
    while ((remaining_bytes as Uint8Array).byteLength >= record_size) {
      const record_bytes = new Uint8Array(remaining_bytes.buffer.slice(
        0,
        record_size,
      ));
      remaining_bytes = new Uint8Array(
        remaining_bytes.buffer.slice(record_size),
      );

      const biome_record = parseRecord(record_bytes, remaining_bytes);
      if (biome_record instanceof MacosError) {
        break;
      }
      remaining_bytes = biome_record.remaining;

      if (biome_record.state !== BiomeState.Written) {
        continue;
      }
      records.push(biome_record);
    }

    return records;
  }

  // Parse SEGB version 2
  header_size = 32;
  const header_bytes = take(raw_bytes, header_size);
  if (header_bytes instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header v2 data for '${entry.meta.display_path}': ${header_bytes}`,
    );
  }

  const sig = nomUnsignedFourBytes(raw_bytes, Endian.Le);
  if (sig instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header sig for '${entry.meta.display_path}': ${sig}`,
    );
  }

  const entries = nomUnsignedFourBytes(sig.remaining, Endian.Le);
  if (entries instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header v2 entries for '${entry.meta.display_path}': ${entries}`,
    );
  }

  const entry_size = 16;
  const total_size = entries.value * entry_size;

  // In BIOME version 2, Apple moved the entry data to the bottom of the file...
  // Need to get total last bytes
  if (total_size > raw_bytes.length) {
    return new MacosError(
      `BIOME`,
      `failed to get header v2 entries data for '${entry.meta.display_path}'. Total size too large`,
    );
  }

  const footer_bytes = raw_bytes.slice(raw_bytes.length - total_size);
  const records = parseRecordV2(
    header_bytes.remaining as Uint8Array,
    footer_bytes,
    entries.value,
  );
  return records;
}

interface BiomeRecord {
  size: number;
  created: number;
  created2: number;
  protobuf_bytes: Uint8Array;
  remaining: Uint8Array;
  state: BiomeState,
}

enum BiomeState {
  Written = 1,
  Deleted = 3,
  Unknown = 4,
}

/**
 * Function to parse BIOME version 1
 * @param raw_bytes Raw bytes associated with BIOME version 1
 * @param remaining_bytes Remaining BIOME bytes
 * @returns A `BiomeRecord` or `MacosError`
 */
function parseRecord(
  raw_bytes: Uint8Array,
  remaining_bytes: Uint8Array,
): BiomeRecord | MacosError {
  const protobuf_size = nomUnsignedFourBytes(raw_bytes, Endian.Le);
  if (protobuf_size instanceof NomError) {
    return new MacosError(`BIOME`, `failed to parse protobuf size: ${protobuf_size}`);
  }
  if (protobuf_size.value === 0) {
    return new MacosError(`BIOME`, "protobuf size is zero");
  }

  /**
 * Known states:
 * 1 - Written
 * 3 - Deleted
 * 4 - Unknown
 */
  const state = nomUnsignedFourBytes(protobuf_size.remaining, Endian.Le);
  if (state instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get state for version 1: ${state}`,
    );
  }


  const created = nomUnsignedEightBytes(state.remaining, Endian.Le);
  if (created instanceof NomError) {
    return new MacosError(`BIOME`, `failed to parse biome created: ${created}`);
  }
  const created2 = nomUnsignedEightBytes(created.remaining, Endian.Le);
  if (created2 instanceof NomError) {
    return new MacosError(`BIOME`, `failed to parse biome created2: ${created2}`);
  }
  const align = 8;
  let align_size = protobuf_size.value % align;
  if (align_size !== 0) {
    align_size = align - align_size;
  }

  const size = protobuf_size.value + align_size;
  const proto_bytes = take(remaining_bytes, size);
  if (proto_bytes instanceof NomError) {
    return new MacosError(`BIOME`, `failed to parse get protobuf bytes: ${proto_bytes}`);
  }

  const record: BiomeRecord = {
    size,
    created: Number(created.value),
    created2: Number(created2.value),
    protobuf_bytes: proto_bytes.nommed as Uint8Array,
    remaining: proto_bytes.remaining as Uint8Array,
    state: state.value
  };

  return record;
}

interface BiomeFooter {
  end_offset: number;
  state: number;
  entry_created: number;
}

/**
 * Function to parse BIOME version 2
 * @param raw_bytes Raw bytes associated with BIOME version 1
 * @param footer_bytes Footer bytes associated with BIOME
 * @param entries  Number of entries in BIOME data
 * @returns An array of `BiomeRecord` or `MacosError`
 */
function parseRecordV2(
  raw_bytes: Uint8Array,
  footer_bytes: Uint8Array,
  entries: number,
): BiomeRecord[] | MacosError {
  let remaining_bytes = footer_bytes;
  let count = 0;

  const footers: BiomeFooter[] = [];
  while (count < entries) {
    const offset = nomUnsignedFourBytes(remaining_bytes, Endian.Le);
    if (offset instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to get end offset: ${offset}`,
      );
    }

    /**
     * Known states:
     * 1 - Written
     * 3 - Deleted
     * 4 - Unknown
     */
    const state = nomUnsignedFourBytes(offset.remaining, Endian.Le);
    if (state instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to get state: ${state}`,
      );
    }

    const created = nomUnsignedEightBytes(state.remaining, Endian.Le);
    if (created instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to entry created: ${created}`,
      );
    }

    remaining_bytes = created.remaining;
    count++;

    const record: BiomeFooter = {
      end_offset: offset.value,
      state: state.value,
      entry_created: Number(created.value),
    };

    footers.push(record);
  }

  // Last footer entry is the first record
  footers.reverse();
  const align = 4;

  const records: BiomeRecord[] = [];
  remaining_bytes = raw_bytes;
  let previous_size = 0;
  for (const footer of footers) {
    // Unknown State identified
    if (footer.state === BiomeState.Unknown) {
      continue;
    }
    let align_size = (footer.end_offset - previous_size) % align;
    if (align_size !== 0) {
      align_size = 4 - align_size;
    }

    const size = footer.end_offset + align_size - previous_size;
    previous_size += size;

    const proto_bytes = take(remaining_bytes, size);
    if (proto_bytes instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to nom protobuf bytes: ${proto_bytes}`,
      );
    }

    // Might be two 4 byte values. Timestamp? and flag?
    const unknown_bytes = nomUnsignedEightBytes(
      proto_bytes.nommed as Uint8Array,
      Endian.Le,
    );
    if (unknown_bytes instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to get start of protobuf bytes: ${unknown_bytes}`,
      );
    }
    const record: BiomeRecord = {
      size,
      created: Number(footer.entry_created),
      created2: 0,
      protobuf_bytes: unknown_bytes.remaining,
      remaining: new Uint8Array(),
      state: footer.state,
    };
    records.push(record);

    remaining_bytes = proto_bytes.remaining as Uint8Array;
  }

  return records;
};
