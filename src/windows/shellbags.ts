import { Shellbags } from "../../types/windows/shellbags.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse and reconstruct `Shellbags` on the systemdrive
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @returns Array of `Shellbag` entries from from systemdrive or `WindowsError`
 */
export function getShellbags(
  resolve_guids: boolean,
): Shellbags[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_shellbags(resolve_guids);

    const result: Shellbags[] = JSON.parse(data);
    return result;
  } catch (err) {
    return new WindowsError("SHELLBAGS", `failed to parse shellbags: ${err}`);
  }
}

/**
 * Function to parse and reconstruct `Shellbags` at alternative path
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @param path Full path to NTUSER.DAT or UsrClass.dat file
 * @returns Array of `Shellbag` entries or `WindowsError`
 */
export function getAltShellbags(
  resolve_guids: boolean,
  path: string,
): Shellbags[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_shellbags(
      resolve_guids,
      path,
    );

    const result: Shellbags[] = JSON.parse(data);
    return result;
  } catch (err) {
    return new WindowsError(
      "SHELLBAGS",
      `failed to parse shellbags at path ${path}: ${err}`,
    );
  }
}
