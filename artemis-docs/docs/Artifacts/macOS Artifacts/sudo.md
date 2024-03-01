---
description: macOS sudo records
keywords:
  - macOS
  - logs
  - binary
---

# Sudo Logs

Unix `SudoLogs` are the log files associated with sudo execution. Sudo ("super
user do" or "substitute user") is used to run programs with elevated privileges.

macOS `SudoLogs` are stored in the Unified Log files.<br /> Linux `SudoLogs` are
stored in the Systemd Journal files.<br /> The log entries show evidence of
commands executed with elevated privileges

Other Parsers:

- None

References:

- N/A

# TOML Collection

```toml
system = "maco" # or "linux"

[output]
name = "sudologs_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "sudologs"
# Optional
# logarchive_path = ""
```

# Collection Options

- `logarchive_path` Path to a logarchive formatted directory. This configuration
  is **optional**

# Output Structure

On a macOS system `sudologs` return an array of `UnifiedLog` entries

```typescript
export interface UnifiedLog {
  /**Subsystem used by the log entry */
  subsystem: string;
  /**Library associated with the log entry */
  library: string;
  /**Log entry category */
  category: string;
  /**Process ID associated with log entry */
  pid: number;
  /**Effective user ID associated with log entry */
  euid: number;
  /**Thread ID associated with log entry */
  thread_id: number;
  /**Activity ID associated with log entry */
  activity_id: number;
  /**UUID of library associated with the log entry */
  library_uuid: string;
  /**UNIXEPOCH timestamp of log entry in nanoseconds */
  time: number;
  /**Log entry event type */
  event_type: string;
  /**Log entry log type */
  log_type: string;
  /**Process associated with log entry */
  process: string;
  /**UUID of process associated with log entry */
  process_uuid: string;
  /**Raw string message  associated with log entry*/
  raw_message: string;
  /**Boot UUID associated with log entry */
  boot_uuid: string;
  /**Timezone associated with log entry */
  timezone_name: string;
  /**Strings associated with the log entry */
  mesage_entries: Record<string, string | number>;
  /**
   * Resolved message entry associated log entry.
   * Merge of `raw_message` and `message_entries`
   */
  message: string;
}
```
