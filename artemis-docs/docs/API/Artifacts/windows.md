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

### getEventlogs(path, offset, limit, include_templates, template_file) -> EventLogRecord[] |EventLogMessage[] | WindowsError

Parse Windows EventLog file at provided path. If you want to include template
strings and you are on a non-Windows platform, a `template_file` file is
required.

| Param             | Type    | Description                                                     |
| ----------------- | ------- | --------------------------------------------------------------- |
| path              | string  | Path to Windows EventLog file                                   |
| offset            | number  | How many records to skip                                        |
| limit             | number  | Max number of records to return                                 |
| include_templates | boolean | Whether to include template strings in output. Default is false |
| template_file     | string  | Path to a JSON template file                                    |

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

### getRegistry(path) -> Registry[] | WindowsError

Parse Registry file at provided path.

| Param | Type   | Description            |
| ----- | ------ | ---------------------- |
| path  | string | Path to Registry file. |

### getSearch(path, page_limit) -> SearchEntry[] | WindowsError

Parse Windows [Search](../../Artifacts/Windows%20Artfacts/search.md) database at
provided path.

You can provide an optional page_limit (default is 50). Will influence memory
usage, a higher number means higher memory usage but faster parsing.

| Param      | Type   | Description                                                |
| ---------- | ------ | ---------------------------------------------------------- |
| path       | string | Path to Windows Search database.                           |
| page_limit | number | Set the number of pages to use when parsing. Default is 50 |

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

### ESE Database Class

A basic class to help interact and extract data from ESE databases

#### catalogInfo() -> Catalog[] | WindowsError

Dump the Catalog metadata associated with an ESE database. Returns an array of
Catalog entries or WindowsError

#### tableInfo(catalog, table_name) -> TableInfo

Extract table metadata from parsed Catalog entries based on provided table name

| Param      | Type      | Description              |
| ---------- | --------- | ------------------------ |
| catalog    | Catalog[] | Array of Catalog entries |
| table_name | string    | Name of table to extract |

#### getPages(first_page) -> number[] | WindowsError

Get an array of all pages associated with a table starting at the first page
provided. First page can be found in the TableInfo object.

| Param      | Type   | Description           |
| ---------- | ------ | --------------------- |
| first_page | number | First page of a table |

#### getRows(pages, info) -> Record&lt;string, EseTable[][]&gt; | WindowsError

Get rows associated with provided TableInfo object and number of pages. A
returns a `Record<string, EseTable[][]>` or WindowsError.

The table name is the Record string key.

[EseTable](../../Artifacts/Windows%20Artfacts/ese.md) is an array of rows and
columns representing ESE data.

| Param | Type      | Description      |
| ----- | --------- | ---------------- |
| pages | number[]  | Array of pages   |
| info  | TableInfo | TableInfo object |

#### getFilteredRows(pages, info, column_name, column_data) -> Record&lt;string, EseTable[][]&gt; | WindowsError

Get rows and filter based on provided column_name and column_data. This function
can be useful if you want to get data from a table thats shares data with
another table. For example, if you call getRows() to get data associated with
TableA and now you want to get data from TableB and both tables share a unique
key.

Its _a little_ similar to "select \* from tableB where columnX = Y" where Y is a
unique key

| Param       | Type                          | Description                                                                    |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------ |
| pages       | number[]                      | Array of pages                                                                 |
| info        | TableInfo                     | TableInfo object                                                               |
| column_name | string                        | Column name that you want to filter on                                         |
| column_data | Record&lt;string, boolean&gt; | HashMap of column values to filter on. Only the key is used to filter the data |

#### dumpTableColumns(pages, info, column_names) -> Record&lt;string, EseTable[][]&gt; | WindowsError

Get rows based on specific columns names. This function is the same as getRows()
except it will only return column names that included in column_names.

| Param       | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| pages       | number[]  | Array of pages                         |
| info        | TableInfo | TableInfo object                       |
| column_name | string[]  | Array of column names to get data from |

### getChocolateyInfo(alt_base) -> ChocolateyInfo[] | WindowsError

Return a list of installed Chocolatey packages. Will use the ChocolateyInstall
ENV value by default (C:\ProgramData\chocolatey).

An optional alternative base path can also be provided

| Param    | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| alt_base | string | Optional base path for Chocolatey |

### Updates class

A simple class to help dump the contents of the Windows DataStore.edb database.
This class extends the EseDatabase class.

#### updateHistory(pages) -> UpdateHistory[] | WindowsError

Return a list of Windows Updates by parsing the Windows DataStore.edb database.

| Param | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| pages | number[] | Array of pages to get data from |

### powershellHistory(platform, alt_path) -> History[] | History | WindowsError

Return PowerShell history entries for all users. Uses the systemdrive by
default.

This artifact also supports PowerShell history on macOS or Linux
An optional alternative path to ConsoleHost_history.txt can also be provided
instead.

| Param    | Type         | Description                                            |
| -------- | ------------ | ------------------------------------------------------ |
| platform | PlatformType | Platform type to parse history for. Default is Windows |
| alt_path | string       | Optional full path to ConsoleHost_history.txt          |

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

### UserAccessLogging class

A simple class to help extract data from the Windows User Access Log database.
This class extends the EseDatabase class

#### getRoleIds(pages) -> RoleIds[] | WindowsError

Return an array of RoleIds associated with UAL database. This function expects
the UserAccessLogging class to be initialized with the SystemIdentity.mdb
database otherwise it will return no results.

| Param | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| pages | number[] | Array of pages to get data from |

#### getUserAccessLog(pages, roles_ual, role_page_chunk) -> UserAccessLog[] | WindowsError

Parse the User Access Log (UAL) database on Windows Servers. This database
contains logon information for users on the system.\
It is **not** related to M365 UAL (Unified Audit Logging)!

This function expects the UserAccessLogging class to be initialized with the
Current.mdb or `{GUID}.mdb` database otherwise it will return no results.

You may provide an optional UserAccessLogging associated with SystemIdentity.mdb
to perform RoleID lookups. Otherwise this table will parse the Current.mdb or
`{GUID}.mdb` database. You may also customize the number of pages that should be
used when doing RoleID lookups, by default 30 pages will used.

| Param           | Type              | Description                                                                                                                    |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| pages           | number[]          | Array of pages to get data from                                                                                                |
| roles_ual       | UserAccessLogging | Optional UserAccessLogging object that was initialized with the file SystemIdentity.mdb. Can be used to perform RoleID lookups |
| role_page_chunk | number            | Number of pages that should be submitted when doing RoleID lookups. By default 30 page chunks will be used to do lookup        |

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

### listUsbDevices(alt_file) -> UsbDevices[] | WindowsError

Parse SYSTEM Registry to get list of USB devices that have been connected

| Param    | Type   | Description                                  |
| -------- | ------ | -------------------------------------------- |
| alt_file | string | Alternative path to the SYSTEM Registry file |

### serviceInstalls(path) -> ServiceInstalls[] | WindowsError

Parse Windows System.evtx file to extract Service Install events.

| Param | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| path  | string | Path to the System.evtx file |

### Outlook Class

A basic class to help interact and extract data from OST files.

#### rootFolder() -> FolderInfo | WindowsError

Returns the root folder in an OST file. Can be used to start walking through the
OST file

#### readFolder(folder) -> FolderInfo | WindowsError

Reads the provided folder ID. Returns the same object as `rootFolder()`
function.

| Param  | Type   | Description |
| ------ | ------ | ----------- |
| folder | number | Folder ID   |

#### readMessages(table, offset, limit) -> MessageDetails[] | WindowsError

Read messages in a folder. You can specify which message to start at with the
offset and how many the limit. Returns an array of read messages or an error.

An offset of 0 means, start with the first message. By default artemis will
return only 50 messages.

| Param  | Type      | Description                                                                |
| ------ | --------- | -------------------------------------------------------------------------- |
| table  | TableInfo | Table structure associated with the folder. Obtained by readFolder()       |
| offset | number    | First message to read. A value of 0 means read the first message           |
| limit  | number    | Optional limit to provide to the function. By default 50 messages are read |

#### readAttachment(block_id, descriptor_id) -> Attachment | WindowsError

Read and extract and attach from provided block and descriptor IDs. The IDs can
be obtained from the readMessages function. If there are no IDs in the
MessageDetails object then the message has no attachment

| Param         | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| block_id      | number | Block ID associated with attachment      |
| descriptor_id | number | Descriptor ID associated with attachment |

#### parseWordWheel(path) -> WordWheelEntry[] | WindowsError

Reads the provided glob path and parses all NTUSER.DAT files looking for
WordWheel entries.

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| path  | string | Glob to NTUSER.DAT file(s) |

#### assembleScriptblocks(path) -> Scriptblock[] | WindowsError

Parses the Windows Microsoft-Windows-PowerShell%4Operational.evtx file and reassembles PowerShell Scriptblocks.  
You may provided an optional alternative path to Microsoft-Windows-PowerShell%4Operational.evtx.

| Param | Type   | Description                                                                 |
| ----- | ------ | --------------------------------------------------------------------------- |
| path  | string | Optional alternative path to Microsoft-Windows-PowerShell%4Operational.evtx |