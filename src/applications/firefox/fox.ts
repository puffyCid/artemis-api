import { FirefoxAddons, FirefoxCookies, FirefoxDownloads, FirefoxFavicons, FirefoxFormHistory, FirefoxHistory, FirefoxProfiles, FirefoxStorage } from "../../../types/applications/firefox";
import { GlobInfo } from "../../../types/filesystem/globs";
import { getEnvValue } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile } from "../../filesystem/files";
import { SystemError } from "../../system/error";
import { dumpData, Output } from "../../system/output";
import { PlatformType } from "../../system/systeminfo";
import { ApplicationError } from "../errors";
import { firefoxAddons } from "./addons";
import { firefoxCookies, firefoxDownloads, firefoxFavicons, firefoxFormhistory, firefoxHistory, firefoxStorage } from "./sqlite";

/**
 * Class to extract Firefox information
 */
export class FireFox {
    private paths: FirefoxProfiles[] = [];
    private platform: PlatformType;
    private unfold: boolean;

    /**
     * Construct a `FireFox` object that can be used to parse browser data
     * @param platform OS `PlatformType`
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory contain FireFox data
     * @returns `FireFox` instance class
     */
    constructor(platform: PlatformType, unfold = false, alt_path?: string) {
        this.platform = platform;
        this.unfold = unfold;
        if (alt_path === undefined) {
            const results = this.profiles(platform);
            if (results instanceof ApplicationError) {
                return;
            }
            this.paths = results;
            return;
        }
        const fox_version = this.version(this.platform, alt_path);
        if (fox_version instanceof ApplicationError) {
            return;
        }

        this.paths = [{
            full_path: alt_path,
            version: fox_version
        }];
    }

    /**
     * Extract FireFox history
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FirefoxHistory` 
     */
    public history(offset = 0, limit = 100): FirefoxHistory[] {
        return firefoxHistory(this.paths, this.platform, this.unfold, offset, limit);
    }

    /**
     * Extract FireFox cookies
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FirefoxCookies` 
     */
    public cookies(offset = 0, limit = 100): FirefoxCookies[] {
        return firefoxCookies(this.paths, this.platform, offset, limit);
    }

    /**
     * Extract FireFox downloads
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FirefoxDownloads` 
     */
    public downloads(offset = 0, limit = 100): FirefoxDownloads[] {
        return firefoxDownloads(this.paths, this.platform, offset, limit);
    }

    /**
     * Extract FireFox addons
     * @returns Array of `JSON` objects 
     */
    public addons(): FirefoxAddons[] {
        return firefoxAddons(this.paths, this.platform);
    }

    /**
     * Function to extract entries from `storage.sqlite`
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FirefoxStorage` 
     */
    public storage(offset = 0, limit = 100): FirefoxStorage[] {
        return firefoxStorage(this.paths, this.platform, offset, limit);
    }

    /**
     * Function to extract favicon entries
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FirefoxFavicons`
     */
    public favicons(offset = 0, limit = 100): FirefoxFavicons[] {
        return firefoxFavicons(this.paths, this.platform, offset, limit);
    }

    /**
     * Function to extract form history entries
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `FirefoxFormHistory`
     */
    public formHistory(offset = 0, limit = 100): FirefoxFormHistory[] {
        return firefoxFormhistory(this.paths, this.platform, offset, limit);
    }

    /**
    * Function to timeline all Firefox artifacts. Similar to [Hindsight](https://github.com/obsidianforensics/hindsight)
    * @param output `Output` structure object. Format type should be either `JSON` or `JSONL`. `JSONL` is recommended
    */
    public retrospect(output: Output): void {
        let offset = 0;
        const limit = 100;

        while (true) {
            const entries = this.history(offset, limit);
            if (entries.length === 0) {
                break;
            }
            if (!this.unfold) {
                entries.forEach(x => delete x["unfold"]);
            }
            const status = dumpData(entries, `retrospect_firefox_history`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline firefox history: ${status}`);
            }
            offset += limit;
        }

        offset = 0;

        while (true) {
            const entries = this.cookies(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_firefox_cookies`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline firefox cookies: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.favicons(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_firefox_favicons`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline firefox favicons: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.storage(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_firefox_storage`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline firefox storage: ${status}`);
            }
            offset += limit;
        }

        offset = 0;
        while (true) {
            const entries = this.formHistory(offset, limit);
            if (entries.length === 0) {
                break;
            }
            const status = dumpData(entries, `retrospect_firefox_formhistory`, output);
            if (status instanceof SystemError) {
                console.error(`Failed timeline firefox form history: ${status}`);
            }
            offset += limit;
        }

        const ext = this.addons();
        const status = dumpData(ext, `retrospect_firefox_extensions`, output);
        if (status instanceof SystemError) {
            console.error(`Failed timeline firefox extensions: ${status}`);
        }
    }

    /**
     * Get base path for all FireFox data
     * @param platform OS `PlatformType`
     * @returns Array of `FirefoxProfiles` or `ApplicationError`
     */
    private profiles(platform: PlatformType): FirefoxProfiles[] | ApplicationError {
        let paths: GlobInfo[] = [];
        switch (platform) {
            case PlatformType.Darwin: {
                const mac_paths = glob(
                    `/Users/*/Library/Application Support/Firefox/Profiles/*/`,
                );
                if (mac_paths instanceof FileError) {
                    return new ApplicationError(
                        "FIREFOX",
                        `failed to glob macos paths: ${mac_paths}`,
                    );
                }
                paths = mac_paths;
                break;
            }
            case PlatformType.Windows: {
                let drive = getEnvValue("SystemDrive");
                if (drive === "") {
                    drive = "C:";
                }
                const win_paths = glob(
                    `${drive}\\Users\\*\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\*\\`,
                );
                if (win_paths instanceof FileError) {
                    return new ApplicationError(
                        "FIREFOX",
                        `failed to glob windows paths: ${win_paths}`,
                    );
                }
                paths = win_paths;
                break;
            }
            case PlatformType.Linux: {
                // FireFox can now exist in two possible locations. Newer versions are under .config
                const config_paths = [`/home/*/.mozilla/firefox/*/`, `/home/*/.config/mozilla/firefox/*/`];
                for (const entry of config_paths) {
                    const linux_paths = glob(entry);
                    if (linux_paths instanceof FileError) {
                        continue;
                    }
                    paths = paths.concat(linux_paths);
                }
                break;
            }
            default: {
                return [];
            }
        }

        const firefox_profiles: FirefoxProfiles[] = [];
        for (const entry of paths) {
            if (!entry.is_directory) {
                continue;
            }
            const fox_version = this.version(this.platform, entry.full_path);
            if (fox_version instanceof ApplicationError) {
                continue;
            }

            const profile: FirefoxProfiles = {
                full_path: entry.full_path,
                version: fox_version,
            };

            firefox_profiles.push(profile);
        }
        return firefox_profiles;
    }

    /**
     * Function to determine FireFox version
     * @param platform OS `PlatformType`
     * @param path Path to base FireFox user profile
     * @returns Version number or `ApplicationError`
     */
    private version(platform: PlatformType, path: string): string | ApplicationError {
        let version_path = `${path}/prefs.js`;
        if (platform === PlatformType.Windows) {
            version_path = `${path}\\prefs.js`;
        }
        const text_data = readTextFile(version_path);
        if (text_data instanceof FileError) {
            return new ApplicationError(`FIREFOX`, `could not read ${version_path}: ${text_data}`);
        }

        const version_regex = /user_pref\("extensions.lastAppVersion".*/;
        const match = text_data.match(version_regex);
        if (match === null) {
            return new ApplicationError(`FIREFOX`, `could not match version regex`);
        }
        const version_line = match?.at(0);
        if (version_line === undefined) {
            return new ApplicationError(`FIREFOX`, `could not find version line got undefined`);
        }

        const version_string = version_line.split(",").at(1);
        if (version_string === undefined) {
            return new ApplicationError(`FIREFOX`, `could not find version got undefined`);
        }

        const version_value = version_string.replace(" ", "").replaceAll('"', "").replace(")", "").replace(";", "");
        return version_value;
    }
}