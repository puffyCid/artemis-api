---
sidebar_position: 6
description: Current limitations
---

# Limitations

It is important to understand the JavaScript runtime for artemis is **not** like
normal JavaScript runtimes like NodeJS, Deno, Bun, etc. These runtimes are
primarily designed to create web apps.

Therefore tutorials or example scripts created for other runtimes may not work
with artemis. For example, the JavaScript function `console.table()` does not
exist in artemis. However, the functions `console.log()` and `console.error()`
do exist in artemis.

The JavaScript runtime for artemis is designed specifically to assist with
scripting for IR and forensic investigations.

There are currently some additional limitations to scripting:

1. All scripts executed through artemis must be in JavaScript. You **cannot**
   execute TypeScrpt scripts directly. You **must** compile and bundle them into
   one JavaScript file.
2. The JavaScript must be in common JS format (cjs). EMCAScript (ES) module
   scripts are not supported. The example code below uses esbuild to bundle the
   main.ts file to JavaScript using CJS format via `deno run build.ts`:

```typescript
import * as esbuild from "https://deno.land/x/esbuild@v0.15.10/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";

async function main() {
  const _result = await esbuild.build({
    plugins: [denoPlugin()],
    entryPoints: ["./main.ts"],
    outfile: "main.js",
    bundle: true,
    format: "cjs",
  });

  esbuild.stop();
}

main();
```
