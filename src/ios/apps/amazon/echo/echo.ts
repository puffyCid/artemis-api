import {
  FileType,
  ManifestApp,
} from "../../../../../types/ios/itunes/manifest";
import { parseCookies } from "../../../../macos/safari/cookies";
import { readBreadcrumbs } from "../../../analytics/bugsnag/breadcrumbs";
import { readRunContext } from "../../../analytics/bugsnag/context";
import { readConfig } from "../../../analytics/bugsnag/config";
import { readState } from "../../../analytics/bugsnag/state";
import { readSystemState } from "../../../analytics/bugsnag/system";
import { IosError } from "../../../error";
import { parseManifestAppPlist } from "../../../itunes/apps";
import { parsePreferences } from "./preferences";
import { OutputManager } from "../../../../system/output";
import { readCapabilities } from "./preferences";

/**
 * Function to parse Amazon Echo info
 * @param app_paths Array of `ManifestApp` entries
 * @param db_path iTunes backup directory
 * @param format `Output` configuration object
 */
export function extractAmazonEcho(
  app_paths: ManifestApp[],
  db_path: string,
  manager: OutputManager,
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
    if (info.path.includes("Preferences/com.amazon.echo.plist")) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_preferences");
      continue;
    } else if (info.path.includes("breadcrumbs")) {
      const result = readBreadcrumbs(target);
      manager.write_artifact(result, "amazon_echo_bugsnag_breakcrumbs");
      continue;
    } else if (info.path.includes("run_context")) {
      const result = readRunContext(target);
      manager.write_artifact(result, "amazon_echo_bugsnag_runcontext");
      continue;
    } else if (info.path.includes("system_state.json")) {
      const result = readSystemState(target);
      manager.write_artifact(result, "amazon_echo_bugsnag_systemstate");
      continue;
    } else if (info.path.includes("metadata.json")) {
      const result = readSystemState(target);
      manager.write_artifact(result, "amazon_echo_bugsnag_metadata");
      continue;
    } else if (
      info.path.includes("state.json")
    ) {
      const result = readState(target);
      manager.write_artifact(result, "amazon_echo_bugsnag_state");
      continue;
    } else if (
      info.path.includes("config.json")
    ) {
      const result = readConfig(target);
      manager.write_artifact(result, "amazon_echo_bugsnag_config");
      continue;
    } else if (info.path.includes("KSCrashReports/Alexa-CrashState.json")) {
      const result = readRunContext(target);
      manager.write_artifact(result, "amazon_echo_crashstate");
      continue;
    } else if (
      info.path.includes("Preferences/group.com.amazon.alexa.dev.plist")
    ) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_preferences_dev");
      continue;
    } else if (info.path.includes("Preferences/group.com.amazon.echo.plist")) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_preferences_group");
      continue;
    } else if (
      info.path.includes(
        "Preferences/com.amazon.alexa.FeatureServiceV2.dynamicStorage.plist",
      )
    ) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_dynamicstorage");
      continue;
    } else if (info.path.includes("Preferences/AssetManagementStorage.plist")) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_assetmanagement");
      continue;
    } else if (info.path.includes("Preferences/com.amazon.Uploader.plist")) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_uploader");
      continue;
    } else if (
      info.path.includes(
        "Preferences/com.amazon.alexa.voice.userdefaults.plist",
      )
    ) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "amazon_echo_userdefaults");
      continue;
    } else if (
      info.path.includes("Cookies.binarycookies")
    ) {
      const result = parseCookies(target);
      manager.write_artifact(result, "amazon_echo_cookies");
      continue;
    } else if (
      info.path.includes("com.amazon.alexa.Capabilities.data")
    ) {
      const result = readCapabilities(target);
      manager.write_artifact(result, "amazon_echo_capabilities");
      continue;
    }

    /// Everything else is not supported yet
    if (info.path.includes("Application Support/device.sqlite")) {
      continue;
    } else if (
      info.path.includes("notificationCenter/notificationCenter.sqlite")
    ) {
      continue;
    } else if (info.path.includes("AIMAP_firstRun.txt")) {
      continue;
    } else if (info.path.includes("arcus.json")) {
      continue;
    } else if (info.path.includes("/salt")) {
      continue;
    } else if (info.path.includes("accessoriesKota/callAfter_v2.json")) {
      // Binary ID. UUID?
      continue;
    } else if (info.path.includes("FAS/FASPolicyStore_v2.json")) {
      // Binary ID. UUID?
      continue;
    } else if (info.path.includes("FAS/FASRecordStore_v2.json")) {
      // Binary ID. UUID?
      continue;
    } else if (
      info.path.includes("accessoriesRegistrations/registrations_v2.json")
    ) {
      // Binary ID. UUID?
      continue;
    } else if (
      info.path.includes("AccountId/accountIdRecord_v2.json")
    ) {
      // Binary ID. UUID?
      continue;
    } else if (
      info.path.includes("UnmatchedLocales/UnmatchedLocaleRecordStore_v2.json")
    ) {
      // Binary ID. UUID?
      continue;
    } else if (info.path.includes("remoteConfigs")) {
      continue;
    } else if (info.path.includes("LocalStorage_v2_db/LocalStorage_v2_db")) {
      continue;
    } else if (info.path.includes("com.amazon.alexa.reminders.data")) {
      continue;
    } else if (info.path.includes("observations.db")) {
      continue;
    } else if (info.path.includes("METRICS_NORMAL")) {
      // Contains metrics file. Filename is a timestmap in UNIXEPOCH with millisecond precision
      continue;
    }
  }
}
