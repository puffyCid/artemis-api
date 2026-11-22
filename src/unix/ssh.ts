import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { KnownHosts } from "../../types/unix/ssh";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
import { detectPlatform, PlatformType } from "../system/systeminfo";
import { UnixError } from "./errors";

/**
 * Function to get known hosts entries for SSH
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alot_path Optional alternative path to `known_hosts` files
 * @returns Array of `KnownHosts` or `UnixError`
 */
export function listKnownHosts(protocol = AccessorProtocol.Host, alot_path?: string): KnownHosts[] | UnixError {
    let path = "/home/*/.ssh/known_hosts*";
    if (detectPlatform() === PlatformType.Darwin) {
        path = "/Users/*/.ssh/known_hosts*";
    }

    if (alot_path !== undefined) {
        path = alot_path;
    }

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new UnixError('SSH_KNOWN_HOSTS', `failed to glob for ${path}: ${matches}`);
    }

    const values: KnownHosts[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        const data = readTextFile(entry.handle as FileHandle);
        if (data instanceof FileError) {
            console.warn(`Could not read '${entry.meta.display_path}': ${data}`);
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
                source: entry.meta.display_path,
                created: "1970-01-01T00:00:00.000Z",
                modified: "1970-01-01T00:00:00.000Z",
                accessed: "1970-01-01T00:00:00.000Z",
                changed: "1970-01-01T00:00:00.000Z",
                message: `SSH config target '${value.at(0) ?? ""}`,
                datetime: "1970-01-01T00:00:00.000Z",
                timestamp_desc: "SSH Config Modified",
                artifact: "SSH Config",
                data_type: "unix:ssh:config:entry"
            };

            const meta = accessor.statHandle(entry.handle as FileHandle);
            if (meta instanceof FileError) {
                values.push(host);
                continue;
            }

            host.created = meta.times.created;
            host.modified = meta.times.modified;
            host.accessed = meta.times.accessed;
            host.changed = meta.times.changed;
            host.datetime = meta.times.modified;

            values.push(host);
        }
    }

    return values;
}