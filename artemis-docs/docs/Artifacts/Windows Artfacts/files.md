---
description: Windows file metadata
keywords:
  - windows
  - file meta
---

# Files

A regular Windows filelisting. Artemis uses the
[walkdir](https://crates.io/crates/walkdir) crate to recursively walk the files
and directories on the system. If hashing or `PE` parsing is enabled this will
update the `Last Accessed` timestamps on files since the native OS APIs are used
to access the files and it will fail on any locked files. Use
[RawFiles](./rawfiles.md) to bypass locked files.

The standard Rust API does not support getting `Changed/Entry Modified`
timestamp on Windows. Use [RawFiles](./rawfiles.md) to include the
`Changed/Entry Modified` timestamp.

Since a filelisting can be extremely large, every 100k entries artemis will
output the data and then continue.

Other Parsers:

- Any tool that can recursively list files and directories

References:

- N/A

# TOML Collection

```toml
[output]
name = "files_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "files" # Name of artifact
[artifacts.files]
start_path = "C:\\Windows" # Where to start the listing
# Optional
depth = 1 # How many sub directories to descend
# Optional
metadata = true # Get PE metadata
# Optional
md5 = true # MD5 all files
# Optional
sha1 = false # SHA1 all files
# Optional
sha256 = false # SHA256 all files
# Optional
path_regex = "" # Regex for paths
# Optional
file_regex = "" # Regex for files
```

# Collection Options

- `start_path` Where to start the file listing. Must exist on the endpoint. To
  start at root use `C:\\`. This configuration is **required**
- `depth` Specify how many directories to descend from the `start_path`. Default
  is one (1). Must be a postive number. Max value is 255. This configuration is
  **optional**
- `metadata` Get [PE](pe.md) data from `PE` files. This configuration is
  **optional**. Default is **false**
- `md5` Boolean value to enable MD5 hashing on all files. This configuration is
  **optional**. Default is **false**
- `sha1` Boolean value to enable SHA1 hashing on all files. This configuration
  is **optional**. Default is **false**
- `sha256` Boolean value to enable SHA256 hashing on all files. This
  configuration is **optional**. Default is **false**
- `path_regex` Only descend into paths (directories) that match the provided
  regex. This configuration is **optional**. Default is no Regex
- `file_regex` Only return entres that match the provided regex. This
  configuration is **optional**. Default is no Regex

# Output Structure

An array of `WindowsFileInfo` entries

```typescript
export interface WindowsFileInfo {
  /**Full path to file or directory */
  full_path: string;
  /**Directory path */
  directory: string;
  /**Filename */
  filename: string;
  /**Extension of file if any */
  extension: string;
  /**Created timestamp */
  created: string;
  /**Modified timestamp */
  modified: string;
  /**Changed timestamp */
  changed: string;
  /**Accessed timestamp */
  accessed: string;
  /**Size of file in bytes */
  size: number;
  /**Inode associated with entry */
  inode: number;
  /**Mode of file entry */
  mode: number;
  /**User ID associated with file */
  uid: number;
  /**Group ID associated with file */
  gid: number;
  /**MD5 of file */
  md5: string;
  /**SHA1 of file */
  sha1: string;
  /**SHA256 of file */
  sha256: string;
  /**Is the entry a file */
  is_file: boolean;
  /**Is the entry a directory */
  is_directory: boolean;
  /**Is the entry a symbolic links */
  is_symlink: boolean;
  /**Depth the file from provided start poin */
  depth: number;
  /**PE binary metadata */
  binary_info: PeInfo;
}
```
