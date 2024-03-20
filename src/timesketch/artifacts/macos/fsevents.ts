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
    const entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: data[i].path,
      hash: "",
      user: "",
      artifact: "FsEvents",
      _raw: include_raw ? data[i] : "",
    };

    entries.push(entry);
  }

  console.log(entries.length);
  return entries;
}
