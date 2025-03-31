---
description: macOS Lulu application
keywords:
  - macos
  - plist
---

# LuLu Firewall

LuLu is a popular open source firewall application for macOS developed by
Objective-See. It allows users to block outbound connections from applications.
Artemis supports extracting Lulu firewall rules from
/Library/Objective-See/LuLu/rules.plist.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`LuLu` data.

# Sample API Script

```typescript
import { luluRules } from "./artemis-api/mod";

function main() {
  const results = luluRules();
  console.log(results);
}
```

# Output Structure

A `LuluRules` object structure

```typescript
export interface LuluRules {
  path: string;
  rules: Rule[];
}

export interface Rule {
  file: string;
  uuid: string;
  endpoint_addr: string;
  is_regex: boolean;
  scope: string;
  type: string;
  key: string;
  action: LuluAction;
  endpoint_host: string;
  code_signing_info: Record<string, string | string[]>;
  pid: number;
  endpoint_port: number;
}

export enum LuluAction {
  ALLOW = "ALLOW",
  BLOCK = "BLOCK",
}
```
