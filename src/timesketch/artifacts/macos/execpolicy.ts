import { ExecPolicy } from "../../../../types/macos/execpolicy.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline execpolicy
 * @param data Array of `ExecPolicy`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of LoginItems
 */
export function timelineExecpolicy(
  data: ExecPolicy[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.executable_timestamp),
      timestamp_desc: "ExecPolicy Entry Created",
      message: item.file_identifier,
      hash: item.main_executable_hash,
      user: "",
      artifact: "ExecPolicy",
      data_type: "macos:sqlite:execpolicy:entry",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
