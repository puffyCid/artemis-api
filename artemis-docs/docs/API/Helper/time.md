---
description: Convert various timestamps to UnixEpoch
---

# Time APIs

Functions to help convert various time formats to UnixEpoch

### timeNow() -> number

Return current time in UnixEpoch seconds

### filetimeToUnixEpoch(filetime) -> number

Convert Windows FILETIME to UnixEpoch seconds

| Param    | Type   | Description        |
| -------- | ------ | ------------------ |
| filetime | bigint | FILETIME timestamp |

### cocoatimeToUnixEpoch(cocoatime) -> number

Convert macOS Cocoa time to UnixEpoch seconds

| Param     | Type   | Description     |
| --------- | ------ | --------------- |
| cocoatime | number | Cocoa timestamp |

### hfsToUnixEpoch(hfstime) -> number

Convert macOS HFS+ time to UnixEpoch seconds

| Param   | Type   | Description    |
| ------- | ------ | -------------- |
| hfstime | number | HFS+ timestamp |

### oleToUnixEpoch(oletime) -> number

Convert Windows OLE time to UnixEpoch seconds

| Param   | Type   | Description   |
| ------- | ------ | ------------- |
| oletime | number | OLE timestamp |

### webkitToUnixEpoch(webkttime) -> number

Convert browser WebKit time to UnixEpoch

| Param      | Type   | Description      |
| ---------- | ------ | ---------------- |
| webkittime | number | WebKit timestamp |

### fatToUnixEpoch(fattime) -> number

Convert Windows FAT time bytes to UnixEpoch

| Param   | Type       | Description         |
| ------- | ---------- | ------------------- |
| oletime | Uint8Array | FAT timestamp bytes |

### unixEpochToISO(timestamp) -> string

Convert timestamp to ISO RFC 3339 string with millisecond precision.\
Supports seconds, microseconds, milliseconds, and nanoseconds duration
timestamps

| Param     | Type             | Description                                                                     |
| --------- | ---------------- | ------------------------------------------------------------------------------- |
| timestamp | number or BigInt | UnixEpoch timestamp. Can be seconds, microseconds, milliseconds, or nanoseconds |
