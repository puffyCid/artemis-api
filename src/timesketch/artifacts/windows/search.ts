import { SearchEntry } from "../../../../types/windows/search.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Windows Search
 * @param data Array of `SearchEntry`
 * @returns Array `TimesketchTimeline` of Search
 */
export function timelineSearch(data: SearchEntry[]): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(data[i].last_modified),
      timestamp_desc: "Search Entry Last Modified",
      message: data[i].entry,
      artifact: "Search",
      data_type: "windows:ese:search:entry",
    };

    entry = { ...entry, ...data[i].properties };
    entry["last_modified"] = unixEpochToISO(data[i].last_modified);
    entries.push(entry);
  }

  return entries;
}
