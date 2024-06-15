import { UserInfo } from "../../../../types/windows/users.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Windows Users
 * @param data Array of `UserInfo`
 * @returns Array `TimesketchTimeline` of UserInfo
 */
export function timelineUsersWindows(
  data: UserInfo[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.last_logon,
      timestamp_desc: "User Last Logon",
      message: item.username,
      artifact: "Windows User",
      data_type: "windows:registry:users:entry",
    };

    entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
