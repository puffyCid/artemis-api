import { TimesketchTimeline } from "../../../../types/timesketch/timeline";
import { Journal } from "../../../../types/linux/journal";

/**
 * Function to timeline Journal files
 * @param data Array of `Journal`
 * @returns Array `TimesketchTimeline` of Journal
 */
export function timelineJournals(
  data: Journal[],
): TimesketchTimeline[] {
  const entries: TimesketchTimeline[] = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.realtime,
      timestamp_desc: "Journal Entry Generated",
      message: item.message,
      artifact: "Journal",
      data_type: "linux:journals:entry",
    };

    entry = { ...entry, ...item };
    entry[ "realtime" ] = item.realtime;
    entry[ "source_realtime" ] = item.source_realtime;

    entries.push(entry);
  }

  return entries;
}
