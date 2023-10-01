---
description: Cron jobs on macOS
keywords:
  - macOS
  - persistence
  - plaintext
---

# Cron

`Cron` is an application that lets users create jobs on an endpoint. It is
common on Unix, Linux, and macOS systems. A `Cron` job can be configured to
execute a command on at a specific time. It is a popular form of persistence on
supported systems.

Other parsers:

- Any program that read a text file

Refernces:

- [Cron](https://en.wikipedia.org/wiki/Cron)

# TOML Collection

```toml
system = "macos" # or "linux"

[output]
name = "cron_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "cron"
```

# Collection Options

- N/A

# Output Structure

An array of `Cron` entries.

```typescript
export interface Cron {
  /**What hour should cron job run. * means every hour */
  hour: string;
  /**What minute should cron job run. * means every minute  */
  min: string;
  /**What day should cron job run. * means every day */
  day: string;
  /**What month should cron job run. * means every month */
  month: string;
  /**What weekday should cron job run. * means every day */
  weekday: string;
  /**Command to execute when cron job is triggered */
  command: string;
}
```
