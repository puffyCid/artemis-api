import {
  FileType,
  ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { OutputManager } from "../../../system/output";
import { parseHeartbeat } from "../../analytics/firebase/heartbeat";
import { extractStatStorage } from "../../analytics/sendbird/sdk";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";
import { extractChat, extractComment, extractNotifications } from "./chat";
import { parseMetrics } from "./metrics";
import { parsePreferences, parseSupportLog } from "./preferences";

/**
 * Function to extract Hinge app information
 * @param app_paths Array of `ManifestApp` associated with Hinge app
 * @param db_path Path to the iTunes `Manifest.db`
 * @param manager `OutputManager` configuration object
 */
export function extractHingeInfo(
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
    if (info.path.includes("Preferences/co.hinge.mobile.ios.plist")) {
      const result = parsePreferences(target);
      manager.write_artifact(result, "hinge_preferences")
      continue;
    } else if (
      info.path.includes("Application%20Support/co.hinge.mobile.ios")
    ) {
      const result = extractComment(target);
      manager.write_artifact(result, "hinge_support")
      continue;
    } else if (
      info.path.includes("Application Support/HingeChat.sqlite")
    ) {
      const result = extractChat(target);
      manager.write_artifact(result, "hinge_chat")
      continue;
    } else if (info.path.includes("Library/Application Support/logs/")) {
      const result = parseSupportLog(target);
      manager.write_artifact(result, "hinge_logs")
      continue;
    } else if (
      info.path.includes("Application Support/MetricsDataModel.sqlite")
    ) {
      const result = parseMetrics(target);
      manager.write_artifact(result, "hinge_metrics")
      continue;
    } else if (info.path.includes("HingeRecord.sqlite")) {
      const result = extractNotifications(target);
      manager.write_artifact(result, "hinge_record")
      continue;
    } else if (info.path.includes("google-heartbeat-storage")) {
      const result = parseHeartbeat(target);
      manager.write_artifact(result, "hinge_firebase_heartbeat")
      continue;
    } else if (info.path.includes("com.sendbird.sdk.stat.storage.plist")) {
      const result = extractStatStorage(target);
      manager.write_artifact(result, "hinge_sendbird")
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
