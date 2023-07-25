/**
 * Base64 raw bytes or a string. The encoding is not URL safe
 * @param data Base64 encode raw bytes or a string
 * @returns Base64 encoded string
 */
export function encode(data: ArrayBuffer | string): string {
  //@ts-ignore: Custom Artemis function
  const result = encoding.btoa(data);
  return result;
}

/**
 * Decode a valid RFC4648 Base64 encoded string
 * @param b64 A base64 encoded string
 * @returns Raw decoded bytes as `Uint8Array`
 */
export function decode(b64: string): Uint8Array {
  //@ts-ignore: Custom Artemis function
  const bytes: Uint8Array = encoding.atob(b64);
  return bytes;
}
