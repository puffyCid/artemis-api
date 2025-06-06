import { FirefoxCookies, FirefoxDownloads, FirefoxFavicons, FirefoxHistory, FirefoxProfiles, FirefoxStorage, RawFirefoxDownloads, RawFirefoxHistory, Respository } from "../../../types/applications/firefox";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";
import { ApplicationError } from "../errors";
import { querySqlite } from "../sqlite";

/**
 * Get FireFox history for users
 * @param paths Array of `FirefoxProfiles`
 * @param platform OS `PlatformType`
 * @param unfold Enable unfold parsing
 * @param offset Starting DB offset
 * @param limit Number of records to return
 * @returns Array of `FirefoxHistory` or `ApplicationError`
 */
export function firefoxHistory(paths: FirefoxProfiles[], platform: PlatformType, unfold: boolean, offset: number, limit: number): FirefoxHistory[] | ApplicationError {
    const query = `SELECT 
                      moz_places.id AS moz_places_id, 
                      url, 
                      title, 
                      rev_host, 
                      visit_count, 
                      hidden, 
                      typed, 
                      last_visit_date, 
                      guid, 
                      foreign_count, 
                      url_hash, 
                      description, 
                      preview_image_url, 
                      origin_id, 
                      prefix, 
                      host, 
                      moz_origins.frecency AS frequency 
                    FROM 
                      moz_places 
                    JOIN moz_origins ON moz_places.origin_id = moz_origins.id LIMIT ${limit} OFFSET ${offset}`;
    const hits: FirefoxHistory[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/places.sqlite`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\places.sqlite`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query full_path: ${results}`);
            continue;
        }
        const history: RawFirefoxHistory[] = [];
        let client: Unfold | undefined = undefined;
        if (unfold) {
            client = new Unfold();
        }
        // Loop through history rows
        for (const entry of results) {
            const history_row: RawFirefoxHistory = {
                moz_places_id: entry[ "moz_places_id" ] as number ?? 0,
                url: entry[ "url" ] as string ?? "",
                title: entry[ "title" ] as string ?? "",
                rev_host: entry[ "rev_host" ] as string ?? "",
                visit_count: entry[ "visit_count" ] as number ?? 0,
                hidden: entry[ "hidden" ] as number ?? 0,
                typed: entry[ "typed" ] as number ?? 0,
                frequency: entry[ "frequency" ] as number ?? 0,
                last_visit_date: unixEpochToISO(
                    entry[ "last_visit_date" ] as bigint ?? 0,
                ),
                guid: entry[ "guid" ] as string ?? "",
                foreign_count: entry[ "foreign_count" ] as number ?? 0,
                url_hash: entry[ "url_hash" ] as number ?? 0,
                description: entry[ "description" ] as string ?? "",
                preview_image_url: entry[ "preview_image_url" ] as string ?? "",
                prefix: entry[ "prefix" ] as string ?? "",
                host: entry[ "host" ] as string ?? "",
                unfold: undefined
            };
            if (unfold && typeof client != 'undefined') {
                const result = client.parseUrl(history_row.url);
                if (!(result instanceof UnfoldError)) {
                    history_row.unfold = result;
                }
            }
            history.push(history_row);
        }

        const hit: FirefoxHistory = {
            history,
            path: full_path,
        };

        hits.push(hit);
    }

    return hits;
}

/**
 * Get FireFox downloads for users
 * @param paths Array of `FirefoxProfiles`
 * @param platform OS `PlatformType`
 * @param unfold Enable unfold parsing
 * @param offset Starting DB offset
 * @param limit Number of records to return
 * @returns Array of `FirefoxDownloads` or `ApplicationError`
 */
export function firefoxDownloads(paths: FirefoxProfiles[], platform: PlatformType, unfold: boolean, offset: number, limit: number): FirefoxDownloads[] | ApplicationError {
    const query = `SELECT 
                      moz_annos.id AS downloads_id, 
                      place_id, 
                      anno_attribute_id, 
                      content, 
                      flags, 
                      expiration, 
                      type, 
                      dateAdded, 
                      lastModified, 
                      moz_places.id AS moz_places_id, 
                      url, 
                      title, 
                      rev_host, 
                      visit_count, 
                      hidden, 
                      typed, 
                      last_visit_date, 
                      guid, 
                      foreign_count, 
                      url_hash, 
                      description, 
                      preview_image_url, 
                      name 
                    FROM 
                      moz_annos 
                      JOIN moz_places ON moz_annos.place_id = moz_places.id 
                      JOIN moz_anno_attributes ON anno_attribute_id = moz_anno_attributes.id LIMIT ${limit} OFFSET ${offset}`;
    const hits: FirefoxDownloads[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/places.sqlite`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\places.sqlite`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }
        const downloads: RawFirefoxDownloads[] = [];
        let client: Unfold | undefined = undefined;
        if (unfold) {
            client = new Unfold();
        }
        // Loop through downloads rows
        for (const entry of results) {
            const download_row: RawFirefoxDownloads = {
                id: entry[ "id" ] as number ?? 0,
                place_id: entry[ "place_id" ] as number ?? 0,
                anno_attribute_id: entry[ "anno_attribute_id" ] as number ?? 0,
                content: entry[ "content" ] as string ?? "",
                flags: entry[ "flags" ] as number ?? 0,
                expiration: entry[ "expiration" ] as number ?? 0,
                download_type: entry[ "download_type" ] as number ?? 0,
                date_added: unixEpochToISO(
                    entry[ "date_added" ] as bigint ?? 0,
                ),
                last_modified: unixEpochToISO(
                    entry[ "last_modified" ] as bigint ?? 0,
                ),
                name: entry[ "name" ] as string ?? "",
                history: {
                    moz_places_id: entry[ "moz_places_id" ] as number ?? 0,
                    url: entry[ "url" ] as string ?? "",
                    title: entry[ "title" ] as string ?? "",
                    rev_host: entry[ "rev_host" ] as string ?? "",
                    visit_count: entry[ "rev_host" ] as number ?? 0,
                    hidden: entry[ "hidden" ] as number ?? 0,
                    typed: entry[ "typed" ] as number ?? 0,
                    frequency: entry[ "frequency" ] as number ?? 0,
                    last_visit_date: unixEpochToISO(
                        entry[ "last_visit_date" ] as bigint ?? 0,
                    ),
                    guid: entry[ "guid" ] as string ?? "",
                    foreign_count: entry[ "foreign_count" ] as number ?? 0,
                    url_hash: entry[ "url_hash" ] as number ?? 0,
                    description: entry[ "description" ] as string ?? "",
                    preview_image_url: entry[ "preview_image_url" ] as string ?? "",
                    prefix: entry[ "prefix" ] as string ?? "",
                    host: entry[ "host" ] as string ?? "",
                    unfold: undefined
                },
            };
            if (unfold && typeof client != 'undefined') {
                const result = client.parseUrl(download_row.history.url);
                if (!(result instanceof UnfoldError)) {
                    download_row.history.unfold = result;
                }
            }
            downloads.push(download_row);
        }

        const hit: FirefoxDownloads = {
            downloads,
            path: full_path,
        };

        hits.push(hit);
    }

    return hits;
}

/**
 * Get FireFox cookies for users
 * @param paths Array of `FirefoxProfiles`
 * @param platform OS `PlatformType`
 * @param offset Starting DB offset
 * @param limit Number of records to return
 * @returns Array of `FirefoxCookies` or `ApplicationError`
 */
export function firefoxCookies(paths: FirefoxProfiles[], platform: PlatformType, offset: number, limit: number): FirefoxCookies[] | ApplicationError {
    const cookies: FirefoxCookies[] = [];
    const query = `select * from moz_cookies LIMIT ${limit} OFFSET ${offset}`;

    for (const path of paths) {
        let full_path = `${path.full_path}/places.sqlite`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\places.sqlite`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }
        const adjust_time: bigint = 1000000n;

        for (const entry of results) {
            const cookie_entry: FirefoxCookies = {
                id: entry[ "id" ] as number,
                origin_attributes: entry[ "originAttributes" ] as string,
                in_browser_element: !!(entry[ "inBrowserElement" ] as number),
                same_site: !!(entry[ "sameSite" ] as number),
                raw_same_site: !!(entry[ "rawSameSite" ] as number),
                scheme_map: entry[ "rawSameSite" ] as number,
                name: entry[ "name" ] as string | undefined,
                value: entry[ "value" ] as string | undefined,
                path: entry[ "path" ] as string | undefined,
                expiry: entry[ "expiry" ] as number | undefined,
                is_secure: !!(entry[ "isSecure" ] as number | undefined),
                is_http_only: !!(entry[ "isSecure" ] as number | undefined),
                host: entry[ "host" ] as string | undefined,
                db_path: full_path,
            };

            if (entry[ "lastAccessed" ] != undefined) {
                cookie_entry.last_accessed = unixEpochToISO(Number(
                    BigInt(entry[ "lastAccessed" ] as bigint) / adjust_time,
                ));
            }

            if (entry[ "creationTime" ] != undefined) {
                cookie_entry.creation_time = unixEpochToISO(Number(
                    BigInt(entry[ "creationTime" ] as bigint) / adjust_time,
                ));
            }

            cookies.push(cookie_entry);
        }

    }
    return cookies;

}

/**
 * Get FireFox favicons for urls
 * @param paths Array of `FirefoxProfiles`
 * @param platform OS `PlatformType`
 * @param offset Starting DB offset
 * @param limit Number of records to return
 * @returns Array of `FirefoxFavicons` or `ApplicationError`
 */
export function firefoxFavicons(paths: FirefoxProfiles[], platform: PlatformType, offset: number, limit: number): FirefoxFavicons[] | ApplicationError {
    const favicons: FirefoxFavicons[] = [];
    const query = `SELECT icon_url, expire_ms FROM moz_cookies LIMIT ${limit} OFFSET ${offset}`;

    for (const path of paths) {
        let full_path = `${path.full_path}/places.sqlite`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\places.sqlite`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }

        for (const entry of results) {
            const fav_entry: FirefoxFavicons = {
                icon_url: entry[ "icon_url" ] as string,
                expires: unixEpochToISO(entry[ "expire_ms" ] as number),
                db_path: full_path,
            };

            favicons.push(fav_entry);
        }

    }
    return favicons;
}

/**
 * Get FireFox storage info
 * @param paths Array of `FirefoxProfiles`
 * @param platform OS `PlatformType`
 * @param offset Starting DB offset
 * @param limit Number of records to return
 * @returns Array of `FirefoxFavicons` or `ApplicationError`
 */
export function firefoxStorage(paths: FirefoxProfiles[], platform: PlatformType, offset: number, limit: number): FirefoxStorage[] | ApplicationError {
    const query = `SELECT respository_id, suffix, group_, origin, client_usages, usage, last_access_time, accessed, persisted FROM origin LIMIT ${limit} OFFSET ${offset}`;

    const storage: FirefoxStorage[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/storage.sqlite`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\storage.sqlite`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }

        for (const entry of results) {
            const fav_entry: FirefoxStorage = {
                db_path: full_path,
                repository: getRepo(entry[ "respository_id" ] as number),
                group: entry[ "group_" ] as string,
                origin: entry[ "origin" ] as string,
                client_usages: entry[ "client_usages" ] as string,
                last_access: unixEpochToISO(entry[ "last_access_time" ] as number),
                accessed: entry[ "accessed" ] as number,
                persisted: entry[ "persisted" ] as number,
                suffix: entry[ "suffix" ] as string ?? undefined
            };

            storage.push(fav_entry);
        }

    }
    return storage;
}

function getRepo(id: number): Respository {
    switch (id) {
        case 1: return Respository.Temporary;
        case 0: return Respository.Persistent;
        case 2: return Respository.Default;
        case 3: return Respository.Private;
        default: return Respository.Unknown;
    }
}