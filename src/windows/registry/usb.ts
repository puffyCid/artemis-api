import { getRegistry } from "../../../mod";
import { Registry } from "../../../types/windows/registry";
import { UsbDevices } from "../../../types/windows/registry/usb";
import { EncodingError } from "../../encoding/errors";
import { decode } from "../../encoding/mod";
import { extractUtf16String } from "../../encoding/strings";
import { getEnvValue } from "../../environment/mod";
import { NomError } from "../../nom/error";
import { Endian } from "../../nom/helpers";
import { nomUnsignedEightBytes } from "../../nom/mod";
import { filetimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../errors";

/**
 * Function to parse Windows Registry files to get list of USB devices that have been connected
 * @param alt_file Alternative path to a SYSTEM Registry file
 * @returns Array of `UsbDevices` or `WindowsError`
 */
export function listUsbDevices(alt_file?: string): UsbDevices[] | WindowsError {
  if (alt_file !== undefined) {
    return usbSystem(alt_file);
  }

  const volume = getEnvValue("SystemDrive");
  if (volume === "") {
    return new WindowsError(`USB`, `no SystemDrive found`);
  }

  const system = `${volume}\\Windows\\System32\\config\\SYSTEM`;
  return usbSystem(system);
}

/**
 * Function to get USB information from the SYSTEM Registry file
 * @param path Full path to the SYSTEM Registry file
 * @returns Array of `UsbDevices` or `WindowsError`
 */
function usbSystem(path: string): UsbDevices[] | WindowsError {
  const usbstor = "Control\\DeviceMigration\\Devices\\USBSTOR\\";
  const usbstor_legacy = "\\Enum\\USBSTOR\\";
  const mounts = "MountedDevices";

  const reg_data = getRegistry(path);
  if (reg_data instanceof WindowsError) {
    return new WindowsError(`USB`, `failed to parse ${path}: ${reg_data}`);
  }

  const usbs: UsbDevices[] = [];
  for (const reg of reg_data) {
    if (
      (reg.path.includes(usbstor) || reg.path.includes(usbstor_legacy)) &&
      reg.values.length > 0 &&
      reg.name.includes("&") &&
      reg.path.includes("ControlSet00")
    ) {
      const values = usbStor(reg);
      usbs.push(values);
    }
  }

  for (let i = 0; i < usbs.length; i++) {
    const usb_info = usbs[i];
    if (usb_info === undefined) {
      continue;
    }
    for (const reg of reg_data) {
      if (reg.path.includes(usb_info.tracking_id) && "Partmg") {
        for (const value of reg.values) {
          if (value.value !== "DiskId" || usb_info.disk_id !== "") {
            continue;
          }
          usb_info.disk_id = value.data.replace("{", "").replace("}", "");
        }
      } else if (reg.path.includes(mounts) && reg.values.length !== 0) {
        for (const value of reg.values) {
          const data = decode(value.data);
          if (data instanceof EncodingError) {
            continue;
          }
          const value_string = extractUtf16String(data);
          if (
            value_string.includes(usb_info.tracking_id) &&
            value.value.includes(":")
          ) {
            usb_info.drive_letter = value.value.split("\\").pop() as string;
          }
        }
      }
      if (
        reg.path.includes(usb_info.tracking_id) &&
        reg.path.includes("\\USBSTOR\\") &&
        reg.name === "0064"
      ) {
        for (const value of reg.values) {
          usb_info.first_install = unixEpochToISO(
            filetimeToUnixEpoch(BigInt(value.data)),
          );
        }
      } else if (
        reg.path.includes(usb_info.tracking_id) &&
        reg.path.includes("\\USBSTOR\\") &&
        reg.name === "0065"
      ) {
        for (const value of reg.values) {
          usb_info.install = unixEpochToISO(
            filetimeToUnixEpoch(BigInt(value.data)),
          );
        }
      } else if (
        reg.path.includes(usb_info.tracking_id) &&
        reg.path.includes("\\USBSTOR\\") &&
        reg.name === "0066"
      ) {
        for (const value of reg.values) {
          usb_info.last_connected = unixEpochToISO(
            filetimeToUnixEpoch(BigInt(value.data)),
          );
          usb_info.datetime = usb_info.last_connected;
        }
      } else if (
        reg.path.includes(usb_info.tracking_id) &&
        reg.path.includes("\\USBSTOR\\") &&
        reg.name === "0067"
      ) {
        for (const value of reg.values) {
          usb_info.last_removal = unixEpochToISO(
            filetimeToUnixEpoch(BigInt(value.data)),
          );
        }
      }
    }
  }

  return usbs;
}

/**
 * Extract USB info from the Registry
 * @param data `Registry` object
 * @returns UsbDevices object
 */
function usbStor(data: Registry): UsbDevices {
  const entry: UsbDevices = {
    friendly_name: "",
    last_connected: "",
    last_removal: "",
    usb_type: "",
    vendor: "",
    product: "",
    revision: "",
    tracking_id: "",
    disk_id: "",
    device_class_id: "",
    drive_letter: "",
    last_insertion: "",
    install: "",
    first_install: "",
    message: "",
    datetime: "1970-01-01T00:00:00.000Z",
    timestamp_desc: "USB Last Connected",
    artifact: "Windows USB Device",
    data_type: "windows:registry:usb:entry"
  };

  const info = (data.key.split("\\").pop() as string).split("&");
  for (let i = 0; i < info.length; i++) {
    const value = info[i];
    if (value === undefined) {
      continue;
    }
    if (i === 0) {
      entry.usb_type = value;
    }

    if (value.includes("Ven_")) {
      entry.vendor = value.slice(4);
    }

    if (value.includes("Prod_")) {
      entry.product = value.slice(5);
    }

    if (value.includes("Rev_")) {
      entry.revision = value.slice(4);
    }
  }

  if (data.name.at(1) !== undefined && data.name.at(1) !== "&") {
    entry.tracking_id = data.name.split("&")[0] ?? "";
  }

  for (const value of data.values) {
    if (value.value === "BusDeviceDesc") {
      entry.friendly_name = value.data;
      entry.message = `USB value ${entry.friendly_name}`;
    } else if (value.value === "LastPresentDate") {
      const time_bytes = decode(value.data);
      if (time_bytes instanceof EncodingError) {
        console.warn(`Could not base64 decode last present date ${time_bytes}`);
        break;
      }

      const time_data = nomUnsignedEightBytes(time_bytes, Endian.Le);
      if (time_data instanceof NomError) {
        console.warn(`Could not nom last present date ${time_data}`);
        break;
      }

      const time_value = unixEpochToISO(
        filetimeToUnixEpoch(BigInt(time_data.value)),
      );
      entry.last_insertion = time_value;
    } else if (value.value === "ClassGUID") {
      entry.device_class_id = value.data.replace("{", "").replace("}", "");
    }
  }

  return entry;
}
