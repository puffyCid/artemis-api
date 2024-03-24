import { Launchd } from "../../../../types/macos/launchd.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Launchd. (This artifact has no timestamp)
 * @param data Array of `Launchd`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Launchd
 */
export function timelineLaunchd(
  data: Launchd[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    const entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: data[i].plist_path,
      hash: "",
      user: "",
      data_type: "macos:plist:launchd:entry",
      artifact: "Launchd",
      _raw: include_raw ? data[i] : "",
    };

    entries.push(entry);
  }

  return entries;
}
