---
description: macOS Munki application
keywords:
  - macos
  - sqlite
---

# Gatekeeper

macOS Gatekeeper is security tool that enforces code signing on macOS
applications. If a file has an quarantine attribute, Gatekeeper will check the
file before allow it to execute.

Applications that are allowed to execute get tracked in the sqlite database file
at:

- /var/db/SystemPolicy

References:

- [Gatekeeper info](https://nixhacker.com/security-protection-in-macos-1/)
- [Gatekeeper](https://en.wikipedia.org/wiki/Gatekeeper_(macOS))

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`Gatekeeper` data.

# Sample API Script

```typescript
import { gatekeeperEntries } from "./artemis-api/mod";

function main() {
  const values = gatekeeperEntries();
  console.log(values);
}

main();
```

# Output Structure

Array of `GatekeeperEntries`

```typescript
export interface GatekeeperEntries {
  id: number;
  version: number;
  type: GkType;
  requirement?: string;
  allow: boolean;
  disabled: boolean;
  expires: string;
  label?: string;
  filter_unsigned?: string;
  entry_created: string;
  entry_modified: string;
  user?: string;
  remarks?: string;
  expiration?: string;
  object_state_label?: string;
  path?: string;
  object_state_ctime?: string;
  hash?: string;
  object_expires?: string;
  object_path?: string;
  object_ctime?: string;
  object_mtime?: string;
}

export enum GkType {
  EXECUTE = "SecAssessmentOperationTypeExecute",
  INSTALL = "SecAssessmentOperationTypeInstall",
  DOCUMENT = "SecAssessmentOperationTypeOpenDocument",
  UNKNOWN = "Unknown",
}
```
