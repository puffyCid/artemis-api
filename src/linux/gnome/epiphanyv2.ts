import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { EpiphanyCookies, EpiphanyHistory, EpiphanyProfiles, VisitType } from "../../../types/linux/gnome/epiphany";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { DirectoryTree } from "../../filesystem/tree";
import { unixEpochToISO } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";

export class Epiphany {
    private profiles: EpiphanyProfiles[] = [];
    private unfold: boolean = false;
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;

    constructor (unfold = false, protocol = AccessorProtocol.Host, source_path = "host:", alt_path?: string) {
        this.unfold = unfold;
        this.protocol = protocol;
        const pattern = alt_path ?? "/home/*/.local/share/epiphany";

        this.source = this.accessor.openSource(source_path, this.protocol);
        if (this.source instanceof FileError) {
            return;
        }

        const matches = this.accessor.sourceGlobfs(this.source, pattern);
        if (matches instanceof FileError) {
            return;
        }

        for (const entry of matches) {
            // We want the base directory for Epiphany artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const profile: EpiphanyProfiles = {
                full_path: entry.meta.full_path,
                version: 0,
                evidence: entry.meta.display_path,
                tree,
                database: new Map(),
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Function to extract Epiphany history entries
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EpiphanyHistory`
     */
    public history(offset = 0, limit = 100): EpiphanyHistory[] {
        const query = `SELECT
                        visits.id AS visit_id,
                        visits.visit_time AS visit_time,
                        visits.visit_type AS visit_type,
                        visits.referring_visit AS referring_visit,
                        urls.id AS url_id,
                        urls.host AS host,
                        urls.url AS url,
                        urls.title AS title,
                        urls.sync_id AS sync_id,
                        urls.visit_count AS visit_count,
                        urls.typed_count AS typed_count,
                        urls.last_visit_time AS last_visit_time,
                        urls.thumbnail_update_time AS thumbnail_update_time,
                        urls.hidden_from_overview AS hidden_from_overview
                    FROM visits
                    INNER JOIN urls ON urls.id = visits.url
                    ORDER BY visits.id
                    LIMIT ${limit} OFFSET ${offset}`;

        const client = this.unfold ? new Unfold() : undefined;
        const results: EpiphanyHistory[] = [];

        for (const profile of this.profiles) {
            const data = this.query(profile, "ephy-history.db", query);
            if (data instanceof ApplicationError) {
                continue;
            }

            for (const row of data.rows) {
                const value = this.historyEntry(row, data.evidence);
                if (client !== undefined && value.target_url !== null && value.target_url !== "") {
                    const status = client.parseUrl(value.target_url);
                    if (!(status instanceof UnfoldError)) {
                        value.unfold = status;
                    }
                }
                results.push(value);
            }
        }
        return results;
    }

    /**
     * Function to extract Epiphany cookies
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EpiphanyCookies`
     */
    public cookie(offset = 0, limit = 100): EpiphanyCookies[] {
        const query = `SELECT * FROM moz_cookies LIMIT ${limit} OFFSET ${offset}`;
        const results: EpiphanyCookies[] = [];

        for (const profile of this.profiles) {
            const data = this.query(profile, "cookies.sqlite", query);
            if (data instanceof ApplicationError) {
                continue;
            }
        }

        return results;
    }

    /**
     * Function to query sqlite database file
     * @param profile `EpiphanyProfiles` object
     * @param name Target database file to query
     * @param sql SQL query to execute
     * @returns DB rows and source database evidence
     */
    private query(profile: EpiphanyProfiles, name: string, sql: string): { evidence: string; rows: Record<string, unknown>[]; } | ApplicationError {
        const file = profile.tree.file(name);
        if (file instanceof FileError) {
            return new ApplicationError(`SQLITE`, `could not find ${name}: ${file}`);
        }

        const evidence = file.meta.display_path;
        if (this.protocol === AccessorProtocol.Host) {
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

    /**
     * Function to extract sqlite history row values
     * @param row Single sqlite history row from `ephy-history.db`
     * @param evidence Source to `ephy-history.db`
     * @returns `EpiphanyHistory` object
     */
    private historyEntry(row: Record<string, unknown>, evidence: string): EpiphanyHistory {
        const url = row[ "url" ] as string | null ?? "";
        return {
            url_id: row[ "url_id" ] as number,
            host_id: row[ "host" ] as number,
            visit_count: row[ "visit_count" ] as number,
            typed_count: row[ "typed_count" ] as number,
            last_visit_time: this.toIso(row[ "last_visit_time" ]),
            thumbnail_update_time: this.toIso(row[ "thumbnail_update_time" ]),
            hidden_from_overview: Boolean(row[ "hidden_from_overview" ] as number),
            visit_type: this.visitType(row[ "visit_type" ] as number),
            evidence,
            target_url: url,
            title: row[ "title" ] as string | null ?? "",
            referring_visit: row[ "referring_visit" ] as string | null,
            sync_id: row[ "sync_id" ] as string | null,
            message: url,
            datetime: this.toIso(row[ "visit_time" ]),
            timestamp_desc: "URL Visited",
            artifact: "URL History",
            data_type: "linux:gnome:epiphany:history:entry",
        };
    }

    /**
     * Function to extract sqlite cookie row values
     * @param row Single sqlite cookie row from `cookies.sqlite`
     * @param evidence Source to `cookies.sqlite`
     * @returns `EpiphanyCookies` object
     */
    private cookieEntry(row: Record<string, unknown>, evidence: string): EpiphanyCookies {
        const value: EpiphanyCookies = {
            id: row[ "id" ] as number,
            name: row[ "name" ] as string | null,
            value: row[ "value" ] as string | null,
            host: row[ "host" ] as string | null,
            path: row[ "path" ] as string | null,
            expiry: "",
            last_accessed: "",
            is_secure: false,
            is_http_only: false,
            same_site: false,
            evidence,
            message: `Cookie for ${row[ "host" ] as string | null} | ${row[ "name" ] as string | null ?? ""}`,
            datetime: "",
            timestamp_desc: "Cookie Expires",
            artifact: "Website Cookie",
            data_type: "linux:browser:epiphany:cookie:entry"
        };

        if (row[ "lastAccessed" ] !== null) {
            value.last_accessed = this.toIso(row[ "last_access" ]);
        }

        if (row[ "isSecure" ] !== null) {
            value.is_secure = Boolean(row[ "is_secure" ] as number);
        }

        if (row[ "isHttpOnly" ] !== null) {
            value.is_http_only = Boolean(row[ "is_http_only" ] as number);
        }

        if (row[ "sameSite" ] !== null) {
            value.same_site = Boolean(row[ "same_site" ] as number);
        }

        if (row[ "expiry" ] !== null) {
            value.expiry = this.toIso(row[ "expiry" ]);
            value.datetime = value.expiry;
        }

        return value;
    }

    /**
     * Convert timestamps to ISO8601
     * @param value Timestamp value from sqlite database
     * @returns ISO8601 string with millisecond precision
     */
    private toIso(value: unknown) {
        if (typeof value === "number" || typeof value === "bigint") {
            return unixEpochToISO(value);
        }

        return unixEpochToISO(0);
    }

    /**
     * Determine the URL visit type
     * @param visit Epiphany visit type as number
     * @returns `VisitType` enum value
     */
    private visitType(visit: number): VisitType {
        switch (visit) {
            case 0: return VisitType.None;
            case 1: return VisitType.Link;
            case 2: return VisitType.Typed;
            case 8: return VisitType.Bookmark;
            case 9: return VisitType.HomePage;
            default: return VisitType.Unknown;
        }
    }
}