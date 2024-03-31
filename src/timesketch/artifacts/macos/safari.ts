import {
  SafariDownloads,
  SafariHistory,
} from "../../../../types/macos/safari.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

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
    for (let i = 0; i < value.history.length; i++) {
      let entry: TimesketchTimeline = {
        datetime: unixEpochToISO(value.history[i].visit_time),
        timestamp_desc: "Safari Visit Time",
        message: `${value.history[i].url} - ${value.history[i].title}`,
        data_type: "macos:safari:history",
        artifact: "SafariHistory",
      };
      entry = { ...entry, ...data[i] };
      entry["visit_time"] = unixEpochToISO(value.history[i].visit_time);
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
    for (let i = 0; i < value.downloads.length; i++) {
      let entry: TimesketchTimeline = {
        datetime: unixEpochToISO(value.downloads[i].created),
        timestamp_desc: "Safari Download File Created",
        message: `${value.downloads[i].source_url} - ${
          value.downloads[i].download_path
        }`,
        data_type: "macos:safari:downloads",
        artifact: "SafariDownloads",
      };
      entry = { ...entry, ...data[i] };
      entry["created"] = unixEpochToISO(value.downloads[i].created);
      entry["download_entry_date"] = unixEpochToISO(
        value.downloads[i].download_entry_date,
      );
      entry["download_entry_finish"] = unixEpochToISO(
        value.downloads[i].download_entry_finish,
      );
      entry["volume_created"] = unixEpochToISO(
        value.downloads[i].volume_created,
      );

      entries.push(entry);
    }
  }
  return entries;
}
