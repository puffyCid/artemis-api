import { Extensions, FileHistory } from "../../types/applications/vscode";
import { encode } from "../encoding/base64";
import { encodeBytes } from "../encoding/bytes";
import { getEnvValue } from "../environment/env";
import { FileError } from "../filesystem/errors";
import { glob, readTextFile } from "../filesystem/files";
import { PlatformType } from "../system/systeminfo";
import { unixEpochToISO } from "../time/conversion";
import { ApplicationError } from "./errors";

/**
 * Return the local file history for all VSCode files. Also supports VSCodium.
 * @param platform OS Platform type to lookup
 * @param alt_glob Alternative glob path to `entries.json`
 * @returns Array of `FileHistory` entries or `ApplicationError`
 */
export function fileHistory(
  platform: PlatformType,
  alt_glob?: string,
): FileHistory[] | ApplicationError {
  // Get all user paths
  let path = "";
  switch (platform) {
    case PlatformType.Darwin: {
      path =
        "/Users/*/Library/Application Support/*Cod*/User/History/*/entries.json";
      break;
    }
    case PlatformType.Windows: {
      let drive = getEnvValue("SystemDrive");
      if (drive === "") {
        drive = "C:";
      }
      path =
        `${drive}\\Users\\*\\AppData\\Roaming\\*Cod*\\User\\History\\*\\entries.json`;
      break;
    }
    case PlatformType.Linux: {
      path = "/home/*/.config/*Cod*/User/History/*/entries.json";
    }
  }

  if (alt_glob != undefined) {
    path = alt_glob;
  }

  const paths = glob(path);
  if (paths instanceof FileError) {
    return new ApplicationError("VSCODE", `failed to glob paths: ${paths}`);
  }

  const entries: FileHistory[] = [];
  for (const path of paths) {
    if (!path.is_file) {
      continue;
    }

    // Read the JSON file
    const string_data = readTextFile(path.full_path);
    if (string_data instanceof FileError) {
      console.warn(`Could not read file ${path.full_path}`);
      continue;
    }

    // Parse JSON file into the FileHistory format
    const json_data: FileHistory = JSON.parse(string_data);
    json_data.history_path = path.full_path;

    // Loop through each history entry and read the contents
    for (let i = 0; i < json_data.entries.length; i++) {
      let hist_file = "";
      switch (platform) {
        case PlatformType.Linux:
        case PlatformType.Darwin: {
          const dirs = path.full_path.split("/");
          const _ = dirs.pop();
          hist_file = `${dirs.join("/")}/${json_data.entries[i].id}`;
          break;
        }
        case PlatformType.Windows: {
          const dirs = path.full_path.split("\\");
          const _ = dirs.pop();
          hist_file = `${dirs.join("\\")}\\${json_data.entries[i].id}`;
          break;
        }
      }
      // Read file data
      const history_data = readTextFile(hist_file);
      if (history_data instanceof FileError) {
        console.warn(
          `Could not read history file ${hist_file}: ${history_data}`,
        );
        continue;
      }
      // Base64 encode the history data
      const history_encoded = encode(encodeBytes(history_data));
      json_data.entries[i].timestamp = unixEpochToISO(
        json_data.entries[i].timestamp as number,
      );
      json_data.entries[i].content = history_encoded;
    }

    entries.push(json_data);
  }

  return entries;
}

/**
 * Function to parse installed extensions for VSCode or VSCodium
 * @param platform OS platform to get VScode extensions
 * @param alt_path Alternative path to extensions.json file
 * @returns Array of `Extensions` or `ApplicationError`
 */
export function getExtensions(
  platform: PlatformType,
  alt_path?: string,
): Extensions[] | ApplicationError {
  // Get all user paths, unless alt_path is provided
  let paths: string[] = [];
  if (alt_path != undefined) {
    paths = [alt_path];
  } else {
    let path = "";
    switch (platform) {
      case PlatformType.Darwin: {
        path = "/Users/*/.vscode*/extensions/extensions.json";
        break;
      }
      case PlatformType.Windows: {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
          drive = "C:";
        }
        path = `${drive}:\\Users\\*\\.vscode*\\extensions\\extensions.json`;
        break;
      }
      case PlatformType.Linux: {
        path = "/home/*/.vscode*/extensions/extensions.json";
      }
    }

    const glob_paths = glob(path);
    if (glob_paths instanceof Error) {
      return new ApplicationError("VSCODE", `failed to glob path: ${path}`);
    }
    for (const path of glob_paths) {
      paths.push(path.full_path);
    }
  }

  const extensions: Extensions[] = [];
  // Read extensions.json
  for (const entry of paths) {
    const extension_data = readTextFile(entry);
    if (extension_data instanceof FileError) {
      console.warn(`Could not read extension file ${entry}: ${extension_data}`);
      continue;
    }
    const ext: Extensions = {
      path: entry,
      data: JSON.parse(extension_data),
    };

    extensions.push(ext);
  }

  return extensions;
}
