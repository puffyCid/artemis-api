import { Groups } from "../../../../types/macos/accounts.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline macos Groups
 * @param data Array of `Groups`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Groups
 */
export function timelineGroupsMacos(
  data: Groups[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.name.join(""),
      hash: "",
      user: "",
      artifact: "Groups",
      data_type: "macos:plist:accounts:group",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
