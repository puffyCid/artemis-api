import { Shellbags } from "../../../../types/windows/shellbags.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Shellbags
 * @param data Array of `Shellbags`
 * @returns Array `TimesketchTimeline` of Shellbags
 */
export function timelineShellbags(data: Shellbags[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.reg_modified,
      timestamp_desc: "Registry Last Modified",
      message: item.path,
      artifact: "Shellbags",
      data_type: "windows:registry:shellbags:item",
    };
    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
