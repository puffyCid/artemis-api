import { KnownHosts } from "../../types/unix/ssh";
import { FileError } from "../filesystem/errors";
import { glob, readTextFile, stat } from "../filesystem/files";
import { UnixError } from "./errors";

/**
 * Function to get known hosts entries for SSH
 * @param alt_glob Optional alternative glob to `known_hosts` files
 * @returns Array of `KnownHosts` or `UnixError`
 */
export function listKnownHosts(alt_glob?: string): KnownHosts[] | UnixError {
    let glob_path = "/home/*/.ssh/known_hosts";
    if (alt_glob !== undefined) {
        glob_path = alt_glob;
    }

    const paths = glob(glob_path);
    if (paths instanceof FileError) {
        return new UnixError(`SSH_KNOWN_HOSTS`, `failed to glob: ${glob_path}`);
    }

    const values: KnownHosts[] = [];
    for (const entry of paths) {
        const data = readTextFile(entry.full_path);
        if (data instanceof FileError) {
            console.warn(`Could not read ${entry.full_path}`);
            continue;
        }

        for (const line of data.split("\n")) {
            if (line === "") {
                continue;
            }

            const value = line.split(" ");

            const host: KnownHosts = {
                target: value.at(0) ?? "",
                algorithm: value.at(1) ?? "",
                data: value.at(2) ?? "",
                source: entry.full_path,
                created: "1970-01-01T00:00:00.000Z",
                modified: "1970-01-01T00:00:00.000Z",
                accessed: "1970-01-01T00:00:00.000Z",
                changed: "1970-01-01T00:00:00.000Z",
            };

            const meta = stat(entry.full_path);
            if (meta instanceof FileError) {
                console.warn(`Could not stat ${entry.full_path}`);
                values.push(host);
                continue;
            }

            host.created = meta.created;
            host.modified = meta.modified;
            host.accessed = meta.accessed;
            host.changed = meta.changed;

            values.push(host);
        }

    }

    return values;
}