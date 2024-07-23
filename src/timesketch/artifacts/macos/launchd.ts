import { Launchd } from "../../../../types/macos/launchd.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { encode, encodeBytes } from "../../../encoding/mod.ts";

/**
 * Function to timeline Launchd. (This artifact has no timestamp)
 * @param data Array of `Launchd`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Launchd
 */
export function timelineLaunchd(
  data: Launchd[],
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    const entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: data[i].plist_path,
      data_type: "macos:plist:launchd:entry",
      artifact: "Launchd",
    };

    for (const key in data[i].launchd_data) {
      // Timesketch will sometimes silently compalain about large objects and exlude them.
      // So for now we will just base64 them
      if (
        typeof data[i].launchd_data[key] === "object" &&
        !Array.isArray(data[i].launchd_data[key])
      ) {
        const string = JSON.stringify(data[i].launchd_data[key]);
        const encoded = encode(encodeBytes(string));

        // Workaround for https://github.com/google/timesketch/issues/3087
        if (key === "Disabled") {
          entry["Disabled_"] = encoded;
          continue;
        }

        entry[key] = encoded;
        continue;
      }
      entry[key] = data[i].launchd_data[key];
    }

    const check_times: Record<string, string> = {};

    check_times[data[i].created] = "Created";
    check_times[data[i].modified] === undefined
      ? (check_times[data[i].modified] = "Modified")
      : (check_times[data[i].modified] = `${
        check_times[data[i].modified]
      } Modified`);

    check_times[data[i].changed] === undefined
      ? (check_times[data[i].changed] = "Changed")
      : (check_times[data[i].changed] = `${
        check_times[data[i].changed]
      } Changed`);

    check_times[data[i].accessed] === undefined
      ? (check_times[data[i].accessed] = "Accessed")
      : (check_times[data[i].accessed] = `${
        check_times[data[i].accessed]
      } Accessed`);

    for (const key in check_times) {
      entry.datetime = check_times[key];
      entry.timestamp_desc = key;
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}
