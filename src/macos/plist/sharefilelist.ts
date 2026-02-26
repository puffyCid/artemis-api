import { GlobInfo } from "../../../types/filesystem/globs";
import { BookmarkData } from "../../../types/macos/bookmark";
import { PlistDataType, SharedFilelist, SharedFilelistRaw, SharedFileType } from "../../../types/macos/plist/sharefilelist";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { parseBookmark } from "../bookmark";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

export function sharedFilelist(alt_path?: string): SharedFilelist[] | MacosError {
    let paths = [ "/Users/*/Library/Application Support/com.apple.sharedfilelist/*.sfl*", "/Users/*/Library/Application Support/com.apple.sharedfilelist/*/*.sfl*", ];
    if (alt_path !== undefined) {
        paths = [ alt_path ];
    }

    for (const entry of paths) {
        const glob_paths = glob(entry);
        if (glob_paths instanceof FileError) {
            continue;
        }

        const results = parsePlistFiles(glob_paths);
        if (results instanceof MacosError) {
            continue;
        }
        console.log(JSON.stringify(results));
    }
    return [];
}

function parsePlistFiles(files: GlobInfo[]): SharedFilelist[] | MacosError {
    const values: SharedFilelist[] = [];
    for (const entry of files) {
        if (!entry.is_file) {
            continue;
        }

        const result = getPlist(entry.full_path);
        if (result instanceof MacosError) {
            continue;
        }
        console.log(entry.full_path);

        const raw_data = result as unknown as SharedFilelistRaw;
        if (raw_data.$objects.includes("Bookmark")) {
            const bookmark_result = parseBookmarkEntry(raw_data);
            if (bookmark_result instanceof MacosError) {
                continue;
            }

            const shared_file_type = favoriteType(entry.full_path);

            for (const book_entry of bookmark_result) {
                let value: SharedFilelist = {
                    evidence: entry.full_path,
                    shared_file_type,
                    message: `Finder Favorite '${book_entry.path}'`,
                    datetime: book_entry.created,
                    timestamp_desc: "Favorite Created",
                    artifact: "Shared File List",
                    data_type: "macos:plist:sharedfilelist:entry",
                    plist_data_type: PlistDataType.Bookmark
                };
                value = { ...value, ...book_entry };
                values.push(value);
            }
        }
        console.log(entry.full_path);
        console.log(JSON.stringify(result));
    }
    return values;
}

function parseBookmarkEntry(data: SharedFilelistRaw): BookmarkData[] | MacosError {
    const values: BookmarkData[] = [];
    for (const entry of data.$objects) {
        if (!Array.isArray(entry)) {
            continue;
        }

        if (entry.length < 100) {
            continue;
        }
        const result = parseBookmark(new Uint8Array(entry));
        if (result instanceof MacosError) {
            continue;
        }
        values.push(result);
    }

    return values;
}

function favoriteType(path: string): SharedFileType {
    if (path.includes("FavoriteVolumes")) {
        return SharedFileType.VolumeFavorite;
    } else if (path.includes("FavoriteItems")) {
        return SharedFileType.FinderFavorite;
    } else {
        return SharedFileType.UnknownFavorite;
    }
}