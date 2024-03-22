import { Users } from "../../../../types/macos/accounts.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline macos users
 * @param data Array of `Users`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Users
 */
export function timelineUsersMacos(
  data: Users[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.account_created),
      timestamp_desc: "User Created",
      message: item.home_path.join(" "),
      hash: "",
      user: item.name.join(" "),
      artifact: "Users",
      data_type: "macos:plist:accounts:user",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
