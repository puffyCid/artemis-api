import { getPlist, parseCookies, queryTccDb } from "../../../../mod";
import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { MacosError } from "../../../macos/errors";
import { Output, output } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";
import { extractAppState } from "./appstate";

/**
 * Function to extract HomeDomain info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param format `Output` configuration object
 */
export function extractHomeDomain(
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
    if (info.path.includes("/TCC.db")) {
      const result = queryTccDb(target);
      output(
        JSON.stringify(result),
        "homedomain_tcc",
        format,
      );
      continue;
    } else if (info.path.includes("springboard.plist")) {
      const plist_data = getPlist(target);
      if (plist_data instanceof MacosError) {
        continue;
      }

      if (Array.isArray(plist_data[ "SBLockPoster" ])) {
        const bytes = plist_data[ "SBLockPoster" ] as number[];
        const poster = getPlist(new Uint8Array(bytes));
        if (!(poster instanceof MacosError)) {
          plist_data[ "SBLockPoster" ] = poster;
        }
      }
      if (Array.isArray(plist_data[ "SBProductivityGestureEducationItemMap" ])) {
        const bytes = plist_data[ "SBProductivityGestureEducationItemMap" ] as number[];
        const item = getPlist(new Uint8Array(bytes));
        if (!(item instanceof MacosError)) {
          plist_data[ "SBProductivityGestureEducationItemMap" ] = item;
        }
      }

      output(
        plist_data,
        "homedomain_springboard_preferences",
        format,
      );
      continue;
    } else if (info.path === "Library/Preferences/com.apple.Preferences.plist") {
      const plist_data = getPlist(target);
      if (plist_data instanceof MacosError) {
        continue;
      }
      output(
        plist_data,
        "homedomain_apple_preferences",
        format,
      );
      continue;
    } else if (info.path.endsWith("com.apple.accountsd.binarycookies")) {
      const data = parseCookies(target);
      if (data instanceof MacosError) {
        continue;
      }

      output(
        data,
        "homedomain_accountsd_cookie",
        format,
      );
      continue;
    } else if (info.path.endsWith("com.apple.Preferences.binarycookies")) {
      const data = parseCookies(target);
      if (data instanceof MacosError) {
        continue;
      }

      output(
        data,
        "homedomain_preferences_cookie",
        format,
      );
      continue;
    } else if (info.path === "Library/FrontBoard/applicationState.db") {
      const data = extractAppState(target);
      if (data instanceof IosError) {
        continue;
      }
      output(
        data,
        "homedomain_application_state",
        format,
      );
      continue;
    }


    // Uncomment to view unsupported entries
    //console.log(info.path);
    //console.log(target);
  }
}
