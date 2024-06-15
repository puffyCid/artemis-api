import { Shortcut } from "../../../../types/windows/shortcuts.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Shortcut
 * @param data Array of `Shortcut`
 * @returns Array `TimesketchTimeline` of Shortcut
 */
export function timelineShortcuts(
  data: Shortcut[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.path,
      artifact: "Shortcut",
      data_type: "windows:shortcut:lnk",
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
      entry.datetime = time_entry.datetime;
      entry.timestamp_desc = time_entry.desc;
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}

interface TimeEntries {
  datetime: string;
  desc: string;
}
export function extractShortcutTimes(entry: Shortcut): TimeEntries[] {
  const entries: TimeEntries[] = [];
  const check_times: Record<string, string> = {};

  check_times[entry.created] = "Shortcut Target Created";
  check_times[entry.modified] === undefined
    ? (check_times[entry.modified] = "Shortcut Target Modified")
    : (check_times[entry.modified] = `${check_times[entry.modified]} Modified`);

  check_times[entry.accessed] === undefined
    ? (check_times[entry.accessed] = "Shortcut Target Accessed")
    : (check_times[entry.accessed] = `${check_times[entry.accessed]} Accessed`);

  for (const value in check_times) {
    const entry: TimeEntries = {
      datetime: value,
      desc: check_times[value],
    };
    entries.push(entry);
  }
  return entries;
}
