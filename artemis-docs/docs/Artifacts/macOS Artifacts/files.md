---
description: macOS Filesystem metadata
keywords:
  - macos
  - file meta
---

# Files

A filelisting against a system. The files artifact is a unique compared to other artifacts.  
Depending on the `source` option, artemis will return different type of filelisting. 

Artemis currently supports 3 different types of filelisting:
- Host - Filelisting against a live system
- Zip - Filelisting against a zip file
- NTFS - Filelisting against a NTFS drive


Since a filelisting can be extremely large, every 10k entries artemis will
output the data and then continue. However, iff binary parsing or timelining is enabled, 
then every 1k entries artemis will output the data and then continue.

Other Parsers:

- Any tool that can recursively list files and directories

References:

- N/A

## TOML Collection

```toml
[output]
name = "files_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
destination= "local"

[[artifacts]]
artifact_name = "files" # Name of artifact
[artifacts.files]
start_path = "C:\\Windows" # Where to start the listing
# Optional
depth = 1        # How many sub directories to descend
# Optional
metadata = true  # Get MACHO metadata
# Optional
md5 = true       # MD5 all files
# Optional
sha1 = false     # SHA1 all files
# Optional
sha256 = false   # SHA256 all files
# Optional
path_regex = ""  # Regex for paths
# Optional
file_regex = ""  # Regex for files
# Optional
yara = ""        # Base64 encoded Yara rule or a remote Yara rule
source = "host:" # What type of filelisting to perform
```

## Collection Options

- `start_path` Where to start the file listing. Must exist on the endpoint. To
  start at root use `C:\\`. This configuration is **required**
- `depth` Specify how many directories to descend from the `start_path`. Default
  is one (1). Must be a postive number. Max value is 255. This configuration is
  **optional**
- `metadata` Get [MACHO](macho.md) data from `MACHO` files. This configuration is
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
- `yara` Either a base64 encoded Yara rule or a Yara rule hosted on a remote server
- `source` What type of filelisting to perform. This value can be:
  - `host:` - Represents a live filelisting
  - `ntfs:C` - Represents a NTFS filelisting against the C drive
  - `zip:/full/path/to/file.zip` - Represents a ZIP filelisting against file.zip

## Output Structure

Depends on the `source` value

```typescript
/**
 * Hashing algorithms supported by the Runtime
 */
export interface Hashes {
  /**MD5 hash value */
  md5: string;
  /**SHA1 hash value */
  sha1: string;
  /**SHA256 value */
  sha256: string;
}

export interface FileHostInfo {
  full_path: string;
  directory: string;
  filename: string;
  extension: string;
  created: string;
  modified: string;
  changed: string;
  accessed: string;
  uid: string;
  gid: string;
  inode: number,
  attributes: Attributes[],
  size: number,
  md5: string;
  sha1: string;
  sha256: string;
  kind: EntryKind,
  depth: number,
  yara_hits: string[],
  binary_info: Record<string, unknown>,
  display_path: string;
  evidence: string;
}

export enum EntryKind {
  File = "File",
  Directory = "Directory",
  Symlink = "Symlink",
  Socket = "Socket",
  BlockDevice = "BlockDevice",
  Pipe = "Pipe",
  CharDevice = "CharDevice",
  Unsupported = "Unsupported",
}

export enum Attributes {
  // Windows
  ReadOnly = "ReadOnly",
  Hidden = "Hidden",
  System = "System",
  Directory = "Directory",
  Archive = "Archive",
  Device = "Device",
  Normal = "Normal",
  Temporary = "Temporary",
  Sparse = "Sparse",
  ReparsePoint = "ReparsePoint",
  Compressed = "Compressed",
  Offline = "Offline",
  NotContentIndexed = "NotContentIndexed",
  Encrypted = "Encrypted",
  IntegritySystem = "IntegritySystem",
  Virtual = "Virtual",
  NoScrubData = "NoScrubData",
  ExtendedAttributes = "ExtendedAttributes",
  Pinned = "Pinned",
  Unpinned = "Unpinned",
  RecallOnOpen = "RecallOnOpen",
  RecallOnDataAccess = "RecallOnDataAccess",

  // Unix
  UserRead = "UserRead",
  GroupRead = "GroupRead",
  OtherRead = "OtherRead",
  UserWrite = "UserWrite",
  GroupWrite = "GroupWrite",
  OtherWrite = "OtherWrite",
  UserExecute = "UserExecute",
  GroupExecute = "GroupExecute",
  OtherExecute = "OtherExecute",
  SetUid = "SetUid",
  SetGid = "SetGid",
  Sticky = "Sticky",
}

export interface FileNtfsInfo {
  full_path: string;
  directory: string;
  filename: string;
  extension: string;
  created: string;
  modified: string;
  changed: string;
  accessed: string;
  filename_created: string;
  filename_modified: string;
  filename_changed: string;
  filename_accessed: string;
  attributes: Attributes[];
  size: number;
  md5: string;
  sha1: string;
  sha256: string;
  kind: EntryKind;
  depth: number;
  yara_hits: string[],
  binary_info: Record<string, unknown>,
  display_path: string;
  compressed_size: number;
  compression_type: CompressionType,
  inode: number;
  sequence_number: number,
  parent_sequence_number: number,
  parent_mft_reference: number,
  owner: number,
  namespace: Namespace,
  ads_info: ADSInfo[];
  usn: number;
  sid: number;
  user_sid: string;
  group_sid: string;
  drive: string;
  evidence: string;
}

export enum CompressionType {
  NTFSCompressed = "NTFSCompressed",
  WofCompressed = "WofCompressed",
  None = "None"
}

export enum Namespace {
  Posix = "Posix",
  Windows = "Windows",
  Dos = "Dos",
  WindowsDos = "WindowsDos",
  Unknown = "Unknown",
}

export interface ADSInfo {
  name: string;
  size: number;
}

export interface FilesZipInfo {
  full_path: string;
  directory: string;
  filename: string;
  extension: string;
  modified: string;
  size: number;
  compressed_size: number;
  compression: string;
  crc32: number;
  encrypted: boolean;
  md5: string;
  sha1: string;
  sha256: string;
  kind: EntryKind,
  depth: number;
  yara_hits: string[];
  binary_info: Record<string, unknown>;
  display_path: string;
  evidence: string;
}
```
