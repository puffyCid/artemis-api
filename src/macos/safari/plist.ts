import { getPlist, PlatformType, stat, Unfold } from "../../../mod";
import { SafariBookmark, SafariDownloads, SafariExtensions, SafariPlistBookmark, SafariProfile } from "../../../types/macos/safari";
import { FileError } from "../../filesystem/errors";
import { UnfoldError } from "../../unfold/error";
import { parseBookmark } from "../bookmark";
import { MacosError } from "../errors";

/**
 * Parse all Safari downloads
 * @param paths Array of `SafariProfile`
 * @param platform `PlatformType` enum value
 * @param unfold Enable unfold parsing
 * @returns Array of `SafariBookmark`
 */
export function safariDownloads(paths: SafariProfile[], platform: PlatformType, unfold: boolean): SafariDownloads[] {
    const hits: SafariDownloads[] = [];

    let client: Unfold | undefined = undefined;
    if (unfold) {
        client = new Unfold();
    }

    for (const path of paths) {
        let full_path = `${path.full_path}/Downloads.plist`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Downloads.plist`;
        }

        const results = getPlist(full_path);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse plist full_path: ${results}`);
            continue;
        }
        if (Array.isArray(results)) {
            console.warn(`Got array plist full_path: ${results}`);
            continue;
        }
        if (!Array.isArray(results["DownloadHistory"])) {
            console.warn(`Did not get DownloadHistory array full_path: ${results}`);
            continue;
        }

        for (const entry of results["DownloadHistory"] as Record<string, unknown>[]) {
            const bookmark = parseBookmark(new Uint8Array(entry["DownloadEntryBookmarkBlob"] as number[]));
            if (bookmark instanceof MacosError) {
                console.warn(`Could not parse bookmark for full_path: ${results}`);
                continue;
            }
            const download: SafariDownloads = {
                source_url: entry["DownloadEntryURL"] as string,
                download_path: entry["DownloadEntryPath"] as string,
                sandbox_id: entry["DownloadEntrySandboxIdentifier"] as string,
                download_bytes: entry["DownloadEntryProgressTotalToLoad"] as number,
                download_id: entry["DownloadEntryIdentifier"] as string,
                download_entry_date: entry["DownloadEntryDateAddedKey"] as string,
                download_entry_finish: entry["DownloadEntryDateFinishedKey"] as string,
                path: bookmark.path,
                cnid_path: bookmark.cnid_path,
                created: bookmark.created,
                volume_path: bookmark.volume_path,
                volume_url: bookmark.volume_url,
                volume_name: bookmark.volume_name,
                volume_uuid: bookmark.volume_uuid,
                volume_size: bookmark.volume_size,
                volume_created: bookmark.volume_created,
                volume_flag: bookmark.volume_flags,
                volume_root: bookmark.volume_root,
                localized_name: bookmark.localized_name,
                security_extension_rw: bookmark.security_extension_rw,
                security_extension_ro: bookmark.security_extension_ro,
                target_flags: bookmark.target_flags,
                username: bookmark.username,
                folder_index: bookmark.folder_index,
                uid: bookmark.uid,
                creation_options: bookmark.creation_options,
                is_executable: bookmark.is_executable,
                file_ref_flag: bookmark.file_ref_flag,
                plist_path: path.full_path,
                unfold: undefined,
                version: path.version,
                message: entry["DownloadEntryURL"] as string,
                datetime: bookmark.created,
                timestamp_desc: "File Download Start",
                artifact: "File Download",
                data_type: "macos:safari:downloads:entry"
            };
            if (unfold && typeof client !== 'undefined') {
                const result = client.parseUrl(download.source_url);
                if (!(result instanceof UnfoldError)) {
                    download.unfold = result;
                }
            }
            hits.push(download);
        }
    }

    return hits;
}

/**
 * Parse all Safari bookmarks
 * @param paths Array of `SafariProfile`
 * @param platform `PlatformType` enum value
 * @returns Array of `SafariBookmark`
 */
export function safariBookmarks(paths: SafariProfile[], platform: PlatformType): SafariBookmark[] {
    const hits: SafariBookmark[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/Bookmarks.plist`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Bookmarks.plist`;
        }
        const meta = stat(full_path);
        if (meta instanceof FileError) {
            continue;
        }

        const results = getPlist(full_path);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse plist full_path: ${results}`);
            continue;
        }
        const bookmark_child = results as unknown as SafariPlistBookmark;
        //const book_children = results["Children"] as Record<string, string | Record<string, unknown>[] | undefined>[];
        for (const entry of bookmark_child.Children) {
            if (entry.Title === "BookmarksBar" && Array.isArray(entry.Children)) {
                for (const bar_child of entry.Children) {
                    const book: SafariBookmark = {
                        title: bar_child.URIDictionary?.title ?? "",
                        url: bar_child.URLString ?? "",
                        description: "",
                        path: full_path,
                        version: path.version,
                        message: `Bookmark URL: '${bar_child.URLString ?? ""}'`,
                        datetime: meta.created,
                        timestamp_desc: "Bookmark Created",
                        artifact: "Website Bookmark",
                        data_type: "macos:safari:bookmark:entry"
                    };
                    hits.push(book);
                }
                continue;
            }
            if (entry["URLString"] === undefined) {
                continue;
            }
            const book: SafariBookmark = {
                title: entry.URIDictionary?.title ?? "",
                url: entry.URLString ?? "",
                description: entry.previewText ?? "",
                path: full_path,
                version: path.version,
                message: `Bookmark URL: '${entry.URLString ?? ""}'`,
                datetime: meta.created,
                timestamp_desc: "Bookmark Created",
                artifact: "Website Bookmark",
                data_type: "macos:safari:bookmark:entry"
            };
            hits.push(book);
        }
    }
    console.log(JSON.stringify(hits));

    return hits;
}

/**
 * Get all Safari bookmarks
 * @param paths Array of `SafariProfile`
 * @param platform `PlatformType` enum value
 * @returns Array of `SafariExtensions`
 */
export function safariExtensions(paths: SafariProfile[], platform: PlatformType): SafariExtensions[] {
    const hits: SafariExtensions[] = [];

    for (const path of paths) {
        let full_path = `${path.container_path}/Library/Safari/WebExtensions/Extensions.plist`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Library\\Safari\\WebExtensions\\Extensions.plist`;
        }

        const results = getPlist(full_path);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse plist full_path: ${results}`);
            continue;
        }

        const exts = results as Record<string, string | boolean | string[]>;
        for (const key in exts) {
            const value: SafariExtensions = {
                name: key.split(" ").at(0) ?? "",
                key,
                team_id: (key.split(" ").at(1) ?? "").replace("(", "").replace(")", ""),
                accessible_origins: exts[key]["AccessibleOrigins"] as string[],
                added: exts[key]["AddedDate"].replace("Z", ".000Z"),
                enabled: exts[key]["Enabled"],
                permissions: exts[key]["Permissions"] as string[],
                path: full_path,
                version: path.version,
                message: key.split(" ").at(0) ?? "",
                datetime: exts[key]["AddedDate"].replace("Z", ".000Z"),
                timestamp_desc: "Extension Installed",
                artifact: "Browser Extension",
                data_type: "macos:safari:extension:entry"
            };
            hits.push(value);
        }

    }

    return hits;
}