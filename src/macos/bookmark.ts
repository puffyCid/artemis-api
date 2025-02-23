import { BookmarkData } from "../../types/macos/bookmark.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse macOS Bookmark data. They are similar to Windows Shortcut files. Bookmarks replace Alias links in macOS
 * @param data Bookmark bytes
 * @returns `BookmarkData` or `MacosError`
 */
export function parseBookmark(data: Uint8Array): BookmarkData | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const results = js_bookmark(data);
    return results;
  } catch (err) {
    return new MacosError("BOOKMARK", `failed to parse bookmark: ${err}`);
  }
}
