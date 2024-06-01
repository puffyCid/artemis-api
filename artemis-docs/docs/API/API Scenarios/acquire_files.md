---
description: Acquiring local files
---

# Acquiring Files

Using the artemis API you may
[acquire](http://localhost:3000/artemis-api/docs/API/Helper/filesystem) files
from a system using OS APIs.\
Currently artemis supports copying file(s) to a local location or uploading to
the cloud.

In order to acquire a file you will need two things:

- Path to file to acquire
- An Output object structure

The Output object is used to tell artemis how to output the acquired file. This
format is described in the artemis
[format docs](../../Intro/Collections/format.md)

```typescript
/**
 * An interface to output data using `artemis`
 *
 * References:
 *  - https://puffycid.github.io/artemis-book/collections/format.html
 */
export interface Output {
  /**Name of output directory */
  name: string;
  /**Target directory for output */
  directory: string;
  /**Format of output: JSON or JSONL */
  format: Format;
  /**Compress data with GZIP and all files with ZIP */
  compress: boolean;
  /**Endpoint ID */
  endpoint_id: string;
  /**ID for collection. Must be positive number */
  collection_id: number;
  /**Output type: local, azure, aws, or gcp */
  output: OutputType;
  /**URL associated with remote upload */
  url?: string;
  /**API key required for remote upload */
  api_key?: string;
}
```

When acquiring files there are three caveats in regards to the Output object:

- Format setting. This is option not applied to file acquisitions
- Compressing setting. File acquisitions are always compressed regardless of
  this setting.
- OutputType setting. Currently only local or GCP output types can be used.

## How to acquire files

You have to use the artemis [api](../../API/overview.md) in order to acquire
files

When you acquire a file and output locally artemis will compress the target file
using gzip compression. In addition, artemis will acquire metadata associated
with the target file and then compress both the target file and metadata using
zip compression.

When you acquire a file and output to the cloud artemis will compress the target
file using gzip compression. In addition, artemis will acquire metadata and add
the metadata as custom tags to the uploaded file.

:::warning

Currently artemis does not perform any disk size checks when acquiring a file.
If you choose to output a file locally, you will need to ensure that there is
enough space on the target path to store the file

:::

:::warning

As described already in the [uploads docs](../../Intro/Collections/uploads.md),
currently artemis does not securely protect the remote API key. Make sure the
account associated with the API has only permissions needed by artemis.

:::

## Sample API Script

If you want to acquire a file and upload to GCP you would use a script like
below:

```typescript
import {
  Format,
  Output,
  OutputType,
} from "../../Projects/Deno/artemis-api/src/system/output.ts";
import { acquireFile } from "../../Projects/Deno/artemis-api/src/filesystem/acquire.ts";

function main() {
  const out: Output = {
    name: "js_acquire",
    directory: "tmp",
    format: Format.JSON,
    compress: false,
    endpoint_id: "adbcd",
    collection_id: 0,
    output: OutputType.GCP,
    url: "https://storage.googleapis.com/upload/storage/v1/b/<your-bucket>",
    api_key: "api_key_for_gcp",
  };
  const status = acquireFile("/Users/dev/Downloads/gentoo.iso", out);
  console.log(status);
}

main();
```

If you want to acquire a file and output locally you would use a script like
below:

```typescript
import {
  Format,
  Output,
  OutputType,
} from "../../Projects/Deno/artemis-api/src/system/output.ts";
import { acquireFile } from "../../Projects/Deno/artemis-api/src/filesystem/acquire.ts";

function main() {
  const out: Output = {
    name: "js_acquire",
    directory: "./tmp",
    format: Format.JSON,
    compress: false,
    endpoint_id: "adbcd",
    collection_id: 0,
    output: OutputType.Local,
  };
  const status = acquireFile("/Users/dev/Downloads/gentoo.iso", out);
  console.log(status);
}

main();
```
