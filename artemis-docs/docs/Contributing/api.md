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
scripts as mentioned in [scripting](../Intro/Scripting/boa.md). You will need:

- A text editor that supports TypeScript

## Adding a Feature

Please try to create an issue before working on a feature. Basic overview of
adding a new feature:

1. Create an issue. If you want to work on it, make sure to explicitly
   volunteer!
2. Create a branch on your clone artemis repo
3. Work on feature
4. If you are adding a new artifact make sure you have updated the artemis docs
5. Open a pull request!

Please checkout available [API](../API/overview.md) functions that can be used
to make scripting easier.

## Artifact Scope

Unlike artemis, the API does not have strict limits on what can be included. You
may include non-forensic related artifacts or features such as:

- WiFi information
- Installed applications
- Generic system information
- Shelling out to other tools or applications (ex: You may execute PowerShell
  commands from the API if you want to)
- Submit data to network services (ex: Submit hashes to VirusTotal API)

## Testing the API

Writing tests for the TypeScript API is a bit more involved than writing tests for the Rust codebase. You will also need the [artemis](https://github.com/puffyCid/artemis) source code.  

1. Clone the artemis repo
2. Compile the API test runner binary `script_runner` via `cargo build --release --examples` and place `script_runner` under the corresponding API test folder
3. Export a test function
4. Register the test function in test.ts under tests/test.ts
5. Write your test and place it under the test/ folder
6. Run tests with compile_tests.ps1 or compile_tests.py

You may place test data under test/test_data.

### Example API Test

The [rpm](../Artifacts/Linux%20Artifacts/rpm.md) API exposes the test function `testRpmInfo` which calls all of the RPM parsing functions and validates they return correct data.

This test function is then registered in test/test.ts and used for running RPM tests from tests/linux/rpm/main.ts.

```typescript
import { testRpmInfo } from "../../test";

function main() {
    console.log('Running RPM tests....');

    console.log(' Starting RPM info test....');
    testRpmInfo();

    console.log(' RPM info test passed! 🥳');
    console.log('All RPM tests passed! 🥳💃🕺');
}

main();
```


All PR's against the [artemis-api](https://github.com/puffyCid/artemis-api) repo run tests.