import { HomebrewReceipt } from "../../../../types/macos/homebrew.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Homebrew Packages info
 * @param data Array of `HomebrewReceipt`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of HomebrewReceipt
 */
export function timelineHomebrew(
  data: HomebrewReceipt[],
  include_raw: boolean,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.installTime),
      timestamp_desc: "Homebrew Package Installed",
      message: item.name,
      hash: "",
      user: "",
      data_type: "macos:homebrew:package",
      artifact: "HomebrewPackages",
      _raw: include_raw ? item : "",
    };

    entries.push(entry);
  }

  return entries;
}
