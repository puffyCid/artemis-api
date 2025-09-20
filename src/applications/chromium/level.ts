import { ChromiumLocalStorage, ChromiumProfiles } from "../../../types/applications/chromium";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { ApplicationError } from "../errors";
import { LevelDb } from "../leveldb/level";

/**
 * Get Chromium local storage entries for all users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of `ChromiumLocalStorage`
 */
export function chromiumLocalStorage(paths: ChromiumProfiles[], platform: PlatformType): ChromiumLocalStorage[] {
    const hits: ChromiumLocalStorage[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/Local Storage//leveldb`;


        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Local Storage\\leveldb`;
        }

        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }

        for (const entry_path of glob_paths) {
            const client = new LevelDb(entry_path.full_path, platform);
            let entries = client.wal();
            if (entries instanceof ApplicationError) {
                console.warn(`Failed to parse write ahead log for ${entry_path.full_path}: ${entries}`);
                continue;
            }

            for (const entry of entries as ChromiumLocalStorage[]) {
                entry[ "version" ] = path.version;
                hits.push(entry);
            }

            entries = client.tables();
            if (entries instanceof ApplicationError) {
                console.warn(`Failed to parse tables for ${entry_path.full_path}: ${entries}`);
                continue;
            }

            for (const entry of entries as ChromiumLocalStorage[]) {
                entry[ "version" ] = path.version;
                hits.push(entry);
            }
        }
    }

    return hits;
}