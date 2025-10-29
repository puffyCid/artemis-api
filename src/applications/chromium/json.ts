import { BookmarkType, BrowserType, ChromiumBookmarks, ChromiumProfiles, Extension, } from "../../../types/applications/chromium";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile, stat } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";

/**
 * Get installed Chromium extensions
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of parsed extensions
 */
export function chromiumExtensions(paths: ChromiumProfiles[], platform: PlatformType): Extension[] {
    const hits: Extension[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/Extensions/*/*/manifest.json`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Extensions\\*\\*\\manifest.json`;
        }

        const ext_paths = glob(full_path);
        if (ext_paths instanceof FileError) {
            continue;
        }

        for (const ext_entry of ext_paths) {
            const extension = readTextFile(ext_entry.full_path);
            if (extension instanceof FileError) {
                console.warn(`could not read file ${path}: ${extension}`);
                continue;
            }

            const data = JSON.parse(extension);
            const ext_info: Extension = {
                version: path.version,
                message: `Extension: ${data["name"] ?? ""} | Version: ${data["version"] ?? ""}`,
                datetime: "1970-01-01T00:00:00.000Z",
                browser: path.browser,
                timestamp_desc: "Extension Created",
                artifact: "Browser Extension",
                data_type: `applications:${path.browser.toLowerCase()}:extensions:entry`,
                name: data["name"] ?? "",
                author: "",
                description: data["description"] ?? "",
                manifest: ext_entry.full_path,
                extension_version: data["version"] ?? "",
            };
            const meta = stat(ext_entry.full_path);
            if (!(meta instanceof FileError)) {
                ext_info.datetime = meta.created;
            }

            if (data["author"] === undefined) {
                hits.push(ext_info);
                continue;
            }

            if (data["author"]["email"] !== undefined) {
                ext_info.author = data["author"]["email"] ?? "";
            }

            hits.push(ext_info);
        }
    }
    return hits;
}


/**
 * Get Chromium Bookmarks
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of `ChromiumBookmarks`
 */
export function chromiumBookmarks(paths: ChromiumProfiles[], platform: PlatformType): ChromiumBookmarks[] {
    let hits: ChromiumBookmarks[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/*/Bookmarks`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Bookmarks`;
        }
        const book_paths = glob(full_path);
        if (book_paths instanceof FileError) {
            continue;
        }

        for (const entry of book_paths) {
            const results = readTextFile(entry.full_path);
            if (results instanceof FileError) {
                console.warn(`could not read file ${entry.full_path}: ${results}`);
                continue;
            }

            const book_json = JSON.parse(results);
            const bar = book_json["roots"]["bookmark_bar"]["children"] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined;
            hits = hits.concat(getBookmarkChildren(bar, entry.full_path, path.version, BookmarkType.Bar, path.browser));

            const other = book_json["roots"]["other"]["children"] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined;
            hits = hits.concat(getBookmarkChildren(other, entry.full_path, path.version, BookmarkType.Other, path.browser));

            const synced = book_json["roots"]["other"]["synced"] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined;
            hits = hits.concat(getBookmarkChildren(synced, entry.full_path, path.version, BookmarkType.Sync, path.browser));
        }
    }
    return hits;
}

/**
 * Function to try to get children bookmark info
 * @param book Parsed Bookmark children
 * @returns Extract array of `ChromiumBookmarkChildren`
 */
function getBookmarkChildren(
    book:
        | Record<string, string | Record<string, string>[] | undefined>[]
        | undefined,
    path: string,
    version: string,
    bookmark_type: BookmarkType,
    browser: BrowserType
): ChromiumBookmarks[] {
    let books: ChromiumBookmarks[] = [];
    if (typeof book === "undefined") {
        return books;
    }
    const adjust_time = 1000000n;
    for (const entry of book) {
        if (typeof entry["children"] === "undefined") {
            const book_entry: ChromiumBookmarks = {
                date_added: unixEpochToISO(webkitToUnixEpoch(
                    Number(BigInt(entry["date_added"] as string) / adjust_time)
                )),
                date_last_used: unixEpochToISO(webkitToUnixEpoch(
                    Number(BigInt(entry["date_last_used"] as string) / adjust_time)
                )),
                guid: entry["guid"] as string,
                id: Number(entry["id"] as string),
                name: entry["name"] as string,
                type: entry["type"] as string,
                url: entry["url"] as string,
                bookmark_type,
                path,
                version,
                message: `Bookmark - ${entry["name"] as string}`,
                datetime: unixEpochToISO(webkitToUnixEpoch(
                    Number(BigInt(entry["date_added"] as string) / adjust_time)
                )),
                timestamp_desc: "Bookmark Added",
                artifact: "Browser Bookmark",
                data_type: `applications:${browser.toLowerCase()}:bookmark:entry`,
                browser,
            };
            books.push(book_entry);
            continue;
        }

        books = books.concat(
            getBookmarkChildren(
                entry["children"] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined,
                path,
                version,
                bookmark_type,
                browser
            ),
        );
    }

    return books;
}
