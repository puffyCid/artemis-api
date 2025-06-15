import { NextcloudClientSyncLog, SyncInstruction } from "../../../../types/applications/nextcloud";
import { unixEpochToISO } from "../../../time/conversion";

/**
 * Parse the Nextcloud client sync logs
 * @param text Sync log text data
 * @param version Nextcloud client version
 * @param sync_log_path Source of the log file
 * @returns Array of `NextcloudClientSyncLog`
 */
export function nextcloudSyncLogs(text: string, version: string, sync_log_path: string): NextcloudClientSyncLog[] {
    const lines = text.split("\n");
    const logs: NextcloudClientSyncLog[] = [];
    let start_time = "1970-01-01T00:00:00Z";
    for (const entry of lines) {
        if (!entry.startsWith("#=#=#=#=# Propagation starts") && !entry.includes("|") || entry.startsWith("# timestamp")) {
            continue;
        }

        if (entry.startsWith("#=#=#=#=# Propagation starts")) {
            const sync_start = entry.replace("#=#=#=#=# Propagation starts ", "");
            start_time = sync_start.split(" ").at(0) ?? "1970-01-01T00:00:00Z";
            continue;
        }


        // Everything now is sync log entries
        // As of client version 3.16.3daily the format has 15 fields:
        // # timestamp | duration | file | instruction | dir | modtime | etag | size | fileId | status | errorString | http result code | other size | other modtime | X-Request-ID
        const fields = entry.split("|");
        if (version.startsWith("3") || fields.length === 16) {
            const log: NextcloudClientSyncLog = {
                datetime: getTimestamp(start_time, fields.at(0) ?? ""),
                duration: getNumberValue(fields.at(1) ?? ""),
                file: fields.at(2) ?? "",
                instruction: getInstruction(fields.at(3) ?? ""),
                dir: getNumberValue(fields.at(4) ?? ""),
                modified: unixEpochToISO(getNumberValue(fields.at(5) ?? "")),
                etag: fields.at(6) ?? "",
                size: getNumberValue(fields.at(7) ?? ""),
                file_id: fields.at(8) ?? "",
                status: getNumberValue(fields.at(9) ?? ""),
                error_string: fields.at(10) ?? "",
                http_code: getNumberValue(fields.at(11) ?? ""),
                other_size: getNumberValue(fields.at(12) ?? ""),
                other_modified: fields.at(13) ?? "",
                x_request_id: fields.at(14) ?? "",
                sync_log_path,
                data_type: "cloud:nextcloud:log:sync",
                timestamp_desc: "File Sync",
                artifact: "Nextcloud Sync Log",
                message: fields.at(2) ?? "",
            };

            logs.push(log);
            continue;
        }

        console.warn(`Got unexpected number of log fields ${fields.length} for version ${version}`);
    }

    return logs;
}

/**
 * Get timestamp of sync entry
 * @param start_time Start time of the log sync
 * @param sync_time Sync time of the entry. It may be empty or in format HH:mm:ssZ
 * @returns ISO8601 format timestamp
 */
function getTimestamp(start_time: string, sync_time: string): string {
    const empty = 0;
    if (sync_time.length === empty) {
        return start_time;
    }

    return `${start_time.split("T").at(0) ?? ""}T${sync_time}`;
}

/**
 * Parse entry string as a number
 * @param value Number value as string
 * @returns Parse string value as a number
 */
function getNumberValue(value: string): number {
    const empty = 0;
    if (value.length === empty) {
        return empty;
    }

    return Number(value);
}

/**
 * Determine sync instruction value
 * @param instruct Instruction bitwise value
 * @returns `SyncInstruction` enum value
 */
function getInstruction(instruct: string): SyncInstruction {
    switch (instruct) {
        case "0": return SyncInstruction.None;
        case "1": return SyncInstruction.Eval;
        case "2": return SyncInstruction.Remove;
        case "4": return SyncInstruction.New;
        case "2048": return SyncInstruction.Rename;
        case "16": return SyncInstruction.Conflict;
        case "32": return SyncInstruction.Ignore;
        case "64": return SyncInstruction.Sync;
        case "128": return SyncInstruction.StatError;
        case "256": return SyncInstruction.Error;
        case "512": return SyncInstruction.TypeChange;
        case "1024": return SyncInstruction.UpdateMetadata;
        case "4096": return SyncInstruction.ClashConflict;
        case "8192": return SyncInstruction.UpdateVfsMetadata;
        case "16384": return SyncInstruction.UpdateEncryptionMetadata;
        default: return SyncInstruction.Unknown;
    }
}