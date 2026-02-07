---
description: An open source peer to peer file synchronization application
keywords:
  - cloud storage
---

# Syncthing

Syncthing is a popular open source peer to peer file synchronization application. It can be used to save and share files to a remote devices.

Artemis supports parsing Syncthing logs on Linux and macOS platforms.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect Syncthing client data


```typescript
import { PlatformType, Syncthing } from "./artemis-api/mod";


function main() {
  const client = new Syncthing(PlatformType.Linux);
  const results = client.logs();
  console.log(JSON.stringify(results));
}

main();
```

## Output Structure

Dependent on artifacts the user wants to parse.

```typescript
export interface SyncthingLogs {
    full_path: string;
    tag: string;
    datetime: string;
    timestamp_desc: "Syncthing Log Entry";
    level: string;
    message: string;
    artifact: "Syncthing Log";
    data_type: "application:syncthing:log:entry";
}
```
