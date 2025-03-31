---
description: macOS Quarnatine Event
keywords:
  - macos
  - sqlite
---

# Quarantine Events

When a user downloads files from the Internet, applications/macOS will often
apply a quarantine attribute to the file to indicate it was downloaded online.
These events are tracked in a sqlite file at:

- ~/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`Quarantine Event` data.

# Sample API Script

```typescript
import { quarantineEvents } from "./artemis-api/mod";

function main() {
  const results = quarantineEvents();
  console.log(results);
}
```

# Output Structure

An array of `MacosQuarantine` objects

```typescript
export interface MacosQuarantine {
  path: string;
  events: QuarantineEvent[];
}
export interface QuarantineEvent {
  id: string;
  timestamp: string;
  bundle_id?: string;
  agent_name: string;
  url_string?: string;
  sender_name?: string;
  sender_address?: string;
  type: QuarantineType;
  origin_title?: string;
  origin_url?: string;
  origin_alias?: string;
}

export enum QuarantineType {
  WEBDOWNLOAD = "WebDownload",
  DOWNLOAD = "Download",
  EMAILATTACHMENT = "EmailAttachment",
  MESSAGEATTACHMENT = "MessageAttachment",
  CALENDARATTACHMENT = "CalendarAttachment",
  ATTACHMENT = "Attachment",
  UNKNOWN = "Unknown",
}
```
