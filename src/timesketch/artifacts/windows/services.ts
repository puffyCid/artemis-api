import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { Services } from "../../../../types/windows/services.ts";

/**
 * Function to timeline Services
 * @param data Array of `Services`
 * @returns Array `TimesketchTimeline` of Services
 */
export function timelineServices(data: Services[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.modified,
      timestamp_desc: "Registry Modified",
      message: `Service Name: ${item.name}  |  ${item.path}`,
      artifact: "Service",
      data_type: "windows:registry:services:entry",
    };
    entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
