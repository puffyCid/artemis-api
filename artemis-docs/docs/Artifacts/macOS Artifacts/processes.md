---
description: macOS process metadata
keywords:
  - macOS
  - volatile
---

# Processes

Gets a standard process listing using the macOS API

Other Parsers:

- Any tool that calls the macOS API

References:

- N/A

## TOML Collection

```toml
[output]
name = "process_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "processes" # Name of artifact
[artifacts.processes]
# Get executable metadata
metadata = true 
# MD5 hash process binary
md5 = true 
 # SHA1 hash process binary
sha1 = false
# SHA256 hash process binary
sha256 = false
```

## Collection Options

- `metadata` Get [Macho](macho.md) data from process binary.
- `md5` Boolean value to MD5 hash process binary
- `sha1` Boolean value to SHA1 hash process binary
- `sha256` Boolean value to SHA256 hash process binary

## Output Structure

An array of `MacosProcessInfo` entries

```typescript
export interface MacosProcessInfo {
  /**Full path to the process binary */
  full_path: string;
  /**Name of process */
  name: string;
  /**Path to process binary */
  path: string;
  /** Process ID */
  pid: number;
  /** Parent Process ID */
  ppid: number;
  /**Environment variables associated with process */
  environment: string;
  /**Status of the process */
  status: string;
  /**Process arguments */
  arguments: string;
  /**Process memory usage */
  memory_usage: number;
  /**Process virtual memory usage */
  virtual_memory_usage: number;
  /**Process start time*/
  start_time: string;
  /** User ID associated with process */
  uid: string;
  /**Group ID associated with process */
  gid: string;
  /**MD5 hash of process binary */
  md5: string;
  /**SHA1 hash of process binary */
  sha1: string;
  /**SHA256 hash of process binary */
  sha256: string;
  /**MACHO metadata asssociated with process binary */
  binary_info: MachoInfo[];
}
```
