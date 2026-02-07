---
description: Windows network connections
keywords:
  - windows
  - volatile
---

# Connections

Gets a standard network connections listing using the Windows API

Other Parsers:

- Any tool that calls the Windows API or can parse the raw Windows memory

References:

- N/A

## TOML Collection

```toml
[output]
name = "connections_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "connections"
```

## Collection Options

None

## Output Structure

An array of `Connection` entries

```typescript
export interface Connection {
    /**Process ID with connection */
    pid: number;
    /**Process name with connection */
    process_name: string;
    /**Local IP. Can be either IPv4 or IPv6 */
    local_address: string;
    /**Local port used for connection */
    local_port: number;
    /**Remote IP. Can be either IPv4 or IPv6 */
    remote_address: string;
    /**Remote port used for connection */
    remote_port: number;
    /**State of the process connection */
    state: NetworkState;
    /**Connection protocol */
    protcol: Protocol;
}

export enum Protocol {
    Tcp = "Tcp",
    Udp = "Udp",
    Icmp = "Icmp",
    Unknown = "Unknown",
}

export enum NetworkState {
    Listen = "Listen",
    Established = "Established",
    SynRecv = "SynRecv",
    SynSent = "SynSent",
    FinWait = "FinWait",
    FinWait2 = "FinWait2",
    TimeWait = "TimeWait",
    Close = "Close",
    CloseWait = "CloseWait",
    LastAck = "LastAck",
    Closing = "Closing",
    DeleteTcb = "DeleteTcb",
    Unknown = "Unknown",
    None = "None",
}
}
```
