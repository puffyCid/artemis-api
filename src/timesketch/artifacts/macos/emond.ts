import { Emond } from "../../../../types/macos/emond";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline Emond. (This artifact has no timestamp)
 * @param data Array of `Emond`
 * @returns Array `TimesketchTimeline` of Emond
 */
export function timelineEmond(data: Emond[]): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: "1970-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: data[ i ].name,
      data_type: "macos:emond:entry",
      artifact: "Emond",
    };
    entry = { ...entry, ...data[ i ] };

    entries.push(entry);
  }

  return entries;
}
