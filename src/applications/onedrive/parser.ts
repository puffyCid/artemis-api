import { PlatformType } from "../../../mod.ts";
import {
  OneDriveLog,
  OneDriveSyncEngineRecord,
} from "../../../types/applications/onedrive.ts";
import { GlobInfo } from "../../../types/filesystem/globs.ts";
import { getEnvValue } from "../../environment/mod.ts";
import { FileError } from "../../filesystem/errors.ts";
import { readFile, readTextFile } from "../../filesystem/files.ts";
import { glob } from "../../filesystem/mod.ts";
import { ApplicationError } from "../errors.ts";
import { parseOdl } from "./odl.ts";
import { extractSyncEngine } from "./sqlite.ts";

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
  let sync_db = "";
  if (alt_path != undefined) {
    odl_files = `${alt_path}*.odl*`;
    key_file = `${alt_path}general.keystore`;
  }

  if (platform === PlatformType.Darwin) {
    odl_files = "/Users/*/Library/Logs/OneDrive/*/*odl*";
    key_file = "/Users/*/Library/Logs/OneDrive/*/general.keystore";
  } else {
    const drive = getEnvValue("HOMEDRIVE");
    if (drive === "") {
      return new ApplicationError(`ONEDRIVE`, `no HOMEDRIVE value`);
    }
    odl_files =
      `${drive}\\Users\\*\\AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\*odl*`;
    key_file =
      `${drive}\\Users\\*\\AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\general.keystore`;
    sync_db =
      `${drive}\\Users\\*\\AppData\\Local\\Microsoft\\OneDrive\\settings\\*\\SyncEngineDatabase.db`;
  }

  const paths = glob(odl_files);
  if (paths instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${odl_files}`,
    );
  }

  const log_entries = readOdlFiles(paths);
  console.log(log_entries.length);

  const dbs = glob(sync_db);
  if (dbs instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${sync_db}`,
    );
  }
  const db_records = querySqlite(dbs);
  console.log(db_records.length);

  const key_paths = glob(key_file);
  if (key_paths instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${sync_db}`,
    );
  }
  const keys = extractKeys(key_paths);
  console.log(keys);
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
    console.log(entry.full_path);

    const logs = parseOdl(data, entry.full_path, entry.filename);
    if (logs instanceof ApplicationError) {
      console.warn(
        `Failed to parse ${entry.full_path}: ${logs.message}`,
      );
      continue;
    }
    drive_logs = drive_logs.concat(logs);
  }

  return drive_logs;
}

/**
 * Function to query the SyncEngineDatabase
 * @param paths Array of `GlobInfo` to SyncEngineDatabase
 * @returns Array of `OneDriveSyncEngineRecord` entries
 */
function querySqlite(paths: GlobInfo[]): OneDriveSyncEngineRecord[] {
  let db_records: OneDriveSyncEngineRecord[] = [];
  for (const entry of paths) {
    const records = extractSyncEngine(entry.full_path);
    if (records instanceof ApplicationError) {
      console.warn(
        `Failed to parse ${entry.full_path}: ${records.message}`,
      );
      continue;
    }
    db_records = db_records.concat(records);
  }

  return db_records;
}

/**
 * Function to get the decryption keys
 * @param paths Array of `GlobInfo` to general.keystore
 * @returns Array of keys
 */
function extractKeys(paths: GlobInfo[]): string[] {
  const keys = [];
  for (const entry of paths) {
    const data = readTextFile(entry.full_path);
    if (data instanceof FileError) {
      console.warn(`failed to read file ${entry.full_path}: ${data.message}`);
      continue;
    }

    const values = JSON.parse(data) as Record<string, string | number>[];
    console.log(values);
    for (const value of values) {
      keys.push(value["Key"] as string);
    }
  }

  return keys;
}
