import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { NameType, Wifi, WifiCategory } from "../../../types/windows/registry/wifi";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { getSystemDrive } from "../../environment/env";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedTwoBytes } from "../../nom/helpers";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";

/**
 * Function to list connected Windows WiFi networks
 * @param [protocol=AccessorProtocol.Ntfs] `AccessorProtocol` The default is `AccesssorProtocol.Ntfs`.
 * @param alt_path Alternative path to `SOFTWARE` Registry file
 * @returns Array of `Wifi` entries or `WindowsError`
 */
export function wifiNetworksWindows(protocol = AccessorProtocol.Ntfs, alt_path?: string): Wifi[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\Windows\\System32\\config\\SOFTWARE`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for SOFTWARE files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('WIFI', `failed to glob for ${path}: ${matches}`);
    }

    const networks: Wifi[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        const reg_entries = getRegistry(entry.handle as FileHandle, "\\\\currentversion\\\\networklist\\\\profiles\\\\\\{");
        if (reg_entries instanceof WindowsError) {
            return new WindowsError(`WIFI`, `failed to parse ${entry.meta.display_path}: ${reg_entries}`);
        }

        for (const value of reg_entries) {
            const net: Wifi = {
                name: "",
                description: "",
                managed: false,
                category: WifiCategory.Unknown,
                created_local_time: "",
                name_type: NameType.Unknown,
                id: value.name.replace("{", "").replace("}", ""),
                last_connected_local_time: "",
                registry_path: value.path,
                message: "",
                datetime: value.last_modified,
                timestamp_desc: "Registry Key Modified",
                artifact: "WiFi Network",
                data_type: "windows:registry:wifi:entry",
                evidence: entry.meta.display_path,
            };

            for (const data of value.values) {
                if (data.value.toLowerCase() === "profilename") {
                    net.name = data.data;
                } else if (data.value.toLowerCase() === "description") {
                    net.description = data.data;
                    net.message = `WiFi network '${data.data}'`;
                } else if (data.value.toLowerCase() === "managed") {
                    net.managed = Boolean(Number(data.data));
                } else if (data.value.toLowerCase() === "category") {
                    switch (data.data) {
                        case "0": {
                            net.category = WifiCategory.Public;
                            break;
                        }
                        case "1": {
                            net.category = WifiCategory.Private;
                            break;
                        }
                        case "2": {
                            net.category = WifiCategory.Domain;
                            break;
                        }
                        default: net.category = WifiCategory.Unknown;
                    }
                } else if (data.value.toLowerCase() === "datecreated") {
                    const bytes = decode(data.data);
                    if (bytes instanceof EncodingError) {
                        continue;
                    }
                    const time_value = decodeTime(bytes);
                    if (time_value instanceof NomError) {
                        continue;
                    }
                    net.created_local_time = time_value;
                } else if (data.value.toLowerCase() === "nametype") {
                    switch (data.data) {
                        case "6": {
                            net.name_type = NameType.Wired;
                            break;
                        }
                        case "23": {
                            net.name_type = NameType.Vpn;
                            break;
                        }
                        case "71": {
                            net.name_type = NameType.Wireless;
                            break;
                        }
                        case "243": {
                            net.name_type = NameType.Mobile;
                            break;
                        }
                        default: net.name_type = NameType.Unknown;
                    }
                } else if (data.value.toLowerCase() === "datelastconnected") {
                    const bytes = decode(data.data);
                    if (bytes instanceof EncodingError) {
                        continue;
                    }
                    const time_value = decodeTime(bytes);
                    if (time_value instanceof NomError) {
                        continue;
                    }
                    net.last_connected_local_time = time_value;
                }
            }
            networks.push(net);
        }
    }

    return networks;
}

/**
 * Function to convert Network time bytes to proper timestamp.  
 * It uses a weird format: https://superuser.com/questions/1572038/ms-regedit-hex-to-date-conversion
 * @param bytes Timestamp bytes
 * @returns Timestamp or `NomError`
 */
function decodeTime(bytes: Uint8Array): string | NomError {
    let input = nomUnsignedTwoBytes(bytes, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }

    const year = input.value;
    input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }
    let month: number | string = input.value;
    if (month < 10) {
        month = `0${month}`;
    }

    // Day of week (ex: Thursday)
    input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }

    input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }
    let day: number | string = input.value;
    if (day < 10) {
        day = `0${day}`;
    }

    input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }
    let hour: number | string = input.value;
    if (hour < 10) {
        hour = `0${hour}`;
    }

    input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }
    let mins: number | string = input.value;
    if (mins < 10) {
        mins = `0${mins}`;
    }

    input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
        return input;
    }
    let seconds: number | string = input.value;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${year}-${month}-${day}T${hour}:${mins}:${seconds}`;
}

/**
 * Function to test Windows WiFi parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows WiFi parsing
 */
export function testWindowsWifiNetworks(): void {
    const test = new Uint8Array([233, 7, 7, 0, 4, 0, 10, 0, 1, 0, 10, 0, 43, 0, 94, 3]);
    const results = decodeTime(test);
    if (results instanceof NomError) {
        throw results;
    }

    if (results !== "2025-07-10T01:10:43") {
        throw `Got ${results} expected "2025-07-10T01:10:43".......decodeTime ❌`
    }
    console.info(`  Function decodeTime ✅`);

}