import { BitsInfo } from "../../../../types/windows/bits";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline BITS
 * @param data Array of `Bits`
 * @returns Array `TimesketchTimeline` of BITS
 */
export function timelineBits(
  data: BitsInfo[],
): TimesketchTimeline[] {
  const entries: TimesketchTimeline[] = [];

  for (const item of data) {
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
 * Function to extract timestamps from BITS
 * @param entry A `BitsInfo`
 * @returns Array of `TimeEntries`
 */
function extractTimes(entry: BitsInfo ): TimeEntries[] {
  const entries: TimeEntries[] = [];
  const check_times: Record<string, string> = {};

  check_times[ entry.created ] = "BITS Created";
  check_times[ entry.modified ] === undefined
    ? (check_times[ entry.modified ] = "BITS Modified")
    : (check_times[ entry.modified ] = `${check_times[ entry.modified ]} Modified`);

  check_times[ entry.expiration ] === undefined
    ? (check_times[ entry.expiration ] = "BITS Expired")
    : (check_times[ entry.expiration ] = `${check_times[ entry.expiration ]
      } Expired`);

  check_times[ entry.completed ] === undefined
    ? (check_times[ entry.completed ] = "BITS Completed")
    : (check_times[ entry.completed ] = `${check_times[ entry.completed ]
      } Completed`);

  for (const value in check_times) {
    const entry: TimeEntries = {
      datetime: value,
      desc: check_times[ value ] ?? "",
    };
    entries.push(entry);
  }

  return entries;
}
