import { glob, readLines } from "../../mod";
import { SyncthingClient, SyncthingLogs } from "../../types/applications/syncthing";
import { GlobInfo } from "../../types/filesystem/globs";
import { FileError } from "../filesystem/errors";
import { PlatformType } from "../system/systeminfo";
import { ApplicationError } from "./errors";

/**
 * Class to extract Syncthing information
 */
export class Syncthing {
    private paths: SyncthingClient[] = [];
    private platform: PlatformType;

    /**
     * Construct a `Syncthing` object that can be used to parse Syncthing logs
     * @param platform OS `PlatformType`. Currently only Linux is supported
     * @param alt_path Optional alternative path to Syncthing directory
     * @returns `Syncthing` instance class
     */
    constructor (platform: PlatformType.Linux, alt_path?: string) {
        this.platform = platform;
        if (alt_path === undefined) {
            const results = this.profiles();
            if (results instanceof ApplicationError) {
                return;
            }

            this.paths = results;
            return;
        }
        this.paths = [ { full_path: alt_path } ];

    }

    /**
     * Parse the plaintext Syncthing logs
     * @returns Array of `SyncthingLogs`
     */
    public logs(): SyncthingLogs[] {
        const logs: SyncthingLogs[] = [];
        for (const entry of this.paths) {
            let path = `${entry.full_path}/syncthing.log`;
            if (this.platform === PlatformType.Windows) {
                path = `${entry.full_path}\\syncthing.log`;
            }

            const limit = 1000;
            let offset = 0;
            while (true) {
                const lines = readLines(path, offset, limit);
                offset += limit;
                if (lines instanceof FileError || lines.length === 0) {
                    break;
                }

                for (const line of lines) {
                    const value = line.split(" ");
                    const message = value.slice(4).join(" ");
                    const log: SyncthingLogs = {
                        full_path: entry.full_path,
                        tag: (value[ 0 ] ?? "").replace("[", "").replace("]", ""),
                        datetime: `${(value[ 1 ] ?? "1970-01-01").replaceAll("/", "-")}T${value[ 2 ] ?? "00:00:00"}.000Z`,
                        timestamp_desc: "Syncthing Log Entry",
                        level: value[ 3 ] ?? "UNKNOWN",
                        message,
                        artifact: "Syncthing Log",
                        data_type: "application:syncthing:log:entry"
                    };
                    logs.push(log);
                }
            }
        }
        return logs;
    }

    /**
    * Get base path for all Syncthing data
    * @returns Array of `SyncthingClient` or `ApplicationError`
    */
    private profiles(): SyncthingClient[] | ApplicationError {
        let paths: GlobInfo[] = [];
        switch (this.platform) {
            case PlatformType.Linux: {
                const linux_paths = glob("/home/*/.local/state/syncthing");
                if (linux_paths instanceof FileError) {
                    return new ApplicationError(
                        "SYNCTHING",
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
        const clients: SyncthingClient[] = [];
        for (const entry of paths) {
            if (!entry.is_directory) {
                continue;
            }

            const profile: SyncthingClient = {
                full_path: entry.full_path,
            };

            clients.push(profile);
        }
        return clients;
    }
}