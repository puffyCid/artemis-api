import { RecentFilesLibreOffice } from "../../../../types/applications/libreoffice";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline recent files opened by LibreOffice
 * @param data Array of `RecentFilesLibreOffice`
 * @returns Array of `TimesketchTimeline`
 */
export function timelineRecentFiles(data: RecentFilesLibreOffice[]): TimesketchTimeline[] {
    const entries: TimesketchTimeline[] = [];
    for (const entry of data) {
        const value: TimesketchTimeline = {
            datetime: "1970-01-01T00:00:00Z",
            timestamp_desc: "N/A",
            message: entry.path,
            artifact: "LibreOffice Recent Files",
            data_type: "application:libreoffice:recentfiles:entry",
            title: entry.title,
            filter: entry.filter,
            pinned: entry.pinned,
            password: entry.password,
            readonly: entry.readonly,
            thumbnail: entry.thumbnail,
            path: entry.path,
            source: entry.source,
        };

        entries.push(value);
    }

    return entries;
}