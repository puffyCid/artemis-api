import { NextcloudClientActivityLog, NextcloudClientConfig, NextcloudClientSyncLog, NextcloudClientUsers } from "../../../types/applications/nextcloud";
import { GlobInfo } from "../../../types/filesystem/globs";
import { decompress_gzip } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { glob, readFile, readTextFile, stat } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { ApplicationError } from "../errors";
import { nextcloudActivityLogs } from "./logs/activity";
import { nextcloudSyncLogs } from "./logs/sync";

/**
 * Class to extract Nextcloud client information
 */
export class NextcloudClient {
    private paths: NextcloudClientUsers[];
    private platform: PlatformType;

    /**
     * Construct a `NextcloudClient` object that can be used to parse client data
     * @param platform OS `PlatformType`
     * @param alt_path Optional alternative to Nextcloud client config directory
     * @returns `NextcloudClient` instance class
     */
    constructor (platform: PlatformType.Linux, alt_path?: string) {
        this.platform = platform;

        if (alt_path === undefined) {
            const results = this.profiles(platform);
            if (results instanceof ApplicationError) {
                return;
            }

            this.paths = results;
            return;
        }

        const client_version = this.version(this.platform, alt_path);
        if (client_version instanceof ApplicationError) {
            return;
        }

        this.paths = [ { full_path: alt_path, version: client_version } ];
    }

    /**
    * Get base path for all Nextcloud clients data
    * @param platform OS `PlatformType`
    * @returns Array of `NextcloudClientUsers` or `ApplicationError`
    */
    private profiles(platform: PlatformType): NextcloudClientUsers[] | ApplicationError {
        let paths: GlobInfo[] = [];
        switch (platform) {
            case PlatformType.Linux: {
                const linux_paths = glob("/home/*/.config/Nextcloud");
                if (linux_paths instanceof FileError) {
                    return new ApplicationError(
                        "NEXTCLOUD_CLIENT",
                        `failed to glob linux paths: ${linux_paths}`,
                    );
                }
                paths = linux_paths;
                break;
            }
            default: {
                return [];
            }
        }

        const clients: NextcloudClientUsers[] = [];
        for (const entry of paths) {
            if (!entry.is_directory) {
                continue;
            }
            const client_version = this.version(this.platform, entry.full_path);
            if (client_version instanceof ApplicationError) {
                continue;
            }

            const profile: NextcloudClientUsers = {
                full_path: entry.full_path,
                version: client_version,
            };

            clients.push(profile);
        }
        return clients;
    }

    /**
     * Function to determine Nextcloud client version
     * @param platform OS `PlatformType`
     * @param path Path to base Nextcloud user config
     * @returns Version string or `ApplicationError`
     */
    private version(platform: PlatformType, path: string): string | ApplicationError {
        let version_path = `${path}/nextcloud.cfg`;
        if (platform === PlatformType.Windows) {
            version_path = `${path}\\nextcloud.cfg`;
        }

        const text_data = readTextFile(version_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`NEXTCLOUD_CLIENT`, `could not read ${version_path}: ${text_data}`);
        }

        const version_regex = /clientVersion=.*/;
        const match = text_data.match(version_regex);
        if (match === null) {
            return new ApplicationError(`NEXTCLOUD_CLIENT`, `could not match version regex`);
        }

        const version_line = match?.at(0);
        if (version_line === undefined) {
            return new ApplicationError(`NEXTCLOUD_CLIENT`, `could not find version line got undefined`);
        }

        const version_string = version_line.split("=").at(1);
        if (version_string === undefined) {
            return new ApplicationError(`NEXTCLOUD_CLIENT`, `could not find version got undefined`);
        }

        return version_string;
    }

    /**
     * Parses the most recent Nextcloud client config file
     * @returns Array of `NextcloudConfig`
     */
    public config(): NextcloudClientConfig[] {
        const configs: NextcloudClientConfig[] = [];

        for (const entry of this.paths) {
            let target = `${entry.full_path}/nextcloud.cfg`;
            if (this.platform === PlatformType.Windows) {
                target = `${entry.full_path}\\nextcloud.cfg`;
            }

            const text_data = readTextFile(target);
            if (text_data instanceof FileError) {
                continue;
            }

            const client_config: NextcloudClientConfig = {
                client_version: entry.version,
                url: "",
                user: "",
                display_name: "",
                local_path: "",
                config_path: target,
            };
            const regex_strings: RegExp[] = [ /localPath=.*/, /webflow_user=.*/, /url=.*/, /displayName=.*/ ];
            for (let i = 0; i < regex_strings.length; i++) {
                const match = text_data.match(regex_strings[ i ]);
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
     * Parse Nextcloud client sync logs
     * @param max_size Specify max log size to parse. Default is 15MB
     * @returns Array of `NextcloudClientSyncLog`
     */
    public syncLogs(max_size = 15728640): NextcloudClientSyncLog[] {
        let sync: NextcloudClientSyncLog[] = [];

        for (const entry of this.paths) {
            let target = `${entry.full_path}/Nextcloud_sync.log`;
            if (this.platform === PlatformType.Windows) {
                target = `${entry.full_path}\\Nextcloud_sync.log`;
            }

            const value = stat(target);
            if (value instanceof FileError || value.size > max_size) {
                continue;
            }

            const text_data = readTextFile(target);
            if (text_data instanceof FileError) {
                continue;
            }

            sync = sync.concat(nextcloudSyncLogs(text_data, entry.version, target));

            // Nextcloud logs may also be at $HOME/.local/share/Nextcloud/Nexcloud_sync.log
            if (this.platform === PlatformType.Linux) {
                const local_path = target.replace(".config", ".local/share");
                const text_data = readTextFile(target);
                if (text_data instanceof FileError) {
                    continue;
                }

                sync = sync.concat(nextcloudSyncLogs(text_data, entry.version, local_path));
            }

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
        for (const entry of this.paths) {
            let target = `${entry.full_path}/logs/*nextcloud*.log*`;
            if (this.platform === PlatformType.Windows) {
                target = `${entry.full_path}\\logs\\*nextcloud*.log*`;
            }

            const hits = glob(target);
            if (hits instanceof FileError) {
                continue;
            }

            for (const hit of hits) {
                const value = stat(hit.full_path);
                if (value instanceof FileError || value.size > max_size) {
                    continue;
                }

                // Older log files will be compressed
                if (hit.full_path.includes(".gz")) {
                    const compressed_bytes = readFile(hit.full_path);
                    if (compressed_bytes instanceof FileError) {
                        continue;
                    }

                    const bytes = decompress_gzip(compressed_bytes);
                    if (bytes instanceof CompressionError) {
                        continue;
                    }

                    const text = extractUtf8String(bytes);
                    activity = activity.concat(nextcloudActivityLogs(text, hit.full_path));
                    continue;
                }

                const text_data = readTextFile(hit.full_path);
                if (text_data instanceof FileError) {
                    continue;
                }

                activity = activity.concat(nextcloudActivityLogs(text_data, hit.full_path));
            }



        }
        return activity;
    }
}