import { RecycleBin } from "../../types/windows/recyclebin.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse Recycle Bin files at `SystemDrive`
 * @returns Array of `RecycleBin` entries or `WindowsError`
 */
export function getRecycleBin(): RecycleBin[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_recycle_bin();
    const bin: RecycleBin[] = JSON.parse(data);

    return bin;
  } catch (err) {
    return new WindowsError(
      "RECYCLEBIN",
      `failed to parse recyclebin: ${err}`,
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
