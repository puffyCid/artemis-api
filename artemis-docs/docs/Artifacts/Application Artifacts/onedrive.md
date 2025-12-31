---
description: Cloud storage software
keywords:
  - office software
  - sqlite
  - registry
  - plist
---

# OneDrive

Microsoft OneDrive is a cloud storage service that is used to store files in the
cloud. Artemis supports parsing several artifacts containing OneDrive metadata
such as:

- Basic support for OneDrive Logs (ODL files, version 3 only)
- SyncDatabase files
- Registry files (NTUSER.DAT)
- PLIST files

References:

- [OneDrive blog](http://www.swiftforensics.com/2022/02/reading-onedrive-logs.html)
- [OneDrive blog part 2](http://www.swiftforensics.com/2022/11/reading-onedrive-logs-part-2.html)

Other Parsers:

- [OneDrive Explorer](https://github.com/Beercow/OneDriveExplorer)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Microsoft OneDrive information.

```typescript
import { Format, OneDrive, Output, OutputType, PlatformType } from "./artemis-api/mod";

function main() {
  const results = new OneDrive(PlatformType.Windows);
  const output: Output = {
    name: "local",
    directory: "tmp",
    format: Format.JSONL,
    compress: false,
    timeline: false,
    endpoint_id: "",
    collection_id: 0,
    output: OutputType.LOCAL
  };
  
  results.oneDriveRetrospect(output);
}

main();
```

## Output Structure

Depending on the functions called several objects can be returned

```typescript
export interface OneDriveLog {
  path: string;
  filename: string;
  created: string;
  code_file: string;
  function: string;
  flags: number;
  params: string;
  version: string;
  os_version: string;
  description: string;
  message: string;
  datetime: string;
  timestamp_desc: "OneDrive Log Entry Created";
  artifact: "OneDrive Log";
  data_type: "applications:onedrive:logs:entry";
}

export interface OneDriveSyncEngineRecord {
  parent_resource_id: string;
  resource_id: string;
  etag: string;
  filename: string;
  path: string;
  directory: string;
  file_status: number | null;
  permissions: number | null;
  volume_id: number | null;
  item_index: number | null;
  last_change: string;
  size: number | null;
  hash_digest: string;
  shared_item: string | null;
  media_date_taken: string | null;
  media_width: number | null;
  media_height: number | null;
  media_duration: number | null;
  /**JSON string */
  graph_metadata: string;
  created_by: string;
  modified_by: string;
  last_write_count: number;
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "OneDrive Sync Last Change";
  artifact: "OneDrive Sync Record";
  data_type: "applications:onedrive:sync:entry";
}

export interface OneDriveAccount {
  email: string;
  device_id: string;
  account_id: string;
  /**Not available on macOS */
  last_signin: string;
  cid: string;
  message: string;
  datetime: string;
  timestamp_desc: "OneDrive Last Signin";
  artifact: "OneDrive Account Info";
  data_type: "applications:onedrive:account:entry";
}

export interface KeyInfo {
  path: string;
  key: string;
}

export interface OnedriveProfile {
  sync_db: string[];
  odl_files: string[];
  key_file: string[];
  config_file: string[];
}
```
