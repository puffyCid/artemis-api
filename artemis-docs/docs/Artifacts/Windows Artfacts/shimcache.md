---
description: Tracks execution* of applications
keywords:
  - windows
  - registry
---

# Shimcache

Windows `Shimcache` (also called: AppCompatCache, Application Compatability
Cache, or AppCompat) are Registry entries that may<sup>*</sup> indicate
application execution. These entries are only written when the system is
shutdown or restarted.

<sup>*</sup> While an entry in Shimcache often implies the application was
executed, Windows may pre-populate Shimcache with entries based on a user
browsing to a directory that contains an application.

Other parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.registry.appcompatcache/)

References:

- [Shimcache](https://www.mandiant.com/resources/blog/caching-out-the-val)
- [Libyal](https://github.com/libyal/winreg-kb/blob/main/docs/sources/system-keys/Application-compatibility-cache.md)

## TOML Collection

```toml
[output]
name = "shimcache_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "shimcache"
[artifacts.shimcache]
# Optional
# alt_file = "C:\\Artifacts\\SYSTEM"
```

## Collection Options

- `alt_file` Full path to alternative SYSTEM Registry file. This configuration
  is **optional**. By default artemis will parse the SYSTEM Registry file at the
  default location.

## Output Structure

An array of `Shimcache` entries

```typescript
export interface Shimcache {
  /**Entry number for shimcache. Entry zero (0) is most recent execution */
  entry: number;
  /**Full path to application file */
  path: string;
  /**Standard Information Modified timestamp */
  last_modified: string;
  /**Full path to the Registry key */
  key_path: string;
  /**Path to the Registry file */
  source_path: string;
}
```
