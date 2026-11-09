import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../types/filesystem/accessor";
import { PcaType, ProgramCompatibilityAssist } from "../../types/windows/pca";
import { extractUtf16String } from "../encoding/strings";
import { getSystemDrive } from "../environment/env";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readLines } from "../filesystem/files";
import { WindowsError } from "./errors";

/**
 * Extract Program Compatibility Assist entries
 * @param alt_path Optional alternative glob to folder that contains PCA files
 * @returns Array of `ProgramCompatibilityAssist` or `WindowsError`
 */
export function parsePca(protocol = AccessorProtocol.Host, alt_path?: string): ProgramCompatibilityAssist[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\Windows\\appcompat\\pca\\*`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for PCA files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('PCA', `failed to glob for ${path}: ${matches}`);
    }

    let values: ProgramCompatibilityAssist[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        if (entry.meta.filename === "PcaAppLaunchDic.txt") {
            const value = parseDict(entry);
            if (value instanceof WindowsError) {
                continue;
            }
            values = values.concat(value);
        } else if (entry.meta.filename.includes("General")) {
            const value = parseGeneral(entry, accessor);
            if (value instanceof WindowsError) {
                continue;
            }
            values = values.concat(value);

        }
    }

    return values;
}

/**
 * Parse Application Launch PCA file
 * @param entry `GlobMatch` for PcaAppLaunchDic.txt
 * @returns Array of `ProgramCompatibilityAssist` or `WindowsError`
 */
function parseDict(entry: GlobMatch): ProgramCompatibilityAssist[] | WindowsError {
    const limit = 1000;
    let offset = 0;

    const values: ProgramCompatibilityAssist[] = [];

    if (entry.meta.kind !== EntryKind.File) {
        return values;
    }
    while (true) {
        const lines = readLines(entry.handle as FileHandle, offset, limit);
        if (lines instanceof FileError) {
            break;
        }

        offset += limit;
        for (const line of lines) {
            const entries = line.split("|");
            const timestamp = `${entries.at(1)?.replace(" ", "T") ?? "1970-01-01T00:00:00.000"}Z`;

            const value: ProgramCompatibilityAssist = {
                last_run: timestamp,
                path: entries.at(0) ?? "Unknown path",
                run_status: 0,
                file_description: "",
                vendor: "",
                version: "",
                program_id: "",
                exit_message: "",
                pca_type: PcaType.AppLaunch,
                message: `PCA app launch: ${entries.at(0) ?? "Unknown path"}`,
                datetime: timestamp,
                timestamp_desc: "Last Run",
                artifact: "Windows Program Compatibility Assist",
                data_type: "windows:pca:entry",
                evidence: entry.meta.display_path,
            };
            values.push(value);
        }
        if (lines.length < limit) {
            break;
        }
    }

    return values;
}

/**
 * Parse Application Launch PCA file
 * @param entry `GlobMatch` to PcaGeneralDb0.txt or PcaGeneralDb1.txt
 * @returns Array of `ProgramCompatibilityAssist` or `WindowsError`
 */
function parseGeneral(entry: GlobMatch, accessor: Accessor): ProgramCompatibilityAssist[] | WindowsError {
    const values: ProgramCompatibilityAssist[] = [];
    if (entry.meta.kind !== EntryKind.File) {
        return values;
    }


    const bytes = accessor.readFileHandle(entry.handle as FileHandle);
    if (bytes instanceof FileError) {
        return new WindowsError(`PCA`, `failed to read file ${entry.meta.display_path}: ${bytes}`);
    }
    const lines = extractUtf16String(bytes).split("\n");

    for (const line of lines) {
        const entries = line.split("|");
        const timestamp = `${entries.at(0)?.replace(" ", "T") ?? "1970-01-01T00:00:00.000"}Z`;

        const value: ProgramCompatibilityAssist = {
            last_run: timestamp,
            path: entries.at(2) ?? "Unknown path",
            run_status: Number(entries.at(1) ?? 0),
            file_description: entries.at(3) ?? "Unknown description",
            vendor: entries.at(4) ?? "Unknown vendor",
            version: entries.at(5) ?? "Unknown version",
            program_id: entries.at(6) ?? "Unknown program ID",
            exit_message: entries.at(7) ?? "Unknown exit message",
            pca_type: PcaType.General,
            message: `PCA general launch: ${entries.at(2) ?? "Unknown path"}`,
            datetime: timestamp,
            evidence: entry.meta.display_path,
            timestamp_desc: "Last Run",
            artifact: "Windows Program Compatibility Assist",
            data_type: "windows:pca:entry"
        };
        values.push(value);
    }

    return values;
}

/**
 * Function to test Windows PCA parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows PCA parsing
 */
export function testParsePca(): void {
    const test = "../../tests/test_data/windows/pca/*";
    const results = parsePca(AccessorProtocol.Host, test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results.length !== 567) {
        throw `Got ${results.length} expected 567.......parsePca ❌`;
    }

    if (results[4]?.message !== "PCA app launch: C:\\Program Files\\WindowsApps\\Microsoft.OutlookForWindows_1.0.0.0_neutral__8wekyb3d8bbwe\\olk.exe") {
        throw `Got ${results[4]?.message} expected "PCA app launch: C:\\Program Files\\WindowsApps\\Microsoft.OutlookForWindows_1.0.0.0_neutral__8wekyb3d8bbwe\\olk.exe".......parsePca ❌`;
    }
    console.info(`  Function parsePca ✅`);

    const accessor = new Accessor();
    let matches = accessor.globfs("../../tests/test_data/windows/pca/PcaAppLaunchDic.txt");
    if (matches instanceof FileError) {
        throw `Failed to glob: ${matches}`;
    }

    const apps = parseDict(matches[0] as GlobMatch);
    if (apps instanceof WindowsError) {
        throw apps;
    }

    if (apps.length !== 192) {
        throw `Got ${apps.length} expected 192.......parseDict ❌`;
    }

    if (apps[8]?.message !== "PCA app launch: C:\\Windows\\System32\\msiexec.exe") {
        throw `Got ${apps[8]?.message} expected "PCA app launch: C:\\Windows\\System32\\msiexec.exe".......parseDict ❌`;
    }
    console.info(`  Function parseDict ✅`);


    matches = accessor.globfs("../../tests/test_data/windows/pca/PcaGeneralDb0.txt");
    if (matches instanceof FileError) {
        throw `Failed to glob: ${matches}`;
    }

    const general = parseGeneral(matches[0] as GlobMatch, accessor);
    if (general instanceof WindowsError) {
        throw general;
    }

    if (general.length !== 375) {
        throw `Got ${general.length} expected 375.......parseGeneral ❌`;
    }

    if (general[8]?.message !== "PCA general launch: %USERPROFILE%\\Downloads\\LLVM-18.1.8-woa64.exe") {
        throw `Got ${general[8]?.message} expected "PCA general launch: %USERPROFILE%\\Downloads\\LLVM-18.1.8-woa64.exe".......parseGeneral ❌`;
    }

    console.info(`  Function parseGeneral ✅`);

}