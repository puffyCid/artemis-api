---
description: Timelining artifacts
---

# Timelines

Using the artemis API you may timeline artifacts into a standard JSONL (or JSON)
format. Artemis uses the timeline format based on
[Timesketch](https://timesketch.org/).

The format is defind below:

```typescript
export interface TimesketchTimeline {
  /** **Required by Timeskech** ISO8601 timestamp format: YYYY-MM-DD HH:mm:ss. All times are in UTC */
  datetime: string;
  /** **Required by Timeskech** Description of the timestamp. Ex: FileCreated */
  timestamp_desc: string;
  /** **Required by Timeskech** Timeline message data */
  message: string;
  /**The type of artifact that was timelined */
  artifact: string;
  /**
   * Artifact data type. Based on plaso definition
   * (its kind of freeform, https://github.com/log2timeline/plaso/blob/main/docs/sources/user/Scribbles-about-events.md).
   * Looks like: `source:artifact:artifact:data`. With first artifact most generic and second one more specific
   * :artifact: can be nested. Ex: `windows:registry:explorer:programcache`
   */
  data_type: string;
  /**Include any other valid JSON data */
  [key: string]: unknown;
}
```

The API function **timelineArtifact** can be used to timeline supported
artifacts. You can also timeline your own custom artifacts, you just need to
ensure the output follows **TimesketchTimeline** object above.

A sample script below shows how to timeline launchdaemon data.

```typescript
import { dumpData, getLaunchdDaemons } from "../../Projects/artemis-api/mod";
import { MacosError } from "../../Projects/artemis-api/src/macos/errors";
import {
  Format,
  Output,
  OutputType,
} from "../../Projects/artemis-api/src/system/output";

import { TimesketchError } from "../../Projects/artemis-api/src/timesketch/error";
import { timelineArtifact } from "../../Projects/artemis-api/src/timesketch/timeline";
import { TimesketchArtifact } from "../../Projects/artemis-api/types/timesketch/timeline";

function main() {
  const out: Output = {
    name: "launchd",
    directory: "./tmp",
    format: Format.JSONL,
    compress: false,
    timeline: false,
    endpoint_id: "abc",
    collection_id: 0,
    output: OutputType.LOCAL,
  };

  const daemons = getLaunchdDaemons();
  if (daemons instanceof MacosError) {
    return;
  }

  const results = timelineArtifact(daemons, TimesketchArtifact.LAUNCHD);
  if (status instanceof TimesketchError) {
    return;
  }
  dumpData(results, "launchd", out);
}

main();
```

A quick walkthrough for this script:

1. `Output` define our output object as documented in
   [format documentation](../../Intro/Collections/format.md)
2. `getLaunchdDaemons()` parse macOS launchDaemons
3. `timelineArtifact(daemons, TimesketchArtifact.LAUNCHD)` timeline our parsed
   launchDaemons
4. `dumpData(JSON.stringify(results), "launchd", out)` Dump the raw JSONL data
   to a file. This will skip the metadata that artemis adds to artifact output
