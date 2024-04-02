/**
 * References:
 * - https://protobuf.dev/programming-guides/encoding/
 * - https://github.com/protobufjs/protobuf.js/wiki/How-to-reverse-engineer-a-buffer-by-hand
 * - https://github.com/gchq/CyberChef/blob/master/src/core/lib/Protobuf.mjs
 * - https://github.com/mildsunrise/protobuf-inspector
 * - https://github.com/Kotlin/kotlinx.serialization/issues/1097#issuecomment-704900614 (Protobuf should start with 0xa (10)?)
 */
import { encode } from "./base64.ts";
import { EncodingError } from "./errors.ts";
import { extractUtf8String } from "./strings.ts";

enum WireType {
  VarInt = 0,
  Bit64 = 1,
  Length = 2,
  Bit32 = 5,
  /**Deprecated */
  GroupStart = 3,
  /**Deprecated */
  GroupEnd = 4,
}

/**
 * A **very** experimental function to parse Protobuf data.
 * @param raw_bytes Protobuf bytes to parse.
 * @returns `Record<string, unknown>` of parsed Protobuf entries or `EncodingError`
 */
export function parseProtobufBytes(
  raw_bytes: Uint8Array,
): Record<string, unknown> | EncodingError {
  let proto_bytes = raw_bytes;
  let proto_values: Record<string, unknown> = {};

  while (proto_bytes.length != 0) {
    const tag = getTag(proto_bytes);
    if (tag instanceof EncodingError) {
      return tag;
    }

    if (tag.bytes_left.length === 0) {
      break;
    }

    switch (tag.wire_type) {
      case WireType.Length: {
        const value = extractStringOrMessage(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }

        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.VarInt: {
        const value = extractVarInt(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }
        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.Bit64: {
        const value = extract64Bit(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }
        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.Bit32: {
        const value = extract32Bit(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }
        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.GroupStart: {
        // This is suppose to be deprecated...
        const values = extractGroups(tag.bytes_left);
        if (values instanceof EncodingError) {
          return values;
        }
        proto_bytes = values.bytes_left;
        proto_values = insertValue(proto_values, values.values, tag.field);

        break;
      }
      case WireType.GroupEnd: {
        // Group end just states the end of the Group. There is no data left to get
        proto_bytes = tag.bytes_left;
        break;
      }
      default: {
        return new EncodingError(
          `PROTOBUF`,
          `unsupported WireType ${tag.wire_type}`,
        );
      }
    }
  }

  return proto_values;
}

interface Tag {
  wire_type: WireType;
  field: number;
  bytes_left: Uint8Array;
}

/**
 * Function to get `WireType` and field number
 * @param raw_bytes Protobuf bytes to parse
 * @returns A `Tag` value or `EncodingError`
 */
function getTag(raw_bytes: Uint8Array): Tag | EncodingError {
  if (raw_bytes.byteLength === 0) {
    return new EncodingError(`PROTOBUF`, `no tag data provided`);
  }

  const tag_byte = raw_bytes[0];
  const field_number = 3;
  const wire = 7;

  const tag: Tag = {
    wire_type: tag_byte & wire,
    field: tag_byte >> field_number,
    bytes_left: raw_bytes.slice(1),
  };

  const tags = [
    WireType.Bit32,
    WireType.Bit64,
    WireType.GroupEnd,
    WireType.GroupStart,
    WireType.Length,
    WireType.VarInt,
  ];

  if (!tags.includes(tag.wire_type)) {
    return new EncodingError(
      `PROTOBUF`,
      `bad WireType ${tag.wire_type}`,
    );
  }

  return tag;
}

interface Value {
  message: string | Record<string, unknown> | undefined | number;
  bytes_left: Uint8Array;
}

/**
 * Function to parse either a String value or sub-messages
 * @param raw_bytes Protobuf bytes to parse
 * @returns A `Value` entry or `EncodingError`
 */
function extractStringOrMessage(
  raw_bytes: Uint8Array,
): Value | EncodingError {
  if (raw_bytes.byteLength === 0) {
    return new EncodingError(`PROTOBUF`, `no message/string data provided`);
  }

  const length = raw_bytes[0];
  const value_bytes = raw_bytes.slice(1, length + 1);

  const value: Value = {
    message: undefined,
    bytes_left: raw_bytes.slice(value_bytes.byteLength + 1),
  };

  // Try string first

  const value_string = extractUtf8String(value_bytes);
  if (
    value_string != "" &&
    !value_string.startsWith("Failed to get UTF8 string") &&
    !value_string.startsWith("\\u0") && !value_string.startsWith("\n") &&
    !value_string.startsWith("\b")
  ) {
    value.message = value_string;
    return value;
  }

  // Check if next value is a sub-message
  const message = parseProtobufBytes(value_bytes);
  // If we get an error fallback to a base64 string
  if (message instanceof EncodingError) {
    value.message = encode(value_bytes);
    return value;
  }

  value.message = message;
  return value;
}

/**
 * Function to parse varint number
 * @param raw_bytes Protobuf bytes to parse
 * @returns A `Value` entry or `EncodingError`
 */
function extractVarInt(raw_bytes: Uint8Array): Value | EncodingError {
  if (raw_bytes.byteLength === 0) {
    return new EncodingError(`PROTOBUF`, `no varint data provided`);
  }

  let byte_index = 0;
  let result = 0;
  let shift = 0;

  while (raw_bytes[byte_index] & 0x80) {
    result += (raw_bytes[byte_index] & 0x7f) << (shift * 7);
    byte_index++;
    shift++;
  }
  const value: Value = {
    message: result,
    bytes_left: raw_bytes.slice(byte_index + 1),
  };

  return value;
}

/**
 * Function to parse a 64bit number
 * @param raw_bytes Protobuf bytes to parse
 * @returns A `Value` entry or `EncodingError`
 */
function extract64Bit(raw_bytes: Uint8Array): Value | EncodingError {
  if (raw_bytes.byteLength < 8) {
    // Try 32 bit value. Maybe its a padding issue
    const small_value = extract32Bit(raw_bytes);
    if (small_value instanceof EncodingError) {
      return new EncodingError(`PROTOBUF`, `not enough 64bit data provided`);
    }
    return small_value;
  }
  const size = 8;
  const bytes = raw_bytes.buffer.slice(0, size + 1);

  const num_value = new DataView(bytes).getFloat64(0, true);
  const value: Value = {
    message: num_value,
    bytes_left: raw_bytes.slice(size),
  };

  return value;
}

/**
 * Fucntion to parse a 32bit number
 * @param raw_bytes Protobuf bytes to parse
 * @returns A `Value` entry or `EncodingError`
 */
function extract32Bit(raw_bytes: Uint8Array): Value | EncodingError {
  if (raw_bytes.byteLength < 4) {
    return new EncodingError(`PROTOBUF`, `not enough 32bit data provided`);
  }
  const size = 8;
  const bytes = raw_bytes.buffer.slice(0, size + 1);

  const num_value = new DataView(bytes).getInt32(0, true);
  const value: Value = {
    message: num_value,
    bytes_left: raw_bytes.slice(size),
  };

  return value;
}

interface GroupValue {
  values: Value;
  bytes_left: Uint8Array;
}

/**
 * Function to parse Protobuf group data
 * @param raw_bytes Protobuf bytes to parse
 * @returns `GroupValue` or `EncodingError`
 */
function extractGroups(raw_bytes: Uint8Array): GroupValue | EncodingError {
  let proto_bytes = raw_bytes;
  const group_value: GroupValue = {
    values: {
      message: undefined,
      bytes_left: new Uint8Array(),
    },
    bytes_left: new Uint8Array(),
  };
  let proto_values: Record<string, unknown> = {};
  while (proto_bytes.length != 0) {
    const tag = getTag(proto_bytes);
    if (tag instanceof EncodingError) {
      return tag;
    }

    if (tag.bytes_left.length === 0) {
      break;
    }

    switch (tag.wire_type) {
      case WireType.Length: {
        const value = extractStringOrMessage(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }

        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.VarInt: {
        const value = extractVarInt(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }
        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.Bit64: {
        const value = extract64Bit(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }
        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.Bit32: {
        const value = extract32Bit(tag.bytes_left);
        if (value instanceof EncodingError) {
          return value;
        }
        proto_bytes = value.bytes_left;
        proto_values = insertValue(proto_values, value, tag.field);
        break;
      }
      case WireType.GroupStart: {
        // This is suppose to be deprecated...
        const values = extractGroups(tag.bytes_left);
        if (values instanceof EncodingError) {
          return values;
        }
        proto_bytes = values.bytes_left;
        proto_values = insertValue(proto_values, values.values, tag.field);

        break;
      }
      case WireType.GroupEnd: {
        // Group end just states the end of the Group. There is no data left to get
        proto_bytes = tag.bytes_left;
        break;
      }
      default: {
        return new EncodingError(
          `PROTOBUF`,
          `unsupported WireType Group ${tag.wire_type}`,
        );
      }
    }
  }

  group_value.values.message = proto_values;
  group_value.bytes_left = proto_bytes;
  return group_value;
}

/**
 * Function to check if field exists in `records`. This is used to try to check for repeated record entries
 * @param records Existing protobuf entries
 * @param value New value to add to `records`
 * @param field The key that will be used to add to `records`
 * @returns Updated `Record<string, unknown>`
 */
function insertValue(
  records: Record<string, unknown>,
  value: Value,
  field: number,
): Record<string, unknown> {
  const is_repeated = records[field];
  if (is_repeated === undefined || is_repeated === null) {
    records[field] = value.message;
    return records;
  }

  if (Array.isArray(is_repeated)) {
    is_repeated.push(value.message);
    records[field] = is_repeated;
    return records;
  }

  const values: unknown[] = [];
  values.push(is_repeated);
  values.push(value.message);

  records[field] = values;
  return records;
}
