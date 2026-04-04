import { ShellHistory } from "../../../types/esxi/logs/shell";
import { FileError } from "../../filesystem/errors";
import { glob, readLines } from "../../filesystem/files";
import { EsxiError } from "../error";

/**
 * Function to parse ESXi `shell.log` file
 * @param alt_path Optional alternative glob to `shell.log`
 * @returns Array of `ShellHistory` or `EsxiError`
 */
export function shellLogHistory(alt_path?: string): ShellHistory[] | EsxiError {
    let shell_glob = "/vmfs/volumes/*/log/shell.log";
    if (alt_path !== undefined) {
        shell_glob = alt_path;
    }

    const paths = glob(shell_glob);
    if (paths instanceof FileError) {
        return new EsxiError(`SHELLHISTORY`, `failed to glob: ${shell_glob}: ${paths}`);
    }

    let history: ShellHistory[] = [];
    for (const entry of paths) {
        if (!entry.is_file) {
            continue;
        }

        const values = readHistory(entry.full_path);
        if (values instanceof EsxiError) {
            continue;
        }

        history = history.concat(values);

    }

    return history;
}

/**
 * Parse each line of the ESXi `shell.log` file
 * @param full_path Path to the `shell.log` file
 * @returns Array of `ShellHistory` or `EsxiError`
 */
function readHistory(full_path: string): ShellHistory[] | EsxiError {
    const limit = 200;
    let offset = 0;

    const values: ShellHistory[] = [];
    while (true) {
        const lines = readLines(full_path, offset, limit);
        if (lines instanceof FileError) {
            break;
        }
        offset += limit;
        for (const line of lines) {
            const value: ShellHistory = {
                message: "",
                datetime: "",
                timestamp_desc: "Shell Command Execution",
                artifact: "ESXi Shell History",
                data_type: "esxi:shell:entry",
                pid: 0,
                account: "",
                command: "",
                evidence: full_path,
                category: "",
            };

            if (line.includes(" shell[")) {
                const entry = line.split(" ");
                value.datetime = entry.at(0) ?? "1970-01-01T00:00:00.000Z";
                value.category = entry.at(1) ?? "";
                const pid_string = entry.at(2) ?? 0;
                if (pid_string !== 0) {
                    const pid_value = pid_string.split("[").at(1) ?? "0";
                    value.pid = Number(pid_value.replace("]:", ""));
                }
                const account = entry.at(3) ?? "";
                if (!account.startsWith("[")) {
                    value.message = entry.slice(3).join(" ");
                    value.command = entry.slice(3).join(" ");
                    values.push(value);
                    continue;
                }

                value.account = account.replace("[", "").replace("]:", "");
                value.message = entry.slice(4).join(" ");
                value.command = entry.slice(4).join(" ");
                values.push(value);
                continue;
            }

            const entry = line.split(" ");
            value.datetime = entry.at(0) ?? "1970-01-01T00:00:00.000Z";
            value.category = entry.at(1) ?? "";
            const pid_string = entry.at(2) ?? 0;
            if (pid_string !== 0) {
                const pid_value = pid_string.split("[").at(1) ?? "0";
                value.pid = Number(pid_value.replace("]:", ""));
            }
            value.message = entry.slice(3).join(" ");
            value.command = entry.slice(3).join(" ");
            values.push(value);
        }


        if (lines.length < limit) {
            break;
        }
    }

    return values;
}