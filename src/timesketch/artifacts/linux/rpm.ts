import type { RpmPackages } from "../../../../types/linux/rpm.ts";
import type { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline RPM packages
 * @param data Array of `RpmPackages`
 * @returns Array `TimesketchTimeline` of RPM packages
 */
export function timelineRpm(data: RpmPackages[]): TimesketchTimeline[] {
  const entries = [];
  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.install_time,
      timestamp_desc: "RPM Package Installed",
      message: `${item.name} - Version: ${item.version} installed`,
      artifact: "RPM Package",
      data_type: "linux:rpm:entry",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
