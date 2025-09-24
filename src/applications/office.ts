import { getRegistry, PlatformType } from "../../mod";
import { FileError } from "../filesystem/errors";
import { glob } from "../filesystem/files";
import { parseBookmark } from "../macos/bookmark";
import { BookmarkData as OfficeRecentFilesMacos } from "../../types/macos/bookmark";
import { MacosError } from "../macos/errors";
import { getPlist } from "../macos/plist";
import { ApplicationError } from "./errors";
import { getEnvValue } from "../environment/mod";
import { WindowsError } from "../windows/errors";
import { Registry } from "../../types/windows/registry";
import { filetimeToUnixEpoch, unixEpochToISO } from "../time/conversion";
import { OfficeRecentFilesWindows } from "../../types/applications/office";
import { OfficeApp } from "../../types/applications/office";

/**
 * Function to extract Microsoft Office MRU files
 * @param platform OS `PlatformType`. Only Windows or Darwin is supported
 * @param alt_file Optional alternative path to NTUSER.DAT or plist file
 * @returns Array of `OfficeRecentFilesMacos` or `OfficeRecentFilesWindows` or `ApplicationError`
 */
export function officeMruFiles(
  platform: PlatformType.Darwin | PlatformType.Windows,
  alt_file?: string,
): OfficeRecentFilesMacos[] | OfficeRecentFilesWindows[] | ApplicationError {
  switch (platform) {
    case PlatformType.Darwin:
      return officeBookmarks(alt_file);
    case PlatformType.Windows:
      return officeMru(alt_file);
  }
}

/**
 * Function to parse NTUSER.DAT Registry file to extract Office MRU entries
 * @param alt_file Optional alternative path to NTUSER.DAT
 * @returns Array of `OfficeRecentFilesWindows` or `ApplicationError`
 */
function officeMru(
  alt_file?: string,
): OfficeRecentFilesWindows[] | ApplicationError {
  const paths: string[] = [];
  if (alt_file !== undefined) {
    paths.push(alt_file);
  } else {
    const volume = getEnvValue("SystemDrive");
    if (volume === "") {
      return new ApplicationError(`OFFICE`, `no SystemDrive found`);
    }
    const glob_office = `${volume}\\Users\\*\\NTUSER.DAT`;
    const glob_paths = glob(glob_office);
    if (glob_paths instanceof FileError) {
      return new ApplicationError(
        `OFFICE`,
        `failed to glob office paths for macOS: ${glob_paths}`,
      );
    }
    for (const entry of glob_paths) {
      if (!entry.is_file || entry.full_path.includes("Default User")) {
        continue;
      }
      paths.push(entry.full_path);
    }
  }

  let all_values: OfficeRecentFilesWindows[] = [];
  for (const reg of paths) {
    const reg_data = getRegistry(reg);
    if (reg_data instanceof WindowsError) {
      console.warn(`failed to parse Windows Registry ${reg}: ${reg_data}`);
      continue;
    }

    const values = extractMruRegistry(reg_data, reg);
    all_values = all_values.concat(values);
  }
  return all_values;
}

/**
 * Extract MRU info
 * @param data Array of `Registry` entries
 * @param registry_file Path to the Registry file
 * @returns Array of `OfficeRecentFilesWindows`
 */
function extractMruRegistry(
  data: Registry[],
  registry_file: string,
): OfficeRecentFilesWindows[] {
  const mrus: Registry[] = [];
  const filter = [ "\\Office\\", "\\File MRU" ];
  for (const entries of data) {
    if (
      !filter.every((item) => entries.path.includes(item)) ||
      entries.values.length === 0 ||
      entries.path.includes("\\File MRU\\")
    ) {
      continue;
    }
    mrus.push(entries);
  }

  const office_mru: OfficeRecentFilesWindows[] = [];
  for (const mru_path of mrus) {
    for (const value of mru_path.values) {
      if (!value.value.includes("Item")) {
        continue;
      }

      const mru_data = value.data.split("*");
      const path = mru_data.at(1) ?? "";
      const timestamp = mru_data.at(0);
      if (timestamp === undefined) {
        console.warn(`could not split MRU path properly: ${value.data}`);
        continue;
      }

      const match = /T0.*]\[/;
      let time_data = timestamp.match(match)?.[ 0 ];
      if (time_data === undefined) {
        console.warn(`could not match MRU path properly: ${timestamp}`);
        continue;
      }

      time_data = time_data.replace("T", "").replace("]", "").replace("[", "");
      const filetime = BigInt(`0x${time_data}`);
      const last_opened = unixEpochToISO(filetimeToUnixEpoch(filetime));

      const mru_entry: OfficeRecentFilesWindows = {
        path,
        last_opened,
        application: officeType(mru_path.path),
        registry_file,
        key_path: mru_path.path,
      };

      office_mru.push(mru_entry);
    }
  }

  return office_mru;
}

/**
 * Determine Office application associated with MRU entry
 * @param path Registry key path
 * @returns `OfficeApp` enum
 */
function officeType(path: string): OfficeApp {
  if (path.includes(OfficeApp.WORD)) return OfficeApp.WORD;
  if (path.includes(OfficeApp.ACCESS)) return OfficeApp.ACCESS;
  if (path.includes(OfficeApp.EXCEL)) return OfficeApp.EXCEL;
  if (path.includes(OfficeApp.ONENOTE)) return OfficeApp.ONENOTE;
  if (path.includes(OfficeApp.POWERPOINT)) return OfficeApp.POWERPOINT;

  return OfficeApp.UNKNOWN;
}

/**
 * Function to parse Office bookmark data on macOS
 * @param alt_file Optional alternative path to Office plist file
 * @returns Array of `OfficeRecentFilesMacos` or `OfficeRecentFilesWindows` or `ApplicationError`
 */
function officeBookmarks(
  alt_file?: string,
): OfficeRecentFilesMacos[] | ApplicationError {
  const paths: string[] = [];
  if (alt_file !== undefined) {
    paths.push(alt_file);
  } else {
    const glob_office =
      "/Users/*/Library/Containers/com.microsoft*/Data/Library/Preferences/com.microsoft.*.securebookmarks.plist";
    const glob_paths = glob(glob_office);
    if (glob_paths instanceof FileError) {
      return new ApplicationError(
        `OFFICE`,
        `failed to glob office paths for macOS: ${glob_paths}`,
      );
    }
    for (const entry of glob_paths) {
      paths.push(entry.full_path);
    }
  }

  const office_files: OfficeRecentFilesMacos[] = [];
  for (const entry of paths) {
    const plist_data = getPlist(entry);
    if (plist_data instanceof MacosError) {
      console.warn(`failed to parse ${entry}: ${plist_data}`);
      continue;
    }

    if (plist_data instanceof Uint8Array || Array.isArray(plist_data)) {
      continue;
    }

    for (const value in plist_data) {
      const bookmark_values = plist_data[ value ] as Record<
        string,
        number[] | string
      >;
      const data = bookmark_values[ "kBookmarkDataKey" ];
      if (typeof data === "string") {
        console.warn(`got string for kBookmarkDataKey? It should be bytes`);
        continue;
      } else if (data === undefined) {
        console.warn(`got undefined for kBookmarkDataKey? It should be bytes`);
        continue;
      }
      const book_data = Uint8Array.from(data);

      const book = parseBookmark(book_data);
      if (book instanceof MacosError) {
        console.warn(`failed to parse MRU bookmark data: ${book}`);
        continue;
      }
      office_files.push(book);
    }
  }
  return office_files;
}
