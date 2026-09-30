import { FileNtfsInfo } from "../../../../types/filesystem/files";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline filesystem info
 * @param data Array of `MacosFileInfo[] | WindowsFileInfo[] | LinuxFileInfo[]`
 * @returns Array `TimesketchTimeline` of files
 */
export function timelineRawFiles(data: FileNtfsInfo[]): TimesketchTimeline[] {
    const entries = [];

    for (const item of data) {
        let entry: TimesketchTimeline = {
            datetime: "",
            timestamp_desc: "",
            message: `${item.full_path}`,
            artifact: "Files NTFS",
            data_type: "fs::ntfs:file",
        };

        entry = { ...entry, ...item };
        entry[ "binary_info" ] = JSON.stringify(item.binary_info);

        // Extract each unique timestamp to their own entry
        const time_entries = extractRawTimes(item);
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
 * @param entry A `RawFileInfo` object
 * @returns Array of `TimeEntries`
 */
function extractRawTimes(entry: FileNtfsInfo): TimeEntries[] {
    const entries: TimeEntries[] = [];
    const check_times: Record<string, string> = {};

    check_times[ entry.created ] = "Created";
    check_times[ entry.modified ] = check_times[ entry.modified ] === undefined
        ? "Modified"
        : `${check_times[ entry.modified ]} Modified`;

    check_times[ entry.changed ] = check_times[ entry.changed ] === undefined
        ? "Changed"
        : `${check_times[ entry.changed ]} Changed`;

    check_times[ entry.accessed ] = check_times[ entry.accessed ] === undefined
        ? "Accessed"
        : `${check_times[ entry.accessed ]} Accessed`;

    check_times[ entry.filename_created ] = check_times[ entry.filename_created ] === undefined
        ? "FilenameCreated"
        : `${check_times[ entry.filename_created ]} FilenameCreated`;

    check_times[ entry.filename_modified ] = check_times[ entry.filename_modified ] === undefined
        ? "FilenameModified"
        : `${check_times[ entry.filename_modified ]} FilenameModified`;

    check_times[ entry.filename_accessed ] = check_times[ entry.filename_accessed ] === undefined
        ? "FilenameAccessed"
        : `${check_times[ entry.filename_accessed ]} FilenameAccessed`;

    check_times[ entry.filename_changed ] = check_times[ entry.filename_changed ] === undefined
        ? "FilenameChanged"
        : `${check_times[ entry.filename_changed ]} FilenameChanged`;

    for (const value in check_times) {
        const entry: TimeEntries = {
            datetime: value,
            desc: check_times[ value ] ?? "",
        };
        entries.push(entry);
    }

    return entries;
}
