import { Amcache } from "../../../../types/windows/amcache.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Amcache
 * @param data Array of `Amcache`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Amcache
 */
export function timelineAmcache(
  data: Amcache[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.last_modified),
      timestamp_desc: "Amcache Registry Last Modified",
      message: item.path,
      hash: item.sha1,
      user: "",
      artifact: "Amcache",
      data_type: "windows:registry:amcache:entry",
      _raw: include_raw ? item : "",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
