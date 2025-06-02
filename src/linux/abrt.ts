import { Abrt } from "../../types/linux/abrt";
import { LinuxError } from "./errors";
import { readDir } from "../filesystem/directory";
import { readTextFile } from "../filesystem/files";
import { FileError } from "../filesystem/errors";
import { unixEpochToISO } from "../time/conversion";

/**
 * Extract crash informatin from abrt directory. Typically at `/var/spool/abrt`. Root is required
 * @param alt_dir Optional path to directory contain abrt information
 * @returns Array of `Abrt` or `LinuxError`
 */
export async function extractAbrt(alt_dir?: string): Promise<Abrt[] | LinuxError> {
    let dir = "/var/spool/abrt";
    if (alt_dir !== undefined) {
        dir = alt_dir;
        const result = await readAbrtDir(dir);
        if (result instanceof LinuxError) {
            return result;
        }
        return [ result ];
    }

    const crashes = await readDir(dir);
    if (crashes instanceof FileError) {
        return new LinuxError(`ABRT`, `failed to read abrt directory ${dir}: ${crashes}`);
    }

    const abrts: Abrt[] = [];
    for (const entry of crashes) {
        if (!entry.is_directory) {
            continue;
        }

        const result = await readAbrtDir(entry.full_path);
        if (result instanceof LinuxError) {
            continue;
        }

        abrts.push(result);
    }

    return abrts;
}

/**
 * Extract some data related to crashed process
 * @param path Path to abrt crash directory
 * @returns `Abrt` object or `LinuxError`
 */
async function readAbrtDir(path: string): Promise<Abrt | LinuxError> {
    const entries = await readDir(path);
    if (entries instanceof FileError) {
        return new LinuxError(`ABRT`, `failed to read abrt directory ${path}: ${entries}`);
    }

    const abrt_entry: Abrt = {
        executable: "",
        pid: 0,
        cmdline: "",
        reason: "",
        hostname: "",
        last_occurrence: "",
        user: "",
        data_directory: path,
        backtrace: "",
        environment: "",
        home: ""
    };
    for (const entry of entries) {
        if (!entry.is_file) {
            continue;
        }

        switch (entry.filename) {
            case "executable": {
                abrt_entry.executable = readLine(entry.full_path);
                break;
            }
            case "cmdline": {
                abrt_entry.cmdline = readLine(entry.full_path);
                break;
            }
            case "pid": {
                abrt_entry.pid = Number(readLine(entry.full_path));
                break;
            }
            case "hostname": {
                abrt_entry.hostname = readLine(entry.full_path);
                break;
            }
            case "reason": {
                abrt_entry.reason = readLine(entry.full_path);
                break;
            }
            case "pwd": {
                abrt_entry.home = readLine(entry.full_path);
                break;
            }
            case "username": {
                abrt_entry.user = readLine(entry.full_path).trimEnd();
                break;
            }
            case "last_occurrence": {
                abrt_entry.last_occurrence = unixEpochToISO(Number(readLine(entry.full_path)));
                break;
            }
            case "backtrace": {
                abrt_entry.backtrace = readLine(entry.full_path);
                break;
            }
            case "core_backtrace": {
                abrt_entry.backtrace = JSON.parse(readLine(entry.full_path));
                break;
            }
            case "environ": {
                abrt_entry.environment = readLine(entry.full_path);
                break;
            }
            default: {
                continue;
            }
        }
    }

    return abrt_entry;
}

/**
 * Attempt to read abrt text files
 * @param path Path to abrt related file
 * @returns Contents of file
 */
function readLine(path: string): string {
    const result = readTextFile(path);
    if (result instanceof FileError) {
        return "";
    }

    return result;
}