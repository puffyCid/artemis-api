import { HomebrewData } from "../../../../types/macos/homebrew";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline Homebrew Packages info
 * @param data Array of `HomebrewReceipt`
 * @returns Array `TimesketchTimeline` of HomebrewReceipt
 */
export function timelineHomebrew(
  data: HomebrewData,
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data.packages) {
    let entry: TimesketchTimeline = {
      datetime: item.installTime,
      timestamp_desc: "Homebrew Package Installed",
      message: `${item.name} - ${item.description}`,
      data_type: "macos:homebrew:package",
      artifact: "HomebrewPackages",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
