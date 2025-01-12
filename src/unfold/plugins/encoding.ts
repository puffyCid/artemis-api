import { decode } from "../../encoding/base64.ts";
import { EncodingError } from "../../encoding/errors.ts";

/**
 * Functino to base64 URL string
 * @param input Base64 encoded string
 * @returns Decode bytes or `EncodingError`
 */
export function decodeBase64Url(input: string): Uint8Array | EncodingError {
  input = input.replaceAll("_", "+").replaceAll("-", "/");

  let data = decode(input);
  if (data instanceof EncodingError) {
    // Try adding padding if we fail
    data = decode(`${input}=`);
    if (data instanceof EncodingError) {
      data = decode(`${input}==`);
    }
  }

  return data;
}
