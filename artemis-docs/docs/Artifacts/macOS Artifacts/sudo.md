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

macOS `SudoLogs` are stored in the Unified Log files. The log entries show
evidence of commands executed with elevated privileges

Other Parsers:

- None

References:

- N/A

## TOML Collection

```toml
[output]
name = "sudologs_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "sudologs-macos"
[artifacts.sudologs_macos]
# Optional
# logarchive_path = ""
```

## Collection Options

- `logarchive_path` Path to a logarchive formatted directory. This configuration
  is **optional**

## Output Structure

An array of [UnifiedLog](./unifiedlogs.md) entries associated with sudo activity
