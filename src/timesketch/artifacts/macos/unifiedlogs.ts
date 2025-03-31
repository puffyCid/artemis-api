import { UnifiedLog } from "../../../../types/macos/unifiedlogs";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline unifiedlogs
 * @param data Array of `UnifiedLog`
 * @returns Array `TimesketchTimeline` of UnifiedLog
 */
export function timelineUnifiedLogs(
  data: UnifiedLog[],
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: data[i].timestamp,
      timestamp_desc: "UnifiedLog Entry Created",
      message: "",
      artifact: "UnifiedLogs",
      data_type: "macos:unifiedlog:event",
    };

    entry = { ...entry, ...data[i] };
    entries.push(entry);
  }

  return entries;
}
