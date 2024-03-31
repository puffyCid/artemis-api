import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "../../../../types/windows/srum.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Windows Search
 * @param data Array of `SearchEntry`
 * @returns Array `TimesketchTimeline` of Search
 */
export function timelineSrum(
  data:
    | ApplicationInfo[]
    | ApplicationTimeline[]
    | AppVfu[]
    | EnergyInfo[]
    | EnergyUsage[]
    | NetworkInfo[]
    | NetworkConnectivityInfo[]
    | NotificationInfo[],
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(data[i].timestamp),
      timestamp_desc: "SRUM Table Update",
      message: data[i].app_id,
      artifact: "",
      data_type: "",
    };

    entry = { ...entry, ...data[i] };
    if (entry["facetime"] != undefined) {
      entry.artifact = "Windows SRUM Application Info";
      entry.data_type = "windows:ese:srum:application_info:entry";
    } else if (entry["cycles_wob"] != undefined) {
      entry.artifact = "Windows SRUM Application Timeline";
      entry.data_type = "windows:ese:srum:application_timeline:entry";
    } else if (entry["start_time"] != undefined) {
      entry.artifact = "Windows SRUM App VFU";
      entry.data_type = "windows:ese:srum:app_vfu:entry";
      entry["start_time"] = unixEpochToISO((data[i] as AppVfu).start_time);
      entry["end_time"] = unixEpochToISO((data[i] as AppVfu).end_time);
    } else if (entry["binary_data"] != undefined) {
      entry.artifact = "Windows SRUM Energy Info";
      entry.data_type = "windows:ese:srum:energy_info:entry";
    } else if (entry["event_timestamp"] != undefined) {
      entry.artifact = "Windows SRUM Energy Usage";
      entry.data_type = "windows:ese:srum:energy_usage:entry";
      entry["event_timestamp"] = unixEpochToISO(
        (data[i] as EnergyUsage).event_timestamp,
      );
    } else if (entry["bytes_sent"] != undefined) {
      entry.artifact = "Windows SRUM Network Info";
      entry.data_type = "windows:ese:srum:network_info:entry";
    } else if (entry["connected_time"] != undefined) {
      entry.artifact = "Windows SRUM Network Connectivity";
      entry.data_type = "windows:ese:srum:network_connectivity:entry";
      entry["connect_start_time"] = unixEpochToISO(
        (data[i] as NetworkConnectivityInfo).connect_start_time,
      );
    } else if (entry["notification_type"] != undefined) {
      entry.artifact = "Windows SRUM Notification Info";
      entry.data_type = "windows:ese:srum:notification_info:entry";
    }

    // Timestamp is a reserved word for Timesketch. So we will rename to srum_timestamp
    delete entry["timestamp"];
    entry["srum_timestamp"] = unixEpochToISO(data[i].timestamp);
    entries.push(entry);
  }

  return entries;
}
