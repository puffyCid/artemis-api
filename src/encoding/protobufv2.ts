import type { ProtoTag } from "../../types/encoding/protobuf.ts";
import { EncodingError } from "./errors.ts";

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
    const result = encoding.parse_protobuf(data);
    const value: Record<string, ProtoTag> = JSON.parse(result);
    return value;
  } catch (err) {
    return new EncodingError(
      "PROTOBUF",
      `failed to parse protobuf: ${err}`,
    );
  }
}
