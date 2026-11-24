import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../../types/filesystem/accessor";
import { BookmarkData } from "../../../types/macos/bookmark";
import { SingleRequirement } from "../../../types/macos/codesigning";
import { PlistDataType, RecentFiles, SharedFilelistRaw, SharedFileType } from "../../../types/macos/plist/sharefilelist";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { parseBookmark } from "../bookmark";
import { parseRequirementBlob } from "../codesigning/blob";
import { SigningError } from "../codesigning/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to parse recent files on macOS
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to SharedFilelist file (SFL)
 * @returns Array of `RecentFiles` or `MacosError`
 */
export function recentFilesMacos(protocol = AccessorProtocol.Host, alt_path?: string[]): RecentFiles[] | MacosError {
    const paths = alt_path ?? ["/Users/*/Library/Application Support/com.apple.sharedfilelist/*.sfl*", "/Users/*/Library/Application Support/com.apple.sharedfilelist/*/*.sfl*",];
    const accessor = new Accessor();

    let values: RecentFiles[] = [];
    for (const path of paths) {
        const matches = accessor.globfs(path, protocol);
        if (matches instanceof FileError) {
            console.warn(`Could not glob ${path}: ${matches}`);
            continue;
        }

        const results = parsePlistFiles(matches, accessor);
        if (results instanceof MacosError) {
            continue;
        }
        values = values.concat(results);
    }

    return values;
}

/**
 * Function to read binary plist file (sfl file)
 * @param files Array of `GlobMatch`
 * @param accessor `Accessor` isntance to use
 * @returns Array of `RecentFiles` or `MacosError`
 */
function parsePlistFiles(files: GlobMatch[], accessor: Accessor): RecentFiles[] | MacosError {
    const values: RecentFiles[] = [];
    for (const entry of files) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        const bytes = accessor.readFileHandle(entry.handle as FileHandle);
        if (bytes instanceof FileError) {
            console.warn!(`Could not read '${entry.meta.display_path}': ${bytes}`);
            continue;
        }

        const result = getPlist(bytes);
        if (result instanceof MacosError) {
            console.warn!(`Could not parse '${entry.meta.display_path}': ${result}`);
            continue;
        }

        const raw_data = result as unknown as SharedFilelistRaw;
        if (raw_data.$objects.includes("Bookmark")) {
            const bookmark_result = parseBookmarkEntry(raw_data);
            if (bookmark_result instanceof MacosError) {
                continue;
            }

            const shared_file_type = favoriteType(entry.meta.full_path);
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
                const datetime = book_entry.created.length === 0 ? "1970-01-01T00:00:00Z" : book_entry.created;
                let value: RecentFiles = {
                    evidence: entry.meta.display_path,
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
                    value = { ...value, ...signing_info[0] };

                }
                values.push(value);
            }

        } else if (raw_data.$objects.includes("com.apple.LSSharedFileList.AppIdentifier")) {
            const signing = parseCodesign(raw_data);
            if (signing instanceof MacosError) {
                continue;
            }

            const shared_file_type = favoriteType(entry.meta.full_path);

            for (const sign of signing) {
                let value: RecentFiles = {
                    evidence: entry.meta.display_path,
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

        if (entry.length < 100 || entry[0] !== 98) {
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

        if (entry.length < 20 && entry[0] !== 250 && entry[1] !== 222 && entry[2] !== 12) {
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