---
description: How to extract data from ESXi
---

# ESXi Artifacts

Artemis supports running and parsing artifacts on an ESXi system. Most ESXi artifacts are plaintext files, so we will need to use the artemis API (TypeScript) in order to parse the data.

:::info

You do not have to run artemis on ESXi in order to parse ESXi artifacts.  
You can collect ESXi artifacts using tools like [UAC](https://github.com/tclahr/uac) and parse locally.

All ESXi artifacts parsed via the artemis API can be parsed locally!

:::

## Example Script

One of the benefits of parsing ESXi data with artemis is that the data can be saved to csv, json, or jsonl. The output is Timesketch compatible!

An example ESXi parsing script (`main.ts`) is below. It parses several ESXi artifacts.

```typescript
import { dumpData, esxiAccounts, Format, getVibs, Output, OutputType, shellLogHistory, sysLogEsxi } from "./artemis-api/mod";
import { EsxiError } from "./artemis-api/src/esxi/error";

function main() {
    const out: Output = {
        name: "esxi_artifacts",
        directory: "./tmp",
        format: Format.JSONL,
        compress: false,
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        /**
        * Remote uploads are not supported when **running** on ESXi
        */
        output: OutputType.LOCAL
    };

    console.log("Parsing VIBs...");
    const vib_results = getVibs();
    if (vib_results instanceof EsxiError) {
        console.error(vib_results);
        return;
    }

    dumpData(vib_results, "esxi_vibs", out);

    console.log("Parsing syslog...");
    const log_results = sysLogEsxi();
    if (log_results instanceof EsxiError) {
        console.error(log_results);
        return;
    }

    dumpData(log_results, "esxi_syslog", out);

    console.log("Parsing shell.log...");
    const shell_log = shellLogHistory();
    if (shell_log instanceof EsxiError) {
        console.error(shell_log);
        return;
    }

    dumpData(shell_log, "esxi_shelllog", out);

    console.log("Parsing ESXi accounts...");
    const accounts = esxiAccounts();
    if (accounts instanceof EsxiError) {
        console.error(accounts);
        return;
    }

    dumpData(accounts, "esxi_accounts", out);
}

main();
```

The TypeScript script above parses:

- vSphere Installation Bundles (VIB)
- Shell log data
- Syslog data
- ESXi User accounts

We can bundle and compile to JavaScript with esbuild:

- esbuild --bundle --outfile=main.js main.ts

```
 esbuild --bundle --outfile=main.js main.ts

  main.js  14.5kb

⚡ Done in 34ms
```

:::info

Run esbuild with the --minify argument to make your script smaller!

```
esbuild --bundle --minify --outfile=main.js main.ts

  main.js  6.9kb

⚡ Done in 35ms
```

:::

### Parsing local ESXi data

If you ran UAC or have ESXi data locally you can still leverage the artemis API.  
Every ESXi artifact function accepts an optional alternative path to the artifact.  

For example:

```typescript
import { dumpData, Format, getVibs, Output, OutputType } from "./artemis-api/mod";
import { EsxiError } from "./artemis-api/src/esxi/error";

function main() {
    const out: Output = {
        name: "esxi_artifacts",
        directory: "./tmp",
        format: Format.JSONL,
        compress: false,
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        /**
        * Remote uploads are not supported when **running** on ESXi
        */
        output: OutputType.LOCAL
    };

    console.log("Grabbing VIBs...");
    // We can provide an alternative glob to a directory containing the VIB xml files
    const vib_results = getVibs("directory/containing/vibs/*.xml");
    if (vib_results instanceof EsxiError) {
        console.error(vib_results);
        return;
    }

    dumpData(vib_results, "esxi_vibs", out);
}

main();
```

## Install and Run Artemis on ESXi

The recommended way to execute artemis is to package artemis as a VIB file and install it.  
Since the artemis.vib file is not signed, you will need to force install the vib package (requires root privileges).

```
esxcli software vib install -f -v file:///vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/artemis.vib
```

You will then need to upload the `main.js` file to ESXi via SSH/SCP. Once the `main.js` file is uploaded you can execute with:

- artemis -j main.js


```
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] artemis -j main.js 
[artemis] Starting artemis collection!
Parsing VIBs...
Parsing syslog...
Parsing shell.log...
Parsing ESXi accounts...
[artemis] Finished artemis collection!
```

## Artifact Output

Once you run the script above you should see several output files under `./tmp/esxi_artifacts/*.jsonl|.log`

Sample output for `syslog`

```jsonl
{"message":"Partially resolved path: /usr/lib/vmware/config","datetime":"2026-04-05T02:14:36.173Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /.ash_history","datetime":"2026-04-05T02:14:36.173Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /.profile","datetime":"2026-04-05T02:14:36.173Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /etc/motd-dev","datetime":"2026-04-05T02:14:36.173Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /opt/hp/hpssacli","datetime":"2026-04-05T02:14:36.174Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /opt/smartstorageadmin","datetime":"2026-04-05T02:14:36.174Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /dev/char/vmkdriver/ipmi0","datetime":"2026-04-05T02:14:36.174Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /dev/char/vmkdriver/ipmi1","datetime":"2026-04-05T02:14:36.174Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
{"message":"Partially resolved path: /dev/char/vmkdriver/ipmi2","datetime":"2026-04-05T02:14:36.174Z","pid":131678.0,"evidence":"/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log","category":"In(14)","process":"secpolicytools","timestamp_desc":"Syslog Entry Generated","artifact":"ESXi Syslog","data_type":"esxi:syslog:entry"}
```

Sample output for `accounts`

```jsonl
{"message":"ESXi account 'root'","datetime":"2026-04-05T17:18:59.000Z","timestamp_desc":"Passwd File Modified","artifact":"ESXi User Account","data_type":"esxi:accounts:entry","evidence":"/etc/passwd","uid":0.0,"gid":0.0,"info":"Administrator","shell":"/bin/sh","home":"/"}
{"message":"ESXi account 'dcui'","datetime":"2026-04-05T17:18:59.000Z","timestamp_desc":"Passwd File Modified","artifact":"ESXi User Account","data_type":"esxi:accounts:entry","evidence":"/etc/passwd","uid":100.0,"gid":100.0,"info":"DCUI User","shell":"/bin/sh","home":"/"}
{"message":"ESXi account 'vpxuser'","datetime":"2026-04-05T17:18:59.000Z","timestamp_desc":"Passwd File Modified","artifact":"ESXi User Account","data_type":"esxi:accounts:entry","evidence":"/etc/passwd","uid":500.0,"gid":100.0,"info":"VMware VirtualCenter administration account","shell":"/bin/sh","home":"/"}
{"message":"ESXi account 'testUser'","datetime":"2026-04-05T17:18:59.000Z","timestamp_desc":"Passwd File Modified","artifact":"ESXi User Account","data_type":"esxi:accounts:entry","evidence":"/etc/passwd","uid":1000.0,"gid":1000.0,"info":"ESXi User","shell":"/bin/sh","home":"/"}
```

## Native Rust Artifacts

Currently artemis can generate a filelisting and parse ELF binaries on an ESXi device. You do not need to leverage the artemis API for this artifact. Yara rules are also supported

To timeline a filelisting run the command below:

```
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] artemis acquire --timeline filelisting -h
Pull filelisting

Usage: artemis acquire filelisting [OPTIONS]

Options:
      --md5                          MD5 hash files
      --sha1                         SHA1 hash files
      --sha256                       SHA256 hash files
      --metadata                     Parse executable binaries
      --start-path <START_PATH>      Start path for listing [default: /]
      --depth <DEPTH>                Depth for file listing. Max is 255 [default: 2]
      --regex-filter <REGEX_FILTER>  Regex to only include entries that match
      --yara-rule <YARA_RULE>        Base64 encoded Yara rule to only include entries that match
  -h, --help                         Print help
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] artemis acquire --timeline filelisting --metadata --md5 --start-path / --depth 99
[artemis] Starting artemis collection!
[artemis] Writing output to: ./tmp
[artemis] Finished artemis collection!
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] 
```

Once the filelisting is complete you should see output similar to below:

```
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] cd tmp/local_collector/
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/tmp/local_collector] ls -lh
total 198668
-rw-r--r--    1 root     root        2.5K Apr  5 19:03 13f12932-7bca-41dc-98df-d1cd6a1f442a.log
-rw-r--r--    1 root     root       15.8M Apr  5 19:03 files_06f2c2fd-c9de-4871-91e5-f2ba9790b77e.jsonl
-rw-r--r--    1 root     root        2.8M Apr  5 19:03 files_248c83f8-aaea-422f-a439-937847f2b863.jsonl
-rw-r--r--    1 root     root        3.6M Apr  5 19:03 files_4bf1e03a-b90d-49b2-a2dc-ae3e84b8b544.jsonl
-rw-r--r--    1 root     root        4.5M Apr  5 18:42 files_4fc0b926-bfd9-456e-a08b-658890884fe4.jsonl
-rw-r--r--    1 root     root        2.5M Apr  5 18:42 files_5f579b3d-d01c-45f2-8fdc-7f060a3813e1.jsonl
-rw-r--r--    1 root     root       20.9M Apr  5 19:03 files_736c85a9-66e1-490c-8530-b1759c4d178c.jsonl
-rw-r--r--    1 root     root       30.1M Apr  5 19:03 files_75a6f3b1-7abb-4332-8c99-715e8b61ab51.jsonl
-rw-r--r--    1 root     root       86.1M Apr  5 19:03 files_b8c3100e-b179-4946-8e63-d478862f1059.jsonl
-rw-r--r--    1 root     root       10.7M Apr  5 19:03 files_c8717793-1205-4046-9615-f707f2e9a27e.jsonl
-rw-r--r--    1 root     root      204.9K Apr  5 19:03 files_d560a7e1-ef98-4c90-9cf2-d9498a595e28.jsonl
-rw-r--r--    1 root     root       11.3M Apr  5 19:03 files_f90894f9-69a9-4823-a048-832ecc225025.jsonl
-rw-r--r--    1 root     root        1.8K Apr  5 19:03 report_10bb4934-cdd2-426c-b22f-86750f838b57.json
-rw-r--r--    1 root     root         588 Apr  5 19:03 status_localhost.log
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/tmp/local_collector] 
```

## Triage Files

Artemis also supports acquiring files on ESXi systems via TOML collections. 

:::info

[UAC](https://github.com/tclahr/uac) has a collection of YAML files that it uses for ESXi collections.

:::

For example if you want to acquire all `syslog` files from an ESXi system. You could use the TOML collection below:

```toml
[output]
name = "acquire_syslogs"
directory = "./tmp"
format = "json"
compress = true
timeline = false
endpoint_id = "13ba1e33-4899-4843-adf1-c7e6b20d759a"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "triage"
[[artifacts.triage]]
name = "Acquire syslog"
category = "Shell"
path = "/vmfs/volumes/*/log/"
file_mask = "syslog.*"
recursive = false
recreate_directories = true
```

Then upload the TOML file to the ESXi system and collect the data:

```
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] artemis -t triage.toml 
[artemis] Starting artemis collection!
[artemis] Finished artemis collection!
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] ls tmp/
acquire_syslogs.zip
[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] 
```

If you unzip `acquire_syslogs.zip` and its files you should see the following data:

```
~/Downloads/acquire_syslogs$ ls -lh
total 8.0K
-rw-r--r--. 1 dev dev    0 Jan  1  1980 69cd7d10-7316-4c84-8f2f-1fe734618b3e.log
drwxr-xr-x. 1 dev dev   54 Apr  5 15:14 files
-rw-r--r--. 1 dev dev 2.2K Apr  5 15:15 report_fe3f3f19-9e9d-41d8-9da4-438a6e4d2a33.json
-rw-r--r--. 1 dev dev   49 Jan  1  1980 status_localhost.log
```

The artemis report file contains:

```json
{
    "boot_time": "1970-01-01T00:00:00.000Z",
    "hostname": "localhost",
    "os_version": "Unknown OS version",
    "uptime": 9201,
    "kernel_version": "8.0.3",
    "platform": "Unknown system name",
    "cpu": [],
    "disks": [],
    "memory": {
        "available_memory": 0,
        "free_memory": 0,
        "free_swap": 0,
        "total_memory": 0,
        "total_swap": 0,
        "used_memory": 0,
        "used_swap": 0
    },
    "interfaces": [],
    "performance": {
        "avg_one_min": 0.0,
        "avg_five_min": 0.0,
        "avg_fifteen_min": 0.0
    },
    "version": "0.19.0",
    "rust_version": "1.94.1",
    "build_date": "2026-04-04",
    "product_name": "",
    "product_family": "",
    "product_serial": "",
    "product_uuid": "",
    "product_version": "",
    "vendor": "",
    "collection_id": 1,
    "endpoint_id": "13ba1e33-4899-4843-adf1-c7e6b20d759a",
    "start_time": "2026-04-05T19:12:00.000Z",
    "end_time": "2026-04-05T19:12:00.000Z",
    "total_output_files": 16,
    "artifacts": [
        "triage"
    ],
    "log_file": "./tmp/acquire_syslogs/69cd7d10-7316-4c84-8f2f-1fe734618b3e.log",
    "artifact_runs": [
        {
            "name": "triage",
            "hash": "95e05cefc5fe7cfde47112839013d577",
            "last_run": "2026-04-05T19:12:00.000Z",
            "unixepoch": 1775416320,
            "output_count": 16,
            "output_files": [
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.0.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.1.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.2.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.3.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.4.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.5.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.6.gz",
                "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.0.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.1.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.2.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.3.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.4.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.5.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.6.gz",
                "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log"
            ],
            "status": "completed"
        }
    ]
}
```

Since we enabled `recreate_directories` artemis ensured the full path to the syslog files was retained.

The `files` directory contains:

```
~/Downloads/acquire_syslogs/files$ ls
acquisition_report.json  vmfs
```

The acquisition_report file contains:

```json
[
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T02:14:36.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-05T02:14:36.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.0.gz",
        "filename": "syslog.0.gz",
        "md5": "1785852e22ead98dfa79f9ba4973d7a8",
        "size": 94131
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:18:59.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-05T01:18:59.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.1.gz",
        "filename": "syslog.1.gz",
        "md5": "d761464b31538368cd019442035f34cc",
        "size": 74430
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:18:44.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-05T01:18:44.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.2.gz",
        "filename": "syslog.2.gz",
        "md5": "1025f87250f59d408dbfbc4e9ffc7b41",
        "size": 80009
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:10:17.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-05T01:10:17.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.3.gz",
        "filename": "syslog.3.gz",
        "md5": "a8dffbb530c92ade5695aaa1e8ed3b81",
        "size": 88799
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:09:11.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-05T01:09:11.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.4.gz",
        "filename": "syslog.4.gz",
        "md5": "295e39f1b4394afb10b9aff0139167a9",
        "size": 89023
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T00:01:01.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-05T00:01:01.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.5.gz",
        "filename": "syslog.5.gz",
        "md5": "625d1e808fbcae0c52bac5fd3e5fe603",
        "size": 102866
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-04T00:16:07.000Z",
        "accessed": "2026-04-05T19:03:28.000Z",
        "changed": "2026-04-04T00:16:07.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.6.gz",
        "filename": "syslog.6.gz",
        "md5": "2405417fed1c681822e5063f9ac7ddc9",
        "size": 96309
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T19:11:47.000Z",
        "accessed": "2026-04-05T19:05:23.000Z",
        "changed": "2026-04-05T19:11:34.000Z",
        "full_path": "/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log",
        "filename": "syslog.log",
        "md5": "18bf0cf04b1f89dc81e8a0a2d5ddc2b2",
        "size": 876065
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T02:14:36.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-05T02:14:36.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.0.gz",
        "filename": "syslog.0.gz",
        "md5": "1785852e22ead98dfa79f9ba4973d7a8",
        "size": 94131
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:18:59.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-05T01:18:59.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.1.gz",
        "filename": "syslog.1.gz",
        "md5": "d761464b31538368cd019442035f34cc",
        "size": 74430
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:18:44.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-05T01:18:44.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.2.gz",
        "filename": "syslog.2.gz",
        "md5": "1025f87250f59d408dbfbc4e9ffc7b41",
        "size": 80009
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:10:17.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-05T01:10:17.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.3.gz",
        "filename": "syslog.3.gz",
        "md5": "a8dffbb530c92ade5695aaa1e8ed3b81",
        "size": 88799
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T01:09:11.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-05T01:09:11.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.4.gz",
        "filename": "syslog.4.gz",
        "md5": "295e39f1b4394afb10b9aff0139167a9",
        "size": 89023
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T00:01:01.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-05T00:01:01.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.5.gz",
        "filename": "syslog.5.gz",
        "md5": "625d1e808fbcae0c52bac5fd3e5fe603",
        "size": 102866
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-04T00:16:07.000Z",
        "accessed": "2026-04-05T19:12:00.000Z",
        "changed": "2026-04-04T00:16:07.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.6.gz",
        "filename": "syslog.6.gz",
        "md5": "2405417fed1c681822e5063f9ac7ddc9",
        "size": 96309
    },
    {
        "created": "1970-01-01T00:00:00.000Z",
        "modified": "2026-04-05T19:11:47.000Z",
        "accessed": "2026-04-05T19:05:23.000Z",
        "changed": "2026-04-05T19:11:34.000Z",
        "full_path": "/vmfs/volumes/OSDATA-69d0473d-ded27d57-be04-52540075d1a0/log/syslog.log",
        "filename": "syslog.log",
        "md5": "18bf0cf04b1f89dc81e8a0a2d5ddc2b2",
        "size": 876065
    }
]
```

The acquired files are below:

```
~/Downloads/acquire_syslogs/files$ tree vmfs/
vmfs/
└── volumes
    ├── 69d0473d-ded27d57-be04-52540075d1a0
    │   └── log
    │       ├── syslog.0.gz
    │       ├── syslog.1.gz
    │       ├── syslog.2.gz
    │       ├── syslog.3.gz
    │       ├── syslog.4.gz
    │       ├── syslog.5.gz
    │       ├── syslog.6.gz
    │       └── syslog.log
    └── OSDATA-69d0473d-ded27d57-be04-52540075d1a0
        └── log
            ├── syslog.0.gz
            ├── syslog.1.gz
            ├── syslog.2.gz
            ├── syslog.3.gz
            ├── syslog.4.gz
            ├── syslog.5.gz
            ├── syslog.6.gz
            └── syslog.log

6 directories, 16 files
```
