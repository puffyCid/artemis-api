import { MacosFileInfo } from "../../../types/macos/files.ts";
import { WindowsFileInfo } from "../../../types/windows/files.ts";
import { LinuxFileInfo } from "../../../types/linux/files.ts";

import { TimesketchTimeline } from "../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../time/conversion.ts";

/**
 * Function to timeline filesystem info
 * @param data Array of `MacosFileInfo[] | WindowsFileInfo[] | LinuxFileInfo[]`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of files
 */
export function timelineFiles(
  data: MacosFileInfo[] | WindowsFileInfo[] | LinuxFileInfo[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: `${item.full_path}`,
      hash: item.md5,
      user: item.uid.toString(),
      artifact: "Files",
      data_type: "system:fs:file",
      _raw: include_raw ? item : "",
    };

    // Extract each unique timestamp to their own entry
    const time_entries = extractApiTimes(item);
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

/**
 * Function to extrat timestamps from file info
 * @param entry A file info object. Can be `MacosFileInfo` or `WindowsFileInfo` or `LinuxFileInfo`
 * @returns Array of `TimeEntries`
 */
function extractApiTimes(
  entry: MacosFileInfo | WindowsFileInfo | LinuxFileInfo,
): TimeEntries[] {
  const desc = "Created Modified Accessed Changed";
  const time_entry: TimeEntries = {
    datetime: 0,
    desc,
  };
  if (
    entry.created === entry.accessed && entry.created === entry.modified &&
    entry.created === entry.changed
  ) {
    time_entry.datetime = entry.created;
    return [time_entry];
  }
  const entries: TimeEntries[] = [];
  if (entry.created === entry.accessed && entry.created === entry.modified) {
    time_entry.datetime = entry.changed;
    time_entry.desc = "Changed";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Created Modified Accessed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.created === entry.accessed && entry.created === entry.changed) {
    time_entry.datetime = entry.modified;
    time_entry.desc = "Modified";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Created Accessed Changed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.created === entry.modified && entry.created === entry.changed) {
    time_entry.datetime = entry.accessed;
    time_entry.desc = "Accessed";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Created Modified Changed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.accessed === entry.modified && entry.created === entry.changed) {
    time_entry.datetime = entry.created;
    time_entry.desc = "Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Modified Accessed Changed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.created === entry.accessed) {
    time_entry.datetime = entry.created;
    time_entry.desc = "Created Accessed";
    entries.push(Object.assign({}, time_entry));

    if (entry.changed === entry.modified) {
      time_entry.datetime = entry.modified;
      time_entry.desc = "Modified Changed";
      entries.push(Object.assign({}, time_entry));
    } else {
      time_entry.datetime = entry.modified;
      time_entry.desc = "Modified";
      entries.push(Object.assign({}, time_entry));

      time_entry.datetime = entry.changed;
      time_entry.desc = "Changed";
      entries.push(Object.assign({}, time_entry));
    }

    return entries;
  }

  if (entry.created === entry.modified) {
    time_entry.datetime = entry.created;
    time_entry.desc = "Created Modified";
    entries.push(Object.assign({}, time_entry));

    if (entry.accessed === entry.changed) {
      time_entry.datetime = entry.accessed;
      time_entry.desc = "Accessed Changed";
      entries.push(Object.assign({}, time_entry));
    } else {
      time_entry.datetime = entry.accessed;
      time_entry.desc = "Accessed";
      entries.push(Object.assign({}, time_entry));

      time_entry.datetime = entry.changed;
      time_entry.desc = "Changed";
      entries.push(Object.assign({}, time_entry));
    }

    return entries;
  }

  if (entry.created === entry.changed) {
    time_entry.datetime = entry.created;
    time_entry.desc = "Created Changed";
    entries.push(Object.assign({}, time_entry));

    if (entry.accessed === entry.modified) {
      time_entry.datetime = entry.modified;
      time_entry.desc = "Modified Accessed";
      entries.push(Object.assign({}, time_entry));
    } else {
      time_entry.datetime = entry.accessed;
      time_entry.desc = "Accessed";
      entries.push(Object.assign({}, time_entry));

      time_entry.datetime = entry.modified;
      time_entry.desc = "Modified";
      entries.push(Object.assign({}, time_entry));
    }
  }

  if (entry.accessed === entry.changed) {
    time_entry.datetime = entry.accessed;
    time_entry.desc = "Accessed Changed";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.modified;
    time_entry.desc = "Modified";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.accessed === entry.modified) {
    time_entry.datetime = entry.accessed;
    time_entry.desc = "Modified Accessed";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.changed;
    time_entry.desc = "Changed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.modified === entry.changed) {
    time_entry.datetime = entry.accessed;
    time_entry.desc = "Modified Changed";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.accessed;
    time_entry.desc = "Accessed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  // Every timestamp is unique
  time_entry.datetime = entry.created;
  time_entry.desc = "Created";
  const test = Object.assign({}, time_entry);
  entries.push(test);

  time_entry.datetime = entry.accessed;
  time_entry.desc = "Accessed";
  entries.push(Object.assign({}, time_entry));

  time_entry.datetime = entry.changed;
  time_entry.desc = "Changed";
  entries.push(Object.assign({}, time_entry));

  time_entry.datetime = entry.modified;
  time_entry.desc = "Modified";
  entries.push(Object.assign({}, time_entry));

  return entries;
}
