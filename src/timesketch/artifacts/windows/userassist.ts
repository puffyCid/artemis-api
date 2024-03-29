import { UserAssist } from "../../../../types/windows/userassist.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

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
      datetime: unixEpochToISO(item.last_execution),
      timestamp_desc: "Userassist Last Execution",
      message: item.path,
      hash: "",
      user: "",
      artifact: "UserAssist",
      data_type: "windows:registry:userassist:entry",
      _raw: "",
    };

    entry = { ...entry, ...item };
    entry["last_execution"] = unixEpochToISO(item.last_execution);

    entries.push(entry);
  }

  return entries;
}
