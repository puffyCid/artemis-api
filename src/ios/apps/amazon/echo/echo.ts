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
import { output } from "../../../../../mod";
import { Output } from "../../../../system/output";
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
    if (info.path.includes("Preferences/com.amazon.echo.plist")) {
      const result = parsePreferences(target);
      output(JSON.stringify(result), "amazon_echo_preferences", format);
      continue;
    } else if (info.path.includes("breadcrumbs")) {
      const result = readBreadcrumbs(target);
      output(result, "amazon_echo_bugsnag_breakcrumbs", format);
      continue;
    } else if (info.path.includes("run_context")) {
      const result = readRunContext(target);
      output(result, "amazon_echo_bugsnag_runcontext", format);
      continue;
    } else if (info.path.includes("system_state.json")) {
      const result = readSystemState(target);
      output(result, "amazon_echo_bugsnag_systemstate", format);
      continue;
    } else if (info.path.includes("metadata.json")) {
      const result = readSystemState(target);
      output(result, "amazon_echo_bugsnag_metadata", format);
      continue;
    } else if (
      info.path.includes("state.json")
    ) {
      const result = readState(target);
      output(result, "amazon_echo_bugsnag_state", format);
      continue;
    } else if (
      info.path.includes("config.json")
    ) {
      const result = readConfig(target);
      output(result, "amazon_echo_bugsnag_config", format);
      continue;
    } else if (info.path.includes("KSCrashReports/Alexa-CrashState.json")) {
      const result = readRunContext(target);
      output(result, "amazon_echo_crashstate", format);
      continue;
    } else if (
      info.path.includes("Preferences/group.com.amazon.alexa.dev.plist")
    ) {
      const result = parsePreferences(target);
      output(result, "amazon_echo_preferences_dev", format);
      continue;
    } else if (info.path.includes("Preferences/group.com.amazon.echo.plist")) {
      const result = parsePreferences(target);
      output(result, "amazon_echo_preferences_group", format);
      continue;
    } else if (
      info.path.includes(
        "Preferences/com.amazon.alexa.FeatureServiceV2.dynamicStorage.plist",
      )
    ) {
      const result = parsePreferences(target);
      output(result, "amazon_echo_dynamicstorage", format);
      continue;
    } else if (info.path.includes("Preferences/AssetManagementStorage.plist")) {
      const result = parsePreferences(target);
      output(result, "amazon_echo_assetmanagement", format);
      continue;
    } else if (info.path.includes("Preferences/com.amazon.Uploader.plist")) {
      const result = parsePreferences(target);
      output(result, "amazon_echo_uploader", format);
      continue;
    } else if (
      info.path.includes(
        "Preferences/com.amazon.alexa.voice.userdefaults.plist",
      )
    ) {
      const result = parsePreferences(target);
      output(result, "amazon_echo_userdefaults", format);
      continue;
    } else if (
      info.path.includes("Cookies.binarycookies")
    ) {
      const result = parseCookies(target);
      output(result, "amazon_echo_cookies", format);
      continue;
    } else if (
      info.path.includes("com.amazon.alexa.Capabilities.data")
    ) {
      const result = readCapabilities(target);
      output(result, "amazon_echo_capabilities", format);
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
