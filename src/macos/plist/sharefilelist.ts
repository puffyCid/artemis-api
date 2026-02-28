import { GlobInfo } from "../../../types/filesystem/globs";
import { BookmarkData } from "../../../types/macos/bookmark";
import { SingleRequirement } from "../../../types/macos/codesigning";
import { PlistDataType, RecentFiles, SharedFilelistRaw, SharedFileType } from "../../../types/macos/plist/sharefilelist";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { parseBookmark } from "../bookmark";
import { parseRequirementBlob } from "../codesigning/blob";
import { SigningError } from "../codesigning/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to parse recent files on macOS
 * @param alt_path Optional alternative path to SharedFilelist file (SFL)
 * @returns Array of `RecentFiles` or `MacosError`
 */
export function recentFiles(alt_path?: string): RecentFiles[] | MacosError {
    let paths = [ "/Users/*/Library/Application Support/com.apple.sharedfilelist/*.sfl*", "/Users/*/Library/Application Support/com.apple.sharedfilelist/*/*.sfl*", ];
    if (alt_path !== undefined) {
        paths = [ alt_path ];
    }

    let values: RecentFiles[] = [];
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

/**
 * Function to read binary plist file (sfl file)
 * @param files Array of `GlobInfo`
 * @returns Array of `RecentFiles` or `MacosError`
 */
function parsePlistFiles(files: GlobInfo[]): RecentFiles[] | MacosError {
    const values: RecentFiles[] = [];
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
                let message = book_entry.path.length === 0 ? book_entry.url_string : book_entry.path;
                if (message.length === 0 && book_entry.target_filename.length !== 0) {
                    message = book_entry.target_filename;
                } else if (message.length === 0) {
                    message = "Unknown target";
                }
                let datetime = book_entry.created.length === 0 ? "1970-01-01T00:00:00Z" : book_entry.created;
                let value: RecentFiles = {
                    evidence: entry.full_path,
                    shared_file_type,
                    message: `Recent File '${message}'`,
                    datetime,
                    timestamp_desc: "Target File Created",
                    data_type: "macos:plist:recentfile:entry",
                    plist_data_type: PlistDataType.Bookmark,
                    artifact: "Recent Files"
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
                let value: RecentFiles = {
                    evidence: entry.full_path,
                    shared_file_type,
                    message: `Recent File Application '${sign.identifier}'`,
                    datetime: '1970-01-01T00:00:00Z',
                    timestamp_desc: "None",
                    data_type: "macos:plist:recentfile:entry",
                    plist_data_type: PlistDataType.CodeSign,
                    artifact: "Recent Files"
                };
                value = { ...value, ...sign };
                values.push(value);
            }
        }
    }
    return values;
}

/**
 * Function to parse the bookmark data in the binary plist
 * @param data `SharedFilelistRaw` object
 * @returns Array of `BookmarkData` or `MacosError`
 */
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
            continue;
        }
        values.push(result);
    }

    return values;
}

/**
 * Function to parse application signing info related to recent files
 * @param data `SharedFilelistRaw` object
 * @returns Array of `SingleRequirement` or `MacosError`
 */
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

/**
 * Function to determine the recent file type
 * @param path Path to sharedfilelist (SFL)
 * @returns `SharedFileType` enum
 */
function favoriteType(path: string): SharedFileType {
    if (path.includes("FavoriteVolumes")) {
        return SharedFileType.VolumeFavorite;
    } else if (path.includes("FavoriteItems")) {
        return SharedFileType.FinderFavorite;
    } else if (path.includes("ApplicationRecentDocuments")) {
        return SharedFileType.ApplicationRecentFiles;
    } else if (path.includes("ProjectsItems")) {
        return SharedFileType.ProjectFavorite;
    } else if (path.includes("RecentApplications")) {
        return SharedFileType.RecentApplication;
    } else if (path.includes("RecentDocuments")) {
        return SharedFileType.RecentDocuments;
    } else {
        return SharedFileType.UnknownFavorite;
    }
}