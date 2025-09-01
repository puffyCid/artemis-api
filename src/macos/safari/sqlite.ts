import { SafariFavicon, SafariHistory, SafariProfile } from "../../../types/macos/safari";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { PlatformType } from "../../system/systeminfo";
import { cocoatimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";

/**
 * Get Safari history for all users
 * @param paths Array of `SafariProfile`
 * @param query Query to execute
 * @param platform OS `PlatformType`
 * @param unfold Enable unfold parsing
 * @returns Array of `SafariHistory`
 */
export function safariHistory(paths: SafariProfile[], query: string, platform: PlatformType, unfold: boolean): SafariHistory[] {
    const hits: SafariHistory[] = [];
    let client: Unfold | undefined = undefined;
    if (unfold) {
        client = new Unfold();
    }
    for (const path of paths) {
        let full_path = `${path.full_path}/History.db`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\History.db`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query full_path: ${results}`);
            continue;
        }

        for (const entry of results) {
            const history_row: SafariHistory = {
                path: full_path,
                id: entry["history_item_id"] as number,
                url: entry["url"] as string,
                domain_expansion: entry["domain_expansion"] as string,
                visit_count: entry["visit_count"] as number,
                daily_visit_counts: entry["daily_visit_counts"] as string | null,
                weekly_visit_counts: entry["weekly_visit_counts"] as string | null,
                autocomplete_triggers: entry["autocomplete_triggers"] as number | null,
                should_recompute_derived_visit_counts: entry["should_recompute_derived_visit_counts"] as number,
                visit_count_score: entry["visit_count_score"] as number,
                status_code: entry["status_code"] as number,
                visit_time: unixEpochToISO(cocoatimeToUnixEpoch(entry["visit_time"] as number)),
                load_successful: entry["load_successful"] as number,
                title: entry["title"] as string | null,
                attributes: entry["attributes"] as number,
                score: entry["score"] as number,
                unfold: undefined,
                version: path.version,
                message: entry["url"] as string,
                datetime: unixEpochToISO(cocoatimeToUnixEpoch(entry["visit_time"] as number)),
                timestamp_desc: "Safari Visit",
                artifact: "Sarai URL History",
                data_type: "macos:browser:history:entry"
            };
            if (unfold && typeof client !== 'undefined') {
                const result = client.parseUrl(history_row.url);
                if (!(result instanceof UnfoldError)) {
                    history_row.unfold = result;
                }
            }
            hits.push(history_row);
        }
    }

    return hits;
}

/**
 * Get Safari Favicons for all of users
 * @param paths Array of `SafariProfile`
 * @param query Query to execute
 * @param platform OS `PlatformType`
 * @returns Array of `SafariFavicon`
 */
export function safariFavicons(paths: SafariProfile[], query: string, platform: PlatformType): SafariFavicon[] {
    const hits: SafariFavicon[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/Favicon Cache/favicons.db`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Favicon Cache\\favicons.db`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query full_path: ${results}`);
            continue;
        }

        for (const entry of results) {
            const row: SafariFavicon = {
                uuid: entry["uuid"] as string,
                url: entry["url"] as string,
                favicon_url: entry["favicon_url"] as string,
                created: unixEpochToISO(cocoatimeToUnixEpoch(entry["timestamp"] as number)),
                path: full_path,
                version: path.version,
                message: entry["favicon_url"] as string,
                datetime: unixEpochToISO(cocoatimeToUnixEpoch(entry["timestamp"] as number)),
                timestamp_desc: "Safari Favicon Created",
                artifact: "Safari Favicon",
                data_type: "macos:browser:favicons:entry"
            };
            hits.push(row);
        }
    }

    return hits;
}