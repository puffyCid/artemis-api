import { Spotlight } from "../../../../types/macos/spotlight.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline macos users
 * @param data `Spotlight` object
 * @returns Array `TimesketchTimeline` of Spotlight
 */
export function timelineSpotlight(
  data: Spotlight[],
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: data[i].last_updated,
      timestamp_desc: "Spotlight Entry Last Updated",
      message: data[i].values["_kMDItemFileName"]?.value as string ??
        `Inode: ${data[i].inode}`,
      artifact: "Spotlight",
      data_type: "macos:spotlight:entry",
    };
    entry = { ...entry, ...data[i] };
    entries.push(entry);
  }

  return entries;
}
