import { ExecPolicy } from "../../../../types/macos/execpolicy.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline execpolicy
 * @param data Array of `ExecPolicy`
 * @returns Array `TimesketchTimeline` of LoginItems
 */
export function timelineExecpolicy(data: ExecPolicy[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.executable_timestamp),
      timestamp_desc: "ExecPolicy Entry Created",
      message: item.file_identifier,
      artifact: "ExecPolicy",
      data_type: "macos:sqlite:execpolicy:entry",
    };
    entry = { ...entry, ...item };
    entry["executable_timestamp"] = unixEpochToISO(item.executable_timestamp);
    entry["executable_measurements_v2_timestamp"] = unixEpochToISO(
      item.executable_measurements_v2_timestamp,
    );
    entry["reported_timstamp"] = unixEpochToISO(item.reported_timstamp);
    entry["mod_time"] = unixEpochToISO(item.mod_time);
    entry["policy_scan_cache_timestamp"] = unixEpochToISO(
      item.policy_scan_cache_timestamp,
    );
    entry["revocation_check_time"] = unixEpochToISO(item.revocation_check_time);

    entries.push(entry);
  }

  return entries;
}
