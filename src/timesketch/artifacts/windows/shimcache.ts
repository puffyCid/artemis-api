import { Shimcache } from "../../../../types/windows/shimcache.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Shimcache
 * @param data Array of `Shimcache`
 * @returns Array `TimesketchTimeline` of Shimcache
 */
export function timelineShimcache(
  data: Shimcache[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.last_modified),
      timestamp_desc: "Shimcache Last Modified",
      message: item.path,
      artifact: "Shimcache",
      data_type: "windows:registry:shimcache:entry",
    };
    entry = { ...entry, ...item };
    entry["last_modified"] = unixEpochToISO(item.last_modified);
    entries.push(entry);
  }

  return entries;
}
