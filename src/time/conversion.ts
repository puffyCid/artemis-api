/**
 * Function to return current time
 * @returns Current time in UnixEpoch seconds
 */
export function timeNow(): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.time_now();
  return Number(data);
}

/**
 * Convert Windows FILETIME to UnixEpoch seconds
 * @param filetime FILETIME timestamp
 * @returns UnixEpoch seconds
 */
export function filetimeToUnixEpoch(filetime: bigint): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.filetime_to_unixepoch(filetime);
  return Number(data);
}

/**
 * Convert macOS Cocoa time to UnixEpoch seconds
 * @param cocoatime Cocoa timestamp
 * @returns UnixEpoch seconds
 */
export function cocoatimeToUnixEpoch(cocoatime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.cocoatime_to_unixepoch(cocoatime);
  return Number(data);
}

/**
 * Convert macOS HFS+ time to UnixEpoch seconds
 * @param hfstime HFS+ timestamp
 * @returns UnixEpoch seconds
 */
export function hfsToUnixEpoch(hfstime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.hfs_to_unixepoch(hfstime);
  return Number(data);
}

/**
 * Convert Windows OLE time to UnixEpoch seconds
 * @param oletime OLE timestamp
 * @returns UnixEpoch seconds
 */
export function oleToUnixEpoch(oletime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.ole_automationtime_to_unixepoch(oletime);
  return Number(data);
}

/**
 * Convert browser WebKit time to UnixEpoch
 * @param webkittime WebKit timestamp in **seconds**
 * @returns UnixEpoch seconds
 */
export function webkitToUnixEpoch(webkittime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.webkit_time_to_unixepoch(webkittime);
  return Number(data);
}

/**
 * Convert Windows FAT time bytes to UnixEpoch
 * @param fattime FAT timestamp bytes
 * @returns UnixEpoch seconds
 */
export function fatToUnixEpoch(fattime: Uint8Array): number {
  //@ts-ignore: Custom Artemis function
  const data: bigint = time.fattime_utc_to_unixepoch(fattime);
  return Number(data);
}

/**
 * Function to convert UNIXEPOCH times to ISO8601
 * @param timestamp Data timestamp. Should be UNIXEPOCH. Duration should either: Seconds, Milliseconds, Microseconds, or nanoseconds
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
  const nanoseconds_len = 19;
  if (timestamp.toString().length === milliseconds_len) {
    return new Date(Number(timestamp)).toISOString();
  }

  if (timestamp.toString().length === microseconds_len) {
    const milli_time = BigInt(timestamp) / BigInt(milliseconds);
    return new Date(Number(milli_time)).toISOString();
  }

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
