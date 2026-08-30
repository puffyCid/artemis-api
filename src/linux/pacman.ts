import { PacmanPackages, Reason } from "../../types/linux/pacman";
import { FileError } from "../filesystem/errors";
import { glob, readTextFile } from "../filesystem/files";
import { unixEpochToISO } from "../time/conversion";
import { LinuxError } from "./errors";

/**
 * Function to get installed Pacman packages
 * @param alt_glob Optional alternative glob to Pacman installed packages
 * @returns Array of `PacmanPackages` or `LinuxError`
 */
export function getPacmanInfo(alt_glob?: string): PacmanPackages[] | LinuxError {
    let path_glob = "/var/lib/pacman/local/*/desc";
    if (alt_glob !== undefined) {
        path_glob = alt_glob;
    }

    const package_paths = glob(path_glob);
    if (package_paths instanceof FileError) {
        return new LinuxError('PACMAN', `failed to glob pacman packages ${package_paths}`);
    }

    // Should return 3 values: `[ "%BASE%\nxz\n\n", "BASE", "xz\n\n" ]`
    const headers = /%([A-Z0-9_]+)%\n([\s\S]*?)(?=(?:%[A-Z0-9_]+%\n|$))/g;
    const packages = [];
    for (const entry of package_paths) {
        if (!entry.is_file) {
            continue;
        }

        const text = readTextFile(entry.full_path);
        if (text instanceof FileError) {
            console.warn(`Failed to read file ${entry.full_path}: ${text}`);
            continue;
        }

        const data = parseDescription(text, headers, entry.full_path);
        packages.push(data);
    }

    return packages;
}

/**
 * Parse the installed pacman package description
 * @param text Text content for installed package 
 * @param pattern Regex pattern for extracting package headers
 * @param evidence Full path to pacman package
 * @returns `PacmanPackages`
 */
function parseDescription(text: string, pattern: RegExp, evidence: string): PacmanPackages {
    const json_data: Record<string, unknown> = {};
    let match;
    while ((match = pattern.exec(text)) !== null) {
        if (match.length < 3) {
            continue;
        }
        const header = match.at(1) ?? "";
        const clean = match.at(2)?.trim() ?? "";

        if (clean === "" || header === "") {
            continue;
        }

        const lines = clean.split('\n');
        json_data[header] = lines.length > 1 ? lines : lines[0];
    }

    return {
        name: json_data["NAME"] as string ?? "Unknown",
        version: json_data["VERSION"] as string ?? "Unknown",
        url: json_data["URL"] as string ?? "Unknown",
        build_date: unixEpochToISO(Number(json_data["BUILDDATE"] as string ?? 0)),
        installed: unixEpochToISO(Number(json_data["INSTALLDATE"] as string ?? 0)),
        author: json_data["PACKAGER"] as string ?? "Unknown",
        size: Number(json_data["SIZE"] as string ?? 0),
        description: json_data["DESC"] as string ?? "Unknown",
        licenses: json_data["LICENSE"] as string | string[] ?? "Unknown",
        reason: installReason(json_data["REASON"] as string ?? "Unknown"),
        message: `${json_data["NAME"] as string ?? "Unknown"} installed`,
        datetime: unixEpochToISO(Number(json_data["INSTALLDATE"] as string ?? 0)),
        timestamp_desc: "Pacman Package Installed",
        artifact: "Pacman Package",
        data_type: "linux:pacman:entry",
        evidence
    }
}

/**
 * Try to determin why the package was installed
 * @param value Install reason number value
 * @returns `Reason` enum
 */
function installReason(value: string): Reason {
    switch (value) {
        case "1": return Reason.Dependency;
        case "0": return Reason.Explict;
        default: return Reason.Explict;
    }
}

/**
 * Function to test pacman package parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the pacman package parsing
 */
export function testPacmanInfo(): void {
    const alt_glob = "../../test_data/linux/pacman/desc";
    const results = getPacmanInfo(alt_glob);
    if (results instanceof LinuxError) {
        throw results;
    }

    if (results.length !== 1) {
        throw `Got ${results.length} entries expected 1.......getPacmanInfo ❌`;
    }

    if (results[0]?.author !== "Jan Alexander Steffens (heftig) <heftig@archlinux.org>") {
        throw `Got ${results[0]?.author} author expected "Jan Alexander Steffens (heftig) <heftig@archlinux.org>".......getPacmanInfo ❌`;
    }

    if (results[0]?.message !== "avahi installed") {
        throw `Got ${results[0]?.message} message expected "avahi installed".......getPacmanInfo ❌`;
    }

    if (results[0]?.datetime !== "2026-05-31T23:41:19.000Z") {
        throw `Got ${results[0]?.datetime} datetime expected "2026-05-31T23:41:19.000Z".......getPacmanInfo ❌`;
    }

    console.info(`  Function getPacmanInfo ✅`);

    const test = "%DESC%\nCompressor/archiver for creating and modifying zipfiles";
    const headers = /%([A-Z0-9_]+)%\n([\s\S]*?)(?=(?:%[A-Z0-9_]+%\n|$))/g;
    const value = parseDescription(test, headers, "");

    if (value.description !== "Compressor/archiver for creating and modifying zipfiles") {
        throw `Got ${value.description} description expected "Compressor/archiver for creating and modifying zipfiles".......parseDescription ❌`;
    }
    console.info(`  Function parseDescription ✅`);


    if (installReason("1") !== Reason.Dependency) {
        throw `Got wrong install reason for "1".......installReason ❌`
    }

    if (installReason("0") !== Reason.Explict) {
        throw `Got wrong install reason for "0".......installReason ❌`
    }

    console.info(`  Function installReason ✅`);

}