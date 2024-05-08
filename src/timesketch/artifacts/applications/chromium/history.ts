import {
  TimesketchArtifact,
  TimesketchTimeline,
} from "../../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../../time/conversion.ts";
import { ChromiumHistory } from "../../../../../types/applications/chromium.ts";

/**
 * Function to timeline Chromium based history
 * @param data Array of `ChromiumHistory`
 * @param artifact `TimesketchArtifact` to specify an explicit Chromium based browser
 * @returns Array `TimesketchTimeline` of Chromium History
 */
export function timelineChromiumHistory(
  data: ChromiumHistory[],
  artifact: TimesketchArtifact,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: "",
      timestamp_desc: "URL Visited",
      message: "",
      artifact,
      data_type: `application:${artifact.split("-").at(0)}:url`,
    };

    entry["path"] = item.path;
    entry["user"] = item.user;
    for (const value of item.history) {
      let user_entry = entry;

      user_entry.datetime = unixEpochToISO(value.last_visit_time);
      user_entry.message = `${value.url} | ${value.title}`;
      user_entry = { ...user_entry, ...value };

      entry["last_visit_time"] = unixEpochToISO(value.last_visit_time);

      entries.push(user_entry);
    }
  }

  return entries;
}
