import { encode } from "../encoding/base64.ts";
import { encodeBytes } from "../encoding/bytes.ts";
import { glob, readTextFile } from "../filesystem/files.ts";
import { PlatformType } from "../system/systeminfo.ts";
import { ApplicationError } from "./errors.ts";

/**
 * Return the local file history for all VSCode files. Also supports VSCodium.
 * @param platform OS Platform type to lookup
 * @returns Array of `FileHistory` entries
 */
export function fileHistory(
  platform: PlatformType,
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
      path =
        "C:\\Users\\*\\AppData\\Roaming\\*Cod*\\User\\History\\*\\entries.json";
      break;
    }
    case PlatformType.Linux: {
      path = "/home/*/.config/*Cod*/User/History/*/entries.json";
    }
  }

  const paths = glob(path);
  if (paths instanceof Error) {
    return new ApplicationError("VSCODE", `failed to glob paths: ${paths}`);
  }

  const entries = [];
  for (const path of paths) {
    if (!path.is_file) {
      continue;
    }

    // Read the JSON file
    const string_data = readTextFile(path.full_path);
    if (string_data instanceof Error) {
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
      if (history_data instanceof Error) {
        console.warn(`Could not history file data ${hist_file}`);
        continue;
      }
      // Base64 encode the history data
      const history_encoded = encode(encodeBytes(history_data));
      json_data.entries[i].content = history_encoded;
    }

    entries.push(json_data);
  }

  return entries;
}
