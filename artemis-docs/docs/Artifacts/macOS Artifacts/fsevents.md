---
description: macOS file change tracker
keywords:
  - macos
  - file metadata
  - binary
---

# Fsevents

macOS Filesystem Events (`FsEvents`) track changes to files on a macOS system
(similar to `UsnJrnl` on Windows). Parsing this data can sometimes show files
that have been deleted. Resides at `/System/Volumes/Data/.fseventsd/` or
`/.fseventsd` on older systems. artemis will try to parse both locations by
default.

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/macos.forensics.fsevents/)

References:

- [Libyal](https://github.com/libyal/dtformats/blob/main/documentation/MacOS%20File%20System%20Events%20Disk%20Log%20Stream%20format.asciidoc)

# TOML Collection

```toml
system = "macos"

[output]
name = "fsevents_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "fseventsd"
[artifacts.fseventsd]
# Optional
# alt_file = ""
```

# Collection Options

- `alt_file` Use an alternative FsEvent file. This configuration is
  **optional**. By default artemis will read the default locations for FsEvent
  files

# Output Structure

An array of `Fsevents` entries

```typescript
export interface Fsevents {
  /**Flags associated with FsEvent record */
  flags: string[];
  /**Full path to file associated with FsEvent record */
  path: string;
  /**Node ID associated with FsEvent record */
  node: number;
  /**Event ID associated with FsEvent record */
  event_id: number;
  /**Path to the FsEvent file */
  source: string;
  /**Created timestamp of the FsEvent source */
  source_created: string;
  /**Modified timestamp of the FsEvent source */
  source_modified: string;
  /**Changed timestamp of the FsEvent source */
  source_changed: string;
  /**Accessed timestamp of the FsEvent source */
  source_accessed: string;
}
```
