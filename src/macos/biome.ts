import { FileError } from "../filesystem/errors.ts";
import { glob, readFile, stat } from "../filesystem/files.ts";
import { MacosError } from "./errors.ts";
import { take } from "../nom/parsers.ts";
import { NomError } from "../nom/error.ts";
import { Endian, nomUnsignedFourBytes } from "../nom/helpers.ts";
import { nomUnsignedEightBytes } from "../nom/mod.ts";
import { Nom } from "../../types/nom/nom.d.ts";
import { extractAppFocus } from "./biomes/targets.ts";
import { encode } from "../encoding/base64.ts";

// version 2: https://cellebrite.com/en/understanding-and-decoding-the-newest-ios-segb-format/
// version 1: https://blog.d204n6.com/search/label/Breaking%20Down%20The%20Biomes

/*
TODO:
1. Parse version 2
2. Migrate to slices for record parsing. Takes too long otherwise! :)
*/

export function parseBiome(alt_file?: string) {
  let paths = [];
  if (alt_file != undefined) {
    paths = [alt_file];
  } else {
    // Glob both local and tombstone entries
    const glob_paths = [
      "/Users/*/Library/Biome/streams/*/*/local/*",
      "/Users/*/Library/Biome/streams/*/*/local/tombstone/*",
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

  console.log(paths);
  const focus = [];
  const failed_records = [];
  // Now loop through Biomes and parse supported entries
  for (const entry of paths) {
    // Stat to avoid any directories
    const stat_info = stat(entry);
    if (stat_info instanceof FileError || stat_info.is_directory) {
      continue;
    }

    console.log(entry);

    const records = extractBiome(entry);
    if (records instanceof MacosError) {
      console.log(records);
      continue;
    }

    for (const record of records) {
      // Skip empty records
      if (
        record.protobuf_bytes.at(0) === undefined ||
        record.protobuf_bytes.at(0) === 0
      ) {
        continue;
      }

      if (entry.includes("App.InFocus")) {
        const results = extractAppFocus(record.protobuf_bytes);
        if (results instanceof MacosError) {
          console.error(`Failed to parse all records for ${entry}: ${results}`);
          return [];
          failed_records.push(encode(record.protobuf_bytes));
          continue;
        }
        results.entry_created = record.created;
        focus.push(results);
      }
    }
    //break;
  }
}

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

    let remaining_bytes = header_bytes.remaining;

    const record_size = 32;
    const records = [];
    console.log("getting records");
    while ((remaining_bytes as Uint8Array).byteLength >= record_size) {
      const record_bytes = take(remaining_bytes, record_size);
      if (record_bytes instanceof NomError) {
        return new MacosError(
          `BIOME`,
          `failed to get record data for ${path}: ${record_bytes}`,
        );
      }

      const biome_record = parseRecord(record_bytes);
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
  protobuf_bytes: Uint8Array;
  remaining: Uint8Array;
}

function parseRecord(
  raw_bytes: Nom,
): BiomeRecord | MacosError {
  const protobuf_size = nomUnsignedFourBytes(
    raw_bytes.nommed as Uint8Array,
    Endian.Le,
  );
  if (protobuf_size instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to nom protobuf size: ${protobuf_size}`,
    );
  }

  const unknown = nomUnsignedFourBytes(protobuf_size.remaining, Endian.Le);
  if (unknown instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to nom unknown bytes value: ${unknown}`,
    );
  }

  const created = nomUnsignedEightBytes(unknown.remaining, Endian.Le);
  if (created instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to nom created timestamp: ${created}`,
    );
  }

  const created2 = nomUnsignedEightBytes(created.remaining, Endian.Le);
  if (created2 instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to nom created2 timestamp: ${created2}`,
    );
  }

  const align = 8;

  let align_size = protobuf_size.value % align;
  if (align_size != 0) {
    align_size = 8 - align_size;
  }

  const size = protobuf_size.value + align_size;
  const proto_bytes = take(raw_bytes.remaining, size);
  if (proto_bytes instanceof NomError) {
    return new MacosError(
      `BIOME`,
      `failed to nom protobuf bytes: ${proto_bytes}`,
    );
  }

  const record: BiomeRecord = {
    size,
    created: created.value,
    protobuf_bytes: proto_bytes.nommed as Uint8Array,
    remaining: proto_bytes.remaining as Uint8Array,
  };

  return record;
}

interface BiomeFooter {
  end_offset: number;
  state: number;
  entry_created: number;
}

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
    if (size < 0) {
      console.log(footer);
      console.log(`Entries: ${footers.length}`);
      console.log(`Prev size: ${previous_size}`);
      console.log(`Size: ${size}`);
      console.log(`Remaining bytes: ${remaining_bytes.length}`);
    }

    const proto_bytes = take(remaining_bytes, size);
    if (proto_bytes instanceof NomError) {
      return new MacosError(
        `BIOME`,
        `failed to nom protobuf bytes: ${proto_bytes}`,
      );
    }

    const record: BiomeRecord = {
      size,
      created: footer.entry_created,
      protobuf_bytes: proto_bytes.nommed as Uint8Array,
      remaining: new Uint8Array(),
    };
    records.push(record);

    remaining_bytes = proto_bytes.remaining as Uint8Array;
  }

  return records;
}
