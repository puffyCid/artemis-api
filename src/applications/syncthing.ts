import { Accessor, readLines } from "../../mod";
import { SyncthingLogs, SyncthingProfile } from "../../types/applications/syncthing";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../types/filesystem/accessor";
import { getSystemDrive } from "../environment/env";
import { FileError } from "../filesystem/errors";
import { DirectoryTree } from "../filesystem/tree";
import { detectPlatform, PlatformType } from "../system/systeminfo";

/**
 * Class to extract Syncthing information
 */
export class Syncthing {
    private profiles: SyncthingProfile[] = [];
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;

    /**
     * Construct a `Syncthing` object that can be used to parse Syncthing logs
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing Epiphany data. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing Epiphany data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
     * @param alt_path Optional alternative path to Syncthing directory
     * @returns `Syncthing` instance class
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
            // We want the base directory for Syncthing artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const profile: SyncthingProfile = {
                tree,
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Parse the plaintext Syncthing logs
     * @returns Array of `SyncthingLogs`
     */
    public logs(): SyncthingLogs[] {
        const logs: SyncthingLogs[] = [];
        for (const profile of this.profiles) {
            const entry = profile.tree.file("syncthing.log");
            if (entry instanceof FileError) {
                continue;
            }
            const limit = 1000;
            let offset = 0;
            while (true) {
                const lines = readLines(entry.handle, offset, limit);
                offset += limit;
                if (lines instanceof FileError || lines.length === 0) {
                    break;
                }

                for (const line of lines) {
                    // Old log format
                    if (line.startsWith("[")) {
                        const value = line.split(" ");
                        const message = value.slice(4).join(" ");
                        const log: SyncthingLogs = {
                            tag: (value[ 0 ] ?? "").replace("[", "").replace("]", ""),
                            datetime: `${(value[ 1 ] ?? "1970-01-01").replaceAll("/", "-")}T${value[ 2 ] ?? "00:00:00"}`,
                            timestamp_desc: "Syncthing Log Entry (Local Time)",
                            level: value[ 3 ] ?? "UNKNOWN",
                            message,
                            artifact: "Syncthing Log",
                            data_type: "application:syncthing:log:entry",
                            evidence: entry.meta.display_path,
                        };
                        logs.push(log);
                        continue;
                    }

                    const value = line.split(" ");
                    const message = value.slice(3).join(" ");
                    const datetime = value.slice(0, 2).join("T");
                    const log: SyncthingLogs = {
                        tag: "",
                        datetime,
                        timestamp_desc: "Syncthing Log Entry (Local Time)",
                        level: value[ 2 ] ?? "UNKNOWN",
                        message,
                        artifact: "Syncthing Log",
                        data_type: "application:syncthing:log:entry",
                        evidence: entry.meta.display_path,
                    };
                    logs.push(log);

                }
            }

        }
        return logs;
    }

    /**
     * Get base path for all Syncthing data
     * @returns Path to Syncthing profile
     */
    private profilePath(): string {
        switch (detectPlatform()) {
            case PlatformType.Linux: return "/home/*/.local/state/syncthing";
            case PlatformType.Darwin: return "/Users/*/Library/Application Support/Syncthing";
            case PlatformType.Windows: return `${getSystemDrive()}\\Users\\*\\AppData\\Local\\Syncthing`;
            default: {
                console.warn(`Unsupported platform. Defaulting to '/home/*/.local/state/syncthing'`);
                return "/home/*/.local/state/syncthing";
            }
        }
    }
}