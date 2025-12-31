---
description: Primary source of logs on macOS
keywords:
  - macOS
  - logs
  - binary
---

# UnifiedLogs

macOS `unifiedlogs` are the primary files associated with logging system
activity. They are stored in a binary format at `/var/db/diagnostics/`.

Other Parsers:

- [UnifiedLogReader](https://github.com/ydkhatri/UnifiedLogReader) (Only partial
  support)

References:

- [Unified Logging](https://eclecticlight.co/2018/03/19/macos-unified-log-1-why-what-and-how/)
- [Reviewing logs](https://www.mandiant.com/resources/blog/reviewing-macos-unified-logs)
- [Reviewing more logs](https://www.crowdstrike.com/blog/how-to-leverage-apple-unified-log-for-incident-response/)

## TOML Collection

```toml
[output]
name = "unifiedlogs_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "unifiedlogs"
[artifacts.unifiedlogs]
sources = ["Special"]
# Optional
# logarchive_path = ""
```

## Collection Options

- `sources` List of directories that should be included when parsing the
  `unifiedlogs` These directories are found at `/var/db/diagnostics/`. Only the
  following directories contain logs:
  - Persist
  - Special
  - Signpost
  - HighVolume
- `logarchive_path` Alternative path to a logarchive formatted directory. This
  configuration is **optional**

To parse all logs you would use
`sources = ["Special", "Persist", "Signpost", "HighVolume"]`

## Output Structure

An array of `UnifiedLog` entries

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
  /**ISO RFC 3339 timestamp with nanosecond precision */
  timestamp: string;
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
