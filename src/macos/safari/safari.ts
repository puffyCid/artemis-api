import { dumpData, Output, PlatformType } from "../../../mod";
import { Cookie, SafariBookmark, SafariDownloads, SafariExtensions, SafariFavicon, SafariHistory, SafariProfile } from "../../../types/macos/safari";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { SystemError } from "../../system/error";
import { MacosError } from "../errors";
import { getPlist } from "../plist";
import { safariCookies } from "./cookies";
import { safariBookmarks, safariDownloads, safariExtensions } from "./plist";
import { safariFavicons, safariHistory } from "./sqlite";

export class Safari {
    private paths: SafariProfile[];
    private unfold: boolean;
    private platform: PlatformType;


    /**
     * Construct a `Safari` object that can be used to parse browser data
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory containing Safari data
     * @returns `Safari` instance class
     */
    constructor(platform: PlatformType, unfold = false, alt_path?: string) {
        this.unfold = unfold;
        this.platform = platform;
        if (alt_path === undefined) {
            const results = this.profiles();
            if (results instanceof MacosError) {
                return;
            }
            this.paths = results;
            return;
        }

        this.paths = [{
            full_path: alt_path,
            container_path: alt_path,
            version: 0
        }];

    }

    /**
     * Extract Safari history
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `SafarihHistory`
     */
    public history(offset = 0, limit = 100): SafariHistory[] {
        const query = `SELECT history_items.id AS history_item_id,
                            url,
                            domain_expansion,
                            visit_count,
                            daily_visit_counts,
                            weekly_visit_counts,
                            autocomplete_triggers,
                            should_recompute_derived_visit_counts,
                            visit_count_score,
                            status_code,
                            Cast(visit_time AS INT) AS visit_time,
                            title,
                            load_successful,
                            http_non_get,
                            synthesized,
                            redirect_destination,
                            origin,
                            generation,
                            attributes,
                            score
                        FROM history_items
                            JOIN history_visits
                                ON history_visits.history_item = history_items.id LIMIT ${limit} OFFSET ${offset}`;
        return safariHistory(this.paths, query, this.platform, this.unfold);
    }

    /**
     * Extract Safari favicons
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `SafariFavicon`
     */
    public favicons(offset = 0, limit = 100): SafariFavicon[] {
        const query = `SELECT icon_info.uuid AS uuid,icon_info.url AS favicon_url, timestamp, page_url.url AS url FROM icon_info INNER JOIN page_url ON icon_info.uuid = page_url.uuid LIMIT ${limit} OFFSET ${offset}`;
        return safariFavicons(this.paths, query, this.platform);
    }

    /**
     * Extract Safari downloads
     * @returns Array of `SafariDownloads`
     */
    public downloads(): SafariDownloads[] {
        return safariDownloads(this.paths, this.platform, this.unfold);
    }

    /**
     * Extract Safari bookmarks
     * @returns Array of `SafariBookmark`
     */
    public bookmarks(): SafariBookmark[] {
        return safariBookmarks(this.paths, this.platform);
    }

    /**
     * Extract Safari cookies
     * @returns Array of `Cookie`
     */
    public cookies(): Cookie[] {
        return safariCookies(this.paths, this.platform);
    }

    /**
     * Extract Safari extensions
     * @returns Array of `SafariExtensions`
     */
    public extensions(): SafariExtensions[] {
        return safariExtensions(this.paths, this.platform);
    }

    /**
     * Function to timeline all Safari artifacts. Similar to [Hindsight](https://github.com/obsidianforensics/hindsight)
     * @param output `Output` structure object. Format type should be either `JSON` or `JSONL`. `JSONL` is recommended
     */
    public retrospect(output: Output): void {
        let offset = 0;
        const limit = 100;

        while (true) {
            let entries = this.history(offset, limit);
            if (entries.length === 0) {
                break;
            }
            if (!this.unfold) {
                entries.forEach(x => delete x["unfold"]);
            }
            const status = dumpData(entries, "retrospect_safari_history", output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline Safari history: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            let entries = this.favicons(offset, limit);
            if (entries.length === 0) {
                break;
            }

            const status = dumpData(entries, "retrospect_safari_favicons", output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline Safari favicons: ${status}`);
            }
            offset += limit;
        }
        offset = 0;

        const cooks = this.cookies();
        let status = dumpData(cooks, "retrospect_safari_cookies", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari cookies: ${status}`);
        }


        let entries = this.bookmarks();
        status = dumpData(entries, "retrospect_safari_bookmarks", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari bookmarks: ${status}`);
        }

        let downs = this.downloads();
        if (!this.unfold) {
            entries.forEach(x => delete x["unfold"]);
        }
        status = dumpData(downs, "retrospect_safari_downloads", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari downloads: ${status}`);
        }

        let exts = this.extensions();
        status = dumpData(exts, "retrospect_safari_extensions", output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari extensions: ${status}`);
        }
    }

    /**
     * Get base path for all Safari users
     * @returns Array of `SafariProfile` or `MacosError`
     */
    private profiles(): SafariProfile[] | MacosError {
        const paths = glob("/Users/*/Library/Safari/");
        if (paths instanceof FileError) {
            return new MacosError(`SAFARI`, `could not glob Safari profiles`);
        }
        const profiles: SafariProfile[] = [];
        for (const path of paths) {
            if (!path.is_directory) {
                continue;
            }

            const version = this.version();
            if (version instanceof MacosError) {
                continue;
            }
            const profile: SafariProfile = {
                full_path: path.full_path,
                container_path: path.full_path.replace("Library/Safari", "Library/Containers/com.apple.Safari/Data"),
                version
            };

            profiles.push(profile);
        }

        return profiles;
    }

    /**
     * Determine Safari version
     * @returns Safari version or `MacosError`
     */
    private version(): number | MacosError {
        const version_plist = "/Applications/Safari.app/Contents/Info.plist";
        const info = getPlist(version_plist);
        if (info instanceof MacosError) {
            return info;
        } else if (Array.isArray(info)) {
            return new MacosError(`SAFARI`, `got array for Safari Info.plist`);
        }

        const version = info["CFBundleShortVersionString"] as string;
        return Number(version);
    }
}