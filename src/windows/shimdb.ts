import { Shimdb } from "../../types/windows/shimdb";
import { WindowsError } from "./errors";

/**
 * Function to parse `ShimDB` entries on the system drive
 * @param path Optional path to a `ShimDB` file
 * @returns Array of `ShimDB` entries parsed from the system drive letter or `WindowsError`
 */
export function getShimdb(path?: string): Shimdb[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_shimdb(path);

    return data;
  } catch (err) {
    return new WindowsError("SHIMDB", `failed to parse shimdb: ${err}`);
  }
}
