import { FirefoxProfiles } from "../../../types/applications/firefox";
import { FileError } from "../../filesystem/errors";
import { readTextFile } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { ApplicationError } from "../errors";

/**
 * Get installed Firefox addons
 * @param paths Array of `FirefoxProfiles`
 * @param platform Platform to parse Firefox addons
 * @returns Array of `Record<string, unknown>` or `ApplicationError`
 */
export function firefoxAddons(
    paths: FirefoxProfiles[],
    platform: PlatformType,
): Record<string, unknown>[] | ApplicationError {

    let extensions: Record<string, object>[] = [];
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

        const data = JSON.parse(extension)[ "addons" ];
        data[ "addons_path" ] = full_path;

        extensions = extensions.concat(data);
    }

    return extensions;
}