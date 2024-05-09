---
sidebar_position: 6
---

# API Contributions

Contributing to the artemis-api is slightly different than contributing directly
to artemis. The biggest difference is the API is coded in TypeScript instead of
Rust.

This can make contributions significantly easier if interested in contributing
to artemis.

The Prerequisites for adding API features are the same as creating artemis
scripts as mentioned in [scripting](../Intro/Scripting/deno.md). You will need:

- Deno installed
- VSCode or VSCodium
- The Deno extension

# Adding a Feature

Please try to creae an issue before working on a feature. Basic overview of
adding a new feature:

1. Create an issue. If you want to work on it, make sure to explictly volunteer!
2. Create a branch on your clone artemis repo
3. Work on feature
4. If you are adding a new artifact make sure you have updated the artemis docs
5. Open a pull request!

Please checkout available [API](../API/overview.md) functions that can be used
to make scripting easier.

# Artifact Scope

Unlike artemis, the API does not have strict limits on what can be included. You
may include non-forensic related artifacts or features such as:

- WiFi information
- Installed applications
- Generic system information
- Shelling out to other tools or applications (ex: You may execute PowerShell
  commands from the API if you want to)
- Submit data to network services (ex: Submit hashes to VirusTotal API)

# Testing Scripts Locally

Currently there is no easy way to write tests for the artemis API. If you are
working on a new feature the current recommended approach to testing your
feature is:

1. Write you feature and export it to mod.ts file located at the root of the
   `artemis-api` repo.
2. Create a deno project in a separate directory outsdie of `artemis-api` using
   `deno init <feature>`
3. Follow the [walkthrough](../Intro/Scripting/walkthrough.md) guide, except
   instead of importing functions from GitHub import functions from your local
   clone repo.

```typescript
import { processListing } from "../../path/to/local/artemis-api/mod.ts";

function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const binary_info = true;

  const proc_list = processListing(md5, sha1, sha256, binary_info);
}
```

4. Test you feature with your deno project
5. If everything works, open a pull request!

## Testing Scripts on GitHub Actions

Even though writing tests for the artemis API locally can be tricky. There is
process to create tests to run on GitHub Actions.\
When you open a PR it will trigger the Artemis API test suite. Ideally **if
possible** you should include a test for you feature.

Artemis API tests are located at the tests directory and are broken down by OS.
All you need to do is create a new folder and add a main.ts and build.ts file
and write your test.

A **very basic** example is below:

```typescript
import { firewallStatus } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

function main() {
  const results = firewallStatus();
  if (results instanceof MacosError) {
    throw results;
  }

  if (results.version.length === 0) {
    throw "no version?";
  }
}

main();
```

The example above will test the macOS Firewall artifact and make sure it does
not return an error and that the version info is not empty.

You may make you test as complex or thorough as you would like. But it should at
least always check for errors.

### Testing Scripts on GitHub Actions Locally

If you want to run the test scripts locally you will need one of the options
below:

- Download
  [script_tester](https://github.com/puffyCid/artemis/releases/tag/v0.1.0)
- Compile the
  [script_tester](https://github.com/puffyCid/artemis/tree/main/core/examples)
  via `cargo build --release --examples`

Place the script tester binary in the folder you want to test.
