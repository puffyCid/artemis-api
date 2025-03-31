import { Amcache } from "../../../../types/windows/amcache";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline Amcache
 * @param data Array of `Amcache`
 * @returns Array `TimesketchTimeline` of Amcache
 */
export function timelineAmcache(
  data: Amcache[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.last_modified,
      timestamp_desc: "Amcache Registry Last Modified",
      message: item.path,
      artifact: "Amcache",
      data_type: "windows:registry:amcache:entry",
    };

    entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
