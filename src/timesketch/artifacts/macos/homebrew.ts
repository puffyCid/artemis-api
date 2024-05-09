import { HomebrewReceipt } from "../../../../types/macos/homebrew.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline Homebrew Packages info
 * @param data Array of `HomebrewReceipt`
 * @returns Array `TimesketchTimeline` of HomebrewReceipt
 */
export function timelineHomebrew(
  data: HomebrewReceipt[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.installTime),
      timestamp_desc: "Homebrew Package Installed",
      message: `${item.name} - ${item.description}`,
      data_type: "macos:homebrew:package",
      artifact: "HomebrewPackages",
    };

    entry = { ...entry, ...item };
    entry["installTime"] = unixEpochToISO(item.installTime);
    entry["sourceModified"] = unixEpochToISO(item.sourceModified);

    entries.push(entry);
  }

  return entries;
}
