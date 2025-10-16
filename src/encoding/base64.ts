import { EncodingError } from "./errors";

/**
 * Base64 encode raw bytes. The encoding is not URL safe
 * @param data The raw bytes to encode
 * @returns Base64 encoded string
 */
export function encode(data: Uint8Array): string {
  // @ts-expect-error: Custom Artemis function
  const result = js_base64_encode(data);
  return result;
}

/**
 * Decode a valid RFC4648 Base64 encoded string
 * @param b64 A base64 encoded string
 * @returns Raw decoded bytes as `Uint8Array`
 */
export function decode(b64: string): Uint8Array | EncodingError {
  try {
    // @ts-expect-error: Custom Artemis function
    const bytes: Uint8Array = js_base64_decode(b64);
    return bytes;
  } catch (err) {
    return new EncodingError(`BASE64`, `failed to decode ${b64}: ${err}`);
  }
}
