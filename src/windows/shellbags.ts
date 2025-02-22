import { Shellbags } from "../../types/windows/shellbags.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse and reconstruct `Shellbags` on the systemdrive
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @param path Optional path to Registry file containing `Shellbags`. If not provided, will parse `Shellbags` for all users
 * @returns Array of `Shellbag` entries from from systemdrive or `WindowsError`
 */
export function getShellbags(
  resolve_guids: boolean,
  path?: string,
): Shellbags[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_shellbags(resolve_guids, path);

    return data;
  } catch (err) {
    return new WindowsError("SHELLBAGS", `failed to parse shellbags: ${err}`);
  }
}
