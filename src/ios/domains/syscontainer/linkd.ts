import { FileType, ManifestApp } from "../../../../types/ios/itunes/manifest";
import { parseBiome } from "../../../macos/biome";
import { MacosError } from "../../../macos/errors";
import { getPlist } from "../../../macos/plist";
import { OutputManager } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";

/**
 * Function to extract Linkd data
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param format `OutputManager` configuration object
 */
export function extractAppleLinkd(
    app_paths: ManifestApp[],
    db_path: string,
    manager: OutputManager
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
        if (!path.hash_path.includes("/local/") && !path.hash_path.endsWith("lock")) {
            const plist_data = getPlist(target);
            if (plist_data instanceof MacosError) {
                continue;
            }
            manager.write_artifact(plist_data, "apple_linkd_metadata")
            continue;
        } else if (path.hash_path.endsWith("lock")) {
            continue;
        }
        const biome_data = parseBiome(false, target);
        manager.write_artifact(biome_data, "apple_linkd_biome")
    }
}
