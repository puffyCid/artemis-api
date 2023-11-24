import { Endian } from "../nom/helpers.ts";

/**
 * Format bytes to a GUID value. Must specify Endianess
 * @param format `Endian` format to use when converting to GUID. BE common on macOS. LE common on Windows
 * @param data Raw bytes to convert to GUID
 * @returns GUID string
 */
export function formatGuid(format: Endian, data: Uint8Array): string {
  if (format === Endian.Be) {
    //@ts-ignore: Custom Artemis function
    const result = encoding.bytes_to_be_guid(data);
    return result;
  }

  //@ts-ignore: Custom Artemis function
  const result = encoding.bytes_to_le_guid(data);
  return result;
}

/**
 * Generate a UUID string
 * @returns A UUID string
 */
export function generateUuid(): string {
  //@ts-ignore: Custom Artemis function
  const result = encoding.generate_uuid();
  return result;
}
