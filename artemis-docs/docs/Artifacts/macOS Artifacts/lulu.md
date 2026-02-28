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

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`LuLu` data.

## Sample API Script

```typescript
import { luluRules } from "./artemis-api/mod";

function main() {
  const results = luluRules();
  console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `Rule` objects

```typescript
export interface Rule {
  /**Path to the rules.plist file */
  evidence: string;
  /**Binary file allowed to make connection */
  file: string;
  /**UUID associated with the rule */
  uuid: string;
  /**Address associated with the rule */
  endpoint_addr: string;
  /**Is regex enabled */
  is_regex: boolean;
  /**Scope associated with the rule */
  scope: string;
  /**Rule action */
  type: string;
  /**Key associated with the rule */
  key: string;
  /**LuLu Action performed */
  action: LuluAction;
  /**Host associated with the rule */
  endpoint_host: string;
  /**Code Signing info associated with the binary */
  code_signing_info: Record<string, string | string[]>;
  /**Process ID */
  pid: number;
  /**Port associated with the rule */
  endpoint_port: number;
}

export enum LuluAction {
  ALLOW = "ALLOW",
  BLOCK = "BLOCK",
}
```
