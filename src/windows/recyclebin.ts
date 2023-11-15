import { RecycleBin } from "../../types/windows/recyclebin.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse Recycle Bin files at either `SystemDrive` or an alternative drive
 * @param drive Optional altertnative drive. Will use the `SystemDrive` by default (typically C)
 * @returns Array of `RecycleBin` entries or `WindowsError`
 */
export function getRecycleBin(drive?: string): RecycleBin[] | WindowsError {
  try {
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
  } catch (err) {
    return new WindowsError(
      "RECYCLEBIN",
      `failed to parse recyclebin ${drive}: ${err}`,
    );
  }
}

/**
 * Function to parse a single Recycle Bin file
 * @param path Path to single Recycle Bin file
 * @returns `RecycleBin` data or `WindowsError`
 */
export function getRecycleBinFile(path: string): RecycleBin | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_recycle_bin_file(path);
    const bin: RecycleBin = JSON.parse(data);

    return bin;
  } catch (err) {
    return new WindowsError(
      "RECYCLEBIN",
      `failed to parse recyclebin file ${path}: ${err}`,
    );
  }
}
