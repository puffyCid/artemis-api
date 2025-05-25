import { Abrt } from "../../../../types/linux/abrt";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline";

/**
 * Function to timeline abrt process entries
 * @param data Array of `Abrt`
 * @returns Array of `TimesketchTimeline`
 */
export function timelineAbrt(data: Abrt[]): TimesketchTimeline[] {
    const entries: TimesketchTimeline[] = [];
    for (const item of data) {
        let entry: TimesketchTimeline = {
            datetime: item.last_occurrence,
            timestamp_desc: "Abrt Last Occurrence",
            message: item.executable,
            artifact: "Abrt",
            data_type: "linux:abrt:entry",
        };

        entry = { ...entry, ...item };
        entries.push(entry);

    }

    return entries;
}