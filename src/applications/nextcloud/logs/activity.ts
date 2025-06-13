import { NextcloudClientActivityLog } from "../../../../types/applications/nextcloud";

/**
 * Parse the Nextcloud client activity logs
 * @param text Activity log text data
 * @param log_source Source of the log file
 * @returns Array of `NextcloudClientActivityLog`
 */
export function nextcloudActivityLogs(text: string, log_source: string): NextcloudClientActivityLog[] {
    const lines = text.split("\n");
    const logs: NextcloudClientActivityLog[] = [];

    for (const entry of lines) {
        const log: NextcloudClientActivityLog = {
            timestamp: "",
            category: "",
            function: "",
            source_file: "",
            source_file_line: 0,
            message: "",
            log_source
        };

        const empty = 0;
        if (entry.length === empty) {
            continue;
        }

        const timestamp = entry.split("[");
        log.timestamp = (timestamp.at(0) ?? "1970-01-01T00:00:00.Z").trimEnd().replace(" ", "T");
        const next_values = timestamp.slice(1).join("[");

        if (next_values === undefined) {
            continue;
        }
        const values = next_values.trimStart().split(" ");

        log.category = (values.at(0) ?? "").trim();
        log.function = (values.at(1) ?? "").trim();
        let source = (values.at(2) ?? "");
        if (source === "") {
            continue;
        }

        log.source_file = source.split(":").at(0) ?? "";
        log.source_file_line = Number(source.split(":").at(1)) ?? 0;
        log.message = values.slice(3).join(" ").replace("]:", "").trim();

        logs.push(log);
    }
    return logs;
}