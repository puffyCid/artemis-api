import {
    FileType,
    ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { OutputManager } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";
import { extractDataUsage } from "./sqlite";

/**
 * Function to extract Wireless info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param manager `OutputManager` configuration object
 */
export function extractWireless(
    app_paths: ManifestApp[],
    db_path: string,
    manager: OutputManager,
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

        if (info.path.endsWith("DataUsage.sqlite")) {
            const data = extractDataUsage(target);
            if (data instanceof IosError) {
                continue;
            }
            manager.write_artifact(data, "wirelessdomain_apple_datausage_sqlite")
            continue;
        }

        // Uncomment to view unsupported entries
        //console.log(info.path);
        //console.log(target);
    }
}