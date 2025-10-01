---
description: Windows WiFi connections
keywords:
  - windows
  - registry
---

# WiFi

Artemis supports extracting WiFi access points that the Windows system has connected
to. By default it will try to parse WiFi networks at SOFTWARE Registry file.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get WiFi
network.

# Sample API Script

```typescript
import { wifiNetworksWindows } from "./artemis-api/mod";

function main() {
    const results = wifiNetworksWindows();
    console.log(JSON.stringify(results));
}

main();
```

# Output Structure

An array of `Wifi`

```typescript
export interface Wifi {
    name: string;
    description: string;
    managed: boolean;
    category: WifiCategory;
    created_local_time: string;
    name_type: NameType;
    id: string;
    last_connected_local_time: string;
    registry_path: string;
    registry_file: string;
    message: string;
    datetime: string;
    timestamp_desc: "Registry Key Modified";
    artifact: "WiFi Network";
    data_type: "windows:registry:wifi:entry";
}

export enum WifiCategory {
    Public = "Public",
    Private = "Private",
    Domain = "Domain",
    Unknown = "Unknown",
}

/**
 * From: https://community.spiceworks.com/t/what-are-the-nametype-values-for-the-networklist-registry-keys/526112/6
 */
export enum NameType {
    Wired = "Wired",
    Vpn = "VPN",
    Wireless = "Wireless",
    Mobile = "Mobile",
    Unknown = "Unknown",

}
```
