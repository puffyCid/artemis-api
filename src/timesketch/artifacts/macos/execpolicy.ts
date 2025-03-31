import { ExecPolicy } from "../../../../types/macos/execpolicy";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline execpolicy
 * @param data Array of `ExecPolicy`
 * @returns Array `TimesketchTimeline` of LoginItems
 */
export function timelineExecpolicy(data: ExecPolicy[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.executable_timestamp,
      timestamp_desc: "ExecPolicy Entry Created",
      message: item.file_identifier,
      artifact: "ExecPolicy",
      data_type: "macos:sqlite:execpolicy:entry",
    };
    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
