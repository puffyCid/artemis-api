import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest.ts";
import { Output, outputResults } from "../../../system/output.ts";
import { IosError } from "../../error.ts";
import { parseManifestAppPlist } from "../../itunes/apps.ts";
import { parseChat, parseMeetings } from "./preferences.ts";

/**
 * Function to parse Zoom info
 * @param app_paths Array of `ManifestApp` entries
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractZoom(
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

    if (info.path.includes("us.zoom.videomeetings.plist")) {
      const result = parseMeetings(target);
      outputResults(result, "zoom_preferences_meetings", output);
      continue;
    } else if (info.path.includes("ZoomChat.plist")) {
      const result = parseChat(target);
      outputResults(result, "zoom_preferences_chat", output);
      continue;
    }

    /// Everything else is not supported yet
    if (info.path.includes("/salt")) {
      continue;
    } else if (
      info.path.includes("/observations.db")
    ) {
      continue;
    } else if (info.path.includes("RecentSearches.plist")) {
      continue;
    }
  }
}
