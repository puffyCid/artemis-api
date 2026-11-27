import { Output, PlatformType, readTextFile, Accessor, OutputManager } from "../../../mod";
import { KeyInfo, OneDriveAccount, OneDriveLog, OnedriveProfile, OneDriveSyncEngineRecord } from "../../../types/applications/onedrive";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { DirectoryTree, isFileEntry } from "../../filesystem/tree";
import { SystemError } from "../../system/error";
import { detectPlatform } from "../../system/systeminfo";
import { ApplicationError } from "../errors";
import { accountMacos, accountWindows } from "./config";
import { readOdlFiles } from "./odl";
import { extractSyncEngine } from "./sqlite";

/**
 * Class to parse OneDrive artifacts
 */
export class OneDrive {
    private profiles: OnedriveProfile[] = [];
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;
    private platform: PlatformType = PlatformType.Windows;

    /**
     * Construct an `OneDrive` object that can parse all OneDrive supported artifacts for all users
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing OneDrive data. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing OneDrive data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
     * @param alt_path Optional alternative path to OneDrive directory
     * @returns `OneDrive` instance class
     */
    constructor (protocol = AccessorProtocol.Host, source_path = "host:", alt_path?: string) {
        this.protocol = protocol;
        const pattern = alt_path ?? this.profilePath();

        this.source = this.accessor.openSource(source_path, this.protocol);
        if (this.source instanceof FileError) {
            return;
        }

        const matches = this.accessor.sourceGlobfs(this.source, pattern);
        if (matches instanceof FileError) {
            return;
        }

        for (const entry of matches) {
            // We want the base directory for OneDrive artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const profile: OnedriveProfile = {
                tree,
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Function to parse OneDrive key files. 
    * @returns Array of `KeyInfo`
     */
    public keys(): KeyInfo[] {
        const keys: KeyInfo[] = [];
        const pattern = this.platform === PlatformType.Windows ? "AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\general.keystore" : "Library/Logs/OneDrive/*/general.keystore";

        for (const profile of this.profiles) {
            const matches = profile.tree.glob(pattern);
            if (matches instanceof FileError) {
                continue;
            }

            for (const entry of matches) {
                if (!isFileEntry(entry)) {
                    continue;
                }

                const text = readTextFile(entry.handle);
                if (text instanceof FileError) {
                    console.warn(`Failed to read OneDrive key file '${entry.meta.display_path}': ${text}`);
                    continue;
                }

                const key: KeyInfo = {
                    evidence: entry.meta.display_path,
                    key: "",
                };

                try {
                    const values = JSON.parse(text) as Record<string, string | number>[];
                    for (const value of values) {
                        if (typeof value[ "key" ] === 'string') {
                            key.key = value[ "key" ];
                            break;
                        }
                    }
                } catch (e) {
                    console.warn(`Failed to parse OneDrive key file '${entry.meta.display_path}': ${e}`);
                    continue;
                }
            }
        }
        return keys;
    }

    /**
     * Function to parse OneDrive Log (ODL) files
     * @returns Array of `OneDriveLog`
     */
    public logs(): OneDriveLog[] {
        let logs: OneDriveLog[] = [];
        const pattern = this.platform === PlatformType.Windows ? "AppData\\Local\\Microsoft\\OneDrive\\logs\\*\\*odl*" : "Library/Logs/OneDrive/*/*odl*";

        for (const profile of this.profiles) {
            const matches = profile.tree.glob(pattern);
            if (matches instanceof FileError) {
                continue;
            }

            for (const entry of matches) {
                if (!isFileEntry(entry) || this.source instanceof FileError) {
                    continue;
                }

                const values = readOdlFiles(entry, this.source, this.accessor);
                if (values instanceof ApplicationError) {
                    continue;
                }
                logs = logs.concat(values);

            }
        }

        return logs;
    }

    /**
     * Function to parse OneDrive Account info
     * @returns Array of `OneDriveAccount`
     */
    public accounts(): OneDriveAccount[] {
        let accounts: OneDriveAccount[] = [];
        const pattern = this.platform === PlatformType.Windows ? " [Nn][Tt][Uu][Ss][Ee][Rr].[Dd][Aa][Tt]" : "Library/Group Containers/*.OneDriveStandaloneSuite/Library/Preferences/*.OneDriveStandaloneSuite.plist";

        for (const profile of this.profiles) {
            const matches = profile.tree.glob(pattern);
            if (matches instanceof FileError) {
                continue;
            }

            for (const entry of matches) {
                if (!isFileEntry(entry) || this.source instanceof FileError) {
                    continue;
                }

                const account = this.platform === PlatformType.Windows ? accountWindows(entry) : accountMacos(entry, this.accessor, this.source);
                if (account instanceof ApplicationError) {
                    console.warn(`Failed to parse OneDrive account '${entry.meta.display_path}': ${account}`);
                    continue;
                }

                accounts = accounts.concat(account);
            }
        }
        return accounts;
    }

    /**
     * Function to parse OneDrive Sync databases
     * @returns Array of `OneDriveSyncEngineRecord`
     */
    public syncDatabase(): OneDriveSyncEngineRecord[] {
        let db: OneDriveSyncEngineRecord[] = [];
        const pattern = this.platform === PlatformType.Windows ? "AppData\\Local\\Microsoft\\OneDrive\\settings\\*\\SyncEngineDatabase.db" : "Library/Application Support/OneDrive/settings/*/SyncEngineDatabase.db";

        for (const profile of this.profiles) {
            const db_file = profile.tree.file(pattern);
            if (db_file instanceof FileError) {
                continue;
            }

            const values = extractSyncEngine(db_file, this.protocol);
            if (values instanceof ApplicationError) {
                console.warn(`Failed to query OneDrive Sync Engine '${db_file.meta.display_path}': ${values}`);
                continue;
            }
            db = db.concat(values);
        }

        return db;
    }

    /**
     * Function that parses and timelines all OneDrive artifacts
     * @param format `Output` object to output results
     */
    public retrospect(format: Output): void {
        const manager = new OutputManager(format);

        const logs = this.logs();
        let status = manager.write_artifact(logs, "retrospect_onedrive_logs");
        if (status instanceof SystemError) {
            console.error(`Failed timeline OneDrive logs: ${status}`);
        }

        const sync = this.syncDatabase();
        status = manager.write_artifact(sync, "retrospect_onedrive_sync_database");
        if (status instanceof SystemError) {
            console.error(`Failed timeline OneDrive sync database: ${status}`);
        }

        const accounts = this.accounts();
        status = manager.write_artifact(accounts, "retrospect_onedrive_accounts");
        if (status instanceof SystemError) {
            console.error(`Failed timeline OneDrive accounts: ${status}`);
        }
    }

    private profilePath(): string {
        const platform = detectPlatform();
        this.platform = platform;
        switch (this.platform) {
            case PlatformType.Windows: return `${getSystemDrive()}\\Users\\*`;
            case PlatformType.Darwin: return "/Users/*";
            default: {
                console.warn(`Unsupported platform. Defaulting to '${getSystemDrive()}\\Users\\*`);
                return `${getSystemDrive()}\\Users\\*`;
            }
        }
    }
}

/**
 * Function to test the OneDrive class
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the OneDrive parsing
 */
export function testOneDrive(): void {
    //let test = "../../tests/test_data/DFIRArtifactMuseum/onedrive/24.175.0830.0001/mock";
    const client = new OneDrive();

    const status = client.logs();
    if (status.length !== 367) {
        throw `Got '${status.length}' expected "367".......OneDrive ❌`;
    }

    const sync = client.syncDatabase();
    if (sync.length !== 43) {
        throw `Got '${sync.length}' expected "43".......OneDrive ❌`;
    }

    const account = client.accounts();
    if (account.length !== 1) {
        throw `Got '${account.length}' expected "1".......OneDrive ❌`;
    }

    if (account[ 0 ]?.account_id !== "aaaaaaaaa") {
        throw `Got '${account[ 0 ]?.account_id}' expected "aaaaaaaaa".......OneDrive ❌`;
    }

    const key = client.keys();
    if (key.length !== 1) {
        throw `Got '${key.length}' expected "1"......OneDrive ❌`;
    }

    console.info(`  Mock OneDrive Class ✅`);
}