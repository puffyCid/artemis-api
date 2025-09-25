import { Extension } from "../../../../../types/linux/gnome/extensions";
import { TimesketchTimeline } from "../../../../../types/timesketch/timeline";

/**
 * Function to timeline GNOME Extensions
 * @param data Array of `Extension`
 * @returns Array of `TimesketchTimeline`
 */
export function timelineGnomeExtensions(data: Extension[]): TimesketchTimeline[] {
    const entries: TimesketchTimeline[] = [];
    for (const item of data) {
        let entry: TimesketchTimeline = {
            datetime: "",
            timestamp_desc: "",
            message: item.name,
            artifact: "GNOME Extension",
            data_type: "linux:gnome:extensions:entry",
        };

        entry = { ...entry, ...item };
        // Extract each unique timestamp to their own entry
        const time_entries = extractApiTimes(item);
        for (const time_entry of time_entries) {
            entry.datetime = time_entry.datetime;
            entry.timestamp_desc = time_entry.desc;
            entries.push(Object.assign({}, entry));
        }
    }

    return entries;
}

interface TimeEntries {
    datetime: string;
    desc: string;
}

/**
 * Function to extract timestamps from file info
 * @param entry A file info object. Can be `MacosFileInfo` or `WindowsFileInfo` or `LinuxFileInfo`
 * @returns Array of `TimeEntries`
 */
function extractApiTimes(
    entry: Extension,
): TimeEntries[] {
    const check_times: Record<string, string> = {};
    const entries: TimeEntries[] = [];

    check_times[ entry.created ] = "Created";
    check_times[ entry.modified ] === undefined
        ? (check_times[ entry.modified ] = "Modified")
        : (check_times[ entry.modified ] = `${check_times[ entry.modified ]} Modified`);

    check_times[ entry.changed ] === undefined
        ? (check_times[ entry.changed ] = "Changed")
        : (check_times[ entry.changed ] = `${check_times[ entry.changed ]} Changed`);


    check_times[ entry.accessed ] === undefined
        ? (check_times[ entry.accessed ] = "Accessed")
        : (check_times[ entry.accessed ] = `${check_times[ entry.accessed ]} Accessed`);

    for (const value in check_times) {
        const entry: TimeEntries = {
            datetime: value,
            desc: check_times[ value ] ?? "Undefined",
        };
        entries.push(entry);
    }

    return entries;
}