import { OutputManager, Output, readTextFile } from "../../../../mod";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../../../types/filesystem/accessor";
import { BookmarkLocation, FalkonBookmark, FalkonCookie, FalkonHistory, FalkonProfile } from "../../../../types/linux/kde/falkon";
import { FileError } from "../../../filesystem/errors";
import { SystemError } from "../../../system/error";
import { LinuxError } from "../../errors";
import { falkonCookie, falkonHistory } from "./sqlite";
import { Accessor } from "../../../filesystem/accessor";
import { DirectoryTree } from "../../../filesystem/tree";


/**
 * Class to parse KDE Falkon browser data
 */
export class Falkon {
    protected profiles: FalkonProfile[] = [];
    protected unfold: boolean;
    protected protocol: AccessorProtocol = AccessorProtocol.Host;
    protected accessor = new Accessor();
    protected source: SourceHandle | FileError;

    /**
     * Create a new `Falkon` instance to parse data
     * @param unfold Enable `Unfold` parsing. Default is false
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing Falkon data. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing Falkon data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
     * @param alt_path Provide an optional glob to an alternative Falkon directory
     */
    constructor (unfold = false, protocol = AccessorProtocol.Host, source_path = "host:", alt_path?: string) {
        this.unfold = unfold;
        this.protocol = protocol;
        const pattern = alt_path ?? "/home/*/.config/falkon/profiles/*";

        this.source = this.accessor.openSource(source_path, this.protocol);
        if (this.source instanceof FileError) {
            return;
        }

        const matches = this.accessor.sourceGlobfs(this.source, pattern);
        if (matches instanceof FileError) {
            return;
        }

        for (const entry of matches) {
            // We want the base directory for Falkon artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const version = this.version(tree);
            if (version instanceof LinuxError) {
                return;
            }

            const profile: FalkonProfile = {
                tree,
                database: new Map(),
                version,
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Extract browser history
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FalkonHistory`
     */
    public history(offset = 0, limit = 100): FalkonHistory[] {
        const sql = `SELECT id, url, title, date, count FROM history ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
        return falkonHistory(sql, this.unfold, this.protocol, this.profiles);
    }

    /**
     * Extract browser cookies
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FalkonCookie`
     */
    public cookie(offset = 0, limit = 100): FalkonCookie[] {
        const sql = `SELECT 
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
        return falkonCookie(sql, this.protocol, this.profiles);
    }

    /**
     * Get browser bookmarks
     * @returns Array of `FalkonBookmark`
     */
    public bookmark(): FalkonBookmark[] {
        const hits: FalkonBookmark[] = [];
        for (const profile of this.profiles) {
            const entry = profile.tree.file("bookmarks.json");
            if (entry instanceof FileError) {
                continue;
            }

            const text = readTextFile(entry.handle);
            if (text instanceof FileError) {
                continue;
            }

            let created = "1970-01-01T00:00:00.000Z";
            const stat = this.accessor.statHandle(entry.handle);
            if (!(stat instanceof FileError)) {
                created = stat.times.created;
            }

            const json_data = JSON.parse(text);

            // Get bookmarks in bar
            for (const data of json_data[ "roots" ][ "bookmark_bar" ][ "children" ] as Record<string, string | number>[]) {
                const value: FalkonBookmark = {
                    bookmark_type: data[ "type" ] as string,
                    description: data[ "description" ] as string,
                    name: data[ "description" ] as string,
                    location: BookmarkLocation.Bar,
                    url: data[ "description" ] as string,
                    visit_count: data[ "visit_count" ] as number,
                    evidence: entry.meta.display_path,
                    version: profile.version,
                    message: data[ "description" ] as string,
                    datetime: created,
                    timestamp_desc: "Falkon Bookmark File Created",
                    artifact: "KDE Falkon Bookmark",
                    data_type: "linux:browser:kde:bookmark:entry"
                };
                hits.push(value);
            }

            // Get bookmarks in menu folder
            for (const data of json_data[ "roots" ][ "bookmark_menu" ][ "children" ] as Record<string, string | number>[]) {
                const value: FalkonBookmark = {
                    bookmark_type: data[ "type" ] as string,
                    description: data[ "description" ] as string,
                    name: data[ "name" ] as string,
                    location: BookmarkLocation.Menu,
                    url: data[ "url" ] as string,
                    visit_count: data[ "visit_count" ] as number,
                    evidence: entry.meta.display_path,
                    version: profile.version,
                    message: data[ "url" ] as string,
                    datetime: created,
                    timestamp_desc: "Falkon Bookmark File Created",
                    artifact: "KDE Falkon Bookmark",
                    data_type: "linux:browser:kde:bookmark:entry"
                };
                hits.push(value);
            }

            // Get bookmarks in other
            for (const data of json_data[ "roots" ][ "other" ][ "children" ] as Record<string, string | number>[]) {
                const value: FalkonBookmark = {
                    bookmark_type: data[ "type" ] as string,
                    description: data[ "description" ] as string,
                    name: data[ "description" ] as string,
                    location: BookmarkLocation.Other,
                    url: data[ "description" ] as string,
                    visit_count: data[ "visit_count" ] as number,
                    evidence: entry.meta.display_path,
                    version: profile.version,
                    message: data[ "description" ] as string,
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
     * Function to timeline all Falkon artifacts. Similar to [Hindsight](https://github.com/obsidianforensics/hindsight)
     * @param format `Output` structure object. Format type should be either `JSON` or `JSONL`. `JSONL` is recommended
     */
    public retrospect(format: Output): void {
        let offset = 0;
        const limit = 100;
        const manager = new OutputManager(format);
        while (true) {
            const entries = this.history(offset, limit);
            if (entries.length === 0) {
                break;
            }
            if (!this.unfold) {
                entries.forEach(x => delete x[ "unfold" ]);
            }
            const status = manager.write_artifact(entries, "retrospect_falkon_history");
            if (status instanceof SystemError) {
                console.error(`Failed timeline Falkon history: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.cookie(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = manager.write_artifact(entries, "retrospect_falkon_cookies");
            if (status instanceof SystemError) {
                console.error(`Failed timeline Falkon cookies: ${status}`);
            }
            offset += limit;
        }

        const entries = this.bookmark();
        let status = manager.write_artifact(entries, "retrospect_falkon_bookmarks");
        if (status instanceof SystemError) {
            console.error(`Failed timeline Falkon bookmarks: ${status}`);
        }

        status = manager.finalize();
        if (status instanceof SystemError) {
            console.error(`Failed to finalize output for falkon: ${status}`);
        }

    }

    /**
     * Function to determine browser version
     * @param platform OS `PlatformType`
     * @param path Path to base browser user profile
     * @returns Version number  or `ApplicationError`
     */
    private version(tree: DirectoryTree): string | LinuxError {
        const version_handle = tree.file("version");
        if (version_handle instanceof FileError) {
            return new LinuxError(`FALKON`, `could not find version file: ${version_handle}`);
        }

        // Version is just a single line
        const text_data = readTextFile(version_handle.handle);
        if (text_data instanceof FileError) {
            return new LinuxError(`FALKON`, `could not read ${version_handle.meta.display_path}: ${text_data}`);
        }

        return text_data;
    }
}