import { dumpData, glob, Output, outputResults, PlatformType, readTextFile } from "../../../mod";
import { KeyInfo, OneDriveAccount, OneDriveLog, OnedriveProfile, OneDriveSyncEngineRecord } from "../../../types/applications/onedrive";
import { getEnvValue } from "../../environment/mod";
import { FileError } from "../../filesystem/errors";
import { ApplicationError } from "../errors";
import { accountMacos, accountWindows } from "./config";
import { readOdlFiles } from "./odl";
import { extractSyncEngine } from "./sqlite";

/**
 * TODO:
 * 3. tests?
 *    - key file (random key)
 *    - slimmed down db?
 *    - ntuser registry file? musuem has lots of samples because someone uploaded them!
 */

/**
 * Class to parse OneDrive artifacts
 */
export class OneDrive {
    private platform: PlatformType;
    private user = "";
    private profiles: OnedriveProfile[] = [];

    /**
     * Construct an `OneDrive` object that can parse all OneDrive supported artifacts for all users
     * @param platform OS `PlatformType`
     * @param [user="*"] Optional specific user to parse OneDrive info. Default is all users
     * @param alt_path Optional directory that contains *all* OneDrive related artifact files
     */
    constructor(platform: PlatformType.Darwin | PlatformType.Windows, user = "*", alt_path?: string) {
        this.platform = platform;
        this.user = user;

        if (alt_path !== undefined) {
            let separator = "/";
            let config = "*.OneDriveStandaloneSuite.plist"
            if (this.platform === PlatformType.Windows) {
                separator = "\\";
                config = "NTUSER.DAT";
            }

            const profile: OnedriveProfile = {
                sync_db: this.getFiles(`${alt_path}${separator}SyncEngineDatabase.db`),
                odl_files: this.getFiles(`${alt_path}${separator}*odl*`),
                key_file: this.getFiles(`${alt_path}${separator}general.keystore`),
                config_file: this.getFiles(`${alt_path}${separator}${config}`),
            }
            this.profiles.push(profile);
            return;
        }
        this.setupProfiles();
    }

    /**
     * View all artifacts the `OneDrive` object found related to OneDrive
     * @returns Array of `OnedriveProfile`
     */
    public oneDriveProfiles(): OnedriveProfile[] {
        return this.profiles;
    }

    /**
     * Function to parse OneDrive key files. By default all keys are parsed based on how the `OneDrive` class was initialized  
     * By default all key entries are returned. You may provide an optional `Output` object to instead output the results to a file  
     * If results are outputted to a file. An empty array is returned
     * @param files Optional array of specific keys files to parse
     * @param output Optional `Output` object to output results instead of returning them to the caller
     * @param [metadata_runtime=false] Append runtime metadata to the output. Default is false. Only applicable if the Output.Format is JSON or JSONL
     * @returns Array of `KeyInfo`
     */
    public oneDriveKeys(files?: string[], output?: Output, metadata_runtime = false): KeyInfo[] {
        let keys: KeyInfo[] = [];
        // If we only want to parse a subset of keys
        if (files !== undefined) {
            for (const entry of files) {
                const key: KeyInfo = {
                    path: entry,
                    key: "",
                };
                const data = readTextFile(entry);
                if (data instanceof FileError) {
                    console.warn(`failed to read file ${entry}: ${data.message}`);
                    continue;
                }

                const values = JSON.parse(data) as Record<string, string | number>[];
                for (const value of values) {
                    key.key = value["Key"] as string;
                    break;
                }
                keys.push(key);
            }
            if (output !== undefined) {
                if (metadata_runtime) {
                    outputResults(keys, "onedrive_keys", output);
                } else {
                    dumpData(keys, "onedrive_keys", output);
                }
                return [];
            }
            return keys;
        }

        // Parse all keys
        for (const profile of this.profiles) {
            for (const entry of profile.key_file) {
                const key: KeyInfo = {
                    path: entry,
                    key: "",
                };
                const data = readTextFile(entry);
                if (data instanceof FileError) {
                    console.warn(`failed to read file ${entry}: ${data.message}`);
                    continue;
                }

                const values = JSON.parse(data) as Record<string, string | number>[];
                for (const value of values) {
                    key.key = value["Key"] as string;
                    break;
                }
                keys.push(key);
            }
            if (output !== undefined) {
                if (metadata_runtime) {
                    outputResults(keys, "onedrive_keys", output);
                } else {
                    dumpData(keys, "onedrive_keys", output);
                }
                return [];
            }
        }
        return keys;
    }

    /**
     * Function to parse OneDrive Log (ODL) files. By default all logs are parsed based on how the `OneDrive` class was initialized  
     * By default all log entries are returned. You may provide an optional `Output` object to instead output the results to a file  
     * If results are outputted to a file. An empty array is returned
     * @param files Optional array of specific ODL files to parse
     * @param output Optional `Output` object to output results instead of returning them to the caller
     * @param [metadata_runtime=false] Append runtime metadata to the output. Default is false. Only applicable if the Output.Format is JSON or JSONL
     * @returns Array of `OneDriveLog`
     */
    public oneDriveLogs(files?: string[], output?: Output, metadata_runtime = false): OneDriveLog[] {
        let logs: OneDriveLog[] = [];
        // Check if we only want to parse a subset of logs
        if (files !== undefined) {
            for (const entry of files) {
                const values = readOdlFiles(entry);
                if (values instanceof ApplicationError) {
                    console.error(`${values}`);
                    continue;
                }
                if (output !== undefined) {
                    if (metadata_runtime) {
                        outputResults(values, "onedrive_odl_logs", output);
                    } else {
                        dumpData(values, "onedrive_odl_logs", output);
                    }
                    continue;
                }
                logs = logs.concat(values);
            }
            return logs;
        }

        // Parse all logs
        for (const profile of this.profiles) {
            for (const entry of profile.odl_files) {
                const values = readOdlFiles(entry);
                if (values instanceof ApplicationError) {
                    console.error(`${values}`);
                    continue;
                }
                if (output !== undefined) {
                    if (metadata_runtime) {
                        outputResults(values, "onedrive_odl_logs", output);
                    } else {
                        dumpData(values, "onedrive_odl_logs", output);
                    }
                    continue;
                }
                logs = logs.concat(values);
            }
        }
        return logs;
    }

    /**
     * Function to parse OneDrive Account info. By default all accounts are parsed based on how the `OneDrive` class was initialized  
     * By default all account entries are returned. You may provide an optional `Output` object to instead output the results to a file  
     * If results are outputted to a file. An empty array is returned
     * @param files Optional array of specific account configs files to parse. Windows will be NTUSER.DAT. macOS will be plist files
     * @param output Optional `Output` object to output results instead of returning them to the caller
     * @param [metadata_runtime=false] Append runtime metadata to the output. Default is false. Only applicable if the Output.Format is JSON or JSONL
     * @returns Array of `OneDriveAccount`
     */
    public oneDriveAccounts(files?: string[], output?: Output, metadata_runtime = false): OneDriveAccount[] {
        let configs: OneDriveAccount[] = [];
        // Check if we only want to parse a subset of accounts
        if (files !== undefined) {
            for (const entry of files) {
                const values = this.platform === PlatformType.Windows ? accountWindows(entry) : accountMacos(entry)
                if (values instanceof ApplicationError) {
                    console.error(`${values}`);
                    continue;
                }
                if (output !== undefined) {
                    if (metadata_runtime) {
                        outputResults(values, "onedrive_accounts", output);
                    } else {
                        dumpData(values, "onedrive_accounts", output);
                    }
                    continue;
                }
                configs = configs.concat(values);
            }
            return configs;
        }

        // Parse all configs
        for (const profile of this.profiles) {
            for (const entry of profile.config_file) {
                const values = this.platform === PlatformType.Windows ? accountWindows(entry) : accountMacos(entry)
                if (values instanceof ApplicationError) {
                    console.error(`${values}`);
                    continue;
                }
                if (output !== undefined) {
                    if (metadata_runtime) {
                        outputResults(values, "onedrive_accounts", output);
                    } else {
                        dumpData(values, "onedrive_accounts", output);
                    }
                    continue;
                }
                configs = configs.concat(values);
            }
        }
        return configs;
    }

    /**
     * Function to parse OneDrive Sync databases. By default all databases are parsed based on how the `OneDrive` class was initialized  
     * By default all database entries are returned. You may provide an optional `Output` object to instead output the results to a file  
     * If results are outputted to a file. An empty array is returned
     * @param files Optional array of specific db files to query
     * @param output Optional `Output` object to output results instead of returning them to the caller
     * @param [metadata_runtime=false] Append runtime metadata to the output. Default is false. Only applicable if the Output.Format is JSON or JSONL
     * @returns Array of `OneDriveSyncEngineRecord`
     */
    public oneDriveSyncDatabase(files?: string[], output?: Output, metadata_runtime = false): OneDriveSyncEngineRecord[] {
        let db: OneDriveSyncEngineRecord[] = [];
        // Check if we only want to parse a specific database
        if (files !== undefined) {
            for (const entry of files) {
                const values = extractSyncEngine(entry);
                if (values instanceof ApplicationError) {
                    console.error(`${values}`);
                    continue;
                }
                if (output !== undefined) {
                    if (metadata_runtime) {
                        outputResults(values, "onedrive_syncdb", output);
                    } else {
                        dumpData(values, "onedrive_syncdb", output);
                    }
                    continue;
                }
                db = db.concat(values);
            }
            return db;
        }

        // Parse all databases
        for (const profile of this.profiles) {
            for (const entry of profile.sync_db) {
                const values = extractSyncEngine(entry);
                if (values instanceof ApplicationError) {
                    console.error(`${values}`);
                    continue;
                }
                if (output !== undefined) {
                    if (metadata_runtime) {
                        outputResults(values, "onedrive_syncdb", output);
                    } else {
                        dumpData(values, "onedrive_syncdb", output);
                    }
                    continue;
                }
                db = db.concat(values);
            }
        }
        return db;
    }

    /**
     * Function that parses and timelines all OneDrive artifacts
     * @param output `Object` object to output results
     */
    public oneDriveRetrospect(output: Output): void {
        this.oneDriveLogs(undefined, output);
        this.oneDriveSyncDatabase(undefined, output);
        this.oneDriveAccounts(undefined, output);
    }

    /**
     * Setup OneDrive paths for all users or specific user if provided
     * @returns Nothing
     */
    private setupProfiles(): void {
        if (this.platform === PlatformType.Darwin) {
            const base_users = `/Users/${this.user}`;
            const all_users = glob(base_users);
            if (all_users instanceof FileError) {
                return;
            }

            for (const user of all_users) {
                const profile: OnedriveProfile = {
                    sync_db: [],
                    odl_files: [],
                    key_file: [],
                    config_file: [],
                };
                const odl_glob = `${user.full_path}/Library/Logs/OneDrive/*/*odl*`;
                profile.odl_files = this.getFiles(odl_glob);

                const sync_glob = `${user.full_path}/Library/Application Support/OneDrive/settings/*/SyncEngineDatabase.db`;
                profile.sync_db = this.getFiles(sync_glob);

                const key_glob = `${user.full_path}/Library/Logs/OneDrive/*/general.keystore`;
                profile.key_file = this.getFiles(key_glob);

                const config_glob = `${user.full_path}/Library/Group Containers/*.OneDriveStandaloneSuite/Library/Preferences/*.OneDriveStandaloneSuite.plist`;
                profile.config_file = this.getFiles(config_glob);

                if (profile.config_file.length === 0 &&
                    profile.key_file.length === 0 &&
                    profile.odl_files.length === 0 &&
                    profile.sync_db.length === 0) {
                    continue;
                }
                this.profiles.push(profile);
            }
        }

        let drive = getEnvValue("HOMEDRIVE");
        if (drive === "") {
            drive = "C:"
        }
        const base_users = `${drive}\\Users\\${this.user}`;
        const all_users = glob(base_users);
        if (all_users instanceof FileError) {
            return;
        }

        for (const user of all_users) {
            const profile: OnedriveProfile = {
                sync_db: [],
                odl_files: [],
                key_file: [],
                config_file: [],
            };

            const odl_glob = `${user.full_path}\\AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\*odl*`;
            profile.odl_files = this.getFiles(odl_glob);

            const sync_glob = `${user.full_path}\\AppData\\Local\\Microsoft\\OneDrive\\settings\\*\\SyncEngineDatabase.db`;
            profile.sync_db = this.getFiles(sync_glob);

            const key_glob = `${user.full_path}\\AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\general.keystore`
            profile.key_file = this.getFiles(key_glob);

            const config_glob = `${user.full_path}\\NTUSER.*`;

            profile.config_file = this.getFiles(config_glob);
            if (profile.key_file.length === 0 &&
                profile.odl_files.length === 0 &&
                profile.sync_db.length === 0) {
                continue;
            }
            this.profiles.push(profile);
        }


    }

    /**
     * Function to get file artifacts associated with OneDrive
     * @param glob_string Glob string that points to files associated with OneDrive artifacts
     * @returns Array of strings
     */
    private getFiles(glob_string: string): string[] {
        const files: string[] = [];
        const glob_files = glob(glob_string);
        if (glob_files instanceof FileError) {
            return [];
        }

        for (const entry of glob_files) {
            if (entry.filename.toLocaleLowerCase().includes("ntuser.dat") &&
                !entry.filename.toLocaleLowerCase().endsWith("dat")) {
                continue;
            }
            files.push(entry.full_path);
        }

        return files;
    }
}

/**
 * Function to test the OneDrive class
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the OneDrive parsing
 */
export function testOneDrive(): void {
    const test = "../../tests/test_data/DFIRArtifactMuseum/onedrive/24.175.0830.0001/mock";
    const client = new OneDrive(PlatformType.Windows, undefined, test);

    const status = client.oneDriveLogs();
    if (status.length !== 367) {
        throw `Got '${status.length}' expected "367".......OneDrive ❌`
    }

    const sync = client.oneDriveSyncDatabase();
    if (sync.length !== 43) {
        throw `Got '${sync.length}' expected "43".......OneDrive ❌`
    }

    const account = client.oneDriveAccounts();
    if (account.length !== 0) {
        throw `Got '${account.length}' expected "0".......OneDrive ❌`
    }

    const key = client.oneDriveKeys();
    if (key.length !== 1) {
        throw `Got '${key.length}' expected "1"......OneDrive ❌`
    }

    console.info(`  Mock OneDrive Class ✅`);
}