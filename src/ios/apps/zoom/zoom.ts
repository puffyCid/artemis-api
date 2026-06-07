import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { Output, output } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";
import { parseChat, parseMeetings } from "./preferences";

/**
 * Function to parse Zoom info
 * @param app_paths Array of `ManifestApp` entries
 * @param db_path iTunes backup directory
 * @param format `Output` configuration object
 */
export function extractZoom(
  app_paths: ManifestApp[],
  db_path: string,
  format: Output,
) {
  for (const path of app_paths) {
    const info = parseManifestAppPlist(path.file);
    if (info instanceof IosError) {
      continue;
    }
    if (path.file_type !== FileType.IsFile) {
      continue;
    }
    const target = `${db_path}/${path.directory}/${path.fileID}`;

    if (info.path.includes("us.zoom.videomeetings.plist")) {
      const result = parseMeetings(target);
      output(result, "zoom_preferences_meetings", format);
      continue;
    } else if (info.path.includes("ZoomChat.plist")) {
      const result = parseChat(target);
      output(result, "zoom_preferences_chat", format);
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
