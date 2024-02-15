import {
  ChromiumDownloads,
  ChromiumHistory,
  RawChromiumDownloads,
  RawChromiumHistory,
} from "../../types/applications/chromium.d.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/files.ts";
import { PlatformType } from "../system/systeminfo.ts";
import { ApplicationError } from "./errors.ts";

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
