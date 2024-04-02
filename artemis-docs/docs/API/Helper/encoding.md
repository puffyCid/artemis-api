---
description: Encoding bytes and strings
---

# Encoding APIs

These functions are related to encoding data

### encode(data) -> string

Base64 encode raw bytes. The encoding is not URL safe

| Param | Type       | Description             |
| ----- | ---------- | ----------------------- |
| data  | Uint8Array | The raw bytes to encode |

### decode(b64) -> Uint8Array | EncodingError

Decode a valid RFC4648 Base64 encoded string

| Param | Type   | Description             |
| ----- | ------ | ----------------------- |
| b64   | string | A base64 encoded string |

### encodeBytes(data) -> Uint8Array

Convert provided string to raw bytes

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| data  | string | String to convert to bytes |

### extractUtf8String(data) -> string

Extract a UTF8 string from provided bytes

| Param | Type       | Description                           |
| ----- | ---------- | ------------------------------------- |
| data  | Uint8Array | Raw bytes to extract UTF8 string from |

### extractUtf16String(data) -> string

Extract a UTF16 string from provided bytes

| Param | Type       | Description                            |
| ----- | ---------- | -------------------------------------- |
| data  | Uint8Array | Raw bytes to extract UTF16 string from |

### bytesToHexString(data) -> string

Convert bytes to Hex string

| Param | Type       | Description                 |
| ----- | ---------- | --------------------------- |
| data  | Uint8Array | Raw bytes to convert to hex |

### readXml(path) -> Record&lt;string, unknown&gt; | EncodingError

Read a XML file into a JSON object. Supports either UTF8 or UTF16 encoded XML
files

| Param | Type   | Description              |
| ----- | ------ | ------------------------ |
| path  | string | Path to XML file to read |

### generateUuid() -> string

Generates a UUID v4 hyphenated string

### formatGuid(format, data) -> string

Format provided bytes into a GUID hyphenated string based on provided Endianess.
Must provide exactly 16 bytes. Windows is commonly Little Endian. macOS is
commonly Big Endian

| Param  | Type       | Description                 |
| ------ | ---------- | --------------------------- |
| format | Endian     | Endianess type LE or BE     |
| data   | Uint8Array | Raw bytes to format to GUID |

### parseProtobufBytes(raw_bytes) -> Record&lt;string, unknown&gt; | EncodingError

An **experimental** protobuf parser. Artemis will attempt to parse the provided
protobuf bytes and return a JSON object. Binary protobuf data is a blackbox, it
is typically not possible to perfectly parse protobuf data perfectly everytime.

Artemis will return a JSON object if it can parse the entire data

See:

- https://protobuf.dev/programming-guides/encoding/
- https://github.com/protobufjs/protobuf.js/wiki/How-to-reverse-engineer-a-buffer-by-hand

| Param     | Type       | Description        |
| --------- | ---------- | ------------------ |
| raw_bytes | Uint8Array | Raw protobuf bytes |
