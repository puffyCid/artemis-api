---
description: macOS system stats
keywords:
  - macos
  - protobuf
  - binary
---

# System Stats

macOS system stats contains data related to system usage runtime.
Its kind of similar to Windows SRUM. It can contain process execution activity and resource usage.

Stats files are stored in binary format that contains
[Protobuf](https://protobuf.dev/) data at `/var/db/systemstats`. It is very difficult (nearly impossible)
to parse Protobuf data perfectly without the associated Proto file.

Currently artemis limited correlation after parsing protobuf data. 

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`stats` data.

# Sample API Script

```typescript
import { parseSystemStats } from "./artemis-api/mod";

function main() {
    const values = parseSystemStats();
    console.log(JSON.stringify(values));
}

main();
```

# Output Structure

A `SystemStats` object structure.

```typescript
export interface SystemStats {
      /**Path stats file */
      source_path: string;
      /**Stats Filename */
      source_file: string
      /**Stats version */
      version: string;
      message: string;
      datetime: string;
      timestamp_desc: "Stats Event";
      artifact: "SystemStats";
      data_type: "macos:systemstats:entry";
      build_version: string;
}
```

Sample output:

```json
{
    "source_path": "/var/db/systemstats/4E414D05-195D-4603-AF36-DECAD1FC0BA9.coalitions.4YmwgO.stats",
    "source_file": "4E414D05-195D-4603-AF36-DECAD1FC0BA9.coalitions.4YmwgO.stats",
    "version": "systemstats_v1",
    "message": "{\"1\":{\"tag\":{\"tag_byte\":8,\"wire_type\":\"VarInt\",\"field\":1},\"value\":1267779},\"2\":{\"tag\":{\"tag_byte\":16,\"wire_type\":\"VarInt\",\"field\":2},\"value\":1429},\"8\":{\"tag\":{\"tag_byte\":64,\"wire_type\":\"VarInt\",\"field\":8},\"value\":12},\"9\":{\"tag\":{\"tag_byte\":72,\"wire_type\":\"VarInt\",\"field\":9},\"value\":6},\"10\":{\"tag\":{\"tag_byte\":80,\"wire_type\":\"VarInt\",\"field\":10},\"value\":171421856666},\"11\":{\"tag\":{\"tag_byte\":88,\"wire_type\":\"VarInt\",\"field\":11},\"value\":76353002},\"12\":{\"tag\":{\"tag_byte\":96,\"wire_type\":\"VarInt\",\"field\":12},\"value\":12},\"13\":{\"tag\":{\"tag_byte\":104,\"wire_type\":\"VarInt\",\"field\":13},\"value\":1267},\"14\":{\"tag\":{\"tag_byte\":112,\"wire_type\":\"VarInt\",\"field\":14},\"value\":2555904},\"16\":{\"tag\":{\"tag_byte\":128,\"wire_type\":\"VarInt\",\"field\":16},\"value\":22220517},\"17\":{\"tag\":{\"tag_byte\":136,\"wire_type\":\"VarInt\",\"field\":17},\"value\":87711011},\"18\":{\"tag\":{\"tag_byte\":144,\"wire_type\":\"VarInt\",\"field\":18},\"value\":5577192},\"20\":{\"tag\":{\"tag_byte\":160,\"wire_type\":\"VarInt\",\"field\":20},\"value\":227446},\"22\":{\"tag\":{\"tag_byte\":176,\"wire_type\":\"VarInt\",\"field\":22},\"value\":69632},\"23\":{\"tag\":{\"tag_byte\":186,\"wire_type\":\"Len\",\"field\":23},\"value\":\"com.apple.TextEdit\"},\"48\":{\"tag\":{\"tag_byte\":193,\"wire_type\":\"Fixed64\",\"field\":48},\"value\":{\"signed\":4662969865979306000,\"unsigned\":4662969865979306000,\"double\":5682.387635}}}",
    "datetime": "2025-12-21T21:31:55.132Z",
    "timestamp_desc": "Stats Event",
    "artifact": "SystemStats",
    "data_type": "macos:systemstats:entry",
    "build_version": "25A354"
  },
  {
    "source_path": "/var/db/systemstats/4E414D05-195D-4603-AF36-DECAD1FC0BA9.coalitions.4YmwgO.stats",
    "source_file": "4E414D05-195D-4603-AF36-DECAD1FC0BA9.coalitions.4YmwgO.stats",
    "version": "systemstats_v1",
    "message": "{\"1\":{\"tag\":{\"tag_byte\":8,\"wire_type\":\"VarInt\",\"field\":1},\"value\":1267780},\"2\":{\"tag\":{\"tag_byte\":16,\"wire_type\":\"VarInt\",\"field\":2},\"value\":1432},\"8\":{\"tag\":{\"tag_byte\":64,\"wire_type\":\"VarInt\",\"field\":8},\"value\":42},\"9\":{\"tag\":{\"tag_byte\":72,\"wire_type\":\"VarInt\",\"field\":9},\"value\":27},\"10\":{\"tag\":{\"tag_byte\":80,\"wire_type\":\"VarInt\",\"field\":10},\"value\":74150720833},\"11\":{\"tag\":{\"tag_byte\":88,\"wire_type\":\"VarInt\",\"field\":11},\"value\":902180164},\"12\":{\"tag\":{\"tag_byte\":96,\"wire_type\":\"VarInt\",\"field\":12},\"value\":1216},\"13\":{\"tag\":{\"tag_byte\":104,\"wire_type\":\"VarInt\",\"field\":13},\"value\":15476},\"14\":{\"tag\":{\"tag_byte\":112,\"wire_type\":\"VarInt\",\"field\":14},\"value\":103145472},\"16\":{\"tag\":{\"tag_byte\":128,\"wire_type\":\"VarInt\",\"field\":16},\"value\":395307118},\"17\":{\"tag\":{\"tag_byte\":136,\"wire_type\":\"VarInt\",\"field\":17},\"value\":108412708},\"18\":{\"tag\":{\"tag_byte\":144,\"wire_type\":\"VarInt\",\"field\":18},\"value\":18407561},\"20\":{\"tag\":{\"tag_byte\":160,\"wire_type\":\"VarInt\",\"field\":20},\"value\":96910066},\"22\":{\"tag\":{\"tag_byte\":176,\"wire_type\":\"VarInt\",\"field\":22},\"value\":5292032},\"23\":{\"tag\":{\"tag_byte\":186,\"wire_type\":\"Len\",\"field\":23},\"value\":\"com.duckduckgo.macos.browser\"},\"48\":{\"tag\":{\"tag_byte\":193,\"wire_type\":\"Fixed64\",\"field\":48},\"value\":{\"signed\":4678176470766051000,\"unsigned\":4678176470766051000,\"double\":57797.712964}}}",
    "datetime": "2025-12-21T21:31:55.132Z",
    "timestamp_desc": "Stats Event",
    "artifact": "SystemStats",
    "data_type": "macos:systemstats:entry",
    "build_version": "25A354"
  },

```