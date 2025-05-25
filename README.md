# Artemis API

This repo contains the TypeScript bindings for creating scripts for
[artemis](https://github.com/puffycid/artemis).

An in depth guide is documented at https://puffycid.github.io/artemis

## Quick Start

1. Install a text editor or IDE that supports TypeScript. Such as  [VSCodium](https://vscodium.com/)
   or [VSCode](https://code.visualstudio.com/)
2. Create a TypeScript file (ex: main.ts)
3. Import `artemis-api` into your project and start scripting!

Basic example

```typescript
import { processListing } from "./artemis-api/mod";

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

