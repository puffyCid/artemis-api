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

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.time),
      timestamp_desc: "UnifiedLogEntryCreated",
      message: item.message,
      hash: "",
      user: item.euid.toString(),
      artifact: "UnifiedLogs",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
