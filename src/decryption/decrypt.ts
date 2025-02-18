import { DecryptError } from "./errors.ts";

/**
 * Function to decrypt AES256 data
 * @param key AES256 key. Must be 32 bytes length
 * @param iv Initial Vector for AES
 * @param data Encrypted data
 * @returns Decrypted data or `DecryptError`
 */
export function decryptAes(
  key: Uint8Array,
  iv: Uint8Array,
  data: Uint8Array,
): Uint8Array | DecryptError {
  const key_length = 32;
  if (key.length != key_length) {
    return new DecryptError(
      `AES`,
      `Incorrect key length, wanted 32 bytes got: ${key.length}`,
    );
  }
  try {
    //@ts-ignore: Custom Artemis function
    const bytes: Uint8Array = js_decrypt_aes(key, iv, data);
    return bytes;
  } catch (err) {
    return new DecryptError(`AES`, `failed to decrypt: ${err}`);
  }
}
