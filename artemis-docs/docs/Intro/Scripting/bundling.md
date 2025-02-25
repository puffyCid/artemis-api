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

The TypeScrpt code below imports a function and the Registry interface from
artemis.

```typescript
import { getRegistry } from "./artemis-api/mod.ts";
import { Registry } from "./artemis-api/src/windows/registry.ts";

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

Lets save this code to the file main.ts. Before we can compile the code to
JavaScript we have to include (bundle) `mod.ts` and `registry.ts`.

There are multiple types of bundler applications that can help us with this
task. One of the most popular ones is [esbuild](https://esbuild.github.io/)

## Esbuild

[esbuild](https://esbuild.github.io/) is a popular Bundler for JavaScript. It can be run as a standalone binary.
Once you have esbuild installed you can transpile and bundle your TypeScript with the following command:

```
esbuild --bundle --outfile=out.js main.ts
```

:::info

esbuild can also minify JavaScript code! This can dramitically reduce the size of your script

```
esbuild --bundle --minify --outfile=out.js main.ts
```

:::


The above commands will use the main.ts file and bundle all of its pre-requisite
files into one .js file using esbuild.

### Output

```javascript
function get_registry(path) {
  const data = js_get_registry(path);
  const reg_array = JSON.parse(data);
  return reg_array;
}

// ./artemis-api/mod.ts
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

The JavaScript code above was generated by esbuild and is now ready to
be executed by artemis!
