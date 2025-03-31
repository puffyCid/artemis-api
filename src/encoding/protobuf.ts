import type { ProtoTag } from "../../types/encoding/protobuf";
import { EncodingError } from "./errors";

/**
 * Function to extract Protobuf data using the Rust [sunlight](https://crates.io/crates/sunlight) library
 * @param data Protobuf bytes
 * @returns Object containing extracted Protobuf info or `EncodingError`
 */
export function parseProtobuf(
  data: Uint8Array,
): Record<string, ProtoTag> | EncodingError {
  try {
    //@ts-ignore: Custom Artemis function
    const result = js_parse_protobuf(data);
    return result;
  } catch (err) {
    return new EncodingError(
      "PROTOBUF",
      `failed to parse protobuf: ${err}`,
    );
  }
}
