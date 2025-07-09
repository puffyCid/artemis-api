---
sidebar_position: 3
---

# CLI Options

artemis is designed to have a very simple CLI menu. All of the complex data
parsing is handle in the `core` library.

# Running Artemis

Once you have [installed](./installation.md) artemis you can access its help
menu with the command below:

```
artemis -h
A cross platform forensic parser

Usage: artemis [OPTIONS] [COMMAND]

Commands:
  acquire  Acquire forensic artifacts
  help     Print this message or the help of the given subcommand(s)

Options:
  -t, --toml <TOML>              Full path to TOML collector
  -d, --decode <DECODE>          Base64 encoded TOML file
  -j, --javascript <JAVASCRIPT>  Full path to JavaScript file
  -h, --help                     Print help
  -V, --version                  Print version
```

## Collecting Artifacts

The easiest way to start collecting forensic artifacts is to use the `acquire`
command. This will allow you to select specific artifacts.

For example for macOS a user can acquire any of the artifacts below:

```
artemis acquire -h
Acquire forensic artifacts

Usage: artemis acquire [OPTIONS] [COMMAND]

Commands:
  processes          Collect processes
  connections       Collect network connections
  filelisting        Pull filelisting
  systeminfo         Get systeminfo
  prefetch           windows: Parse Prefetch
  eventlogs          windows: Parse EventLogs
  rawfilelisting     windows: Parse NTFS to get filelisting
  shimdb             windows: Parse ShimDatabase
  registry           windows: Parse Registry
  userassist         windows: Parse Userassist
  shimcache          windows: Parse Shimcache
  shellbags          windows: Parse Shellbags
  amcache            windows: Parse Amcache
  shortcuts          windows: Parse Shortcuts
  usnjrnl            windows: Parse UsnJrnl
  bits               windows: Parse BITS
  srum               windows: Parse SRUM
  users-windows      windows: Parse Users
  search             windows: Parse Windows Search
  tasks              windows: Parse Windows Tasks
  services           windows: Parse Windows Services
  jumplists          windows: Parse Jumplists
  recyclebin         windows: Parse RecycleBin
  wmipersist         windows: Parse WMI Repository
  outlook            windows: Parse Outlook messages
  mft                windows: Parse MFT file
  execpolicy         macos: Parse ExecPolicy
  users-macos        macos: Collect local users
  fsevents           macos: Parse FsEvents entries
  emond              macos: Parse Emond persistence. Removed in Ventura
  loginitems         macos: Parse LoginItems
  launchd            macos: Parse Launch Daemons and Agents
  groups-macos       macos: Collect local groups
  safari-history     macos: Collect Safari History
  safari-downloads   macos: Collect Safari Downloads
  unifiedlogs        macos: Parse the Unified Logs
  sudologs-macos     macos: Parse Sudo log entries from Unified Logs
  spotlight          macos: Parse the Spotlight database
  shellhistory       unix: Parse Shellhistory
  cron               unix: Parse Cron Jobs
  sudologs-linux     linux: Grab Sudo logs
  journals           linux: Parse systemd Journal files
  logons             linux: Parse Logon files
  help               Print this message or the help of the given subcommand(s)

Options:
      --format <FORMAT>          Output format. JSON or JSONL or CSV [default: JSON]
      --output-dir <OUTPUT_DIR>  Optional output directory for storing results [default: ./tmp]
      --compress                 GZIP Compress results
      --timeline                 Timeline parsed data. Output is always JSONL
  -h, --help                     Print help
```

To collect a process listing you would type:

```
artemis acquire processes
```

## TOML Collections

If you want to collect multiple artifacts the easiest way to do that is to
create a TOML file and provide the TOML file to artemis. There are two (2) ways
to provide TOML collections:

- Provide the full path the TOML file on disk
- base64 encode a TOML file and provide that as an argument

The artemis source code provides several pre-made TOML collection files that can
used as examples.

For example on **macOS** we downloaded the
[processes.toml](https://github.com/puffycid/artemis/blob/main/forensics/tests/test_data/macos/processes.toml)
file from the artemis repo to the same directory as the **macOS** artemis binary
and ran using **sudo**

```
sudo ./artemis -t processes.toml
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
```

On **Windows** we downloaded the
[processes.toml](https://github.com/puffycid/artemis/blob/main/forensics/tests/test_data/windows/processes.toml)
file from the artemis repo to the same directory as the **Windows** artemis
binary and ran using **Administrator** privileges

```
artemis.exe -t processes.toml
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
```

Both `processes.toml` files tell artemis to output the results to a directory
called `tmp/process_collection` in the current directory and output using jsonl
format

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

## JavaScript Collections

You can also execute JavaScript code using artemis.

```javascript
function getProcesses(md5, sha1, sha256, binary_info) {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  const data = js_get_processes(
    JSON.stringify(hashes),
    binary_info,
  );
  const results = JSON.parse(data);
  return results;
}

function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const binary_info = false;
  const proc_list = getProcesses(md5, sha1, sha256, binary_info);
  console.log(proc_list[0].full_path);
  return proc_list;
}
main();
```

To execute the above code

```
artemis -j vanilla.js
[artemis] Starting artemis collection!
[runtime]: "/usr/libexec/nesessionmanager"
[artemis] Finished artemis collection!
```

Collecting data via JavaScript is a bit more complex than other methods. But it
provides a lot more flexibility on what you can do with the data.

See the section on [Scripting](../Intro/Scripting/boa.md) to learn more!
