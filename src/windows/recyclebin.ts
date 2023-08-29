import { RecycleBin } from "../../types/windows/recyclebin.d.ts";

/**
 * Function to parse Recycle Bin files at either `SystemDrive` or an alternative drive
 * @param drive Optional altertnative drive. Will use the `SystemDrive` by default (typically C)
 * @returns Array of `RecycleBin` entries
 */
export function getRecycleBin(drive?: string): RecycleBin[] {
  if (drive === undefined) {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_recycle_bin();
    const bin: RecycleBin[] = JSON.parse(data);

    return bin;
  }
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_alt_recycle_bin(drive);
  const bin: RecycleBin[] = JSON.parse(data);

  return bin;
}

/**
 * Function to parse a single Recycle Bin file
 * @param path Path to single Recycle Bin file
 * @returns `RecycleBin` data
 */
export function getRecycleBinFile(path: string): RecycleBin {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_recycle_bin_file(path);
  const bin: RecycleBin = JSON.parse(data);

  return bin;
}
