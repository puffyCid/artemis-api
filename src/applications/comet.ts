import { BrowserType, ChromiumAutofill, ChromiumBookmarks, ChromiumCookies, ChromiumDips, ChromiumDownloads, ChromiumFavicons, ChromiumHistory, ChromiumLocalStorage, ChromiumLogins, ChromiumSession, ChromiumShortcuts, Extension, Preferences } from "../../types/applications/chromium";
import { PlatformType } from "../system/systeminfo";
import { Chromium } from "./chromium/cr";
import { chromiumBookmarks, chromiumExtensions } from "./chromium/json";
import { chromiumLocalStorage } from "./chromium/level";
import { chromiumPreferences } from "./chromium/preferences";
import { chromiumSessions } from "./chromium/sessions";
import { chromiumAutofill, chromiumCookies, chromiumDips, chromiumDownloads, chromiumFavicons, chromiumHistory, chromiumLogins, chromiumShortcuts } from "./chromium/sqlite";

type CometHistory = ChromiumHistory;
type CometDownloads = ChromiumDownloads;
type CometCookies = ChromiumCookies;
type CometAutofill = ChromiumAutofill;
type CometBookmarks = ChromiumBookmarks;
type CometLogins = ChromiumLogins;
type CometDips = ChromiumDips;
type CometLocalStorage = ChromiumLocalStorage;
type CometSession = ChromiumSession;
type CometFavicons = ChromiumFavicons;
type CometShortcuts = ChromiumShortcuts;

/**
 * Class to extract Comet browser information. Since Comet is based on Chromium we can leverage the existing Chromium artifacts to parse Comet info
 */
export class Comet extends Chromium {

  /**
   * Construct a `Comet` object that can be used to parse browser data
   * @param platform OS `PlatformType`
   * @param unfold Attempt to parse URLs. Default is `false`
   * @param alt_path Optional alternative path to directory contain Comet data
   * @returns `Comet` instance class
   */
  constructor(platform: PlatformType, unfold = false, alt_path?: string) {
    super(platform, unfold, BrowserType.COMET, alt_path);
  }

  /**
   * Extract Comet browser history.
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of browser history
   */
  public override history(offset = 0, limit = 100): CometHistory[] {
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
   * Extract Comet browser downloads.
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of browser downloads
   */
  public override downloads(offset = 0, limit = 100): CometDownloads[] {
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
   * Extract Comet browser cookies
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `CometCookies`
   */
  public override cookies(offset = 0, limit = 100): CometCookies[] {
    const query = `SELECT * FROM cookies LIMIT ${limit} OFFSET ${offset}`;
    return chromiumCookies(this.paths, this.platform, query);
  }

  /**
   * Get installed Comet extensions
   * @returns Array of parsed extensions
   */
  public override extensions(): Extension[] {
    return chromiumExtensions(this.paths, this.platform);
  }

  /**
   * Get Comet Preferences
   * @returns Array of `Preferences` for each user
   */
  public override preferences(): Preferences[] {
    return chromiumPreferences(this.paths, this.platform);
  }

  /**
   * Function to parse Comet AutoFill information. 
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `CometAutofill` 
   */
  public override autofill(offset = 0, limit = 100): CometAutofill[] {
    const query = `SELECT name, value, date_created, date_last_used, count, value_lower from autofill LIMIT ${limit} OFFSET ${offset}`;
    return chromiumAutofill(this.paths, this.platform, query);
  }

  /**
   * Get Comet Bookmarks
   * @returns Array of `CometBookmarks` for each user
   */
  public override bookmarks(): CometBookmarks[] {
    return chromiumBookmarks(this.paths, this.platform);
  }

  /**
    * Function to parse Comet Favicons information. 
    * @param [offset=0] Starting db offset. Default is zero
    * @param [limit=100] How many records to return. Default is 100
    * @returns Array of `CometFavicons` 
    */
  public override favicons(offset?: number, limit?: number): CometFavicons[] {
    const query = `SELECT url, last_updated, page_url FROM favicons JOIN favicon_bitmaps ON favicons.id = favicon_bitmaps.id JOIN icon_mapping ON icon_mapping.icon_id = favicons.id LIMIT ${limit} OFFSET ${offset}`;
    return chromiumFavicons(this.paths, this.platform, query);
  }

  /**
   * Function to parse Comet Shortcut information. 
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `CometShortcuts` 
   */
  public override shortcuts(offset = 0, limit = 100): CometShortcuts[] {
    const query = `SELECT id, text, fill_into_edit, url, contents, description, type, keyword, last_access_time FROM omni_box_shortcuts LIMIT ${limit} OFFSET ${offset}`;
    return chromiumShortcuts(this.paths, this.platform, query);
  }

  /**
   * Get Comet Local Storage
   * @returns Array of `CometLocalStorage` for each user
   */
  public override localStorage(): CometLocalStorage[] {
    return chromiumLocalStorage(this.paths, this.platform);
  }

  /**
   * Get Comet Sessions
   * @returns Array of `CometSession` for each user
   */
  public override sessions(): CometSession[] {
    return chromiumSessions(this.paths, this.platform);
  }

  /**
   * Function to parse Comet Login information. 
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `CometLogins` 
   */
  public override logins(offset = 0, limit = 100): CometLogins[] {
    const query = `SELECT * from logins LIMIT ${limit} OFFSET ${offset}`;
    return chromiumLogins(this.paths, this.platform, query);
  }

  /**
   * Function to parse Comet Detect Incidental Party State (DIPS) information
   * @param [offset=0] Starting db offset. Default is zero
   * @param [limit=100] How many records to return. Default is 100
   * @returns Array of `CometDips` 
   */
  public override dips(offset = 0, limit = 100): CometDips[] {
    const query = `SELECT * from bounces LIMIT ${limit} OFFSET ${offset}`;
    return chromiumDips(this.paths, this.platform, query);
  }
}