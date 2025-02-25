---
description: macOS WiFi connections
keywords:
  - macOS
  - plist
---

# WiFi

Artemis supports extract WiFi access points that the macOS system has connected
to. By default it will try to parse WiFi networks at
/Library/Preferences/com.apple.wifi.known-networks.plist.

You may also provide an optional alnternative path to
com.apple.wifi.known-networks.plist.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get WiFi
network.

# Sample API Script

```typescript
import {
  wifiNetworks,
} from "./artemis-api/mod.ts";

async function main() {
  const results = wifiNetworks();

  console.log(results);
}
```

# Output Structure

An array of `Wifi`

```typescript
export interface Wifi {
  name: string;
  security: string;
  hidden: boolean;
  roaming_profile: string;
  add_reason: string;
  added_at: string;
  auto_join: boolean;
  personal_hotspot: boolean;
  joined_by_user_at: string;
  last_discovered: string;
  updated_at: string;
}
```
