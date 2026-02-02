---
description: Windows files in the RecycleBin
keywords:
  - windows
  - file meta
---

# RecycleBin

Windows RecycleBin is a special folder on Windows that stores files deleted
using the Explorer GUI. When a file is deleted (via Explorer) two types files
are generated in the RecycleBin:

- Files that begin with `$I<number>.<original extension>`. Contains metadata
  about deleted file
- Files that begin with `$R<number>.<original extension>`. Contents of deleted
  file

Currently artemis supports parsing the $I based files using the standard
Windows APIs to read the file for parsing. It does not try to recover files that
have been deleted/emptied from the RecycleBin

Other parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.recyclebin/)

References:

- [libyal](https://github.com/libyal/dtformats/blob/main/documentation/Windows%20Recycle.Bin%20file%20formats.asciidoc)
- [RecycleBin](https://cybersecurity.att.com/blogs/security-essentials/digital-dumpster-diving-exploring-the-intricacies-of-recycle-bin-forensics)

## TOML Collection

```toml
[output]
name = "recyclebin_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "recyclebin"
[artifacts.recyclebin]
# alt_file = "C:\\Artifacts\\$IAC12F"
```

## Collection Options

- `alt_file` Full path to alternative RecycleBin file. This configuration is
  **optional**. By default artemis will parse all RecycleBin files on the system

## Output Structure

An array of `RecycleBin` entries

```typescript
export interface RecycleBin {
  /**Size of deleted file */
  size: number;
  /**Deleted timestamp of file */
  deleted: string;
  /**Name of deleted file */
  filename: string;
  /**Full path to the deleted file */
  full_path: string;
  /**Directory associated with deleted file */
  directory: string;
  /**SID associated with the deleted file */
  sid: string;
  /**Path to the file in the Recycle Bin */
  recycle_path: string;
}
```
