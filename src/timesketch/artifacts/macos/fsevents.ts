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

    const check_times: Record<string, string> = {};

    check_times[data[i].source_created] = "Source Created";
    check_times[data[i].source_modified] === undefined
      ? (check_times[data[i].source_modified] = "Source Modified")
      : (check_times[data[i].source_modified] = `${
        check_times[data[i].source_modified]
      } Source Modified`);

    check_times[data[i].source_changed] === undefined
      ? (check_times[data[i].source_changed] = "Source Changed")
      : (check_times[data[i].source_changed] = `${
        check_times[data[i].source_changed]
      } Source Changed`);

    check_times[data[i].source_accessed] === undefined
      ? (check_times[data[i].source_accessed] = "Source Accessed")
      : (check_times[data[i].source_accessed] = `${
        check_times[data[i].source_accessed]
      } Source Accessed`);

    for (const key in check_times) {
      entry.datetime = check_times[key];
      entry.timestamp_desc = key;
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}
