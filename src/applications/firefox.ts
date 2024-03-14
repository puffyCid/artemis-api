import { FirefoxCookies } from "../../types/applications/firefox.ts";
import {
  FirefoxDownloads,
  FirefoxHistory,
  RawFirefoxDownloads,
  RawFirefoxHistory,
} from "../../types/applications/firefox.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/mod.ts";
import { PlatformType } from "../system/systeminfo.ts";
import { ApplicationError } from "./errors.ts";
import { querySqlite } from "./sqlite.ts";

/**
 * Get Firefox history for all users on a endpoint
 * @returns Array of `FirefoxHistory` entries for all users or `ApplicationError`
 */
export function getFirefoxUsersHistory(): FirefoxHistory[] | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_firefox_users_history();

    const history: FirefoxHistory[] = JSON.parse(data);
    return history;
  } catch (err) {
    return new ApplicationError(
      "FIREFOX",
      `failed to get user history: ${err}`,
    );
  }
}

/**
 * Get Firefox history from provided `places.sqlite` file
 * @param path Full path to `places.sqlite` file
 * @returns `RawFirefoxHistory` entries for file or `ApplicationError`
 */
export function getFirefoxHistory(
  path: string,
): RawFirefoxHistory[] | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_firefox_history(path);

    const history: RawFirefoxHistory[] = JSON.parse(data);
    return history;
  } catch (err) {
    return new ApplicationError(
      "FIREFOX",
      `failed to get history for ${path}: ${err}`,
    );
  }
}

/**
 * Get Firefox downloads for all users on a endpoint
 * @returns Array of `FirefoxDownloads` entries for all users or `ApplicationError`
 */
export function getFirefoxUsersDownloads():
  | FirefoxDownloads[]
  | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_firefox_users_downloads();

    const downloads: FirefoxDownloads[] = JSON.parse(data);
    return downloads;
  } catch (err) {
    return new ApplicationError(
      "FIREFOX",
      `failed to get user downloads: ${err}`,
    );
  }
}

/**
 * Get Firefox downloads from provided `places.sqlite` file
 * @param path Full path to `places.sqlite` file
 * @returns `RawFirefoxDownloads` entries for file or `ApplicationError`
 */
export function getFirefoxDownloads(
  path: string,
): RawFirefoxDownloads[] | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_firefox_downloads(path);

    const downloads: RawFirefoxDownloads[] = JSON.parse(data);
    return downloads;
  } catch (err) {
    return new ApplicationError(
      "FIREFOX",
      `failed to get downloads for ${path}: ${err}`,
    );
  }
}

/**
 * Get installed Firefox addons
 * @param platform Platform to parse Firefox addons
 * @returns Array of `Record<string, unknown>` or `ApplicationError`
 */
export function firefoxAddons(
  platform: PlatformType,
): Record<string, unknown>[] | ApplicationError {
  const paths = firefoxPaths(platform, "extensions.json");
  if (paths instanceof ApplicationError) {
    return paths;
  }

  let extensions: Record<string, object>[] = [];
  for (const path of paths) {
    const extension = readTextFile(path.full_path);
    if (extension instanceof FileError) {
      console.warn(`failed to read file ${path}: ${extension}`);
      continue;
    }

    const data = JSON.parse(extension)["addons"];
    data["addons_path"] = path.full_path;

    extensions = extensions.concat(data);
  }

  return extensions;
}

/**
 * Function to parse Firefox cookies. Can provide an alternative path to cookie database, otherwise will use default path
 * @param platform OS platform to query for Firefox cookies
 * @param path Alternative path to Firefox cookie database
 * @returns Array of `FirefoxCookies` or `ApplicationError`
 */
export function getFirefoxCookies(
  platform: PlatformType,
  path?: string,
): FirefoxCookies[] | ApplicationError {
  let paths = [];

  if (path != undefined) {
    paths = [path];
  } else {
    const glob_paths = firefoxPaths(platform, "cookies.sqlite");
    if (glob_paths instanceof ApplicationError) {
      return glob_paths;
    }

    for (const glob_path of glob_paths) {
      paths.push(glob_path.full_path);
    }
  }

  const query = "select * from moz_cookies";

  let cookies: FirefoxCookies[] = [];
  for (const path of paths) {
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
      console.warn(`Could not query cookies for ${path}: ${results}`);
      continue;
    }

    cookies = cookies.concat(getCookies(results, path));
  }
  return cookies;
}

/**
 * Function to extract cookie information from database
 * @param data Array of sqlite data from cookie database
 * @param path Path to the cookie database file
 * @returns Array of `FirefoxCookies`
 */
function getCookies(
  data: Record<string, unknown>[],
  path: string,
): FirefoxCookies[] {
  const cookie_array = [];

  const adjust_time: bigint = 1000000n;
  for (const entry of data) {
    const cookie_entry: FirefoxCookies = {
      id: entry["id"] as number,
      origin_attributes: entry["originAttributes"] as string,
      in_browser_element: !!(entry["inBrowserElement"] as number),
      same_site: !!(entry["sameSite"] as number),
      raw_same_site: !!(entry["rawSameSite"] as number),
      scheme_map: entry["rawSameSite"] as number,
      name: entry["name"] as string | undefined,
      value: entry["value"] as string | undefined,
      path: entry["path"] as string | undefined,
      expiry: entry["expiry"] as number | undefined,
      is_secure: !!(entry["isSecure"] as number | undefined),
      is_http_only: !!(entry["isSecure"] as number | undefined),
      host: entry["host"] as string | undefined,
      db_path: path,
    };

    if (entry["lastAccessed"] != undefined) {
      cookie_entry.last_accessed = Number(
        BigInt(entry["lastAccessed"] as bigint) / adjust_time,
      );
    }

    if (entry["creationTime"] != undefined) {
      cookie_entry.creation_time = Number(
        BigInt(entry["creationTime"] as bigint) / adjust_time,
      );
    }

    cookie_array.push(cookie_entry);
  }
  return cookie_array;
}

/**
 * Function to get paths associated with firefox
 * @param platform OS platform types
 * @param file Firefox related file to get
 * @returns Array of `GlobInfo` or `ApplicationError`
 */
function firefoxPaths(
  platform: PlatformType,
  file: string,
): GlobInfo[] | ApplicationError {
  let paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        `/Users/*/Library/Application Support/Firefox/Profiles/*/${file}`,
      );
      if (mac_paths instanceof FileError) {
        return new ApplicationError(
          "FIREFOX",
          `failed to glob macos paths: ${mac_paths}`,
        );
      }
      paths = mac_paths;
      break;
    }
    case PlatformType.Windows: {
      let drive = getEnvValue("SystemDrive");
      if (drive === "") {
        drive = "C";
      }
      const win_paths = glob(
        `${drive}\\Users\\*\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\*\\${file}`,
      );
      if (win_paths instanceof FileError) {
        return new ApplicationError(
          "FIREFOX",
          `failed to glob windows paths: ${win_paths}`,
        );
      }
      paths = win_paths;
      break;
    }
    case PlatformType.Linux:
    default: {
      return [];
    }
  }
  return paths;
}
