import { FirefoxCookies } from "../../types/applications/firefox.ts";
import {
  FirefoxDownloads,
  FirefoxHistory,
  RawFirefoxDownloads,
  RawFirefoxHistory,
} from "../../types/applications/firefox.ts";
import { GlobInfo } from "../../types/filesystem/globs.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/mod.ts";
import { PlatformType } from "../system/systeminfo.ts";
import { unixEpochToISO } from "../time/conversion.ts";
import { ApplicationError } from "./errors.ts";
import { querySqlite } from "./sqlite.ts";

/**
 * Get FireFox history for all users
 * @param platform Platform to parse Firefox addons
 * @returns Array of `FirefoxHistory` or `ApplicationError`
 */
export function firefoxHistory(
  platform: PlatformType,
): FirefoxHistory[] | ApplicationError {
  const paths = firefoxPaths(platform, "places.sqlite");
  if (paths instanceof ApplicationError) {
    return paths;
  }
  const query = `SELECT 
                  moz_places.id AS moz_places_id, 
                  url, 
                  title, 
                  rev_host, 
                  visit_count, 
                  hidden, 
                  typed, 
                  last_visit_date, 
                  guid, 
                  foreign_count, 
                  url_hash, 
                  description, 
                  preview_image_url, 
                  origin_id, 
                  prefix, 
                  host, 
                  moz_origins.frecency AS frequency 
                FROM 
                  moz_places 
                JOIN moz_origins ON moz_places.origin_id = moz_origins.id`;
  const hits = [];
  for (const path of paths) {
    const results = querySqlite(path.full_path, query);
    if (results instanceof ApplicationError) {
      console.warn(`Failed to query ${path.full_path}: ${results}`);
      continue;
    }
    const history = [];
    // Loop through history rows
    for (const entry of results) {
      const history_row: RawFirefoxHistory = {
        moz_places_id: entry["moz_places_id"] as number ?? 0,
        url: entry["url"] as string ?? "",
        title: entry["title"] as string ?? "",
        rev_host: entry["rev_host"] as string ?? "",
        visit_count: entry["rev_host"] as number ?? 0,
        hidden: entry["hidden"] as number ?? 0,
        typed: entry["typed"] as number ?? 0,
        frequency: entry["frequency"] as number ?? 0,
        last_visit_date: unixEpochToISO(
          entry["last_visit_date"] as bigint ?? 0,
        ),
        guid: entry["guid"] as string ?? "",
        foreign_count: entry["foreign_count"] as number ?? 0,
        url_hash: entry["url_hash"] as number ?? 0,
        description: entry["description"] as string ?? "",
        preview_image_url: entry["preview_image_url"] as string ?? "",
        prefix: entry["prefix"] as string ?? "",
        host: entry["host"] as string ?? "",
      };
      history.push(history_row);
    }

    const hit: FirefoxHistory = {
      history,
      path: path.full_path,
      user: "",
    };

    hits.push(hit);
  }

  return hits;
}

/**
 * Get FireFox downloads for all users
 * @param platform Platform to parse Firefox addons
 * @returns Array of `FirefoxHistory` or `ApplicationError`
 */
export function firefoxDownloads(
  platform: PlatformType,
): FirefoxDownloads[] | ApplicationError {
  const paths = firefoxPaths(platform, "places.sqlite");
  if (paths instanceof ApplicationError) {
    return paths;
  }

  const query = `SELECT 
                  moz_annos.id AS downloads_id, 
                  place_id, 
                  anno_attribute_id, 
                  content, 
                  flags, 
                  expiration, 
                  type, 
                  dateAdded, 
                  lastModified, 
                  moz_places.id AS moz_places_id, 
                  url, 
                  title, 
                  rev_host, 
                  visit_count, 
                  hidden, 
                  typed, 
                  last_visit_date, 
                  guid, 
                  foreign_count, 
                  url_hash, 
                  description, 
                  preview_image_url, 
                  name 
                FROM 
                  moz_annos 
                  JOIN moz_places ON moz_annos.place_id = moz_places.id 
                  JOIN moz_anno_attributes ON anno_attribute_id = moz_anno_attributes.id`;
  const hits = [];
  for (const path of paths) {
    const results = querySqlite(path.full_path, query);
    if (results instanceof ApplicationError) {
      console.warn(`Failed to query ${path.full_path}: ${results}`);
      continue;
    }
    const downloads = [];
    // Loop through downloads rows
    for (const entry of results) {
      const download_row: RawFirefoxDownloads = {
        id: entry["id"] as number ?? 0,
        place_id: entry["place_id"] as number ?? 0,
        anno_attribute_id: entry["anno_attribute_id"] as number ?? 0,
        content: entry["content"] as string ?? "",
        flags: entry["flags"] as number ?? 0,
        expiration: entry["expiration"] as number ?? 0,
        download_type: entry["download_type"] as number ?? 0,
        date_added: unixEpochToISO(
          entry["date_added"] as bigint ?? 0,
        ),
        last_modified: unixEpochToISO(
          entry["last_modified"] as bigint ?? 0,
        ),
        name: entry["name"] as string ?? "",
        history: {
          moz_places_id: entry["moz_places_id"] as number ?? 0,
          url: entry["url"] as string ?? "",
          title: entry["title"] as string ?? "",
          rev_host: entry["rev_host"] as string ?? "",
          visit_count: entry["rev_host"] as number ?? 0,
          hidden: entry["hidden"] as number ?? 0,
          typed: entry["typed"] as number ?? 0,
          frequency: entry["frequency"] as number ?? 0,
          last_visit_date: unixEpochToISO(
            entry["last_visit_date"] as bigint ?? 0,
          ),
          guid: entry["guid"] as string ?? "",
          foreign_count: entry["foreign_count"] as number ?? 0,
          url_hash: entry["url_hash"] as number ?? 0,
          description: entry["description"] as string ?? "",
          preview_image_url: entry["preview_image_url"] as string ?? "",
          prefix: entry["prefix"] as string ?? "",
          host: entry["host"] as string ?? "",
        },
      };
      downloads.push(download_row);
    }

    const hit: FirefoxDownloads = {
      downloads,
      path: path.full_path,
      user: "",
    };

    hits.push(hit);
  }

  return hits;
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
  let paths: string[] = [];

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
  const cookie_array: FirefoxCookies[] = [];

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
      cookie_entry.last_accessed = unixEpochToISO(Number(
        BigInt(entry["lastAccessed"] as bigint) / adjust_time,
      ));
    }

    if (entry["creationTime"] != undefined) {
      cookie_entry.creation_time = unixEpochToISO(Number(
        BigInt(entry["creationTime"] as bigint) / adjust_time,
      ));
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
    case PlatformType.Linux: {
      const linux_paths = glob(`/home/*/.mozilla/firefox/*/${file}`);
      if (linux_paths instanceof FileError) {
        return new ApplicationError(
          "FIREFOX",
          `failed to glob linux paths: ${linux_paths}`,
        );
      }
      paths = linux_paths;
      break;
    }
    default: {
      return [];
    }
  }
  return paths;
}
