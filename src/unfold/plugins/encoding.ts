import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";

/**
 * Function to base64 URL string
 * @param input Base64 encoded string
 * @returns Decode bytes or `EncodingError`
 */
export function decodeBase64Url(input: string): Uint8Array | EncodingError {
  input = input.replaceAll("_", "+").replaceAll("-", "/");
  input = input.replaceAll("%3D", "=").replaceAll("%2F", "+");

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

/**
 * Function to convert HEX values to UUID
 * @param input Hex string value
 * @returns Proper UUID format with dashes
 */
export function extractUUID(input: string): string {
  const size = 32;
  if (input.length != size) {
    return input;
  }
  return `${input.slice(0, 8)}-${input.slice(8, 12)}-${input.slice(12, 16)}-${
    input.slice(16, 20)
  }-${input.slice(20)}`;
}
