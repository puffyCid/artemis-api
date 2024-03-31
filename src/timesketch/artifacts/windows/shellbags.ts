import { Shellbags } from "../../../../types/windows/shellbags.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Shellbags
 * @param data Array of `Shellbags`
 * @returns Array `TimesketchTimeline` of Shellbags
 */
export function timelineShellbags(data: Shellbags[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.reg_modified),
      timestamp_desc: "Registry Last Modified",
      message: item.path,
      artifact: "Shellbags",
      data_type: "windows:registry:shellbags:item",
    };
    entry = { ...entry, ...item };
    entry["created"] = unixEpochToISO(item.created);
    entry["modified"] = unixEpochToISO(item.modified);
    entry["accessed"] = unixEpochToISO(item.accessed);

    entries.push(entry);
  }

  return entries;
}
