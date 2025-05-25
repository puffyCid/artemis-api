---
description: Windows NTFS file metadata
keywords:
  - windows
  - file meta
---

# Raw Files

A raw Windows filelisting by parsing the `NTFS` file system using the
[ntfs](https://github.com/ColinFinck/ntfs) crate to recursively walk the files
and directories on the system. If hashing or `PE` parsing is enabled this will
also read the file contents. `Raw Files` also supports decompressing compressed
files with the `WofCompression` alternative data stream (ADS) attribute.

Since a filelisting can be extremely large, every 100k entries artemis will
output the data and then continue.

Other Parsers:

- Any tool that parse the NTFS file system

References:

- [Libyal](https://github.com/libyal/libfsntfs/blob/main/documentation/New%20Technologies%20File%20System%20(NTFS).asciidoc)

# TOML Collection

```toml
[output]
name = "ntfs_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "rawfiles"
[artifacts.rawfiles]
drive_letter = 'C'
start_path = "C:\\"
depth = 20
recover_indx = false
# Optional
metadata = true # Get PE metadata
# Optional
md5 = false
# Optional
sha1 = false
# Optional
sha256 = false
# Optional
metadata = false
# Optional
path_regex = ""
# Optional
filename_regex = ""
```

# Collection Options

- `drive_letter` Drive letter to use to parse the NTFS file system. This
  configuration is **required**
- `start_path` Directory to start walking the filesystem. This configuration is
  **required**
- `depth` How many directories to descend from the `start_path`. Must be a
  postive number. Max value is 255. This configuration is **required**
- `recover_indx` Boolean value to carve deleted entries from the `$INDX`
  attribute. Can show evidence of deleted files
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

An array of `WindowsRawFileInfo` entries

```typescript
export interface RawFileInfo {
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
  /**Filename created timestamp */
  filename_created: string;
  /**Filename modified timestamp */
  filename_modified: string;
  /**Filename accessed timestamp */
  filename_accessed: string;
  /**Filename changed timestamp */
  filename_changed: string;
  /**Size of file in bytes */
  size: number;
  /**Size of file if compressed */
  compressed_size: number;
  /**Compression type used on file */
  compression_type: string;
  /**Inode entry */
  inode: number;
  /**Sequence number for entry */
  sequence_number: number;
  /**Parent MFT reference for entry */
  parent_mft_references: number;
  /**Attributes associated with entry */
  attributes: AttributeFlags[];
  /**MD5 of file. Optional */
  md5: string;
  /**SHA1 of file. Optional */
  sha1: string;
  /**SHA256 of file. Optional */
  sha256: string;
  /**Is the entry a file */
  is_file: boolean;
  /**Is the entry a directory */
  is_directory: boolean;
  /** Is the entry carved from $INDX */
  is_indx: boolean;
  /**USN entry */
  usn: number;
  /**SID number associated with entry */
  sid: number;
  /**SID  string associated with entry*/
  user_sid: string;
  /**Group SID associated with entry */
  group_sid: string;
  /**Drive letter */
  drive: string;
  /**ADS info associated with entry */
  ads_info: AdsInfo[];
  /**Depth the file from provided start point*/
  depth: number;
  /**PE binary metadata. Optional */
  binary_info: PeInfo[];
}

/**
 * Alternative Data Streams (ADS) are a NTFS feature to embed data in another data stream
 */
export interface AdsInfo {
  /**Name of the ADS entry */
  name: string;
  /**Size of the ADS entry */
  size: number;
}
```
