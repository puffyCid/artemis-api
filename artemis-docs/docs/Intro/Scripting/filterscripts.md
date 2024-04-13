---
sidebar_position: 4
description: Filtering scripts
---

# Filtering

In addition to creating scripts that call artemis functions. artemis has the
ability to pass the artifact data as an argument to a script! For most scenarios
calling the artemis function is the recommended practice for scripting. However,
the sole execption is the `filelisting` and `rawfilelisting` artifacts.

When pulling a filelisting artemis will recursively walk the filesystem, but in
order to keep memory usage low, every 100,000 files artemis will output the
results. While this will keep memory usage low, it makes it difficult to use via
scripting. If we return 100,000 entries to our script, we cannot continue our
recursive filelisting because we have lost track where we are in the filesystem.

This where filter scripts can help.

Instead of calling an artemis function like `getRegistry` we instead tell
artemis to pass the artifact data as an argument to our script. So, instead of
returning 100,000 files, we pass that data as an argument to our script before
outputting the results.

A normal artemis script would look like something below:

```toml
system = "macos"

[output]
name = "plist_data"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "script"
[artifacts.script]
name = "all_users_plist_files"
# Parses all plist files in /Users/%
script = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvcGxpc3QudHMKZnVuY3Rpb24gZ2V0UGxpc3QocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9wbGlzdChwYXRoKTsKICBpZiAoZGF0YSA9PT0gIiIpIHsKICAgIHJldHVybiBudWxsOwogIH0KICBjb25zdCBwbGlzdF9kYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gcGxpc3RfZGF0YTsKfQoKLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvc3lzdGVtL291dHB1dC50cwpmdW5jdGlvbiBvdXRwdXRSZXN1bHRzKGRhdGEsIGRhdGFfbmFtZSwgb3V0cHV0KSB7CiAgY29uc3Qgb3V0cHV0X3N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG91dHB1dCk7CiAgY29uc3Qgc3RhdHVzID0gRGVuby5jb3JlLm9wcy5vdXRwdXRfcmVzdWx0cygKICAgIGRhdGEsCiAgICBkYXRhX25hbWUsCiAgICBvdXRwdXRfc3RyaW5nCiAgKTsKICByZXR1cm4gc3RhdHVzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9maWxlc3lzdGVtL2RpcmVjdG9yeS50cwphc3luYyBmdW5jdGlvbiByZWFkRGlyKHBhdGgpIHsKICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShhd2FpdCBmcy5yZWFkRGlyKHBhdGgpKTsKICByZXR1cm4gZGF0YTsKfQoKLy8gbWFpbi50cwphc3luYyBmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IHN0YXJ0X3BhdGggPSAiL1VzZXJzIjsKICBjb25zdCBwbGlzdF9maWxlcyA9IFtdOwogIGF3YWl0IHJlY3Vyc2VfZGlyKHBsaXN0X2ZpbGVzLCBzdGFydF9wYXRoKTsKICByZXR1cm4gcGxpc3RfZmlsZXM7Cn0KYXN5bmMgZnVuY3Rpb24gcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHN0YXJ0X3BhdGgpIHsKICBpZiAocGxpc3RfZmlsZXMubGVuZ3RoID4gMjApIHsKICAgIGNvbnN0IG91dCA9IHsKICAgICAgbmFtZTogImFydGVtaXNfcGxpc3QiLAogICAgICBkaXJlY3Rvcnk6ICIuL3RtcCIsCiAgICAgIGZvcm1hdDogImpzb24iIC8qIEpTT04gKi8sCiAgICAgIGNvbXByZXNzOiBmYWxzZSwKICAgICAgZW5kcG9pbnRfaWQ6ICJhbnl0aGluZy1pLXdhbnQiLAogICAgICBjb2xsZWN0aW9uX2lkOiAxLAogICAgICBvdXRwdXQ6ICJsb2NhbCIgLyogTE9DQUwgKi8KICAgIH07CiAgICBjb25zdCBzdGF0dXMgPSBvdXRwdXRSZXN1bHRzKAogICAgICBKU09OLnN0cmluZ2lmeShwbGlzdF9maWxlcyksCiAgICAgICJhcnRlbWlzX2luZm8iLAogICAgICBvdXQKICAgICk7CiAgICBpZiAoIXN0YXR1cykgewogICAgICBjb25zb2xlLmxvZygiQ291bGQgbm90IG91dHB1dCB0byBsb2NhbCBkaXJlY3RvcnkiKTsKICAgIH0KICAgIHBsaXN0X2ZpbGVzID0gW107CiAgfQogIGZvciAoY29uc3QgZW50cnkgb2YgYXdhaXQgcmVhZERpcihzdGFydF9wYXRoKSkgewogICAgY29uc3QgcGxpc3RfcGF0aCA9IGAke3N0YXJ0X3BhdGh9LyR7ZW50cnkuZmlsZW5hbWV9YDsKICAgIGlmIChlbnRyeS5pc19maWxlICYmIGVudHJ5LmZpbGVuYW1lLmVuZHNXaXRoKCJwbGlzdCIpKSB7CiAgICAgIGNvbnN0IGRhdGEgPSBnZXRQbGlzdChwbGlzdF9wYXRoKTsKICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHsKICAgICAgICBjb250aW51ZTsKICAgICAgfQogICAgICBjb25zdCBwbGlzdF9pbmZvID0gewogICAgICAgIHBsaXN0X2NvbnRlbnQ6IGRhdGEsCiAgICAgICAgZmlsZTogcGxpc3RfcGF0aAogICAgICB9OwogICAgICBwbGlzdF9maWxlcy5wdXNoKHBsaXN0X2luZm8pOwogICAgICBjb250aW51ZTsKICAgIH0KICAgIGlmIChlbnRyeS5pc19kaXJlY3RvcnkpIHsKICAgICAgYXdhaXQgcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHBsaXN0X3BhdGgpOwogICAgfQogIH0KfQptYWluKCk7Cg=="
```

:::note

High level overview of what happens:

toml file -> decode script -> execute script

:::

A filter script would look like something below:

```toml
system = "macos"

[output]
name = "info_plist_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
filter_name = "apps_info_plists"
# This script will take the files artifact below and filter it to only return Info.plist files
# We could expand this even further by then using the plist parser on the Info.plist path and include that parsed data too
filter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgZmlsdGVyX2ZpbGVzID0gW107CiAgZm9yIChjb25zdCBlbnRyeSBvZiBkYXRhKSB7CiAgICBpZiAoZW50cnkuZmlsZW5hbWUgPT0gIkluZm8ucGxpc3QiKSB7CiAgICAgIGZpbHRlcl9maWxlcy5wdXNoKGVudHJ5KTsKICAgIH0KICB9CiAgcmV0dXJuIGZpbHRlcl9maWxlczsKfQptYWluKCk7Cg=="

[[artifacts]]
artifact_name = "files" # Name of artifact
filter = true
[artifacts.files]
start_path = "/System/Volumes/Data/Applications" # Start of file listing
depth = 100 # How many sub directories to descend
metadata = false # Get executable metadata
md5 = false # MD5 all files
sha1 = false # SHA1 all files
sha256 = false # SHA256 all files
path_regex = "" # Regex for paths
file_regex = "" # Regex for files
```

The biggest differences are:

- We use a `[[artifacts]]` list to parse our data
- We base64 encode our script and assign to `filter_script` to tell artemis:
  take the results of the `[[artifacts]]` list and filter them before outputting
  the data
- We then set the `filter` value to true

:::note

High level overview of what happens:

toml file -> walkthrough artifacts list-> pass data to filter script -> output

:::

:::info

All entries in a `[[artifacts]]` list can be sent through a filter script with
the exception of regular artemis scripts. The output of these scripts will not
go through `filter_script`.

:::

The TypeScrpt code for a filter script would be something like below:

```typescript
import { MacosFileInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/files.ts";

/**
 * Filters a provided file listing argument to only return Info.plist files from /Applications
 * Two arguments are always provided:
 *   - First is the parsed data serialized into JSON string
 *   - Second is the artifact name (ex: "amcache")
 * @returns Array of files only containing Info.plist
 */
function main() {
  // Since this is a filter script our data will be passed as a Serde Value that is a string
  const args: string[] = STATIC_ARGS;
  if (args.length < 2) {
    return [];
  }

  // Parse the provide Serde Value (JSON string) as a MacosFileInfo[]
  const data: MacosFileInfo[] = JSON.parse(args[0]);
  const artifact_name = args[1]; // Contains "files" string (aka the artifact name)
  const filter_files: MacosFileInfo[] = [];

  for (const entry of data) {
    if (entry.filename == "Info.plist") {
      filter_files.push(entry);
    }
  }
  return filter_files;
}

main();
```

The key difference between a regular artemis script and a filter script is:

```typescript
const args: string[] = STATIC_ARGS;
if (args.length < 2) {
  return [];
}

// Parse the provide Serde Value (JSON string) as a MacosFileInfo[]
const data: MacosFileInfo[] = JSON.parse(args[0]);
const artifact_name = args[1]; // Contains "files" string (aka the artifact name)
```

:::info

When running scripts artemis assigns the variable `STATIC_ARGS` the data we want
to filter. `STATIC_ARGS` is an array with the first index ([0]) holding the data
to filer and second index ([1]) the type of data (aka the artifact name), ex:
`files` artifact.

This data is **only** populated if you enable `filter = true` option in the
collection TOML.

:::

Here we are taking the first argument provided to our script and parsing it as a
JSON `MacosFileInfo` object array. As stated above, artemis will pass the
results of each `[[artifacts]]` entry to our script using serde to serialize the
data as a JSON formattted string.\
According to the macOS [files](../../Artifacts/macOS%20Artifacts/files.md)
artifact this data is an array of `MacosFileInfo`.

We then parse and filter the data based on our script

```typescript
// Parse the provide Serde Value (JSON string) as a MacosFileInfo[]
const data: MacosFileInfo[] = JSON.parse(args[0]);
const filter_files: MacosFileInfo[] = [];

for (const entry of data) {
  if (entry.filename == "Info.plist") {
    filter_files.push(entry);
  }
}
```

Finally, we take our filtered output and return it back to artemis

```typescript
return filter_files;
```

So our initial data provided to our filter script gets filtered and returned. In
this example, our 100,000 file listing entry gets filtered to only return
entries with the filename Info.plist.
