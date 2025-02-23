import {
  RawSafariDownloads,
  RawSafariHistory,
  SafariDownloads,
  SafariHistory,
} from "../../types/macos/safari.ts";
import { MacosError } from "./errors.ts";

/**
 * Get Safari history for all users on a endpoint
 * @returns Array of `SafariHistory` entries for all users or `MacosError`
 */
export function getSafariUsersHistory(): SafariHistory[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_safari_users_history();

    return data;
  } catch (err) {
    return new MacosError("SAFARI", `failed to get users history: ${err}`);
  }
}

/**
 * Get Safari history from provided `History.db` file
 * @param path Full path to `History.db` file
 * @returns `RawSafariHistory` entries for file or `MacosError`
 */
export function getSafariHistory(
  path: string,
): RawSafariHistory[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_safari_history(path);

    return data;
  } catch (err) {
    return new MacosError(
      "SAFARI",
      `failed to get user ${path} history: ${err}`,
    );
  }
}

/**
 * Get Safari downloads for all users on a endpoint
 * @returns Array of `SafariDownloads` entries for all users or `MacosError`
 */
export function getSafariUsersDownloads(): SafariDownloads[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_safari_users_downloads();

    return data;
  } catch (err) {
    return new MacosError("SAFARI", `failed to get users downloads: ${err}`);
  }
}

/**
 * Get Safari downloads from provided `Downloads.plist` file
 * @param path Full path to `Downloads.plist` file
 * @returns `RawSafariDownloads` entries for file or `MacosError`
 */
export function getSafariDownloads(
  path: string,
): RawSafariDownloads[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_safari_downloads(path);

    return data;
  } catch (err) {
    return new MacosError(
      "SAFARI",
      `failed to get user ${path} downloads: ${err}`,
    );
  }
}
