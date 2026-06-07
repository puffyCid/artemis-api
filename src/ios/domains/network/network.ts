import { getPlist, } from "../../../../mod";
import {
    FileType,
    ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { MacosError } from "../../../macos/errors";
import { Output, output } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";

/**
 * Function to extract NetworkDomain info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param format `Output` configuration object
 */
export function extractNetworkDomain(
    app_paths: ManifestApp[],
    db_path: string,
    format: Output,
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

            output(
                plist_data,
                "networkdomain_apple_symptomsd_preferences",
                format,
            );
            continue;
        }
    }
}