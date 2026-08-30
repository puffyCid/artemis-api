/**
 * Function to return current time
 * @returns Current time in ISO8601 format with millisecond precision
 */
export function timeNow(): number {
  // @ts-expect-error: Custom Artemis function
  const data: bigint = js_time_now();
  return Number(data);
}

/**
 * Convert Windows FILETIME to ISO8601 format with millisecond precision
 * @param filetime FILETIME timestamp
 * @returns ISO8601 format with millisecond precision
 */
export function filetimeToIso(filetime: bigint): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_filetime_to_iso(filetime);
  return data;
}

/**
 * Convert macOS Cocoa time to ISO8601 format with millisecond precision
 * @param cocoatime Cocoa timestamp
 * @returns ISO8601 format with millisecond precision
 */
export function cocoatimeToIso(cocoatime: number): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_cocoatime_to_iso(cocoatime);
  return data;
}

/**
 * Convert macOS HFS+ time to ISO8601 format with millisecond precision
 * @param hfstime HFS+ timestamp
 * @returns ISO8601 format with millisecond precision
 */
export function hfsToIso(hfstime: number): string {
  const hfs_offset = 2082844800;
  const milli_precision = 1000;
  const timestamp = (hfstime - hfs_offset) * milli_precision;
  return new Date(timestamp).toISOString();
}

/**
 * Convert Windows OLE time to ISO8601 format with millisecond precision
 * @param oletime OLE timestamp
 * @returns ISO8601 format with millisecond precision
 */
export function oleToIso(oletime: bigint): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_ole_automationtime_to_iso(oletime);
  return data;
}

/**
 * Convert browser WebKit time to UNIXEPOCH. You will want to ensure you webkittime is in seconds! (Divide by 1000000n)
 * @param webkittime WebKit timestamp
 * @returns ISO8601 format with millisecond precision
 */
export function webkitToIso(webkittime: bigint): string {
  if (typeof webkittime === 'number') {
    webkittime = BigInt(webkittime);
  }
  const webkit_offset = 11644473600000000n;
  const milli_precision = 1000n;
  const timestamp = (webkittime - webkit_offset) / milli_precision;
  try {
    return new Date(Number(timestamp)).toISOString();
  } catch (err) {
    console.error(`Bad timestamp ${webkittime}: ${err}`);
    return "1970-01-01T00:00:00.000Z";
  }
}

/**
 * Convert Windows FAT time bytes to UNIXEPOCH
 * @param fattime FAT timestamp bytes
 * @returns ISO8601 format with millisecond precision
 */
export function fatToIso(fattime: Uint8Array): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_fat_time_to_iso(fattime);
  return data;
}

/**
 * Convert Julian timestamp to UnixExoch
 * @param days Days in Julian timestamp
 * @returns ISO8601 format with millisecond precision
 */
export function julianToIso(days: number): string {
  const epoch = 2440587.5;
  const epoch_milli = 86400000;
  const milli = (days - epoch) * epoch_milli;

  return new Date(milli).toISOString();
}

/**
 * Function to convert UNIXEPOCH times to ISO8601 with millisecond precision
 * @param timestamp Data timestamp. Should be UNIXEPOCH. Duration should either: Seconds, Milliseconds, Microseconds, or Nanoseconds
 * @returns ISO8601 timestamp
 */
export function unixEpochToISO(timestamp: number | bigint): string {
  if (timestamp === 0 || timestamp === 0n) {
    return new Date(Number(timestamp)).toISOString();
  }
  const milliseconds_len = 13;

  const milliseconds = 1000;
  if (
    typeof timestamp === "number" &&
    timestamp.toString().length < milliseconds_len
  ) {
    const js_date = new Date(timestamp * milliseconds);
    return js_date.toISOString();
  }
  const microseconds_len = 16;
  // Milliseconds
  if (timestamp.toString().length < microseconds_len) {
    return new Date(Number(timestamp)).toISOString();
  }

  const nanoseconds_len = 19;
  // Microseconds
  if (timestamp.toString().length < nanoseconds_len) {
    const milli_time = BigInt(timestamp) / BigInt(milliseconds);
    return new Date(Number(milli_time)).toISOString();
  }

  // Nanoseconds?
  if (timestamp.toString().length === nanoseconds_len) {
    const milli_time = BigInt(timestamp) / BigInt(milliseconds * milliseconds);
    return new Date(Number(milli_time)).toISOString();
  }

  console.warn(
    `Received very large number:  ${timestamp}. Converting to max Number type value`,
  );
  const milli_time = BigInt(timestamp) / BigInt(milliseconds);
  return new Date(Number(milli_time)).toISOString();
}

/**
 * Function to try to convert timestamp string to UTC
 * @param timestamp Modified ISO timestamp. Ex: `2026-04-25 11:36:36.250534 -04:00`
 */
export function convertModifiedIso(timestamp: string): string {
  let normal = timestamp;

  // `new Date` requires `T` between day and hour
  if (!timestamp.includes("T")) {
    normal = normal.replace(" ", "T");
  }
  // No spaces are allowed between timezone value and timestamp
  normal = normal.replace(" ", "");
  // Only millisecond precision is support for `new Date`
  normal = normal.replace(/(\.\d{3})\d+/, '$1');

  const utc_date = new Date(normal).toISOString();
  return utc_date;
}