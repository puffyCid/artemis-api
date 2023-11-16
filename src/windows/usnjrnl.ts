import { UsnJrnl } from "../../types/windows/usnjrnl.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse the `UsnJrnl` on the systemdrive
 * @returns Array of `UsnJrnl` entries from sysystemdrive letter or `WindowsError`
 */
export function getUsnjrnl(): UsnJrnl[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_usnjrnl();

    const results: UsnJrnl[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("USNJRNL", `failed to parse usnjrnl: ${err}`);
  }
}

/**
 * Function to parse the `UsnJrnl` on an alternative driver
 * @returns Array of `UsnJrnl` entries from a Windows driver letter or `WindowsError`
 */
export function getAltUsnjrnl(drive: string): UsnJrnl[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_alt_usnjrnl(drive);

    const results: UsnJrnl[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "USNJRNL",
      `failed to parse usnjrnl at drive ${drive}: ${err}`,
    );
  }
}
