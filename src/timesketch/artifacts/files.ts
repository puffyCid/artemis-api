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
    let entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: `${item.full_path}`,
      hash: item.md5,
      user: item.uid.toString(),
      artifact: "Files",
      data_type: "system:fs:file",
      _raw: include_raw ? item : "",
    };

    entry = { ...entry, ...item };

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
 * Function to extract timestamps from file info
 * @param entry A file info object. Can be `MacosFileInfo` or `WindowsFileInfo` or `LinuxFileInfo`
 * @returns Array of `TimeEntries`
 */
function extractApiTimes(
  entry: MacosFileInfo | WindowsFileInfo | LinuxFileInfo,
): TimeEntries[] {
  const check_times: Record<string, string> = {};
  const entries: TimeEntries[] = [];

  check_times[entry.created] = "Created";
  check_times[entry.modified] === undefined
    ? (check_times[entry.modified] = "Modified")
    : (check_times[entry.modified] = `${check_times[entry.modified]} Modified`);

  check_times[entry.changed] === undefined
    ? (check_times[entry.changed] = "Changed")
    : (check_times[entry.changed] = `${check_times[entry.changed]} Changed`);

  check_times[entry.accessed] === undefined
    ? (check_times[entry.accessed] = "Accessed")
    : (check_times[entry.accessed] = `${check_times[entry.accessed]} Accessed`);

  for (const value in check_times) {
    const entry: TimeEntries = {
      datetime: Number(value),
      desc: check_times[value],
    };
    entries.push(entry);
  }

  return entries;
}
