import { RustDeskLogs, RustDeskProfiles } from "../../../types/applications/rustdesk";
import { FileError } from "../../filesystem/errors";
import { readLines } from "../../filesystem/files";
import { isFileEntry } from "../../filesystem/tree";
import { convertModifiedIso } from "../../time/conversion";
import { ApplicationError } from "../errors";

/**
 * Function to parse RustDesk logs
 * @param path Path to RustDesk log file
 * @param user `RustDeskUsers` object
 * @returns Array of `RustDeskLogs` or `ApplicationError`
 */
export function readLogs(profile: RustDeskProfiles, logs: RustDeskLogs[]) {
    const pattern = "log/*.log";
    const matches = profile.tree.glob(pattern);
    if (matches instanceof FileError) {
        console.warn(`Failed to glob for RustDesk logs: ${matches}`);
        return;
    }

    for (const entry of matches) {
        if (!isFileEntry(entry)) {
            continue;
        }

        const lines = readLines(entry.handle);
        if (lines instanceof FileError) {
            continue;
        }

        let multiline_log = "";
        for (let i = 0; i < lines.length; i++) {
            const line_value = lines[ i ];

            if (line_value === "" || line_value === undefined) {
                continue;
            }
            if (!line_value.startsWith("[")) {
                multiline_log += `${line_value}\n`;
                continue;
            }

            if (multiline_log !== "") {
                const previous_line = logs[ logs.length - 1 ];
                if (previous_line !== undefined) {
                    previous_line.message = previous_line.message.concat(multiline_log);
                    logs[ logs.length - 1 ] = previous_line;
                }

                multiline_log = "";
                continue;
            }

            const value = extractDetails(line_value, entry.meta.display_path, profile.remote_id);
            if (value instanceof ApplicationError) {
                continue;
            }
            logs.push(value);
        }
    }
}

/**
 * Parse details of the RustDesk log
 * @param log Log line
 * @param evidence Path to log file
 * @param remote_id ID associated with RustDesk
 * @returns `RustDeskLogs` or `ApplicationError`
 */
function extractDetails(log: string, evidence: string, remote_id: string): RustDeskLogs | ApplicationError {
    const date = log.split("]");
    const timestamp = date.at(0);
    if (timestamp === undefined) {
        return new ApplicationError(`RUSTDESK`, `improper log message: ${log}`);
    }

    let remaining = date.at(1);
    if (remaining === undefined) {
        return new ApplicationError(`RUSTDESK`, `improper log message: ${log}`);
    }
    remaining = remaining.trim();

    const level = remaining.split(" ").at(0);
    if (level === undefined) {
        return new ApplicationError(`RUSTDESK`, `improper log message: ${log}`);
    }

    const code_path = remaining.split(" ").at(1);
    if (code_path === undefined) {
        return new ApplicationError(`RUSTDESK`, `improper log message: ${log}`);
    }

    const message = date.slice(2).join("]").trim();
    const value: RustDeskLogs = {
        evidence,
        message,
        datetime: convertModifiedIso(timestamp.replace("[", "")),
        level: level.trim(),
        code_path: code_path.replace("[", ""),
        local_time: timestamp.replace("[", ""),
        remote_id,
        timestamp_desc: "Log Event",
        artifact: "RustDesk Log",
        data_type: "applications:rustdesk:log:entry"
    };

    return value;
}

/**
 * Function to test the RustDesk logs parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the RustDesk logs parsing
 */
export function testRustDeskLogs(): void {
    const test = "../../test_data/rustdesk/1.4.6/rustdesk_r2026-04-12_17-11-54.log";


    const test_value = "[2025-11-23 19:44:47.656957 -05:00] INFO [src/core_main.rs:360] start --server with user centos";
    const value = extractDetails(test_value, test, "1234");
    if (value instanceof ApplicationError) {
        throw value;
    }

    if (value.datetime !== "2025-11-24T00:44:47.656Z") {
        throw `Got datetime ${value.datetime} expected "2025-11-24T00:44:47.656Z".......extractDetails ❌`;
    }

    console.info(`  Function extractDetails ✅`);
}