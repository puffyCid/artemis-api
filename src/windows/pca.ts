import { PcaType, ProgramCompatabilityAssist } from "../../types/windows/pca";
import { extractUtf16String } from "../encoding/strings";
import { getEnvValue } from "../environment/mod";
import { FileError } from "../filesystem/errors";
import { glob, readFile, readLines } from "../filesystem/files";
import { WindowsError } from "./errors";

/**
 * Extract ProgramCompatabilityAssist entries
 * @param alt_dir Optional alternative glob to folder that contains PCA files
 * @returns Array of `ProgramCompatabilityAssist` or `WindowsError`
 */
export function parsePca(alt_dir?: string): ProgramCompatabilityAssist[] | WindowsError {
    let path = alt_dir;
    if (path === undefined) {
        const volume = getEnvValue("SystemDrive");
        if (volume === "") {
            return new WindowsError(`PCA`, `no SystemDrive found`);
        }

        path = `${volume}\\Windows\\appcompat\\pca\\*`;
    }

    const globs = glob(path);
    if (globs instanceof FileError) {
        return new WindowsError(`PCA`, `failed to glob ${path}: ${globs}`);
    }

    let values: ProgramCompatabilityAssist[] = [];
    for (const entry of globs) {
        if (entry.filename === "PcaAppLaunchDic.txt") {
            const value = parseDict(entry.full_path);
            if (value instanceof WindowsError) {
                continue;
            }
            values = values.concat(value);
        } else if (entry.filename.includes("General")) {
            const value = parseGeneral(entry.full_path);
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
 * @param path Path to PcaAppLaunchDic.txt
 * @returns Array of `ProgramCompatabilityAssist` or `WindowsError`
 */
function parseDict(path: string): ProgramCompatabilityAssist[] | WindowsError {
    const limit = 1000;
    let offset = 0;

    const values: ProgramCompatabilityAssist[] = [];
    while (true) {
        const lines = readLines(path, offset, limit);
        if (lines instanceof FileError) {
            break;
        }

        offset += limit;
        for (const line of lines) {
            const entries = line.split("|");
            const timestamp = `${entries.at(1)?.replace(" ", "T") ?? "1970-01-01T00:00:00.000"}Z`

            const value: ProgramCompatabilityAssist = {
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
                source: path,
                timestamp_desc: "Last Run",
                artifact: "Windows Program Compatability Assist",
                data_type: "windows:pca:entry"
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
 * @param path Path to PcaGeneralDb0.txt or PcaGeneralDb1.txt
 * @returns Array of `ProgramCompatabilityAssist` or `WindowsError`
 */
function parseGeneral(path: string): ProgramCompatabilityAssist[] | WindowsError {
    const bytes = readFile(path);
    if (bytes instanceof FileError) {
        return new WindowsError(`PCA`, `failed to read file ${path}: ${bytes}`);
    }
    const lines = extractUtf16String(bytes).split("\n");

    const values: ProgramCompatabilityAssist[] = [];
    for (const line of lines) {
        const entries = line.split("|");
        const timestamp = `${entries.at(0)?.replace(" ", "T") ?? "1970-01-01T00:00:00.000"}Z`

        const value: ProgramCompatabilityAssist = {
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
            source: path,
            timestamp_desc: "Last Run",
            artifact: "Windows Program Compatability Assist",
            data_type: "windows:pca:entry"
        };
        values.push(value);
    }

    return values;
}

export function testParsePca(): void {
    const test = "../../tests/test_data/windows/pca/*";
    const results = parsePca(test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results.length !== 567) {
        throw `Got ${results.length} expected 567.......parsePca ❌`
    }

    if (results[4]?.message !== "PCA app launch: C:\\Program Files\\WindowsApps\\Microsoft.OutlookForWindows_1.0.0.0_neutral__8wekyb3d8bbwe\\olk.exe") {
        throw `Got ${results[4]?.message} expected "PCA app launch: C:\\Program Files\\WindowsApps\\Microsoft.OutlookForWindows_1.0.0.0_neutral__8wekyb3d8bbwe\\olk.exe".......parsePca ❌`
    }
    console.info(`  Function parsePca ✅`);

    const apps = parseDict("../../tests/test_data/windows/pca/PcaAppLaunchDic.txt");
    if (apps instanceof WindowsError) {
        throw apps;
    }

    if (apps.length !== 192) {
        throw `Got ${apps.length} expected 192.......parseDict ❌`
    }

    if (apps[8]?.message !== "PCA app launch: C:\\Windows\\System32\\msiexec.exe") {
        throw `Got ${apps[8]?.message} expected "PCA app launch: C:\\Windows\\System32\\msiexec.exe".......parseDict ❌`
    }
    console.info(`  Function parseDict ✅`);


    const general = parseGeneral("../../tests/test_data/windows/pca/PcaGeneralDb0.txt");
    if (general instanceof WindowsError) {
        throw general;
    }

    if (general.length !== 375) {
        throw `Got ${general.length} expected 375.......parseGeneral ❌`
    }

    if (general[8]?.message !== "PCA general launch: %USERPROFILE%\\Downloads\\LLVM-18.1.8-woa64.exe") {
        throw `Got ${general[8]?.message} expected "PCA general launch: %USERPROFILE%\\Downloads\\LLVM-18.1.8-woa64.exe".......parseGeneral ❌`
    }

    console.info(`  Function parseGeneral ✅`);

}