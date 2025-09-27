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

Writing tests for the TypeScript API is a bit more involved than writing tests for the Rust codebase. Creating tests for the API is a 5 step process:

0. Compile the test runner binary `script_runner` via `cargo build --release --examples` and place under the corresponding test folder
1. Export a test function
2. Register the test function in test.ts under tests/test.ts
3. Write your test and place it under the test/ folder
4. Run tests with compile_tests.sh or compile_tests.bat

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
