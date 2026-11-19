import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { FirmwareHistory } from "../../types/linux/firmware";
import { ApplicationError } from "../applications/errors";
import { querySqlite, Sqlite } from "../applications/sqlite";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { unixEpochToISO } from "../time/conversion";
import { LinuxError } from "./errors";

/**
 * Function to extract firmware update history related to fwupd service
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Alternative path to the pending.db filename
 * @returns Array for `FirmwareHistory` or `LinuxError`
 */
export function firmwareHistory(protocol = AccessorProtocol.Host, alt_path?: string): FirmwareHistory[] | LinuxError {
    let path = "/var/lib/fwupd/pending.db";

    if (alt_path !== undefined) {
        path = alt_path;
    }

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new LinuxError(`FIRMWARE_HISTORY`, `failed to glob for ${path}: ${matches}`);
    }

    const query = "select * from history";
    const hits: FirmwareHistory[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        let results;
        if (protocol === AccessorProtocol.Host) {
            results = querySqlite(path, query);
        } else {
            const client = new Sqlite(entry.handle as FileHandle);
            results = client.query(query);
        }

        if (results instanceof ApplicationError) {
            console.error(`Failed to query ${path}: ${results}`);
            continue;
        }

        for (const values of results) {
            const firm: FirmwareHistory = {
                device_id: values["device_id"] as string,
                update_state: values["update_state"] as number,
                update_error: values["update_error"] as string,
                filename: values["filename"] as string,
                display_name: values["display_name"] as string,
                plugin: values["plugin"] as string,
                device_created: unixEpochToISO(values["device_created"] as number),
                device_modified: unixEpochToISO(values["device_modified"] as number),
                checksum: values["checksum"] as string,
                flags: values["flags"] as bigint,
                metadata: values["metadata"] as string,
                guid_default: values["guid_default"] as string,
                version_old: values["version_old"] as string,
                version_new: values["version_new"] as string,
                checksum_device: values["checksum_device"] as string,
                protocol: values["protocol"] as string,
                release_id: values["release_id"] as string,
                appstream_id: values["appstream_id"] as string,
                version_format: values["version_format"] as number,
                install_duration: values["install_duration"] as number,
                message: `Firmware update for '${values["display_name"] as string}'`,
                datetime: unixEpochToISO(values["device_created"] as number),
                timestamp_desc: "Firmware Device Created",
                artifact: "Firmware Updates",
                data_type: "linux:firmware:entry",
                evidence: entry.meta.display_path,
            };
            const meta = firm.metadata.split(";");
            for (const value of meta) {
                const key_value = value.split("=");
                if (key_value.length !== 2 || key_value[0] === undefined) {
                    continue;
                }

                if (key_value[0] === "BootTime") {
                    firm[key_value[0]] = unixEpochToISO(Number(key_value[1]));
                    continue;
                }

                firm[key_value[0]] = key_value[1];
            }
            hits.push(firm);
        }
    }

    return hits;
}

/**
 * Function to test firmware history parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the firmware history parsing
 */
export function testFirmwareHistory(): void {
    const test = "../../test_data/linux/firmware/pending.db";

    const results = firmwareHistory(AccessorProtocol.Host, test);
    if (results instanceof LinuxError) {
        throw results;
    }

    if (results[0] === undefined) {
        throw `Got device ID undefined wanted 03281da317dccd2b18de2bd1cc70a782df40ed7e.......firmwareHistory ❌`;
    }

    if (results[0].device_id != '03281da317dccd2b18de2bd1cc70a782df40ed7e') {
        throw `Got device ID ${results[0].device_id} wanted 03281da317dccd2b18de2bd1cc70a782df40ed7e.......firmwareHistory ❌`;
    }

    console.info(`  Function firmwareHistory ✅`);

}