import { MacosError } from "../errors";
import {
  MatchData,
  XprotectEntries,
} from "../../../types/macos/plist/xprotect";
import { getPlist } from "../plist";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";

/**
 * Function to extract Xprotect definitions
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to `Xprotect.plist`
 * @returns Array of `XprotectEntries` or `MacosError`
 */
export function getXprotectDefinitions(
  protocol = AccessorProtocol.Host,
  alt_path?: string[],
): XprotectEntries[] | MacosError {
  const paths = alt_path ?? [
    "/Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/XProtect.plist",
    "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/XProtect.plist",
  ];
  const accessor = new Accessor();

  let entries: XprotectEntries[] = [];
  for (const path of paths) {
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${path}: ${matches}`);
      continue;
    }

    for (const entry of matches) {
      if (entry.meta.kind !== EntryKind.File) {
        continue;
      }

      const bytes = accessor.readFileHandle(entry.handle as FileHandle);
      if (bytes instanceof FileError) {
        console.warn!(`Could not read '${entry.meta.display_path}': ${bytes}`);
        continue;
      }

      const result = getPlist(bytes);
      if (result instanceof MacosError) {
        console.warn!(`Could not parse '${entry.meta.display_path}': ${result}`);
        continue;
      }

      entries = entries.concat(
        extractXprotectEntries(result as Record<string, unknown>[]),
      );
    }
  }

  return entries;
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
          entry.launch_type = launch["LSItemContentType"] ?? "";
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
          if (file_type_key["NSURLTypeIdentifierKey"] !== undefined) {
            match_data.filetype = file_type_key["NSURLTypeIdentifierKey"];
          }
          const name_key = match[key] as Record<string, string>;
          if (name_key["NSURLNameKey"] !== undefined) {
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
