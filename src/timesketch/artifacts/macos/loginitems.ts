import { LoginItems } from "../../../../types/macos/loginitems";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

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
      datetime: item.created,
      timestamp_desc: "LoginItem Target Created",
      message: item.path.length != 0
        ? `${item.volume_url}${item.path}`
        : `${item.app_binary}`,
      artifact: "LoginItems",
      data_type: "macos:plist:loginitems:entry",
    };
    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
