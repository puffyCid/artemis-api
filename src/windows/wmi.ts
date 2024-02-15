import { WindowsError } from "./errors.ts";
import { WmiPersist } from "../../types/windows/wmi.ts";
import { getEnvValue } from "../environment/env.ts";

/**
 * Function to parse WMI repository and extract persistence entries
 * @param alt_drive Use an alternative drive letter to parse WMI repo. Otherwise will default to the `SystemDrive`
 * @returns Array of `WmiPersist` entries or `WindowsError`
 */
export function getWmiPersist(): WmiPersist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_wmipersist();

    const results: WmiPersist[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to parse WMI repo: ${err}`);
  }
}

/**
 * Function to parse WMI repository and extract persistence entries from provided directory.
 * @param path Path to the WMI repository. Should contain MAPPING*.MAP, OBJECTS.DATA, INDEX.BTR
 * @returns Array of `WmiPersist` entries or `WindowsError`
 */
export function getWmiPersistPath(path: string): WmiPersist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_wmipersist(path);

    const results: WmiPersist[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to parse WMI repo: ${err}`);
  }
}
