import { Jumplists } from "../../../../types/windows/jumplists.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";
import { extractShortcutTimes } from "./shortcuts.ts";

/**
 * Function to timeline Jumplists
 * @param data Array of `Jumplists`
 * @returns Array `TimesketchTimeline` of Jumplists
 */
export function timelineJumplists(
  data: Jumplists[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item?.jumplist_metadata.modified),
      timestamp_desc: "Jumplist Modified",
      message: item.lnk_info.path,
      artifact: "Jumplist",
      data_type: "windows:jumplist:entry",
      _raw: JSON.stringify(item),
    };

    if (entry.message === "" && item.jumplist_metadata.path === "") {
      let message = "";
      for (const shell of item.lnk_info.shellitems) {
        message += `${shell.value}\\`;
      }
      entry.message = message;
    } else if (entry.message === "") {
      entry.message = item.jumplist_metadata.path;
    }

    // Extract each unique timestamp to their own entry
    const time_entries = extractShortcutTimes(item.lnk_info);
    for (const time_entry of time_entries) {
      entry.datetime = unixEpochToISO(time_entry.datetime);
      entry.timestamp_desc = time_entry.desc;
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}
