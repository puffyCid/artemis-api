import { queryTccDb } from "../../../../mod";
import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { Output, outputResults } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";

/**
 * Function to extract HomeDomain info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractHomeDomain(
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
    if (info.path.includes("/TCC.db")) {
      const result = queryTccDb(target);
      outputResults(
        JSON.stringify(result),
        "homedomain_tcc",
        output,
      );
      continue;
    }

    // Uncomment to view unsupported entries
    //console.log(info.path);
    //console.log(target);
  }
}
