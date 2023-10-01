---
sidebar_position: 7
description: A full walkthrough
---

# Step by Step Guide

Lets create an simple script that will collect a process listing that returns
only processes that are using more than 200MB of memory. Make sure you have all
of the [prequisites](./deno.md) before getting started!

1. First we need to initialize our script. You can name it anything you want.

```
deno init process_usage
```

2. Deno created two extra files we do not need.
   `main_bench.ts and main_test.ts`. We can delete them. In addition, lets clear
   the `main.ts` and make sure its empty.
3. Now using a text editor or IDE we need to import the necessary functions to
   collect our data. Since we are only collecting a process listing we only need
   to import one function. In the `main.ts` file add the following

```typescript
import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";
```

You may get a warning or error about `processListing` not found. We should be
able to resolve this by right clicking the URL and selecting `cache module`.
Deno will cache the entire `artemis-api` to our local system.

4. Now lets call our `processListing` function!

```typescript
import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";

function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const binary_info = true;

  const proc_list = processListing(md5, sha1, sha256, binary_info);
}
```

If you hover over `processListing` function you should see the function expects
four optional arguments:

- Enable MD5 hashing
- Enable SHA1 hashing
- Enable SHA256 hashing
- Collect binary metadata

All of these arguments are optional. The default values are `false`. In this
example, we will provide arguments but will still set them to false.

5. Now since we have called our function, we want to now filter the data to only
   include processes using more than 200MB of memory. We can use a simple `for`
   loop to do this

```typescript
import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";

function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const binary_info = false;

  const proc_list = processListing(md5, sha1, sha256, binary_info);

  const filter_list = [];
  for (const entry of proc_list) {
    if (entry.memory_usage > 200204864) {
      console.log(`High memory usage ${entry.full_path}`);
      filter_list.push(entry);
    }
  }
}
```

Here we are looping through the process list data and only keeping entries that
have memory usage above 200MB. Your IDE or text editor **should** provide
auto-complete suggestions for the process listing. This should help make
scripting less challenging!

6. Now lets return our data and make sure artemis will call our `main()`
   function.

```typescript
import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";

function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const binary_info = true;

  const proc_list = processListing(md5, sha1, sha256, binary_info);

  const filter_list = [];
  for (const entry of proc_list) {
    if (entry.memory_usage > 200204864) {
      console.log(`High memory usage ${entry.full_path}`);
      filter_list.push(entry);
    }
  }

  return filter_list;
}

main();
```

Thats it! We now have a simple script that filters a process listing.

7. Now before we run our script, we need to [bundle](./bundling.md) all of the
   code into one JavaScript file. Create the file `build.ts` in the same
   directory as `main.ts`. And copy the following into `build.ts`:

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

The above code uses
[esbuild Deno loader](https://deno.land/x/esbuild_deno_loader@0.6.0) to bundle
and [transpile](https://en.wikipedia.org/wiki/Source-to-source_compiler) our
TypeScript code into JavaScript using the Common JS `(CJS)` format

8. Lets bundle the code! Execute `deno run build.ts`. Since Deno uses sandbox
   permissions to run code you may receive prompts like the following:

```
✅ Granted read access to <CWD>.
✅ Granted env access to "ESBUILD_BINARY_PATH".
✅ Granted env access to "HOME".
✅ Granted read access to "/Users/dev/Library/Caches/esbuild/bin/esbuild-darwin-64@0.15.10".
✅ Granted run access to "/Users/dev/Library/Caches/esbuild/bin/esbuild-darwin-64@0.15.10".
┌ ⚠️  Deno requests net access to "raw.githubusercontent.com".
├ Requested by `fetch()` API.
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >
```

:::tip

The Deno binary will prompt for access to certain Deno APIs. If you want to
grant automatically grant required access you can run with the following
aguments: `deno run -A build.ts`

:::

9. Once Deno has finished running we should now have our `main.js` file! We can
   now run it with artemis! There are two ways to run JavaScript code with
   artemis:
   - Use a TOML [collection](../Collections/format.md) file
   - run directly via `artemis -j <path to main.js>`

   There are slight differences between both options. If we use a TOML
   collection file, artemis will handle the output format for us based on the
   TOML configuration.

   If we decide to run the JavaScript code directly, we would need to include
   code to tell artemis how to output the data. See the artemis
   [API](../../API/) docs for scripting the output options.

   For this example we will use a TOML collection file

10. Base64 encode our `main.js` file.
    [CyberChef](https://gchq.github.io/CyberChef/) works great for this task.
    Then add our base64 blob to a TOML file with the following configuration:

```toml
system = "macos" # Change this based on ur platform

[output]
name = "custom_proc_list"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "this can be anything"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "script"
[artifacts.script]
name = "proc_memory_usage_list"
script = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvc3lzdGVtL21lbW9yeS50cwpmdW5jdGlvbiBwcm9jZXNzTGlzdGluZyhtZDUgPSBmYWxzZSwgc2hhMSA9IGZhbHNlLCBzaGEyNTYgPSBmYWxzZSwgYmluYXJ5ID0gZmFsc2UpIHsKICBjb25zdCBoYXNoZXMgPSB7CiAgICBtZDUsCiAgICBzaGExLAogICAgc2hhMjU2CiAgfTsKICBjb25zdCBkYXRhID0gRGVuby5jb3JlLm9wcy5nZXRfcHJvY2Vzc2VzKAogICAgaGFzaGVzLAogICAgYmluYXJ5CiAgKTsKICBjb25zdCBwcm9jX2FycmF5ID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gcHJvY19hcnJheTsKfQoKLy8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IG1kNSA9IGZhbHNlOwogIGNvbnN0IHNoYTEgPSBmYWxzZTsKICBjb25zdCBzaGEyNTYgPSBmYWxzZTsKICBjb25zdCBiaW5hcnlfaW5mbyA9IHRydWU7CiAgY29uc3QgcHJvY19saXN0ID0gcHJvY2Vzc0xpc3RpbmcobWQ1LCBzaGExLCBzaGEyNTYsIGJpbmFyeV9pbmZvKTsKICBjb25zdCBmaWx0ZXJfbGlzdCA9IFtdOwogIGZvciAoY29uc3QgZW50cnkgb2YgcHJvY19saXN0KSB7CiAgICBpZiAoZW50cnkubWVtb3J5X3VzYWdlID4gMTUpIHsKICAgICAgY29uc29sZS5sb2coYEhpZ2ggbWVtb3J5IHVzYWdlICR7ZW50cnl9YCk7CiAgICAgIGZpbHRlcl9saXN0LnB1c2goZW50cnkpOwogICAgfQogIH0KICByZXR1cm4gZmlsdGVyX2xpc3Q7Cn0KbWFpbigpOwo="
```

11. Now run our TOML file collection with artemis!
    `artemis -t <path to TOML fil>`.

:::note

You should see results similar to below depending on you OS. In addition, to
output files at `./tmp/custom_proc_list`.

```
[runtime]: "High memory usage /Applications/iTerm.app/Contents/MacOS/iTerm2"
[runtime]: "High memory usage /usr/local/bin/node"
[runtime]: "High memory usage /System/Library/Frameworks/WebKit.framework/Versions/A/XPCServices/com.apple.WebKit.WebContent.xpc/Contents/MacOS/com.apple.WebKit.WebContent"
[runtime]: "High memory usage /System/Library/Frameworks/WebKit.framework/Versions/A/XPCServices/com.apple.WebKit.WebContent.xpc/Contents/MacOS/com.apple.WebKit.WebContent"
```

:::

The directory `./tmp/custom_proc_list` should contain three files:

```
3d6573f5-9eda-4945-b324-06dd5a8fba1b.json	b76ed71a-9333-49b9-be2d-b3c77a4d1497.log	status.log
```

- status.log maps script name to our json file
  `proc_memory_usage_list:3d6573f5-9eda-4945-b324-06dd5a8fba1b.json`. **NOTE**
  we can also find the same info in `3d6573f5-9eda-4945-b324-06dd5a8fba1b.json`
- `b76ed71a-9333-49b9-be2d-b3c77a4d1497.log` contains any errors or warnings.
  Since we did **not** run with elevated privileges, artemis will not be able to
  get information for all processes.
- `3d6573f5-9eda-4945-b324-06dd5a8fba1b.json` should contain all processes using
  more the 200MB of memory!

Snippet below:

```json
{
  "metadata": {
    "endpoint_id": "this can be anything",
    "uuid": "4f58d2e4-d2fa-4e91-9dcb-8bbe44c2efdb",
    "id": 1,
    "artifact_name": "proc_memory_usage_list",
    "complete_time": 1694831851,
    "start_time": 1694831851,
    "hostname": "dev-MBP.lan",
    "os_version": "13.4.1",
    "platform": "Darwin",
    "kernel_version": "22.5.0",
    "load_performance": {
      "avg_one_min": 1.74755859375,
      "avg_five_min": 1.62744140625,
      "avg_fifteen_min": 1.6484375
    }
  },
  "data": [
    {
      "full_path": "/Applications/VSCodium.app/Contents/Frameworks/VSCodium Helper (Renderer).app/Contents/MacOS/VSCodium Helper (Renderer)",
      "name": "VSCodium Helper (Renderer)",
      "path": "/Applications/VSCodium.app/Contents/Frameworks/VSCodium Helper (Renderer).app/Contents/MacOS",
      "pid": 924,
      "ppid": 910,
      "environment": "MallocNanoZone=0 USER=dev COMMAND_MODE=unix2003 __CFBundleIdentifier=com.vscodium PATH=/usr/bin:/bin:/usr/sbin:/sbin LOGNAME=dev SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.EMaeAUplCi/Listeners HOME=/Users/dev SHELL=/bin/zsh TMPDIR=/var/folders/ms/hq39v4_x1sq20cz108g3_6cw0000gn/T/ __CF_USER_TEXT_ENCODING=0x1F5:0x0:0x0 XPC_SERVICE_NAME=application.com.vscodium.52768860.61870812 XPC_FLAGS=0x0 ORIGINAL_XDG_CURRENT_DESKTOP=undefined VSCODE_CWD=/ VSCODE_NLS_CONFIG={\"locale\":\"en-us\",\"osLocale\":\"en-us\",\"availableLanguages\":{},\"_languagePackSupport\":true} VSCODE_CODE_CACHE_PATH=/Users/dev/Library/Application Support/VSCodium/CachedData/13ae69686c4390a9aee7b71b44337eb488319f26 VSCODE_IPC_HOOK=/Users/dev/Library/Application Support/VSCodium/1.82-main.sock VSCODE_PID=910 OS_ACTIVITY_MODE=disable",
      "status": "Runnable",
      "arguments": " --type=renderer --user-data-dir=/Users/dev/Library/Application Support/VSCodium --standard-schemes=vscode-webview,vscode-file --enable-sandbox --secure-schemes=vscode-webview,vscode-file --bypasscsp-schemes --cors-schemes=vscode-webview,vscode-file --fetch-schemes=vscode-webview,vscode-file --service-worker-schemes=vscode-webview --streaming-schemes --app-path=/Applications/VSCodium.app/Contents/Resources/app --enable-sandbox --enable-blink-features=HighlightAPI --lang=en-US --num-raster-threads=4 --enable-zero-copy --enable-gpu-memory-buffer-compositor-resources --enable-main-frame-before-activation --renderer-client-id=5 --time-ticks-at-unix-epoch=-1694820653253440 --launch-time-ticks=1314885816 --shared-files --field-trial-handle=1718379636,r,10495113946754946208,8514878387345791811,262144 --disable-features=CalculateNativeWinOcclusion,SpareRendererForSitePerProcess --vscode-window-config=vscode:15d59b34-a78d-4dc2-963f-171fa490be8d --seatbelt-client=62",
      "memory_usage": 573014016,
      "virtual_memory_usage": 1252417200128.0,
      "start_time": 1694821968,
      "uid": "501",
      "gid": "20",
      "md5": "",
      "sha1": "",
      "sha256": "",
      "binary_info": []
    }
  ]
}
```
