---
sidebar_position: 3
---

# CLI Options

artemis is designed to have a very simple CLI menu. Almost all of the code is in
the `artemis-core` library. In fact the only things the artemis binary does is:

- Provide the TOML collection file/data to the `artemis-core` library.
- Provide CLI args

# Running Artemis

Once you have [installed](./installation.md) artemis you can access its help
menu with the command below:

```
artemis -h
Usage: artemis [OPTIONS]

Options:
  -t, --toml <TOML>              Full path to TOML collector
  -d, --decode <DECODE>          Base64 encoded TOML file
  -j, --javascript <JAVASCRIPT>  Full path to JavaScript file
  -h, --help                     Print help
  -V, --version                  Print version
```

As mentioned, the artemis binary is really just a small wrapper that provides a
TOML collection definition to `artemis-core`. There are two (2) ways to provided
TOML collections:

- Provide the full path the TOML file on disk
- base64 encode a TOML file and provide that as an argument

The artemis source code provides several pre-made TOML collection files that can
used as examples.

For example on **macOS** we downloaded the
[processes.toml](https://github.com/puffycid/artemis/blob/main/artemis-core/tests/test_data/macos/processes.toml)
file from the artemis repo to the same directory as the **macOS** artemis binary
and ran using **sudo**

```
sudo ./artemis -t processes.toml
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
```

On **Windows** we downloaded the
[processes.toml](https://github.com/puffycid/artemis/blob/main/artemis-core/tests/test_data/windows/processes.toml)
file from the artemis repo to the same directory as the **Windows** artemis
binary and ran using **Administrator** privileges

```
artemis.exe -t processes.toml
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
```

Both `processes.toml` files tell artemis to output the results to a directory
called `tmp/process_collection` in the current directory and output using
`jsonl` format

```
./tmp
└── process_collection
    └── d7f89e7b-fcd8-42e8-8769-6fe7eaf58bee.jsonl
```

To run the same collection except as a base64 encoded string on **macOS** we can
do the following:

```
sudo ./artemis -d c3lzdGVtID0gIm1hY29zIgoKW291dHB1dF0KbmFtZSA9ICJwcm9jZXNzX2NvbGxlY3Rpb24iCmRpcmVjdG9yeSA9ICIuL3RtcCIKZm9ybWF0ID0gImpzb25sIgpjb21wcmVzcyA9IGZhbHNlCmVuZHBvaW50X2lkID0gImFiZGMiCmNvbGxlY3Rpb25faWQgPSAxCm91dHB1dCA9ICJsb2NhbCIKCltbYXJ0aWZhY3RzXV0KYXJ0aWZhY3RfbmFtZSA9ICJwcm9jZXNzZXMiICMgTmFtZSBvZiBhcnRpZmFjdApbYXJ0aWZhY3RzLnByb2Nlc3Nlc10KbWV0YWRhdGEgPSB0cnVlICMgR2V0IGV4ZWN1dGFibGUgbWV0YWRhdGEKbWQ1ID0gdHJ1ZSAjIE1ENSBhbGwgZmlsZXMKc2hhMSA9IGZhbHNlICMgU0hBMSBhbGwgZmlsZXMKc2hhMjU2ID0gZmFsc2UgIyBTSEEyNTYgYWxsIGZpbGVz
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
```

On **Windows** it would be (using **Administrator** privileges again):

```
artemis.exe -d c3lzdGVtID0gIndpbmRvd3MiCgpbb3V0cHV0XQpuYW1lID0gInByb2Nlc3Nlc19jb2xsZWN0aW9uIgpkaXJlY3RvcnkgPSAiLi90bXAiCmZvcm1hdCA9ICJqc29uIgpjb21wcmVzcyA9IGZhbHNlCmVuZHBvaW50X2lkID0gImFiZGMiCmNvbGxlY3Rpb25faWQgPSAxCm91dHB1dCA9ICJsb2NhbCIKCltbYXJ0aWZhY3RzXV0KYXJ0aWZhY3RfbmFtZSA9ICJwcm9jZXNzZXMiICMgTmFtZSBvZiBhcnRpZmFjdApbYXJ0aWZhY3RzLnByb2Nlc3Nlc10KbWV0YWRhdGEgPSB0cnVlICMgR2V0IGV4ZWN1dGFibGUgbWV0YWRhdGEKbWQ1ID0gdHJ1ZSAjIE1ENSBhbGwgZmlsZXMKc2hhMSA9IGZhbHNlICMgU0hBMSBhbGwgZmlsZXMKc2hhMjU2ID0gZmFsc2UgIyBTSEEyNTYgYWxsIGZpbGVz
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
```

# JavaScript

You can also execute JavaScript code using artemis.

```javascript
// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/processes.ts
function getWinProcesses(md5, sha1, sha256, pe_info) {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  const data = Deno.core.ops.get_processes(
    JSON.stringify(hashes),
    pe_info,
  );
  const results = JSON.parse(data);
  return results;
}

// main.ts
function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const pe_info = false;
  const proc_list = getWinProcesses(md5, sha1, sha256, pe_info);
  console.log(proc_list[0].full_path);
  return proc_list;
}
main();
```

Executing the above code

```
sudo ./artemis -j ../../artemis-core/tests/test_data/deno_scripts/vanilla.js
[artemis] Starting artemis collection!
[runtime]: "/usr/libexec/nesessionmanager"
[artemis] Finished artemis collection!
```

See section on [Scripting](../scripting/deno.md) to learn more!
