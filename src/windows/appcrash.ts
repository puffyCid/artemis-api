import { AccessorProtocol, FileHandle } from "../../types/filesystem/accessor";
import { EntryKind } from "../../types/filesystem/files";
import { AppCrash } from "../../types/windows/appcrash";
import { extractUtf16String } from "../encoding/strings";
import { getSystemDrive } from "../environment/env";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { NomError } from "../nom/error";
import { Endian, nomUnsignedTwoBytes } from "../nom/helpers";
import { filetimeToIso } from "../time/conversion";
import { WindowsError } from "./errors";

/**
 * Function to parse Application crashes associated with Report.wer files
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use. Default is `AccessorProtocol.Host`
 * @param alt_path Optional glob to alternative directory containing Application crashes (Report.wer files)
 * @returns Array of `AppCrash` or `WindowsError`
 */
export function extractAppCrash(protocol = AccessorProtocol.Host, alt_path?: string): AppCrash[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\ProgramData\\Microsoft\\Windows\\WER\\ReportArchive\\*\\Report.wer`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for Report.wer files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('APPCRASH', `failed to glob for ${path}: ${matches}`);
    }


    const values: AppCrash[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        // Crash Report.wer files are pretty small. But are usually UTF16 encoded
        // Quick and lazy work around
        const bytes = accessor.readFileHandle(entry.handle as FileHandle)
        if (bytes instanceof FileError) {
            continue;
        }

        // Nom the BOM mark
        const remaining = nomUnsignedTwoBytes(bytes, Endian.Le);
        if (remaining instanceof NomError) {
            continue;
        }
        const lines = extractUtf16String(remaining.remaining).split("\r\n");

        const crash: AppCrash = {
            timestamp_desc: "Application Crash",
            artifact: "AppCrash File",
            data_type: "windows:app:crash:entry",
            evidence: entry.meta.display_path,
            message: "",
            path: "",
            datetime: "",
            report_id: "",
            report_type: 0,
            application_name: ""
        };
        for (const line of lines) {
            if (line.startsWith("AppPath")) {
                crash.path = line.split("=").at(1) ?? "Unknown";
                crash.message = `Application '${crash.path}' crashed`;
            } else if (line.startsWith("AppName")) {
                crash.application_name = line.split("=").at(1) ?? "Unknown";
            } else if (line.startsWith("ReportIdentifier")) {
                crash.report_id = line.split("=").at(1) ?? "Unknown";
            } else if (line.startsWith("ReportType")) {
                crash.report_type = Number(line.split("=").at(1) ?? 0);
            } else if (line.startsWith("EventTime")) {
                const timestamp = BigInt(line.split("=").at(1) ?? 0n);
                crash.datetime = filetimeToIso(timestamp);
            }
        }
        values.push(crash);
    }

    return values;
}

/**
 * Function to test Windows AppCrash parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows AppCrash parsing
 */
export function testExtractAppCrash(): void {
    const test = "../../tests/test_data/windows/appcrashes/*";
    const results = extractAppCrash(AccessorProtocol.Host, test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results[0]?.path !== "C:\\Windows\\System32\\dllhost.exe") {
        throw `Got ${results[0]?.path} expected 'C:\\Windows\\System32\\dllhost.exe'.......extractAppCrash ❌`;
    }

    if (results[0]?.message !== `Application 'C:\\Windows\\System32\\dllhost.exe' crashed`) {
        throw `Got ${results[0]?.message} expected 'Application 'C:\\Windows\\System32\\dllhost.exe' crashed'.......extractAppCrash ❌`;
    }
}