---
description: Tracks execution of files on workstations
keywords:
  - windows
  - binary
---

# Prefetch

Windows `Prefetch` data tracks execution of applications on Windows
Workstations. `Prefetch` files are typically located at `C:\Windows\Prefetch`.
On Windows servers `Prefetch` is disabled and may also be disabled on systems
with SSDs. Starting on Windows 10, the `Prefetch` files are compressed using
`LZXPRESS Huffman`. artemis uses the Windows API to decompress the data before
parsing `Prefetch` fiels

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.prefetch/)

References:
[Libyal](https://github.com/libyal/libscca/blob/main/documentation/Windows%20Prefetch%20File%20(PF)%20format.asciidoc)

# TOML Collection

```toml
system = "windows"

[output]
name = "prefetch_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "prefetch"
[artifacts.prefetch]
# Optional
# alt_dir = "C:\\Artifacts"
```

# Collection Options

- `alt_dir` Full path to an alternative directory containing Prefetch files.
  This configuration is **optional**. By default artemis parse all Prefetch
  files on the system at the default location

# Output Structure

An array of `Prefetch` entries

```typescript
export interface Prefetch {
  /**Path to prefetch file */
  path: string;
  /**Name of executed file */
  filename: string;
  /**Prefetch hash */
  hash: string;
  /**Most recent execution timestamp */
  last_run_time: string;
  /**Array of up to eight (8) execution timestamps */
  all_run_times: string[];
  /**Number of executions */
  run_count: number;
  /**Size of executed file */
  size: number;
  /**Array of volume serial numbers associated with accessed files/directories */
  volume_serial: string[];
  /**Array of volume creation timestamps associated with accessed files/directories */
  volume_creation: string[];
  /**Array of volumes associated accessed files/directories */
  volume_path: string[];
  /**Number of files accessed by executed file */
  accessed_file_count: number;
  /**Number of directories accessed by executed file */
  accessed_directories_count: number;
  /**Array of accessed files by executed file */
  accessed_files: string[];
  /**Array of accessed directories by executed file */
  accessed_directories: string[];
}
```
