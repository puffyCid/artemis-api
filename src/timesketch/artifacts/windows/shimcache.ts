import { Shimcache } from "../../../../types/windows/shimcache.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Shimcache
 * @param data Array of `Shimcache`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Shimcache
 */
export function timelineShimcache(
  data: Shimcache[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.last_modified),
      timestamp_desc: "Shimcache Last Modified",
      message: item.path,
      hash: "",
      user: "",
      artifact: "Shimcache",
      data_type: "windows:registry:shimcache:entry",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
