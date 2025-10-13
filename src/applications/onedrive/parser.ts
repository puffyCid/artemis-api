import { PlatformType } from "../../../mod";
import {
  KeyInfo,
  OneDriveDetails,
} from "../../../types/applications/onedrive";
import {
  OneDriveAccount,
  OneDriveLog,
  OneDriveSyncEngineRecord,
} from "../../../types/applications/onedrive";
import { GlobInfo } from "../../../types/filesystem/globs";
import { getEnvValue } from "../../environment/mod";
import { FileError } from "../../filesystem/errors";
import { readFile, readTextFile } from "../../filesystem/files";
import { glob } from "../../filesystem/files";
import { MacosError } from "../../macos/errors";
import { getPlist } from "../../macos/plist";
import { unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../../windows/errors";
import { getRegistry } from "../../windows/registry";
import { ApplicationError } from "../errors";
import { extractSyncEngine } from "./sqlite";

/**
 * Function to parse OneDrive artifacts
 * @param platform PlatformType enum
 * @param alt_path Optional alternative directory containing OneDrive files. **Must include trailing slash**
 * @param [user="*"] Optional user to parse OneDrive info. By default artemis will try to parse all users
 * @returns
 */
export function onedriveDetails(
  platform: PlatformType.Darwin | PlatformType.Windows,
  alt_path?: string,
  user = "*",
): OneDriveDetails | ApplicationError {
  let odl_files = "";
  let key_file = "";
  let sync_db = "";
  let reg_files = "";
  if (alt_path !== undefined) {
    odl_files = `${alt_path}*.odl*`;
    key_file = `${alt_path}general.keystore`;
    sync_db = `${alt_path}SyncEngineDatabase.db`;
    reg_files = `${alt_path}NTUSER.*`;
  }

  if (platform === PlatformType.Darwin && alt_path === undefined) {
    odl_files = `/Users/${user}/Library/Logs/OneDrive/*/*odl*`;
    key_file = `/Users/${user}/Library/Logs/OneDrive/*/general.keystore`;
    sync_db =
      `/Users/${user}/Library/Application Support/OneDrive/settings/*/SyncEngineDatabase.db`;
    reg_files =
      `/Users/${user}/Library/Group Containers/*.OneDriveStandaloneSuite/Library/Preferences/*.OneDriveStandaloneSuite.plist`;
  } else if (alt_path === undefined) {
    const drive = getEnvValue("HOMEDRIVE");
    if (drive === "") {
      return new ApplicationError(`ONEDRIVE`, `no HOMEDRIVE value`);
    }
    odl_files =
      `${drive}\\Users\\${user}\\AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\*odl*`;
    key_file =
      `${drive}\\Users\\${user}\\AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\general.keystore`;
    sync_db =
      `${drive}\\Users\\${user}\\AppData\\Local\\Microsoft\\OneDrive\\settings\\*\\SyncEngineDatabase.db`;
    reg_files = `${drive}\\Users\\${user}\\NTUSER.*`;
  }

  const details: OneDriveDetails = {
    logs: [],
    files: [],
    accounts: [],
    keys: [],
  };

  const paths = glob(odl_files);
  if (paths instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${odl_files}`,
    );
  }

  const log_entries = readOdlFiles(paths);
  details.logs = log_entries;

  const dbs = glob(sync_db);
  if (dbs instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${sync_db}`,
    );
  }
  const db_records = querySqlite(dbs);
  details.files = db_records;

  const key_paths = glob(key_file);
  if (key_paths instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${key_paths}`,
    );
  }
  const keys = extractKeys(key_paths);
  details.keys = keys;

  const reg_paths = glob(reg_files);
  if (reg_paths instanceof FileError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to glob path ${reg_paths}`,
    );
  }

  if (platform === PlatformType.Windows) {
    const accounts = accountWindows(reg_paths);
    details.accounts = accounts;
  } else if (platform === PlatformType.Darwin) {
    const accounts = accountMacos(reg_paths);
    details.accounts = accounts;
  }

  return details;
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
function extractKeys(paths: GlobInfo[]): KeyInfo[] {
  const keys: KeyInfo[] = [];
  for (const entry of paths) {
    const key: KeyInfo = {
      path: entry.full_path,
      key: "",
    };
    const data = readTextFile(entry.full_path);
    if (data instanceof FileError) {
      console.warn(`failed to read file ${entry.full_path}: ${data.message}`);
      continue;
    }

    const values = JSON.parse(data) as Record<string, string | number>[];
    for (const value of values) {
      key.key = value["Key"] as string;
      break;
    }
    keys.push(key);
  }

  return keys;
}

/**
 * Function to extract Account details associated with OneDrive
 * @param paths Array of `GlobInfo` to NTUSER.DAT Registry files
 * @returns Array of `OneDriveAccount`
 */
function accountWindows(paths: GlobInfo[]): OneDriveAccount[] {
  const accounts: OneDriveAccount[] = [];
  for (const entry of paths) {
    if (!entry.filename.toLowerCase().endsWith("dat")) {
      continue;
    }
    const values = getRegistry(entry.full_path);
    if (values instanceof WindowsError) {
      console.warn(`could not parse ${entry.full_path}: ${values.message}`);
      continue;
    }

    for (const reg of values) {
      if (
        reg.path.includes("\\Software\\Microsoft\\OneDrive\\Accounts") &&
        reg.values.length !== 0
      ) {
        // Lazy check to see if UserEmail key found in Registry Key value names
        if (!JSON.stringify(reg.values).includes("UserEmail")) {
          continue;
        }

        const account: OneDriveAccount = {
          email: "",
          device_id: "",
          account_id: "",
          last_signin: "",
          cid: "",
        };
        for (const value of reg.values) {
          switch (value.value) {
            case "UserEmail":
              account.email = value.data;
              break;
            case "cid":
              account.cid = value.data;
              break;
            case "LastSignInTime":
              account.last_signin = unixEpochToISO(Number(value.data));
              break;
            case "OneDriveDeviceId":
              account.device_id = value.data;
              break;
            case "OneAuthAccountId":
              account.account_id = value.data;
              break;
          }
        }
        accounts.push(account);
      }
    }
  }
  return accounts;
}

/**
 * Function to extract Account details associated with OneDrive
 * @param paths Array of `GlobInfo` to OneDriveStandaloneSuite.plist plist files
 * @returns Array of `OneDriveAccount`
 */
function accountMacos(paths: GlobInfo[]): OneDriveAccount[] {
  const accounts: OneDriveAccount[] = [];
  for (const entry of paths) {
    const values = getPlist(entry.full_path);
    if (values instanceof MacosError) {
      console.warn(`could not parse ${entry.full_path}: ${values.message}`);
      continue;
    }

    if (Array.isArray(values) || values instanceof Uint8Array) {
      console.warn(`unexpected plist type`);
      continue;
    }

    for (const key in values) {
      // Lazy check if the plist data contains the data we want
      if (!JSON.stringify(values[key]).includes("UserEmail")) {
        continue;
      }
      const account_value = values[key] as Record<string, string | number>;

      const account: OneDriveAccount = {
        email: account_value["UserEmail"] as string,
        device_id: account_value["OneDriveDeviceId"] as string,
        account_id: account_value["OneAutoAccountId"] as string,
        last_signin: "1970-01-01T00:00:00.000Z",
        cid: account_value["cid"] as string,
      };
      accounts.push(account);
    }
  }

  return accounts;
}
