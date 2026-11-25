import { Accessor, getPlist, } from "../../../mod";
import { SafariBookmark, SafariDownloads, SafariExtensions, SafariPlistBookmark, SafariProfile } from "../../../types/macos/safari";
import { FileError } from "../../filesystem/errors";
import { isFileEntry } from "../../filesystem/tree";
import { parseBookmark } from "../bookmark";
import { MacosError } from "../errors";

/**
 * Parse all Safari downloads
 * @param profile `SafariProfile` object
 * @param values Array of `SafariDownloads`
 * @param accessor `Accessor` instance
 * @returns Array of `SafariDownloads`
 */
export function safariDownloads(profile: SafariProfile, values: SafariDownloads[], accessor: Accessor): void {
    const target = "*/Library/Safari/Downloads.plist";
    const paths = profile.tree.glob(target);
    if (paths instanceof FileError) {
        return;
    }

    for (const path of paths) {
        if (!isFileEntry(path)) {
            continue;
        }

        const bytes = accessor.readFileHandle(path.handle);
        if (bytes instanceof FileError) {
            continue;
        }

        const results = getPlist(bytes);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse Safari downloads '${path.meta.display_path}': ${results}`);
            continue;
        }
        if (Array.isArray(results)) {
            console.warn(`Got array Safari downloads '${path.meta.display_path}'`);
            continue;
        }
        if (!Array.isArray(results["DownloadHistory"])) {

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
                plist_path: path.meta.full_path,
                unfold: undefined,
                version: profile.version,
                message: entry["DownloadEntryURL"] as string,
                datetime: bookmark.created,
                timestamp_desc: "File Download Start",
                artifact: "File Download",
                data_type: "macos:safari:downloads:entry",
                evidence: path.meta.display_path,
            };

            values.push(download);
        }
    }
}

/**
 * Parse all Safari bookmarks
 * @param profile `SafariProfile` object
 * @param values Array of `SafariBookmark`
 * @param accessor `Accessor` instance
 * @returns Array of `SafariBookmark`
 */
export function safariBookmarks(profile: SafariProfile, values: SafariBookmark[], accessor: Accessor): void {
    const target = "*/Library/Safari/Bookmarks.plist";
    const paths = profile.tree.glob(target);
    if (paths instanceof FileError) {
        return;
    }

    for (const path of paths) {
        if (!isFileEntry(path)) {
            continue;
        }

        const bytes = accessor.readFileHandle(path.handle);
        if (bytes instanceof FileError) {
            continue;
        }

        const results = getPlist(bytes);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse Safari bookmarks '${path.meta.display_path}': ${results}`);
            continue;
        }

        const meta = accessor.statHandle(path.handle);

        const bookmark_child = results as unknown as SafariPlistBookmark;
        for (const entry of bookmark_child.Children) {
            if (entry.Title === "BookmarksBar" && Array.isArray(entry.Children)) {
                for (const bar_child of entry.Children) {
                    const book: SafariBookmark = {
                        title: bar_child.URIDictionary?.title ?? "",
                        url: bar_child.URLString ?? "",
                        description: "",
                        path: path.meta.full_path,
                        browser_version: profile.version,
                        message: `Bookmark URL: '${bar_child.URLString ?? ""}'`,
                        datetime: meta instanceof FileError ? "1970-01-01T00:00:00.000Z" : meta.times.created,
                        timestamp_desc: "Bookmark Created",
                        artifact: "Website Bookmark",
                        data_type: "macos:safari:bookmark:entry",
                        evidence: path.meta.display_path,
                    };
                    values.push(book);
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
                path: path.meta.full_path,
                browser_version: profile.version,
                message: `Bookmark URL: '${entry.URLString ?? ""}'`,
                datetime: meta instanceof FileError ? "1970-01-01T00:00:00.000Z" : meta.times.created,
                timestamp_desc: "Bookmark Created",
                artifact: "Website Bookmark",
                data_type: "macos:safari:bookmark:entry",
                evidence: path.meta.display_path,
            };
            values.push(book);
        }
    }
}

/**
 * Get all Safari Extensions
 * @param profile `SafariProfile` object
 * @param values Array of `SafariExtensions`
 * @param accessor `Accessor` instance
 * @returns Array of `SafariExtensions`
 */
export function safariExtensions(profile: SafariProfile, values: SafariExtensions[], accessor: Accessor): void {
    const target = "*/Library/Containers/com.apple.Safari/Data/Library/Safari/WebExtensions/Extensions.plist";
    const paths = profile.tree.glob(target);
    if (paths instanceof FileError) {
        return;
    }

    for (const path of paths) {
        if (!isFileEntry(path)) {
            continue;
        }

        const bytes = accessor.readFileHandle(path.handle);
        if (bytes instanceof FileError) {
            continue;
        }

        const results = getPlist(bytes);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse Safari downloads '${path.meta.display_path}': ${results}`);
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
                path: path.meta.full_path,
                browser_version: profile.version,
                message: key.split(" ").at(0) ?? "",
                datetime: exts[key]["AddedDate"].replace("Z", ".000Z"),
                timestamp_desc: "Extension Installed",
                artifact: "Browser Extension",
                data_type: "macos:safari:extension:entry",
                evidence: path.meta.display_path,
            };
            values.push(value);
        }
    }
}