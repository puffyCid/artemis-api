import { Accessor, PlatformType, readTextFile } from "../../../mod";
import { RustDeskLogs, RustDeskProfiles } from "../../../types/applications/rustdesk";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { DirectoryTree } from "../../filesystem/tree";
import { detectPlatform } from "../../system/systeminfo";
import { readLogs } from "./logs";

/**
 * Class to extract artifacts from RustDesk application
 */
export class RustDesk {
    private profiles: RustDeskProfiles[] = [];
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;

    /**
     * Construct a `RustDesk` object that can be used to parse RustDesk data
     * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing Epiphany data. Default is `AccessorProtocol.Host`
     * @param [source_path="host:"] Default source path to use when accessing Epiphany data. Default is `host:` which represents a live system.  
     * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
     * @param alt_path Optional alternative path to RustDesk directory
     * @returns `RustDesk` instance class
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
            // We want the base directory for RustDesk artifacts
            if (entry.meta.kind !== EntryKind.Directory) {
                continue;
            }

            const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
            if (tree instanceof FileError) {
                continue;
            }

            const profile: RustDeskProfiles = {
                tree,
                remote_id: this.id(tree)
            };

            this.profiles.push(profile);
        }
    }

    /**
     * Function to parse all logs associated with RustDesk application
     * @param is_alt If optional alternative path was provided
     * @returns Array of `RustDeskLogs`
     */
    public logs(): RustDeskLogs[] {
        const results: RustDeskLogs[] = [];

        for (const profile of this.profiles) {
            readLogs(profile, results);
        }

        return results;
    }

    /**
     * Grab basic profile information for installed RustDesk application
     * @returns Base path to RustDesk application
     */
    private profilePath(): string {
        switch (detectPlatform()) {
            case PlatformType.Linux: return "/home/*/.config/rustdesk";
            case PlatformType.Darwin: return "/Users/*/Library/Preferences/RustDesk";
            case PlatformType.Windows: return `${getSystemDrive()}\\Users\\*\\AppData\\Roaming\\RustDesk`;
            default: {
                console.warn(`Unsupported platform. Defaulting to '/home/*/.config/rustdesk'`);
                return "/home/*/.config/rustdesk";
            }
        }
    }

    /**
     * Determine ID associated with RustDesk application
     * @param platform `PlatformType` enum value
     * @param path Base path to RustDesk application
     * @returns 
     */
    private id(tree: DirectoryTree): string {
        const id_file = tree.file("RustDesk_local.toml");
        if (id_file instanceof FileError || this.source instanceof FileError) {
            return "Unknown ID";
        }

        const text = readTextFile(id_file.handle);
        if (text instanceof FileError) {
            return "Unknown ID";
        }


        const id_regex = /remote_id.*/;
        const match = text.match(id_regex);
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

        return id_string.trim().replaceAll("'", "");
    }
}

/**
 * Function to test the RustDesk parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the RustDesk parsing
 */
export function testRustDesk(): void {
    const test = "../../test_data/rustdesk/1.4.6";
    const client = new RustDesk(AccessorProtocol.Host, "host:", test);

    const results = client.logs();

    if (results.length !== 148) {
        throw `Got length ${results.length} expected 51.......readLogs ❌`;
    }

    if (results[ 23 ]?.message !== "Latency of rs-ny.rustdesk.com:21116: 115.89ms") {
        throw `Got message '${results[ 23 ]?.message}' expected "Latency of rs-ny.rustdesk.com:21116: 115.89ms".......readLogs ❌`;
    }

    console.info(`  Function readLogs ✅`);
}