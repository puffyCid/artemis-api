import { UserAssist } from "../../../../types/windows/userassist.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline UserAssist
 * @param data Array of `UserAssist`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of UserAssist
 */
export function timelineUserAssist(
  data: UserAssist[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.last_execution,
      timestamp_desc: "Userassist Last Execution",
      message: item.path,
      artifact: "UserAssist",
      data_type: "windows:registry:userassist:entry",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
