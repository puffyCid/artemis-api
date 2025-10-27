import { BrowserType, ChromiumAutofill, ChromiumBookmarks, ChromiumCookies, ChromiumDips, ChromiumDownloads, ChromiumHistory, ChromiumLocalStorage, ChromiumLogins, ChromiumSession } from "../../types/applications/chromium";
import { PlatformType } from "../system/systeminfo";
import { Chromium } from "./chromium/cr";
import { chromiumBookmarks, chromiumExtensions, chromiumPreferences } from "./chromium/json";
import { chromiumLocalStorage } from "./chromium/level";
import { chromiumSessions } from "./chromium/sessions";
import { chromiumAutofill, chromiumCookies, chromiumDips, chromiumDownloads, chromiumHistory, chromiumLogins } from "./chromium/sqlite";

type ChromeHistory = ChromiumHistory;
type ChromeDownloads = ChromiumDownloads;
type ChromeCookies = ChromiumCookies;
type ChromeAutofill = ChromiumAutofill;
type ChromeBookmarks = ChromiumBookmarks;
type ChromeLogins = ChromiumLogins;
type ChromeDips = ChromiumDips;
type ChromeLocalStorage = ChromiumLocalStorage;
type ChromeSession = ChromiumSession;
/**
 * Class to extract Chrome browser information. Since Chrome is based on Chromium we can leverage the existing Chromium artifacts to parse Chrome info
 */
export class Chrome extends Chromium {

  /**
   * Construct a `Chrome` object that can be used to parse browser data
   * @param platform OS `PlatformType`
   * @param unfold Attempt to parse URLs. Default is `false`
   * @param alt_path Optional alternative path to directory contain Chrome data
   * @returns `Chrome` instance class
   */
  constructor (platform: PlatformType, unfold = false, alt_path?: string) {
    super(platform, unfold, BrowserType.CHROME, alt_path);
  }

  /**
   * Extract Chrome browser history.
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of browser history
   */
  public override history(offset = 0, limit = 100): ChromeHistory[] {
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
   * Extract Chrome browser downloads.
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of browser downloads
   */
  public override downloads(offset = 0, limit = 100): ChromeDownloads[] {
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
   * Extract Chrome browser cookies
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `ChromeCookies`
   */
  public override cookies(offset = 0, limit = 100): ChromeCookies[] {
    const query = `SELECT * FROM cookies LIMIT ${limit} OFFSET ${offset}`;
    return chromiumCookies(this.paths, this.platform, query);
  }

  /**
   * Get installed Chrome extensions
   * @returns Array of parsed extensions
   */
  public override extensions(): Record<string, unknown>[] {
    return chromiumExtensions(this.paths, this.platform);
  }

  /**
   * Get Chrome Preferences
   * @returns Array of Preferences for each user
   */
  public override preferences(): Record<string, unknown>[] {
    return chromiumPreferences(this.paths, this.platform);
  }

  /**
   * Function to parse Chrome AutoFill information. 
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `ChromeAutofill` 
   */
  public override autofill(offset = 0, limit = 100): ChromeAutofill[] {
    const query = `SELECT name, value, date_created, date_last_used, count, value_lower from autofill LIMIT ${limit} OFFSET ${offset}`;
    return chromiumAutofill(this.paths, this.platform, query);
  }

  /**
   * Get Chrome Bookmarks
   * @returns Array of `ChromeBookmarks` for each user
   */
  public override bookmarks(): ChromeBookmarks[] {
    return chromiumBookmarks(this.paths, this.platform);
  }

  /**
   * Get Chrome Local Storage
   * @returns Array of `ChromeLocalStorage` for each user
   */
  public override localStorage(): ChromeLocalStorage[] {
    return chromiumLocalStorage(this.paths, this.platform);
  }

  /**
   * Get Chrome Sessions
   * @returns Array of `ChromeSession` for each user
   */
  public override sessions(): ChromeSession[] {
    return chromiumSessions(this.paths, this.platform);
  }

  /**
   * Function to parse Chrome Login information. 
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `ChromeLogins` 
   */
  public override logins(offset = 0, limit = 100): ChromeLogins[] {
    const query = `SELECT * from logins LIMIT ${limit} OFFSET ${offset}`;
    return chromiumLogins(this.paths, this.platform, query);
  }

  /**
   * Function to parse Chrome Detect Incidental Party State (DIPS) information
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `ChromeDips` 
   */
  public override dips(offset = 0, limit = 100): ChromeDips[] {
    const query = `SELECT * from bounces LIMIT ${limit} OFFSET ${offset}`;
    return chromiumDips(this.paths, this.platform, query);
  }
}