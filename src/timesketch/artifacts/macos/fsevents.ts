import { Fsevents } from "../../../../types/macos/fsevents.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline fsevents. (This artifact has no timestamp)
 * @param data Array of `Fsevents`
 * @returns Array `TimesketchTimeline` of Fsevents
 */
export function timelineFsevents(data: Fsevents[]): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: data[i].path,
      data_type: "macos:fsevents:entry",
      artifact: "FsEvents",
    };
    entry = { ...entry, ...data[i] };

    entries.push(entry);
  }

  return entries;
}
