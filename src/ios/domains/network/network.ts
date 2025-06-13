import { getPlist, parseCookies, queryTccDb } from "../../../../mod";
import {
    FileType,
    ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { MacosError } from "../../../macos/errors";
import { Output, outputResults } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";

/**
 * Function to extract NetworkDomain info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractNetworkDomain(
    app_paths: ManifestApp[],
    db_path: string,
    output: Output,
) {
    for (const path of app_paths) {
        if (path.file_type !== FileType.IsFile) {
            continue;
        }

        const info = parseManifestAppPlist(path.file);
        if (info instanceof IosError) {
            continue;
        }

        const target = `${db_path}/${path.directory}/${path.fileID}`;

        if (info.path.endsWith("com.apple.symptomsd.plist")) {
            const plist_data = getPlist(target);
            if (plist_data instanceof MacosError) {
                continue;
            }

            outputResults(
                plist_data,
                "networkdomain_apple_symptomsd_preferences",
                output,
            );
            continue;
        }
    }
}