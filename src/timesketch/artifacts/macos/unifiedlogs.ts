import { UnifiedLog } from "../../../../types/macos/unifiedlogs.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline unifiedlogs
 * @param data Array of `UnifiedLog`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of UnifiedLog
 */
export function timelineUnifiedLogs(
  data: UnifiedLog[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(data[i].time),
      timestamp_desc: "UnifiedLog Entry Created",
      message: "",
      hash: "",
      user: data[i].euid.toString(),
      artifact: "UnifiedLogs",
      data_type: "macos:unifiedlog:event",
      _raw: include_raw ? data[i] : "",
    };

    entry = { ...entry, ...data[i] };

    entries.push(entry);
  }

  return entries;
}
