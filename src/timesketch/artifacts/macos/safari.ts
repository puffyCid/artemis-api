import {
  SafariDownloads,
  SafariHistory,
} from "../../../../types/macos/safari.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Safari History
 * @param data Array of `SafariHistory`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of SafariHistory
 */
export function timelineSafariHistory(
  data: SafariHistory[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const value of data) {
    for (let i = 0; i < value.history.length; i++) {
      let entry: TimesketchTimeline = {
        datetime: unixEpochToISO(value.history[i].visit_time),
        timestamp_desc: "Safari Visit Time",
        message: `${value.history[i].url} - ${value.history[i].title}`,
        hash: "",
        user: value.user,
        data_type: "macos:safari:history",
        artifact: "SafariHistory",
        _raw: include_raw ? data[i] : "",
      };
      entry = { ...entry, ...data[i] };

      entries.push(entry);
    }
  }
  return entries;
}

/**
 * Function to timeline Safari Downloads
 * @param data Array of `SafariDownloads`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of SafariDownloads
 */
export function timelineSafariDownloads(
  data: SafariDownloads[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const value of data) {
    for (let i = 0; i < value.downloads.length; i++) {
      let entry: TimesketchTimeline = {
        datetime: unixEpochToISO(value.downloads[i].created),
        timestamp_desc: "Safari Download File Created",
        message: `${value.downloads[i].source_url} - ${
          value.downloads[i].download_path
        }`,
        hash: "",
        user: value.user,
        data_type: "macos:safari:downloads",
        artifact: "SafariDownloads",
        _raw: include_raw ? data[i] : "",
      };
      entry = { ...entry, ...data[i] };

      entries.push(entry);
    }
  }
  return entries;
}
