/**
 * Convert provided string to raw bytes
 * @param data String to convert to bytes
 * @returns Encode string into bytes
 */
export function encodeBytes(data: string): Uint8Array {
  // @ts-expect-error: Custom Artemis function
  const result: Uint8Array = js_encode_bytes(data);
  return result;
}
