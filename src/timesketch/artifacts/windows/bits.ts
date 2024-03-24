import { Bits } from "../../../../types/windows/bits.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";
import { BitsInfo } from "../../../../types/windows/bits.ts";
import { Jobs } from "../../../../types/windows/bits.ts";

/**
 * Function to timeline BITS
 * @param data Array of `Bits`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of BITS
 */
export function timelineBits(
  data: Bits,
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data.bits) {
    let entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "",
      message: `Job: ${item.job_name} - Target Path: ${item.target_path}`,
      hash: "",
      user: item.username,
      artifact: "BITS",
      data_type: "windows:ese:bits:entry",
      _raw: include_raw ? item : "",
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
      hash: "",
      user: item.owner_sid,
      artifact: "BITS Carved Job",
      data_type: "windows:ese:bits:carve:job",
      _raw: include_raw ? item : "",
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
      hash: "",
      user: "",
      artifact: "BITS Carved File",
      data_type: "windows:ese:bits:carve:file",
      _raw: include_raw ? item : "",
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
  const desc = "BITS Created Modified Completed Expired";
  const time_entry: TimeEntries = {
    datetime: 0,
    desc,
  };

  if (
    entry.completed === entry.created && entry.completed === entry.modified &&
    entry.completed === entry.expiration
  ) {
    time_entry.datetime = entry.completed;
    return [time_entry];
  }

  const entries: TimeEntries[] = [];
  if (entry.completed === entry.created && entry.completed === entry.modified) {
    time_entry.datetime = entry.expiration;
    time_entry.desc = "BITS Expired";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Created Modified Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (
    entry.completed === entry.created && entry.completed === entry.expiration
  ) {
    time_entry.datetime = entry.modified;
    time_entry.desc = "BITS Modified";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Created Expired Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (
    entry.completed === entry.modified && entry.completed === entry.expiration
  ) {
    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Modified Expired Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.modified === entry.created && entry.modified === entry.expiration) {
    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Modified Expired Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.completed === entry.created) {
    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Created Completed";
    entries.push(Object.assign({}, time_entry));

    if (entry.expiration === entry.modified) {
      time_entry.datetime = entry.modified;
      time_entry.desc = "BITS Modified Expired";
      entries.push(Object.assign({}, time_entry));
    } else {
      time_entry.datetime = entry.modified;
      time_entry.desc = "BITS Modified";
      entries.push(Object.assign({}, time_entry));

      time_entry.datetime = entry.expiration;
      time_entry.desc = "BITS Expired";
      entries.push(Object.assign({}, time_entry));
    }

    return entries;
  }

  if (entry.completed === entry.expiration) {
    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Completed Expired";
    entries.push(Object.assign({}, time_entry));

    if (entry.created === entry.modified) {
      time_entry.datetime = entry.modified;
      time_entry.desc = "BITS Created Modified";
      entries.push(Object.assign({}, time_entry));
    } else {
      time_entry.datetime = entry.modified;
      time_entry.desc = "BITS Modified";
      entries.push(Object.assign({}, time_entry));

      time_entry.datetime = entry.created;
      time_entry.desc = "BITS Created";
      entries.push(Object.assign({}, time_entry));
    }

    return entries;
  }

  if (entry.completed === entry.modified) {
    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Completed Modified";
    entries.push(Object.assign({}, time_entry));

    if (entry.created === entry.expiration) {
      time_entry.datetime = entry.modified;
      time_entry.desc = "BITS Created Expired";
      entries.push(Object.assign({}, time_entry));
    } else {
      time_entry.datetime = entry.expiration;
      time_entry.desc = "BITS Expired";
      entries.push(Object.assign({}, time_entry));

      time_entry.datetime = entry.created;
      time_entry.desc = "BITS Created";
      entries.push(Object.assign({}, time_entry));
    }

    return entries;
  }

  if (entry.created === entry.modified) {
    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Created Modified";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.expiration;
    time_entry.desc = "BITS Expired";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.created === entry.expiration) {
    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Created Expired";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.modified;
    time_entry.desc = "BITS Modified";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  if (entry.modified === entry.expiration) {
    time_entry.datetime = entry.modified;
    time_entry.desc = "BITS Modified Expired";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.created;
    time_entry.desc = "BITS Created";
    entries.push(Object.assign({}, time_entry));

    time_entry.datetime = entry.completed;
    time_entry.desc = "BITS Completed";
    entries.push(Object.assign({}, time_entry));

    return entries;
  }

  // Every timestamp is unique
  time_entry.datetime = entry.created;
  time_entry.desc = "BITS Created";
  const test = Object.assign({}, time_entry);
  entries.push(test);

  time_entry.datetime = entry.completed;
  time_entry.desc = "BITS Completed";
  entries.push(Object.assign({}, time_entry));

  time_entry.datetime = entry.expiration;
  time_entry.desc = "BITS Expired";
  entries.push(Object.assign({}, time_entry));

  time_entry.datetime = entry.modified;
  time_entry.desc = "BITS Modified";
  entries.push(Object.assign({}, time_entry));

  return entries;
}
