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
