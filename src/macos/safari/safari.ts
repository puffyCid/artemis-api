import { PlatformType } from "../../../mod";
import { SafariDownloads, SafariHistory, SafariProfile } from "../../../types/macos/safari";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { MacosError } from "../errors";
import { getPlist } from "../plist";
import { safariDownloads } from "./plist";
import { safariHistory } from "./sqlite";

export class Safari {
    private paths: SafariProfile[];
    private unfold: boolean;
    private platform: PlatformType;


    /**
     * Construct a `Safari` object that can be used to parse browser data
     * @param unfold Attempt to parse URLs. Default is `false`
     * @param alt_path Optional alternative path to directory containing Safari data
     * @returns `Safari` instance class
     */
    constructor (platform: PlatformType, unfold = false, alt_path?: string) {
        this.unfold = unfold;
        this.platform = platform;
        if (alt_path === undefined) {
            const results = this.profiles();
            if (results instanceof MacosError) {
                return;
            }
            this.paths = results;
            return;
        }

        this.paths = [ {
            full_path: alt_path,
            version: 0
        } ];

    }

    /**
     * Extract Safari history
     * @param [offset=0] Starting db offset. Default is zero
     * @param [limit=100] How many records to return. Default is 100
     * @returns Array of `SafarihHistory`
     */
    public history(offset = 0, limit = 100): SafariHistory[] {
        return safariHistory(this.paths, limit, offset, this.platform, this.unfold);
    }

    public downloads(): SafariDownloads[] {
        return safariDownloads(this.paths, this.platform, this.unfold);
    }

    /**
     * Get base path for all Safari users
     * @returns Array of `SafariProfile` or `MacosError`
     */
    private profiles(): SafariProfile[] | MacosError {
        const paths = glob("/Users/*/Library/Safari/");
        if (paths instanceof FileError) {
            return new MacosError(`SAFARI`, `could not glob Safari profiles`);
        }
        const profiles: SafariProfile[] = [];
        for (const path of paths) {
            if (!path.is_directory) {
                continue;
            }

            const version = this.version();
            if (version instanceof MacosError) {
                continue;
            }
            const profile: SafariProfile = {
                full_path: path.full_path,
                version
            };

            profiles.push(profile);
        }

        return profiles;
    }

    /**
     * Determine Safari version
     * @returns Safari version or `MacosError`
     */
    private version(): number | MacosError {
        const version_plist = "/Applications/Safari.app/Contents/Info.plist";
        const info = getPlist(version_plist);
        if (info instanceof MacosError) {
            return info;
        } else if (Array.isArray(info)) {
            return new MacosError(`SAFARI`, `got array for Safari Info.plist`);
        }

        const version = info[ "CFBundleShortVersionString" ] as string;
        return Number(version);
    }
}