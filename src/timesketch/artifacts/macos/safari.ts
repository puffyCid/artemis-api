import {
  SafariDownloads,
  SafariHistory,
} from "../../../../types/macos/safari.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Safari History
 * @param data Array of `SafariHistory`
 * @returns Array `TimesketchTimeline` of SafariHistory
 */
export function timelineSafariHistory(
  data: SafariHistory[],
): TimesketchTimeline[] {
  const entries = [];

  for (const value of data) {
    for (let i = 0; i < value.results.length; i++) {
      let entry: TimesketchTimeline = {
        datetime: value.results[i].visit_time,
        timestamp_desc: "Safari Visit Time",
        message: `${value.results[i].url} - ${value.results[i].title}`,
        data_type: "macos:safari:history",
        artifact: "SafariHistory",
      };
      entry = { ...entry, ...value.results[i] };
      entry["path"] = value.path;
      entry["user"] = value.user;
      entries.push(entry);
    }
  }
  return entries;
}

/**
 * Function to timeline Safari Downloads
 * @param data Array of `SafariDownloads`
 * @returns Array `TimesketchTimeline` of SafariDownloads
 */
export function timelineSafariDownloads(
  data: SafariDownloads[],
): TimesketchTimeline[] {
  const entries = [];

  for (const value of data) {
    for (let i = 0; i < value.results.length; i++) {
      let entry: TimesketchTimeline = {
        datetime: value.results[i].created,
        timestamp_desc: "Safari Download File Created",
        message: `${value.results[i].source_url} - ${
          value.results[i].download_path
        }`,
        data_type: "macos:safari:downloads",
        artifact: "SafariDownloads",
      };
      entry = { ...entry, ...value.results[i] };
      entry["path"] = value.path;
      entry["user"] = value.user;

      entries.push(entry);
    }
  }
  return entries;
}
