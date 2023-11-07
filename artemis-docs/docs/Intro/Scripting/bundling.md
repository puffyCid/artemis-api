---
sidebar_position: 3
description: What is bundling
---

# Bundling

Currently artemis requires that we have all of our JavaScript code in one .js
file. However, while very simple scripts may only be one file, if we decide to
import an artemis function, or split our code into multiple files we now have
multiple files that need to be combine into one .js file.

A Bundler can help us perform this task.

The TypeScrpt code below imports a function and the `Registry` interface from
artemis.

```typescript
import { getRegistry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Registry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts";

interface InstalledPrograms {
  name: string;
  version: string;
  install_location: string;
  install_source: string;
  language: string;
  publisher: string;
  install_string: string;
  install_date: string;
  uninstall_string: string;
  url_info: string;
  reg_path: string;
}

function grab_info(reg: Registry[]): InstalledPrograms[] {
  const programs: InstalledPrograms[] = [];
  const min_size = 3;
  for (const entries of reg) {
    if (entries.values.length < min_size) {
      continue;
    }
    const program: InstalledPrograms = {
      name: "",
      version: "",
      install_location: "",
      install_source: "",
      language: "",
      publisher: "",
      install_string: "",
      install_date: "",
      uninstall_string: "",
      url_info: "",
      reg_path: entries.path,
    };

    for (const value of entries.values) {
      switch (value.value) {
        case "DisplayName":
          program.name = value.data;
          break;
        case "DisplayVersion":
          program.version = value.data;
          break;
        case "InstallDate":
          program.install_date = value.data;
          break;
        case "InstallLocation":
          program.install_location = value.data;
          break;
        case "InstallSource":
          program.install_source = value.data;
          break;
        case "Language":
          program.language = value.data;
          break;
        case "Publisher":
          program.publisher = value.data;
          break;
        case "UninstallString":
          program.uninstall_string = value.data;
          break;
        case "URLInfoAbout":
          program.url_info = value.data;
          break;
        default:
          continue;
      }
    }
    programs.push(program);
  }
  return programs;
}

function main() {
  const path = "C:\\Windows\\System32\\config\\SOFTWARE";

  const reg = getRegistry(path);
  const programs: Registry[] = [];
  for (const entries of reg) {
    if (
      !entries.path.includes(
        "Microsoft\\Windows\\CurrentVersion\\Uninstall",
      )
    ) {
      continue;
    }
    programs.push(entries);
  }
  return grab_info(programs);
}

main();
```

Lets save this code to the file `main.ts`. Before we can compile the code to
JavaScript we have to include (bundle) `mod.ts` and `registry.ts`.

There are multiple types of bundler applications that can help us with this
task. Two (2) we will focus on are:

- The builtin bundler in Deno
- [esbuild Deno loader](https://deno.land/x/esbuild_deno_loader@0.6.0)

## Deno Builtin Bundler

To bundle our `main.ts` and compile to a `.js` file. We just need to run:
`deno bundle  --no-check main.ts > main.js`. By default `Deno` wil output to the
console when bundling.

### `--no-check` Flag

This flag tells `Deno` not to type check values. This flag is required due to:
`Deno.core.ops.get_registry(path)`

The Deno binary is designed to support code written for the Deno platform.
However, we are using a custom Deno runtime.

The Deno binary has no idea what `get_registry` is because it is a custom
function we have registered in our own runtime.

### Output

```javascript
// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_registry(path) {
    const data = Deno.core.ops.get_registry(path);
    const reg_array = JSON.parse(data);
    return reg_array;
}
function getRegistry(path) {
    return get_registry(path);
}
function grab_info(reg) {
    const programs = [];
    for (const entries of reg){
        if (entries.values.length < 3) {
            continue;
        }
        const program = {
            name: "",
            version: "",
            install_location: "",
            install_source: "",
            language: "",
            publisher: "",
            install_string: "",
            install_date: "",
            uninstall_string: "",
            url_info: "",
            reg_path: entries.path
        };
        for (const value of entries.values){
            switch(value.value){
                case "DisplayName":
                    program.name = value.data;
                    break;
                case "DisplayVersion":
                    program.version = value.data;
                    break;
                case "InstallDate":
                    program.install_date = value.data;
                    break;
                case "InstallLocation":
                    program.install_location = value.data;
                    break;
                case "InstallSource":
                    program.install_source = value.data;
                    break;
                case "Language":
                    program.language = value.data;
                    break;
                case "Publisher":
                    program.publisher = value.data;
                    break;
                case "UninstallString":
                    program.uninstall_string = value.data;
                    break;
                case "URLInfoAbout":
                    program.url_info = value.data;
                    break;
                default:
                    continue;
            }
        }
        programs.push(program);
    }
    return programs;
}
function main() {
    const path = "C:\\Windows\\System32\\config\\SOFTWARE";
    const reg = getRegistry(path);
    const programs = [];
    for (const entries of reg){
        if (!entries.path.includes("Microsoft\\Windows\\CurrentVersion\\Uninstall")) {
            continue;
        }
        programs.push(entries);
    }
    return grab_info(programs);
}
main();
```

The JavaScript code above was generated with the `deno bundle` command and is
now ready to be executed by artemis!

## Esbuild

[esbuild](https://esbuild.github.io/) is a popular Bundler for JavaScript. It is
normally run as a standalone binary, however we can import a module that lets us
dynamically execute esbuild using Deno. In order to do this we need a build
script. Using the same `main.ts` file above, create a `build.ts` file in the
same directory. Add the following code to `build.ts`:

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

The above script will use the `main.ts` file and bundle all of its pre-requisite
files into one .js file using esbuild. We then execute this code using
`deno run build.ts`

### Output

```javascript
// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts
function get_registry(path) {
  const data = Deno.core.ops.get_registry(path);
  const reg_array = JSON.parse(data);
  return reg_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getRegistry(path) {
  return get_registry(path);
}

// main.ts
function grab_info(reg) {
  const programs = [];
  const min_size = 3;
  for (const entries of reg) {
    if (entries.values.length < min_size) {
      continue;
    }
    const program = {
      name: "",
      version: "",
      install_location: "",
      install_source: "",
      language: "",
      publisher: "",
      install_string: "",
      install_date: "",
      uninstall_string: "",
      url_info: "",
      reg_path: entries.path,
    };
    for (const value of entries.values) {
      switch (value.value) {
        case "DisplayName":
          program.name = value.data;
          break;
        case "DisplayVersion":
          program.version = value.data;
          break;
        case "InstallDate":
          program.install_date = value.data;
          break;
        case "InstallLocation":
          program.install_location = value.data;
          break;
        case "InstallSource":
          program.install_source = value.data;
          break;
        case "Language":
          program.language = value.data;
          break;
        case "Publisher":
          program.publisher = value.data;
          break;
        case "UninstallString":
          program.uninstall_string = value.data;
          break;
        case "URLInfoAbout":
          program.url_info = value.data;
          break;
        default:
          continue;
      }
    }
    programs.push(program);
  }
  return programs;
}
function main() {
  const path = "C:\\Windows\\System32\\config\\SOFTWARE";
  const reg = getRegistry(path);
  const programs = [];
  for (const entries of reg) {
    if (
      !entries.path.includes(
        "Microsoft\\Windows\\CurrentVersion\\Uninstall",
      )
    ) {
      continue;
    }
    programs.push(entries);
  }
  return grab_info(programs);
}
main();
```

The JavaScript code above was generated by esbuild via `Deno` and is now ready
to be executed by artemis!
