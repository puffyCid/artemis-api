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

#### storage(offset, limit) -> FirefoxDownloads[] | ApplicationError

Return FireFox storage entries for all users. FireFox storage entries exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying storage entries.  
You may provide a starting offset and limit when querying storage entries.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### favicons(offset, limit) -> FirefoxDownloads[] | ApplicationError

Return FireFox favicons for all users. FireFox favicons exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying favicons.  
You may provide a starting offset and limit when querying favicons.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### addons() -> Record&lt;string, unknown&gt;[] | ApplicationError 

Return FireFox addons for all users. FireFox addons exists as a JSON file.  


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

### fileHistory(platform, alt_glob) -> FileHistory[] | ApplicationError

Parse the local file history for VSCode. Returns list of history entries. Also
supports VSCodium.

You may also provide an optional alternative glob path to the entries.json file.
By default artemis will parse the default locations for VSCode.

An altnerative glob will override the platform type.

| Param    | Type         | Description                                    |
| -------- | ------------ | ---------------------------------------------- |
| platform | PlatformType | OS platform to parse                           |
| alt_glob | string       | optional alternative glob path to entries.json |

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

### onedriveDetails(platform, alt_path, user) -> OneDriveDetails | ApplicationError

Extract Microsoft OneDrive artifacts. Supports both macOS and Windows. By
default will parse OneDrive artifacts for **all** users. You may provide a
single user as an optional arguement to only parse data for a specific user.

You may also provide an optional alternative path to a folder containing
OneDrive artifacts. You must include the trailing slash. The folder should
contain the following artifacts:

- \*odl\* files
- NTUSER.DAT file or \*.OneDriveStandaloneSuite.plist
- general.keystore
- SyncEngineDatabase.db

| Param    | Type         | Description                                                |
| -------- | ------------ | ---------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin)  |
| alt_path | string       | Optional path to a directory containing OneDrive artifacts |
| user     | string       | Optional single user to parse instead of all users         |

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
