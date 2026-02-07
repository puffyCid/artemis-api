---
description: PowerShell history entries
keywords:
  - windows
  - plaintext
---

# PowerShell History

Artemis support extracting PowerShell history entries from Windows systems.
Modern versions of PowerShell will now write commands executed to a history file
on the system.

Depending on the platform artemis will try to parse PowerShell history for all users at:

- \\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt
- /Users/*/.local/share/PowerShell/PSReadLine/ConsoleHost_history.txt
- /home/*/.local/share/PowerShell/PSReadLine/ConsoleHost_history.txt

You may also provide an optional alternative path to ConsoleHost_history.txt.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Logon entries.

## Sample API Script

```typescript
import {
  powershellHistory,
} from "./artemis-api/mod";

function main() {
  const results = powershellHistory();

  console.log(results);
}
```

## Output Structure

An array of `History`

```typescript
export interface History {
  line: string;
  path: string;
  created: string;
  modified: string;
  accessed: string;
  changed: string;
  message: string;
  datetime: string;
  timestamp_desc: "PowerShell History Modified";
  artifact: "PowerShell History";
  data_type: "application:powershell:entry";
}
```
