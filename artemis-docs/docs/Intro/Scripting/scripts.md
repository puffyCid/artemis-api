---
sidebar_position: 5
description: Creating a script
---

# Scripts

The easiest way to start scripting is to create a TypeScript project.

- Create a new directory that will contain out TypeScript code


Since we are using a runtime built specifically for DFIR all scripts must import the
[artemis-api](https://github.com/puffyCid/artemis-api) modules in order to
effectively create scripts.

Remember, since theis is a custom JS runtime, we will only have access the
vanilla
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
API and the [artemis-api](https://github.com/puffyCid/artemis-api) for scripting

To import artemis functions into your script, create a main.ts file and import the
function associated with the artifact you want to parse. For example, to parse
the Windows Registry you would import:

```typescript
import { getRegistry } from "./artemis-api/mod";
```

If you wanted to parse the Windows Registry and manipulate the parsed data you
would import:

```typescript
import { getRegistry } from "./artemis-api/mod";
import { Registry } from "./artemis-api/src/windows/registry";
```

A list of all exported artemis functions can be found at
https://github.com/puffyCid/artemis-api. All artifacts supported by artemis are
callable from TypeScrpt. The structured output produced by each artifact is
listed in the respective artifact section. For example, the structured Registry
output returned by `getRegistry` is found in the
[Registry artifact](../../Artifacts/Windows%20Artfacts/registry.md)

Once we have created and bundled our script. We just need to base64 encode
before providing it to artemis.

# TOML Collection

An example TOML collection would like this

```toml
[output]
name = "plist_data"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "script"
[artifacts.script]
name = "all_users_plist_files"
# Parses all plist files in /Users/%
script = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvcGxpc3QudHMKZnVuY3Rpb24gZ2V0UGxpc3QocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9wbGlzdChwYXRoKTsKICBpZiAoZGF0YSA9PT0gIiIpIHsKICAgIHJldHVybiBudWxsOwogIH0KICBjb25zdCBwbGlzdF9kYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gcGxpc3RfZGF0YTsKfQoKLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvc3lzdGVtL291dHB1dC50cwpmdW5jdGlvbiBvdXRwdXRSZXN1bHRzKGRhdGEsIGRhdGFfbmFtZSwgb3V0cHV0KSB7CiAgY29uc3Qgb3V0cHV0X3N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG91dHB1dCk7CiAgY29uc3Qgc3RhdHVzID0gRGVuby5jb3JlLm9wcy5vdXRwdXRfcmVzdWx0cygKICAgIGRhdGEsCiAgICBkYXRhX25hbWUsCiAgICBvdXRwdXRfc3RyaW5nCiAgKTsKICByZXR1cm4gc3RhdHVzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9maWxlc3lzdGVtL2RpcmVjdG9yeS50cwphc3luYyBmdW5jdGlvbiByZWFkRGlyKHBhdGgpIHsKICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShhd2FpdCBmcy5yZWFkRGlyKHBhdGgpKTsKICByZXR1cm4gZGF0YTsKfQoKLy8gbWFpbi50cwphc3luYyBmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IHN0YXJ0X3BhdGggPSAiL1VzZXJzIjsKICBjb25zdCBwbGlzdF9maWxlcyA9IFtdOwogIGF3YWl0IHJlY3Vyc2VfZGlyKHBsaXN0X2ZpbGVzLCBzdGFydF9wYXRoKTsKICByZXR1cm4gcGxpc3RfZmlsZXM7Cn0KYXN5bmMgZnVuY3Rpb24gcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHN0YXJ0X3BhdGgpIHsKICBpZiAocGxpc3RfZmlsZXMubGVuZ3RoID4gMjApIHsKICAgIGNvbnN0IG91dCA9IHsKICAgICAgbmFtZTogImFydGVtaXNfcGxpc3QiLAogICAgICBkaXJlY3Rvcnk6ICIuL3RtcCIsCiAgICAgIGZvcm1hdDogImpzb24iIC8qIEpTT04gKi8sCiAgICAgIGNvbXByZXNzOiBmYWxzZSwKICAgICAgZW5kcG9pbnRfaWQ6ICJhbnl0aGluZy1pLXdhbnQiLAogICAgICBjb2xsZWN0aW9uX2lkOiAxLAogICAgICBvdXRwdXQ6ICJsb2NhbCIgLyogTE9DQUwgKi8KICAgIH07CiAgICBjb25zdCBzdGF0dXMgPSBvdXRwdXRSZXN1bHRzKAogICAgICBKU09OLnN0cmluZ2lmeShwbGlzdF9maWxlcyksCiAgICAgICJhcnRlbWlzX2luZm8iLAogICAgICBvdXQKICAgICk7CiAgICBpZiAoIXN0YXR1cykgewogICAgICBjb25zb2xlLmxvZygiQ291bGQgbm90IG91dHB1dCB0byBsb2NhbCBkaXJlY3RvcnkiKTsKICAgIH0KICAgIHBsaXN0X2ZpbGVzID0gW107CiAgfQogIGZvciAoY29uc3QgZW50cnkgb2YgYXdhaXQgcmVhZERpcihzdGFydF9wYXRoKSkgewogICAgY29uc3QgcGxpc3RfcGF0aCA9IGAke3N0YXJ0X3BhdGh9LyR7ZW50cnkuZmlsZW5hbWV9YDsKICAgIGlmIChlbnRyeS5pc19maWxlICYmIGVudHJ5LmZpbGVuYW1lLmVuZHNXaXRoKCJwbGlzdCIpKSB7CiAgICAgIGNvbnN0IGRhdGEgPSBnZXRQbGlzdChwbGlzdF9wYXRoKTsKICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHsKICAgICAgICBjb250aW51ZTsKICAgICAgfQogICAgICBjb25zdCBwbGlzdF9pbmZvID0gewogICAgICAgIHBsaXN0X2NvbnRlbnQ6IGRhdGEsCiAgICAgICAgZmlsZTogcGxpc3RfcGF0aAogICAgICB9OwogICAgICBwbGlzdF9maWxlcy5wdXNoKHBsaXN0X2luZm8pOwogICAgICBjb250aW51ZTsKICAgIH0KICAgIGlmIChlbnRyeS5pc19kaXJlY3RvcnkpIHsKICAgICAgYXdhaXQgcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHBsaXN0X3BhdGgpOwogICAgfQogIH0KfQptYWluKCk7Cg=="
```

## Collection Options

- name: Name for script
- script: Base64 encoded bundled script (JavaScript)

# CLI Collection

You may also provide a bundled JavaScript directly to the artemis cli binary.

You can execute JavaScript code with the following command:

- artemis - j ./path/to/script.js