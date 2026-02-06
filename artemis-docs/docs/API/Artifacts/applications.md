---
description: Interact with Application Artifacts
---

# Applications

These functions can be used to pull data related to common third-party software.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { vscodeRecentFiles, PlatformType } from "./artemis-api/mod";

function main() {
  const results = vscodeRecentFiles(PlatformType.Linux);
  return results;
}

main();
```

### Chromium Browser class

A basic TypeScript class to extract data from the Chromium browser. You may optionally enable Unfold URL parsing (default is disabled) and provide an alternative glob to the base Chromium directory.

Chrome and Edge parsers can also be created and are derived from the Chromium class.

Sample TypeScript code:
```typescript
import { Chromium, Edge, PlatformType } from "./artemis-api/mod";

function main() {
  const enable_unfold = true;
  const client = new Chromium(PlatformType.Linux, enable_unfold);
  const edge = new Edge(PlatformType.Windows);

  const start = 0;
  const limit = 300;
  const history_data = client.history(start, limit);

  const ext = client.extensions();
  const edge_history = edge.history();
  return ext;
}

main();
```

#### history(offset, limit) -> ChromiumHistory[]

Return Chromium history for all users. Chromium history exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying history.  
You may provide a starting offset and limit when querying history.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### downloads(offset, limit) -> ChromiumDownloads[]

Return Chromium downloads for all users. Chromium downloads exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying downloads.  
You may provide a starting offset and limit when querying downloads.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### cookies(offset, limit) -> ChromiumCookies[]

Return Chromium cookies for all users. Chromium cookies exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying cookies.  
You may provide a starting offset and limit when querying cookies.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### autofill(offset, limit) -> ChromiumAutofill[]

Return Chromium autofill for all users. Chromium autofill exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying autofill.  
You may provide a starting offset and limit when querying autofill.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### logins(offset, limit) -> ChromiumLogins[]

Return Chromium logins for all users. Chromium logins exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying logins.  
You may provide a starting offset and limit when querying logins.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### dips(offset, limit) -> ChromiumDips[]

Return Chromium Detect Incidental Party State (DIPS) for all users. Chromium DIPS exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying DIPS.  
You may provide a starting offset and limit when querying DIPS.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### extensions() -> Record&lt;string, unknown&gt;[]

Return Chromium extensions for all users.

#### preferences() -> Record&lt;string, unknown&gt;[]

Return Chromium preferences for all users.

#### bookmarks() -> ChromiumBookmarks[]

Return Chromium bookmarks for all users.

#### localStorage() -> ChromiumLocalStorage[]

Return Chromium local storage data for all users.

#### sessions() -> ChromiumSession[]

Return Chromium sessions for all users.

#### retrospect(output)

A powerful function that will timeline all supported Chromium artifacts

| Param            | Type          | Description                         |
| ---------------- | ------------- | ----------------------------------- |
| output           | Output        | Output object to output all results |

Sample TypeScript code:
```typescript
import { Chrome, Edge, Format, Output, OutputType, PlatformType } from "./artemis-api/mod";
function main() {
  // Unfurls URLs. Based on [Unfurl](https://github.com/obsidianforensics/unfurl)
  const enable_unfold = true;
  const client = new Edge(PlatformType.Windows, enable_unfold);
  const out: Output = {
    name: "browsers",
    directory: "./tmp",
    format: Format.JSONL,
    compress: false,
    timeline: false,
    endpoint_id: "",
    collection_id: 0,
    output: OutputType.LOCAL
  };

  // All artifacts will be parsed and timelined to JSONL
  client.retrospect(out);

  const chrome_client = new Chrome(PlatformType.Windows, enable_unfold);
  // All artifacts will be parsed and timelined to JSONL
  chrome_client.retrospect(out);
}

main();
```

### FireFox Browser Class

A basic TypeScript class to extract data from the FireFox browser. You may optionally enable Unfold URL parsing (default is disabled) and provide an alternative glob to the base FireFox directory.

Sample TypeScript code:
```typescript
import { FireFox, PlatformType } from "./artemis-api/mod";

function main() {
  const enable_unfold = true;
  const fox = new FireFox(PlatformType.Linux, enable_unfold);

  const start = 0;
  const limit = 300;
  const history_data = fox.history(start, limit);

  const addons = fox.addons();
  return addons;
}

main();
```

#### history(offset, limit) -> FirefoxHistory[]

Return FireFox history for all users. FireFox history exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying history.  
You may provide a starting offset and limit when querying history.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### cookies(offset, limit) -> FirefoxCookies[] | ApplicationError

Return FireFox cookies for all users. FireFox cookies exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying cookies.  
You may provide a starting offset and limit when querying cookies.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### downloads(offset, limit) -> FirefoxDownloads[] | ApplicationError

Return FireFox file downloads for all users. FireFox file downloads exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying file downloads.  
You may provide a starting offset and limit when querying file downloads.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### storage(offset, limit) -> FirefoxStorage[] | ApplicationError

Return FireFox storage entries for all users. FireFox storage entries exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying storage entries.  
You may provide a starting offset and limit when querying storage entries.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### favicons(offset, limit) -> FirefoxFavicons[] | ApplicationError

Return FireFox favicons for all users. FireFox favicons exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying favicons.  
You may provide a starting offset and limit when querying favicons.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### formhistory(offset, limit) -> FirefoxFormhistory[] | ApplicationError

Return FireFox form history for all users. FireFox form history exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying form history.  
You may provide a starting offset and limit when querying form history.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### addons() -> Record&lt;string, unknown&gt;[] | ApplicationError 

Return FireFox addons for all users. FireFox addons exists as a JSON file.  

#### retrospect(output)

A powerfull function that will timeline all supported FireFox artifacts

| Param            | Type          | Description                         |
| ---------------- | ------------- | ----------------------------------- |
| output           | Output        | Output object to output all results |

### Nextcloud Client Class

A basic TypeScript class to extract data from the Nextcloud desktop client. You may optionally provide an alternative glob to the base Nextcloud client directory.

Sample TypeScript code:
```typescript
import { NextcloudClient } from "./artemis-api/mod";
import { PlatformType } from "./artemis-api/src/system/systeminfo";

function main() {
    const client = new NextcloudClient(PlatformType.Linux);

    console.log(JSON.stringify(client.activityLogs()));
}

main();

```

#### config() -> NextcloudClientConfig[]

Returns an array of Nextcloud client configs for all users. 

#### syncLogs(max_size) -> NextcloudClientSyncLog[]

Returns an array of sync log entries for the Nextcloud desktop client.  
You may provide an optional max log size. By default artemis will read all sync logs less than 15MB.  
Typically sync log(s) are ~3.6 MBs in size.

| Param     | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| max_size  | number | Max sync log file size to read |

#### activityLogs(max_size) -> NextcloudClientActivityLog[] 

Returns an array of activity log entries for the Nextcloud desktop client.  
You may provide an optional max log size. By default artemis will read all activity logs less than 18MB. The Nextcloud client will compress logs with gzip once they reach ~15.6 MBs in size. Compressed log size is typically ~1.2MB.

| Param     | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| max_size  | number | Max activity log file size to read |
 

### recentFiles(platform) -> History[] | ApplicationError

Return a list of files opened by LibreOffice for all users.

| Param    | Type         | Description          |
| -------- | ------------ | -------------------- |
| platform | PlatformType | OS platform to parse |

### fileHistory(platform, include_content, alt_glob) -> FileHistory[] | ApplicationError

Parse the local file history for VSCode. Returns list of history entries. Also
supports VSCodium. 

You may also provide an optional alternative glob path to the entries.json file.
By default artemis will parse the default locations for VSCode.

An alternative glob will override the platform type.  
You may also choose to include the content of the history files. By default this is not included.  
If you include the file content the output will be very large.

| Param           | Type         | Description                                            |
| --------------- | ------------ | ------------------------------------------------------ |
| platform        | PlatformType | OS platform to parse                                   |
| include_content | boolean      | Include content of the history files. Default is false |
| alt_glob        | string       | optional alternative glob path to entries.json         |

### getExtensions(platform, path) -> Extensions[] | ApplicationError

Get installed VSCode or VSCodium extensions. Can also provide an optional
alternative path to the extensions.json file. Otherwise will use default paths.

| Param    | Type         | Description                              |
| -------- | ------------ | ---------------------------------------- |
| platform | PlatformType | OS platform to parse                     |
| path     | string       | Optional path to an extensions.json file |

### vscodeRecentFiles(platform, path) -> RecentFiles[] | ApplicationError

Get recent files and folders opened by VScode.

| Param    | Type         | Description                             |
| -------- | ------------ | --------------------------------------- |
| platform | PlatformType | OS platform to parse                    |
| path     | string       | Optional path to a storage.json file    |

### querySqlite(path, query) -> Record&lt;string, unknown&gt;[] | ApplicationError

Execute a SQLITe query against a provided database file. Databases are opened in
read-only mode. In addition, this function will bypass locked SQLITE databases.

| Param | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| path  | string | Path to the sqlite db                  |
| query | string | Query to execute against the sqlite db |


### extractDefenderRules(platform, alt_file, limit) -> DefinitionRule[] | ApplicationError

An experimental function to attempt to extract Windows Defender Signatures.
Defender can contain thousands/millions? of signatures so this function can
potentially run for a long time.

By default it will only extract 30 signatures. You can extract all signatures by
setting the limit to 0.

By default it will attempt to extract all Defender signatures at:

- %SYSTEMDRIVE%\\ProgramData\\Microsoft\\Windows Defender\\Definition
  Updates\\\{\*\\\*.vdm
- /Library/Application Support/Microsoft/Defender/definitions.noindex/\*/\*.vdm

You may also provide an optional alternative path to the vmd file

| Param    | Type         | Description                                            |
| -------- | ------------ | ------------------------------------------------------ |
| platform | PlatformType | OS platform to extract rules from                      |
| alt_dir  | string       | Alternative directory containing the UAL log databases |
| limit    | number       | Number of rules to return. Default is 30               |

### officeMruFiles(platform, alt_file) -> OfficeRecentFilesMacos[] | OfficeRecentFilesWindows[] | ApplicationError

Extract Microsoft Office MRU entries. Supports both macOS and Windows. By
default will parse MRU entries for all users.\
You may also provide an optional alternative path to the MRU plist or NTUSER.DAT
file.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| alt_file | string       | Optional path to a MRU plist or NTUSER.DAT                |

### OneDrive Class

A basic TypeScript class to extract OneDrive forensic artifacts. Supports both macOS and Windows.  
By default artemis will parse OneDrive artifacts for **all** users. You may provide a single user as an optional argument to only parse data for a specific user.

You may also provide an optional alternative path to a folder containing
OneDrive artifacts. You must include the trailing slash. The folder should
contain the following artifacts:

- \*odl\* files
- NTUSER.DAT file or \*.OneDriveStandaloneSuite.plist
- general.keystore
- SyncEngineDatabase.db

Sample TypeScript code:
```typescript
import { Format, OneDrive, Output, OutputType, PlatformType } from "./artemis-api/mod";

function main() {
  const results = new OneDrive(PlatformType.Windows);
  const output: Output = {
    name: "local",
    directory: "tmp",
    format: Format.JSONL,
    compress: false,
    timeline: false,
    endpoint_id: "",
    collection_id: 0,
    output: OutputType.LOCAL
  };
  
  results.retrospect(output);
}

main();
```

#### oneDriveProfiles() -> OnedriveProfile[]

Returns an array of all file path atifacts associated with OneDrive users

#### oneDriveKeys(files, output, metadata_runtime) -> KeyInfo[] 

Returns an array of keys used by OneDrive. By default this function will find the keys for all users. You may provide a specific subset of files or users instead of all users.

You may also provide an optional Output object to output results to a file instead of returning an array of KeyInfo.

| Param            | Type          | Description                                                                                                                                       |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| files            | string[]      | Parse only key files from the provided array                                                                                                      |
| output           | Output        | Output object to output all results to a file instead of return an array                                                                          |
| metadata_runtime | boolean       | Specify if artemis should append runtime metadata when outputting to a file based on the Output object. Default is no metadata will be appended |

#### oneDriveAccounts(files, output, metadata_runtime) -> OneDriveAccount[] 

Returns an array of OneDrive account information. By default this function will find the accounts for all users. You may provide a specific subset of files or users instead of all users.

You may also provide an optional Output object to output results to a file instead of returning an array of OneDriveAccount.

| Param            | Type          | Description                                                                                                                                       |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| files            | string[]      | Parse only account files from the provided array                                                                                                 |
| output           | Output        | Output object to output all results to a file instead of return an array                                                                          |
| metadata_runtime | boolean       | Specify if artemis should append runtime metadata when outputting to a file based on the Output object. Default is no metadata will be appended |

#### oneDriveLogs(files, output, metadata_runtime) -> OneDriveLog[] 

Returns an array of OneDrive log information. By default this function will find the logs for all users. You may provide a specific subset of files or users instead of all users.

You may also provide an optional Output object to output results to a file instead of returning an array of OneDriveLog.

| Param            | Type          | Description                                                                                                                                       |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| files            | string[]      | Parse only log files from the provided array                                                                                                      |
| output           | Output        | Output object to output all results to a file instead of return an array                                                                          |
| metadata_runtime | boolean       | Specify if artemis should append runtime metadata when outputting to a file based on the Output object. Default is no metadata will be appended |

#### oneDriveSyncDatabase(files, output, metadata_runtime) -> OneDriveSyncEngineRecord[] 

Returns an array of OneDrive Sync database information. By default this function will find the databases for all users. You may provide a specific subset of files or users instead of all users.

You may also provide an optional Output object to output results to a file instead of returning an array of OneDriveSyncEngineRecord.

| Param            | Type          | Description                                                                                                                                       |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| files            | string[]      | Parse only database files from the provided array                                                                                                 |
| output           | Output        | Output object to output all results to a file instead of return an array                                                                          |
| metadata_runtime | boolean       | Specify if artemis should append runtime metadata when outputting to a file based on the Output object. Default is no metadata will be appended |

#### retrospect(output) 

A powerful function that will timeline all supported OneDrive artifacts

| Param            | Type          | Description                         |
| ---------------- | ------------- | ----------------------------------- |
| output           | Output        | Output object to output all results |

### LevelDb Class

A basic TypeScript class to extract data from LevelDb files. 

Sample TypeScript code:
```typescript
import { LevelDb, PlatformType, } from "./artemis-api/mod";

function main() {
    const info = new LevelDb("Path to leveldb directory", PlatformType.Linux);
    console.log(JSON.stringify(info.tables()));
}

main();
```

#### current() -> string

Returns the active manifest file for the level database

#### manifest() -> LevelManifest[] | ApplicationError

Parse the level database manifest

#### wal() -> LevelDbEntry[] | ApplicationError

Parse the level database write ahead log

#### tables() -> LevelDbEntry[] | ApplicationError

Parse the level database write ahead log

### AnyDesk Class

A basic TypeScript class to extract data from AnyDesk application. By default artemis will parse the default AnyDesk paths based on the provided PlatformType.  
You may provide an optional alternative directory that contains the AnyDesk files. The alternative directory should contain all AnyDesk related files.

Sample TypeScript code:
```typescript
import { AnyDesk, PlatformType } from "../artemis-api/mod";

function main() {
    console.log('Running AnyDesk tests....');
    const results = new AnyDesk(PlatformType.Linux);
    const hits = results.traceFiles();
    console.log(JSON.stringify(hits[0]));
}

main();
```

#### traceFiles(is_alt) -> TraceEntry[]

Log entries from trace log files.

| Param    | Type         | Description                                                                                         |
| -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| is_alt   | boolean      | Optional. Set to true if you provided an alternative directory when initializing the AnyDesk class  |

#### configs(is_alt) -> Config[]

AnyDesk config information.

| Param    | Type         | Description                                                                                         |
| -------- | ------------ | --------------------------------------------------------------------------------------------------- |
| is_alt   | boolean      | Optional. Set to true if you provided an alternative directory when initializing the AnyDesk class  |

### Syncthing Class

A basic TypeScript class to extract data from Syncthing logs. 

Sample TypeScript code:
```typescript
import { PlatformType, Syncthing } from "./artemis-api/mod";


function main() {
  const client = new Syncthing(PlatformType.Linux);
  const results = client.logs();
  console.log(JSON.stringify(results));
}

main();
```


#### logs() -> SyncthingLogs[]

Return all plaintext log entries for the Syncthing application
