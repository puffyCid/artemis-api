---
description: Applications on macOS
keywords:
  - macOS
  - file metadata
  - plist
---

# Firewall

Artemis supports parsing macOS Firewall information. It can get a list of
applications that allow or block incoming connections.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get
Firewall information.

# Sample API Script

```typescript
import {
  firewallStatus,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  const results = firewallStatus();
  console.log(results);
}
```

# Output Structure

A `Firewall` object structure

```typescript
export interface Firewall {
  allow_signed_enabled: boolean;
  firewall_unload: boolean;
  logging_enabled: boolean;
  global_state: boolean;
  logging_option: boolean;
  stealth_enabled: boolean;
  version: string;
  applications: FirewallApplication[];
  exceptions: FirewallExceptions[];
  explict_auths: string[];
  services: Services[];
}

export interface FirewallExceptions {
  path: string;
  state: number;
}

export interface Services {
  name: string;
  allowed: boolean;
}

export interface FirewallApplication {
  code_signing: SingleRequirement;
  application_info: Alias;
  block_incoming: boolean;
}
```
