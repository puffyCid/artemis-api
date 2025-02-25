---
description: Transparency, Consent, and Control database
keywords:
  - macOS
  - sqlite
---

# TCC

The macOS Transparency, Consent, and Control (`TCC`) database contains data
associated with permissions granted to applications. Artemis support querying
the database (SQLite) and extracting permissions granted to applications.

The TCC.db file can exist in multiple directories. Artemis will try to parse
files at the following locations:

- /Users/*/Library/Application Support/com.apple.TCC/TCC.db
- /Library/Application Support/com.apple.TCC/TCC.db

You may also provide an optional alternative path to the TCC.db fille.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect TCC
data.

# Sample API Script

```typescript
import {
  queryTccDb,
} from "./artemis-api/mod.ts";

function main() {
  const results = queryTccDb();

  console.log(results);
}
```

# Output Structure

An array of `TccValues` entries.

```typescript
export interface TccValues {
  db_path: string;
  data: TccData[];
}

export interface TccData {
  service: string;
  client: string;
  client_type: ClientType;
  auth_value: AuthValue;
  auth_reason: Reason;
  auth_version: number;
  cert: SingleRequirement | undefined;
  policy_id: number | undefined;
  indirect_object_identifier_type: number | undefined;
  indirect_object_identifier: string;
  indirect_object_code_identity: SingleRequirement | undefined;
  flags: number | undefined;
  last_modified: string;
  pid: number | undefined;
  pid_version: number | undefined;
  boot_uuid: string;
  last_reminded: string;
}

export enum Reason {
  Error = "Error",
  UserConsent = "UserConsent",
  UserSet = "UserSet",
  SystemSet = "SystemSet",
  ServicePolicy = "ServicePolicy",
  MDMPolicy = "MDMPolicy",
  OverridePolicy = "OverridePolicy",
  MissingUsageString = "MissingUsageString",
  PromptTimeout = "PromptTimeout",
  PreflightUnknown = "PreflightUnknown",
  Entitled = "Entitled",
  AppTypePolicy = "AppTypePolicy",
  Unknown = "Unknown",
}

export enum ClientType {
  BundleId = "BundleId",
  AbsolutePath = "AbsolutePath",
  Unknown = "Unknown",
}

export enum AuthValue {
  Denied = "Denied",
  Allowed = "Allowed",
  Limited = "Limited",
  Unknown = "Unknown",
}
```
