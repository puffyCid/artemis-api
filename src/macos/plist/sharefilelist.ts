import { GlobInfo } from "../../../types/filesystem/globs";
import { BookmarkData } from "../../../types/macos/bookmark";
import { SingleRequirement } from "../../../types/macos/codesigning";
import { PlistDataType, SharedFilelist, SharedFilelistRaw, SharedFileType } from "../../../types/macos/plist/sharefilelist";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { parseBookmark } from "../bookmark";
import { parseRequirementBlob } from "../codesigning/blob";
import { SigningError } from "../codesigning/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

export function sharedFilelist(alt_path?: string): SharedFilelist[] | MacosError {
    let paths = [ "/Users/*/Library/Application Support/com.apple.sharedfilelist/*.sfl*", "/Users/*/Library/Application Support/com.apple.sharedfilelist/*/*.sfl*", ];
    if (alt_path !== undefined) {
        paths = [ alt_path ];
    }

    let values: SharedFilelist[] = [];
    for (const entry of paths) {
        const glob_paths = glob(entry);
        if (glob_paths instanceof FileError) {
            continue;
        }

        const results = parsePlistFiles(glob_paths);
        if (results instanceof MacosError) {
            continue;
        }
        values = values.concat(results);
    }
    return values;
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

        const raw_data = result as unknown as SharedFilelistRaw;
        if (raw_data.$objects.includes("Bookmark")) {
            console.log(entry.full_path);

            const bookmark_result = parseBookmarkEntry(raw_data);
            if (bookmark_result instanceof MacosError) {
                continue;
            }

            const shared_file_type = favoriteType(entry.full_path);
            let signing_info: SingleRequirement[] = [];
            if (raw_data.$objects.includes("com.apple.LSSharedFileList.AppIdentifier")) {
                const signing = parseCodesign(raw_data);
                if (signing instanceof MacosError) {
                    continue;
                }
                signing_info = signing;
            }

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
                if (signing_info.length !== 0) {
                    value = { ...value, ...signing_info[ 0 ] };

                }
                values.push(value);
            }

        } else if (raw_data.$objects.includes("com.apple.LSSharedFileList.AppIdentifier")) {
            const signing = parseCodesign(raw_data);
            if (signing instanceof MacosError) {
                continue;
            }

            const shared_file_type = favoriteType(entry.full_path);

            for (const sign of signing) {
                let value: SharedFilelist = {
                    evidence: entry.full_path,
                    shared_file_type,
                    message: `Finder SharedFile Application '${sign.identifier}'`,
                    datetime: '1970-01-01T00:00:00Z',
                    timestamp_desc: "None",
                    artifact: "Shared File List",
                    data_type: "macos:plist:sharedfilelist:entry",
                    plist_data_type: PlistDataType.CodeSign
                };
                value = { ...value, ...sign };
                values.push(value);
            }
        }
    }
    return values;
}

function parseBookmarkEntry(data: SharedFilelistRaw): BookmarkData[] | MacosError {
    const values: BookmarkData[] = [];
    for (const entry of data.$objects) {
        if (!Array.isArray(entry)) {
            continue;
        }

        if (entry.length < 100 || entry[ 0 ] !== 98) {
            continue;
        }
        const result = parseBookmark(new Uint8Array(entry));
        if (result instanceof MacosError) {
            console.log(entry);
            continue;
        }
        values.push(result);
    }

    return values;
}

function parseCodesign(data: SharedFilelistRaw): SingleRequirement[] | MacosError {
    const values: SingleRequirement[] = [];
    for (const entry of data.$objects) {
        if (!Array.isArray(entry)) {
            continue;
        }

        if (entry.length < 20 && entry[ 0 ] !== 250 && entry[ 1 ] !== 222 && entry[ 2 ] !== 12) {
            continue;
        }
        const result = parseRequirementBlob(new Uint8Array(entry));
        if (result instanceof SigningError) {
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
    } else if (path.includes("ApplicationRecentDocuments")) {
        return SharedFileType.ApplicationRecentFiles;
    } else {
        return SharedFileType.UnknownFavorite;
    }
}