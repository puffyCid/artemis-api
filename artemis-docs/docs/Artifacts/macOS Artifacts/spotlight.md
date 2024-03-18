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

````typescript
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
  /**
   *  Properties associated with the entry
   *
   * * Example:
   * ```
   * "values": {
        "kMDItemContentTypeTree": {
            "attribute": "AttrList",
            "value": [
                "public.item",
                "dyn.ah62d4rv4ge81g75mq34gk55d",
                "public.data"
            ]
        },
        "_kMDItemFileName": {
            "attribute": "AttrString",
            "value": "arm64e-apple-ios-macabi.swiftdoc"
        },
        "kMDItemContentCreationDate_Ranking": {
            "attribute": "AttrDate",
            "value": [
                1619308800
            ]
        },
        "kMDItemPhysicalSize": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                77824
            ]
        },
        "_kMDItemDisplayNameWithExtensions": {
            "attribute": "AttrString",
            "value": "arm64e-apple-ios-macabi.swiftdoc\u0016\u0002"
        },
        "_kMDItemTypeCode": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "_kMDItemCreationDate": {
            "attribute": "AttrDate",
            "value": [
                1619320292
            ]
        },
        "kMDItemSupportFileType": {
            "attribute": "AttrList",
            "value": [
                "MDSystemFile"
            ]
        },
        "_kMDItemFinderLabel": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "kMDItemInterestingDate_Ranking": {
            "attribute": "AttrDate",
            "value": [
                1619308800
            ]
        },
        "kMDItemKind": {
            "attribute": "AttrList",
            "value": [
                "Document\u0016\u0002",
                "المستند\u0016\u0002ar",
                "Document\u0016\u0002ca",
                "Dokument\u0016\u0002cs",
                "Dokument\u0016\u0002da",
                "Dokument\u0016\u0002de",
                "Έγγραφο\u0016\u0002el",
                "Document\u0016\u0002en",
                "Document\u0016\u0002en_AU",
                "Document\u0016\u0002en_GB",
                "Documento\u0016\u0002es",
                "Documento\u0016\u0002es_419",
                "Dokumentti\u0016\u0002fi",
                "Document\u0016\u0002fr",
                "Document\u0016\u0002fr_CA",
                "מסמך\u0016\u0002he",
                "दस्तावेज़\u0016\u0002hi",
                "Dokument\u0016\u0002hr",
                "Dokumentum\u0016\u0002hu",
                "Dokumen\u0016\u0002id",
                "Documento\u0016\u0002it",
                "書類\u0016\u0002ja",
                "문서\u0016\u0002ko",
                "Dokumen\u0016\u0002ms",
                "Document\u0016\u0002nl",
                "Dokument\u0016\u0002no",
                "dokument\u0016\u0002pl",
                "Documento\u0016\u0002pt",
                "Documento\u0016\u0002pt_PT",
                "Document\u0016\u0002ro",
                "Документ\u0016\u0002ru",
                "Dokument\u0016\u0002sk",
                "Dokument\u0016\u0002sv",
                "เอกสาร\u0016\u0002th",
                "Belge\u0016\u0002tr",
                "Документ\u0016\u0002uk",
                "Tài liệu\u0016\u0002vi",
                "文稿\u0016\u0002zh_CN",
                "文件\u0016\u0002zh_HK",
                "文件\u0016\u0002zh_TW"
            ]
        },
        "kMDItemContentCreationDate": {
            "attribute": "AttrDate",
            "value": [
                1619320292
            ]
        },
        "_kMDItemInterestingDate": {
            "attribute": "AttrDate",
            "value": [
                1619320292
            ]
        },
        "kMDItemDateAdded": {
            "attribute": "AttrDate",
            "value": [
                1642305054
            ]
        },
        "_kMDItemContentChangeDate": {
            "attribute": "AttrDate",
            "value": [
                1619320292
            ]
        },
        "kMDItemDisplayName": {
            "attribute": "AttrString",
            "value": "arm64e-apple-ios-macabi.swiftdoc\u0016\u0002"
        },
        "kMDItemContentModificationDate": {
            "attribute": "AttrDate",
            "value": [
                1619320292
            ]
        },
        "_kMDItemGroupId": {
            "attribute": "AttrVariableSizeInt",
            "value": 18
        },
        "kMDItemContentModificationDate_Ranking": {
            "attribute": "AttrDate",
            "value": [
                1619308800
            ]
        },
        "_kMDItemFinderFlags": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "kMDItemDateAdded_Ranking": {
            "attribute": "AttrDate",
            "value": [
                1642291200
            ]
        },
        "_kMDItemOwnerGroupID": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "kMDItemContentType": {
            "attribute": "AttrList",
            "value": "dyn.ah62d4rv4ge81g75mq34gk55d"
        },
        "kMDItemDocumentIdentifier": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "kMDItemLogicalSize": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                218460
            ]
        },
        "_kMDItemOwnerUserID": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "_kMDItemCreatorCode": {
            "attribute": "AttrVariableSizeIntMultiValue",
            "value": [
                0
            ]
        },
        "_kMDItemIsExtensionHidden": {
            "attribute": "AttrBool",
            "value": false
        }
    }
   * ```
   */
  values: Record<string, SpotlightProperties>;
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
````
