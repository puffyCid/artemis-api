import {
  ChromiumDownloads,
  ChromiumHistory,
  RawChromiumDownloads,
  RawChromiumHistory,
} from "../../types/applications/chromium.d.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { getEnvValue } from "../environment/env.ts";
import { glob, readTextFile } from "../filesystem/files.ts";
import { PlatformType } from "../system/systeminfo.ts";

/**
 * Get Chromium history for all users on a endpoint
 * @returns Array of `ChromiumHistory` entries for all users
 */
export function getChromiumUsersHistory(): ChromiumHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_chromium_users_history();

  const history: ChromiumHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Chromium history from provided `History` file
 * @param path Full path to `History` file
 * @returns `RawChromiumHistory` entries for file
 */
export function getChromiumHistory(path: string): RawChromiumHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_chromium_history(path);

  const history: RawChromiumHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Chromium downloads for all users on a endpoint
 * @returns Array of `ChromiumDownloads` entries for all users
 */
export function getChromiumUsersDownloads(): ChromiumDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_chromium_users_downloads();

  const downloads: ChromiumDownloads[] = JSON.parse(data);
  return downloads;
}

/**
 * Get Chromium downloads from provided `History` file
 * @param path Full path to `History` file
 * @returns `RawChromiumDownloads` entries for file
 */
export function getChromiumDownloads(path: string): RawChromiumDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_chromium_downloads(path);

  const downloads: RawChromiumDownloads[] = JSON.parse(data);
  return downloads;
}

/**
 * Get installed Chromium extensions
 * @param platform Platform to parse Chromium extensions
 * @returns Array of parsed extensions
 */
export function chromiumExtensions(
  platform: PlatformType,
): Record<string, object>[] | Error {
  let paths: GlobInfo[] = [];
  switch (platform) {
    case PlatformType.Darwin: {
      const mac_paths = glob(
        "/Users/*/Library/Application Support/Chromium/*/Extensions/*/*/manifest.json",
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
        `${drive}\\Users\\*\\AppData\\Local\\Chromium\\User Data\\*\\Extensions\\*\\*\\manifest.json`,
      );
      if (win_paths instanceof Error) {
        console.error(`${win_paths}`);
        return win_paths;
      }
      console.log(`paths: ${win_paths}`);
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
    if (extension instanceof Error) {
      continue;
    }

    extensions.push(JSON.parse(extension));
  }

  return extensions;
}
