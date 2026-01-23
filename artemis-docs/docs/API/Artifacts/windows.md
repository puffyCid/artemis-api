---
description: Interact with Windows Artifacts
---

# Windows

These functions can be used to pull data related to Windows artifacts.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { assembleScriptblocks } from "./artemis-api/mod";

function main() {
  const powershell_scriptblocks = assembleScriptblocks();
  if(powershell_scriptblocks instanceof WindowsError) {
    return;
  }

  console.log(JSON.stringify(powershell_scriptblocks));
}

main();
```

### getAmcache(path) -> Amcache[] | WindowsError

Parse Amcache Registry file on the systemdrive.  You may provide an optional alternative path to the Amcache.hve file

| Param | Type    | Description                           |
| ----- | ------- | ------------------------------------- |
| path  | string  | Optional path to an Amcache file      |

### getBits(carve, path) -> BitsInfo[] | WindowsError

Parse Windows [BITS](../../Artifacts/Windows%20Artfacts/bits.md) data. Supports
carving deleted entries.  You may also provide an optional alternative path to the BITS database file.

| Param | Type    | Description                           |
| ----- | ------- | ------------------------------------- |
| carve | boolean | Attempt to carve deleted BITS entries |
| path  | string  | Optional path to a BITS file          |


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

### getJumplists(path) -> Jumplists[] | WindowsError

Get all [JumpLists](../../Artifacts/Windows%20Artfacts/jumplists.md) for all
users at default systemdrive.  You may also provide an optional alternative path to a Jumplist file.

| Param | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| path  | string | Optional path to Jumplist file |

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

Parse all Prefetch files at default systemdrive.  You may also provide an optional alternative path to a directory containing Prefetch files.

| Param | Type   | Description.                        |
| ----- | ------ | ----------------------------------- |
| path  | string | Optional path to Prefetch directory |

### getRecycleBin() -> RecycleBin[] | WindowsError

Parse all RecycleBin files default systemdrive.

| Param | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| path  | string | Optional path to RecycleBin file |

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

Parse Windows Services at default systemdrive.  You may also provide an optional alternative path to the SYSTEM Registry file.  

| Param | Type   | Description                                   |
| ----- | ------ | --------------------------------------------- |
| path  | string | Optional path to Windows SYSTEM Registry file |


### getShellbags(resolve_guids, path) -> Shellbags[] | WindowsError

Parse Windows Shellbags at default systemdrive. You may enable GUID resolution (this feature only works on Windows). You may also provide an optional alternative path to the Shellbags Registry file.  

| Param         | Type   | Description                                             |
| ------------- | ------ | ------------------------------------------------------- |
| resolve_guids | boolean| Enable GUID resolution. Only available on Windows       |
| path          | string | Optional path to either NTUSER.DAT or UsrClass.dat file |

### getShimcache(path) -> Shimcache[] | WindowsError

Parse Windows Shimcache at default systemdrive. You may also provide an optional alternative path to the SYSTEM Registry file.


| Param | Type   | Description                               |
| ----- | ------ | ----------------------------------------- |
| path  | string | Optional path to the SYSTEM Registry file |


### getShimdb(path) -> Shimdb[] | WindowsError

Parse Windows ShimDB files at default systemdrive. You may also provide an optional path to a ShimDB file.

| Param | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| path  | string | Optional path to a Windows ShimDB file |


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

### getTasks(path) -> TaskXml | WindowsError

Parse Windows Schedule Tasks at default systemdrive. You may also provide an optional path to a Schedule Task file.

| Param | Type   | Description                                                           |
| ----- | ------ | --------------------------------------------------------------------- |
| path  | string | Path to Windows Schedule Task XML file                                |

### getUserassist(resolve, path) -> UserAssist[] | WindowsError

Parse Windows Userassist entries at default systemdrive for all users. You may enable GUID resolution lookups. You may also provide an optional path to the NTUSER.dat file.

| Param   | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| resolve | boolean | Enable GUID resolution. Only available on Windows |
| path    | string  | Full path to NTUSER.DAT file                      |

### getUsersWin(path) -> UserInfo[] | WindowsError

Get local Windows User accounts from SAM Registry file. Uses default systemdrive
letter. You may also provide an optional path to the SAM Registry file.

| Param | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| path  | string | Optional path to SAM Registry file |

### getUsnjrnl(path, drive, mft) -> UsnJrnl[] | WindowsError

Parses Windows UsnJrnl data. Uses default systemdrive letter. You may also provide optional alternative paths for:
- UsnJrnl file
- Drive letter
- MFT for path resolutions

| Param | Type   | Description                                    |
| ----- | ------ | ---------------------------------------------- |
| drive | string | Optional drive letter to get Windows UsnJrnl   |
| path  | string | Optional path to UsnJrnl file                  |
| mft   | string | Optional path to MFT file for path resolutions |

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

| Param | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| path  | string | Option path to the System.evtx file |

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

#### firwallRules(path) -> FirewallRules[] | WindowsError

Extract Windows Firewall rules from the SYSTEM Registry file. By default artemis will use the SYSTEM Registry on the SystemDrive.
You may provide an optional alternative SYSTEM file.

| Param | Type   | Description                                       |
| ----- | ------ | ------------------------------------------------- |
| path  | string | Optional alternative path to System Registry file |

#### processTreeEventLogs(path) -> EventLogProcessTree[] | WindowsError

Parses the Windows Security.evtx file and attempts to construct process trees for 4688 events.  
You may provided an optional alternative path to Security.evtx.

| Param | Type   | Description                                |
| ----- | ------ | ------------------------------------------ |
| path  | string | Optional alternative path to Security.evtx |

#### wifiNetworksWindows(path) -> Wifi[] | WindowsError

Parses the Windows SOFTWARE Registry file and attempts extract WiFi networks connected to.
You may provided an optional alternative path to the SOFTWARE Registry file.

| Param | Type   | Description                                |
| ----- | ------ | ------------------------------------------ |
| path  | string | Optional alternative path to Security.evtx |

### ADCertificates Class

A basic class to help interact and extract data from AD Certificates ESE databases.

Sample TypeScript code:
```typescript
import { ADCertificates } from "./artemis-api/mod";
import { WindowsError } from "./artemis-api/src/windows/errors";

function main() {
    // You may also provide an optional alternative path to the ESE database
    const client = new ADCertificates();
    const catalog = client.catalogInfo();
    if (catalog instanceof WindowsError) {
        return;
    }
    const first_page = client.tableInfo(catalog, "Certificates").table_page;
    const cert_pages = client.getPages(first_page);
    if (cert_pages instanceof WindowsError) {
        return;
    }
    // Depending on size of EDB file you should customize the number of pages you use
    // The larger the pages array the more memory required
    // 100 pages should be a reasonable default
    const certs = client.getCertificates(cert_pages, client.tableInfo(catalog, "Certificates"))
    console.log(JSON.stringify(certs));
}

main();
```

#### getCertificates(pages, info) -> Certificates[] | WindowsError

Get list of certificates from the database.

| Param | Type      | Description                                               |
| ----- | --------- | --------------------------------------------------------- |
| pages | number[]  | Number of pages to parse from the ESE database            |
| info  | TableInfo | Table info object that can be obtained with the ESE class |


#### getRequests(pages, info) -> Requests[] | WindowsError

Get list of requests from the database.

| Param | Type      | Description                                               |
| ----- | --------- | --------------------------------------------------------- |
| pages | number[]  | Number of pages to parse from the ESE database            |
| info  | TableInfo | Table info object that can be obtained with the ESE class |

#### requestAttributes(pages, info) -> RequestAttributes[] | WindowsError

Get list of requests attributes from the database.

| Param | Type      | Description                                               |
| ----- | --------- | --------------------------------------------------------- |
| pages | number[]  | Number of pages to parse from the ESE database            |
| info  | TableInfo | Table info object that can be obtained with the ESE class |


### getRunKeys(path) -> RegistryRunKey[]

Parse Windows Registry files and extract Run key entries. You may provide an optional path to a Registry file. By default all user NTUSER.DAT and SOFTWARE files are parsed

| Param   | Type    | Description                      |
| ------- | ------- | -------------------------------- |
| path    | string  | Optional path to a Registry file |


### rdpLogons(path) -> RegistryRunKey[]

Parse Windows RDP logons. You may provide an optional path to a Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx file. By default artemis will check the SystemDrive volume for the Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx.

Typically this will be C:\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx

| Param   | Type    | Description                                                                                    |
| ------- | ------- | ---------------------------------------------------------------------------------------------- |
| path    | string  | Optional path to Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx file |