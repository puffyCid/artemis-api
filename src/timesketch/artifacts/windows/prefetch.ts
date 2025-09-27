import { Prefetch } from "../../../../types/windows/prefetch";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline Prefetch
 * @param data Array of `Prefetch`
 * @returns Array `TimesketchTimeline` of Prefetch
 */
export function timelinePrefetch(
  data: Prefetch[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.last_run_time,
      timestamp_desc: "Prefetch Last Execution",
      message: item.path,
      artifact: "Prefetch",
      data_type: "windows:prefetch:execution",
    };
    entry = { ...entry, ...item };

    entries.push(entry);
    for (let i = 0; i < item.all_run_times.length; i++) {
      const old_run = Object.assign({}, entry);
      old_run.datetime = item.all_run_times[ i ] ?? "Undefined";
      old_run.timestamp_desc = "Prefetch Execution";
      entries.push(old_run);
    }
  }

  return entries;
}
