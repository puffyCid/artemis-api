---
description: Linux sudo records
keywords:
  - linux
  - logs
  - binary
---

# Sudo Logs

Unix `SudoLogs` are the log files associated with sudo execution. Sudo ("super
user do" or "substitute user") is used to run programs with elevated privileges.

Linux `SudoLogs` are stored in the Systemd Journal files.<br /> The log entries
show evidence of commands executed with elevated privileges

Other Parsers:

- None

References:

- N/A

# TOML Collection

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
artifact_name = "sudologs-linux"
[artifacts.sudologs_linux]
# Optional
# alt_path = ""
```

# Collection Options

- `alt_path` Path to a directory containing Journal files. This configuration is
  **optional**

# Output Structure

An array of [Journal](./journals.md) entries containing sudo activity
