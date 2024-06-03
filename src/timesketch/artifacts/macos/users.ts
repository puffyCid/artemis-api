import { Users } from "../../../../types/macos/accounts.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline macos users
 * @param data Array of `Users`
 * @returns Array `TimesketchTimeline` of Users
 */
export function timelineUsersMacos(
  data: Users[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.account_created),
      timestamp_desc: "User Created",
      message: item.home_path.join(" "),
      artifact: "Users",
      data_type: "macos:plist:accounts:user",
    };
    entry = { ...entry, ...item };
    entry["account_created"] = unixEpochToISO(item.account_created);
    entries.push(entry);
  }

  return entries;
}