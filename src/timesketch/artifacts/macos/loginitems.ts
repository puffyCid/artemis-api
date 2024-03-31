import { LoginItems } from "../../../../types/macos/loginitems.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline loginitems
 * @param data Array of `LoginItems`
 * @returns Array `TimesketchTimeline` of LoginItems
 */
export function timelineLoginItems(
  data: LoginItems[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.created),
      timestamp_desc: "LoginItem Created",
      message: item.path.length != 0
        ? `${item.volume_url}${item.path.join("/")}`
        : `${item.app_binary}`,
      artifact: "LoginItems",
      data_type: "macos:plist:loginitems:entry",
    };
    entry = { ...entry, ...item };
    entry["volume_created"] = unixEpochToISO(item.volume_created);
    entries.push(entry);
  }

  return entries;
}
