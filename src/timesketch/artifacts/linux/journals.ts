import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";
import { Journal } from "../../../../types/linux/journal.ts";

/**
 * Function to timeline Journal files
 * @param data Array of `Journal`
 * @returns Array `TimesketchTimeline` of Journal
 */
export function timelineJournals(
  data: Journal[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.realtime),
      timestamp_desc: "Journal Entry Generated",
      message: item.message,
      artifact: "Journal",
      data_type: "linux:journals:entry",
    };

    entry = { ...entry, ...item };
    entry["realtime"] = unixEpochToISO(item.realtime);
    entry["source_realtime"] = unixEpochToISO(item.source_realtime);

    entries.push(entry);
  }

  return entries;
}
