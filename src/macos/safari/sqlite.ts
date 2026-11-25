import { AccessorProtocol } from "../../../types/filesystem/accessor";
import { SafariFavicon, SafariHistory, SafariProfile } from "../../../types/macos/safari";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { FileError } from "../../filesystem/errors";
import { isFileEntry } from "../../filesystem/tree";
import { cocoatimeToIso } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";

/**
 * Get Safari history for all users
 * @param profile `SafariProfile` object
 * @param query SQL query
 * @param client `Unfold` object if enabled
 * @param values Array of `SafariHistory`
 * @param protocol `AccessorProtocol` instance
 * @returns Array of `SafariHistory`
 */
export function safariHistory(profile: SafariProfile, query: string, client: Unfold | undefined, values: SafariHistory[], protocol: AccessorProtocol): void {
    const target = "*/Library/Safari/History.db";
    const paths = profile.tree.glob(target);
    if (paths instanceof FileError) {
        return;
    }

    for (const path of paths) {
        if (!isFileEntry(path)) {
            continue;
        }

        let results;
        if (protocol === AccessorProtocol.Host) {
            const rows = querySqlite(path.meta.full_path, query);
            if (rows instanceof ApplicationError) {
                continue;
            }

            results = rows;
        } else {
            let db = profile.database.get(path.meta.full_path);
            if (db === undefined) {
                const opened = Sqlite.fromHandle(path.handle);
                if (opened instanceof ApplicationError) {
                    continue;
                }

                db = opened;
                profile.database.set(path.meta.full_path, db);
            }

            if (db === null) {
                continue;
            }

            const rows = db.query(query);
            if (rows instanceof ApplicationError) {
                continue;
            }

            results = rows;
        }
        for (const entry of results) {
            const history_row: SafariHistory = {
                path: path.meta.full_path,
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
                visit_time: cocoatimeToIso(entry["visit_time"] as number),
                load_successful: entry["load_successful"] as number,
                title: entry["title"] as string | null,
                attributes: entry["attributes"] as number,
                score: entry["score"] as number,
                unfold: undefined,
                browser_version: profile.version,
                message: entry["url"] as string,
                datetime: cocoatimeToIso(entry["visit_time"] as number),
                timestamp_desc: "URL Visited",
                artifact: "URL History",
                data_type: "macos:safari:history:entry",
                evidence: path.meta.display_path,
            };

            if (client !== undefined && history_row.url !== null && history_row.url !== "") {
                const status = client.parseUrl(history_row.url);
                if (!(status instanceof UnfoldError)) {
                    history_row.unfold = status;
                }
            }
            values.push(history_row);
        }
    }
}

/**
 * Get Safari Favicons for all of users
 * @param profile `SafariProfile` object
 * @param query SQL query
 * @param client `Unfold` object if enabled
 * @param values Array of `SafariFavicon`
 * @param protocol `AccessorProtocol` instance
 * @returns Array of `SafariFavicon`
 */
export function safariFavicons(profile: SafariProfile, query: string, values: SafariFavicon[], protocol: AccessorProtocol): void {
    const target = "*/Library/Safari/Favicon Cache/favicons.db";
    const paths = profile.tree.glob(target);
    if (paths instanceof FileError) {
        return;
    }

    for (const path of paths) {
        if (!isFileEntry(path)) {
            continue;
        }

        let results;
        if (protocol === AccessorProtocol.Host) {
            const rows = querySqlite(path.meta.full_path, query);
            if (rows instanceof ApplicationError) {
                continue;
            }

            results = rows;
        } else {
            let db = profile.database.get(path.meta.full_path);
            if (db === undefined) {
                const opened = Sqlite.fromHandle(path.handle);
                if (opened instanceof ApplicationError) {
                    continue;
                }

                db = opened;
                profile.database.set(path.meta.full_path, db);
            }

            if (db === null) {
                continue;
            }

            const rows = db.query(query);
            if (rows instanceof ApplicationError) {
                continue;
            }

            results = rows;
        }

        for (const entry of results) {
            const row: SafariFavicon = {
                uuid: entry["uuid"] as string,
                url: entry["url"] as string,
                favicon_url: entry["favicon_url"] as string,
                created: cocoatimeToIso(entry["timestamp"] as number),
                path: path.meta.full_path,
                browser_version: profile.version,
                message: entry["favicon_url"] as string,
                datetime: cocoatimeToIso(entry["timestamp"] as number),
                timestamp_desc: "Favicon Created",
                artifact: "URL Favicon",
                data_type: "macos:safari:favicons:entry",
                evidence: path.meta.display_path,
            };
            values.push(row);
        }
    }
}
