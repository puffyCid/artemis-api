import { PlatformType } from "../../mod.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob } from "../filesystem/mod.ts";
import { parseBookmark } from "../macos/bookmark.ts";
import { BookmarkData as OfficeRecentFilesMacos } from "../../types/macos/bookmark.ts";
import { MacosError } from "../macos/errors.ts";
import { getPlist } from "../macos/plist.ts";
import { ApplicationError } from "./errors.ts";

export function officeMruFiles(
  platform: PlatformType.Darwin | PlatformType.Windows,
  alt_file?: string,
): OfficeRecentFilesMacos[] | ApplicationError {
  switch (platform) {
    case PlatformType.Darwin:
      return officeBookmarks(alt_file);
    case PlatformType.Windows:
      return [];
  }
}

/**
 * Function to parse Office bookmark data on macOS
 * @param alt_file Optional alternative path to Office plist file
 * @returns Array of `OfficeRecentFilesMacos` or `OfficeRecentFilesWindows` or `ApplicationError`
 */
function officeBookmarks(
  alt_file?: string,
): OfficeRecentFilesMacos[] | ApplicationError {
  const paths = [];
  if (alt_file != undefined) {
    paths.push(alt_file);
  } else {
    const glob_office =
      "/Users/*/Library/Containers/com.microsoft*/Data/Library/Preferences/com.microsoft.*.securebookmarks.plist";
    const glob_paths = glob(glob_office);
    if (glob_paths instanceof FileError) {
      return new ApplicationError(
        `OFFICE`,
        `failed to glob office paths for macOS: ${glob_paths}`,
      );
    }
    for (const entry of glob_paths) {
      paths.push(entry.full_path);
    }
  }

  const office_files = [];
  for (const entry of paths) {
    const plist_data = getPlist(entry);
    if (plist_data instanceof MacosError) {
      console.warn(`failed to parse ${entry}: ${plist_data}`);
      continue;
    }

    if (plist_data instanceof Uint8Array || Array.isArray(plist_data)) {
      continue;
    }

    for (const value in plist_data) {
      const bookmark_values = plist_data[value] as Record<
        string,
        number[] | string
      >;
      const data = bookmark_values["kBookmarkDataKey"];
      if (typeof data === "string") {
        console.warn(`got string for kBookmarkDataKey? It should be bytes`);
        continue;
      }
      const book_data = Uint8Array.from(data);

      const book = parseBookmark(book_data);
      if (book instanceof MacosError) {
        console.warn(`failed to parse MRU bookmark data: ${book}`);
        continue;
      }
      office_files.push(book);
    }
  }
  return office_files;
}
