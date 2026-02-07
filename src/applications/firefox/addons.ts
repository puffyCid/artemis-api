import { FirefoxAddons, FirefoxProfiles } from "../../../types/applications/firefox";
import { FileError } from "../../filesystem/errors";
import { readTextFile } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO } from "../../time/conversion";

/**
 * Get installed Firefox addons
 * @param paths Array of `FirefoxProfiles`
 * @param platform Platform to parse Firefox addons
 * @returns Array of `FirefoxAddons` or `ApplicationError`
 */
export function firefoxAddons(
    paths: FirefoxProfiles[],
    platform: PlatformType,
): FirefoxAddons[] {

    const extensions: FirefoxAddons[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/extensions.json`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\extensions.json`;
        }

        const extension = readTextFile(full_path);
        if (extension instanceof FileError) {
            console.warn(`failed to read file ${full_path}: ${extension}`);
            continue;
        }

        const data = JSON.parse(extension)["addons"];
        for (const entry of data) {
            const value: FirefoxAddons = {
                installed: unixEpochToISO(entry["installDate"] ?? 0),
                updated: unixEpochToISO(entry["updateDate"] ?? 0),
                active: entry["active"] ?? false,
                visible: entry["visible"] ?? false,
                author: entry["id"] ?? "",
                addon_version: entry["version"] ?? "",
                path: entry["path"] ?? "",
                db_path: full_path,
                message: `Addon ${entry["defaultLocale"]["name"] ?? ""} installed`,
                datetime: unixEpochToISO(entry["installDate"] ?? 0),
                name: entry["defaultLocale"]["name"] ?? "",
                description: entry["defaultLocale"]["description"] ?? "",
                creator: entry["defaultLocale"]["creator"] ?? "",
                timestamp_desc: "Extension Installed",
                artifact: "Browser Extension",
                data_type: "application:firefox:extension:entry",
                version: path.version,
            };
            extensions.push(value);
        }
    }

    return extensions;
}