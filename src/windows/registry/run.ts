import { Hashes } from "../../../types/filesystem/files";
import { Registry } from "../../../types/windows/registry";
import { RegistryRunKey } from "../../../types/windows/registry/run";
import { getEnvValue, getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { glob, hash, stat } from "../../filesystem/files";
import { WindowsError } from "../errors";
import { getPe } from "../pe";
import { getRegistry } from "../registry";

/**
 * Function to extract Registry Run key information
 * @param alt_path Optional alternative path to a Registry file
 * @returns Array of `RegistryRunKey`
 */
export function getRunKeys(alt_path?: string): RegistryRunKey[] {
    let drive = getSystemDrive();
    if (drive === "") {
        drive = "C:";
    }
    let paths = [`${drive}\\Users\\*\\NTUSER.DAT`, `${drive}\\Users\\*\\NTUSER.dat`, `${drive}\\Users\\*\\ntuser.dat`, `${drive}\\Windows\\System32\\config\\SOFTWARE`];
    if (alt_path !== undefined) {
        paths = [alt_path];
    }

    const glob_paths: string[] = [];
    // Try to get all the Registry files that Run keys for persistence
    for (const path of paths) {
        const results = glob(path);
        if (results instanceof FileError) {
            continue;
        }
        for (const entry of results) {
            if (!entry.is_file) {
                continue;
            }
            glob_paths.push(entry.full_path);
        }
    }

    let run_values: RegistryRunKey[] = [];
    // Now parse each Registry file
    for (const entry of glob_paths) {
        const results = getRegistry(entry, ".*CurrentVersion\\\\Run.*");
        if (results instanceof WindowsError) {
            continue;
        }

        for (const reg of results) {
            const values = parseKeys(reg);
            run_values = run_values.concat(values);
        }
    }

    return run_values;
}

/**
 * Function to extract Run key information
 * @param value `Registry` object associated with a Run
 * @returns Array of `RegistryRunKey`
 */
function parseKeys(value: Registry): RegistryRunKey[] {
    const values: RegistryRunKey[] = [];
    for (const entry of value.values) {
        const run_value: RegistryRunKey = {
            key_modified: value.last_modified,
            key_path: value.path,
            registry_path: value.registry_path,
            registry_file: value.registry_file,
            path: "",
            created: "",
            has_signature: false,
            md5: "",
            value: entry.data,
            name: entry.value,
            sha1: "",
            sha256: "",
            message: `Run key: ${value.name}`,
            datetime: value.last_modified,
            timestamp_desc: "Registry Last Modified",
            artifact: "Windows Registry Run Key",
            data_type: "windows:registry:run:entry"
        };

        // Try to get some metadata about the Run key values
        if (entry.data.startsWith("%")) {
            // Environment values
            const env = /%.*?%/g;
            for (const entry_match of entry.data.match(env) ?? []) {
                const real_value = getEnvValue(entry_match.replaceAll("%", ""));
                let path = entry.data.replace(entry_match, real_value);
                if(path.includes("/")) {
                    path = path.split("/").at(0)?.trimEnd() ?? path;
                }
                const created = getCreation(path);
                run_value.created = created;

                const hashes = getHash(path);
                run_value.md5 = hashes.md5;
                run_value.sha1 = hashes.sha1;
                run_value.sha256 = hashes.sha256;

                run_value.has_signature = getPeInfo(path);
                run_value.path = path;

                values.push(run_value);
                break;
            }
        } else if (entry.data.startsWith("\"")) {
            // Files with cli args
            const cmd = /".*?"/;
            for (const entry_match of entry.data.match(cmd) ?? []) {
                const path = entry_match.replaceAll("\"", "");
                const created = getCreation(path);
                run_value.created = created;

                const hashes = getHash(path);
                run_value.md5 = hashes.md5;
                run_value.sha1 = hashes.sha1;
                run_value.sha256 = hashes.sha256;

                run_value.has_signature = getPeInfo(path);
                run_value.path = path;

                values.push(run_value);
                break;
            }
        } else if (entry.data.includes("/")) {
            // Files with clie args with forward slashes
            const file = entry.data.split("/").at(0);
            if (file === undefined) {
                values.push(run_value);
                continue;
            }
            const path = file.replaceAll("\"", "").trimEnd();
            const created = getCreation(path);
            run_value.created = created;

            const hashes = getHash(path);
            run_value.md5 = hashes.md5;
            run_value.sha1 = hashes.sha1;
            run_value.sha256 = hashes.sha256;

            run_value.has_signature = getPeInfo(path);
            run_value.path = path;

            values.push(run_value);
        }
    }

    return values;
}

/**
 * Function to pull the created timestamp for a file
 * @param path Path to a file 
 * @returns Standard created timestamp
 */
function getCreation(path: string): string {
    const meta = stat(path);
    if (meta instanceof FileError) {
        return "1970-01-01T00:00:00.00Z";
    }
    return meta.created;
}

/**
 * Function to hash a file associated with the Registry Run key
 * @param path Path to a file to hash
 * @returns `Hashes` object
 */
function getHash(path: string): Hashes {
    const hashes = hash(path, true, true, true);
    if (hashes instanceof FileError) {
        return {
            md5: "",
            sha1: "",
            sha256: ""
        };
    }
    return hashes;
}

/**
 * Function to check if PE file has certificate info
 * @param path Path to a PE file
 * @returns `true` if signed. `false` if not signed
 */
function getPeInfo(path: string): boolean {
    const info = getPe(path);
    if (info instanceof WindowsError) {
        return false;
    }

    return info.cert.length !== 0;
}

/**
 * Function to test Windows Registry Run key parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows Registry Run key parsing
 */
export function testGetRunKeys(): void {
    const test = "../../tests/test_data/windows/registry/NTUSER.DAT";
    const results = getRunKeys(test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results.length !== 2) {
        throw `Got ${results.length} expected 2.......getRunKeys ❌`
    }

    if (results[1]?.value !== "%ProgramFiles%\\Windows Mail\\wab.exe /Upgrade") {
        throw `Got ${results[1]?.value} expected "%ProgramFiles%\\\\Windows Mail\\\\wab.exe /Upgrade".......getRunKeys ❌`
    }

    console.info(`  Function getRunKeys ✅`);


    const created = getCreation("C:\\Windows\\notepad.exe");
    if (created === "1970-01-01T00:00:00.00Z") {
        throw 'Got bad time.......getCreation ❌'
    }
    console.info(`  Function getCreation ✅`);


    const hash = getHash("C:\\Windows\\notepad.exe");
    if (hash.md5 === "") {
        throw 'Got empty hash.......getHash ❌'
    }
    console.info(`  Function getHash ✅`);

    const info = getPeInfo("C:\\Windows\\notepad.exe");
    if (info === true) {
        throw 'Got signature for notepad? Should be in Catalog?.......getPeInfo ❌'
    }
    console.info(`  Function getPeInfo ✅`);

}