import { LogonsWindows } from "../../../../../types/windows/eventlogs/logons.ts";
import { TimesketchTimeline } from "../../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Windows Logons
 * @param data Array of `LogonsWindows`
 * @returns Array `TimesketchTimeline` of LogonsWindows
 */
export function timelineLogonsWindows(
  data: LogonsWindows[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.logoff_time,
      timestamp_desc: "Windows Logoff",
      message: `Logoff for: ${item.account_domain}\\${item.account_name}`,
      artifact: "Windows Logons",
      data_type: "windows:eventlogs:logons:entry",
    };

    entry = { ...entry, ...item };
    entry["logon_time"] = item.logon_time;
    entry["logoff_time"] = item.logoff_time;

    entries.push(Object.assign({}, entry));
    entry.datetime = item.logon_time;
    entry.timestamp_desc = "Windows Logon";
    entry.message = `Logon for: ${item.account_domain}\\${item.account_name}`;
    entries.push(entry);
  }

  return entries;
}
