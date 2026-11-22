import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { EpiphanyCookies, EpiphanyHistory, EpiphanyPermissions, EpiphanyPrint, EpiphanyProfiles, EpiphanySessions, RawEpiphanySessions, VisitType } from "../../../types/linux/gnome/epiphany";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/xml";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { readTextFile } from "../../filesystem/files";
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
    public cookies(offset = 0, limit = 100): EpiphanyCookies[] {
        const query = `SELECT * FROM moz_cookies ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
        const results: EpiphanyCookies[] = [];

        for (const profile of this.profiles) {
            const data = this.query(profile, "cookies.sqlite", query);
            if (data instanceof ApplicationError) {
                continue;
            }

            for (const row of data.rows) {
                const value = this.cookieEntry(row, data.evidence);
                results.push(value);
            }
        }

        return results;
    }

    /**
     * Function to parse session xml data
     * @returns Array of `Record<string, unknown>`
     */
    public sessions(): EpiphanySessions[] {
        const results: EpiphanySessions[] = [];

        for (const profile of this.profiles) {
            const entry = profile.tree.file("session_state.xml");
            if (entry instanceof FileError) {
                continue;
            }

            const xml_data = readXml(entry.handle);
            if (xml_data instanceof EncodingError) {
                continue;
            }

            const raw = xml_data as unknown as RawEpiphanySessions;
            for (const window of this.asArray(raw.session?.window)) {
                for (const value of this.asArray(window.embed)) {
                    const session: EpiphanySessions = {
                        url: value[ "@url" ],
                        title: value[ "@title" ],
                        history: value[ "@history" ],
                        evidence: entry.meta.display_path,
                        message: `Session for ${value[ "@url" ]}`,
                        datetime: "1970-01-01T00:00:00.000Z",
                        timestamp_desc: "N/A",
                        artifact: "GNOME Epiphany Session",
                        data_type: "linux:browser:epiphany:session:entry"
                    };

                    results.push(session);
                }
            }
        }

        return results;
    }

    /**
     * Function to return last printed page
     * @returns Array of `EpiphanyPrint`
     */
    public lastPrint(): EpiphanyPrint[] {
        const results: EpiphanyPrint[] = [];

        for (const profile of this.profiles) {
            const entry = profile.tree.file("print-settings.ini");
            if (entry instanceof FileError) {
                continue;
            }

            const print_data = readTextFile(entry.handle);
            if (print_data instanceof FileError) {
                continue;
            }

            const lines = print_data.split("\n");
            const print: EpiphanyPrint = {
                scale: 0,
                copies: 0,
                number: 0,
                reverse: false,
                output: "",
                page_set: "",
                printer: "",
                pages: "",
                collate: false,
                evidence: entry.meta.display_path,
                message: "",
                datetime: "1970-01-01T00:00:00.000Z",
                timestamp_desc: "N/A",
                artifact: "GNOME Epiphany Last Print",
                data_type: "linux:browser:epiphany:cookie:entry"
            };

            for (const line of lines) {
                if (line.startsWith("scale=")) {
                    print.scale = Number(line.replace("scale=", ""));
                } else if (line.startsWith("n-copies=")) {
                    print.copies = Number(line.replace("n-copies=", ""));
                } else if (line.startsWith("number-up=")) {
                    print.number = Number(line.replace("number-up=", ""));
                } else if (line.startsWith("reverse=")) {
                    print.reverse = Boolean(line.replace("reverse=", "") === 'true');
                } else if (line.startsWith("collate=")) {
                    print.collate = Boolean(line.replace("collate=", ""));
                } else if (line.startsWith("printer=")) {
                    print.printer = line.replace("printer=", "");
                } else if (line.startsWith("page-set=")) {
                    print.page_set = line.replace("page-set=", "");
                } else if (line.startsWith("output-uri=")) {
                    print.output = line.replace("output-uri=", "");
                    print.message = `Print page ${print.output}`;
                } else if (line.startsWith("print-pages=")) {
                    const value = line.replace("print-pages=", "");
                    if (!Number.isNaN(Number(value))) {
                        print.pages = Number(value);
                        continue;
                    }
                    print.pages = value;
                }
            }

            results.push(print);
        }

        return results;
    }

    /**
     * Function to extract website permissions
     * @returns Array of `EpiphanyPermissions`
     */
    public permissions(): EpiphanyPermissions[] {
        const results: EpiphanyPermissions[] = [];

        for (const profile of this.profiles) {
            const entry = profile.tree.file("permissions.ini");
            if (entry instanceof FileError) {
                continue;
            }

            let perm_data = readTextFile(entry.handle);
            if (perm_data instanceof FileError) {
                continue;
            }

            // Make sure our regex captures everything
            perm_data = perm_data.concat("\n");
            const pattern = /\S.+?(?:^$)/gms;
            const matches = perm_data.match(pattern);
            if (matches === null) {
                continue;
            }

            for (const value of matches) {
                const lines = value.split("\n");
                const perms: EpiphanyPermissions = {
                    url: "",
                    permissions: {},
                    evidence: entry.meta.display_path,
                    message: "",
                    datetime: "1970-01-01T00:00:00.000Z",
                    timestamp_desc: "N/A",
                    artifact: "GNOME Epiphany Site Permission",
                    data_type: "linux:browser:epiphany:permissions:entry"
                };

                for (const line of lines) {
                    if (line.startsWith("[")) {
                        perms.url = line.replace("[org/gnome/epiphany/permissions/", "").replaceAll("/", ":").replace("http:", "http://").replace("https:", "https://").replace("]", "").replace(":0", "");
                        perms.message = `Permissions for site '${perms.url}'`;
                    } else if (line.includes("=")) {
                        const perm_line = line.replace("'", "");
                        const perm_types = perm_line.split("=");
                        if (perm_types.length > 1 && perm_types[ 0 ] !== undefined) {
                            perms.permissions[ perm_types[ 0 ] ] = perm_types.at(1) ?? "";
                        }
                    }
                }
                results.push(perms);
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
            datetime: "1970-01-01T00:00:00.000Z",
            timestamp_desc: "Cookie Expires",
            artifact: "Website Cookie",
            data_type: "linux:browser:epiphany:cookie:entry"
        };

        if (row[ "lastAccessed" ] !== null) {
            value.last_accessed = this.toIso(row[ "lastAccessed" ]);
        }

        if (row[ "isSecure" ] !== null) {
            value.is_secure = Boolean(row[ "isSecure" ] as number);
        }

        if (row[ "isHttpOnly" ] !== null) {
            value.is_http_only = Boolean(row[ "isHttpOnly" ] as number);
        }

        if (row[ "sameSite" ] !== null) {
            value.same_site = Boolean(row[ "sameSite" ] as number);
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

    /**
     * Return a array based on provided `T` type
     * @param value A non-undefined or null value
     * @returns Array of `T`
     */
    private asArray<T>(value: T | T[] | undefined): T[] {
        if (value === undefined || value === null) {
            return [];
        }

        return Array.isArray(value) ? value : [ value ];
    }
}

/**
 * Function to test GNOME Epiphany parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the GNOME Epiphany parsing
 */
export function testEpiphany(): void {
    const test = "../../test_data/linux/epiphany";
    const client = new Epiphany(false, AccessorProtocol.Host, "host:", test);

    const history = client.history(0, 100);
    if (history.length !== 13) {
        throw `Got ${history.length} expected 13.......history ❌`;
    }

    if (!history[ 1 ]?.evidence.startsWith("host:")) {
        throw `Got non host accessor evidence ${history[ 1 ]?.evidence} expected "host:" 13.......history ❌`;
    }

    console.info(`  Function history ✅`);

    const cookies = client.cookies(0, 100);
    if (cookies.length !== 0) {
        throw `Got ${cookies.length} expected 0.......cookies ❌`;
    }

    console.info(`  Function cookies ✅`);

    const print = client.lastPrint();
    if (print.length !== 1) {
        throw `Got ${print.length} expected 1.......lastPrint ❌`;
    }

    console.info(`  Function lastPrint ✅`);

    const sessions = client.sessions();
    if (sessions.length !== 2) {
        throw `Got ${sessions.length} expected 2.......sessions ❌`;
    }

    console.info(`  Function sessions ✅`);
}