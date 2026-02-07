---
sidebar_position: 3
description: What is bundling
---

# Bundling

## What is a bundler

Before we can start creating more powerful scripts, it is important to reviewing bundling.

Artemis only supports executing a single script file. This means our entire script must be contained in a single file.

So if we want to import the artemis API we need to learn how to use a bundler to help compile our script into a single file.

There are multiple types of bundler applications that can help us with this
task. One of the most popular ones is [esbuild](https://esbuild.github.io/)

## Esbuild

[esbuild](https://esbuild.github.io/) is a popular Bundler for JavaScript. It can be run as a standalone binary on your local development laptop.
Once you have esbuild installed you can compile and bundle your TypeScript with the following command:

```
esbuild --bundle --outfile=out.js main.ts
```

The above commands will use the main.ts file and bundle all of its imports into one .js file using esbuild.

:::info

esbuild can also minify JavaScript code! This can dramatically reduce the size of your script

```
esbuild --bundle --minify --outfile=out.js main.ts
```

:::

## Examples

### Intermediate

Lets start using the API!

1. Clone the artemis API repo: https://github.com/puffyCid/artemis-api
2. Create the file main.ts and add the following


```typescript
// Update this path to point to your cloned artemis-api repo
import { timeNow } from "./artemis-api/src/time/conversion";

function main() {
  const time_in_seconds = timeNow();

  console.log(`Time in unix epoch seconds: ${time_in_seconds}`);
}

main();
```

If you hover over the `timeNow()` function your text editor should provide function documentation.

If you try to run the above above code with artemis you will get a similar error as below:

```
> artemis -j main.ts 
[artemis] Starting artemis collection!
01:29:25 [ERROR] [runtime] Could not execute script: JsError { inner: Native(JsNativeError { kind: Syntax, message: "expected token '.', got '{' in import.meta at line 1, col 8", cause: None, .. }) }
[artemis] Finished artemis collection!
```

Artemis cannot resolve imports! We need to bundle this script and compile to JavaScript.

Using esbuild try the following commands: `esbuild --bundle --outfile=out.js main.ts`

You should now have a main.js file in your directory. If you open it in a text editor you should see something similar to below:

```javascript
(() => {
  // ./artemis-api/src/time/conversion.ts
  function timeNow() {
    // This is a Rust function!
    const data = js_time_now();
    return Number(data);
  }

  // main.ts
  function main() {
    const time_in_seconds = timeNow();
    console.log(`Time in unix epoch seconds: ${time_in_seconds}`);
  }
  main();
})();
```

The bundler took our tiny ~10 line TypeScript file and compiled it to JavaScript and bundled our import!

Now run the main.js file with artemis:
```
> artemis -j main.js
[artemis] Starting artemis collection!
Time in unix epoch seconds: 1767058428
[artemis] Finished artemis collection!
```

### Advanced

Lets try something a bit more challenging! Lets get a process listing!

1. Clone the artemis API repo: https://github.com/puffyCid/artemis-api
2. Create the file main.ts and add the following

```typescript
import { processListing } from "./artemis-api/mod";

function main() {
  // Get a list of running processes
  const proc_list = processListing();
  console.log(`Got ${proc_list.length} processes`);

  console.log(`Looping through processes...`);

  // Loop through each entry
  for (const entry of proc_list) {
    console.log(`Process ID ${entry.pid}. Name is ${entry.name}`);
  }
}

main();
```

If you hover over the `processListing()` function your text editor should provide function documentation. As you type your text editor should provide property hints and auto complete suggestions.

Using esbuild try the following commands: `esbuild --bundle --minify --outfile=out.js main.ts`

Now run the main.js file with artemis:
```
> artemis -j main.js
[artemis] Starting artemis collection!
Got 2669 processes
Looping through processes...
...
Process ID 151. Name is kdevtmpfs
Process ID 6323. Name is dbus-broker
Process ID 733184. Name is gdbus
Process ID 6890. Name is gnome-keyring-d
Process ID 3344. Name is chronyd
Process ID 8032. Name is mullvad-gui
Process ID 372481. Name is syncthing
Process ID 691791. Name is node
...
[artemis] Finished artemis collection!
```


## API Documentation

The most useful API artifacts and functions are exposed in the file [artemis-api/mod.ts](https://github.com/puffyCid/artemis-api/blob/main/mod.ts). If you import (or view the mod.ts) you have access to nearly all of the API artifacts and parsers.

The API documentation can also be viewed at:
- [API Docs](../../API/overview.md)

All artifact properties can be viewed at:
- [Artifacts](../../Artifacts/overview.md)