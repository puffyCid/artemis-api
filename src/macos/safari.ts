import {
  RawSafariDownloads,
  RawSafariHistory,
  SafariDownloads,
  SafariHistory,
} from "../../types/macos/safari.d.ts";

/**
 * Get Safari history for all users on a endpoint
 * @returns Array of `SafariHistory` entries for all users
 */
export function getSafariUsersHistory(): SafariHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_users_history();

  const history: SafariHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Safari history from provided `History.db` file
 * @param path Full path to `History.db` file
 * @returns `RawSafariHistory` entries for file
 */
export function getSafariHistory(path: string): RawSafariHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_history(path);

  const history: RawSafariHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Safari downloads for all users on a endpoint
 * @returns Array of `SafariDownloads` entries for all users
 */
export function getSafariUsersDownloads(): SafariDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_users_downloads();

  const downloads: SafariDownloads[] = JSON.parse(data);
  return downloads;
}

/**
 * Get Safari downloads from provided `Downloads.plist` file
 * @param path Full path to `History` file
 * @returns `RawSafariDownloads` entries for file
 */
export function getSafariDownloads(path: string): RawSafariDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_downloads(path);

  const downloads: RawSafariDownloads[] = JSON.parse(data);
  return downloads;
}
