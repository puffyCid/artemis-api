import { NextcloudClientActivityLog, NextcloudClientConfig, NextcloudClientProfile, NextcloudClientSyncLog } from "../../../types/applications/nextcloud";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { decompress_gzip } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { extractUtf8String } from "../../encoding/strings";
import { getSystemDrive } from "../../environment/env";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { readTextFile } from "../../filesystem/files";
import { DirectoryTree, isFileEntry } from "../../filesystem/tree";
import { SystemError } from "../../system/error";
import { Output, OutputManager } from "../../system/output";
import { detectPlatform, PlatformType } from "../../system/systeminfo";
import { nextcloudActivityLogs } from "./logs/activity";
import { nextcloudSyncLogs } from "./logs/sync";

/**
 * Class to extract NextCloud client information
 */
export class NextcloudClient {
    private profiles: NextcloudClientProfile[] = [];
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;

    /**
     * Construct a `NextcloudClient` object that can be used to parse NextcloudClient logs
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing Epiphany data. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing Epiphany data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
     * @param alt_path Optional alternative path to NextcloudClient directory
     * @returns `NextcloudClient` instance class
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
            // We want the base directory for NextCloud client artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const profile: NextcloudClientProfile = {
                tree,
                version: this.version(tree)
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Parses the most recent NextCloud client config file
     * @returns Array of `NextcloudConfig`
     */
    public config(): NextcloudClientConfig[] {
        const configs: NextcloudClientConfig[] = [];

        for (const profile of this.profiles) {
            const cfg_file = profile.tree.file("nextcloud.cfg");
            if (cfg_file instanceof FileError) {
                continue;
            }
            const text = readTextFile(cfg_file.handle);
            if (text instanceof FileError) {
                console.warn(`Failed to read NextCloud client config '${cfg_file.meta.display_path}': ${text}`);
                continue;
            }

            const text_data = readTextFile(cfg_file.handle);
            if (text_data instanceof FileError) {
                continue;
            }

            const client_config: NextcloudClientConfig = {
                client_version: profile.version,
                url: "",
                user: "",
                display_name: "",
                local_path: "",
                evidence: cfg_file.meta.display_path,
            };

            const regex_strings: RegExp[] = [ /localPath=.*/, /webflow_user=.*/, /url=.*/, /displayName=.*/ ];
            for (let i = 0; i < regex_strings.length; i++) {
                const regex_value = regex_strings[ i ];
                if (regex_value === undefined) {
                    continue;
                }
                const match = text_data.match(regex_value);
                if (match === null) {
                    continue;
                }

                const version_line = match?.at(0);
                if (version_line === undefined) {
                    continue;
                }

                const match_string = version_line.split("=").at(1);
                if (match_string === undefined) {
                    continue;
                }

                switch (i) {
                    case 0: {
                        client_config.local_path = match_string;
                        break;
                    }
                    case 1: {
                        client_config.user = match_string;
                        break;
                    }
                    case 2: {
                        client_config.url = match_string;
                        break;
                    }
                    case 3: {
                        client_config.display_name = match_string;
                        break;
                    }
                    default: continue;
                }
            }
            configs.push(client_config);
        }

        return configs;
    }

    /**
     * Parse NextCloud client sync logs
     * @param max_size Specify max log size to parse. Default is 15MB
     * @returns Array of `NextcloudClientSyncLog`
     */
    public syncLogs(max_size = 15728640): NextcloudClientSyncLog[] {
        let sync: NextcloudClientSyncLog[] = [];
        for (const profile of this.profiles) {
            const log = profile.tree.file("Nextcloud_sync.log");
            if (log instanceof FileError || log.meta.size > max_size) {
                continue;
            }

            const text = readTextFile(log.handle);
            if (text instanceof FileError) {
                continue;
            }

            sync = sync.concat(nextcloudSyncLogs(text, profile.version, log.meta.display_path));

        }

        return sync;
    }

    /**
     * Parse Nextcloud client activity logs. There may be more than one. Sometimes the logs will be compressed with gzip.  
     * This function will decompress gzip logs.
     * @param max_size Specify max log size to parse. Default is 18MB. At ~15MB the logs will be compressed with gzip.
     * @returns Array of `NextcloudClientActivityLog`
     */
    public activityLogs(max_size = 18874368): NextcloudClientActivityLog[] {
        let activity: NextcloudClientActivityLog[] = [];
        for (const profile of this.profiles) {
            const matches = profile.tree.glob("logs/*nextcloud*.log*");
            if (matches instanceof FileError) {
                continue;
            }

            for (const entry of matches) {
                if (!isFileEntry(entry) || this.source instanceof FileError || entry.meta.size > max_size) {
                    continue;
                }

                if (entry.meta.extension === "gz") {
                    const bytes = this.accessor.sourceReadFileHandle(this.source, entry.handle);
                    if (bytes instanceof FileError) {
                        continue;
                    }

                    const decom_bytes = decompress_gzip(bytes);
                    if (decom_bytes instanceof CompressionError) {
                        continue;
                    }

                    const text = extractUtf8String(decom_bytes);
                    activity = activity.concat(nextcloudActivityLogs(text, entry.meta.display_path));
                    continue;
                }

                const text_data = readTextFile(entry.handle);
                if (text_data instanceof FileError) {
                    continue;
                }

                activity = activity.concat(nextcloudActivityLogs(text_data, entry.meta.display_path));
            }
        }

        return activity;
    }

    public retrospect(format: Output): void {
        const manager = new OutputManager(format);
        const sync = this.syncLogs();
        let status = manager.write_artifact(sync, "retrospect_nextcloud_client_sync");
        if (status instanceof SystemError) {
            console.error(`Failed timeline NextCloud client sync logs: ${status}`);
        }

        const activity = this.activityLogs();
        status = manager.write_artifact(activity, "retrospect_nextcloud_client_activity");
        if (status instanceof SystemError) {
            console.error(`Failed timeline NextCloud client activity logs: ${status}`);
        }
    }

    /**
     * Grab basic profile information for installed NextCloud client application
     * @returns Base path to NextCloud client application
     */
    private profilePath(): string {
        switch (detectPlatform()) {
            case PlatformType.Linux: return "/home/*/.config/Nextcloud";
            case PlatformType.Windows: return `${getSystemDrive()}\\Users\\*\\AppData\\Roaming\\Nextcloud`;
            case PlatformType.Darwin: return "/Users/*/Library/Containers/com.nextcloud.desktopclient/Data/Library/Preferences/Nextcloud/";
            default: {
                console.warn(`Unsupported platform. Defaulting to '/home/*/.config/Nextcloud'`);
                return "/home/*/.config/Nextcloud";
            }
        }
    }

    /**
 * Function to determine Nextcloud client version
 * @param tree `DirectoryTree` object
 * @returns Version string or `ApplicationError`
 */
    private version(tree: DirectoryTree): string {
        const cfg_file = tree.file("nextcloud.cfg");
        if (cfg_file instanceof FileError) {
            return "Unknown";
        }
        const text = readTextFile(cfg_file.handle);
        if (text instanceof FileError) {
            console.warn(`Failed to read NextCloud client config '${cfg_file.meta.display_path}': ${text}`);
            return "Unknown";
        }

        const version_regex = /clientVersion=.*/;
        const match = text.match(version_regex);
        if (match === null) {
            return "Unknown";
        }

        const version_line = match?.at(0);
        if (version_line === undefined) {
            return "Unknown";
        }

        const version_string = version_line.split("=").at(1);
        if (version_string === undefined) {
            return "Unknown";
        }

        return version_string;
    }
}