import { Bits } from "../../types/windows/bits.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse default `BITS` location
 * @param carve Whether to carve additional jobs and files
 * @returns `BITS` object containing bits, carved jobs, carved files arrays or `WindowsError`
 */
export function getBits(carve: boolean): Bits | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const results: string = Deno.core.ops.get_bits(carve);

    const data: Bits = JSON.parse(results);
    return data;
  } catch (err) {
    return new WindowsError("BITS", `failed to parse bits: ${err}`);
  }
}

/**
 * Function to parse `BITS` file at provided path
 * @param path path to `BITS` file
 * @param carve Whether to carve additional jobs and files
 * @returns `BITS` object containing bits, carved jobs, carved files arrays or `WindowsError`
 */
export function getBitsPath(path: string, carve: boolean): Bits | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const results: string = Deno.core.ops.get_bits_path(path, carve);

    const data: Bits = JSON.parse(results);
    return data;
  } catch (err) {
    return new WindowsError("BITS", `failed to parse bits at ${path}: ${err}`);
  }
}
