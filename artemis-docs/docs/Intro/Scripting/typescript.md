---
sidebar_position: 2
description: Using TypeScript
---

# TypeScript

A TypeScrpt library is provided instead of JavaScript due to the enhanced
features and ease of use TypeScrpt provides over plain JavaScript.

Continuing from `get_registry()` example:

```typescript
export interface Registry {
  /**
   * Full path to `Registry` key and name.
   * Ex: ` ROOT\...\CurrentVersion\Run`
   */
  path: string;
  /**
   * Path to Key
   * Ex: ` ROOT\...\CurrentVersion`
   */
  key: string;
  /**
   * Key name
   * Ex: `Run`
   */
  name: string;
  /**
   * Values associated with key name
   * Ex: `Run => Vmware`. Where Run is the `key` name and `Vmware` is the value name
   */
  values: Value[];
  /**Timestamp of when the path was last modified */
  last_modified: number;
  /**Depth of key name */
  depth: number;
}

/**
 * The value data associated with Registry key
 * References:
 *   https://github.com/libyal/libregf
 *   https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md
 */
export interface Value {
  /**Name of Value */
  value: string;
  /**
   * Data associated with value.  Type can be determiend by `data_type`.
   * `REG_BINARY` is base64 encoded string
   */
  data: string;
  /**Value type */
  data_type: string;
}

/**
 * Function to parse a `Registry` file
 * @param path Full path to a `Registry` file
 * @returns Array of `Registry` entries
 */
export function get_registry(path: string): Registry[] {
  // Array of JSON objects
  const data = Deno.core.ops.get_registry(path);
  const reg_array: Registry[] = JSON.parse(data);

  return reg_array;
}
```

The above TypeScrpt code shows that we can access our registered `get_registry`
function by calling it via `Deno.core.ops.get_registry(path);`

To make scripting even easier a simple **artemis-api** library is available to
import into Deno scripts. This allows users to create scripts without needing to
know what functions are registered. There are two ways to use the **artemis-api**:
- Import from GitHub remotely: https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
- Clone the API (https://github.com/puffyCid/artemis-api) and import locally

The example script below shows TypeScrpt code that imports the **artemis-api**
library to parse the SOFTWARE `Registry` file to get a list of installed
programs

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

We can then compile and bundle this TypeScrpt code to JavaScript and execute
using artemis!
