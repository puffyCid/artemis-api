import { UsnJrnl } from "../../types/windows/usnjrnl.d.ts";

/**
 * Function to parse the `UsnJrnl` on the systemdrive
 * @returns Array of `UsnJrnl` entries from sysystemdrive letter or `WindowsError`
 */
export function getUsnjrnl(): UsnJrnl[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_usnjrnl();

  const results: UsnJrnl[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse the `UsnJrnl` on an alternative driver
 * @returns Array of `UsnJrnl` entries from a Windows driver letter or `WindowsError`
 */
export function getAltUsnjrnl(drive: string): UsnJrnl[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_usnjrnl(drive);

  const results: UsnJrnl[] = JSON.parse(data);
  return results;
}
