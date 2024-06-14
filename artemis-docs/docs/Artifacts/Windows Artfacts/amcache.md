---
description: Windows execution tracker
keywords:
  - windows
  - registry
---

# Amcache

Windows `Amcache` stores metadata related to execution of Windows applications.
Data is stored in the `C:\Windows\appcompat\Programs\Amcache.hve` Registry file.
This Registry file also contains other metadata such as OS, hardware, and
application info. However, the Amcache artifact will only collect data related
to the possible execution of Windows applications.

<sup>*</sup> While an entry in Amcache often implies the application was
executed, Windows may pre-populate Amcache with entries based on a user browsing
to a directory that contains an application.

You can use the [Registry](./registry.md) artifact to parse the Amcache file if
you want to view other metadata such as OS, hardware, more.

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.detection.amcache/)
- [AmcacheParser](https://ericzimmerman.github.io/#!index.md)

References:

- [Libyal](https://github.com/libyal/dtformats/blob/main/documentation/AMCache%20file%20(AMCache.hve)%20format.asciidoc)
- [ANSSI](https://www.ssi.gouv.fr/uploads/2019/01/anssi-coriin_2019-analysis_amcache.pdf)

# TOML Collection

```toml
system = "windows"

[output]
name = "amcache_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "amcache"
[artifacts.amcache]
# Optional
# alt_file = 'D:\\data\\Amcache.hve'
```

# Collection Options

- `alt_file` Full path to an alternative Amcache.hve file. This configuration is
  **optional**. By default artemis will parse the default Amcache.hve on the
  system

# Output Structure

An array of `Amcache` entries

```typescript
export interface Amcache {
  /**Last modified time for Registry key */
  last_modified: string;
  /**Path to application */
  path: string;
  /**Name of application */
  name: string;
  /**Original name of application from PE metadata */
  original_name: string;
  /**Version of application from PE metadata */
  version: string;
  /**Executable type and arch information */
  binary_type: string;
  /**Application product version from PE metadata */
  product_version: string;
  /**Application product name from PE metadata */
  product_name: string;
  /**Application language */
  language: string;
  /**Application file ID. This is also the SHA1 hash */
  file_id: string;
  /**Application linking timestamp as MM/DD/YYYY HH:mm:ss*/
  link_date: string;
  /**Hash of application path */
  path_hash: string;
  /**Program ID associated with the application */
  program_id: string;
  /**Size of application */
  size: string;
  /**Application publisher from PE metadata */
  publisher: string;
  /**Application Update Seqeuence Number (USN) */
  usn: string;
  /**SHA1 hash of the first ~31MBs of the application */
  sha1: string;
  /**Path in the Amcache.hve file */
  reg_path: string;
}
```
