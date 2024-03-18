import { MacosError } from "../errors.ts";
import {
  MatchData,
  XprotectEntries,
} from "../../../types/macos/plist/xprotect.ts";
import { getPlist } from "../plist.ts";

/**
 * Function to extract Xprotect definitions
 * @param alt_path Optional alternative path to `Xprotect.plist` file_type_key
 * @returns Array of `XprotectEntries` or `MacosError`
 */
export function getXprotectDefinitions(
  alt_path?: string,
): XprotectEntries[] | MacosError {
  let paths = [];
  if (alt_path != undefined) {
    paths = [alt_path];
  } else {
    paths = [
      "/Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/Xprotect.plist",
      "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Xprotect.plist",
    ];
  }

  let entries: XprotectEntries[] = [];
  for (const path of paths) {
    const data = getPlist(path);
    if (
      data instanceof MacosError || data instanceof Uint8Array ||
      !Array.isArray(data)
    ) {
      console.warn(`Failed to read plist ${path} did not get an array`);
      continue;
    }

    entries = entries.concat(
      extractXprotectEntries(data as Record<string, unknown>[]),
    );
  }

  console.log(entries);

  return [];
}

/**
 * Function to parse the Xprotect definitions
 * @param data Array of Xprotect objects from plist file_type_key
 * @returns Array of `XprotectEntries`
 */
function extractXprotectEntries(
  data: Record<string, unknown>[],
): XprotectEntries[] {
  const entries: XprotectEntries[] = [];

  for (const xprotect of data) {
    const entry: XprotectEntries = {
      name: "",
      launch_type: "",
      matches: [],
    };
    for (const key in xprotect) {
      switch (key) {
        case "Description":
          entry.name = xprotect[key] as string;
          break;
        case "LaunchServices": {
          const launch = xprotect[key] as Record<string, string>;
          entry.launch_type = launch["LSItemContentType"];
          break;
        }
        case "Matches":
          entry.matches = getMatches(
            xprotect[key] as Record<
              string,
              string | Record<string, string> | Uint8Array
            >[],
          );
          break;
      }
    }
    entries.push(entry);
  }

  return entries;
}

/**
 * Function to extract Xprotect match info
 * @param matches Array Xprotect match definitions
 * @returns Array of `MatchData`
 */
function getMatches(
  matches: Record<string, string | Record<string, string> | Uint8Array>[],
): MatchData[] {
  let match_array: MatchData[] = [];
  for (const match of matches) {
    const match_data: MatchData = {
      pattern: "",
      filetype: "",
      sha1: "",
      filename: "",
    };
    for (const key in match) {
      switch (key) {
        case "MatchFile": {
          const file_type_key = match[key] as Record<string, string>;
          if (file_type_key["NSURLTypeIdentifierKey"] != undefined) {
            match_data.filetype = file_type_key["NSURLTypeIdentifierKey"];
          }
          const name_key = match[key] as Record<string, string>;
          if (name_key["NSURLNameKey"] != undefined) {
            match_data.filename = name_key["NSURLNameKey"];
          }
          break;
        }
        case "Pattern":
          match_data.pattern = match[key] as string;
          break;
        case "Identity": {
          let hash = "";
          for (const value of match[key] as Uint8Array) {
            hash += value.toString(16).padStart(2, "0");
          }
          match_data.sha1 = hash;
          break;
        }
        case "Matches": {
          const nested = match[key] as unknown as Record<
            string,
            string | Record<string, string> | Uint8Array
          >[];
          match_array = match_array.concat(getMatches(nested));
          break;
        }
      }
    }
    if (
      match_data.filetype === "" && match_data.filetype === "" &&
      match_data.pattern === "" && match_data.sha1 === ""
    ) {
      continue;
    }
    match_array.push(match_data);
  }

  return match_array;
}
