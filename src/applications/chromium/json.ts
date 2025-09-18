import { ChromiumBookmarkChildren, ChromiumBookmarks, ChromiumProfiles } from "../../../types/applications/chromium";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";

/**
 * Get installed Chromium extensions
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of parsed extensions
 */
export function chromiumExtensions(paths: ChromiumProfiles[], platform: PlatformType): Record<string, unknown>[] {
    const hits: Record<string, unknown>[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/*/Extensions/*/*manifest.json`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\*\\Extensions\\*\\*\\manifest.json`;
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
            data[ "manifest_path" ] = ext_entry.full_path;
            data[ "browser_version" ] = path.version;

            hits.push(data);

        }
    }
    return hits;
}

/**
 * Get Chromium Preferences
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of Preferences
 */
export function chromiumPreferences(paths: ChromiumProfiles[], platform: PlatformType): Record<string, unknown>[] {
    const hits: Record<string, unknown>[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/*/Preferences`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Preferences`;
        }
        const pref_paths = glob(full_path);
        if (pref_paths instanceof FileError) {
            continue;
        }

        for (const entry of pref_paths) {
            const pref = readTextFile(entry.full_path);
            if (pref instanceof FileError) {
                console.warn(`could not read file ${entry.full_path}: ${pref}`);
                continue;
            }

            const data = JSON.parse(pref);
            data[ "preference_path" ] = entry.full_path;
            data[ "browser_version" ] = path.version;

            hits.push(data);
        }
    }
    return hits;
}

/**
 * Get Chromium Preferences
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of `ChromiumBookmarks`
 */
export function chromiumBookmarks(paths: ChromiumProfiles[], platform: PlatformType): ChromiumBookmarks[] {
    const hits: ChromiumBookmarks[] = [];

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

            const books: ChromiumBookmarks = {
                bookmark_bar: [],
                other: [],
                synced: [],
                path: entry.full_path,
                version: path.version,
            };
            const book_json = JSON.parse(results);
            const bar = book_json[ "roots" ][ "bookmark_bar" ][ "children" ] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined;
            books.bookmark_bar = getBookmarkChildren(bar);

            const other = book_json[ "roots" ][ "other" ][ "children" ] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined;
            books.other = getBookmarkChildren(other);

            const synced = book_json[ "roots" ][ "other" ][ "synced" ] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined;
            books.synced = getBookmarkChildren(synced);

            hits.push(books);
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
): ChromiumBookmarkChildren[] {
    let books: ChromiumBookmarkChildren[] = [];
    if (typeof book === "undefined") {
        return books;
    }
    const adjust_time = 1000000n;
    for (const entry of book) {
        if (typeof entry[ "children" ] === "undefined") {
            const book_entry: ChromiumBookmarkChildren = {
                date_added: unixEpochToISO(webkitToUnixEpoch(
                    Number(BigInt(entry[ "date_added" ] as string) / adjust_time),
                )),
                date_last_used: unixEpochToISO(webkitToUnixEpoch(
                    Number(BigInt(entry[ "date_last_used" ] as string) / adjust_time),
                )),
                guid: entry[ "guid" ] as string,
                id: Number(entry[ "id" ] as string),
                name: entry[ "name" ] as string,
                type: entry[ "type" ] as string,
                url: entry[ "url" ] as string,
                meta_info: entry[ "meta_info" ] as unknown as Record<string, string>,
            };
            books.push(book_entry);
            continue;
        }

        books = books.concat(
            getBookmarkChildren(
                entry[ "children" ] as
                | Record<string, string | Record<string, string>[] | undefined>[]
                | undefined,
            ),
        );
    }

    return books;
}
