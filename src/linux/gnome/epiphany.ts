import { EpiphanyCookies, EpiphanyHistory, EpiphanyPermissions, EpiphanyPrint, EpiphanyProfiles, EpiphanySessions, VisitType } from "../../../types/linux/gnome/epiphany";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/xml";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile } from "../../filesystem/files";
import { SystemError } from "../../system/error";
import { dumpData, Output } from "../../system/output";
import { unixEpochToISO } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";
import { LinuxError } from "../errors";

/**
 * Class to parse GNOME Epiphany browser data
 */
export class Epiphany {
    private paths: EpiphanyProfiles[] = [];
    private unfold: boolean;

    /**
     * Create a new `Epiphany` instance to parse data
     * @param unfold Enable `Unfold` parsing. Default is false
     * @param alt_glob Provide an optional glob to an alternative Epiphany directory
     */
    constructor(unfold = false, alt_glob?: string) {
        this.unfold = unfold;
        const values = this.profiles(alt_glob);
        if (values instanceof LinuxError) {
            return;
        }
        this.paths = values;
    }

    /**
     * Function to extract Epiphany history entries
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EpiphanyHistory`
     */
    public history(offset = 0, limit = 100): EpiphanyHistory[] {
        const query = `SELECT 
                        urls.id AS url_id, 
                        host, 
                        urls.url AS url, 
                        title, 
                        sync_id, 
                        visit_count, 
                        typed_count, 
                        last_visit_time, 
                        thumbnail_update_time, 
                        hidden_from_overview, 
                        visit_type, 
                        referring_visit 
                       FROM 
                        urls 
                       INNER JOIN visits ON urls.host = visits.url LIMIT ${limit} OFFSET ${offset}`;

        const results: EpiphanyHistory[] = [];
        let client: Unfold | undefined = undefined;
        if (this.unfold) {
            client = new Unfold();
        }
        for (const entry of this.paths) {
            const db = `${entry.full_path}/ephy-history.db`;
            const data = querySqlite(db, query);
            if (data instanceof ApplicationError) {
                continue;
            }

            for (const entry of data) {
                const value: EpiphanyHistory = {
                    url_id: entry["url_id"] as number,
                    host_id: entry["host"] as number,
                    visit_count: entry["visit_count"] as number,
                    typed_count: entry["typed_count"] as number,
                    last_visit_time: unixEpochToISO(entry["last_visit_time"] as bigint),
                    thumbnail_update_time: unixEpochToISO(entry["thumbnail_update_time"] as bigint),
                    hidden_from_overview: Boolean(entry["hidden_from_overview"] as number),
                    visit_type: this.visitType(entry["visit_type"] as number),
                    db_path: db,
                    target_url: entry["url"] as string | null ?? "",
                    title: entry["title"] as string | null ?? "",
                    referring_visit: entry["referring_visit"] as string | null,
                    sync_id: entry["sync_id"] as string | null,
                    message: entry["url"] as string | null ?? "",
                    datetime: unixEpochToISO(entry["last_visit_time"] as bigint),
                    timestamp_desc: "URL Visited",
                    artifact: "URL History",
                    data_type: "linux:gnome:epiphany:history:entry"
                };

                if (this.unfold && client !== undefined && value.target_url !== null) {
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
        const query = `SELECT * FROM moz_cookies LIMIT ${limit} OFFSET ${offset}`;
        const results: EpiphanyCookies[] = [];

        for (const entry of this.paths) {
            const db = `${entry.full_path}/cookies.sqlite`;
            const data = querySqlite(db, query);
            if (data instanceof ApplicationError) {
                continue;
            }

            for (const entry of data) {
                const value: EpiphanyCookies = {
                    id: entry["id"] as number,
                    name: entry["name"] as string | null,
                    value: entry["value"] as string | null,
                    host: entry["host"] as string | null,
                    path: entry["path"] as string | null,
                    expiry: "",
                    last_accessed: "",
                    is_secure: false,
                    is_http_only: false,
                    same_site: false,
                    db_path: db,
                    message: `Cookie for ${entry["host"] as string | null} | ${entry["name"] as string | null ?? ""}`,
                    datetime: "",
                    timestamp_desc: "Cookie Expires",
                    artifact: "Website Cookie",
                    data_type: "linux:browser:epiphany:cookie:entry"
                };

                if (entry["lastAccessed"] !== null) {
                    value.last_accessed = unixEpochToISO(entry["last_access"] as number);
                }
                if (entry["isSecure"] !== null) {
                    value.is_secure = Boolean(entry["is_secure"] as number);
                }
                if (entry["isHttpOnly"] !== null) {
                    value.is_http_only = Boolean(entry["is_http_only"] as number);
                }
                if (entry["sameSite"] !== null) {
                    value.same_site = Boolean(entry["same_site"] as number);
                }
                if (entry["expiry"] !== null) {
                    value.expiry = unixEpochToISO(entry["expiry"] as number);
                    value.datetime = value.expiry;
                }
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
        for (const entry of this.paths) {
            const xml_file = `${entry.full_path}/session_state.xml`;
            const xml_data = readXml(xml_file);
            if (xml_data instanceof EncodingError) {
                continue;
            }

            const entries = xml_data["session"] as Record<string, Record<string, unknown>[]>;
            if (entries["window"] === undefined) {
                continue;
            }
            for (const values of entries["window"]) {
                const embed = values["embed"] as Record<string, Record<string, string>>[];
                for (const value of embed) {
                    if (value["$"] === undefined) {
                        continue;
                    }
                    const session: EpiphanySessions = {
                        url: value["$"]["url"] ?? "",
                        title: value["$"]["title"] ?? "",
                        history: value["$"]["history"] ?? "",
                        session_path: xml_file,
                        message: `Session for ${value["$"]["url"] ?? ""}`,
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
     * Function to extract website permissions
     * @returns Array of `EpiphanyPermissions`
     */
    public permissions(): EpiphanyPermissions[] {
        const results: EpiphanyPermissions[] = [];
        for (const entry of this.paths) {
            const perm_file = `${entry.full_path}/permissions.ini`;
            let perm_data = readTextFile(perm_file);
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
                    file_path: perm_file,
                    message: "",
                    datetime: "1970-01-01T00:00:00.000Z",
                    timestamp_desc: "N/A",
                    artifact: "GNOME Epiphany Site Permission",
                    data_type: "linux:browser:epiphany:permissions:entry"
                };

                for (const line of lines) {
                    if (line.startsWith("[")) {
                        perms.url = line.replace("[org/gnome/epiphany/permissions/", "").replaceAll("/", ":").replace("http:", "http://").replace("https:", "https://").replace("]", "").replace(":0", "");
                        perms.message = perms.url;
                    } else if (line.includes("=")) {
                        const perm_line = line.replace("'", "");
                        const perm_types = perm_line.split("=");
                        if (perm_types.length > 1 && perm_types[0] !== undefined) {
                            perms.permissions[perm_types[0]] = perm_types.at(1) ?? "";
                        }
                    }
                }
                results.push(perms);
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
        for (const entry of this.paths) {
            const print_file = `${entry.full_path}/print-settings.ini`;
            const print_data = readTextFile(print_file);
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
                file_path: print_file,
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
     * Function to timeline all Epiphany artifacts. Similar to [Hindsight](https://github.com/obsidianforensics/hindsight)
     * @param output `Output` structure object. Format type should be either `JSON` or `JSONL`. `JSONL` is recommended
     */
    public retrospect(output: Output): void {
        let offset = 0;
        const limit = 100;

        // Get all history info
        while (true) {
            const entries = this.history(offset, limit);
            if (entries.length === 0) {
                break;
            }

            const status = dumpData(entries, "retrospect_epiphany_history", output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline Epiphany history: ${status}`);
            }
            offset += limit;
        }

        offset = 0;

        // Get all Cookies
        while (true) {
            const entries = this.cookies(offset, limit);
            if (entries.length === 0) {
                break;
            }

            const status = dumpData(entries, "retrospect_epiphany_cookies", output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline Epiphany cookies: ${status}`);
            }
            offset += limit;
        }

        const sessions = this.sessions();
        let status = dumpData(sessions, "retrospect_epiphany_sessions", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Epiphany sessions: ${status}`);
        }

        const permissions = this.permissions();
        status = dumpData(permissions, "retrospect_epiphany_permissions", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Epiphany permissions: ${status}`);
        }

        const print_page = this.lastPrint();
        status = dumpData(print_page, "retrospect_epiphany_lastprint", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Epiphany last print: ${status}`);
        }
    }


    /**
     * Determine the URL visit type
     * From: https://github.com/GNOME/epiphany/blob/main/lib/history/ephy-history-types.h#L28
     * @param visit Visit type number
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
     * Function to get all user paths to Epiphany data
     * @param alt_glob Alternative glob to directory containing Epiphany data
     * @returns Array of `EpiphanyProfiles` or `LinuxError`
     */
    private profiles(alt_glob?: string): EpiphanyProfiles[] | LinuxError {
        let pattern = "/home/*/.local/share/epiphany/";
        if (alt_glob !== undefined) {
            pattern = alt_glob;
        }
        const paths = glob(pattern);
        if (paths instanceof FileError) {
            return new LinuxError(`EPIPHANY`, `failed to find epiphany paths`);
        }

        const profiles: EpiphanyProfiles[] = [];
        for (const entry of paths) {
            const profile: EpiphanyProfiles = {
                full_path: entry.full_path,
                version: 0,
            };

            profiles.push(profile);
        }

        return profiles;
    }
}

/**
 * Function to test GNOME Epiphany parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the GNOME Epiphany parsing
 */
export function testEpiphany(): void {
    const test = "../../test_data/linux/epiphany";
    const client = new Epiphany(false, test);

    const history = client.history(0, 100);
    if (history.length !== 15) {
        throw `Got ${history.length} expected 15.......history ❌`;
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