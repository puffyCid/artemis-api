import { RustDeskLogs, RustDeskUsers } from "../../../types/applications/rustdesk";
import { FileError } from "../../filesystem/errors";
import { readLines } from "../../filesystem/files";
import { convertModifiedIso } from "../../time/conversion";
import { ApplicationError } from "../errors";

export function readLogs(path: string, user: RustDeskUsers): RustDeskLogs[] | ApplicationError {
    // Files not that large?
    const lines = readLines(path, 0, 1000);
    if (lines instanceof FileError) {
        return new ApplicationError(`RUSTDESK`, `failed to read file ${path}: ${lines}`);
    }

    const logs: RustDeskLogs[] = [];
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

        const value = extractDetails(line_value, path, user.remote_id);
        if (value instanceof ApplicationError) {
            continue;
        }
        logs.push(value);
    }

    return logs;
}

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