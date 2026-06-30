import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { OutputManager } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";
import { parseClients } from "./locationd";

/**
 * Function to extract RootDomain info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param manager `OutputManager` configuration object
 */
export function extractRootDomain(
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
    if (info.path.includes("locationd/clients.plist")) {
      const result = parseClients(target);
      manager.write_artifact(result, "rootdomain_locationd_clients")
      continue;
    }
    //console.log(info.path);
    //console.log(target);
  }
}
