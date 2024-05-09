import { CompressionError } from "./errors.ts";

/**
 * Decompress zlib compressed data
 * @param data The raw bytes to decompress
 * @param wbits Value associated with zlib data. Use 0 (default) if there is no wbit value
 * @returns Decompressed data or `CompressionError`
 */
export function decompress_zlib(
  data: Uint8Array,
  wbits: number = 0,
): Uint8Array | CompressionError {
  try {
    //@ts-ignore: Custom Artemis function
    const bytes: Uint8Array = compression.decompress_zlib(data, wbits);
    return bytes;
  } catch (err) {
    return new CompressionError(`ZLIB`, `failed to decompress: ${err}`);
  }
}
