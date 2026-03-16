import { PlatformType } from "../../system/systeminfo";
import { FirefoxBookmark, FirefoxBookmarkRaw, FirefoxProfiles, FirefoxAddons } from "../../../types/applications/firefox";
import { glob, readFile, readTextFile } from "../../filesystem/files";
import { FileError } from "../../filesystem/errors";
import { Endian, nomUnsignedEightBytes, nomUnsignedFourBytes } from "../../nom/helpers";
import { NomError } from "../../nom/error";
import { decompress_lz4 } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { extractUtf8String } from "../../encoding/strings";
import { unixEpochToISO } from "../../time/conversion";

/**
 * Get installed Firefox bookmarks
 * @param paths Array of `FirefoxProfiles`
 * @param platform Platform to parse Firefox addons
 * @returns Array of `FirefoxBookmark`
 */
export function firefoxBookmark(paths: FirefoxProfiles[], platform: PlatformType): FirefoxBookmark[] {
    let bookmark: FirefoxBookmark[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/bookmarkbackups/bookmarks*`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\bookmarkbackups\\bookmarks*`;
        }

        const book_files = glob(full_path);
        if (book_files instanceof FileError) {
            continue;
        }

        for (const entry of book_files) {
            if (!entry.is_file) {
                continue;
            }
            const bytes = readFile(entry.full_path);
            if (bytes instanceof FileError) {
                continue;
            }
            const decom_bytes = parseBookmark(bytes);
            if (decom_bytes instanceof NomError || decom_bytes instanceof CompressionError) {
                continue;
            }
            const text = extractUtf8String(decom_bytes);
            const values = extractBookmark(text, path.version, path.full_path, entry.full_path);
            bookmark = bookmark.concat(values);
        }
    }
    return bookmark;
}

function parseBookmark(bytes: Uint8Array): Uint8Array | NomError | CompressionError {
    const remaining = nomUnsignedEightBytes(bytes, Endian.Le);
    if (remaining instanceof NomError) {
        return remaining;
    }

    const decom_size = nomUnsignedFourBytes(remaining.remaining, Endian.Le);
    if (decom_size instanceof NomError) {
        return decom_size;
    }

    const decom_bytes = decompress_lz4(decom_size.remaining, decom_size.value, new Uint8Array());
    if (decom_bytes instanceof CompressionError) {
        return decom_bytes
    }

    return decom_bytes;
}

function extractBookmark(data: string, version: string, path: string, evidence: string): FirefoxBookmark[] {
    const book = JSON.parse(data) as FirefoxBookmarkRaw;
    let values: FirefoxBookmark[] = [];
    if (Array.isArray(book.children)) {
        values = extractChildren(book.children, version, path, evidence)
    }

    return values;
}

function extractChildren(data: FirefoxBookmarkRaw[], version: string, path: string, evidence: string): FirefoxBookmark[] {
    let values: FirefoxBookmark[] = [];
    for (const child of data) {
        if (child.typeCode === 1) {
            const value: FirefoxBookmark = {
                timestamp_desc: "Bookmark Created",
                artifact: "Browser Bookmark",
                data_type: "application:firefox:bookmark:entry",
                datetime: unixEpochToISO(child.dateAdded ?? 0),
                message: `Bookmark for '${child.uri ?? "Unknown"}'`,
                version,
                path,
                evidence,
                added: unixEpochToISO(child.dateAdded ?? 0),
                last_modified: unixEpochToISO(child.lastModified ?? 0),
                title: child.title,
                id: child.id,
                guid: child.guid,
                icon: child.iconUri ?? "Unknown",
                uri: child.uri ?? "Unknown"
            };
            values.push(value);
        }


        if (Array.isArray(child.children)) {
            const childs = extractChildren(child.children, version, path, evidence);
            values = values.concat(childs);
        }
    }

    return values;
}


/**
 * Get installed Firefox addons
 * @param paths Array of `FirefoxProfiles`
 * @param platform Platform to parse Firefox addons
 * @returns Array of `FirefoxAddons`
 */
export function firefoxAddons(
    paths: FirefoxProfiles[],
    platform: PlatformType,
): FirefoxAddons[] {
    const extensions: FirefoxAddons[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/extensions.json`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\extensions.json`;
        }

        const extension = readTextFile(full_path);
        if (extension instanceof FileError) {
            console.warn(`failed to read file ${full_path}: ${extension}`);
            continue;
        }

        const data = JSON.parse(extension)["addons"];
        for (const entry of data) {
            const value: FirefoxAddons = {
                installed: unixEpochToISO(entry["installDate"] ?? 0),
                updated: unixEpochToISO(entry["updateDate"] ?? 0),
                active: entry["active"] ?? false,
                visible: entry["visible"] ?? false,
                author: entry["id"] ?? "",
                addon_version: entry["version"] ?? "",
                path: entry["path"] ?? "",
                evidence: full_path,
                message: `Addon ${entry["defaultLocale"]["name"] ?? ""} installed`,
                datetime: unixEpochToISO(entry["installDate"] ?? 0),
                name: entry["defaultLocale"]["name"] ?? "",
                description: entry["defaultLocale"]["description"] ?? "",
                creator: entry["defaultLocale"]["creator"] ?? "",
                timestamp_desc: "Extension Installed",
                artifact: "Browser Extension",
                data_type: "application:firefox:extension:entry",
                version: path.version,
            };
            extensions.push(value);
        }
    }

    return extensions;
}