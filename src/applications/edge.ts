import { BrowserType, ChromiumAutofill, ChromiumBookmarks, ChromiumCookies, ChromiumDips, ChromiumDownloads, ChromiumFavicons, ChromiumHistory, ChromiumLocalStorage, ChromiumLogins, ChromiumSession, ChromiumShortcuts, Extension, Preferences } from "../../types/applications/chromium";
import { PlatformType } from "../system/systeminfo";
import { Chromium } from "./chromium/cr";
import { chromiumBookmarks, chromiumExtensions } from "./chromium/json";
import { chromiumLocalStorage } from "./chromium/level";
import { chromiumPreferences } from "./chromium/preferences";
import { chromiumSessions } from "./chromium/sessions";
import { chromiumAutofill, chromiumCookies, chromiumDips, chromiumDownloads, chromiumFavicons, chromiumHistory, chromiumLogins, chromiumShortcuts } from "./chromium/sqlite";

type EdgeHistory = ChromiumHistory;
type EdgeDownloads = ChromiumDownloads;
type EdgeCookies = ChromiumCookies;
type EdgeAutofill = ChromiumAutofill;
type EdgeBookmarks = ChromiumBookmarks;
type EdgeLogins = ChromiumLogins;
type EdgeDips = ChromiumDips;
type EdgeLocalStorage = ChromiumLocalStorage;
type EdgeSession = ChromiumSession;
type EdgeFavicons = ChromiumFavicons;
type EdgeShortcuts = ChromiumShortcuts;

/**
 * Class to extract Edge browser information. Since Edge is based on Chromium we can leverage the existing Chromium artifacts to parse Edge info
 */
export class Edge extends Chromium {

    /**
     * Construct a `Edge` object that can be used to parse browser data
     * @param platform OS `PlatformType`
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory contain Edge data
     * @returns `Edge` instance class
     */
    constructor(platform: PlatformType, unfold = false, alt_path?: string) {
        super(platform, unfold, BrowserType.EDGE, alt_path);
    }

    /**
     * Extract Edge browser history.
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of browser history
     */
    public override history(offset = 0, limit = 100): EdgeHistory[] {
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
        * Extract Edge browser downloads.
        * @param [offset=0] Starting db offset. Default is zero
        * @param [limit=100] How many records to return. Default is 100
        * @returns Array of browser downloads
        */
    public override downloads(offset = 0, limit = 100): EdgeDownloads[] {
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
     * Extract Edge browser cookies
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EdgeCookies`
     */
    public override cookies(offset = 0, limit = 100): EdgeCookies[] {
        const query = `SELECT * FROM cookies LIMIT ${limit} OFFSET ${offset}`;
        return chromiumCookies(this.paths, this.platform, query);
    }

    /**
     * Get installed Edge extensions
     * @returns Array of parsed extensions
     */
    public override extensions(): Extension[] {
        return chromiumExtensions(this.paths, this.platform);
    }

    /**
     * Get Edge Preferences
     * @returns Array of `Preferences` for each user
     */
    public override preferences(): Preferences[] {
        return chromiumPreferences(this.paths, this.platform);
    }

    /**
     * Function to parse Edge AutoFill information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EdgeAutofill` 
     */
    public override autofill(offset = 0, limit = 100): EdgeAutofill[] {
        const query = `SELECT name, value, date_created, date_last_used, count, value_lower from autofill LIMIT ${limit} OFFSET ${offset}`;
        return chromiumAutofill(this.paths, this.platform, query);
    }

    /**
     * Function to parse Edge Favicons information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EdgeFavicons` 
     */
    public override favicons(offset?: number, limit?: number): EdgeFavicons[] {
        const query = `SELECT url, last_updated, page_url FROM favicons JOIN favicon_bitmaps ON favicons.id = favicon_bitmaps.id JOIN icon_mapping ON icon_mapping.icon_id = favicons.id LIMIT ${limit} OFFSET ${offset}`;
        return chromiumFavicons(this.paths, this.platform, query);
    }

    /**
     * Function to parse Edge Shortcut information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EdgeShortcuts` 
     */
    public override shortcuts(offset = 0, limit = 100): EdgeShortcuts[] {
        const query = `SELECT id, text, fill_into_edit, url, contents, description, type, keyword, last_access_time FROM omni_box_shortcuts LIMIT ${limit} OFFSET ${offset}`;
        return chromiumShortcuts(this.paths, this.platform, query);
    }

    /**
     * Get Edge Bookmarks
     * @returns Array of `EdgeBookmarks` for each user
     */
    public override bookmarks(): EdgeBookmarks[] {
        return chromiumBookmarks(this.paths, this.platform);
    }

    /**
     * Get Edge Local Storage
     * @returns Array of `EdgeLocalStorage` for each user
     */
    public override localStorage(): EdgeLocalStorage[] {
        return chromiumLocalStorage(this.paths, this.platform);
    }

    /**
     * Get Edge Sessions
     * @returns Array of `EdgeSession` for each user
     */
    public override sessions(): EdgeSession[] {
        return chromiumSessions(this.paths, this.platform);
    }

    /**
     * Function to parse Edge Login information. 
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `EdgeLogins` 
     */
    public override logins(offset = 0, limit = 100): EdgeLogins[] {
        const query = `SELECT * from logins LIMIT ${limit} OFFSET ${offset}`;
        return chromiumLogins(this.paths, this.platform, query);
    }

    /**
     * Function to parse Edge Detect Incidental Party State (DIPS) information
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `ChromiumDips` 
     */
    public override dips(offset = 0, limit = 100): EdgeDips[] {
        const query = `SELECT * from bounces LIMIT ${limit} OFFSET ${offset}`;
        return chromiumDips(this.paths, this.platform, query);
    }
}