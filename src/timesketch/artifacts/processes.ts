import { ProcessInfo } from "../../../types/system/processes.ts";
import { TimesketchTimeline } from "../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../time/conversion.ts";

/**
 * Function to timeline process info
 * @param data Array of `ProcessInfo`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of processes
 */
export function timelineProcesses(
  data: ProcessInfo[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.start_time),
      timestamp_desc: "ProcessStart",
      message: `${item.full_path} ${item.arguments}`,
      hash: item.md5,
      user: item.uid,
      artifact: "Processes",
      data_type: "system:processes:process",
      _raw: include_raw ? item : "",
    };

    entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
