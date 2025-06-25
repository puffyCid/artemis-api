import { BrowserType, ChromiumCookies, ChromiumDownloads, ChromiumHistory } from "../../types/applications/chromium";
import { PlatformType } from "../system/systeminfo";
import { Chromium } from "./chromium/cr";
import { chromiumCookies, chromiumDownloads, chromiumHistory } from "./chromium/sqlite";
import { ApplicationError } from "./errors";

/**
 * Class to extract Edge browser information. Since Edge is based on Chromium we can leverage the existing Chromium artifacts to parse Edge info
 */
export class Edge extends Chromium {

    /**
     * Construct a `Edge` object that can be used to parse browser data
     * @param platform OS `PlatformType`
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory contain FireFox data
     * @returns `Edge` instance class
     */
    constructor(platform: PlatformType, unfold = false, alt_path?: string) {
        super(platform, unfold, BrowserType.EDGE, alt_path);
    }

    /**
     * Extract Edge browser history. Overrides the Chromium history method
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of browser history
     */
    public override history(offset = 0, limit = 100): ChromiumHistory[] {
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
        * Extract Edge browser downloads. Overrides the Chromium downloads method
        * @param [offset=0] Starting db offset. Default is zero
        * @param [limit=100] How many records to return. Default is 100
        * @returns Array of browser history
        */
    public override downloads(offset = 0, limit = 100): ChromiumDownloads[]{
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
     * @returns Array of `ChromiumCookies`
     */
    public override cookies(offset = 0, limit = 100): ChromiumCookies[] {
        const query = `SELECT * FROM cookies LIMIT ${limit} OFFSET ${offset}`;
        return chromiumCookies(this.paths, this.platform, query);
    }
}