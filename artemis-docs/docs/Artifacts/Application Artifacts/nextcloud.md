---
description: An open source content collaboration platform
keywords:
  - cloud storage
---

# Nextcloud

Nextcloud is a popular open source self hosted cloud storage platform.  It can be used to save files to a remote cloud environment.

Artemis supports parsing Nextcloud desktop client on Linux platforms. Supported data includes:

- Client config information
- Sync logs
- Activity logs

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect Nextcloud client data


```typescript
import { NextcloudClient } from "./artemis-api/mod";
import { PlatformType } from "./artemis-api/src/system/systeminfo";

function main() {
    const client = new NextcloudClient(PlatformType.Linux);

    console.log(JSON.stringify(client.activityLogs()));
}

main();
```

# Output Structure

Dependent on artifacts the user wants to parse.

```typescript
export interface NextcloudClientUsers {
    full_path: string;
    version: string;
}

export interface NextcloudClientConfig {
    client_version: string;
    url: string;
    user: string;
    display_name: string;
    local_path: string;
    config_path: string;
}

/**
 * Object representing a sync log entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface NextcloudClientSyncLog {
    datetime: string;
    duration: number;
    file: string;
    instruction: SyncInstruction;
    dir: number;
    modified: string;
    etag: string;
    size: number;
    file_id: string;
    status: number;
    error_string: string;
    http_code: number;
    other_size: number;
    other_modified: string;
    x_request_id: string;
    sync_log_path: string;
    message: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}

/**
 * Nextcloud client sync instructions.  
 * From <https://github.com/nextcloud/desktop/blob/master/src/csync/csync.h#L130>
 */
export enum SyncInstruction {
    None = "None",
    Eval = "Eval",
    Remove = "Remove",
    Rename = "Rename",
    New = "New",
    Conflict = "Conflict",
    Ignore = "Ignore",
    Sync = "Sync",
    StatError = "StatError",
    Error = "Error",
    TypeChange = "TypeChange",
    UpdateMetadata = "UpdateMetadata",
    ClashConflict = "ClashConflict",
    UpdateVfsMetadata = "UpdateVFSMetadata",
    UpdateEncryptionMetadata = "UpdateEncryptionMetadata",
    Unknown = "Unknown",
}

/**
 * Object representing a activity log entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface NextcloudClientActivityLog {
    datetime: string;
    category: string;
    function: string;
    source_file: string;
    source_file_line: number;
    message: string;
    log_source: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}
```
