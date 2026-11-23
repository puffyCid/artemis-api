import { ProtoTag } from "../../types/encoding/protobuf";
import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../types/filesystem/accessor";
import { SystemStats } from "../../types/macos/systemstats";
import { EncodingError } from "../encoding/errors";
import { parseProtobuf } from "../encoding/protobuf";
import { extractUtf8String } from "../encoding/strings";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { NomError } from "../nom/error";
import { Endian, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../nom/helpers";
import { take } from "../nom/parsers";
import { unixEpochToISO } from "../time/conversion";
import { MacosError } from "./errors";


/**
 * TODO:
 * 1. Add wall time to the absolute timestamp (field 10?)
 * 2. Extract more protobuf fields
 * 3. Add uuid parsing
 * 4. Support decompressing gzip data
 *    - binary plists may be found the gzip data
 * You can compare with systemstats command on macos `systemstats --show-events --all-process-data -f /var/db/systemstats/`
 * 
 * 
 * Reaearch field values:
 *  field 1: ID? Seems to increment by one
 *  field 10: Wall time that gets added to the abosolute time to get actual timestamp?
 */

/**
 * Function to extract macOS system stats
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to stats file(safari)
 * @returns Array of `SystemStats` or `MacosError`
 */
export function parseSystemStats(protocol = AccessorProtocol.Host, alt_path?: string): SystemStats[] | MacosError {
    const path = alt_path ?? "/var/db/systemstats/*";
    const accessor = new Accessor();

    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new MacosError(`STATS`, `failed to glob ${path}: ${matches}`);
    }

    let stats: SystemStats[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File && entry.meta.extension !== "stats") {
            continue;
        }

        const values = parseStats(entry, accessor);
        if (values instanceof MacosError) {
            continue;
        }
        stats = stats.concat(values);
    }

    return stats;
}

/**
 * Parse the stats file
 * @param entry `GlobMatch` object to the stats file
 * @param accessor `Accessor` instance to use to read the file
 * @returns Array of `SystemStats` or `MacosError`
 */
function parseStats(entry: GlobMatch, accessor: Accessor): SystemStats[] | MacosError {
    const bytes = accessor.readFileHandle(entry.handle as FileHandle);
    if (bytes instanceof FileError) {
        return new MacosError(`STATS`, `failed to read file '${entry.meta.display_path}': ${bytes}`);
    }

    // Sig seems to be `bX`. Ex: b7, b8, b9
    // May vary by stats type?
    const sig = nomUnsignedTwoBytes(bytes, Endian.Le);
    if (sig instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file '${entry.meta.display_path}' sig: ${sig}`);
    }

    // Flag maybe? Always 0xA
    const unknown = nomUnsignedOneBytes(sig.remaining);
    if (unknown instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file '${entry.meta.display_path}' unknown byte: ${unknown}`);
    }

    // Size of next string value. Always 0xE. May be part of Unknown byte above (0xAE). But not 100% sure
    const size = nomUnsignedOneBytes(unknown.remaining);
    if (size instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file '${entry.meta.display_path}' size byte: ${size}`);
    }

    const version_bytes = take(size.remaining, size.value);
    if (version_bytes instanceof NomError) {
        return new MacosError(`STATS`, `failed to parse file '${entry.meta.display_path}' version byte: ${version_bytes}`);
    }

    // Only seen `systemstats_v1`
    const version = extractUtf8String(version_bytes.nommed as Uint8Array);

    // Remaining bytes are protobuf data_type
    const value = parseProtobuf(version_bytes.remaining as Uint8Array);
    if (value instanceof EncodingError) {
        return new MacosError(`STATS`, `failed to parse file '${entry.meta.display_path}' protobuf byte: ${value}`);
    }

    return extractInfo(value, entry, version);
}

/// Try to extract Protobuf data into meaningful info
function extractInfo(proto_data: Record<string, ProtoTag>, entry: GlobMatch, version: string): SystemStats[] {
    const values: SystemStats[] = [];
    const stat: SystemStats = {
        evidence: entry.meta.display_path,
        source_file: entry.meta.filename,
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
        switch (proto_data[ entry ]?.tag.field) {
            case 6: {
                stat.build_version = proto_data[ entry ].value as string;
                break;
            }
            case 3: {
                stat.datetime = unixEpochToISO(proto_data[ entry ].value as number) as string;
                break;
            }
        }

        // Check for nested values
        // This should be the last value in the base data above
        // Tons of data here
        if (Array.isArray(proto_data[ entry ]?.value)) {
            for (const value of proto_data[ entry ].value as Record<string, ProtoTag>[]) {
                stat.message = JSON.stringify(value);
                values.push(Object.assign({}, stat));
            }
        }
    }
    return values;
}