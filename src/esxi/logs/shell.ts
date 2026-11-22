import { ShellHistory } from "../../../types/esxi/logs/shell";
import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../../types/filesystem/accessor";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { readLines } from "../../filesystem/files";
import { EsxiError } from "../error";

/**
 * Function to parse ESXi `shell.log` file
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative glob to `shell.log`
 * @returns Array of `ShellHistory` or `EsxiError`
 */
export function shellLogHistory(protocol = AccessorProtocol.Host, alt_path?: string): ShellHistory[] | EsxiError {
    const path = alt_path ?? "/vmfs/volumes/*/log/shell.log";
    const accessor = new Accessor();

    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new EsxiError(`SHELLHISTORY`, `failed to glob: ${path}: ${matches}`);
    }

    let history: ShellHistory[] = [];

    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        const values = readHistory(entry);
        if (values instanceof EsxiError) {
            continue;
        }

        history = history.concat(values);
    }

    return history;
}

/**
 * Parse each line of the ESXi `shell.log` file
 * @param entry `GlobMatch` object to the `shell.log` file
 * @returns Array of `ShellHistory` or `EsxiError`
 */
function readHistory(entry: GlobMatch): ShellHistory[] | EsxiError {
    const limit = 200;
    let offset = 0;

    const values: ShellHistory[] = [];
    while (true) {
        const lines = readLines(entry.handle as FileHandle, offset, limit);
        if (lines instanceof FileError) {
            return new EsxiError(`SHELLHISTORY`, `could not read file '${entry.meta.display_path}': ${lines}`);
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
                evidence: entry.meta.display_path,
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

            const line_value = line.split(" ");
            value.datetime = line_value.at(0) ?? "1970-01-01T00:00:00.000Z";
            value.category = line_value.at(1) ?? "";
            const pid_string = line_value.at(2) ?? 0;
            if (pid_string !== 0) {
                const pid_value = pid_string.split("[").at(1) ?? "0";
                value.pid = Number(pid_value.replace("]:", ""));
            }
            value.message = line_value.slice(3).join(" ");
            value.command = line_value.slice(3).join(" ");
            values.push(value);
        }


        if (lines.length < limit) {
            break;
        }
    }

    return values;
}

/**
 * Function to test ESXi shell log parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the ESXi shell log parsing
 */
export function testShellLogHistory(): void {
    const test = "../../test_data/esxi/logs/shell.log";
    const results = shellLogHistory(AccessorProtocol.Host, test);
    if (results instanceof EsxiError) {
        throw results;
    }

    if (results.length !== 164) {
        throw `Got ${results.length} expected 164.......shellLogHistory ❌`;
    }

    if (results[ 12 ]?.message !== "ls") {
        throw `Got ${results[ 12 ]?.message} expected "ls".......shellLogHistory ❌`;
    }

    console.info(`  Function shellLogHistory ✅`);
}