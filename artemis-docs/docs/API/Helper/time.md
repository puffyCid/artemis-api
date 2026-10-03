---
description: Convert various timestamps to UnixEpoch
---

# Time APIs

Functions to help convert various time formats to UnixEpoch

### timeNow() -> number

Return current time in UnixEpoch seconds

### filetimeToIso(filetime) -> string

Convert Windows FILETIME to ISO 8801 string

| Param    | Type   | Description        |
| -------- | ------ | ------------------ |
| filetime | bigint | FILETIME timestamp |

### cocoatimeToIso(cocoatime) -> string

Convert macOS Cocoa time to ISO 8801 string

| Param     | Type   | Description     |
| --------- | ------ | --------------- |
| cocoatime | number | Cocoa timestamp |

### hfsToIso(hfstime) -> string

Convert macOS HFS+ time to ISO 8801 string

| Param   | Type   | Description    |
| ------- | ------ | -------------- |
| hfstime | number | HFS+ timestamp |

### oleToIso(oletime) -> numstringber

Convert Windows OLE time to ISO 8801 string

| Param   | Type   | Description   |
| ------- | ------ | ------------- |
| oletime | number | OLE timestamp |

### webkitToIso(webkttime) -> string

Convert browser WebKit time to ISO 8801 string

| Param      | Type   | Description      |
| ---------- | ------ | ---------------- |
| webkittime | number | WebKit timestamp |

### fatToIso(fattime) -> string

Convert Windows FAT time bytes to ISO 8801 string

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
