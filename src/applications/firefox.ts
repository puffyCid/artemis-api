import {
  FirefoxDownloads,
  FirefoxHistory,
  RawFirefoxDownloads,
  RawFirefoxHistory,
} from "../../types/applications/firefox.d.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { getEnvValue } from "../environment/env.ts";
import { glob, readTextFile } from "../filesystem/mod.ts";
import { PlatformType } from "../system/platform.ts";

/**
 * Get Firefox history for all users on a endpoint
 * @returns Array of `FirefoxHistory` entries for all users
 */
export function getFirefoxUsersHistory(): FirefoxHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_firefox_users_history();

  const history: FirefoxHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Firefox history from provided `places.sqlite` file
 * @param path Full path to `places.sqlite` file
 * @returns `RawFirefoxHistory` entries for file
 */
export function getFirefoxHistory(path: string): RawFirefoxHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_firefox_history(path);

  const history: RawFirefoxHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Firefox downloads for all users on a endpoint
 * @returns Array of `FirefoxDownloads` entries for all users
 */
export function getFirefoxUsersDownloads(): FirefoxDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_firefox_users_downloads();

  const downloads: FirefoxDownloads[] = JSON.parse(data);
  return downloads;
}

/**
 * Get Firefox downloads from provided `places.sqlite` file
 * @param path Full path to `places.sqlite` file
 * @returns `RawFirefoxDownloads` entries for file
 */
export function getFirefoxDownloads(path: string): RawFirefoxDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_firefox_downloads(path);

  const downloads: RawFirefoxDownloads[] = JSON.parse(data);
  return downloads;
}

/**
 * Get installed Firefox addons
 * @param platform Platform to parse Firefox addons
 * @returns Array of parsed addons
 */
export function firefoxAddons(
  platform: PlatformType,
): Record<string, object>[] | Error {
  let paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Firefox/Profiles/*/addons.json",
      );
      if (mac_paths instanceof Error) {
        return mac_paths;
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
      if (win_paths instanceof Error) {
        return win_paths;
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
    if (extension instanceof Error) {
      continue;
    }

    extensions = extensions.concat(JSON.parse(extension)["addons"]);
  }

  return extensions;
}
