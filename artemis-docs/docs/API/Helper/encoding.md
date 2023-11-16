---
description: Encoding bytes and strings
---

# Encoding APIs

These functions are related to encoding data

### encode(data) -> `string`

Base64 encode raw bytes. The encoding is not URL safe

| Param | Type         | Description             |
| ----- | ------------ | ----------------------- |
| data  | `Uint8Array` | The raw bytes to encode |

### decode(b64) -> `Uint8Array`

Decode a valid RFC4648 Base64 encoded string

| Param | Type     | Description             |
| ----- | -------- | ----------------------- |
| b64   | `string` | A base64 encoded string |

### encodeBytes(data) -> `Uint8Array`

Convert provided string to raw bytes

| Param | Type     | Description                |
| ----- | -------- | -------------------------- |
| data  | `string` | String to convert to bytes |

### extractUtf8String(data) -> `string`

Extract a UTF8 string from provided bytes

| Param | Type         | Description                           |
| ----- | ------------ | ------------------------------------- |
| data  | `Uint8Array` | Raw bytes to extract UTF8 string from |

### bytesToHexString(data) -> `string`

Convert bytes to Hex string

| Param | Type         | Description                 |
| ----- | ------------ | --------------------------- |
| data  | `Uint8Array` | Raw bytes to convert to hex |

### readXml(path) -> `Record<string, unknown> | EncodingError`

Read a XML file into a JSON object. Supports either UTF8 or UTF16 encoded XML
files

| Param | Type     | Description              |
| ----- | -------- | ------------------------ |
| path  | `string` | Path to XML file to read |
