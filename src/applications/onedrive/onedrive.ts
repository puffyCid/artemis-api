import { dumpData, glob, Output, outputResults, PlatformType, readTextFile } from "../../../mod";
import { KeyInfo, OneDriveLog, OnedriveProfile } from "../../../types/applications/onedrive";
import { getEnvValue } from "../../environment/mod";
import { FileError } from "../../filesystem/errors";
import { ApplicationError } from "../errors";
import { readOdlFiles } from "./odl";

/**
 * TODO:
 * 1. Sync db
 * 2. config files (regitry and plist)
 * 3. tests?
 *    - odl file
 *    - key file (random key)
 *    - slimmed down db?
 *    - ntuser registry file?
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
    public parseOnedriveLogs(files?: string[], output?: Output, metadata_runtime = false): OneDriveLog[] {
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