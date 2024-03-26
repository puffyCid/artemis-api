import { Shortcut } from "../../../../types/windows/shortcuts.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Shortcut
 * @param data Array of `Shortcut`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Shortcut
 */
export function timelineShortcuts(
  data: Shortcut[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.path,
      hash: "",
      user: "",
      artifact: "Shortcut",
      data_type: "windows:shortcut:lnk",
      _raw: include_raw ? item : "",
    };

    if (entry.message === "") {
      for (const shell of item.shellitems) {
        entry.message += `${shell.value}\\`;
      }
    }

    entry = { ...entry, ...item };
    // Extract each unique timestamp to their own entry
    const time_entries = extractShortcutTimes(item);
    for (const time_entry of time_entries) {
      entry.datetime = unixEpochToISO(time_entry.datetime);
      entry.timestamp_desc = time_entry.desc;
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}

interface TimeEntries {
  datetime: number;
  desc: string;
}
export function extractShortcutTimes(entry: Shortcut): TimeEntries[] {
  const desc = "Shortcut Target Created Modified Accessed";
  const time_entry: TimeEntries = {
    datetime: 0,
    desc,
  };

  if (entry.created === entry.modified && entry.created === entry.accessed) {
    time_entry.datetime = entry.created;
    return [time_entry];
  }
  const entries: TimeEntries[] = [];

  if (entry.created === entry.modified) {
    time_entry.datetime = entry.accessed;
    time_entry.desc = "Shortcut Target Accessed";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Shortcut Target Created Modified";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.created === entry.accessed) {
    time_entry.datetime = entry.modified;
    time_entry.desc = "Shortcut Target Modified";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Shortcut Target Created Accessed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.modified === entry.accessed) {
    time_entry.datetime = entry.created;
    time_entry.desc = "Shortcut Target Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.modified;
    time_entry.desc = "Shortcut Target Modified Accessed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  // Every timestamp is unique
  time_entry.datetime = entry.created;
  time_entry.desc = "Shortcut Target Created";
  entries.push(Object.assign({}, time_entry));

  time_entry.datetime = entry.modified;
  time_entry.desc = "Shortcut Target Modified";
  entries.push(Object.assign({}, time_entry));

  time_entry.datetime = entry.accessed;
  time_entry.desc = "Shortcut Target Accessed";
  entries.push(Object.assign({}, time_entry));

  return entries;
}
