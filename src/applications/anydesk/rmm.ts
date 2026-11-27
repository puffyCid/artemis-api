import { Accessor, glob, PlatformType, readTextFile } from "../../../mod";
import { AnyDeskProfile, Config, TraceEntry } from "../../../types/applications/anydesk";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { DirectoryTree } from "../../filesystem/tree";
import { detectPlatform } from "../../system/systeminfo";
import { ApplicationError } from "../errors";
import { readConfig } from "./conf";
import { readTrace } from "./trace";

/**
 * Class to parse AnyDesk data
 */
export class AnyDesk {
    private profiles: AnyDeskProfile[] = [];
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;

    /**
     * Construct a `AnyDesk` object that can be used to parse AnyDesk data
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing AnyDesk data. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing AnyDesk data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
     * @param alt_path Optional alternative path to AnyDesk directory
     * @returns `AnyDesk` instance class
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
            // We want the base directory for AnyDesk artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const version_account = this.version(tree);
            const profile: AnyDeskProfile = {
                tree,
                version: version_account.version,
                account: version_account.account,
                id: this.id(tree),
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Function to parse AnyDesk trace files. By default parses trace files at AnyDesk default paths
     * @param is_alt If you have provided an optional alternative directory containing the AnyDesk files. Set this to true
     * @returns Array of `TraceEntry`
     */
    public traceFiles(is_alt = false): TraceEntry[] {
        let system = "/var/log/*.trace";

        let separator = "/";
        if (this.platform === PlatformType.Windows) {
            separator = "\\";
            system = "TODO";
        }

        let hits: TraceEntry[] = [];
        // If alternative directory was provided then parse all trace files
        if (is_alt && this.paths[ 0 ] !== undefined) {
            const entries = glob(`${this.paths[ 0 ].user_path}${separator}*.trace`);
            if (entries instanceof FileError) {
                console.error(entries);
                return hits;
            }
            for (const entry of entries) {
                if (!entry.is_file) {
                    continue;
                }
                const values = readTrace(entry.full_path, this.paths[ 0 ]);
                hits = hits.concat(values);
            }
            return hits;
        }

        // Try parsing trace files at default paths
        for (const entry of this.paths) {
            const path = `${entry.user_path}${separator}*.trace`;
            const entries = glob(path);
            if (entries instanceof FileError) {
                console.error(entries);
                continue;
            }
            for (const trace_file of entries) {
                if (!trace_file.is_file) {
                    continue;
                }
                const values = readTrace(trace_file.full_path, entry);
                hits = hits.concat(values);
            }
        }
        // Get system trace file(s)
        if (this.paths[ 0 ] !== undefined) {
            const entries = glob(system);
            if (entries instanceof FileError) {
                console.error(entries);
                return hits;
            }
            for (const entry of entries) {
                if (!entry.is_file) {
                    continue;
                }
                const values = readTrace(entry.full_path, this.paths[ 0 ]);
                hits = hits.concat(values);
            }
        }

        return hits;

    }

    /**
     * Function to parse AnyDesk config files. By default parses config files at AnyDesk default paths
     * @param is_alt If you have provided an optional alternative directory containing the AnyDesk files. Set this to true
     * @returns Array of `Config`
     */
    public configs(is_alt = false): Config[] {
        const hits: Config[] = [];

        let separator = "/";
        if (this.platform === PlatformType.Windows) {
            separator = "\\";
        }

        // If alternative directory was provided then parse all trace files
        if (is_alt && this.paths[ 0 ] !== undefined) {
            const entries = glob(`${this.paths[ 0 ].user_path}${separator}*.conf`);
            if (entries instanceof FileError) {
                console.error(entries);
                return hits;
            }
            for (const entry of entries) {
                if (!entry.is_file) {
                    continue;
                }
                const values = readConfig(entry.full_path, this.paths[ 0 ]);
                if (values instanceof ApplicationError) {
                    continue;
                }
                hits.push(values);
            }
            return hits;
        }

        // Try parsing conf files at default paths
        for (const entry of this.paths) {
            const path = `${entry.user_path}${separator}*.conf`;
            const entries = glob(path);
            if (entries instanceof FileError) {
                console.error(entries);
                continue;
            }
            for (const trace_file of entries) {
                if (!trace_file.is_file) {
                    continue;
                }
                const values = readConfig(trace_file.full_path, entry);
                if (values instanceof ApplicationError) {
                    continue;
                }
                hits.push(values);
            }
        }
        // Get system conf file(s)
        if (this.paths[ 0 ] !== undefined && this.platform === PlatformType.Linux) {
            const system = "/etc/anydesk/*.conf";
            const entries = glob(system);
            if (entries instanceof FileError) {
                console.error(entries);
                return hits;
            }
            for (const entry of entries) {
                if (!entry.is_file) {
                    continue;
                }
                // Get user config
                const values = readConfig(entry.full_path, this.paths[ 0 ]);
                if (values instanceof ApplicationError) {
                    continue;
                }
                hits.push(values);
            }
        }

        return hits;
    }

    private profilePath(): string {
        switch (detectPlatform()) {
            case PlatformType.Linux: return "/home/*/.anydesk";
            case PlatformType.Windows: return `${getSystemDrive()}\\Users\\*\\AppData\\Roaming\\AnyDesk`;
            case PlatformType.Darwin: return "/Users/*/.anydesk";
            default: {
                console.warn(`Unsupported platform. Defaulting to '/home/*/.anydesk'`);
                return "/home/*/.anydesk";
            }
        }
    }

    /**
     * Function to determine AnyDesk client version
     * @param platform OS `PlatformType`
     * @param path Path to base AnyDesk user config
     * @returns Version string or `ApplicationError`
     */
    private version(tree: DirectoryTree): { version: string, account: string; } {
        const file = tree.file("user.conf");
        if (file instanceof FileError) {
            return { version: "Unknown version", account: "Unknown Account" };
        }

        const text = readTextFile(file.handle);
        if (text instanceof FileError) {
            return { version: "Unknown version", account: "Unknown Account" };
        }

        const version_regex = /ad\.ui\.install\.new_update=.*/;
        let match = text.match(version_regex);
        if (match === null) {
            return { version: "Unknown version", account: "Unknown Account" };
        }

        const version_line = match?.at(0);
        if (version_line === undefined) {
            return { version: "Unknown version", account: "Unknown Account" };
        }

        const version = version_line.split("=").at(1);
        if (version === undefined) {
            return { version: "Unknown version", account: "Unknown Account" };
        }

        const account_regex = /ad\.account\.recent_logged_in_user=.*/;
        match = text.match(account_regex);
        if (match === null) {
            return { version, account: "Unknown Account" };
        }

        const account_line = match?.at(0);
        if (account_line === undefined) {
            return { version, account: "Unknown Account" };
        }

        const account = account_line.split("=").at(1);
        if (account === undefined) {
            return { version, account: "Unknown Account" };
        }

        return { version, account };
    }

    /**
     * Function to determine AnyDesk client ID
     * @param tree `DirectoryTree` object
     * @returns ID string
     */
    private id(tree: DirectoryTree): string {
        const file = tree.file("system.conf");
        if (file instanceof FileError) {
            return "Unknown ID";
        }

        const text_data = readTextFile(file.handle);
        if (text_data instanceof FileError) {
            return "Unknown ID";
        }

        const id_regex = /ad\.anynet\.id=.*/;
        const match = text_data.match(id_regex);
        if (match === null) {
            return "Unknown ID";
        }

        const id_line = match?.at(0);
        if (id_line === undefined) {
            return "Unknown ID";
        }

        const id_string = id_line.split("=").at(1);
        if (id_string === undefined) {
            return "Unknown ID";
        }

        return id_string;
    }
}