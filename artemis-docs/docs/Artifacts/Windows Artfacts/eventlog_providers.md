---
description: Windows EventLog Providers
keywords:
  - windows
  - registry
---

# EventLog Providers

Artemis supports extracting the registered Windows EventLog providers from the Windows SYSTEM and SOFTWARE Registry files.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect EventLog providers rules.

## Sample API Script

```typescript
import { getEventlogProviders } from "./artemis-api/mod";
function main() {
  const events = getEventlogProviders();
  console.log(JSON.stringify(events));

}

main();
```

## Output Structure

An array of `RegistryEventlogProviders`

```typescript
export interface RegistryEventlogProviders {
    registry_file: string;
    key_path: string;
    name: string;
    channel_names: string[];
    message_file: string;
    last_modified: string;
    parameter_file: string;
    guid: string;
    enabled: boolean;
    channel_types: ChannelType[];
    message: string;
    datetime: string;
    timestamp_desc: "Registry Last Modified";
    artifact: "Windows EventLog Provider";
    data_type: "windows:registry:eventlogprovider:entry";
}

export enum ChannelType {
    Admin = "Admin",
    Operational = "Operational",
    Analytic = "Analytic",
    Debug = "Debug",
    Unknown = "Unknown",
}
```
