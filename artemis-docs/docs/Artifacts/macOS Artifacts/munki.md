---
description: macOS Munki application
keywords:
  - macos
  - sqlite
---

# Munki

Munki is a popular open source tool to manage software install for a macOS
environment. Admins can create software catalogs to allow users to install
popular applications.

Munki also has the capability to track application usage, which can be useful to
determine if an application was executed. This feature is primarily used to
track unused
[software](https://github.com/munki/munki/wiki/Removal-of-Unused-Software#how-it-works).

However, it appears Munki tracks any application that is launched by the user
via the application icon. (command tools are **not** tracked)

References:

- [Application Usage Munki](https://t-lark.github.io/posts/app-usage-data-munki-fleet-snowflake/)

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`Munki` data.

# Sample API Script

```typescript
import { munkiApplicationUsage } from "./artemis-api/mod.ts";

function main() {
  const results = munkiApplicationUsage();
  console.log(results);
}
```

# Output Structure

A `MunkiApplicationUsage` object structure

```typescript
export interface MunkiApplicationUsage {
  /**Application event such as: activate, quite, launch */
  event: string;
  /**Application bundle ID */
  bundle_id: string;
  /**Application version */
  app_version: string;
  /**Path the application */
  app_path: string;
  /**Last time of the event */
  last_time: string;
  /**Number of times of the event */
  number_times: number;
}
```
