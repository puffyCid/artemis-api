import { Groups } from "../../../../types/macos/accounts.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline macos Groups
 * @param data Array of `Groups`
 * @returns Array `TimesketchTimeline` of Groups
 */
export function timelineGroupsMacos(data: Groups[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.name.join(""),
      artifact: "Groups",
      data_type: "macos:plist:accounts:group",
    };
    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
