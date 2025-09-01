import { glob, readTextFile, stat } from "../../../../mod";
import { BookmarkLocation, FalkonBookmark, FalkonCookie, FalkonHistory, FalkonProfile } from "../../../../types/linux/kde/falkon";
import { FileError } from "../../../filesystem/errors";
import { PlatformType } from "../../../system/systeminfo";
import { LinuxError } from "../../errors";
import { falkonCookie, falkonHistory } from "./sqlite";

/**
 * Class to parse KDE Falkon browser data
 */
export class Falkon {
    protected paths: FalkonProfile[];
    protected platform: PlatformType;
    protected unfold: boolean;

    /**
     * Construct a `Falkon` object that can be used to parse browser data
     * @param platform OS `PlatformType`
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory contain Falkon data
     * @returns `Falkon` instance class
     */
    constructor(platform: PlatformType, unfold = false, alt_path?: string) {
        this.platform = platform;
        this.unfold = unfold;

        if (alt_path === undefined) {
            const results = this.profiles(platform);
            if (results instanceof LinuxError) {
                return;
            }
            this.paths = results;
            return;
        }
        const browser_version = this.version(this.platform, alt_path);
        if (browser_version instanceof LinuxError) {
            return;
        }

        this.paths = [{
            full_path: alt_path,
            version: browser_version,
        }];
    }

    /**
     * Extract browser history
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FalkonHistory`
     */
    public history(offset = 0, limit = 100): FalkonHistory[] {
        const query = `SELECT id, url, title, date, count FROM history LIMIT ${limit} OFFSET ${offset}`;
        return falkonHistory(this.paths, this.platform, this.unfold, query);
    }

    /**
     * Extract browser cookies
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FalkonCookie`
     */
    public cookie(offset = 0, limit = 100): FalkonCookie[] {
        const query = `SELECT 
                        (creation_utc / 1000000) AS creation_utc, 
                        host_key, 
                        top_frame_site_key, 
                        name, 
                        value, 
                        encrypted_value, 
                        path, 
                        (expires_utc / 1000000) AS expires_utc, 
                        is_secure, 
                        is_httponly, 
                        (last_access_utc / 1000000) AS last_access_utc, 
                        has_expires, 
                        is_persistent, 
                        priority, 
                        samesite, 
                        source_scheme, 
                        source_port, 
                        (last_update_utc / 1000000) AS last_update_utc, 
                        source_type, 
                        has_cross_site_ancestor 
                    FROM 
                        cookies 
                    LIMIT 
                        ${limit} OFFSET ${offset}`;
        return falkonCookie(this.paths, this.platform, query);
    }

    /**
     * Get browser bookmarks
     * @returns Array of `FalkonBookmark`
     */
    public bookmark(): FalkonBookmark[] {
        const hits: FalkonBookmark[] = [];
        for (const path of this.paths) {
            let book_path = `${path.full_path}/bookmarks.json`;
            if (this.platform === PlatformType.Windows) {
                book_path = `${path.full_path}\\bookmarks.json`;
            }

            const text = readTextFile(book_path);
            if (text instanceof FileError) {
                continue;
            }
            const json_data = JSON.parse(text);

            let created = "1970-01-01T00:00:00.000Z";
            const meta = stat(book_path);
            if (!(meta instanceof FileError)) {
                created = meta.created;
            }
            // Get bookmarks in bar
            for (const entry of json_data["roots"]["bookmark_bar"]["children"] as Record<string, string | number>[]) {
                const value: FalkonBookmark = {
                    bookmark_type: entry["type"] as string,
                    description: entry["description"] as string,
                    name: entry["description"] as string,
                    location: BookmarkLocation.Bar,
                    url: entry["description"] as string,
                    visit_count: entry["visit_count"] as number,
                    path: book_path,
                    version: path.version,
                    message: entry["description"] as string,
                    datetime: created,
                    timestamp_desc: "Falkon Bookmark File Created",
                    artifact: "KDE Falkon Bookmark",
                    data_type: "linux:browser:kde:bookmark:entry"
                };
                hits.push(value);
            }

            // Get bookmarks in menu folder
            for (const entry of json_data["roots"]["bookmark_menu"]["children"] as Record<string, string | number>[]) {
                const value: FalkonBookmark = {
                    bookmark_type: entry["type"] as string,
                    description: entry["description"] as string,
                    name: entry["name"] as string,
                    location: BookmarkLocation.Menu,
                    url: entry["url"] as string,
                    visit_count: entry["visit_count"] as number,
                    path: book_path,
                    version: path.version,
                    message: entry["url"] as string,
                    datetime: created,
                    timestamp_desc: "Falkon Bookmark File Created",
                    artifact: "KDE Falkon Bookmark",
                    data_type: "linux:browser:kde:bookmark:entry"
                };
                hits.push(value);
            }

            // Get bookmarks in other
            for (const entry of json_data["roots"]["other"]["children"] as Record<string, string | number>[]) {
                const value: FalkonBookmark = {
                    bookmark_type: entry["type"] as string,
                    description: entry["description"] as string,
                    name: entry["description"] as string,
                    location: BookmarkLocation.Other,
                    url: entry["description"] as string,
                    visit_count: entry["visit_count"] as number,
                    path: book_path,
                    version: path.version,
                    message: entry["description"] as string,
                    datetime: created,
                    timestamp_desc: "Falkon Bookmark File Created",
                    artifact: "KDE Falkon Bookmark",
                    data_type: "linux:browser:kde:bookmark:entry"
                };
                hits.push(value);
            }
        }

        return hits;

    }

    /**
     * Get base path for all browser data
     * @param platform OS `PlatformType`
     * @returns Array of `FalkonProfile` or `ApplicationError`
     */
    private profiles(platform: PlatformType): FalkonProfile[] | LinuxError {
        const path = "/home/*/.config/falkon/profiles/*";
        const user_paths = glob(path);
        if (user_paths instanceof FileError) {
            return new LinuxError(
                `FALKON`,
                `failed to glob ${platform} paths: ${user_paths}`,
            );
        }

        const profile_paths: FalkonProfile[] = [];
        for (const entry of user_paths) {
            if (!entry.is_directory) {
                continue;
            }
            const version = this.version(this.platform, entry.full_path);
            if (version instanceof LinuxError) {
                continue;
            }
            const value: FalkonProfile = {
                full_path: entry.full_path,
                version
            };
            profile_paths.push(value);
        }
        return profile_paths;
    }

    /**
     * Function to determine browser version
     * @param platform OS `PlatformType`
     * @param path Path to base browser user profile
     * @returns Version number  or `ApplicationError`
     */
    private version(platform: PlatformType, path: string): string | LinuxError {
        let version_path = `${path}/version`;
        if (platform === PlatformType.Windows) {
            version_path = `${path}\\version`;
        }

        // Version is just a single line
        const text_data = readTextFile(version_path);
        if (text_data instanceof FileError) {
            return new LinuxError(`FALKON`, `could not read ${version_path}: ${text_data}`);
        }

        return text_data;
    }
}