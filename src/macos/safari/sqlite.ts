import { SafariHistory, SafariProfile } from "../../../types/macos/safari";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { PlatformType } from "../../system/systeminfo";
import { cocoatimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";

/**
 * Get Safari history of users
 * @param paths Array of `SafariProfile`
 * @param limit Number of records to return
 * @param offset Starting DB offset
 * @param platform OS `PlatformType`
 * @param unfold Enable unfold parsing
 * @returns Array of `SafariHistory`
 */
export function safariHistory(paths: SafariProfile[], limit: number, offset: number, platform: PlatformType, unfold: boolean): SafariHistory[] {
    const query = `SELECT history_items.id AS history_item_id,
                        url,
                        domain_expansion,
                        visit_count,
                        daily_visit_counts,
                        weekly_visit_counts,
                        autocomplete_triggers,
                        should_recompute_derived_visit_counts,
                        visit_count_score,
                        status_code,
                        Cast(visit_time AS INT) AS visit_time,
                        title,
                        load_successful,
                        http_non_get,
                        synthesized,
                        redirect_destination,
                        origin,
                        generation,
                        attributes,
                        score
                    FROM   history_items
                        JOIN history_visits
                            ON history_visits.history_item = history_items.id LIMIT ${limit} OFFSET ${offset}`;

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
                id: entry[ "history_item_id" ] as number,
                url: entry[ "url" ] as string,
                domain_expansion: entry[ "domain_expansion" ] as string,
                visit_count: entry[ "visit_count" ] as number,
                daily_visit_counts: entry[ "daily_visit_counts" ] as string | null,
                weekly_visit_counts: entry[ "weekly_visit_counts" ] as string | null,
                autocomplete_triggers: entry[ "autocomplete_triggers" ] as number | null,
                should_recompute_derived_visit_counts: entry[ "should_recompute_derived_visit_counts" ] as number,
                visit_count_score: entry[ "visit_count_score" ] as number,
                status_code: entry[ "status_code" ] as number,
                visit_time: unixEpochToISO(cocoatimeToUnixEpoch(entry[ "visit_time" ] as number)),
                load_successful: entry[ "load_successful" ] as number,
                title: entry[ "title" ] as string | null,
                attributes: entry[ "attributes" ] as number,
                score: entry[ "score" ] as number,
                unfold: undefined
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