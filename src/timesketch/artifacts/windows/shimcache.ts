import { Shimcache } from "../../../../types/windows/shimcache";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline Shimcache
 * @param data Array of `Shimcache`
 * @returns Array `TimesketchTimeline` of Shimcache
 */
export function timelineShimcache(
  data: Shimcache[],
): TimesketchTimeline[] {
  const entries: TimesketchTimeline[] = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.last_modified,
      timestamp_desc: "Shimcache Last Modified",
      message: item.path,
      artifact: "Shimcache",
      data_type: "windows:registry:shimcache:entry",
    };

    entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
