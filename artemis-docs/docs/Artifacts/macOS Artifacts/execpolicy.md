---
description: Application execution tracker
keywords:
  - macOS
  - sqlite
---

# ExecPolicy

macOS Execution Policy (`ExecPolicy`) tracks application execution on a system.
It only tracks execution of applications that tracked by GateKeeper

Other Parsers:

- Any SQLITE viewer

References:

- [ExecPolicy Info](https://eclecticlight.co/2023/03/13/ventura-has-changed-app-quarantine-with-a-new-xattr/)
- [Policy Internals](https://knight.sc/reverse%20engineering/2019/02/20/syspolicyd-internals.html)

# TOML Collection

```toml
system = "macos"

[output]
name = "execpolicy_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "execpolicy"
[artifacts.execpolicy]
# Optional
# alt_file = ""
```

# Collection Options

- `alt_file` Use an alternative file to the ExecPolicy database. This
  configuration is **optional**. By default artemis will read the default
  ExecPolicy database at `/var/db/SystemPolicyConfiguration/ExecPolicy`

# Output Structure

An array of `ExecPolicy` entries

```typescript
export interface ExecPolicy {
  /**Is file signed */
  is_signed: number;
  /**File ID name */
  file_identifier: string;
  /**App bundle ID */
  bundle_identifier: string;
  /**Bundle version */
  bundle_version: string;
  /**Team ID */
  team_identifier: string;
  /**Signing ID */
  signing_identifier: string;
  /**Code Directory hash*/
  cdhash: string;
  /**SHA256 hash of application */
  main_executable_hash: string;
  /**Executable timestamp in UNIXEPOCH seconds */
  executable_timestamp: number;
  /**Size of file */
  file_size: number;
  /**Is library */
  is_library: number;
  /**Is file used */
  is_used: number;
  /**File ID associated with entry */
  responsible_file_identifier: string;
  /**Is valid entry */
  is_valid: number;
  /**Is quarantined entry */
  is_quarantined: number;
  /**Timestamp for executable measurements in UNIXEPOCH seconds */
  executable_measurements_v2_timestamp: number;
  /**Reported timestamp in UNIXEPOCH seconds */
  reported_timstamp: number;
  /**Primary key */
  pk: number;
  /**Volume UUID for entry */
  volume_uuid: string;
  /**Object ID for entry */
  object_id: number;
  /**Filesystem type */
  fs_type_name: string;
  /**App Bundle ID */
  bundle_id: string;
  /**Policy match for entry */
  policy_match: number;
  /**Malware result for entry */
  malware_result: number;
  /**Flags for entry */
  flags: number;
  /**Modified time in UNIXEPOCH seconds */
  mod_time: number;
  /**Policy scan cache timestamp in UNIXEPOCH seconds */
  policy_scan_cache_timestamp: number;
  /**Revocation check timestamp in UNIXEPOCH seconds */
  revocation_check_time: number;
  /**Scan version for entry */
  scan_version: number;
  /**Top policy match for entry */
  top_policy_match: number;
}
```
