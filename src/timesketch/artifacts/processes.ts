import { ProcessInfo } from "../../../types/system/processes.ts";
import { TimesketchTimeline } from "../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../time/conversion.ts";

/**
 * Function to timeline process info
 * @param data Array of `ProcessInfo`
 * @returns Array `TimesketchTimeline` of processes
 */
export function timelineProcesses(
  data: ProcessInfo[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.start_time),
      timestamp_desc: "ProcessStart",
      message: `${item.full_path} ${item.arguments}`,
      artifact: "Processes",
      data_type: "system:processes:process",
    };

    entry = { ...entry, ...item };
    entry["start_time"] = unixEpochToISO(item.start_time);
    entries.push(entry);
  }

  return entries;
}
