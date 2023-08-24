/**
 * Shellbags are composed of `Shellitems` however the main value of `Shellbags` is determining what directories were browsed by the user.
 * We use the `ShellItems` to reconstruct this information and return the `Shellbag`
 *
 * Refernces:
 *  - https://github.com/libyal/libfwsi/blob/main/documentation/Windows%20Shell%20Item%20format.asciidoc
 */
export interface Shellbags {
  /**Reconstructed directory path */
  path: string;
  /**FAT created timestamp. Only applicable for Directory `shell_type` */
  created: number;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  modified: number;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  accessed: number;
  /**Entry number in MFT. Only applicable for Directory `shell_type` */
  mft_entry: number;
  /**Sequence number in MFT. Only applicable for Directory `shell_type` */
  mft_sequence: number;
  /**
   * Type of shellitem
   *
   * Can be:
   *   `Directory, URI, RootFolder, Network, Volume, ControlPanel, UserPropertyView, Delegate, Variable, MTP, Unknown, History`
   *
   *  Most common is typically `Directory`
   */
  shell_type: string;
  /**
   * Reconstructed directory with any GUIDs resolved
   * Ex: `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
   */
  resolve_path: string;
  /**User Registry file associated with `Shellbags` */
  reg_file: string;
  /**Registry key path to `Shellbags` data */
  reg_path: string;
  /**Full file path to the User Registry file */
  reg_file_path: string;
  /**Array of Property Stores */
  stores: Record<string, string | number | boolean | null>[];
}

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
