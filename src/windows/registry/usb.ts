import { getRegistry } from "../../../mod.ts";
import { Registry } from "../../../types/windows/registry.ts";
import { UsbDevices } from "../../../types/windows/registry/usb.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { decode } from "../../encoding/mod.ts";
import { extractUtf16String } from "../../encoding/strings.ts";
import { getEnvValue } from "../../environment/mod.ts";
import { FileError } from "../../filesystem/errors.ts";
import { glob } from "../../filesystem/mod.ts";
import { NomError } from "../../nom/error.ts";
import { Endian } from "../../nom/helpers.ts";
import { nomUnsignedEightBytes } from "../../nom/mod.ts";
import { filetimeToUnixEpoch, unixEpochToISO } from "../../time/conversion.ts";
import { WindowsError } from "../errors.ts";

/**
 * Function to parse Windows Registry files to get list of USB devices that have been connected
 * @returns Array of `UsbDevices` or `WindowsError`
 */
export function listUsbDevices(): UsbDevices[] | WindowsError {
  const volume = getEnvValue("SystemDrive");
  if (volume === "") {
    return new WindowsError(`USB`, `no SystemDrive found`);
  }

  const system = `${volume}\\Windows\\System32\\config\\SYSTEM`;
  const glob_users = `${volume}\\Users\\*\\NTUSER.DAT`;
  const user_paths = glob(glob_users);
  if (user_paths instanceof FileError) {
    return new WindowsError(
      `USB`,
      `failed to glob for NTUSER.DAT: ${user_paths}`,
    );
  }

  const usbs = usbSystem(system);

  return usbs;
}

/**
 * Function to get USB information from the SYSTEM Registry file
 * @param path Full path to the SYSTEM Registry file
 * @returns Array of `UsbDevices` or `WindowsError`
 */
export function usbSystem(path: string): UsbDevices[] | WindowsError {
  const usbstor = "Control\\DeviceMigration\\Devices\\USBSTOR\\";
  const usb = "Control\\DeviceMigration\\Devices\\USB";
  const mounts = "MountedDevices";

  const reg_data = getRegistry(path);
  if (reg_data instanceof WindowsError) {
    return new WindowsError(`USB`, `failed to parse ${path}: ${reg_data}`);
  }

  const usbs = [];
  for (const reg of reg_data.registry_entries) {
    if (
      reg.path.includes(usbstor) && reg.values.length > 0 &&
      reg.name.includes("&") && reg.path.includes("ControlSet00")
    ) {
      const values = usbStor(reg);
      usbs.push(values);
    }
  }
  for (let i = 0; i < usbs.length; i++) {
    for (const reg of reg_data.registry_entries) {
      if (reg.path.includes(usbs[i].tracking_id) && "Partmg") {
        for (const value of reg.values) {
          if (value.value != "DiskId" || usbs[i].disk_id != "") {
            continue;
          }
          usbs[i].disk_id = value.data.replace("{", "").replace("}", "");
        }
      } else if (reg.path.includes(mounts) && reg.values.length != 0) {
        for (const value of reg.values) {
          const data = decode(value.data);
          if (data instanceof EncodingError) {
            continue;
          }
          const value_string = extractUtf16String(data);
          if (
            value_string.includes(usbs[i].tracking_id) &&
            value.value.includes(":")
          ) {
            usbs[i].drive_letter = value.value.split("\\").pop() as string;
          }
        }
      }
    }
  }

  console.log(usbs);
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
    first_connected: "",
    last_removal: "",
    usb_type: "",
    vendor: "",
    product: "",
    revision: "",
    tracking_id: "",
    disk_id: "",
    device_class_id: "",
    drive_letter: "",
    volume_serial: "",
    last_insertion: "",
  };

  const info = (data.key.split("\\").pop() as string).split("&");
  for (let i = 0; i < info.length; i++) {
    if (i === 0) {
      entry.usb_type = info[i];
    }

    if (info[i].includes("Ven_")) {
      entry.vendor = info[i].slice(4);
    }

    if (info[i].includes("Prod_")) {
      entry.product = info[i].slice(5);
    }

    if (info[i].includes("Rev_")) {
      entry.revision = info[i].slice(4);
    }
  }

  if (data.name.at(1) != undefined && data.name.at(1) != "&") {
    entry.tracking_id = data.name.split("&")[0];
  }

  for (const value of data.values) {
    if (value.value === "BusDeviceDesc") {
      entry.friendly_name = value.data;
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
      entry.last_connected = time_value;
    }
  }

  return entry;
}
