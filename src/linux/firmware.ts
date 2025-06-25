import { FirmwareHistory } from "../../types/linux/firmware";
import { ApplicationError } from "../applications/errors";
import { querySqlite } from "../applications/sqlite";
import { unixEpochToISO } from "../time/conversion";
import { LinuxError } from "./errors";

/**
 * Function to extract firmware update history related to fwupd service
 * @param alt_path Alternative path to the pending.db filename
 * @returns Array for `FirmwareHistory` or `LinuxError`
 */
export function firmwareHistory(alt_path?: string): FirmwareHistory[] | LinuxError {
    let path = "/var/lib/fwupd/pending.db";

    if (alt_path !== undefined) {
        path = alt_path;
    }

    const query = "select * from history";
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new LinuxError("FIRMWARE_HISTORY", `failed to query ${path}: ${results}`);
    }

    const hits: FirmwareHistory[] = [];
    for (const entry of results) {
        const firm: FirmwareHistory = {
            device_id: entry[ "device_id" ] as string,
            update_state: entry[ "update_state" ] as number,
            update_error: entry[ "update_error" ] as string,
            filename: entry[ "filename" ] as string,
            display_name: entry[ "display_name" ] as string,
            plugin: entry[ "plugin" ] as string,
            device_created: unixEpochToISO(entry[ "device_created" ] as number),
            device_modified: unixEpochToISO(entry[ "device_modified" ] as number),
            checksum: entry[ "checksum" ] as string,
            flags: entry[ "flags" ] as bigint,
            metadata: entry[ "metadata" ] as string,
            guid_default: entry[ "guid_default" ] as string,
            version_old: entry[ "version_old" ] as string,
            version_new: entry[ "version_new" ] as string,
            checksum_device: entry[ "checksum_device" ] as string,
            protocol: entry[ "protocol" ] as string,
            release_id: entry[ "release_id" ] as string,
            appstream_id: entry[ "appstream_id" ] as string,
            version_format: entry[ "version_format" ] as number,
            install_duration: entry[ "install_duration" ] as number,
        };
        const meta = firm.metadata.split(";");
        for (const value of meta) {
            const key_value = value.split("=");
            if (key_value.length !== 2) {
                continue;
            }

            if (key_value[ 0 ] === "BootTime") {
                firm[ key_value[ 0 ] ] = unixEpochToISO(Number(key_value[ 1 ]));
                continue;

            }

            firm[ key_value[ 0 ] ] = key_value[ 1 ];
        }
    }

    return hits;
}