---
description: Tracks file changes
keywords:
  - windows
  - file meta
---

# UsnJrnl

Windows `UsnJrnl` is a sparse binary file that tracks changes to files and
directories. Located at the alternative data stream (ADS)
`C:\$Extend\$UsnJrnl:$J`. Parsing this data can sometimes show files that have
been deleted. However, depending on the file activity on the system entries in
the `UsnJrnl` may get overwritten quickly.

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.usn/)

References:

- [UsnJrnl](https://learn.microsoft.com/en-us/windows/win32/api/winioctl/ns-winioctl-usn_record_v2?redirectedfrom=MSDN)
- [Libyal](https://github.com/libyal/libfsntfs/blob/main/documentation/New%20Technologies%20File%20System%20(NTFS).asciidoc#usn_change_journal)

## TOML Collection

```toml
[output]
name = "usnjrnl_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "usnjrnl"
[artifacts.usnjrnl]
# Optional
# alt_drive = 'D'
# alt_path = ""
```

## Collection Options

- `alt_drive` Expects a single character value. Will use an alternative drive
  letter when parsing `UsnJrnl`. This configuration is **optional**. By default
  artemis will use the `%systemdrive%` value (typically `C`)
- `alt_path` Full path to $J file. This configuration is **optional**.

## Output Structure

An array of `UsnJrnl` entries

```typescript
export interface UsnJrnl {
  /**Entry number in the MFT */
  mft_entry: number;
  /**Sequence number in the MFT */
  mft_sequence: number;
  /**Parent entry number in the MFT */
  parent_mft_entry: number;
  /**Parent sequence number in the MFT */
  parent_mft_sequence: number;
  /**ID number in the Update Sequence Number Journal (UsnJrnl) */
  update_sequence_number: number;
  /**Timestamp of of entry update */
  update_time: string;
  /**Reason for update action */
  update_reason: string;
  /**Source information of the update */
  update_source_flags: string;
  /**Security ID associated with entry */
  security_descriptor_id: number;
  /**Attributes associate with entry */
  file_attributes: string[];
  /**Name associated with entry. Can be file or directory */
  filename: string;
  /**Extension if available for filename */
  extension: string;
  /**Full path for the UsnJrnl entry. Obtained by parsing `$MFT` and referencing the `parent_mft_entry` */
  full_path: string;
}
```
