---
description: Interact with macOS Artifacts
---

# macOS

These functions can be used to pull data related to macOS artifacts.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { listApps } from "./artemis-api/mod";

function main() {
  const results = listApps();
  console.log(JSON.stringify(results));
}

main();
```

### getUsers(path) -> Users[] | MacosError

Return all local users on macOS sysem. Can provide an optional alternative path
to directory containing users. Otherwise will use default path on system
/var/db/dslocal/nodes/Default/users

| Param | Type   | Description                                  |
| ----- | ------ | -------------------------------------------- |
| path  | string | Optional alternative path to users directory |

### getGroup(path) -> Groups[] | MacosError

Return all local groups on macOS sysem. Can provide an optional alternative path
to directory containing groups. Otherwise will use default path on system
/var/db/dslocal/nodes/Default/groups

| Param | Type   | Description                                   |
| ----- | ------ | --------------------------------------------- |
| path  | string | Optional alternative path to groups directory |

### parseAlias(data) -> Alias | MacosError

Parse macOS [alias](https://en.wikipedia.org/wiki/Alias_(Mac_OS)) data. Alias
files are a legacy shortcut format. May be encountered in plist files such as
the firewall plist file.

| Param | Type       | Description     |
| ----- | ---------- | --------------- |
| data  | Uint8Array | Raw alias bytes |

### getEmond(path) -> Emond[] | MacosError

Get all [Emond](../../Artifacts/macOS%20Artifacts/emond.md) rules on macOS. FYI
Emond was removed on Ventura. Can provide an optional alternative path to
directory containing emond rules. Otherwise will parse emond config on system to
try to find rules

| Param | Type   | Description                              |
| ----- | ------ | ---------------------------------------- |
| path  | String | Optional alternative path to emond rules |

### getExecpolicy(path) -> ExecPolicy[] | MacosError

Parse the ExecPolicy sqlite database on macOS. Can provide an optional
alternative path to ExecPolicy database. Otherwise will parse default database
on system at /var/db/SystemPolicyConfiguration/ExecPolicy

| Param | Type   | Description                                      |
| ----- | ------ | ------------------------------------------------ |
| path  | String | Optional alternative path to ExecPolicy database |

### firewallStatus(alt_path) -> Firewall | MacosError

Return firewall information and status on macOS. Can provide an optional path to
com.apple.alf.plist, otherwise will use /Library/Preferences/com.apple.alf.plist

| Param    | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| alt_path | String | Alternative full path to the com.apple.alf.plist file |

### getFsevents(path) -> Fsevents[] | MacosError

Parse macOS FsEvents from provided file.

| Param | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| path  | String | Full path to the FsEvents file |

### getLaunchdDaemons() -> Launchd[] | MacosError

Return all Launch daemons on macOS

### getLaunchdAgents() -> Launchd[] | MacosError

Return all Launch agents on macOS

### getLoginitems(path) -> LoginItems[] | MacosError

Return all LoginItems on macOS. Can provide an optional alternative path to a
LoginItem file (.btm). Otherwise will parse default default locations for
LoginItems

| Param | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| path  | String | Optional alternative path to LoginItem file |

### getMacho(path) -> MachoInfo[] | MacosError

Parse a macho file and return metadata about the binary.

| Param | Type   | Description          |
| ----- | ------ | -------------------- |
| path  | string | Path to macho binary |

### getPlist(path or Uint8Array) -> Record&lt;string, unknown&gt; | Uint8Array | Record&lt;string, unknown&gt;[] | MacosError

Parse a plist file. Supports parsing a provide plist file path or the raw bytes
of plist data. Sometimes a plist file may contain another base64 encoded plist.
This function can parse the raw plist bytes.

| Param              | Type                 | Description                           |
| ------------------ | -------------------- | ------------------------------------- |
| path or Uint8Array | string or Uint8Array | Path to plist file or raw plist bytes |

### passwordPolicy(alt_path) -> PasswordPolicy[] | MacosError

Get password policies on macOS. Will parse plist file at
/var/db/dslocal/nodes/Default/config/shadowhash.plist. You may also provide an
optional alternative path to the shadowhash.plist file.

| Param    | Type   | Description                                        |
| -------- | ------ | -------------------------------------------------- |
| alt_path | String | Optional alternative path to shadowhash.plist file |

### getUnifiedLog(path, archive_path) -> UnifiedLog[] | MacosError

Parse a single UnifiedLog file (.tracev3) on macOS. Typically found at:

- /private/var/db/diagnostics/Persist
- /private/var/db/diagnostics/Signpost
- /private/var/db/diagnostics/HighVolume
- /private/var/db/diagnostics/Special

You may also specify an optional logarchive style directory containing the
Unified Log metadata (UUID directories, timesync, and dsc directory). Otherwise
artemis will parse their default locations.

| Param        | Type   | Description                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| path         | string | Path to .tracev3 file                                                         |
| archive_path | string | Optional path to a logarchive style directory containing Unified Log metadata |

### parseRequirementBlob(data) -> SingleRequirement | MacosError

Parse the Requirement Blob from raw codesigning bytes. This part of Apple's
CodeSigning framework. This data can be found in macho binaries and also plist
files.

| Param | Type       | Description                                |
| ----- | ---------- | ------------------------------------------ |
| data  | Uint8Array | Raw bytes associated with requirement blob |

### listApps() -> Applications[] | MacosError

Return a simple Application listing. Searches user installed Apps, System Apps,
default Homebrew paths:

- /usr/local/Cellar
- /opt/homebrew/Cellar

Use scanApps() if you want to scan the entire filesystem for Apps

### scanApps() -> Applications[] | MacosError

Scans the entire filesystem under /System/ and tries to parse all Applications.

Includes embedded Apps, Frameworks, and any file that ends with
%/Contents/Info.plist

Use listApps() if you a simpler Application listing

### dockTiles() -> Applications[] | MacosError

Scans the entire filesystem under /System looking for Applications that use
DockTile persistence. See https://theevilbit.github.io/beyond/beyond_0032/ for
details on Dock Tile PlugIns

Includes embedded Apps, Frameworks, and any file that ends with
%/Contents/Info.plist

### getPackages(glob_path) -> HomebrewReceipt[]

Get Homebrew packages on the system. Does **not** include Casks.\
Use getHomebrewInfo() to get all packages and Casks.

By default this function will search for all packages at:

- /opt/homebrew/Cellar
- /usr/local/Cellar

| Param     | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| glob_path | string | Optional alternative glob path to use |

### getCasks(glob_path) -> HomebrewFormula[]

Get Homebrew Casks on the system. Does **not** include packages.\
Use getHomebrewInfo() to get all packages and Casks.

By default this function will search for all packages at:

- /opt/homebrew/Caskroom
- /usr/local/Caskroom

| Param     | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| glob_path | string | Optional alternative glob path to use |

### getHomebrewInfo() -> HomebrewData

Get Homebrew packages and Casks on the system. Searches for Homebrew data at:

- /opt/homebrew
- /usr/local

### wifiNetworks() -> Wifi[]

Get list of joined Wifi networks on macOS. Requires root access.

By default it will try to parse WiFi networks at
/Library/Preferences/com.apple.wifi.known-networks.plist.

You may also provide an optional alnternative path to
com.apple.wifi.known-networks.plist.

| Param    | Type   | Description                                                           |
| -------- | ------ | --------------------------------------------------------------------- |
| alt_path | String | Optional alternative path to com.apple.wifi.known-networks.plist file |

### getSudoLogs() -> UnifiedLog[]

Parse the UnifiedLogs and extract entries related to sudo activity.

### parseBom(path) -> Bom

Parse Bill of Materials (BOM) files. BOM files are created whenever the macOS
Installer is used to install an application.\
BOM files track what files were created by the Installer. It is commonly used to
ensure files are removed when the application is uninstalled. This function will
also try to parse the plist receipt associated with the BOM file (if found in
same directory).

BOM files are located at /var/db/receipts/*.bom

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| path  | string | Path to BOM file |

### systemExtensions(alt_path) -> SystemExtension[]

Get list of macOS System Extensions. By default artemis will try to extract
installed extensions at /Library/SystemExtensions/db.plist.

However, you may also provide an optional alternative path to db.plist.

| Param    | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| alt_path | String | Optional alternative path to db.plist file |

### queryTccDb(alt_db) -> TccValues[] | MacosError

Query all TCC.db files on the system. TCC.db contains granted permissions for
applications.\
An optional path to the TCC.db can be provided. Otherwise will parse all user
and System TCC.db files.

| Param  | Type   | Description                  |
| ------ | ------ | ---------------------------- |
| alt_db | string | Optional path to TCC.db file |

### Parsing macOS Spotlight
#### setupSpotlightParser(glob_path) -> StoreMeta | MacosError

Collect and setup the required data needed to parse the macOS Spotlight
database.\
This function must be called before a user can parse the Spotlight database
using the API.

The glob_path should point to the directory containing the Spotlight database
files.\
The primary Spotlight database can be found at:
/System/Volumes/Data/.Spotlight-V100/Store-V\*/\*/\*\
Would return something like:
/System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/*

| Param     | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| glob_path | string | Glob path to a directory containing the Spotlight Database files |

#### getSpotlight(meta, store_file, offset) -> StoreMeta | MacosError

Parse the macOS Spotlight database. The database can potentially return a large
amount of data (5+GBs).\
To prevent excessive memory usage, this function will parse the database in
blocks (chunks).

It will parse **10** blocks at a time before returning the results. The
`StoreMeta` value obtaind from setupSpotlightParser, contains the **TOTAL**
amount of blocks in the Spotlight database! You must loop through the blocks and
track what block offset the parser should start at!

If you want to the parser to start at the beginning of the Spotlight database,
provide an offset of zero (0). Once the parser returns data, your next offset
will now be ten (10) because it parsed **10** blocks starting at zero (0-9).

:::info

Spotlight organizes data in "blocks". Think of blocks as containers that contain 1 or more Spotlight entries.  
Parsing 10 blocks does **not** mean you are only getting 10 entries.  

Each block will typically contain ~50 to ~300 entries!  
By getting 10 blocks you will be getting between ~500 to ~3000 entries!

:::

Finally, you must provide the full path to the Spotlight database file
(store.db). This is typically found in in the directory provided to
`setupSpotlightParser`\
(ex:
/System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/store.db)

In order to parse Spotlight data you must have **root** permissions

| Param      | Type      | Description                                           |
| ---------- | --------- | ----------------------------------------------------- |
| meta       | StoreMeta | Spotlight metadata obtained from setupSpotlightParser |
| store_file | string    | Full path to the store.db file                        |
| offset     | number    | Offset to start parsing the Spotlight database        |

An example script is below that will show all Spotlight entries that contain the string "Downloads" or ".pkg".  
```typescript
import { getSpotlight, setupSpotlightParser } from "./artemis-api/mod";
import { MacosError } from "./artemis-api/src/macos/errors";
import { glob } from "./artemis-api/src/filesystem/files";
import { FileError } from "./artemis-api/src/filesystem/errors";

function main() {
    // Glob to our primary Spotlight database
    const glob_path = "/System/Volumes/Data/.Spotlight-V100/Store-V*/*/*";
    const values = glob(glob_path);
    if (values instanceof FileError) {
        console.error(values);
        return;
    }

    let store = "";
    // We need the full path to the store.db
    for (const value of values) {
        if (value.filename == "store.db") {
            store = value.full_path;
            break;
        }
    }

    if (store === "") {
      console.error("Failed to find store.db");
      return;
    }

    // Get some initial metadata that we will need later
    const meta = setupSpotlightParser("/System/Volumes/Data/.Spotlight-V100/Store-V*/*/*");
    if (meta instanceof MacosError) {
        console.error(meta);
        return;
    }

    let offset = 0;
    // To avoid high memory usage we can only parse 10 blocks of Spotlight data at time
    // We can determine how many total blocks there are by viewing the meta results from setupSpotlightParser
    // So we loop until our offset is greater than the meta.blocks value 
    while (offset < meta.blocks.length) {
        // Parse 10 blocks
        const results = getSpotlight(meta, store, offset);
        if (results instanceof MacosError) {
            console.error(results);
            break;
        }

        offset += 10;

        console.log(`Got ${results.length} entries!`);
        for (const entry of results) {
            console.log(`Inode: ${entry.inode}`);
            const downloads = JSON.stringify(entry.values);
            if (downloads.includes("Downloads") || downloads.includes(".pkg")) {
                console.log(downloads);
            }
        }

    }

}

main();
```

Example output you may see:
```json
Inode: 21365561
{
    "_kMDItemContentModificationDateWeekday": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            3
        ]
    },
    "_kMDItemContentCreationDateWeekOfMonth": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            4
        ]
    },
    "_kMDItemContentModificationDateWeekOfYear": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            21
        ]
    },
    "_kMDItemContentModificationDateHour": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            20
        ]
    },
    "kMDItemDateAdded": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:46:33.000Z"
        ]
    },
    "_kMDItemContentModificationDateWeekOfMonth": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            4
        ]
    },
    "_kMDItemContentCreationDateDay": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            20
        ]
    },
    "_kMDItemContentCreationDateMonth": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            5
        ]
    },
    "kMDItemContentCreationDate": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:45:35.000Z"
        ]
    },
    "_kMDItemContentCreationDateWeekdayOrdinal": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            3
        ]
    },
    "_kMDItemContentModificationDateYear": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            2025
        ]
    },
    "kMDItemDocumentIdentifier": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            0
        ]
    },
    "_kMDItemContentModificationDateWeekdayOrdinal": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            3
        ]
    },
    "kMDItemInterestingDate_Ranking": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:00:00.000Z"
        ]
    },
    "_kMDItemCreationDate": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:45:35.000Z"
        ]
    },
    "_kMDItemFromImporter": {
        "attribute": "AttrBool",
        "value": true
    },
    "kMDItemKind": {
        "attribute": "AttrList",
        "value": [
            "INSTALLER_FLAT_PACKAGE\u0016\u0002",
            "INSTALLER_FLAT_PACKAGE\u0016\u0002Base",
            "حزمة المثبّت المسطحة\u0016\u0002ar",
            "Paquet simple de l’instal·lador\u0016\u0002ca",
            "Balíček instalátoru (flat)\u0016\u0002cs",
            "Flad installeringspakke\u0016\u0002da",
            "Einfaches Installationspaket\u0016\u0002de",
            "Επίπεδο πακέτο του προγράμματος εγκατάστασης\u0016\u0002el",
            "Installer flat package\u0016\u0002en",
            "Installer flat package\u0016\u0002en_AU",
            "Installer flat package\u0016\u0002en_GB",
            "Paquete plano del instalador\u0016\u0002es",
            "Paquete raso del Instalador\u0016\u0002es_419",
            "Asentajan litteä paketti\u0016\u0002fi",
            "Paquet brut du programme d’installation\u0016\u0002fr",
            "Paquet brut du programme d’installation\u0016\u0002fr_CA",
            "חבילת התקנה שטוחה\u0016\u0002he",
            "इंस्टॉलर फ़्लैट पैकेज\u0016\u0002hi",
            "Obični paket instalacijskog programa\u0016\u0002hr",
            "Telepítő lapos csomag\u0016\u0002hu",
            "Paket datar Penginstal\u0016\u0002id",
            "Pacchetto flat Installer\u0016\u0002it",
            "インストーラ・フラット・パッケージ\u0016\u0002ja",
            "설치 프로그램 플랫 패키지\u0016\u0002ko",
            "Pakej rata pemasang\u0016\u0002ms",
            "Installatieprogramma-pakket (plat)\u0016\u0002nl",
            "Installerer for flat pakke\u0016\u0002no",
            "jednorodny pakiet instalacyjny\u0016\u0002pl",
            "Pacote simples do Instalador\u0016\u0002pt",
            "Pacote simples do Instalador\u0016\u0002pt_PT",
            "Pachet plat Program de instalare\u0016\u0002ro",
            "Простой установочный пакет\u0016\u0002ru",
            "Paušálny inštalačný balík\u0016\u0002sk",
            "Enostaven paket namestitvenega programa\u0016\u0002sl",
            "Platt installationspaket\u0016\u0002sv",
            "ชุดโปรแกรมตัวติดตั้งแบบ Flat\u0016\u0002th",
            "Düz yapılı Yükleyici paketi\u0016\u0002tr",
            "Звичайний пакет Інсталятора\u0016\u0002uk",
            "Gói trình cài đặt phẳng\u0016\u0002vi",
            "安装器flat软件包\u0016\u0002zh_CN",
            "安裝程式單層套件\u0016\u0002zh_HK",
            "安裝程式單層套件\u0016\u0002zh_TW"
        ]
    },
    "_kMDItemGroupId": {
        "attribute": "AttrVariableSizeInt",
        "value": 18
    },
    "_kMDItemContentCreationDateHour": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            20
        ]
    },
    "_kMDItemOwnerGroupID": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            20
        ]
    },
    "_kMDItemTypeCode": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            0
        ]
    },
    "_kMDItemContentCreationDateYear": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            2025
        ]
    },
    "kMDItemPhysicalSize": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            25919488
        ]
    },
    "_kMDItemPrescanCandidate": {
        "attribute": "AttrBool",
        "value": true
    },
    "_kMDItemIsExtensionHidden": {
        "attribute": "AttrBool",
        "value": false
    },
    "kMDItemDisplayName": {
        "attribute": "AttrString",
        "value": "osquery-5.17.0.pkg\u0016\u0002"
    },
    "kMDItemContentModificationDate": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:45:48.000Z"
        ]
    },
    "_kMDItemDisplayNameWithExtensions": {
        "attribute": "AttrString",
        "value": "osquery-5.17.0.pkg\u0016\u0002"
    },
    "_kMDItemCreatorCode": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            0
        ]
    },
    "kMDItemContentTypeTree": {
        "attribute": "AttrList",
        "value": [
            "com.apple.installer-package-archive",
            "public.data",
            "public.item",
            "public.archive"
        ]
    },
    "_kMDItemContentChangeDate": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:45:48.000Z"
        ]
    },
    "kMDItemContentCreationDate_Ranking": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:00:00.000Z"
        ]
    },
    "_kMDItemInterestingDate": {
        "attribute": "AttrDate",
        "value": [
            "2025-05-21T00:45:48.000Z"
        ]
    },
    "_kMDItemContentModificationDateDay": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            20
        ]
    },
    "_kMDItemContentCreationDateWeekOfYear": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            21
        ]
    },
    "_kMDItemFinderFlags": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            0
        ]
    },
    "kMDItemLogicalSize": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            25005632
        ]
    },
    "_kMDItemOwnerUserID": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            501
        ]
    },
    "_kMDItemFileName": {
        "attribute": "AttrString",
        "value": "osquery-5.17.0.pkg"
    },
    "_kMDItemTextContentIndexExists": {
        "attribute": "AttrBool",
        "value": false
    },
    "kMDItemContentType": {
        "attribute": "AttrList",
        "value": "com.apple.installer-package-archive"
    },
    "_kMDItemContentCreationDateWeekday": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            3
        ]
    },
    "_kMDItemFinderLabel": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            0
        ]
    },
    "_kMDItemContentModificationDateMonth": {
        "attribute": "AttrVariableSizeIntMultiValue",
        "value": [
            5
        ]
    }
}
```


### getXprotectDefinitions(alt_path) -> XprotectEntries[] | MacosError

Grab Xprotect definitions on macOS. By default artemis will check for
Xprotect.plist files at:

- /Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/Xprotect.plist
- /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Xprotect.plist

You may also provide an optional alternative path to the Xprotect.plist file.

| Param    | Type   | Description                          |
| -------- | ------ | ------------------------------------ |
| alt_path | string | Optional path to Xprotect.plist file |

### luluRules(alt_path) -> LuluRules | MacosError

Grab LuLu rules on macOS. By default artemis will check for rule.plist file at:

- /Library/Objective-See/LuLu/rules.plist

You may also provide an optional alternative path to the rules.plist file.

| Param    | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| alt_file | string | Optional path to rules.plist file |

### munkiApplicationUsage(db) -> MunkiApplicationUsage[] | MacosError

Grab application usage tracked by Munki on macOS. By default artemis will check
for application_usage.sqlite file at:

- /Library/Managed Installs/application_usage.sqlite

You may also provide an optional alternative path to the
application_usage.sqlite file.

| Param | Type   | Description                                    |
| ----- | ------ | ---------------------------------------------- |
| db    | string | Optional path to application_usage.sqlite file |

### quarantineEvents(alt_file) -> MacosQuarantine[] | MacosError

Grab quarantine events tracked by macOS. By default artemis will check for
quarantine events for all users file at:

- /Users/*/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2

You may also provide an optional alternative path to the
com.apple.LaunchServices.QuarantineEventsV2 file.

| Param    | Type   | Description                                                       |
| -------- | ------ | ----------------------------------------------------------------- |
| alt_file | string | Optional path to com.apple.LaunchServices.QuarantineEventsV2 file |

### parseBiome(app_focus_only, alt_file) -> Biome[]

Parse a Biome files and try to extract data. By default artemis will only parse
App.InFocus files located at:

- /Users/\*/Library/Biome/streams/\*/\*/local/\*
- /Users/\*/Library/Biome/streams/\*/\*/local/tombstone/\*
- /private/var/db/biome/streams/\*/\*/local/\*
- /private/var/db/biome/streams/\*/\*/local/tombstone/\*

| Param          | Type    | Description                                       |
| -------------- | ------- | ------------------------------------------------- |
| app_focus_only | boolean | Only parse App.InFocus files. Default is **true** |
| alt_file       | string  | Optional path to an alternative Biome file        |

### gatekeeperEntries(db) -> GatekeeperEntries[] | MacosError

Grab Gatekeeper entries on macOS. By default artemis will parse the sqlite
database at:

- /var/db/SystemPolicy

You may also provide an optional alternative path to the SystemPolicy file.

| Param | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| db    | string | Optional path to SystemPolicy file |

### logonsMacos(path, archive_path) -> LogonMacos[] | MacosError

Extract Logon entries from UnifiedLog files (.tracev3) on macOS. Typically found
at:

- /private/var/db/diagnostics/Special

You may also specify an optional logarchive style directory containing the
Unified Log metadata (UUID directories, timesync, and dsc directory). Otherwise
artemis will parse their default locations.

| Param        | Type   | Description                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| path         | string | Path to .tracev3 file                                                         |
| archive_path | string | Optional path to a logarchive style directory containing Unified Log metadata |

### parseCookies(path) -> Cookie[] | MacosError

Parse binary Safri cookie at provided path.

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| path  | string | Path to binary cookie file |

### Safari Browser Class

A basic TypeScript class to extract data from the Safari browser. You may optionally enable Unfold URL parsing (default is disabled) and provide an alternative glob to the base Safari directory.

Sample TypeScript code:
```typescript
import { Safari, PlatformType } from "./artemis-api/mod";

function main() {
  const enable_unfold = true;
  const client = new Safari(PlatformType.Linux, enable_unfold);

  const start = 0;
  const limit = 300;
  const history_data = client.history(start, limit);
  console.log(JSON.stringify(history_data));
}

main();
```

#### history(offset, limit) -> SafariHistory[]

Return Safari history for all users. Safari history exists in a sqlite database.  
Artemis will bypass locked sqlite databases when querying history.  
You may provide a starting offset and limit when querying history.  
By default artemis will get the first 100 entries for all users.

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------------------- |
| offset  | number | Starting offset when querying the sqlite database |
| limit   | number | Max number of rows to return per user             |

#### downloads() -> SafariDownloads[]

Return Safari file downloads for all users. Safari file downloads exists in a plist file.  

