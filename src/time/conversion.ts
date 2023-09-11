/**
 * Function to return current time
 * @returns Current time in UnixEpoch seconds
 */
export function timeNow(): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.time_now();
  return data;
}

/**
 * Convert Windows FILETIME to UnixEpoch seconds
 * @param filetime FILTIME timestamp
 * @returns UnixEpoch seconds
 */
export function filetimeToUnixEpoch(filetime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.filetime_to_unixepoch(filetime);
  return data;
}

/**
 * Convert macOS COCOA time to UnixEpoch seconds
 * @param cocoatime COCOA timestamp
 * @returns UnixEpoch seconds
 */
export function cocoatimeToUnixEpoch(cocoatime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.cocoatime_to_unixepoch(cocoatime);
  return data;
}

/**
 * Convert macOS HFS+ time to UnixEpoch seconds
 * @param hfstime HFS+ timestamp
 * @returns UnixEpoch seconds
 */
export function hfsToUnixEpoch(hfstime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.hfs_to_unixepoch(hfstime);
  return data;
}

/**
 * Convert Windows OLE time to UnixEpoch seconds
 * @param oletime OLE timestamp
 * @returns UnixEpoch seconds
 */
export function oleToUnixEpoch(oletime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.ole_automationtime_to_unixepoch(oletime);
  return data;
}

/**
 * Conver browser WebKit time to UnixEpoch
 * @param webkittime WebKit timestamp
 * @returns UnixEpoch seconds
 */
export function webkitToUnixEpoch(webkittime: number): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.webkit_time_to_unixepoch(webkittime);
  return data;
}

/**
 * Convert Windows FAT time byts to UnixEpoch
 * @param fattime FAT timestamp bytes
 * @returns UnixEpoch seconds
 */
export function fatToUnixEpoch(fattime: Uint8Array): number {
  //@ts-ignore: Custom Artemis function
  const data: number = time.fattime_utc_to_unixepoch(fattime);
  return data;
}
