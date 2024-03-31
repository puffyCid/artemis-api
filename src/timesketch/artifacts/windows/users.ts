import { UserInfo } from "../../../../types/windows/users.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

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
      datetime: unixEpochToISO(item.last_logon),
      timestamp_desc: "User Last Logon",
      message: item.username,
      artifact: "Windows User",
      data_type: "windows:registry:users:entry",
    };

    entry = { ...entry, ...item };
    entry["password_last_set"] = unixEpochToISO(item.password_last_set);
    entry["last_password_failure"] = unixEpochToISO(item.last_password_failure);
    entry["last_logon"] = unixEpochToISO(item.last_logon);
    entries.push(entry);
  }

  return entries;
}
