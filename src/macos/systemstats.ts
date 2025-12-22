import { ProtoTag } from "../../types/encoding/protobuf";
import { GlobInfo } from "../../types/filesystem/globs";
import { SystemStats } from "../../types/macos/systemstats";
import { EncodingError } from "../encoding/errors";
import { parseProtobuf } from "../encoding/protobuf";
import { extractUtf8String } from "../encoding/strings";
import { FileError } from "../filesystem/errors";
import { glob, readFile } from "../filesystem/files";
import { NomError } from "../nom/error";
import { Endian, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../nom/helpers";
import { take } from "../nom/parsers";
import { unixEpochToISO } from "../time/conversion";
import { MacosError } from "./errors";

/**
 * Function to extract macOS system stats
 * @param alt_file Optional alternative path to stats file(safari)
 * @returns Array of `SystemStats` or `MacosError`
 */
export function parseSystemStats(alt_file?: string): SystemStats[] | MacosError {
    let path = "/var/db/systemstats/*";
    if (alt_file !== undefined) {
        path = alt_file;
    }
    const files = glob(path);
    if (files instanceof FileError) {
        return new MacosError(`STATS`, `failed to glob path to stats files: ${files}`);
    }

    let stats: SystemStats[] = [];
    for (const entry of files) {
        if (entry.filename.endsWith(".stats")) {
            const values = parseStats(entry);
            if (values instanceof MacosError) {
                continue;
            }
            stats = stats.concat(values);
        }
    }

    return stats;
}

/// Parse the stats file header
function parseStats(stats_file: GlobInfo): SystemStats[] | MacosError {
    const path = stats_file.full_path;
    const bytes = readFile(path);
    if (bytes instanceof FileError) {
        return new MacosError(`STATS`, `failed to read file ${path}: ${bytes}`);
    }

    // Sig seems to be `bX`. Ex: b7, b8, b9
    // May vary by stats type?
    const sig = nomUnsignedTwoBytes(bytes, Endian.Le);
    if (sig instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file ${path} sig: ${sig}`);
    }

    // Flag maybe? Always 0xA
    const unknown = nomUnsignedOneBytes(sig.remaining);
    if (unknown instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file ${path} unknown byte: ${unknown}`);
    }

    // Size of next string value. Always 0xE. May be part of unkonwn byte above (0xAE). But not 100% sure
    const size = nomUnsignedOneBytes(unknown.remaining);
    if (size instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file ${path} size byte: ${size}`);
    }

    const version_bytes = take(size.remaining, size.value);
    if (version_bytes instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file ${path} version byte: ${version_bytes}`);
    }

    // Only seen `systemstats_v1`
    const version = extractUtf8String(version_bytes.nommed as Uint8Array);

    // Remaining bytes are protobuf data_type
    const value = parseProtobuf(version_bytes.remaining as Uint8Array);
    if (value instanceof EncodingError) {
        return new MacosError(`STATS`, `failed to parse file ${path} protobuf byte: ${value}`);
    }

    return extractInfo(value, stats_file, version)
}

/// Try to extract Protobuf data into meaningful info
function extractInfo(proto_data: Record<string, ProtoTag>, stats_file: GlobInfo, version: string): SystemStats[] {
    const values: SystemStats[] = [];
    const stat: SystemStats = {
        source_path: stats_file.full_path,
        source_file: stats_file.filename,
        version,
        message: "",
        datetime: "",
        timestamp_desc: "Stats Event",
        artifact: "SystemStats",
        data_type: "macos:systemstats:entry",
        build_version: ""
    };
    for (const entry in proto_data) {
        // Get initial base values
        switch (proto_data[entry]?.tag.field) {
            case 6: {
                stat.build_version = proto_data[entry].value as string;
                break;
            }
            case 3: {
                stat.datetime = unixEpochToISO(proto_data[entry].value as number) as string;
                break;
            }
        }

        // Check for nested values
        // This should be the last value in the base data above
        // Tons of data here
        if (Array.isArray(proto_data[entry]?.value)) {
            for (const value of proto_data[entry].value as Record<string, ProtoTag>[]) {
                stat.message = JSON.stringify(value);
                values.push(Object.assign({}, stat));
            }
        }
    }
    return values;
}