import { Spotlight } from "../../../../types/macos/spotlight.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline macos users
 * @param data `Spotlight` object
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Spotlight
 */
export function timelineSpotlight(
  data: Spotlight[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(data[i].last_updated),
      timestamp_desc: "Spotlight Entry Last Updated",
      message: data[i].values["_kMDItemFileName"]?.value as string ??
        `Inode: ${data[i].inode}`,
      hash: "",
      user: "",
      artifact: "Spotlight",
      data_type: "macos:spotlight:entry",
      _raw: include_raw ? data[i] : "",
    };

    entries.push(entry);
  }

  return entries;
}
