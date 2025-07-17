import { ChromiumProfiles, ChromiumHistory, ChromiumDownloads, ChromiumCookies, ChromiumAutofill } from "../../../types/applications/chromium";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";
import { ApplicationError } from "../errors";
import { querySqlite } from "../sqlite";

/**
 * Get Chromium history for users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param unfold Enable unfold parsing
 * @param query SQL query to run
 * @returns Array of `ChromiumHistory`
 */
export function chromiumHistory(paths: ChromiumProfiles[], platform: PlatformType, unfold: boolean, query: string): ChromiumHistory[] {
    const hits: ChromiumHistory[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/Default/History`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Default\\History`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }
        let client: Unfold | undefined = undefined;
        if (unfold) {
            client = new Unfold();
        }

        // Loop through history rows
        for (const entry of results) {
            const adjust = 1000000;
            const webkit = webkitToUnixEpoch(
                (entry[ "last_visit_time" ] as number ?? 0) / adjust,
            );
            const history_row: ChromiumHistory = {
                id: entry[ "id" ] as number ?? 0,
                url: entry[ "url" ] as string ?? "",
                title: entry[ "title" ] as string ?? "",
                visit_count: entry[ "visit_count" ] as number ?? 0,
                typed_count: entry[ "typed_count" ] as number ?? 0,
                last_visit_time: unixEpochToISO(webkit),
                hidden: entry[ "hidden" ] as number ?? 0,
                visits_id: entry[ "visits_id" ] as number ?? 0,
                from_visit: entry[ "from_visit" ] as number ?? 0,
                transition: entry[ "transition" ] as number ?? 0,
                segment_id: entry[ "segment_id" ] as number ?? 0,
                visit_duration: entry[ "visit_duration" ] as number ?? 0,
                opener_visit: entry[ "opener_visit" ] as number ?? 0,
                unfold: undefined,
                db_path: full_path,

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
 * Get Chromium downloads for users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumDownloads`
 */
export function chromiumDownloads(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumDownloads[] {
    const hits: ChromiumDownloads[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/Default/History`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Default\\History`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }
        // Loop through downloads rows
        for (const entry of results) {
            const adjust = 1000000;
            const start = webkitToUnixEpoch(
                (entry[ "start_time" ] as number ?? 0) / adjust,
            );
            const end = webkitToUnixEpoch(
                (entry[ "end_time" ] as number ?? 0) / adjust,
            );
            const access = webkitToUnixEpoch(
                (entry[ "last_access_time" ] as number ?? 0) / adjust,
            );
            const download_row: ChromiumDownloads = {
                id: entry[ "id" ] as number ?? 0,
                guid: entry[ "guid" ] as string ?? "",
                current_path: entry[ "current_path" ] as string ?? "",
                target_path: entry[ "target_path" ] as string ?? "",
                start_time: unixEpochToISO(start),
                received_bytes: entry[ "received_bytes" ] as number ?? 0,
                total_bytes: entry[ "total_bytes" ] as number ?? 0,
                state: entry[ "state" ] as number ?? 0,
                danger_type: entry[ "danger_type" ] as number ?? 0,
                interrupt_reason: entry[ "interrupt_reason" ] as number ?? 0,
                hash: entry[ "hash" ] as number[] ?? [],
                end_time: unixEpochToISO(end),
                opened: entry[ "opened" ] as number ?? 0,
                last_access_time: unixEpochToISO(access),
                transient: entry[ "transient" ] as number ?? 0,
                referrer: entry[ "referrer" ] as string ?? "",
                site_url: entry[ "site_url" ] as string ?? "",
                tab_url: entry[ "tab_url" ] as string ?? "",
                tab_referrer_url: entry[ "tab_referrer_url" ] as string ?? "",
                http_method: entry[ "http_method" ] as string ?? "",
                by_ext_id: entry[ "by_ext_id" ] as string ?? "",
                by_ext_name: entry[ "by_ext_name" ] as string ?? "",
                etag: entry[ "etag" ] as string ?? "",
                last_modified: entry[ "last_modified" ] as string ?? "",
                mime_type: entry[ "mime_type" ] as string ?? "",
                original_mime_type: entry[ "original_mime_type" ] as string ?? "",
                downloads_url_chain_id: entry[ "downloads_url_chain_id" ] as number ?? 0,
                chain_index: entry[ "chain_index" ] as number ?? 0,
                url: entry[ "url" ] as string ?? "",
                db_path: full_path,
            };
            hits.push(download_row);
        }
    }

    return hits;
}

/**
 * Get Chromium downloads for users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumCookies`
 */
export function chromiumCookies(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumCookies[] {
    const hits: ChromiumCookies[] = [];
    for (const path of paths) {
        let full_paths = [ `${path.full_path}/Default/Cookies`, `${path.full_path}/Default/Network/Cookies` ];

        if (platform === PlatformType.Windows) {
            full_paths = [ `${path.full_path}\\Default\\Network\\Cookies`, `${path.full_path}\\Default\\Cookies` ];
        }

        for (const full_path of full_paths) {
            const results = querySqlite(full_path, query);
            if (results instanceof ApplicationError) {
                console.warn(`Failed to query ${full_path}: ${results}`);
                continue;
            }
            // Loop through cookies rows
            const adjust_time = 1000000n;
            for (const entry of results) {
                const cookie_entry: ChromiumCookies = {
                    creation: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "creation_utc" ] as bigint) / adjust_time),
                    )),
                    host_key: entry[ "host_key" ] as string,
                    top_frame_site_key: entry[ "top_frame_site_key" ] as string,
                    name: entry[ "name" ] as string,
                    value: entry[ "value" ] as string,
                    encrypted_value: entry[ "encrypted_value" ] as string,
                    path: entry[ "path" ] as string,
                    expires: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "expires_utc" ] as bigint) / adjust_time),
                    )),
                    is_secure: !!(entry[ "is_secure" ] as number),
                    is_httponly: !!(entry[ "is_httponly" ] as number),
                    last_access: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "last_access_utc" ] as bigint) / adjust_time),
                    )),
                    has_expires: !!(entry[ "has_expires" ] as number),
                    is_persistent: !!(entry[ "is_persistent" ] as number),
                    priority: entry[ "priority" ] as number,
                    samesite: entry[ "samesite" ] as number,
                    source_scheme: entry[ "source_scheme" ] as number,
                    source_port: entry[ "source_port" ] as number,
                    is_same_party: entry[ "is_same_party" ] as number,
                    last_update: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "last_update_utc" ] as bigint) / adjust_time),
                    )),
                    db_path: full_path,
                };
                hits.push(cookie_entry);
            }
        }
    }
    return hits;
}

/**
 * Function to extract Autofill information from database
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumAutofill`
 */
export function chromiumAutofill(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumAutofill[] {
    const hits: ChromiumAutofill[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/Default/Web Data`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Default\\Web Data`;
        }

        for (const path of full_path) {
            const results = querySqlite(path, query);
            if (results instanceof ApplicationError) {
                console.warn(`Failed to query ${path}: ${results}`);
                continue;
            }
            // Loop through cookies rows
            const adjust_time = 1000000n;
            for (const entry of results) {
                const fill_entry: ChromiumAutofill = {
                    db_path: path,
                    date_created: unixEpochToISO(entry[ "date_created" ] as number),
                    date_last_used: unixEpochToISO(entry[ "date_last_used" ] as number),
                    count: entry[ "count" ] as number,
                    name: entry[ "name" ] as string | undefined,
                    value: entry[ "value" ] as string | undefined,
                    value_lower: entry[ "value_lower" ] as string | undefined,
                };
                hits.push(fill_entry);
            }
        }
    }
    return hits;
}