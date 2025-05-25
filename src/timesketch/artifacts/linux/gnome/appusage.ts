import { GvfsEntry } from "../../../../../types/linux/gnome/gvfs";
import { AppUsage } from "../../../../../types/linux/gnome/usage";
import { TimesketchTimeline } from "../../../../../types/timesketch/timeline";

/**
 * Function to timeline GNOME AppUsage
 * @param data Array of `AppUsage`
 * @returns Array of `TimesketchTimeline`
 */
export function timelineGnomeAppUsage(data: AppUsage[]): TimesketchTimeline[] {
    const entries: TimesketchTimeline[] = [];
    for (const item of data) {
        let entry: TimesketchTimeline = {
            datetime: item[ "last-seen" ],
            timestamp_desc: "Last Seen",
            message: item.id,
            artifact: "GNOME Application Usage",
            data_type: "linux:gnome:applicationusage:entry",
            id: item.id,
            last_seen: item[ "last-seen" ],
            score: item.score,
            source: item.source,
        };

        entries.push(entry);
    }

    return entries;
}