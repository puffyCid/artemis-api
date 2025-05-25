import { GvfsEntry } from "../../../../../types/linux/gnome/gvfs";
import { TimesketchTimeline } from "../../../../../types/timesketch/timeline";

/**
 * Function to timeline GNOME Virtual Filesystem entries
 * @param data Array of `GvfsEntry`
 * @returns Array of `TimesketchTimeline`
 */
export function timelineGnomeVirtualFilesystem(data: GvfsEntry[]): TimesketchTimeline[] {
    const entries: TimesketchTimeline[] = [];
    for (const item of data) {
        let entry: TimesketchTimeline = {
            datetime: item.last_change,
            timestamp_desc: "Last Changed",
            message: item.path,
            artifact: "GNOME Virtual Filesystem",
            data_type: "linux:gnome:gvfs:entry",
            name: item.name,
            last_change: item.last_change,
            path: item.path,
            source: item.source,
        };

        entry = { ...entry, ...item.metadata };
        entries.push(entry);
    }

    return entries;
}