import { RawFileInfo } from "../../../../types/windows/ntfs.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline filesystem info
 * @param data Array of `MacosFileInfo[] | WindowsFileInfo[] | LinuxFileInfo[]`
 * @returns Array `TimesketchTimeline` of files
 */
export function timelineRawFiles(data: RawFileInfo[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: `${item.full_path}`,
      artifact: "RawFiles",
      data_type: "fs::ntfs:file",
    };

    entry = { ...entry, ...item };
    entry["binary_info"] = JSON.stringify(item.binary_info);

    // Extract each unique timestamp to their own entry
    const time_entries = extractRawTimes(item);
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

/**
 * Function to extract timestamps from file info
 * @param entry A `RawFileInfo` object
 * @returns Array of `TimeEntries`
 */
function extractRawTimes(entry: RawFileInfo): TimeEntries[] {
  const entries: TimeEntries[] = [];
  const check_times: Record<string, string> = {};

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

  check_times[entry.filename_created] === undefined
    ? (check_times[entry.filename_created] = "FilenameCreated")
    : (check_times[entry.filename_created] = `${
      check_times[entry.filename_created]
    } FilenameCreated`);

  check_times[entry.filename_modified] === undefined
    ? (check_times[entry.filename_modified] = "FilenameModified")
    : (check_times[entry.filename_modified] = `${
      check_times[entry.filename_modified]
    } FilenameModified`);

  check_times[entry.filename_accessed] === undefined
    ? (check_times[entry.filename_accessed] = "FilenameAccessed")
    : (check_times[entry.filename_accessed] = `${
      check_times[entry.filename_accessed]
    } FilenameAccessed`);

  check_times[entry.filename_changed] === undefined
    ? (check_times[entry.filename_changed] = "FilenameChanged")
    : (check_times[entry.filename_changed] = `${
      check_times[entry.filename_changed]
    } FilenameChanged`);

  for (const value in check_times) {
    const entry: TimeEntries = {
      datetime: value,
      desc: check_times[value],
    };
    entries.push(entry);
  }

  return entries;
}
