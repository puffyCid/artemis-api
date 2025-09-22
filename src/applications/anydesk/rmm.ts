import { glob, PlatformType, readTextFile } from "../../../mod";
import { AnyDeskUsers, TraceEntry } from "../../../types/applications/anydesk";
import { GlobInfo } from "../../../types/filesystem/globs";
import { FileError } from "../../filesystem/errors";
import { ApplicationError } from "../errors";
import { readTrace } from "./trace";

export class AnyDesk {
    private paths: AnyDeskUsers[];
    private platform: PlatformType;

    /**
     * Construct a `AnyDesk` object that can be used to parse AnyDesk data
     * @param platform OS `PlatformType`
     * @param alt_path Optional alternative directory that contains all AnyDesk related files
     * @returns `AnyDesk` instance class
     */
    constructor (platform: PlatformType, alt_path?: string) {
        this.platform = platform;

        // Get AnyDesk data based on PlatformType
        if (alt_path === undefined) {
            const results = this.profiles(platform);
            if (results instanceof ApplicationError) {
                return;
            }

            this.paths = results;
            return;
        }

        // Use provided directory any get some info
        const client_version = this.version(this.platform, alt_path);
        if (client_version instanceof ApplicationError) {
            return;
        }
        const client_account = this.account(this.platform, alt_path);
        if (client_account instanceof ApplicationError) {
            return;
        }
        const client_id = this.id(this.platform, alt_path);
        if (client_id instanceof ApplicationError) {
            return;
        }

        this.paths = [ { user_path: alt_path, version: client_version, account: client_account, id: client_id } ];
    }

    /**
     * Function to parse AnyDesk trace files. By default parses trace files at AnyDesk default paths
     * @param is_alt If you have provided an optional alternative directory containing the AnyDesk files. Set this to true
     * @returns Array of `TraceEntry`
     */
    public traceFiles(is_alt = false): TraceEntry[] {
        let system = "/var/log/anydesk.trace";

        let separator = "/";
        if (this.platform === PlatformType.Windows) {
            separator = "\\";
            system = "TODO";
        }

        let hits: TraceEntry[] = [];
        if (is_alt && this.paths.length === 1) {
            const entries = glob(`${this.paths[ 0 ].user_path}${separator}*`);
            if (entries instanceof FileError) {
                console.error(entries);
                return hits;
            }
            for (const entry of entries) {
                const values = readTrace(entry.full_path, this.paths[ 0 ]);
                if (values instanceof ApplicationError) {
                    console.error(values);
                    continue;
                }

                hits = hits.concat(values);
            }
            return hits;
        }

        for (const entry of this.paths) {
            let path = `${entry.user_path}${separator}anydesk.trace`;
            const values = readTrace(path, entry);
            if (values instanceof ApplicationError) {
                console.error(values);
                continue;
            }

            hits = hits.concat(values);
        }
        if (this.paths.length !== 0) {
            const values = readTrace(system, this.paths[ 0 ]);
            if (values instanceof ApplicationError) {
                console.error(values);
                return hits;
            }
            hits = hits.concat(values);
        }

        return hits;

    }

    /**
        * Get base path for all AnyDesk data
        * @param platform OS `PlatformType`
        * @returns Array of `AnyDeskUsers` or `ApplicationError`
        */
    private profiles(platform: PlatformType): AnyDeskUsers[] | ApplicationError {
        let paths: GlobInfo[] = [];
        switch (platform) {
            case PlatformType.Linux: {
                const linux_paths = glob("/home/*/.anydesk");
                if (linux_paths instanceof FileError) {
                    return new ApplicationError(
                        "ANYDESK",
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

        const clients: AnyDeskUsers[] = [];
        for (const entry of paths) {
            if (!entry.is_directory) {
                continue;
            }
            const client_version = this.version(this.platform, entry.full_path);
            if (client_version instanceof ApplicationError) {
                continue;
            }

            const client_account = this.account(this.platform, entry.full_path);
            if (client_account instanceof ApplicationError) {
                continue;
            }

            const client_id = this.id(this.platform, entry.full_path);
            if (client_id instanceof ApplicationError) {
                continue;
            }

            const profile: AnyDeskUsers = {
                user_path: entry.full_path,
                version: client_version,
                account: client_account,
                id: client_id
            };

            clients.push(profile);
        }
        return clients;
    }

    /**
     * Function to determine AnyDesk client version
     * @param platform OS `PlatformType`
     * @param path Path to base AnyDesk user config
     * @returns Version string or `ApplicationError`
     */
    private version(platform: PlatformType, path: string): string | ApplicationError {
        let version_path = `${path}/user.conf`;
        if (platform === PlatformType.Windows) {
            version_path = `${path}\\user.conf`;
        }

        const text_data = readTextFile(version_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`ANYDESK`, `could not read ${version_path}: ${text_data}`);
        }

        const version_regex = /ad\.ui\.install\.new_update=.*/;
        const match = text_data.match(version_regex);
        if (match === null) {
            return new ApplicationError(`ANYDESK`, `could not match version regex`);
        }

        const version_line = match?.at(0);
        if (version_line === undefined) {
            return new ApplicationError(`ANYDESK`, `could not find version line got undefined`);
        }

        const version_string = version_line.split("=").at(1);
        if (version_string === undefined) {
            return new ApplicationError(`ANYDESK`, `could not find version got undefined`);
        }

        return version_string;
    }

    /**
     * Function to determine AnyDesk client account
     * @param platform OS `PlatformType`
     * @param path Path to base AnyDesk user config
     * @returns Account string or `ApplicationError`
     */
    private account(platform: PlatformType, path: string): string | ApplicationError {
        let account_path = `${path}/user.conf`;
        if (platform === PlatformType.Windows) {
            account_path = `${path}\\user.conf`;
        }

        const text_data = readTextFile(account_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`ANYDESK`, `could not read ${account_path}: ${text_data}`);
        }

        const account_regex = /ad\.account\.recent_logged_in_user=.*/;
        const match = text_data.match(account_regex);
        if (match === null) {
            return new ApplicationError(`ANYDESK`, `could not match account regex`);
        }

        const account_line = match?.at(0);
        if (account_line === undefined) {
            return new ApplicationError(`ANYDESK`, `could not find account line got undefined`);
        }

        const account_string = account_line.split("=").at(1);
        if (account_string === undefined) {
            return new ApplicationError(`ANYDESK`, `could not find account got undefined`);
        }

        return account_string;
    }

    /**
     * Function to determine AnyDesk client ID
     * @param platform OS `PlatformType`
     * @param path Path to base AnyDesk user config
     * @returns ID string or `ApplicationError`
     */
    private id(platform: PlatformType, path: string): string | ApplicationError {
        let id_path = `${path}/system.conf`;
        if (platform === PlatformType.Windows) {
            id_path = `${path}\\system.conf`;
        }

        const text_data = readTextFile(id_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`ANYDESK`, `could not read ${id_path}: ${text_data}`);
        }

        const id_regex = /ad\.anynet\.id=.*/;
        const match = text_data.match(id_regex);
        if (match === null) {
            return new ApplicationError(`ANYDESK`, `could not match id regex`);
        }

        const id_line = match?.at(0);
        if (id_line === undefined) {
            return new ApplicationError(`ANYDESK`, `could not find id line got undefined`);
        }

        const id_string = id_line.split("=").at(1);
        if (id_string === undefined) {
            return new ApplicationError(`ANYDESK`, `could not find id got undefined`);
        }

        return id_string;
    }
}