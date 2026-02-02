---
description: macOS launch daemons and agents
keywords:
  - macOS
  - persistence
  - plist
---

# Launchd

macOS launch daemons (launchd) are the most common way to register
applications for persistence on macOS. launchd can be registered for a single
user or system wide. artemis will try to parse all known launchd locations by
default.

- **/Users/*/Library/LaunchDaemons/**
- **/Users/*/Library/LaunchAgents/**
- **/System/Library/LaunchDaemons/**
- **/Library/Apple/System/Library/LaunchDaemons/**
- **/System/Library/LaunchAgents/**
- **/Library/Apple/System/Library/LaunchAgents/**

Other Parsers:

- Any tool that can parse a plist file

References:

- [launchd](https://www.launchd.info/)
- `man launchd.plist`

## TOML Collection

```toml
[output]
name = "launchd_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "launchd"
[artifacts.launchd]
# Optional
# alt_file = ""
```

## Collection Options

- `alt_file` Use an alternative Launchd file. This configuration is
  **optional**. By default artemis will read all Launchd Daemons and Agents

## Output Structure

An array of `Launchd` entries

```typescript
export interface Launchd {
  /**JSON representation of launchd plist contents */
  launchd_data: Record<string, unknown>;
  /**Full path of the plist file */
  plist_path: string;
  /**Created timestamp for plist file */
  created: string;
  /**Modified timestamp for plist file */
  modified: string;
  /**Accessed timestamp for plist file */
  accessed: string;
  /**Changed timestamp for plist file */
  changed: string;
}
```
