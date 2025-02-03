import { FileError } from "../filesystem/errors.ts";
import { glob, readFile, stat } from "../filesystem/files.ts";
import { MacosError } from "./errors.ts";
import { take } from "../nom/parsers.ts";
import { NomError } from "../nom/error.ts";
import { Endian, nomUnsignedFourBytes } from "../nom/helpers.ts";
import { nomUnsignedEightBytes } from "../nom/mod.ts";
import { EncodingError } from "../encoding/errors.ts";
import { Biome } from "../../types/macos/biome.ts";
import { encode } from "../encoding/base64.ts";
import { parseProtobuf } from "../encoding/protobufv2.ts";

/**
 * A **very** experimental and simple function to parse BIOME data
 * @param [app_focus_only=true] Only parse App.InFocus Biome files. Default is true
 * @param alt_file Full path to alternative BIOME file
 * @returns Array of `Biome` objects
 */
export function parseBiome(app_focus_only = true, alt_file?: string): Biome[] {
  let paths = [];
  if (alt_file != undefined) {
    paths = [alt_file];
  } else {
    // Glob both local and tombstone entries
    const glob_paths = [
      "/Users/*/Library/Biome/streams/*/*/local/*",
      "/Users/*/Library/Biome/streams/*/*/local/tombstone/*",
      "/private/var/db/biome/streams/*/*/local/*",
      "/private/var/db/biome/streams/*/*/local/tombstone/*",
    ];

    for (const path of glob_paths) {
      const results = glob(path);
      if (results instanceof FileError) {
        console.warn(`Could not glob ${path}: ${results}`);
        continue;
      }

      for (const entry of results) {
        paths.push(entry.full_path);
      }
    }
  }

  const biome_array: Biome[] = [];
  // Now loop through Biomes and parse supported entries
  for (const entry of paths) {
    if (app_focus_only && !entry.toLowerCase().includes("app.infocu")) {
      continue;
    }

    // Stat to avoid any directories
    const stat_info = stat(entry);
    if (stat_info instanceof FileError || stat_info.is_directory) {
      continue;
    }

    const records = extractBiome(entry);
    if (records instanceof MacosError) {
      console.warn(`Did not extract BIOMEs from ${entry}: ${records}`);
      continue;
    }

    const biome: Biome = {
      path: entry,
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

  return biome_array;
}

/**
 * Function to extract the bytes associated with the BIOME data
 * @param path Path to BIOME file
 * @returns Array of `BiomeRecord` or `MacosError`
 */
function extractBiome(path: string): BiomeRecord[] | MacosError {
  const raw_bytes = readFile(path);
  if (raw_bytes instanceof FileError) {
    return new MacosError(`BIOME`, `failed to read ${path}: ${raw_bytes}`);
  }

  const check_sig = nomUnsignedFourBytes(raw_bytes, Endian.Le);
  if (check_sig instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header sig for ${path}: ${check_sig}`,
    );
  }
  let header_size = 56;

  // If SEGB sig is at start, then its version 2. Otherwise its version 1
  const segb_sig = 1111967059;
  if (check_sig.value != segb_sig) {
    // Parse SEGB version 1
    const header_bytes = take(raw_bytes, header_size);
    if (header_bytes instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to get header data for ${path}: ${header_bytes}`,
      );
    }

    let remaining_bytes = header_bytes.remaining as Uint8Array;

    const record_size = 32;
    const records = [];
    while ((remaining_bytes as Uint8Array).byteLength >= record_size) {
      const record_bytes = new Uint8Array(remaining_bytes.buffer.slice(
        0,
        record_size + 1,
      ));
      remaining_bytes = new Uint8Array(
        remaining_bytes.buffer.slice(record_size),
      );

      const biome_record = parseRecord(record_bytes, remaining_bytes);
      if (biome_record instanceof MacosError) {
        return biome_record;
      }

      if (
        biome_record.protobuf_bytes.at(0) === undefined ||
        biome_record.protobuf_bytes.at(0) === 0
      ) {
        remaining_bytes = biome_record.remaining;
        continue;
      }
      remaining_bytes = biome_record.remaining;

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
      `failed to get header v2 data for ${path}: ${header_bytes}`,
    );
  }

  const sig = nomUnsignedFourBytes(raw_bytes, Endian.Le);
  if (sig instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header sig for ${path}: ${sig}`,
    );
  }

  const entries = nomUnsignedFourBytes(sig.remaining, Endian.Le);
  if (entries instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to get header v2 entries for ${path}: ${entries}`,
    );
  }

  const entry_size = 16;
  const total_size = entries.value * entry_size;

  // In BIOME version 2, Apple moved the entry data to the bottom of the file...
  // Need to get total last bytes
  if (total_size > raw_bytes.length) {
    return new MacosError(
      `BIOME`,
      `failed to get header v2 entries data for ${path}. Total size too large`,
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
  const four_bytes = 4;
  const protobuf_size_buf = raw_bytes.buffer.slice(0, four_bytes + 1);
  const protobuf_size = new DataView(protobuf_size_buf).getUint32(0, true);
  if (protobuf_size === 0) {
    return new MacosError(`BIOME`, "protobuf size is zero");
  }

  //const unknown_buf = raw_bytes.buffer.slice(4, four_bytes * 2 + 1);

  const eight_bytes = 8;
  const created_buf = raw_bytes.buffer.slice(8, eight_bytes * 2 + 1);
  const created = new DataView(created_buf).getBigUint64(0, true);

  const created2_buf = raw_bytes.buffer.slice(16, eight_bytes * 3 + 1);
  const created2 = new DataView(created2_buf).getBigUint64(0, true);

  const align = 8;

  let align_size = protobuf_size % align;
  if (align_size != 0) {
    align_size = 8 - align_size;
  }

  const size = protobuf_size + align_size;
  const proto_bytes = new Uint8Array(remaining_bytes.buffer.slice(0, size + 1));

  const record: BiomeRecord = {
    size,
    created: Number(created),
    created2: Number(created2),
    protobuf_bytes: proto_bytes,
    remaining: new Uint8Array(remaining_bytes.buffer.slice(size)),
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

  const footers = [];
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
      entry_created: created.value,
    };

    footers.push(record);
  }

  // Last footer entry is the first record
  footers.reverse();
  const align = 4;

  const records = [];
  remaining_bytes = raw_bytes;
  let previous_size = 0;
  const unknown = 4;
  for (const footer of footers) {
    // Unknown State identified
    if (footer.state === unknown) {
      continue;
    }
    let align_size = (footer.end_offset - previous_size) % align;
    if (align_size != 0) {
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
      created: footer.entry_created,
      created2: 0,
      protobuf_bytes: unknown_bytes.remaining,
      remaining: new Uint8Array(),
    };
    records.push(record);

    remaining_bytes = proto_bytes.remaining as Uint8Array;
  }

  return records;
}
