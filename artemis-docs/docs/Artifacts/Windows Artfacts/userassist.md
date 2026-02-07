---
description: Tracks applications executed in Windows Explorer
keywords:
  - windows
  - registry
---

# UserAssist

Windows UserAssist is a Registry artifact that records applications executed
via Windows Explorer. These entries are typically ROT13 encoded (though this can
be disabled).

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.registry.userassist/)

References:

- [Libyal](https://winreg-kb.readthedocs.io/en/latest/sources/explorer-keys/User-assist.html)

## TOML Collection

```toml
[output]
name = "userassist_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "userassist"
[artifacts.userassist]
# Optional
# alt_file = "C:\\Artifacts\\NTUSER.DAT
# resolve_descriptions = true
```

## Collection Options

- `alt_file` Full path to alternative NTUSER.DAT Registry file. This
  configuration is **optional**. By default artemis will parse UserAssist for
  all users
- `resolve_descriptions` Enable folder description GUID lookups. Artemis will
  attempt to parse the SYSTEM hive to lookup folder descriptions. This
  configuration is **optional**. Default is **false**.

## Output Structure

An array of `UserAssist` entries

```typescript
export interface UserAssist {
  /**Path of executed application */
  path: string;
  /**Last execution time of application */
  last_execution: string;
  /**Number of times executed */
  count: number;
  /**Registry path to UserAssist entry */
  reg_path: string;
  /**ROT13 encoded path */
  rot_path: string;
  /**Path of executed application with folder description GUIDs resolved */
  folder_path: string;
}
```
