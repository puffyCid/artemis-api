import { UsnJrnl } from "../../../../types/windows/usnjrnl.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline UsnJrnl
 * @param data Array of `UsnJrnl`
 * @returns Array `TimesketchTimeline` of UsnJrnl
 */
export function timelineUsnJrnl(
  data: UsnJrnl[],
): TimesketchTimeline[] {
  const entries = [];

  for (let i = 0; i < data.length; i++) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(data[i].update_time),
      timestamp_desc: `UsnJrnl ${data[i].update_reason}`,
      message: data[i].full_path,
      artifact: "UsnJrnl",
      data_type: "fs:ntfs:usnjrnl:entry",
    };

    entry = { ...entry, ...data[i] };
    entry["update_time"] = unixEpochToISO(data[i].update_time);
    entries.push(entry);
  }

  return entries;
}
