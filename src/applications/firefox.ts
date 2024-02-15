import {
  FirefoxDownloads,
  FirefoxHistory,
  RawFirefoxDownloads,
  RawFirefoxHistory,
} from "../../types/applications/firefox.d.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/mod.ts";
import { PlatformType } from "../system/systeminfo.ts";
import { ApplicationError } from "./errors.ts";

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
 * @returns Array of parsed addons or `ApplicationError`
 */
export function firefoxAddons(
  platform: PlatformType,
): Record<string, unknown>[] | ApplicationError {
  let paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Firefox/Profiles/*/addons.json",
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
        `${drive}\\Users\\*\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\*\\addons.json`,
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
