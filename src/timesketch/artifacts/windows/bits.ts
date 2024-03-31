import { Bits } from "../../../../types/windows/bits.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";
import { BitsInfo } from "../../../../types/windows/bits.ts";
import { Jobs } from "../../../../types/windows/bits.ts";

/**
 * Function to timeline BITS
 * @param data Array of `Bits`
 * @returns Array `TimesketchTimeline` of BITS
 */
export function timelineBits(
  data: Bits,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data.bits) {
    let entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: `Job: ${item.job_name} - Target Path: ${item.target_path}`,
      artifact: "BITS",
      data_type: "windows:ese:bits:entry",
    };

    entry = { ...entry, ...item };
    // Extract each unique timestamp to their own entry
    const time_entries = extractTimes(item);
    for (const time_entry of time_entries) {
      entry.datetime = unixEpochToISO(time_entry.datetime);
      entry.timestamp_desc = time_entry.desc;
      entries.push(Object.assign({}, entry));
    }
  }

  for (const item of data.carved_jobs) {
    let entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: `Job: ${item.job_name} - Target Path: ${item.target_path}`,
      artifact: "BITS Carved Job",
      data_type: "windows:ese:bits:carve:job",
    };
    entry = { ...entry, ...item };

    // Extract each unique timestamp to their own entry
    const time_entries = extractTimes(item);
    for (const time_entry of time_entries) {
      entry.datetime = unixEpochToISO(time_entry.datetime);
      entry.timestamp_desc = `Carved ${time_entry.desc}`;
      entries.push(Object.assign({}, entry));
    }
  }

  for (const item of data.carved_files) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "Carved BITS File",
      message: `File: ${item.full_path} - URL: ${item.url}`,
      artifact: "BITS Carved File",
      data_type: "windows:ese:bits:carve:file",
    };
    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}

interface TimeEntries {
  datetime: number;
  desc: string;
}

/**
 * Function to extract timestamps from BITS
 * @param entry A `BitsInfo` or `Jobs` object
 * @returns Array of `TimeEntries`
 */
function extractTimes(entry: BitsInfo | Jobs): TimeEntries[] {
  const entries: TimeEntries[] = [];
  const check_times: Record<string, string> = {};

  check_times[entry.created] = "BITS Created";
  check_times[entry.modified] === undefined
    ? (check_times[entry.modified] = "BITS Modified")
    : (check_times[entry.modified] = `${check_times[entry.modified]} Modified`);

  check_times[entry.expiration] === undefined
    ? (check_times[entry.expiration] = "BITS Expired")
    : (check_times[entry.expiration] = `${
      check_times[entry.expiration]
    } Expired`);

  check_times[entry.completed] === undefined
    ? (check_times[entry.completed] = "BITS Completed")
    : (check_times[entry.completed] = `${
      check_times[entry.completed]
    } Completed`);

  for (const value in check_times) {
    const entry: TimeEntries = {
      datetime: Number(value),
      desc: check_times[value],
    };
    entries.push(entry);
  }

  return entries;
}
