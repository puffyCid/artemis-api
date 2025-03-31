import { CompressionError } from "./errors";

/**
 * Function to decompress zlib compressed data
 * @param data The raw bytes to decompress
 * @param wbits Value associated with zlib data. Use 0 (default) if there is no wbit value
 * @param decom_size Decompress output size. Optional
 * @returns Decompressed data or `CompressionError`
 */
export function decompress_zlib(
  data: Uint8Array,
  wbits: number = 0,
  decom_size: number = 0,
): Uint8Array | CompressionError {
  const max_wbit = 255;
  if (wbits > max_wbit) {
    return new CompressionError(
      `ZLIB`,
      `wbit value too large, should be less than 255`,
    );
  }
  try {
    //@ts-ignore: Custom Artemis function
    const bytes: Uint8Array = js_decompress_zlib(data, wbits, decom_size);
    return bytes;
  } catch (err) {
    return new CompressionError(`ZLIB`, `failed to decompress: ${err}`);
  }
}

/**
 * Function to decompress gzip compressed data
 * @param data Raw bytes to decompress
 * @returns Decomprssed data or `CompressionError`
 */
export function decompress_gzip(
  data: Uint8Array,
): Uint8Array | CompressionError {
  try {
    //@ts-ignore: Custom Artemis function
    const bytes: Uint8Array = js_decompress_gzip(data);
    return bytes;
  } catch (err) {
    return new CompressionError(`GZIP`, `failed to decompress: ${err}`);
  }
}
