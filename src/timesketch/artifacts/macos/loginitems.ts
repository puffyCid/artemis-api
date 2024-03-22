import { LoginItems } from "../../../../types/macos/loginitems.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline loginitems
 * @param data Array of `LoginItems`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of LoginItems
 */
export function timelineLoginItems(
  data: LoginItems[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.created),
      timestamp_desc: "LoginItem Created",
      message: item.path.length != 0
        ? `${item.volume_url}${item.path.join("/")}`
        : `${item.app_binary}`,
      hash: "",
      user: item.uid.toString(),
      artifact: "LoginItems",
      data_type: "macos:plist:loginitems:entry",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
