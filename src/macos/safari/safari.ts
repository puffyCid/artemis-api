import { OutputManager, Output, Accessor, Unfold } from "../../../mod";
import { AccessorProtocol, EntryKind, FileHandle, SourceHandle } from "../../../types/filesystem/accessor";
import { Cookie, SafariBookmark, SafariDownloads, SafariExtensions, SafariFavicon, SafariHistory, SafariProfile } from "../../../types/macos/safari";
import { FileError } from "../../filesystem/errors";
import { DirectoryTree } from "../../filesystem/tree";
import { SystemError } from "../../system/error";
import { MacosError } from "../errors";
import { getPlist } from "../plist";
import { safariCookies } from "./cookies";
import { safariBookmarks, safariDownloads, safariExtensions } from "./plist";
import { safariFavicons, safariHistory } from "./sqlite";

/**
 * Class to parse Safari browser data
 */
export class Safari {
    private profiles: SafariProfile[] = [];
    private unfold: boolean;
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;


    /**
     * Construct a `Safari` object that can be used to parse browser data
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing Epiphany data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/safari.zip`
     * @param alt_path Optional alternative path to directory containing Safari data
     * @returns `Safari` instance class
     */
    constructor(unfold = false, protocol = AccessorProtocol.Host, source_path = "host:", alt_path?: string) {
        this.unfold = unfold;
        this.protocol = protocol;
        const pattern = alt_path ?? "/"

        this.source = this.accessor.openSource(source_path, this.protocol);
        if (this.source instanceof FileError) {
            return;
        }

        const matches = this.accessor.globfs(pattern, this.protocol);
        if (matches instanceof FileError) {
            return;
        }

        let version: number | undefined | MacosError = undefined;
        for (const entry of matches) {
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            if (entry.meta.filename === "System") {
                const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
                if (tree instanceof FileError) {
                    continue;
                }

                version = this.version(tree);
                if (version instanceof MacosError) {
                    continue;
                }
                continue;
            }

            if (entry.meta.filename === "Users") {
                const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
                if (tree instanceof FileError) {
                    continue;
                }
                const profile: SafariProfile = {
                    tree,
                    database: new Map(),
                    version: version instanceof MacosError ? 0  : version ?? 0
                };

                this.profiles.push(profile);
            }
        }
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

        const results: SafariHistory[] = [];
        const client = this.unfold ? new Unfold() : undefined;
        for (const entry of this.profiles) {
            safariHistory(entry, query, client, results, this.protocol);
        }

        return results;
    }

    /**
     * Extract Safari favicons
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `SafariFavicon`
     */
    public favicons(offset = 0, limit = 100): SafariFavicon[] {
        const query = `SELECT icon_info.uuid AS uuid,icon_info.url AS favicon_url, timestamp, page_url.url AS url FROM icon_info INNER JOIN page_url ON icon_info.uuid = page_url.uuid LIMIT ${limit} OFFSET ${offset}`;

        const results: SafariFavicon[] = [];
        for (const entry of this.profiles) {
            safariFavicons(entry, query, results, this.protocol);
        }

        return results;
    }

    /**
     * Extract Safari downloads
     * @returns Array of `SafariDownloads`
     */
    public downloads(): SafariDownloads[] {
        const results: SafariDownloads[] = [];
        for (const entry of this.profiles) {
            safariDownloads(entry, results, this.accessor);
        }

        return results;
    }

    /**
     * Extract Safari bookmarks
     * @returns Array of `SafariBookmark`
     */
    public bookmarks(): SafariBookmark[] {
        const results: SafariBookmark[] = [];
        for (const entry of this.profiles) {
            safariBookmarks(entry, results, this.accessor);
        }

        return results;
    }

    /**
     * Extract Safari cookies
     * @returns Array of `Cookie`
     */
    public cookies(): Cookie[] {
        const results: Cookie[] = [];
        for (const entry of this.profiles) {
            safariCookies(entry, results, this.accessor);
        }

        return results;
    }

    /**
     * Extract Safari extensions
     * @returns Array of `SafariExtensions`
     */
    public extensions(): SafariExtensions[] {
        const results: SafariExtensions[] = [];
        for (const entry of this.profiles) {
            safariExtensions(entry, results, this.accessor);
        }

        return results;
    }

    /**
     * Function to timeline all Safari artifacts. Similar to [Hindsight](https://github.com/obsidianforensics/hindsight)
     * @param output `Output` structure object. Format type should be either `JSON` or `JSONL`. `JSONL` is recommended
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
                entries.forEach(x => delete x["unfold"]);
            }
            const status = manager.write_artifact(entries, "retrospect_safari_history");
            if (status instanceof SystemError) {
                console.error(`Failed timeline Safari history: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.favicons(offset, limit);
            if (entries.length === 0) {
                break;
            }

            const status = manager.write_artifact(entries, "retrospect_safari_favicons");
            if (status instanceof SystemError) {
                console.error(`Failed timeline Safari favicons: ${status}`);
            }
            offset += limit;
        }

        const cooks = this.cookies();
        let status = manager.write_artifact(cooks, "retrospect_safari_cookies");
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari cookies: ${status}`);
        }


        const entries = this.bookmarks();
        status = manager.write_artifact(entries, "retrospect_safari_bookmarks");
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari bookmarks: ${status}`);
        }

        const downs = this.downloads();
        if (!this.unfold) {
            downs.forEach(x => delete x["unfold"]);
        }
        status = manager.write_artifact(downs, "retrospect_safari_downloads");
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari downloads: ${status}`);
        }

        const exts = this.extensions();
        status = manager.write_artifact(exts, "retrospect_safari_extensions");
        if (status instanceof SystemError) {
            console.error(`Failed timeline Safari extensions: ${status}`);
        }
        status = manager.finalize();
        if (status instanceof SystemError) {
            console.error(`Failed to finalize output for safari: ${status}`);
        }
    }

    /**
     * Determine Safari version
     * @param tree `DirectoryTree` object
     * @returns Safari version or `MacosError`
     */
    private version(tree: DirectoryTree): number | MacosError {
        const version_path = "Volumes/Preboot/Cryptexes/App/System/Applications/Safari.app/Contents/Info.plist";
        const version_plist = tree.file(version_path);
        if (version_plist instanceof FileError) {
            return new MacosError(`SAFARI`, `failed to find '${version_path}': ${version_plist}`);
        }

        if (version_plist.meta.kind !== EntryKind.File) {
            return new MacosError(`SAFARI`, `'${version_plist.meta.display_path}' not a file. Got '${version_plist.meta.kind}'`);
        }
        const bytes = this.accessor.readFileHandle(version_plist.handle as FileHandle);
        if (bytes instanceof FileError) {
            return new MacosError(`SAFARI`, `failed to read '${version_plist.meta.display_path}': ${bytes}`);
        }
        const info = getPlist(bytes);
        if (info instanceof MacosError) {
            return info;
        } else if (Array.isArray(info)) {
            return new MacosError(`SAFARI`, `got array for '${version_plist.meta.display_path}'`);
        }

        const version = info["CFBundleShortVersionString"] as string;
        return Number(version);
    }
}