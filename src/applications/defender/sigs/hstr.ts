import { extractUtf16String } from "../../../encoding/strings.ts";
import { ApplicationError } from "../../errors.ts";

/**
 * Function to extracts strings associated with Defender signatures
 * @param data Bytes associated with *HSTR* Sig types
 * @returns Array of strings
 */
export function extractStrings(data: Uint8Array): string[] | ApplicationError {
  const count_size = 2;
  const _count1 = data.buffer.slice(0, count_size + 1);
  const _count2 = data.buffer.slice(count_size, count_size * 2 + 1);
  const count3 = new DataView(
    data.buffer.slice(count_size * 2, count_size * 3 + 1),
  ).getUint16(0, true);
  const _reversed = data[6];

  const string_length = 1;
  const reversed2_length = 2;
  let offset = 7;
  let count = 0;

  const strings = [];
  while (count < count3 && offset <= data.byteLength) {
    const _reversed2 = data.buffer.slice(offset, offset + reversed2_length);
    offset += reversed2_length;
    if (offset + string_length > data.byteLength) {
      break;
    }

    const string_size = new DataView(
      data.buffer.slice(offset, offset + string_length),
    ).getUint8(0);
    offset += string_length;
    if (offset + string_size > data.byteLength) {
      break;
    }
    const string_data = data.buffer.slice(offset, offset + string_size);
    offset += string_size;
    const string = extractUtf16String(new Uint8Array(string_data));

    strings.push(string);

    count++;
  }

  return strings;
}
