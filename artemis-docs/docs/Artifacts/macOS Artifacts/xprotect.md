---
description: The macOS Antivirus engine
keywords:
  - macOS
  - plist
---

# Xprotect

Xprotect is a signature based macOS AV engine for detecting malicious activity
on a macOS system. Artemis can extract some Xprotect defintions on the system.
Currently artemis will try to parse the Xprotect entries at:

- /Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/Xprotect.plist
- /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Xprotect.plist

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Xprotect data.

## Sample API Script

```typescript
import {
  getXprotectDefinitions,
} from "./artemis-api/mod";

function main() {
  const results = getXprotectDefinitions();

  console.log(results);
}
```

## Output Structure

An array of `XprotectEntries` entries.

```typescript
export interface XprotectEntries {
  name: string;
  launch_type: string;
  matches: MatchData[];
}

export interface MatchData {
  /**Hex encoded values */
  pattern: string;
  filetype: string;
  sha1: string;
  filename: string;
}
```
