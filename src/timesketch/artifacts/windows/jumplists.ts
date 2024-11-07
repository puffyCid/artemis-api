import { Jumplists } from "../../../../types/windows/jumplists.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
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
    let entry: TimesketchTimeline = {
      datetime: item.jumplist_metadata.modified,
      timestamp_desc: "Jumplist Modified",
      message: item.jumplist_metadata.path,
      artifact: "Jumplist",
      data_type: "windows:jumplist:entry",
    };

    entry["path"] = item.path;
    entry["app_id"] = item.app_id;
    entry["jumplist_type"] = item.jumplist_type;
    entry = { ...entry, ...item.jumplist_metadata };
    entry["shortcut_path"] = item.lnk_info.path;

    entry = { ...entry, ...item.lnk_info };
    entry["target_modified"] = item.lnk_info.modified;
    entry["target_created"] = item.lnk_info.created;
    entry["target_accessed"] = item.lnk_info.accessed;

    delete entry["created"];
    delete entry["accessed"];

    entry["properties"] = JSON.stringify(item.lnk_info.properties);

    entry["modified"] = item.jumplist_metadata.modified;

    if (entry.message === "" && item.jumplist_metadata.path === "") {
      let message = "";
      for (const shell of item.lnk_info.shellitems) {
        message += `${shell.value}\\`;
      }
      entry.message = message;
    } else if (entry.message === "") {
      entry.message = item.jumplist_metadata.path;
    }

    entries.push(Object.assign({}, entry));

    // Extract each unique timestamp to their own entry
    const time_entries = extractShortcutTimes(item.lnk_info);
    for (const time_entry of time_entries) {
      entry.datetime = time_entry.datetime;
      entry.timestamp_desc = time_entry.desc;
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}
