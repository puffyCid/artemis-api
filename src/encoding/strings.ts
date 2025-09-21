/**
 * Extract a UTF8 string from provided bytes
 * @param data Raw bytes to extract UTF8 string from
 * @returns An UTF8 string. Will return base64 encoded string if extraction fails
 */
export function extractUtf8String(data: Uint8Array): string {
  //@ts-ignore: Custom Artemis function
  const result = js_extract_utf8_string(data);
  return result;
}

/**
 * Extract a UTF8 string from provided bytes. Thins function will replace non-valid UTF8 with [Mojibake](https://en.wikipedia.org/wiki/Mojibake)  
 * Use `extractUtf8String` if you want to preserve any invalid UTF8
 * @param data Raw bytes to extract UTF8 string from
 * @returns An UTF8 string. Will return base64 encoded string if extraction fails
 */
export function extractUtf8StringLossy(data: Uint8Array): string {
    //@ts-ignore: Custom Artemis function
  const result = js_extract_utf8_string_lossy(data);
  return result;
}

/**
 * Extract a UTF16 string from provided bytes
 * @param data Raw bytes to extract UTF16 string from
 * @returns An UTF16 string.Will return base64 encoded string if extraction fails
 */
export function extractUtf16String(data: Uint8Array): string {
  //@ts-ignore: Custom Artemis function
  const result = js_extract_utf16_string(data);
  return result;
}

/**
 * Convert bytes to Hex string
 * @param data Raw bytes to convert to hex
 * @returns A hexadecimal string
 */
export function bytesToHexString(data: Uint8Array): string {
  //@ts-ignore: Custom Artemis function
  const result = js_bytes_to_hex_string(data);
  return result;
}
