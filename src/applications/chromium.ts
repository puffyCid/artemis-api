import {
  ChromiumCookies,
  ChromiumDownloads,
  ChromiumHistory,
  RawChromiumDownloads,
  RawChromiumHistory,
} from "../../types/applications/chromium.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/files.ts";
import { PlatformType } from "../system/systeminfo.ts";
import { webkitToUnixEpoch } from "../time/conversion.ts";
import { ApplicationError } from "./errors.ts";
import { querySqlite } from "./sqlite.ts";

/**
 * Get Chromium history for all users on a endpoint
 * @returns Array of `ChromiumHistory` entries for all users or `ApplicationError`
 */
export function getChromiumUsersHistory():
  | ChromiumHistory[]
  | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_chromium_users_history();

    const history: ChromiumHistory[] = JSON.parse(data);
    return history;
  } catch (err) {
    return new ApplicationError(
      "CHROMIUM",
      `failed to get user history ${err}`,
    );
  }
}

/**
 * Get Chromium history from provided `History` file
 * @param path Full path to `History` file
 * @returns `RawChromiumHistory` entries for file or `ApplicationError`
 */
export function getChromiumHistory(
  path: string,
): RawChromiumHistory[] | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_chromium_history(path);
    const history: RawChromiumHistory[] = JSON.parse(data);
    return history;
  } catch (err) {
    return new ApplicationError(
      "CHROMIUM",
      `failed to get history for ${path}: ${err}`,
    );
  }
}

/**
 * Get Chromium downloads for all users on a endpoint
 * @returns Array of `ChromiumDownloads` entries for all users or `ApplicationError`
 */
export function getChromiumUsersDownloads():
  | ChromiumDownloads[]
  | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_chromium_users_downloads();

    const downloads: ChromiumDownloads[] = JSON.parse(data);
    return downloads;
  } catch (err) {
    return new ApplicationError(
      "CHROMIUM",
      `failed to get user downloads ${err}`,
    );
  }
}

/**
 * Get Chromium downloads from provided `History` file
 * @param path Full path to `History` file
 * @returns `RawChromiumDownloads` entries for file or `ApplicationError`
 */
export function getChromiumDownloads(
  path: string,
): RawChromiumDownloads[] | ApplicationError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_chromium_downloads(path);

    const downloads: RawChromiumDownloads[] = JSON.parse(data);
    return downloads;
  } catch (err) {
    return new ApplicationError(
      "CHROMIUM",
      `failed to get downloads for ${path}: ${err}`,
    );
  }
}

/**
 * Fucntion to parse Chromium cookies. Can alternative path to cookie database, otherwise will use default path
 * @param platform OS platform to query for Chromium cookies
 * @param path Alternative path to Chromium cookie database
 * @returns Array of `ChromiumCookies` or `ApplicationError`
 */
export function getChromiumCookies(
  platform: PlatformType,
  path?: string,
): ChromiumCookies[] | ApplicationError {
  let glob_paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Chromium/*/Network/Cookies",
      );
      if (mac_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob macos extension paths: ${mac_paths}`,
        );
      }
      glob_paths = mac_paths;
      break;
    }
    case PlatformType.Windows: {
      let drive = getEnvValue("SystemDrive");
      if (drive === "") {
        drive = "C";
      }
      const win_paths = glob(
        `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data\\*\\Network\\Cookies`,
      );
      if (win_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob windows extension paths: ${win_paths}`,
        );
      }
      glob_paths = win_paths;
      break;
    }
    case PlatformType.Linux:
    default: {
      return [];
    }
  }

  let paths = [];
  if (path != undefined) {
    paths = [path];
  } else {
    for (const glob_path of glob_paths) {
      paths.push(glob_path.full_path);
    }
  }

  const query = "select * from cookies";
  let cookies: ChromiumCookies[] = [];
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
 * @returns Array of `ChromiumCookies`
 */
function getCookies(
  data: Record<string, unknown>[],
  path: string,
): ChromiumCookies[] {
  const cookie_array = [];
  const adjust_time = 1000000n;

  for (const entry of data) {
    const cookie_entry: ChromiumCookies = {
      creation: webkitToUnixEpoch(
        Number(BigInt(entry["creation_utc"] as bigint) / adjust_time),
      ),
      host_key: entry["host_key"] as string,
      top_frame_site_key: entry["top_frame_site_key"] as string,
      name: entry["name"] as string,
      value: entry["value"] as string,
      encrypted_value: entry["encrypted_value"] as string,
      path: entry["path"] as string,
      expires: webkitToUnixEpoch(
        Number(BigInt(entry["expires_utc"] as bigint) / adjust_time),
      ),
      is_secure: !!(entry["is_secure"] as number),
      is_httponly: !!(entry["is_httponly"] as number),
      last_access: webkitToUnixEpoch(
        Number(BigInt(entry["last_access_utc"] as bigint) / adjust_time),
      ),
      has_expires: !!(entry["has_expires"] as number),
      is_persistent: !!(entry["is_persistent"] as number),
      priority: entry["priority"] as number,
      samesite: entry["samesite"] as number,
      source_scheme: entry["source_scheme"] as number,
      source_port: entry["source_port"] as number,
      is_same_party: entry["is_same_party"] as number,
      last_update: webkitToUnixEpoch(
        Number(BigInt(entry["last_update_utc"] as bigint) / adjust_time),
      ),
      db_path: path,
    };
    cookie_array.push(cookie_entry);
  }
  return cookie_array;
}

/**
 * Get installed Chromium extensions
 * @param platform Platform to parse Chromium extensions
 * @returns Array of parsed extensions or `ApplicationError`
 */
export function chromiumExtensions(
  platform: PlatformType,
): Record<string, unknown>[] | ApplicationError {
  let paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Chromium/*/Extensions/*/*/manifest.json",
      );
      if (mac_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob macos extension paths: ${mac_paths}`,
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
        `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data\\*\\Extensions\\*\\*\\manifest.json`,
      );
      if (win_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob windows extension paths: ${win_paths}`,
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

  const extensions = [];
  for (const path of paths) {
    const extension = readTextFile(path.full_path);
    if (extension instanceof FileError) {
      console.warn(`could not read file ${path}: ${extension}`);
      continue;
    }

    const data = JSON.parse(extension);
    data["manifest_path"] = path.full_path;

    extensions.push(data);
  }

  return extensions;
}
