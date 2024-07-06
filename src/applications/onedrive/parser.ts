import { PlatformType } from "../../../mod.ts";
import { OneDriveLog } from "../../../types/applications/onedrive.ts";
import { GlobInfo } from "../../../types/filesystem/globs.ts";
import { FileError } from "../../filesystem/errors.ts";
import { readFile } from "../../filesystem/files.ts";
import { glob } from "../../filesystem/mod.ts";
import { ApplicationError } from "../errors.ts";
import { parseOdl } from "./odl.ts";

/**
 * Function to parse OneDrive artifacts
 * @param platform PlatformType enum
 * @param alt_path Optional alternative directory containing OneDrive files. **Must include trailing slash**
 * @returns
 */
export function onedriveDetails(
  platform: PlatformType.Darwin | PlatformType.Windows,
  alt_path?: string,
) {
  let odl_files = "";
  let key_file = "";
  if (alt_path != undefined) {
    odl_files = `${alt_path}*.odl*`;
    key_file = `${alt_path}general.keystore`;
  }

  if (platform === PlatformType.Darwin) {
    odl_files = "/Users/*/Library/Logs/OneDrive/*/*odl*";
    key_file = "/Users/*/Library/Logs/OneDrive/*/general.keystore";
  }

  const paths = glob(odl_files);
  if (paths instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${odl_files}`,
    );
  }

  const log_entries = readOdlFiles(paths);
}

/**
 * Function to read and parse OneDrive Log files
 * @param paths Array of `GlobInfo` to OneDrive Log files (odl)
 * @returns Array of `OneDriveLog` entries
 */
export function readOdlFiles(paths: GlobInfo[]): OneDriveLog[] {
  let drive_logs: OneDriveLog[] = [];
  for (const entry of paths) {
    const data = readFile(entry.full_path);
    if (data instanceof FileError) {
      console.warn(
        `Failed to read file ${entry.full_path}: ${data.message}`,
      );
      continue;
    }

    const logs = parseOdl(data, entry.full_path, entry.filename);
    if (logs instanceof ApplicationError) {
      console.warn(
        `Failed to parse${entry.full_path}: ${logs.message}`,
      );
      continue;
    }
    drive_logs = drive_logs.concat(logs);
  }

  return drive_logs;
}
