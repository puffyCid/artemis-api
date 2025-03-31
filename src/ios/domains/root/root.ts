import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { Output, outputResults } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";
import { parseClients } from "./locationd";

/**
 * Function to extract RootDomain info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractRootDomain(
  app_paths: ManifestApp[],
  db_path: string,
  output: Output,
) {
  for (const path of app_paths) {
    const info = parseManifestAppPlist(path.file);
    if (info instanceof IosError) {
      continue;
    }
    if (path.file_type != FileType.IsFile) {
      continue;
    }
    const target = `${db_path}/${path.directory}/${path.fileID}`;
    if (info.path.includes("locationd/clients.plist")) {
      const result = parseClients(target);
      outputResults(result, "rootdomain_locationd_clients", output);
      continue;
    }
    //console.log(info.path);
    //console.log(target);
  }
}
