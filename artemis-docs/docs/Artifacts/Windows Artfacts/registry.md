---
description: Primary source of Windows configuration settings
keywords:
  - windows
  - registry
---

# Registry

Windows Registry is a collection of binary files that store Windows
configuration settings and OS information. There are multiple Registry files
on a system such as:

- `C:\Windows\System32\config\SYSTEM`
- `C:\Windows\System32\config\SOFTWARE`
- `C:\Windows\System32\config\SAM`
- `C:\Windows\System32\config\SECURITY`
- `C:\Users\%\NTUSER.DAT`
- `C:\Users\%\AppData\Local\Microsoft\Windows\UsrClass.dat`

Other Parser:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.registry.ntuser/)

References:

- [Libyal](https://github.com/libyal/libregf)
- [Registry Format](https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md)

## TOML Collection

```toml
[output]
name = "registry_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "registry" # Parses the whole Registry file
[artifacts.registry]
user_hives = true # All NTUSER.DAT and UsrClass.dat
system_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY
# Optional
# alt_file = "C:\\Artifacts\\SYSTEM"
# Optional
# path_regex = "" # Registry is converted to lowercase before all comparison operations. So any regex input will also be converted to lowercase
```

## Collection Options

- `user_hives` Parse all user Registry files NTUSER.DAT and UsrClass.dat.
  This configuration is **required**
- `system_hives` Parse all system Registry files SYSTEM, SAM, SOFTWARE,
  `SECURITY`. This configuration is **required**
- `alt_file` Full path to alternative Registry file. This configuration is
  **optional**.
- `path_regex` Only return Registry keys that match provided `path_regex`. All
  comparisons are first converted to lowercase. This configuration is
  **optional**. Default is no Regex

## Output Structure

An array of `Registry` entries for each parsed file

```typescript
/**
 * Inteface representing the parsed `Registry` structure
 */
export interface Registry {
  /**
   * Full path to `Registry` key and name.
   * Ex: ` ROOT\...\CurrentVersion\Run`
   */
  path: string;
  /**
   * Path to Key
   * Ex: ` ROOT\...\CurrentVersion`
   */
  key: string;
  /**
   * Key name
   * Ex: `Run`
   */
  name: string;
  /**
   * Values associated with key name
   * Ex: `Run => Vmware`. Where Run is the `key` name and `Vmware` is the value name
   */
  values: Value[];
  /**Timestamp of when the path was last modified */
  last_modified: number;
  /**Depth of key name */
  depth: number;
  /**Path to Registry file */
  registry_path: string;
  /**Registry file name */
  registry_file: string;
}

/**
 * The value data associated with Registry key
 * References:
 *   https://github.com/libyal/libregf
 *   https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md
 */
export interface Value {
  /**Name of Value */
  value: string;
  /**
   * Data associated with value. All types are strings by default. The real type can be determined by `data_type`.
   * `REG_BINARY` is a base64 encoded string
   */
  data: string;
  /**
   * Value type.
   * Full list of types at: https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry-value-types
   */
  data_type: string;
}
```
