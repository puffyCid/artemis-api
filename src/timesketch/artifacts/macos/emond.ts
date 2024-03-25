import { Emond } from "../../../../types/macos/emond.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Emond. (This artifact has no timestamp)
 * @param data Array of `Emond`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Emond
 */
export function timelineEmond(
  data: Emond[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: data[i].name,
      hash: "",
      user: "",
      data_type: "macos:emond:entry",
      artifact: "Emond",
      _raw: include_raw ? data[i] : "",
    };
    entry = { ...entry, ...data[i] };

    entries.push(entry);
  }

  return entries;
}
