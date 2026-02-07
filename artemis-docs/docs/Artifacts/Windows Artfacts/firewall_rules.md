---
description: Windows Firewall Rules
keywords:
  - windows
  - registry
---

# Firewall Rules

Artemis supports extracting the Windows Firewall rules from the Windows SYSTEM Registry files.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect Firewall rules.

## Sample API Script

```typescript
import { firewallRules } from "./artemis-api/mod";

function main() {
    const results = firewallRules();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `FirewallRules`

```typescript
export interface FirewallRules {
    action: string;
    active: boolean;
    direction: Direction;
    protocol: Protocol;
    protocol_number: number;
    local_port: number;
    remote_port:number;
    name: string;
    registry_key_name: string;
    description: string;
    application: string;
    registry_file: string;
    key_path: string;
    last_modified: string;
    rule_version: string;
    profile: string;
    service: string;
    remote_address: string[];
    local_address: string[];
    [ key: string ]: unknown;
    message: string;
    datetime: string;
    timestamp_desc: "Registry Last Modified";
    artifact: "Windows Firewall Rule";
    data_type: "windows:registry:firewallrule:entry";
}

export enum Direction {
    Inbound = "Inbound",
    Outbound = "Outbound",
    Unknown = "Unknown",
}

export enum Protocol {
    TCP = "TCP",
    UDP = "UDP",
    ICMP = "ICMP",
    ICMP_v6 = "ICMP_v6",
    Unkonwn = "Unknown",
    IPV6 = "IPv6",
    GRE = "GRE",
    IGMP = "IGMP",
}
```
