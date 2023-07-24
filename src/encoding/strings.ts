/**
 * Extract a UTF8 string from provided bytes
 * @param data Raw bytes to extract UTF8 string from
 * @returns An UTF8 string. Will return empty string if extraction fails
 */
export function extract_utf8_string(data: Uint8Array): string {
  //@ts-ignore: Custom Artemis function
  const result: string = encoding.extract_utf8_string(data);
  return result;
}
