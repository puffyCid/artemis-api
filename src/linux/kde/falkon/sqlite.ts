import { PlatformType, querySqlite, Unfold } from "../../../../mod";
import { FalkonCookie, FalkonHistory, FalkonProfile } from "../../../../types/linux/kde/falkon";
import { getChromiumCookieType } from "../../../applications/chromium/sqlite";
import { ApplicationError } from "../../../applications/errors";
import { unixEpochToISO, webkitToUnixEpoch } from "../../../time/conversion";
import { UnfoldError } from "../../../unfold/error";

export function falkonHistory(paths: FalkonProfile[], platform: PlatformType, unfold: boolean, query: string): FalkonHistory[] {
    const hits: FalkonHistory[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/browsedata.db`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\browsedata.db`;
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
            const history_row: FalkonHistory = {
                id: entry["id"] as number,
                url: entry["url"] as string,
                unfold: undefined,
                db_path: full_path,
                version: path.version,
                title: entry["title"] as string | null,
                visited: unixEpochToISO(entry["date"] as number),
                count: entry["count"] as number,
                message: entry["url"] as string,
                datetime: unixEpochToISO(entry["date"] as number),
                timestamp_desc: "Falkon URL Visited",
                artifact: "KDE Falkon History",
                data_type: "linux:browser:kde:history:entry"
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

export function falkonCookie(paths: FalkonProfile[], platform: PlatformType, query: string): FalkonCookie[] {
    const hits: FalkonCookie[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/Cookies`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Cookies`;
        }

        const results = querySqlite(full_path, query);
        if (results instanceof ApplicationError) {
            console.warn(`Failed to query ${full_path}: ${results}`);
            continue;
        }

        // Loop through history rows
        for (const entry of results) {
            const history_row: FalkonCookie = {
                created: unixEpochToISO(webkitToUnixEpoch(entry["creation_utc"] as number)),
                host_key: entry["host_key"] as string,
                top_frame_site_key: entry["top_frame_site_key"] as string,
                name: entry["name"] as string,
                value: entry["value"] as string,
                encrypted_value: entry["encrypted_value"] as string,
                path: entry["path"] as string,
                expires: unixEpochToISO(webkitToUnixEpoch(entry["expires_utc"] as number)),
                is_secure: !!(entry["is_secure"] as number),
                is_httponly: !!(entry["is_httponly"] as number),
                last_access: unixEpochToISO(webkitToUnixEpoch(entry["last_access_utc"] as number)),
                has_expires: !!(entry["has_expires"] as number),
                is_persistent: !!(entry["is_persistent"] as number),
                priority: entry["priority"] as number,
                samesite: entry["samesite"] as number,
                source_scheme: entry["source_scheme"] as number,
                source_port: entry["source_port"] as number,
                last_update: unixEpochToISO(webkitToUnixEpoch(entry["last_access_utc"] as number)),
                source_type: getChromiumCookieType(entry["source_type"] as number),
                has_cross_site_ancestor: !!(entry["has_cross_site_ancestor"] as number),
                message: entry["host_key"] as string,
                db_path: full_path,
                version: path.version,
                datetime: unixEpochToISO(webkitToUnixEpoch(entry["creation_utc"] as number)),
                timestamp_desc: "Falkon Cookie Created",
                artifact: "KDE Falkon Cookie",
                data_type: "linux:browser:kde:cookie:entry"
            };

            hits.push(history_row);
        }
    }
    return hits;
}
