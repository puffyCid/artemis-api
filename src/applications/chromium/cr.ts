import { BrowserType, ChromiumAutofill, ChromiumBookmarks, ChromiumCookies, ChromiumDips, ChromiumDownloads, ChromiumFavicons, ChromiumHistory, ChromiumLocalStorage, ChromiumLogins, ChromiumProfiles, ChromiumSession, ChromiumShortcuts, Extension, Preferences } from "../../../types/applications/chromium";
import { getEnvValue } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile } from "../../filesystem/files";
import { SystemError } from "../../system/error";
import { dumpData, Output } from "../../system/output";
import { PlatformType } from "../../system/systeminfo";
import { ApplicationError, ErrorName } from "../errors";
import { chromiumBookmarks, chromiumExtensions } from "./json";
import { chromiumLocalStorage } from "./level";
import { chromiumPreferences } from "./preferences";
import { chromiumSessions } from "./sessions";
import { chromiumAutofill, chromiumCookies, chromiumDips, chromiumDownloads, chromiumFavicons, chromiumHistory, chromiumLogins, chromiumShortcuts } from "./sqlite";

/**
 * Class to extract Chromium browser information.  
 * Since many browsers are based on Chromium we can extend this class and reuse most of the parsers
 */
export class Chromium {
    protected paths: ChromiumProfiles[] = [];
    protected platform: PlatformType;
    protected unfold: boolean;
    protected browser: BrowserType;

    /**
     * Construct a `Chromium` object that can be used to parse browser data
     * @param platform OS `PlatformType`
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory contain Chromium data
     * @returns `Chromium` instance class
     */
    constructor(platform: PlatformType, unfold = false, browser = BrowserType.CHROMIUM, alt_path?: string) {
        this.platform = platform;
        this.unfold = unfold;
        this.browser = browser;

        let browser_error = new ApplicationError("CHROMIUM", "").name;
        switch (this.browser) {
            case BrowserType.CHROME: {
                browser_error = new ApplicationError("CHROME", "").name;
                break;
            }
            case BrowserType.EDGE: {
                browser_error = new ApplicationError("EDGE", "").name;
                break;
            }
            case BrowserType.CHROMIUM: {
                browser_error = new ApplicationError("CHROMIUM", "").name;
                break;
            }
            default: {
                break;
            }
        }

        if (alt_path === undefined) {
            const results = this.profiles(platform, browser_error);
            if (results instanceof ApplicationError) {
                return;
            }
            this.paths = results;
            return;
        }
        const browser_version = this.version(this.platform, alt_path, browser_error);
        if (browser_version instanceof ApplicationError) {
            return;
        }

        this.paths = [{
            full_path: alt_path,
            version: browser_version,
            browser: this.browser,
        }];
    }

    /**
     * Extract browser history
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumHistory`
     */
    public history(offset = 0, limit = 100): ChromiumHistory[] {
        const query = `SELECT 
                  urls.id AS id, 
                  urls.url AS url, 
                  title, 
                  visit_count, 
                  typed_count, 
                  last_visit_time, 
                  hidden, 
                  visits.id AS visits_id, 
                  from_visit, 
                  transition, 
                  segment_id, 
                  visit_duration, 
                  opener_visit 
                FROM 
                  urls 
                  JOIN visits ON urls.id = visits.url LIMIT ${limit} OFFSET ${offset}`;
        return chromiumHistory(this.paths, this.platform, this.unfold, query);
    }

    /**
     * Extract Chromium browser downloads.
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of browser history
     */
    public downloads(offset = 0, limit = 100): ChromiumDownloads[] {
        const query = `SELECT 
                      downloads.id AS downloads_id, 
                      guid, 
                      current_path, 
                      target_path, 
                      start_time, 
                      received_bytes, 
                      total_bytes, 
                      state, 
                      danger_type, 
                      interrupt_reason, 
                      hash, 
                      end_time, 
                      opened, 
                      last_access_time, 
                      transient, 
                      referrer, 
                      site_url, 
                      tab_url, 
                      tab_referrer_url, 
                      http_method, 
                      by_ext_id, 
                      by_ext_name, 
                      etag, 
                      last_modified, 
                      mime_type, 
                      original_mime_type, 
                      downloads_url_chains.id AS downloads_url_chain_id, 
                      chain_index, 
                      url 
                    FROM 
                      downloads 
                      JOIN downloads_url_chains ON downloads_url_chains.id = downloads.id LIMIT ${limit} OFFSET ${offset}`;
        return chromiumDownloads(this.paths, this.platform, query);
    }

    /**
     * Extract Chromium browser cookies
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumCookies`
     */
    public cookies(offset = 0, limit = 100): ChromiumCookies[] {
        const query = `SELECT * FROM cookies LIMIT ${limit} OFFSET ${offset}`;
        return chromiumCookies(this.paths, this.platform, query);
    }

    /**
     * Function to parse Chromium AutoFill information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumAutofill` 
     */
    public autofill(offset = 0, limit = 100): ChromiumAutofill[] {
        const query = `SELECT name, value, date_created, date_last_used, count, value_lower from autofill LIMIT ${limit} OFFSET ${offset}`;
        return chromiumAutofill(this.paths, this.platform, query);
    }

    /**
     * Function to parse Chromium Favicons information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumFavicons` 
     */
    public favicons(offset = 0, limit = 100): ChromiumFavicons[] {
        const query = `SELECT url, last_updated FROM favicons JOIN favicon_bitmaps ON favicons.id = favicon_bitmaps.id LIMIT ${limit} OFFSET ${offset}`;
        return chromiumFavicons(this.paths, this.platform, query);
    }

    /**
     * Function to parse Chromium Shortcut information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumShortcuts` 
     */
    public shortcuts(offset = 0, limit = 100): ChromiumShortcuts[] {
        const query = `SELECT id, text, fill_into_edit, url, contents, description, type, keyword, last_access_time FROM omni_box_shortcuts LIMIT ${limit} OFFSET ${offset}`;
        return chromiumShortcuts(this.paths, this.platform, query);
    }

    /**
     * Function to parse Chromium Login information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumLogins` 
     */
    public logins(offset = 0, limit = 100): ChromiumLogins[] {
        const query = `SELECT * from logins LIMIT ${limit} OFFSET ${offset}`;
        return chromiumLogins(this.paths, this.platform, query);
    }

    /**
     * Function to parse Chromium Detect Incidental Party State (DIPS) information
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumDips` 
     */
    public dips(offset = 0, limit = 100): ChromiumDips[] {
        const query = `SELECT * from bounces LIMIT ${limit} OFFSET ${offset}`;
        return chromiumDips(this.paths, this.platform, query);
    }

    /**
     * Get installed Chromium extensions
     * @returns Array of parsed extensions
     */
    public extensions(): Extension[] {
        return chromiumExtensions(this.paths, this.platform);
    }

    /**
     * Get Chromium Preferences
     * @returns Array of `Preferences` for each user
     */
    public preferences(): Preferences[] {
        return chromiumPreferences(this.paths, this.platform);
    }

    /**
     * Get Chromium Bookmarks
     * @returns Array of `ChromiumBookmarks` for each user
     */
    public bookmarks(): ChromiumBookmarks[] {
        return chromiumBookmarks(this.paths, this.platform);
    }

    /**
     * Get Chromium Local Storage
     * @returns Array of `ChromiumLocalStorage` for each user
     */
    public localStorage(): ChromiumLocalStorage[] {
        return chromiumLocalStorage(this.paths, this.platform);
    }

    /**
     * Get Chromium Sessions
     * @returns Array of `ChromiumSession` for each user
     */
    public sessions(): ChromiumSession[] {
        return chromiumSessions(this.paths, this.platform);
    }

    /**
     * Function to timeline all Chromium artifacts. Similar to [Hindsight](https://github.com/obsidianforensics/hindsight)
     * @param output `Output` structure object. Format type should be either `JSON` or `JSONL`. `JSONL` is recommended
     */
    public retrospect(output: Output): void {
        let offset = 0;
        const limit = 100;
        while (true) {
            const entries = this.history(offset, limit);
            if (entries.length === 0) {
                break;
            }
            if (!this.unfold) {
                entries.forEach(x => delete x["unfold"]);
            }
            const status = dumpData(entries, `retrospect_${this.browser}_history`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} history: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.cookies(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_cookies`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} cookies: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.downloads(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_downloads`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} downloads: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.autofill(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_autofill`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} autofill: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.logins(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_logins`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} logins: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.dips(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_dips`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} dips: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.favicons(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_favicons`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} favicons: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.shortcuts(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_${this.browser}_shortcuts`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline ${this.browser} shortcuts: ${status}`);
            }
            offset += limit;
        }

        const ext = this.extensions();
        let status = dumpData(ext, `retrospect_${this.browser}_extensions`, output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline ${this.browser} extensions: ${status}`);
        }

        const prefs = this.preferences();
        status = dumpData(prefs, `retrospect_${this.browser}_preferences`, output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline ${this.browser} preferences: ${status}`);
        }

        const books = this.bookmarks();
        status = dumpData(books, `retrospect_${this.browser}_bookmarks`, output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline ${this.browser} bookmarks: ${status}`);
        }

        const level = this.localStorage();
        status = dumpData(level, `retrospect_${this.browser}_localstorage`, output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline ${this.browser} localstorage: ${status}`);
        }

        const sess = this.sessions();
        status = dumpData(sess, `retrospect_${this.browser}_sessions`, output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline ${this.browser} sessions: ${status}`);
        }
    }

    /**
     * Get base path for all browser data
     * @param platform OS `PlatformType`
     * @returns Array of `ChromiumProfiles` or `ApplicationError`
     */
    private profiles(platform: PlatformType, browser: ErrorName): ChromiumProfiles[] | ApplicationError {
        const browser_path = this.browser_path(platform, this.browser, browser);
        if (browser_path instanceof ApplicationError) {
            return browser_path;
        }
        const browser_paths = glob(browser_path);
        if (browser_paths instanceof FileError) {
            return new ApplicationError(
                `${browser}`,
                `failed to glob ${platform} paths: ${browser_paths}`,
            );
        }

        const browser_profiles: ChromiumProfiles[] = [];
        for (const entry of browser_paths) {
            if (!entry.is_directory) {
                continue;
            }
            const browser_version = this.version(this.platform, entry.full_path, browser);
            if (browser_version instanceof ApplicationError) {
                continue;
            }

            const profile: ChromiumProfiles = {
                full_path: entry.full_path,
                version: browser_version,
                browser: this.browser,
            };

            browser_profiles.push(profile);
        }
        return browser_profiles;
    }

    /**
     * Function to determine browser version
     * @param platform OS `PlatformType`
     * @param path Path to base browser user profile
     * @returns Version number  or `ApplicationError`
     */
    private version(platform: PlatformType, path: string, browser: ErrorName): string | ApplicationError {
        let version_path = `${path}/Last Version`;
        if (platform === PlatformType.Windows) {
            version_path = `${path}\\Last Version`;
        }
        // Version is just a single line
        const text_data = readTextFile(version_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`${browser}`, `could not read ${version_path}: ${text_data}`);
        }

        return text_data;
    }

    /**
     * Function to identify base paths to Chromium based browsers
     * @param platform OS `PlatformType`
     * @param browser_type Chromium based `BrowserType`
     * @param browser_error `BrowserType` ErrorName
     * @returns Glob to base directory for all users associated with the browser  or `ApplicationError`
     */
    private browser_path(platform: PlatformType, browser_type: BrowserType, browser_error: ErrorName): string | ApplicationError {
        if (platform === PlatformType.Darwin) {
            if (browser_type === BrowserType.CHROME) {
                return "/Users/*/Library/Application Support/Google/Chrome";
            } else if (browser_type === BrowserType.EDGE) {
                return "/Users/*/Library/Application Support/Microsoft Edge";
            } else if (browser_type === BrowserType.CHROMIUM) {
                return "/Users/*/Library/Application Support/Chromium";
            }

            return new ApplicationError(`${browser_error}`, `Unsupported macOS browser! ${browser_type}`);
        }

        if (platform === PlatformType.Linux) {
            if (browser_type === BrowserType.CHROME) {
                return "/home/*/.config/Google/Chrome";
            } else if (browser_type === BrowserType.EDGE) {
                return "/home/*/.config/Microsoft Edge";
            } else if (browser_type === BrowserType.CHROMIUM) {
                return "/home/*/.config/chromium/";
            }

            return new ApplicationError(`${browser_error}`, `Unsupported Linux browser! ${browser_type}`);
        }

        if (platform === PlatformType.Windows) {
            let drive = getEnvValue("SystemDrive");
            if (drive === "") {
                drive = "C:";
            }
            if (browser_type === BrowserType.CHROME) {
                return `${drive}\\Users\\*\\AppData\\Local\\Google\\Chrome\\User Data`;
            } else if (browser_type === BrowserType.EDGE) {
                return `${drive}\\Users\\*\\AppData\\Local\\Microsoft\\Edge\\User Data`;
            } else if (browser_type === BrowserType.CHROMIUM) {
                return `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data`;
            }

            return new ApplicationError(`${browser_error}`, `Unsupported Windows browser! ${browser_type}`);
        }

        return new ApplicationError(`${browser_error}`, `Unsupported ${platform} browser! ${browser_type}`);

    }
}