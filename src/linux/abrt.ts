import { Abrt } from "../../types/linux/abrt";
import { LinuxError } from "./errors";
import { readTextFile } from "../filesystem/files";
import { FileError } from "../filesystem/errors";
import { unixEpochToISO } from "../time/conversion";
import { AccessorProtocol, DirHandle, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { Accessor } from "../filesystem/accessor";

/**
 * Extract crash information from abrt directory. Typically at `/var/spool/abrt`. Root is required
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to directory contain abrt information
 * @returns Array of `Abrt` or `LinuxError`
 */
export function extractAbrt(protocol = AccessorProtocol.Host, alt_path?: string): Abrt[] | LinuxError {
    let path = "/var/spool/abrt/*";

    if (alt_path !== undefined) {
        path = alt_path;
    }

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new LinuxError(`ABRT`, `failed to glob abrt files ${path}: ${matches}`);
    }

    const abrts: Abrt[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.Directory) {
            continue;
        }

        const results = readAbrtDir(accessor, entry.handle as DirHandle, entry.meta.display_path);
        if (results instanceof LinuxError) {
            continue;
        }

        abrts.push(results);
    }

    return abrts;
}

/**
 * Extract some data related to crashed process
 * @param path Path to abrt crash directory
 * @returns `Abrt` object or `LinuxError`
 */
function readAbrtDir(accessor: Accessor, handle: DirHandle, evidence: string): Abrt | LinuxError {
    const abrt_files = accessor.readDirHandle(handle);
    if (abrt_files instanceof FileError) {
        return new LinuxError(`ABRT`, `failed to read abor DirHandle '${handle}': ${abrt_files}`);
    }

    const abrt_entry: Abrt = {
        executable: "",
        pid: 0,
        cmdline: "",
        reason: "",
        hostname: "",
        last_occurrence: "",
        user: "",
        evidence,
        backtrace: "",
        environment: "",
        home: "",
        message: "",
        datetime: "",
        timestamp_desc: "Abrt Last Occurrence",
        artifact: "Abrt",
        data_type: "linux:abrt:entry"
    };
    for (const entry of abrt_files) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        switch (entry.meta.filename) {
            case "executable": {
                abrt_entry.executable = readLine(entry.handle as FileHandle);
                abrt_entry.message = `${abrt_entry.executable} crashed`;
                break;
            }
            case "cmdline": {
                abrt_entry.cmdline = readLine(entry.handle as FileHandle);
                break;
            }
            case "pid": {
                abrt_entry.pid = Number(readLine(entry.handle as FileHandle));
                break;
            }
            case "hostname": {
                abrt_entry.hostname = readLine(entry.handle as FileHandle);
                break;
            }
            case "reason": {
                abrt_entry.reason = readLine(entry.handle as FileHandle);
                break;
            }
            case "pwd": {
                abrt_entry.home = readLine(entry.handle as FileHandle);
                break;
            }
            case "username": {
                abrt_entry.user = readLine(entry.handle as FileHandle).trimEnd();
                break;
            }
            case "last_occurrence": {
                abrt_entry.last_occurrence = unixEpochToISO(Number(readLine(entry.handle as FileHandle)));
                abrt_entry.datetime = abrt_entry.last_occurrence;
                break;
            }
            case "backtrace": {
                abrt_entry.backtrace = readLine(entry.handle as FileHandle);
                break;
            }
            case "core_backtrace": {
                abrt_entry.backtrace = JSON.parse(readLine(entry.handle as FileHandle));
                break;
            }
            case "environ": {
                abrt_entry.environment = readLine(entry.handle as FileHandle);
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
 * @param handle `FileHandle` abrt related file
 * @returns Contents of file
 */
function readLine(handle: FileHandle): string {
    const result = readTextFile(handle);
    if (result instanceof FileError) {
        return "";
    }

    return result;
}