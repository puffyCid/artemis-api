import { UsnJrnl } from "../../types/windows/usnjrnl.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse the `UsnJrnl` on the systemdrive
 * @param path Optional path to an alternative `UsnJrnl` file
 * @param drive Optional alternative drive letter
 * @param mft Optional path to an alternative MFT file
 * @returns Array of `UsnJrnl` entries from sysystemdrive letter or `WindowsError`
 */
export function getUsnjrnl(
  path?: string,
  drive?: string,
  mft?: string,
): UsnJrnl[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_usnjrnl(path, drive, mft);

    return data;
  } catch (err) {
    return new WindowsError("USNJRNL", `failed to parse usnjrnl: ${err}`);
  }
}
