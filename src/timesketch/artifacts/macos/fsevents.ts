import { Fsevents } from "../../../../types/macos/fsevents.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline fsevents. (This artifact has no timestamp)
 * @param data Array of `Fsevents`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Fsevents
 */
export function timelineFsevents(
  data: Fsevents[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: data[i].path,
      hash: "",
      user: "",
      data_type: "macos:fsevents:entry",
      artifact: "FsEvents",
      _raw: include_raw ? data[i] : "",
    };
    entry = { ...entry, ...data[i] };

    entries.push(entry);
  }

  return entries;
}
