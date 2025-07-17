import { ChromiumProfiles } from "../../../types/applications/chromium";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";

/**
 * Get installed Chromium extensions
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of parsed extensions
 */
export function chromiumExtensions(paths: ChromiumProfiles[], platform: PlatformType): Record<string, unknown>[] {
    const hits: Record<string, unknown>[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/Default/*/Extensions/*/*manifest.json`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Default\\*\\Extensions\\*\\*\\manifest.json`;
        }

        const ext_paths = glob(full_path);
        if (ext_paths instanceof FileError) {
            continue;
        }

        for (const ext_entry of ext_paths) {
            const extension = readTextFile(ext_entry.full_path);
            if (extension instanceof FileError) {
                console.warn(`could not read file ${path}: ${extension}`);
                continue;
            }

            const data = JSON.parse(extension);
            data[ "manifest_path" ] = ext_entry.full_path;

            hits.push(data);

        }
    }
    return hits;
}

/**
 * Get Chromium Preferences
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of Preferences
 */
export function chromiumPreferences(paths: ChromiumProfiles[], platform: PlatformType): Record<string, unknown>[] {
    const hits: Record<string, unknown>[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/Default/Preferences`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Default\\Preferences`;
        }

        const pref = readTextFile(full_path);
        if (pref instanceof FileError) {
            console.warn(`could not read file ${full_path}: ${pref}`);
            continue;
        }

        const data = JSON.parse(pref);
        data[ "preference_path" ] = full_path;

        hits.push(data);
    }
    return hits;
}

