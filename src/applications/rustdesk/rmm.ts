import { glob, PlatformType, readTextFile } from "../../../mod";
import { RustDeskLogs, RustDeskUsers } from "../../../types/applications/rustdesk";
import { FileError } from "../../filesystem/errors";
import { ApplicationError } from "../errors";
import { readLogs } from "./logs";

export class RustDesk {
    private paths: RustDeskUsers[] = [];
    private platform: PlatformType;

    constructor (platform: PlatformType, alt_path?: string) {
        this.platform = platform;

        // Get AnyDesk data based on PlatformType
        if (alt_path === undefined) {
            const results = this.profiles(platform);
            if (results instanceof ApplicationError) {
                return;
            }

            this.paths = results;
            console.log(JSON.stringify(this.paths));
            return;
        }

        const remote_id = this.id(this.platform, alt_path);
        if (remote_id instanceof ApplicationError) {
            return;
        }
        this.paths = [ { config_path: alt_path, version: '', logs_path: alt_path, remote_id } ];

    }

    public logs(is_alt = false): RustDeskLogs[] {
        let separator = "/";
        if (this.platform === PlatformType.Windows) {
            separator = "\\";
        }
        let hits: RustDeskLogs[] = [];

        if (is_alt && this.paths[ 0 ] !== undefined) {
            const entries = glob(`${this.paths[ 0 ].logs_path}${separator}*.log`);
            if (entries instanceof FileError) {
                console.error(entries);
                return hits;
            }
            for (const entry of entries) {
                if (!entry.is_file) {
                    continue;
                }
                const values = readLogs(entry.full_path, this.paths[ 0 ]);
                if (values instanceof ApplicationError) {
                    console.error(values);
                    return hits;
                }
                hits = hits.concat(values);
            }
            return hits;
        }

        // Try parsing log files at default paths
        for (const entry of this.paths) {
            const path = `${entry.logs_path}${separator}*${separator}*`;
            const entries = glob(path);
            if (entries instanceof FileError) {
                console.error(entries);
                continue;
            }
            for (const log_file of entries) {
                if (!log_file.is_file) {
                    continue;
                }
                const values = readLogs(log_file.full_path, entry);
                if (values instanceof ApplicationError) {
                    console.error(values);
                    return hits;
                }
                hits = hits.concat(values);
            }
        }

        return hits;
    }

    private profiles(platform: PlatformType): RustDeskUsers[] | ApplicationError {
        let paths;
        switch (platform) {
            case PlatformType.Linux: {
                const linux_paths = glob("/home/*/.config/rustdesk");
                if (linux_paths instanceof FileError) {
                    return new ApplicationError(
                        "RUSTDESK",
                        `failed to glob linux config paths: ${linux_paths}`,
                    );
                }
                paths = linux_paths;
                break;
            }
            default: {
                return new ApplicationError(
                    "RUSTDESK",
                    `platform not supported: ${platform}`,
                );
            }
        }

        const clients: RustDeskUsers[] = [];

        for (const entry of paths) {
            if (!entry.is_directory) {
                continue;
            }

            const remote_id = this.id(this.platform, entry.full_path);
            if (remote_id instanceof ApplicationError) {
                continue;
            }

            const profile: RustDeskUsers = {
                config_path: entry.full_path,
                logs_path: entry.full_path.replace(".config/rustdesk", ".local/share/logs/RustDesk"),
                version: '',
                remote_id,
            };

            clients.push(profile);
        }
        return clients;
    }

    private id(platform: PlatformType, path: string): string | ApplicationError {
        let id_path = `${path}/RustDesk_local.toml`;
        if (platform === PlatformType.Windows) {
            id_path = `${path}\\RustDesk_local.toml`;
        }

        const text_data = readTextFile(id_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`RUSTDESK`, `could not read ${id_path}: ${text_data}`);
        }

        const id_regex = /remote_id.*/;
        const match = text_data.match(id_regex);
        if (match === null) {
            return new ApplicationError(`RUSTDESK`, `could not match id regex`);
        }

        const id_line = match?.at(0);
        if (id_line === undefined) {
            return new ApplicationError(`RUSTDESK`, `could not find id line got undefined`);
        }

        const id_string = id_line.split("=").at(1);
        if (id_string === undefined) {
            return new ApplicationError(`RUSTDESK`, `could not find id got undefined`);
        }

        return id_string.trim().replaceAll("'", "");
    }
}