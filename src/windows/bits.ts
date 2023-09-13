import { Bits } from "../../types/windows/bits.d.ts";

/**
 * Function to parse default `BITS` location
 * @param carve Whether to carve additional jobs and files
 * @returns `BITS` object containing bits, carved jobs, carved files arrays
 */
export function getBits(carve: boolean): Bits {
  //@ts-ignore: Custom Artemis function
  const results: string = Deno.core.ops.get_bits(carve);

  const data: Bits = JSON.parse(results);
  return data;
}

/**
 * Function to parse `BITS` file at provided path
 * @param path path to `BITS` file
 * @param carve Whether to carve additional jobs and files
 * @returns `BITS` object containing bits, carved jobs, carved files arrays
 */
export function getBitsPath(path: string, carve: boolean): Bits {
  //@ts-ignore: Custom Artemis function
  const results: string = Deno.core.ops.get_bits_path(path, carve);

  const data: Bits = JSON.parse(results);
  return data;
}
