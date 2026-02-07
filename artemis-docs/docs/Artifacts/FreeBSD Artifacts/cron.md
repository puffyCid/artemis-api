---
description: Cron jobs on FreeBSD
keywords:
  - persistence
  - plaintext
---

# Cron

Cron is an application that lets users create jobs on an endpoint. It is
common on Unix, Linux, and macOS systems. A cron job can be configured to
execute a command on at a specific time. It is a popular form of persistence on
supported systems.

Other parsers:

- Any program that read a text file

References:

- [Cron](https://en.wikipedia.org/wiki/Cron)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse Cron files.

```typescript
import { getCron, PlatformType } from "./artemis-api/mod";

function main() {
  const results = getCron(PlatformType.Linux);
  console.log(JSON.stringify(results));
}

main();
```

## Output Structure

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
  /**Path to the cron file */
  path: string;
}
```
