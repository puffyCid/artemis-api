# Artemis API

This repo contains the TypeScript bindings for creating scripts for
[artemis](https://github.com/puffycid/artemis).

An in depth guide is documented at https://puffycid.github.io/artemis-api

## Quick Start

1. Download [deno](https://deno.com/runtime)
2. Install a support text editor or IDE. Both [VSCodium](https://vscodium.com/)
   and [VSCode](https://code.visualstudio.com/) have been tested
3. Install the
   [deno](https://deno.com/manual@v1.33.3/getting_started/setup_your_environment)
   extension for you preferred text editor or IDE
4. Create a deno project (ex: `deno init processListings`)
5. Import `artemis-api` into your project

Basic example

```typescript
import { processListing } from "https://github.com/puffycid/artemis-api/mod.ts";

function main() {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const pe_info = true;

  const proc_list = processListing(md5, sha1, sha256, pe_info);
  return proc_list;
}

main();
```

Lots of example scripts can be found at
[artemis-scripts](https://github.com/puffycid/artemis-scripts)
