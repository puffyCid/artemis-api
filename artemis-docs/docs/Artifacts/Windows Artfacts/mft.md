---
description: Windows Master File Table
keywords:
  - windows
  - file meta
  - ntfs
---

# MFT

The Windows MFT file contains a record of all files and directories on a Windows
NTFS volume. Artemis supports parsing the MFT file and can attempt to generate a
filelisting of the system.

Since the MFT file can be extremely large, every 100k entries artemis will
output the data and then continue.

Generating a filelisting from just the MFT file is challenging, there are a
[variety](https://osdfir.blogspot.com/2021/10/pearls-and-pitfalls-of-timeline-analysis.html)
of
[edge cases](https://harelsegev.github.io/posts/resolving-file-paths-using-the-mft/)
that can arise that can make path reconstruction incomplete. Artemis was
designed to try handle the most common issues and edge case scenarios.

If you have concerns about the output, you should validate with another MFT
parsing tool.

Other Parsers:

- [velociraptor](https://github.com/Velocidex/velociraptor)

References:

- [Libyal](https://github.com/libyal/libfsntfs/blob/main/documentation/New%20Technologies%20File%20System%20(NTFS).asciidoc)

```toml
system = "windows"

[output]
name = "mft_collection"
directory = "./tmp"
format = "csv"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "mft"
[artifacts.mft]
# alt_drive = 'C'
# alt_file = "/tmp/$MFT"
```

# Collection Options

- `alt_drive` Alternative drive letter to use to parse the MFT. By default
  artemis will parse the SystemDrive. This configuration is **optional**
- `alt_file` Alternative path to the MFT file. This configuration is
  **optional**

# Output Structure

An array of `MftEntry` entries

```typescript
export interface MftEntry {
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
    /**Inode entry */
    inode: number;
    /**Parent Inode entry*/
    parent_inode: number;
    /**Sequence number for entry */
    usn: number;
    /**Is the entry a file */
    is_file: boolean;
    /**Is the entry a directory */
    is_directory: boolean;
    /**Is the entry deleted */
    deleted: boolean;
    /**Namespace for the entry */
    namespace: Namespace;
    /**Attributs for the entry */
    attributes: AttributeFlags[];
    /**Other attributes parsed for the entry */
    attribute_list: Record<string, unknown>[];
}

export enum Namespace {
    Posix = "Posix",
    Windows = "Windows",
    Dos = "Dos",
    WindowsDos = "WindowsDos",
    Unknown = "Unknown",
}

export enum AttributeFlags {
    ReadOnly = "ReadOnly",
    Hidden = "Hidden",
    System = "System",
    Directory = "Directory",
    Archive = "Archive",
    Device = "Device",
    Normal = "Normal",
    Temporary = "Temporary",
    Sparse = "Sparse",
    Reparse = "Reparse",
    Compressed = "Compressed",
    Offline = "Offline",
    NotIndexed = "NotIndexed",
    Encrypted = "Encrypted",
    Virtual = "Virtual",
    Unknown = "Unknown",
    IndexView = "IndexView",
    Volume = "Volume",
}
```
