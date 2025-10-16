import { Endian } from "../nom/helpers";

/**
 * Format bytes to a GUID value. Must specify Endianess
 * @param format `Endian` format to use when converting to GUID. BE common on macOS. LE common on Windows
 * @param data Raw bytes to convert to GUID
 * @returns GUID string
 */
export function formatGuid(format: Endian, data: Uint8Array): string {
  if (format === Endian.Be) {
    // @ts-expect-error: Custom Artemis function
    const result = js_format_guid_be_bytes(data);
    return result;
  }

  // @ts-expect-error: Custom Artemis function
  const result = js_format_guid_le_bytes(data);
  return result;
}

/**
 * Generate a UUID string
 * @returns A UUID string
 */
export function generateUuid(): string {
  // @ts-expect-error: Custom Artemis function
  const result = js_generate_uuid();
  return result;
}
