# Artemis API

This repo contains the TypeScript bindings for creating scripts for
[artemis](https://github.com/puffycid/artemis).

An in depth guide is documented at https://puffycid.github.io/artemis-api

## Quick Start

1. Install a support text editor or IDE. Both [VSCodium](https://vscodium.com/)
   and [VSCode](https://code.visualstudio.com/) have been tested
4. Create a TypeScript file (ex: main.ts)
5. Import `artemis-api` into your project

Basic example

```typescript
import { processListing } from "./artemis-api/mod.ts";

function main() {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const binary_info = true;

  const proc_list = processListing(md5, sha1, sha256, binary_info);
  return proc_list;
}

main();
```

