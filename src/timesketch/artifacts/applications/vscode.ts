import { FileHistory } from "../../../../types/applications/vscode";
import { TimesketchArtifact, TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline VSCode File History
 * @param data Array of `FileHistory`
 * @returns Array of `TimesketchTimeline`
 */
export function timelineFileHistory(data: FileHistory[]): TimesketchTimeline[] {
    const entries: TimesketchTimeline[] = [];
    for (const item of data) {
        for (const entry of item.entries) {
            const value: TimesketchTimeline = {
                datetime: entry.timestamp as string,
                timestamp_desc: "File Saved",
                message: item.path ?? item.resource,
                artifact: "Visual Studio Code File History",
                data_type: "application:vscode:filehistory:entry",
                content: entry.content,
                filename: entry.id,
                version: item.version,
                path: item.path ?? "",
                history_path: item.history_path,
                reason: entry.source ?? "",
                description: entry.sourceDescription ?? "",
            };

            entries.push(value);
        }
    }

    return entries;
}