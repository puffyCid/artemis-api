import { RecycleBin } from "../../../../types/windows/recyclebin.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline RecycleBin
 * @param data Array of `RecycleBin`
 * @returns Array `TimesketchTimeline` of RecycleBin
 */
export function timelineRecycleBin(
  data: RecycleBin[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.deleted,
      timestamp_desc: "RecycleBin File Deleted",
      message: item.full_path,
      artifact: "RecycleBin",
      data_type: "windows:recyclebin:file",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
