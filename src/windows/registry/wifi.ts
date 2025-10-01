import { Registry } from "../../../types/windows/registry";
import { NameType, Wifi, WifiCategory } from "../../../types/windows/registry/wifi";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { getEnvValue } from "../../environment/mod";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedTwoBytes } from "../../nom/helpers";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";

/**
 * Function to list connected Windows WiFi networks
 * @param alt_path Optional alternative path to the `SOFTWARE` Registry file
 * @returns Array of `Wifi` entries or `WindowsError`
 */
export function wifiNetworksWindows(alt_path?: string): Wifi[] | WindowsError {
    let path = "\\Windows\\System32\\config\\SOFTWARE";
    if (alt_path !== undefined) {
        path = alt_path;
    } else {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
            drive = "C:";
        }
        path = `${drive}${path}`;
    }

    const reg_entries = getRegistry(path);
    if (reg_entries instanceof WindowsError) {
        return new WindowsError(`WIFI`, `could not parse the SOFTWARE Registry file ${reg_entries}`);
    }

    const profiles: Registry[] = [];
    for (const entry of reg_entries) {
        if (!entry.path.toLowerCase().includes("\\currentversion\\networklist\\profiles\\{")) {
            continue;
        }

        profiles.push(entry);
    }

    const networks: Wifi[] = [];
    for (const entry of profiles) {
        const net: Wifi = {
            name: "",
            description: "",
            managed: false,
            category: WifiCategory.Unknown,
            created_local_time: "",
            name_type: NameType.Unknown,
            id: entry.name.replace("{", "").replace("}", ""),
            last_connected_local_time: "",
            registry_path: entry.path,
            registry_file: path,
            message: "",
            datetime: entry.last_modified,
            timestamp_desc: "Registry Key Modified",
            artifact: "WiFi Network",
            data_type: "windows:registry:wifi:entry"
        };

        for (const value of entry.values) {
            if (value.value.toLowerCase() === "profilename") {
                net.name = value.data;
            } else if (value.value.toLowerCase() === "description") {
                net.description = value.data;
                net.message = `WiFi network '${value.data}'`;
            } else if (value.value.toLowerCase() === "managed") {
                net.managed = Boolean(Number(value.data));
            } else if (value.value.toLowerCase() === "category") {
                switch (value.data) {
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
            } else if (value.value.toLowerCase() === "datecreated") {
                const bytes = decode(value.data);
                if (bytes instanceof EncodingError) {
                    continue;
                }
                const time_value = decodeTime(bytes);
                if (time_value instanceof NomError) {
                    continue;
                }
                net.created_local_time = time_value;
            } else if (value.value.toLowerCase() === "nametype") {
                switch (value.data) {
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
            } else if (value.value.toLowerCase() === "datelastconnected") {
                const bytes = decode(value.data);
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