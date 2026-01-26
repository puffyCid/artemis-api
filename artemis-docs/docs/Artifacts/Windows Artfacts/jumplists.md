---
description: Tracks files opened by applications in Windows Taskbar
keywords:
  - windows
  - binary
---

# Jumplists

Windows `Jumplists` files track opened files via applications in the Taskbar or
Start Menu. Jumplists are actually a collection of embedded
[Shortcut](./shortcuts.md) files and therefore can show evidence of file
interaction.

There are two (2) types of Jumplist files:

- Custom - Files that are pinned to Taskbar applications
- Automatic - Files that are not pinned to Taskbar applications

Other parsers:

References:

- [Libyal](https://github.com/libyal/dtformats/blob/main/documentation/Jump%20lists%20format.asciidoc)

## TOML Collection

```toml
[output]
name = "jumplists_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "jumplists"
[artifacts.jumplists]
# Optional
# alt_file = "C:\\Artifacts\\CustomJumplist"
```

## Collection Options

- `alt_file` Full path to an alternative Jumplist file. This configuration is
  **optional**. By default artemis will parse all user Jumplist files on the
  system.

## Output Structure

An array of `Jumplists` entries

```typescript
export interface Jumplists {
  /**Path to Jumplist file */
  source: string;
  /**Jupmlist type. Custom or Automatic */
  jumplist_type: string;
  /**Application ID for Jumplist file */
  app_id: string;
  /**Metadata associated with Jumplist entry */
  jumplist_metadata: DestEntries;
  /**Shortcut information for Jumplist entry */
  lnk_info: Shortcut;
}

/**
 * Metadata associated with Jumplist entry
 */
interface DestEntries {
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  droid_volume_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  droid_file_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  birth_droid_volume_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  birth_droid_file_id: string;
  /**Hostname associated with Jumplist entry */
  hostname: string;
  /**Jumplist entry number */
  entry: number;
  /**Modified timestamp of Jumplist entry */
  modified: string;
  /**Status if Jumplist entry is pinned. `Pinned` or `NotPinned` */
  pin_status: string;
  /**Path associated with Jumplist entry */
  path: string;
}
```
