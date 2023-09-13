import { Shellbags } from "../../types/windows/shellbags.d.ts";

/**
 * Function to parse and reconstruct `Shellbags` on the systemdrive
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @returns Array of `Shellbag` entries from from systemdrive
 */
export function getShellbags(resolve_guids: boolean): Shellbags[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_shellbags(resolve_guids);

  const result: Shellbags[] = JSON.parse(data);
  return result;
}

/**
 * Function to parse and reconstruct `Shellbags` on an alternative drive
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @param drive Drive letter to use to parse the `shellbags`
 * @returns Array of `Shellbag` entries
 */
export function getAltShellbags(
  resolve_guids: boolean,
  drive: string,
): Shellbags[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_shellbags(
    resolve_guids,
    drive,
  );

  const result: Shellbags[] = JSON.parse(data);
  return result;
}
