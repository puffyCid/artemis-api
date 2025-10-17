# Artemis API

This repo contains the TypeScript bindings for creating scripts for
[artemis](https://github.com/puffycid/artemis).

An in depth guide is documented at https://puffycid.github.io/artemis-api

## Quick Start

1. Install a text editor or IDE that supports TypeScript. Such as  [VSCodium](https://vscodium.com/)
   or [VSCode](https://code.visualstudio.com/)
2. Create a TypeScript file (ex: main.ts)
3. Import `artemis-api` into your project and start scripting!
4. Compile your script to JavaScript
5. Run with artemis!

Basic example

```typescript
import { processListing } from "./artemis-api/mod";

function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const binary_info = false;

  const proc_list = processListing(md5, sha1, sha256, binary_info);
  for(const entry of proc_list) {
    console.log(`Process name is ${entry.name}`r);
  }

  return proc_list;
}

main();
```

> esbuild --bundle --outfile=main.js main.ts
> artemis -j main.js

```
>  artemis -j main.js

Process name is: mullvad-daemon
Process name is: codium
Process name is: electron
Process name is: bridge-gui
Process name is: syncthing
Process name is: artemis
...
```
