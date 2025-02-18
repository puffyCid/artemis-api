import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest.ts";
import { Output, outputResults } from "../../../system/output.ts";
import { parseHeartbeat } from "../../analytics/firebase/heartbeat.ts";
import { extractStatStorage } from "../../analytics/sendbird/sdk.ts";
import { IosError } from "../../error.ts";
import { parseManifestAppPlist } from "../../itunes/apps.ts";
import { extractChat, extractComment, extractNotifications } from "./chat.ts";
import { parseMetrics } from "./metrics.ts";
import { parsePreferences, parseSupportLog } from "./preferences.ts";

/**
 * Function to extract Hinge app information
 * @param app_paths Array of `ManifestApp` associated with Hinge app
 * @param db_path Path to the iTunes `Manifest.db`
 * @param output `Output` configuration object
 */
export function extractHingeInfo(
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
    if (info.path.includes("Preferences/co.hinge.mobile.ios.plist")) {
      const result = parsePreferences(target);
      outputResults(result, "hinge_preferences", output);
      continue;
    } else if (
      info.path.includes("Application%20Support/co.hinge.mobile.ios")
    ) {
      const result = extractComment(target);
      outputResults(result, "hinge_support", output);
      continue;
    } else if (
      info.path.includes("Application Support/HingeChat.sqlite")
    ) {
      const result = extractChat(target);
      outputResults(result, "hinge_chat", output);
      continue;
    } else if (info.path.includes("Library/Application Support/logs/")) {
      const result = parseSupportLog(target);
      outputResults(result, "hinge_logs", output);
      continue;
    } else if (
      info.path.includes("Application Support/MetricsDataModel.sqlite")
    ) {
      const result = parseMetrics(target);
      outputResults(result, "hinge_metrics", output);
      continue;
    } else if (info.path.includes("HingeRecord.sqlite")) {
      const result = extractNotifications(target);
      outputResults(result, "hinge_record", output);
      continue;
    } else if (info.path.includes("google-heartbeat-storage")) {
      const result = parseHeartbeat(target);
      outputResults(result, "hinge_firebase_heartbeat", output);
      continue;
    } else if (info.path.includes("com.sendbird.sdk.stat.storage.plist")) {
      const result = extractStatStorage(target);
      outputResults(result, "hinge_sendbird", output);
      continue;
    }

    /// Everything else is not supported yet
    if (info.path.includes("ResourceLoadStatistics/observations.db")) {
      continue;
    } else if (
      info.path.includes(
        "group.co.hinge.mobile.ios.notification-extensions.plist",
      )
    ) {
      continue;
    } else if (info.path.includes("APMExperimentSuiteName.plist")) {
      continue;
    } else if (info.path.includes("CLSUserDefaults.plist")) {
      continue;
    } else if (info.path.includes("com.apple.EmojiCache.plist")) {
      continue;
    } else if (info.path.includes("appsflyer.remotecontrol.plist")) {
      continue;
    } else if (info.path.includes("com.firebase.FIRInstallations.plis")) {
      continue;
    } else if (info.path.includes("group.co.hinge.mobile.ios.firebase.plist")) {
      continue;
    } else if (info.path.includes("com.sendbird.database/Senbird.sqlite3")) {
      continue;
    } else if (info.path.includes("WebKit/WebsiteData/MediaKeys")) {
      continue;
    } else if (info.path.includes("APMAnalyticsSuiteName.plist")) {
      continue;
    } else if (info.path.includes("com.google.gmp.measurement.monitor.plist")) {
      continue;
    } else if (info.path.includes("com.sendbird.sdk.manager.session.plist")) {
      continue;
    } else if (
      info.path.includes(
        "com.sendbird.sdk.messaging.local_cache_preference.plist",
      )
    ) {
      continue;
    } else if (info.path.includes("WebKit/WebsiteData/Default/salt")) {
      continue;
    } else if (info.path.includes("com-facebook-sdk-AppEventsTimeSpent.json")) {
      continue;
    } else if (info.path.includes("com.sendbird.sdk.ios.plist")) {
      continue;
    } else if (
      info.path.includes("com-facebook-sdk-PersistedAnonymousID.json")
    ) {
      continue;
    }
  }
}
