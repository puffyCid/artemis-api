import { Prefetch } from "../../../../types/windows/prefetch.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Prefetch
 * @param data Array of `Prefetch`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Prefetch
 */
export function timelinePrefetch(
  data: Prefetch[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.last_run_time),
      timestamp_desc: "Prefetch Last Execution",
      message: item.path,
      hash: "",
      user: "",
      artifact: "Prefetch",
      data_type: "windows:prefetch:execution",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
    for (const old_runs of item.all_run_times) {
      const old_run = Object.assign({}, entry);
      old_run.datetime = unixEpochToISO(old_runs);
      old_run.timestamp_desc = "Prefetch Execution";
      entries.push(old_run);
    }
  }

  return entries;
}
