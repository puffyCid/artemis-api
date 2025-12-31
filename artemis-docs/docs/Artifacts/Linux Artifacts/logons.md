---
description: Linux logon info
keywords:
  - linux
  - binary
  - sqlite
---

# Logons

Linux stores `Logon` information in several different files depending on the
distro and software installed. Typically the following files contain logon
information on Linux:

- wtmp - Historical logons
- btmp - Failed logons
- utmp - Users currently logged on
- wtmp.db - Historical logons (Requires Artemis API)

Other Parsers:

- N/A

References:

- [libyal](https://github.com/libyal/dtformats/blob/main/documentation/Utmp%20login%20records%20format.asciidoc)
- [utmp](https://man7.org/linux/man-pages/man5/utmp.5.html)

## TOML Collection

```toml
[output]
name = "logon_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "logons"
[artifacts.logons]
# Optional
# alt_file = ""
```

## Collection Options

- `alt_file` An alternative path to a wtmp, utmp, or btmp file. This
  configuration is **optional**

## Output Structure

An array of `Logon` entries

```typescript
export interface Logon {
  /**Logon type for logon entry */
  logon_type: string;
  /**Process ID */
  pid: number;
  /** Terminal info */
  terminal: string;
  /**Terminal ID for logon entry */
  terminal_id: number;
  /**Username for logon */
  username: string;
  /**Hostname for logon source */
  hostname: string;
  /**Termination status for logon entry */
  termination_status: number;
  /**Exit status logon entry */
  exit_status: number;
  /**Session for logon entry */
  session: number;
  /**Timestamp for logon */
  timestamp: string;
  /**Microseconds for logon */
  microseconds: number;
  /**Source IP for logon entry */
  ip: string;
  /**Status of logon entry: `Success` or `Failed` */
  status: string;
}

An array of `LastLogons` entries when querying the wtmp.db file

export interface LastLogons {
    id: number;
    type: number;
    user: string;
    login: string;
    logout: string;
    tty: string;
    remote: string;
    service: string;
    message: string;
    datetime: string;
    timestamp_desc: "User Logon";
    artifact: "wtmpdb Logons";
    data_type: "linux:wtmpdb:entry";
}
```
