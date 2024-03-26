import { RecycleBin } from "../../../../types/windows/recyclebin.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline RecycleBin
 * @param data Array of `RecycleBin`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of RecycleBin
 */
export function timelineRecycleBin(
  data: RecycleBin[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.deleted),
      timestamp_desc: "RecycleBin File Deleted",
      message: item.full_path,
      hash: "",
      user: item.sid,
      artifact: "RecycleBin",
      data_type: "windows:recyclebin:file",
      _raw: include_raw ? item : "",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
