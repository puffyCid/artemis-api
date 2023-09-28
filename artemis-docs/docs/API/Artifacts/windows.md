---
description: Interact with Windows Artifacts
---

# Windows

These functions can be used to pull data related to Windows artifacts.

### getAmcache() -> `Amcache[]`

Parse Amcache Registry file on the systemdrive.

### getAltAmcache(drive) -> `Amcache[]`

Parse Amcache Registry file on the provided drive letter.

| Param | Type     | Description                                                |
| ----- | -------- | ---------------------------------------------------------- |
| drive | `string` | Alternative drive letter to parse Amcache Registry file on |

### getBits(carve) -> `Bits`

Parse Windows [BITS](../../Artifacts/Windows%20Artfacts/bits.md) data. Supports
carving deleted entries.

| Param | Type      | Description                           |
| ----- | --------- | ------------------------------------- |
| carve | `boolean` | Attempt to carve deleted BITS entries |

### getBitsPath(path, carve) -> `Amcache[]`

Parse Windows [BITS](../../Artifacts/Windows%20Artfacts/bits.md) data at
provided path. Supports carving deleted entries.

| Param | Type      | Description                           |
| ----- | --------- | ------------------------------------- |
| path  | `string`  | Path to Windows BITS file             |
| carve | `boolean` | Attempt to carve deleted BITS entries |

### getEventlogs(path) -> `EventLogRecord[]`

Parse Windows EventLog file at provided path.

| Param | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| path  | `string` | Path to Windows EventLog file |

### getJumplists() -> `Jumplists[]`

Get all [JumpLists](../../Artifacts/Windows%20Artfacts/jumplists.md) for all
users at default systemdrive.

### getAltJumplists(drive) -> `Jumplists[]`

Get all [JumpLists](../../Artifacts/Windows%20Artfacts/jumplists.md) for all
users at provided drive.

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| drive | `string` | Drive letter |

### getJumplistPath(path) -> `Jumplists[]`

Parse [JumpLists](../../Artifacts/Windows%20Artfacts/jumplists.md) file at
provided path.

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| path  | `string` | Path to Jumplist file |

### readRawFile(path) -> `Uint8Array`

Read a file at provided path by parsing the NTFS. You can read locked files with
this function.

| Param | Type     | Description       |
| ----- | -------- | ----------------- |
| path  | `string` | Path to file read |

### readAdsData(path, ads_name) -> `Uint8Array`

Read an Alternative Data Stream at provided file path.

| Param    | Type     | Description       |
| -------- | -------- | ----------------- |
| path     | `string` | Path to file read |
| ads_name | `string` | ADS data to read  |

### getPe(path) -> `PeInfo | null`

Parse PE file at provided path.

| Param | Type     | Description     |
| ----- | -------- | --------------- |
| path  | `string` | Path to PE file |

### getPrefetch() -> `Prefetch[]`

Parse all Prefetch files at default systemdrive.

### getAltPrefetch(drive) -> `Prefetch[]`

Parse all Prefetch files at provided drive letter.

| Param | Type     | Description                    |
| ----- | -------- | ------------------------------ |
| drive | `string` | Drive letter to Prefetch files |

### getPrefetchPath(path) -> `Prefetch[]`

Parse Prefetch files at provided directory.

| Param | Type     | Description                |
| ----- | -------- | -------------------------- |
| path  | `string` | Path to Prefetch directory |

### getRecycleBin(drive) -> `RecycleBin[]`

Parse all RecycleBin files at provided drive (optional).

| Param | Type     | Description                                               |
| ----- | -------- | --------------------------------------------------------- |
| drive | `string` | Drive letter to RecycleBin files. Default is systemdrive. |

### getRecycleBinFile(path) -> `RecycleBin[]`

Parse RecycleBin file at provided path.

| Param | Type     | Description              |
| ----- | -------- | ------------------------ |
| path  | `string` | Path to RecycleBin file. |

### getRegistry(path) -> `Registry[]`

Parse Registry file at provided path.

| Param | Type     | Description            |
| ----- | -------- | ---------------------- |
| path  | `string` | Path to Registry file. |

### getSearch(path) -> `SearchEntry[]`

Parse Windows [Search](../../Artifacts/Windows%20Artfacts/search.md) database at
provided path.

| Param | Type     | Description                      |
| ----- | -------- | -------------------------------- |
| path  | `string` | Path to Windows Search database. |

### getServices() -> `Services[] | Error`

Parse Windows Services at default systemdrive.

### getAltServices(drive) -> `Services[] | Error`

Parse Windows Services at provided drive letter.

| Param | Type     | Description                          |
| ----- | -------- | ------------------------------------ |
| drive | `string` | Drive letter to get Windows Services |

### getServiceFile(path) -> `Services[] | Error`

Parse Windows Services (SYSTEM Registry) file at provided path.

| Param | Type     | Description                          |
| ----- | -------- | ------------------------------------ |
| path  | `string` | Path to Windows SYSTEM Registry file |

### getShellbags() -> `Shellbags[]`

Parse Windows Shellbags at default systemdrive.

### getAltShellbags(drive) -> `Shellbags[]`

Parse Windows Shellbags at provided drive letter.

| Param | Type     | Description                           |
| ----- | -------- | ------------------------------------- |
| drive | `string` | Drive letter to get Windows Shellbags |

### getShimcache() -> `Shimcache[]`

Parse Windows Shimcache at default systemdrive.

### getAltShimcache(drive) -> `Shimcache[]`

Parse Windows Shimcache at provided drive letter.

| Param | Type     | Description                           |
| ----- | -------- | ------------------------------------- |
| drive | `string` | Drive letter to get Windows Shimcache |

### getShimdb() -> `Shimdb[]`

Parse Windows ShimDB files at default systemdrive.

### getAltShimdb(drive) -> `Shimdb[]`

Parse Windows ShimDB files at provided drive letter.

| Param | Type     | Description                        |
| ----- | -------- | ---------------------------------- |
| drive | `string` | Drive letter to get Windows ShimDB |

### getCustomShimdb(path) -> `Shimdb[]`

Parse Windows ShimDB file at provided path.

| Param | Type     | Description                 |
| ----- | -------- | --------------------------- |
| path  | `string` | Path to Windows ShimDB file |

### getLnkFile(path) -> `Shortcut`

Parse Windows Shortcut file at provided path.

| Param | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| path  | `string` | Path to Windows Shortcut file |

### getSrumApplicationInfo(path) -> `ApplicationInfo[]`

Parse Application info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumApplicationTimeline(path) -> `ApplicationTimeline[]`

Parse Application Timeline info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumApplicationVfu(path) -> `AppVfu[]`

Parse Application VFU info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumEnergyInfo(path) -> `EnergyInfo[]`

Parse Energy info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumEnergyUsage(path) -> `EnergyUsage[]`

Parse Energy usage from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumNetworkInfo(path) -> `NetworkInfo[]`

Parse Network info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumNetworkConnectivity(path) -> `NetworkConnectivityInfo[]`

Parse Network connectivity info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getSrumNotifications(path) -> `NotificationInfo[]`

Parse notification info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to Windows SRUM file |

### getTasks() -> `TaskData | Error`

Parse Windows Schedule Tasks at default systemdrive.

### getAltTasks(drive) -> `TaskData | Error`

Parse Windows Schedule Tasks at provided drive letter.

| Param | Type     | Description                                |
| ----- | -------- | ------------------------------------------ |
| drive | `string` | Drive letter to get Windows Schedule Tasks |

### getTaskFile(path) -> `TaskXml | TaskJob | Error`

Parse Windows Schedule Task file at provided path. Supports XML and older binary
Job files.

| Param | Type     | Description                                                  |
| ----- | -------- | ------------------------------------------------------------ |
| path  | `string` | Path to Windows Schedule Task file. Can be either XML or Job |

### getUserassist() -> `UserAssist[]`

Parse Windows Userassist entries at default systemdrive.

### getAltUserassist(drive) -> `UserAssist[]`

Parse Windows Userassist entries at provided drive letter.

| Param | Type     | Description                            |
| ----- | -------- | -------------------------------------- |
| drive | `string` | Drive letter to get Windows Userassist |

### getUsersWin() -> `UserInfo[]`

Get local Windows User accounts from SAM Registry file. Uses default systemdrive
letter.

### getAltUsersWin(drive) -> `UserInfo[]`

Get local Windows User accounts from SAM Registry file from alternative drive
letter.

| Param | Type     | Description                       |
| ----- | -------- | --------------------------------- |
| drive | `string` | Drive letter to get Windows Users |

### getUsnjrnl() -> `UsnJrnl[]`

Parses Windows UsnJrnl data. Uses default systemdrive letter.

### getAltUsnjrnl(drive) -> `UsnJrnl[]`

Parses Windows UsnJrnl data from alternative drive letter.

| Param | Type     | Description                         |
| ----- | -------- | ----------------------------------- |
| drive | `string` | Drive letter to get Windows UsnJrnl |
