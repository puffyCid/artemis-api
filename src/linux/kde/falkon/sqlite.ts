import { querySqlite, Unfold } from "../../../../mod";
import { AccessorProtocol } from "../../../../types/filesystem/accessor";
import { FalkonCookie, FalkonHistory, FalkonProfile } from "../../../../types/linux/kde/falkon";
import { getChromiumCookieType } from "../../../applications/chromium/sqlite";
import { ApplicationError } from "../../../applications/errors";
import { Sqlite } from "../../../applications/sqlite";
import { FileError } from "../../../filesystem/errors";
import { toIso, webkitToIso } from "../../../time/conversion";
import { UnfoldError } from "../../../unfold/error";


/**
 * Extract Falkon browser history
 * @param sql History query to execute
 * @param unfold Whether to enable URL unfolding
 * @param protocol `AccessorProtocol` to use when accessing the atabase
 * @param profiles Array of `FalkonProfile`
 * @returns Array of `FalkonHistory`
 */
export function falkonHistory(sql: string, unfold: boolean, protocol: AccessorProtocol, profiles: FalkonProfile[]): FalkonHistory[] {
    const client = unfold ? new Unfold() : undefined;

    const results: FalkonHistory[] = [];
    for (const profile of profiles) {
        const data = query(profile, "browsedata.db", sql, protocol);
        if (data instanceof ApplicationError) {
            continue;
        }

        // Loop through history rows
        for (const entry of data.rows) {
            const history_row: FalkonHistory = {
                id: entry[ "id" ] as number,
                url: entry[ "url" ] as string,
                unfold: undefined,
                evidence: data.evidence,
                version: profile.version,
                title: entry[ "title" ] as string | null,
                visited: toIso(entry[ "date" ]),
                count: entry[ "count" ] as number,
                message: entry[ "url" ] as string,
                datetime: toIso(entry[ "date" ]),
                timestamp_desc: "Falkon URL Visited",
                artifact: "KDE Falkon History",
                data_type: "linux:browser:kde:history:entry"
            };

            if (client !== undefined && history_row.url !== null && history_row.url !== "") {
                const status = client.parseUrl(history_row.url);
                if (!(status instanceof UnfoldError)) {
                    history_row.unfold = status;
                }
            }

            results.push(history_row);
        }
    }

    return results;
}

export function falkonCookie(sql: string, protocol: AccessorProtocol, profiles: FalkonProfile[]): FalkonCookie[] {
    const results: FalkonCookie[] = [];
    for (const profile of profiles) {
        const data = query(profile, "Cookies", sql, protocol);
        if (data instanceof ApplicationError) {
            continue;
        }

        // Loop through cookie rows
        for (const entry of data.rows) {
            const row: FalkonCookie = {
                created: webkitToIso(entry[ "creation_utc" ] as bigint),
                host_key: entry[ "host_key" ] as string,
                top_frame_site_key: entry[ "top_frame_site_key" ] as string,
                name: entry[ "name" ] as string,
                value: entry[ "value" ] as string,
                encrypted_value: entry[ "encrypted_value" ] as string,
                path: entry[ "path" ] as string,
                expires: webkitToIso(entry[ "expires_utc" ] as bigint),
                is_secure: !!(entry[ "is_secure" ] as number),
                is_httponly: !!(entry[ "is_httponly" ] as number),
                last_access: webkitToIso(entry[ "last_access_utc" ] as bigint),
                has_expires: !!(entry[ "has_expires" ] as number),
                is_persistent: !!(entry[ "is_persistent" ] as number),
                priority: entry[ "priority" ] as number,
                samesite: entry[ "samesite" ] as number,
                source_scheme: entry[ "source_scheme" ] as number,
                source_port: entry[ "source_port" ] as number,
                last_update: webkitToIso(entry[ "last_access_utc" ] as bigint),
                source_type: getChromiumCookieType(entry[ "source_type" ] as number),
                has_cross_site_ancestor: !!(entry[ "has_cross_site_ancestor" ] as number),
                message: entry[ "host_key" ] as string,
                evidence: data.evidence,
                version: profile.version,
                datetime: webkitToIso(entry[ "creation_utc" ] as bigint),
                timestamp_desc: "Falkon Cookie Created",
                artifact: "KDE Falkon Cookie",
                data_type: "linux:browser:kde:cookie:entry"
            };
            results.push(row);
        }
    }

    return results;
}

/**
 * Function to query sqlite database file
 * @param profile `FalkonProfile` object
 * @param name Target database file to query
 * @param sql SQL query to execute
 * @returns DB rows and source database evidence
 */
function query(profile: FalkonProfile, name: string, sql: string, protocol: AccessorProtocol): { evidence: string; rows: Record<string, unknown>[]; } | ApplicationError {
    const file = profile.tree.file(name);
    if (file instanceof FileError) {
        return new ApplicationError(`SQLITE`, `could not find ${name}: ${file}`);
    }

    const evidence = file.meta.display_path;
    if (protocol === AccessorProtocol.Host) {
        const rows = querySqlite(file.meta.full_path, sql);
        return rows instanceof ApplicationError ? rows : { evidence, rows };
    }

    let db = profile.database.get(name);
    if (db === undefined) {
        const opened = Sqlite.fromHandle(file.handle);
        if (opened instanceof ApplicationError) {
            console.warn(`Could not open ${name} from ${evidence}: ${opened}`);
        }

        db = opened instanceof ApplicationError ? null : opened;
        profile.database.set(name, db);
    }

    if (db === null) {
        return new ApplicationError(`SQLITE`, `could not open ${evidence}. Database is null for ${name}`);
    }

    const rows = db.query(sql);
    return rows instanceof ApplicationError ? rows : { evidence, rows };
}



