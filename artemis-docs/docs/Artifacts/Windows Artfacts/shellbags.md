---
description: List of directories accessed by Windows Explorer
keywords:
  - windows
  - registry
---

# Shellbags

Windows Shellbags are Registry entries that track what directories a user
has browsed via Explorer GUI. These entries are stored in the undocumented
**ShellItem** binary format.

Artemis supports parsing the most common types of shellitems, but if you
encounter a shellitem entry that is not supported please open an issue!

Other parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.shellbags/)

References:

- [Libyal](https://github.com/libyal/libfwsi/blob/main/documentation/Windows%20Shell%20Item%20format.asciidoc)

## TOML Collection

```toml
[output]
name = "shellbags_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "shellbags"
[artifacts.shellbags]
resolve_guids = true
# Optional
# alt_file = "C:\\Artifacts\\UsrClass.dat"
```

## Collection Options

- `alt_file` Full path to alternative UsrClass.dat or NTUSER.DAT Registry file.
  This configuration is **optional**. By default artemis will parse Shellbags
  for all users.
- `resolve_guids` Boolean value whether to try to resolve GUIDs found when
  parsing Shellbags.
  - If **false**:
    `"resolve_path": "20d04fe0-3aea-1069-a2d8-08002b30309d\C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current",`
  - If **true**:
    `"resolve_path": "This PC\C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current",`

## Output Structure

An array of `Shellbag` entries

```typescript
export interface Shellbags {
  /**Reconstructed directory path */
  path: string;
  /**FAT created timestamp. Only applicable for Directory `shell_type` */
  created: number;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  modified: number;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  accessed: number;
  /**Entry number in MFT. Only applicable for Directory `shell_type` */
  mft_entry: number;
  /**Sequence number in MFT. Only applicable for Directory `shell_type` */
  mft_sequence: number;
  /**
   * Type of shellitem
   *
   * Can be:
   *   `Directory, URI, RootFolder, Network, Volume, ControlPanel, UserPropertyView, Delegate, Variable, MTP, Unknown, History`
   *
   *  Most common is typically `Directory`
   */
  shell_type: string;
  /**
   * Reconstructed directory with any GUIDs resolved
   * Ex: `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
   */
  resolve_path: string;
  /**Registry key last modified */
  reg_modified: string;
  /**User Registry file associated with `Shellbags` */
  reg_file: string;
  /**Registry key path to `Shellbags` data */
  reg_path: string;
  /**Full file path to the User Registry file */
  reg_file_path: string;
}
```
