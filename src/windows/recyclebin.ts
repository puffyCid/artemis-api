import { RecycleBin } from "../../types/windows/recyclebin";
import { WindowsError } from "./errors";

/**
 * Function to parse Recycle Bin files at `SystemDrive`
 * @returns Array of `RecycleBin` entries or `WindowsError`
 */
export function getRecycleBin(): RecycleBin[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_recycle_bin();

    return data;
  } catch (err) {
    return new WindowsError(
      "RECYCLEBIN",
      `failed to parse recyclebin: ${err}`,
    );
  }
}
