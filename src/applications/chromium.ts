import {
  ChromiumAutofill,
  ChromiumBookmarkChildren,
  ChromiumLogins,
} from "../../types/applications/chromium.ts";
import {
  ChromiumBookmarks,
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
 * Function to parse Chromium cookies. Can provide an optional alternative path to cookie database, otherwise will use default paths
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
          `failed to glob macos cookies paths: ${mac_paths}`,
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
          `failed to glob windows cookies paths: ${win_paths}`,
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
 * Function to parse Chromium AutoFill information. Can provide an optional alternative path to Autofill database, otherwise will use default paths
 * @param platform OS platform to query for Chromium Autofill information
 * @param path Alternative path to Chromium Web Data file
 * @returns Array of `ChromiumAutofill` or `ApplicationError`
 */
export function getChromiumAutofill(
  platform: PlatformType,
  path?: string,
): ChromiumAutofill[] | ApplicationError {
  let glob_paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Chromium/*/Web Data",
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
        `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data\\*\\Web Data`,
      );
      if (win_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob windows autofill paths: ${win_paths}`,
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

  const query = "select * from autofill";
  let fill: ChromiumAutofill[] = [];
  for (const path of paths) {
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
      console.warn(`Could not query autofill for ${path}: ${results}`);
      continue;
    }

    fill = fill.concat(getAutofill(results, path));
  }

  return fill;
}

/**
 * Function to extract Autofill information from database
 * @param data Array of sqlite data from Web Data database
 * @param path Path to the Web Data database file
 * @returns Array of `ChromiumAutofill`
 */
function getAutofill(
  data: Record<string, unknown>[],
  path: string,
): ChromiumAutofill[] {
  const fill_array = [];

  for (const entry of data) {
    const fill_entry: ChromiumAutofill = {
      name: entry["name"] as string | undefined,
      value: entry["value"] as string | undefined,
      date_created: entry["date_created"] as number,
      date_last_used: entry["date_last_used"] as number,
      count: entry["count"] as number,
      db_path: path,
    };
    fill_array.push(fill_entry);
  }
  return fill_array;
}

/**
 * Function to try to parse Chromium bookmark info. Can provide an optional alternative path to bookmarks, otherwise will use default paths
 * @param platform OS platform to parse Chromium bookmarks
 * @param path Alternative path to Chromium Bookmarks file
 * @returns Array of `ChromiumBookmarks` or `ApplicationError`
 */
export function getChromiumBookmarks(
  platform: PlatformType,
  path?: string,
): ChromiumBookmarks[] | ApplicationError {
  let glob_paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Chromium/*/Bookmarks",
      );
      if (mac_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob macos bookmarks paths: ${mac_paths}`,
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
        `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data\\*\\Bookmarks`,
      );
      if (win_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob windows bookmarks paths: ${win_paths}`,
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

  const books_array: ChromiumBookmarks[] = [];
  for (const path of paths) {
    const results = readTextFile(path);
    if (results instanceof FileError) {
      console.warn(`Could not read bookmarks ${path}: ${results}`);
      continue;
    }

    const books: ChromiumBookmarks = {
      bookmark_bar: [],
      other: [],
      synced: [],
      path,
    };
    const book_json = JSON.parse(results);
    const bar = book_json["roots"]["bookmark_bar"]["children"] as
      | Record<string, string | Record<string, string>[] | undefined>[]
      | undefined;
    books.bookmark_bar = getBookmarkChildren(bar);

    const other = book_json["roots"]["other"]["children"] as
      | Record<string, string | Record<string, string>[] | undefined>[]
      | undefined;
    books.other = getBookmarkChildren(other);

    const synced = book_json["roots"]["other"]["synced"] as
      | Record<string, string | Record<string, string>[] | undefined>[]
      | undefined;
    books.synced = getBookmarkChildren(synced);

    books_array.push(books);
  }

  return books_array;
}

/**
 * Function to try to get children bookmark info
 * @param book Parsed Bookmark children
 * @returns Extract array of `ChromiumBookmarkChildren`
 */
function getBookmarkChildren(
  book:
    | Record<string, string | Record<string, string>[] | undefined>[]
    | undefined,
): ChromiumBookmarkChildren[] {
  let books: ChromiumBookmarkChildren[] = [];
  if (typeof book === "undefined") {
    return books;
  }
  const adjust_time = 1000000n;
  for (const entry of book) {
    if (typeof entry["children"] === "undefined") {
      const book_entry: ChromiumBookmarkChildren = {
        date_added: webkitToUnixEpoch(
          Number(BigInt(entry["date_added"] as string) / adjust_time),
        ),
        date_last_used: webkitToUnixEpoch(
          Number(BigInt(entry["date_last_used"] as string) / adjust_time),
        ),
        guid: entry["guid"] as string,
        id: Number(entry["id"] as string),
        name: entry["name"] as string,
        type: entry["type"] as string,
        url: entry["url"] as string,
        meta_info: entry["meta_info"] as unknown as Record<string, string>,
      };
      books.push(book_entry);
      continue;
    }

    books = books.concat(
      getBookmarkChildren(
        entry["children"] as
          | Record<string, string | Record<string, string>[] | undefined>[]
          | undefined,
      ),
    );
  }

  return books;
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

/**
 * Function to parse Chromium Logins information. Can provide an optional alternative path to logins database, otherwise will use default paths
 * @param platform OS platform to query for Chromium Logins information
 * @param path Alternative path to Chromium Login Data file
 * @returns Array of `ChromiumLogins` or `ApplicationError`
 */
export function getChromiumLogins(
  platform: PlatformType,
  path?: string,
): ChromiumLogins[] | ApplicationError {
  let glob_paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Chromium/*/Login Data",
      );
      if (mac_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob macos logins paths: ${mac_paths}`,
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
        `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data\\*\\Login Data`,
      );
      if (win_paths instanceof FileError) {
        return new ApplicationError(
          "CHROMIUM",
          `failed to glob windows logins paths: ${win_paths}`,
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

  const query = "select * from logins";
  let logins: ChromiumLogins[] = [];
  for (const path of paths) {
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
      console.warn(`Could not query logins for ${path}: ${results}`);
      continue;
    }

    logins = logins.concat(getLogins(results, path));
  }

  return logins;
}

/**
 * Function to extract Logins information from database
 * @param data Array of sqlite data from Login Data database
 * @param path Path to the Login Data database file
 * @returns Array of `ChromiumLogins`
 */
function getLogins(
  data: Record<string, unknown>[],
  path: string,
): ChromiumLogins[] {
  const logins_array = [];
  const adjust_time = 1000000n;

  for (const entry of data) {
    const login_entry: ChromiumLogins = {
      origin_url: entry["origin_url"] as string,
      signon_realm: entry["signon_realm"] as string,
      date_created: webkitToUnixEpoch(
        Number(BigInt(entry["date_created"] as bigint) / adjust_time),
      ),
      blacklisted_by_user: entry["blacklisted_by_user"] as number,
      scheme: entry["scheme"] as number,
      id: entry["id"] as number,
      date_last_used: webkitToUnixEpoch(
        Number(BigInt(entry["date_last_used"] as bigint) / adjust_time),
      ),
      date_password_modified: webkitToUnixEpoch(
        Number(BigInt(entry["date_password_modified"] as bigint) / adjust_time),
      ),
      sharing_notification_display: entry[
        "sharing_notification_display"
      ] as number,
      db_path: path,
      action_url: entry["action_url"] as string | undefined,
      username_element: entry["username_element"] as string | undefined,
      username_value: entry["username_value"] as string | undefined,
      times_used: entry["times_used"] as number | undefined,
      icon_url: entry["icon_url"] as string | undefined,
      possible_username_pairs: entry["possible_username_pairs"] as
        | string
        | undefined,
      federation_url: entry["federation_url"] as string | undefined,
      generation_upload_status: entry["generation_upload_status"] as
        | number
        | undefined,
      sender_profile_image_url: entry["sender_profile_image_url"] as
        | string
        | undefined,
      password_element: entry["password_element"] as string | undefined,
      password_type: entry["password_type"] as number | undefined,
      password_value: entry["password_value"] as string | undefined,
      date_received: webkitToUnixEpoch(
        typeof entry["date_received"] === "undefined"
          ? 0
          : Number(BigInt(entry["date_received"] as bigint) / adjust_time),
      ),
      sender_email: entry["sender_email"] as string | undefined,
      sender_name: entry["sender_name"] as string | undefined,
      skip_zero_click: entry["skip_zero_click"] as number | undefined,
      submit_element: entry["submit_element"] as string | undefined,
      display_name: entry["display_name"] as string | undefined,
      form_data: entry["form_data"] as string | undefined,
      moving_blocked_for: entry["moving_blocked_for"] as string | undefined,
      keychain_identifier: entry["keychain_identifier"] as string | undefined,
    };
    logins_array.push(login_entry);
  }

  return logins_array;
}
