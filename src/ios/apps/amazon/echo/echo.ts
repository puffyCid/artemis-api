import {
  FileType,
  ManifestApp,
} from "../../../../../types/ios/itunes/manifest.ts";
import { parseCookies } from "../../../../macos/safari/cookies.ts";
import { readBreadcrumbs } from "../../../analytics/bugsnag/breadcrumbs.ts";
import { readRunContext } from "../../../analytics/bugsnag/context.ts";
import { readConfig } from "../../../analytics/bugsnag/config.ts";
import { readState } from "../../../analytics/bugsnag/state.ts";
import { readSystemState } from "../../../analytics/bugsnag/system.ts";
import { IosError } from "../../../error.ts";
import { parseManifestAppPlist } from "../../../itunes/apps.ts";
import { parsePreferences } from "./preferences.ts";
import { outputResults } from "../../../../../mod.ts";
import { Output } from "../../../../system/output.ts";
import { readCapabilities } from "./preferences.ts";

/**
 * Function to parse Amazon Echo info
 * @param app_paths Array of `ManifestApp` entries
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractAmazonEcho(
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
    if (info.path.includes("Preferences/com.amazon.echo.plist")) {
      const result = parsePreferences(target);
      outputResults(JSON.stringify(result), "amazon_echo_preferences", output);
      continue;
    } else if (info.path.includes("breadcrumbs")) {
      const result = readBreadcrumbs(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_bugsnag_breakcrumbs",
        output,
      );
      continue;
    } else if (info.path.includes("run_context")) {
      const result = readRunContext(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_bugsnag_runcontext",
        output,
      );
      continue;
    } else if (info.path.includes("system_state.json")) {
      const result = readSystemState(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_bugsnag_systemstate",
        output,
      );
      continue;
    } else if (info.path.includes("metadata.json")) {
      const result = readSystemState(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_bugsnag_metadata",
        output,
      );
      continue;
    } else if (
      info.path.includes("state.json")
    ) {
      const result = readState(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_bugsnag_state",
        output,
      );
      continue;
    } else if (
      info.path.includes("config.json")
    ) {
      const result = readConfig(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_bugsnag_config",
        output,
      );
      continue;
    } else if (info.path.includes("KSCrashReports/Alexa-CrashState.json")) {
      const result = readRunContext(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_crashstate",
        output,
      );
      continue;
    } else if (
      info.path.includes("Preferences/group.com.amazon.alexa.dev.plist")
    ) {
      const result = parsePreferences(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_preferences_dev",
        output,
      );
      continue;
    } else if (info.path.includes("Preferences/group.com.amazon.echo.plist")) {
      const result = parsePreferences(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_preferences_group",
        output,
      );
      continue;
    } else if (
      info.path.includes(
        "Preferences/com.amazon.alexa.FeatureServiceV2.dynamicStorage.plist",
      )
    ) {
      const result = parsePreferences(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_dynamicstorage",
        output,
      );
      continue;
    } else if (info.path.includes("Preferences/AssetManagementStorage.plist")) {
      const result = parsePreferences(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_assetmanagement",
        output,
      );
      continue;
    } else if (info.path.includes("Preferences/com.amazon.Uploader.plist")) {
      const result = parsePreferences(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_uploader",
        output,
      );
      continue;
    } else if (
      info.path.includes(
        "Preferences/com.amazon.alexa.voice.userdefaults.plist",
      )
    ) {
      const result = parsePreferences(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_userdefaults",
        output,
      );
      continue;
    } else if (
      info.path.includes("Cookies.binarycookies")
    ) {
      const result = parseCookies(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_cookies",
        output,
      );
      continue;
    } else if (
      info.path.includes("com.amazon.alexa.Capabilities.data")
    ) {
      const result = readCapabilities(target);
      outputResults(
        JSON.stringify(result),
        "amazon_echo_capabilities",
        output,
      );
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
