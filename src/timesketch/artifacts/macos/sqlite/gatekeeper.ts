import { GatekeeperEntries } from "../../../../../types/macos/sqlite/gatekeeper.ts";
import { TimesketchTimeline } from "../../../../../types/timesketch/timeline.ts";

export function timelineGatekeeper(
  data: GatekeeperEntries[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    if (item.object_ctime === undefined || item.path === undefined) {
      continue;
    }
    let entry: TimesketchTimeline = {
      datetime: item.entry_created,
      timestamp_desc: "Entry Created",
      message: item.path,
      artifact: "GatekeeperEntry",
      data_type: "macos:sqlite:gatekeeper:entry",
    };

    entry = { ...entry, ...item };
    entries.push(entry);
  }
  return entries;
}
