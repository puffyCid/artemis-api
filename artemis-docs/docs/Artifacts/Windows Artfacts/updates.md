---
description: Windows Update History
keywords:
  - windows
  - ese
---

# Updates

Artemis supports parsing the history of Windows updates on the system. By
default artemis will try to parse the ESE database at:

- Windows\SoftwareDistribution\DataStore\DataStore.edb

You may also provide an alternative path to DataStore.edb.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
Windows Updates.

## Sample API Script

```typescript
import { Updates } from ".././artemis-api/src/windows/ese/updates";

function main() {
  const updates = new Updates();
  console.log(updates.updateHistory(updates.pages));
}

main();
```

## Output Structure

An array of `UpdateHistory`

```typescript
export interface UpdateHistory {
  client_id: string;
  support_url: string;
  /**Timestamp */
  date: string;
  description: string;
  operation: Operation;
  server_selection: ServerSelection;
  service_id: string;
  title: string;
  update_id: string;
  update_revision: number;
  categories: string;
  more_info: string;
}

export enum ServerSelection {
  Default = "Default",
  ManagedServer = "ManagedServer",
  WindowsUpdate = "WindowsUpdate",
  Others = "Others",
  Unknown = "Unknown",
}

export enum Operation {
  Installation = "Installation",
  Uninstallation = "Uninstallation",
  Unknown = "Unknown",
}
```
