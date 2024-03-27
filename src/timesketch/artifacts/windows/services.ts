import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { Services } from "../../../../types/windows/services.ts";

/**
 * Function to timeline Services
 * @param data Array of `Services`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of Services
 */
export function timelineServices(data: Services[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: "1601-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: `Service Name: ${item.name}  |  ${item.path}`,
      hash: "",
      user: item.account,
      artifact: "Service",
      data_type: "windows:registry:services:entry",
      _raw: "",
    };
    entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
