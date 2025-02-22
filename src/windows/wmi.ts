import { WindowsError } from "./errors.ts";
import { WmiPersist } from "../../types/windows/wmi.ts";

/**
 * Function to parse WMI repository and extract persistence entries
 * @param path Optional path to folder containing WMI repo data. Should contain MAPPING*.MAP, OBJECTS.DATA, INDEX.BTR
 * @returns Array of `WmiPersist` entries or `WindowsError`
 */
export function getWmiPersist(path?: string): WmiPersist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_wmipersist(path);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to parse WMI repo: ${err}`);
  }
}
