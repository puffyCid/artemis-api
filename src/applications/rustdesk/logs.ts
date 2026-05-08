import { RustDeskLogs, RustDeskUsers } from "../../../types/applications/rustdesk";
import { FileError } from "../../filesystem/errors";
import { readLines } from "../../filesystem/files";
import { convertModifiedIso } from "../../time/conversion";
import { ApplicationError } from "../errors";

/**
 * Function to parse RustDesk logs
 * @param path Path to RustDesk log file
 * @param user `RustDeskUsers` object
 * @returns Array of `RustDeskLogs` or `ApplicationError`
 */
export function readLogs(path: string, user: RustDeskUsers): RustDeskLogs[] | ApplicationError {
    // Files not that large?
    const lines = readLines(path, 0, 1000);
    if (lines instanceof FileError) {
        return new ApplicationError(`RUSTDESK`, `failed to read file ${path}: ${lines}`);
    }

    const logs: RustDeskLogs[] = [];
    let multiline_log = "";
    for (let i = 0; i < lines.length; i++) {
        const line_value = lines[i];

        if (line_value === "" || line_value === undefined) {
            continue;
        }
        if (!line_value.startsWith("[")) {
            multiline_log += `${line_value}\n`;
            continue;
        }

        if (multiline_log !== "") {
            const previous_line = logs[logs.length - 1];
            if (previous_line !== undefined) {
                previous_line.message = previous_line.message.concat(multiline_log);
                logs[logs.length - 1] = previous_line;
            }

            multiline_log = "";
            continue;
        }

        const value = extractDetails(line_value, path, user.remote_id);
        if (value instanceof ApplicationError) {
            continue;
        }
        logs.push(value);
    }

    return logs;
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

export function testRustDeskLogs(): void {
    const test = "../../test_data/rustdesk/1.4.6/rustdesk_r2026-04-12_17-11-54.log";
    const results = readLogs(test, { logs_path: "", remote_id: "1234", config_path: "test", version: "" });

    if (results instanceof ApplicationError) {
        throw results;
    }

    if (results.length !== 51) {
        throw `Got lenght ${results.length} expected 51.......readLogs ❌`;
    }

    if (results[23]?.message !== "Clipboard listener subscribed: client-clipboard") {
        throw `Got message ${results[23]?.message} expected "Clipboard listener subscribed: client-clipboard".......readLogs ❌`;
    }

    console.info(`  Function readLogs ✅`);

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