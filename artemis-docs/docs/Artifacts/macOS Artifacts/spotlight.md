---
description: The macOS Spotlight database
keywords:
  - macOS
  - file meta
  - binary
---

# Spotlight

macOS `Spotlight` is an indexing service for tracking files and content. The
`Spotlight` database can contain a huge amount of metadata associated with the
indexed content such as:

- Timestamps
- Partial file content
- File type and much more

The primary database is typically located at the root of the macOS Data volume.\
ex: /System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/

By default artemis will only attempt to parse the Spotlight database located at
the Data volume

However, additional databases can also be found on the macOS system. Known
additional locations are:

- /Users/\*/Library/Caches/com.apple.helpd/index.spotlightV\*/*
- /Users/\*/Library/Metadata/CoreSpotlight/index.spotlightV\*/*
- /Users/\*/Library/Developer/Xcode/DocumentationCache/\*/\*/DeveloperDocumentation.index/*
- /Users/\*/Library/Metadata/CoreSpotlight/\*/index.spotlightV\*/*
- /Users/\*/Library/Caches/com.apple.helpd/\*/index.spotlightV\*/*

Similar to the filelisting artifact, every 10k entries artemis will output the
data and continue.

Other Parsers:

- [spotlight_parser](https://github.com/ydkhatri/spotlight_parser)
- [mac_apt](https://github.com/ydkhatri/mac_apt)

References:

- [Forensic and Security](https://forensicsandsecurity.com/papers/SpotlightMacForensicsSlides.pdf)
- [Spotlight](https://en.wikipedia.org/wiki/Spotlight_(Apple))
- [libyal](https://github.com/libyal/dtformats/blob/main/documentation/Apple%20Spotlight%20store%20database%20file%20format.asciidoc)

# TOML Collection

```toml
system = "macos"

[output]
name = "spotlight_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "spotlight"
[artifacts.spotlight]
# Optional
# alt_path = ""

# Include additional known Spotlight paths such as
#     /Users/*/Library/Caches/com.apple.helpd/index.spotlightV*/*
#     /Users/*/Library/Metadata/CoreSpotlight/index.spotlightV*/*
#     /Users/*/Library/Developer/Xcode/DocumentationCache/*/*/DeveloperDocumentation.index/*
#     /Users/*/Library/Metadata/CoreSpotlight/*/index.spotlightV*/*
#     /Users/*/Library/Caches/com.apple.helpd/*/index.spotlightV*/*
# This is optional. Default is false
include_additional = true
```

# Collection Options

- `alt_path` Alternative path to a Spotlight database. This configuration is
  **optional**
- `include_additional` Artemis will parse additional known Spotlight database
  locations. This configuration is **optional**

# Output Structure

An array of `Spotlight` entries

```typescript
export interface Spotlight {
  /**Inode number associated with indexed file */
  inode: bigint;
  /**Parent inode associated with indexed file */
  parent_inode: bigint;
  /**Flags associated with indexed entry */
  flags: number;
  /**Store ID associated with indexed entry */
  store_id: number;
  /**Last time Spotlight entry was updated in UNIXEPOCH **microseconds** */
  last_updated: bigint;
  /**Array of properties associated with the entry */
  values: Record<string, SpotlightProperties>[];
  /**Location of the Spotlight database that was parsed */
  directory: string;
}

/**
 * Properties associated with the indexed entry
 */
interface SpotlightProperties {
  /**
   * Attribute type associated with the entry.
   * Possible options are:
   * - AttrBool
   * - AttrUnknown
   * - AttrVariableSizeInt
   * - AttrUnknown2
   * - AttrUnknown3
   * - AttrUnknown4
   * - AttrVariableSizeInt2
   * - AttrVariableSizeIntMultiValue
   * - AttrByte
   * - AttrFloat32
   * - AttrFloat64
   * - AttrString
   * - AttrDate (typically will be number of seconds in UNIXEPOCH)
   * - AttrBinary
   * - AttrList
   * - Unknown
   */
  attribute: DataAttribute;
  /**
   * Data associated with the property. Type can be determined based on the attribute.
   * **Important** `value` may also be an array containting data associated with the `attribute`
   */
  value: unknown;
}
```
