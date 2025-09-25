import {
  TimesketchArtifact,
  TimesketchTimeline,
} from "../../../../../types/timesketch/timeline";
import { ChromiumHistory } from "../../../../../types/applications/chromium";

/**
 * Function to timeline Chromium based history
 * @param data Array of `ChromiumHistory`
 * @param artifact `TimesketchArtifact` to specify an explicit Chromium based browser
 * @returns Array `TimesketchTimeline` for Chromium History
 */
export function timelineChromiumHistory(
  data: ChromiumHistory[],
  artifact: TimesketchArtifact,
): TimesketchTimeline[] {
  const entries: TimesketchTimeline[] = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "URL Visited",
      message: "",
      artifact,
      data_type: `application:${artifact.split("-").at(0)}:url`,
    };

    entry[ "path" ] = item.db_path;
    let user_entry = entry;

    user_entry.datetime = item.last_visit_time;
    user_entry.message = `${item.url} | ${item.title}`;
    user_entry = { ...user_entry, ...item };

    entries.push(user_entry);

  }

  return entries;
}
