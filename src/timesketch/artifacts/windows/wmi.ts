import { WmiPersist } from "../../../../types/windows/wmi.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline WMI Persistence
 * @param data Array of `WmiPersist`
 * @returns Array `TimesketchTimeline` of WmiPersist
 */
export function timelineWmiPersist(
  data: WmiPersist[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.consumer,
      artifact: "WMI Persist",
      data_type: "windows:wmi:persistence:entry",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
