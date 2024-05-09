---
description: Interact with Windows Artifacts
---

# Windows

These functions can be used to pull data related to Windows artifacts.

### getAmcache() -> Amcache[] | WindowsError

Parse Amcache Registry file on the systemdrive.

### getAltAmcache(path) -> Amcache[] | WindowsError

Parse Amcache.hve Registry file from provided path.

| Param | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| path  | string | Full path to Amcache.hve file |

### getBits(carve) -> Bits | WindowsError

Parse Windows [BITS](../../Artifacts/Windows%20Artfacts/bits.md) data. Supports
carving deleted entries.

| Param | Type    | Description                           |
| ----- | ------- | ------------------------------------- |
| carve | boolean | Attempt to carve deleted BITS entries |

### getBitsPath(path, carve) -> Amcache[] | WindowsError

Parse Windows [BITS](../../Artifacts/Windows%20Artfacts/bits.md) data at
provided path. Supports carving deleted entries.

| Param | Type    | Description                           |
| ----- | ------- | ------------------------------------- |
| path  | string  | Path to Windows BITS file             |
| carve | boolean | Attempt to carve deleted BITS entries |

### getEventlogs(path) -> EventLogRecord[] | WindowsError

Parse Windows EventLog file at provided path.

| Param | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| path  | string | Path to Windows EventLog file |

### getJumplists() -> Jumplists[] | WindowsError

Get all [JumpLists](../../Artifacts/Windows%20Artfacts/jumplists.md) for all
users at default systemdrive.

### getJumplistPath(path) -> Jumplists[] | WindowsError

Parse [JumpLists](../../Artifacts/Windows%20Artfacts/jumplists.md) file at
provided path.

| Param | Type   | Description           |
| ----- | ------ | --------------------- |
| path  | string | Path to Jumplist file |

### readRawFile(path) -> Uint8Array | WindowsError

Read a file at provided path by parsing the NTFS. You can read locked files with
this function.

| Param | Type   | Description       |
| ----- | ------ | ----------------- |
| path  | string | Path to file read |

### readAdsData(path, ads_name) -> Uint8Array | WindowsError

Read an Alternative Data Stream at provided file path.

| Param    | Type   | Description       |
| -------- | ------ | ----------------- |
| path     | string | Path to file read |
| ads_name | string | ADS data to read  |

### getPe(path) -> PeInfo | WindowsError

Parse PE file at provided path.

| Param | Type   | Description     |
| ----- | ------ | --------------- |
| path  | string | Path to PE file |

### getPrefetch() -> Prefetch[] | WindowsError

Parse all Prefetch files at default systemdrive.

### getPrefetchPath(path) -> Prefetch[] | WindowsError

Parse Prefetch files at provided directory.

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| path  | string | Path to Prefetch directory |

### getRecycleBin() -> RecycleBin[] | WindowsError

Parse all RecycleBin files default systemdrive.

### getRecycleBinFile(path) -> RecycleBin[] | WindowsError

Parse RecycleBin file at provided path.

| Param | Type   | Description              |
| ----- | ------ | ------------------------ |
| path  | string | Path to RecycleBin file. |

### getRegistry(path) -> RegistryData | WindowsError

Parse Registry file at provided path.

| Param | Type   | Description            |
| ----- | ------ | ---------------------- |
| path  | string | Path to Registry file. |

### getSearch(path) -> SearchEntry[] | WindowsError

Parse Windows [Search](../../Artifacts/Windows%20Artfacts/search.md) database at
provided path.

| Param | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| path  | string | Path to Windows Search database. |

### getServices() -> Services[] | WindowsError

Parse Windows Services at default systemdrive.

### getServiceFile(path) -> Services[] | Error

Parse Windows Services (SYSTEM Registry) file at provided path.

| Param | Type   | Description                          |
| ----- | ------ | ------------------------------------ |
| path  | string | Path to Windows SYSTEM Registry file |

### getShellbags() -> Shellbags[] | WindowsError

Parse Windows Shellbags at default systemdrive.

### getAltShellbags(path) -> Shellbags[] | WindowsError

Parse Windows Shellbags from provided Registry file. Should be either NTUSER.DAT
or UsrClass.dat

| Param | Type   | Description                                         |
| ----- | ------ | --------------------------------------------------- |
| path  | string | Full path to either NTUSER.DAT or UsrClass.dat file |

### getShimcache() -> Shimcache[] | WindowsError

Parse Windows Shimcache at default systemdrive.

### getAltShimcache(path) -> Shimcache[] | WindowsError

Parse Windows Shimcache at provided SYSTEM Registry path.

| Param | Type   | Description                           |
| ----- | ------ | ------------------------------------- |
| path  | string | Full path to the SYSTEM Registry file |

### getShimdb() -> Shimdb[] | WindowsError

Parse Windows ShimDB files at default systemdrive.

### getCustomShimdb(path) -> Shimdb[] | WindowsError

Parse Windows ShimDB file at provided path.

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| path  | string | Path to Windows ShimDB file |

### getLnkFile(path) -> Shortcut | WindowsError

Parse Windows Shortcut file at provided path.

| Param | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| path  | string | Path to Windows Shortcut file |

### getSrumApplicationInfo(path) -> ApplicationInfo[] | WindowsError

Parse Application info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumApplicationTimeline(path) -> ApplicationTimeline[] | WindowsError

Parse Application Timeline info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumApplicationVfu(path) -> AppVfu[] | WindowsError

Parse Application VFU info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumEnergyInfo(path) -> EnergyInfo[] | WindowsError

Parse Energy info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumEnergyUsage(path) -> EnergyUsage[] | WindowsError

Parse Energy usage from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumNetworkInfo(path) -> NetworkInfo[] | WindowsError

Parse Network info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumNetworkConnectivity(path) -> NetworkConnectivityInfo[] | WindowsError

Parse Network connectivity info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getSrumNotifications(path) -> NotificationInfo[] | WindowsError

Parse notification info from Windows
[SRUM](../../Artifacts/Windows%20Artfacts/srum.md).

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| path  | string | Path to Windows SRUM file |

### getTasks() -> TaskData | WindowsError

Parse Windows Schedule Tasks at default systemdrive.

### getTaskFile(path) -> TaskXml | TaskJob | WindowsError

Parse Windows Schedule Task file at provided path. Supports XML and older binary
Job files.

| Param | Type   | Description                                                  |
| ----- | ------ | ------------------------------------------------------------ |
| path  | string | Path to Windows Schedule Task file. Can be either XML or Job |

### getUserassist() -> UserAssist[] | WindowsError

Parse Windows Userassist entries at default systemdrive.

### getAltUserassist(path) -> UserAssist[] | WindowsError

Parse Windows Userassist entries at path to NTUSER.DAT.

| Param | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| path  | string | Full path to NTUSER.DAT file |

### getUsersWin() -> UserInfo[] | WindowsError

Get local Windows User accounts from SAM Registry file. Uses default systemdrive
letter.

### getAltUsersWin(path) -> UserInfo[] | WindowsError

Get local Windows User accounts from provided SAM Registry path.

| Param | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| path  | string | Full path to SAM Registry file |

### getUsnjrnl() -> UsnJrnl[] | WindowsError

Parses Windows UsnJrnl data. Uses default systemdrive letter.

### getAltUsnjrnl(drive) -> UsnJrnl[] | WindowsError

Parses Windows UsnJrnl data from alternative drive letter.

| Param | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| drive | string | Drive letter to get Windows UsnJrnl |

### logons(path) -> Logons[] | WindowsError

Parse the Windows Security.evtx and try to correlate Logon and Logoff events.

| Param | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| path  | string | Path to Windows Security.evtx file |

### lookupSecurityKey(path, offset) -> SecurityKey | WindowsError

Parse Security Key data from Registry at provided Security Key offset. The
offset must be a postive number greater than 0. You can use getRegistry(path) to
pull a list of keys which contain Security Key offset data.

It is not recommended to bulk lookup Security Key info due the amount of data.
Security Keys contain information about Registry key permissions and ACLs. Its
not super useful.

| Param  | Type   | Description                   |
| ------ | ------ | ----------------------------- |
| path   | string | Path to Windows Registry file |
| offset | number | Offset to Security Key        |

### parseTable(path, tables) -> Record&lt;string, EseTable[][]&gt; | WindowsError

Parse an ESE database table at provided path. Will return a HashMap of tables.
Where there string key is the table name. Table rows are returned in double
array where each row is an array. Will bypass locked files and works dirty or
clean ESE databases.

:::warning

Larger ESE databases will consume more memory and resources

:::

Sample output for one table (SmTbleSmp) that has two rows:

```typescript
{
    "SmTblSmp": [
        [
            {
                "column_type": "Float64",
                "column_name": "SectionID",
                "column_data": "1"
            },
            {
                "column_type": "LongBinary",
                "column_name": "Name",
                "column_data": "bABzAGEAYQBuAG8AbgB5AG0AbwB1AHMAbgBhAG0AZQBsAG8AbwBrAHUAcAA="
            },
            {
                "column_type": "LongBinary",
                "column_name": "Value",
                "column_data": "MAAAAA=="
            }
        ],
        [
            {
                "column_type": "Float64",
                "column_name": "SectionID",
                "column_data": "1"
            },
            {
                "column_type": "LongBinary",
                "column_name": "Name",
                "column_data": "ZQBuAGEAYgBsAGUAZwB1AGUAcwB0AGEAYwBjAG8AdQBuAHQA"
            },
            {
                "column_type": "LongBinary",
                "column_name": "Value",
                "column_data": "MAAAAA=="
            }
        ]
    ]
}
```

| Param  | Type     | Description                  |
| ------ | -------- | ---------------------------- |
| path   | string   | Path to Windows ESE database |
| tables | string[] | One or more tables to parse  |

### getChocolateyInfo(alt_base) -> ChocolateyInfo[] | WindowsError

Return a list of installed Chocolatey packages. Will use the ChocolateyInstall
ENV value by default (C:\ProgramData\chocolatey).

An optional alternative base path can also be provided

| Param    | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| alt_base | string | Optional base path for Chocolatey |

### updateHistory(alt_path) -> UpdateHistory[] | WindowsError

Return a list of Windows Updates by parsing the Windows DataStore.edb database.
Will use the SystemRoot ENV value by default (C:\Windows).

An optional alternative path to DataStore.edb can also be provided instead.

| Param    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| alt_path | string | Optional full path to DataStore.edb |

### powershellHistory(alt_path) -> History[] | History | WindowsError

Return PowerShell history entries for all users. Uses the systemdrive by
default.

An optional alternative path to ConsoleHost_history.txt can also be provided
instead.

| Param    | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| alt_path | string | Optional full path to ConsoleHost_history.txt |

### parseMru(ntuser_path) -> Mru[] | WindowsError

Parse common Most Recently Used (MRU) locations in the Registry. Currently
parses: OpenSave, LastVisited, and RecentDocs MRU keys

| Param       | Type   | Description                  |
| ----------- | ------ | ---------------------------- |
| ntuser_path | string | Full path to NTUSER.DAT file |

### getShellItem(data) -> JsShellItem | WindowsError

Parse raw bytes that contain a ShellItem. Returns a JsShellItem that contains
ShellItem and any remaining bytes. This function can be used to parse multiple
shellitems.

| Param | Type       | Description            |
| ----- | ---------- | ---------------------- |
| data  | Uint8Array | Raw bytes of shellitem |

### userAccessLog(alt_dir) -> UserAccessLog[] | WindowsError

Parse the User Access Log (UAL) database on Windows Servers. This database
contains logon information for users on the system.\
It is **not** related to M365 UAL (Unified Audit Logging)!

By default it will parse the databases at %SYSTEMROOT%\System32\LogFiles\Sum.
However, you may provided an optional alternative path if you want.

| Param   | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| alt_dir | string | Alternative directory containing the UAL log databases |

### getWmiPersist() -> WmiPersist[] | WindowsError

Parse the WMI Repository and extract persistence information.

### getWmiPersistPath(path) -> WmiPersist[] | WindowsError

Parse the WMI Repository and extract persistence information at provided path.
The directory must contain:

- MAPPING\*.MAP
- OBJECTS.DATA
- INDEX.BTR

| Param | Type   | Description            |
| ----- | ------ | ---------------------- |
| path  | string | Path to WMI Repository |

### extractDefenderRules(alt_file, limit) -> DefinitionRule[] | WindowsError

An experimental function to attempt to extract Windows Defender Signatures.
Defender can contain thousands/millions? of signatures so this function can
potentially run for a long time.

By default it will only extract 30 signatures. You can extract all signatures by
setting the limit to 0.

By default it will attempt to extract all Defender signatures at:

- %SYSTEMDRIVE%\\ProgramData\\Microsoft\\Windows Defender\\Definition
  Updates\\\{\*\\\*.vdm

You may also provide an optional alternative path to the vmd file

| Param   | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| alt_dir | string | Alternative directory containing the UAL log databases |
