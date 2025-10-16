import { Bits } from "../../types/windows/bits";
import { WindowsError } from "./errors";

/**
 * Function to parse default `BITS` location
 * @param carve Whether to carve additional jobs and files
 * @param path Optional path to `BITS` file
 * @returns `Bits` object containing bits, carved jobs, carved files arrays or `WindowsError`
 */
export function getBits(carve: boolean, path?: string): Bits | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const results = js_bits(carve, path);
    return results;
  } catch (err) {
    return new WindowsError("BITS", `failed to parse bits: ${err}`);
  }
}
