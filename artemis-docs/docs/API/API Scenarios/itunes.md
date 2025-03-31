---
description: How to parse unencrypted iTunes backups!
---

# iTunes Backup Extraction

You can use the artemis API to parse and extract information from unencrypted
iTunes backups! Creating an iOS backup is a common way to collect data from an
iOS device for forensic analysis.

:::info

Support for iOS/iTunes is extremely new and limited. Artemis only supports a few
apps and iOS features. A list of support artifacts/apps can be found
[here](../../Artifacts/ios.md)

If you are looking for a more mature tool, checkout
[iLeapp](https://github.com/abrignoni/iLEAPP)

:::

## Creating the script

Its really easy to start reviewing iTunes backups using the API.

```typescript
import { extractBackup } from "./artemis-api/src/ios/itunes/backup";
import { Format, Output, OutputType } from "./artemis-api/src/system/output";

function main() {
    const out: Output = {
        name: "iOS_deviceName",
        directory: "./tmp",
        // JSON format is **strongly** recommended for now
        format: Format.JSON,
        compress: false,
        endpoint_id: "",
        collection_id: 0,
        output: OutputType.LOCAL,
    };
    const result = extractBackup(
        "./iTunesBackup/00008112-000429AE0C07401E",
        out,
    );
}

main();
```

The script above will read the iTunes backup directory and parse all supported
apps and backup artifacts in the backup collection.

:::info

Do not forget to transpile the script above to JavaScript as mentioned in
[API](../../Intro/Scripting/bundling.md) section!

**Strongly** suggest you `minify` the transpiled script.\
It will make it alot smaller!

:::

## Script Output

The way artemis outputs data is unique for the iTunes API. Normally, artemis
will output all data to single folder provided in the `Output` object.

However, since artemis is parsing multiple apps and other artifacts, parsed data
will placed in its own sub-directory.

If you run the script above the output structure will look like the following:

- Root folder - **./tmp**
- Subfolders:
  - ./tmp/iOS_deviceName: Contains metadata associated with iTunes backup
  - ./tmp/apps/iOS_deviceName_app_or_artifact_name. Ex:
    `iOS_deviceName_com.zhiliaoapp.musically`

Each subfolder will contain you JSON output

## Adding new apps or artifacts

Adding support for new apps or artifacts is not too challenging :)

1. Make sure you have the tool prerequisites installed (Ex: TypeScript text editor)
2. Clone the artemis-api repo (https://github.com/puffyCid/artemis-api.git)
3. To add support for a new app, create a folder under
   `./src/ios/apps/<app name>`\
   To add support for a new artifact, create a folder under
   `./src/ios/domains/<artifact domain name>`

## App or artifact code structure

Once you have identified an app you want to parse you will need to write some
TypeScript code in order to plug it in to the artemis API.

Lets say we want to add support for the DuckDuckGo browser app. We would create
a typescript (ts) file under `./src/ios/apps/duckduckgo/duck.ts`.

:::note

You can name you folder and ts file anything you want

:::

In our new file we would add the following code

```typescript
import {
    FileType,
    ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { Output, outputResults } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";

/**
 * Function to extract DuckDuckGo browser info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractDuckDuckGo(
    app_paths: ManifestApp[],
    db_path: string,
    output: Output,
) {
    for (const path of app_paths) {
        if (path.file_type != FileType.IsFile) {
            continue;
        }
        // Function to parse the binary plist in the Manifest.db file. Contains FileMetadata
        const info = parseManifestAppPlist(path.file);
        if (info instanceof IosError) {
            continue;
        }

        const target = `${db_path}/${path.directory}/${path.fileID}`;
        console.log(info.path);
        console.log(target);
    }
}
```

The code above registers a function called `extractDuckDuckGo` and pass several
parameters to the function. We will review the parameters later, but you do not
need to know how to obtain them.

Afte register our function, we start to loop through our array of app_paths.
These paths are the directories associated withe our app. Each directory should
have an associated binary plist that we need to parse using
`parseManifestAppPlist`.

:::note

We only want to parse files! So we skip non-file related entries such as
directories

:::

:::info

iTunes backup files and directories names are hashed! In order to determine the
original name we need to call `parseManifestAppPlist`!

:::

Next we specify the target iTunes backup file:
``const target = `${db_path}/${path.directory}/${path.fileID}`;``

Then we print the target file (path of hashed names and directories) and the
un-hashed names

If you transpile and run the code above you should see something like below:

```
[runtime]: "Library/Preferences/com.duckduckgo.blocker-list.etags.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/7e/7e65b6f36849e8431a36186ddf98019af8487f1d"
[runtime]: "Library/Preferences/com.apple.EmojiCache.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/96/962a40518bc47a929fa53a208b2250e4937add6a"
[runtime]: "Library/Preferences/com.duckduckgo.app.adClickAttribution.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/0a/0a54b7c56e482059cfb55968b1305a15e948453a"
[runtime]: "Library/WebKit/WebsiteData/Default/QkkulCe8Q-EdXJ986IlKrwKGIychU0X2UP4JUpfNScs/QkkulCe8Q-EdXJ986IlKrwKGIychU0X2UP4JUpfNScs/origin"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/cd/cd330b4833dbc9f7630c774f45ea1ec746eaec01"
[runtime]: "Library/WebKit/WebsiteData/Default/salt"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/05/05fd1262114b7103c4a5fbb1b6e08e52d40d546f"
[runtime]: "Library/WebKit/GeolocationSites.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/88/8888b54a27c0f79e99567e6329b95378f8901a0c"
[runtime]: "Library/WebKit/WebsiteData/SearchHistory/RecentSearches.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/c7/c77e5f0c616494ccfee9c7fa381646c54bfb13b8"
[runtime]: "Library/WebKit/ContentRuleLists/ContentRuleList-blockImageRules"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/a0/a08cfdf4b2d3cdce9fbf6bc7afbcf7565b65492a"
[runtime]: "Library/Preferences/group.com.duckduckgo.app.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/d9/d956029361b6990e109d1d8cc47c8b0780fa0758"
[runtime]: "Library/Application Support/.tipkit/tips-store.db"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/2b/2bb3cd6079dac3dc4fbd757e1a9730458056f6a3"
[runtime]: "Library/WebKit/ContentRuleLists/ContentRuleList-%22TrackerDataSet%22%22A_%2275cff4e36f76d9a81af0643d775008c9%22%22cbc7891482cdc5656356758fbf4df7d672ce2933%22%2265d5e346d5f4b32b8b5f813d753c8718%22%22%22"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/27/272f7a61c6b687508c7a9c30f91cc955a1d418cd"
[runtime]: "Library/Preferences/HKE973VLUW.com.duckduckgo.subscriptions.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/34/346893e9861467096e4bd75a103ec913e000a9c8"
[runtime]: "Library/Application Support/atb-present.marker"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/95/95d9c13c5075b50fe82e77a63dc33a49edd9698d"
[runtime]: "Library/WebKit/WebsiteData/Default/QkkulCe8Q-EdXJ986IlKrwKGIychU0X2UP4JUpfNScs/QkkulCe8Q-EdXJ986IlKrwKGIychU0X2UP4JUpfNScs/CacheStorage/salt"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/28/284d57dd57fbb5b2ba47df75061d54b029d349cd"
[runtime]: "Library/Preferences/com.duckduckgo.mobile.ios.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/f8/f881608e2754551e1695a1bab51b8b11c8b5a3bc"
[runtime]: "Library/Preferences/com.duckduckgo.unique.pixel.storage.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/7e/7ee08df288b84e89aba7e642620731b032be42d5"
[runtime]: "Library/Preferences/com.duckduckgo.pixel.storage.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/68/68a54dda6529c4364087fa47776d8bf312cb6a71"
[runtime]: "Library/WebKit/ContentRuleLists/ContentRuleList-%22Attribution_TrackerDataSet%22%22A_%2275cff4e36f76d9a81af0643d775008c9%22%22cbc7891482cdc5656356758fbf4df7d672ce2933%22%2265d5e346d5f4b32b8b5f813d753c8718%22%22%22"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/b6/b641cda8a7bb7d542d604e2441ca05b0a7b3cad9"
[runtime]: "Library/WebKit/WebsiteData/ResourceLoadStatistics/observations.db"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/0e/0eeba21e901d1c692c861fa478d3b9021352f5be"
[runtime]: "Library/Application Support/ad-attribution-successful.marker"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/3c/3c73a053786b0cfbddb873791a5af1ff575686a8"
[runtime]: "Library/Preferences/com.duckduckgo.daily.pixel.storage.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/0e/0e7c2c955a0e18fe284fa6a96787d9db7e2257d7"
[runtime]: "Library/Cookies/Cookies.binarycookies"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/1c/1c2937886859a739a9746411d9a25d3907de4ac1"
[runtime]: "Library/Application Support/History.sqlite"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/2a/2a984202263e5aedd67a20d6233f115783cddd65"
[runtime]: "Library/Preferences/com.duckduckgo.app.toggleProtectionsCounter.plist"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/f1/f1b0e539a2f0d8a3897fe0331882bc07f3ef82ed"
[runtime]: "Library/WebKit/WebsiteData/MediaKeys/v1/salt"
[runtime]: "./itunesBackupDirectory/00008112-000429AE0C07401E/ca/caa12f6b21d5beb6938d79a9ea8d4b2b503d0223"
```

## Research!

Now is the challenging part! We need to research what file we may want to parse!
The most common types of files you will encouter are JSON, plist, and sqlite
databases.

Lets look at the `GeolocationSites.plist` file. It looks interesting. Since its
a plist file we will need to import the plist parsing function to our code

```typescript
for (const path of app_paths) {
    if (path.file_type != FileType.IsFile) {
        continue;
    }
    // Function to parse the binary plist in the Manifest.db file. Contains FileMetadata
    const info = parseManifestAppPlist(path.file);
    if (info instanceof IosError) {
        continue;
    }

    const target = `${db_path}/${path.directory}/${path.fileID}`;
    if (info.path.includes("GeolocationSites.plist")) {
        // Make sure to provide the target variable! This the full path the to iTunes backup hashed filename
        const result = getPlist(target);
        outputResults(JSON.stringify(result), "duckduckgo_geosites", output);
    }
    console.log(info.path);
    console.log(target);
}
```

The additional code we added will parse the `GeolocationSites.plist` file and
output the results to a JSON file!

We would repeat this process for each file we are interested for the DuckDuckGo
app.

## Conclusion

The final step is to make artemis aware of the `extractDuckDuckGo` function.\
Navigate to the file `./src/ios/itunes/apps.ts` and to `extractAppInfo`.

You should see something like below:

```typescript
/**
 * Function to parse supported apps and domains
 * @param paths Array of `ManifestApp`
 * @param namespace App or domain name
 * @param db_path iTunes backup directory
 * @param output `Output` object
 */
export function extractAppInfo(
    paths: ManifestApp[],
    namespace: string,
    db_path: string,
    output: Output,
) {
    switch (namespace) {
        case "com.amazon.echo":
            extractAmazonEcho(paths, db_path, output);
            break;
        case "us.zoom.videomeetings":
            extractZoom(paths, db_path, output);
            break;
        case "co.hinge.mobile.ios":
            extractHingeInfo(paths, db_path, output);
            break;
        case "HomeDomain":
            extractHomeDomain(paths, db_path, output);
            break;
        case "RootDomain":
            extractRootDomain(paths, db_path, output);
            break;
    }
}
```

We just need to insert domain name for the DuckDuckGo app and add our function!

```typescript
switch (namespace) {
    case "com.amazon.echo":
        extractAmazonEcho(paths, db_path, output);
        break;
    case "us.zoom.videomeetings":
        extractZoom(paths, db_path, output);
        break;
    case "com.duckduckgo.mobile.ios": // <-------------- Our function is registered!
        extractDuckDuckGo(paths, db_path, output);
        break;
    case "co.hinge.mobile.ios":
        extractHingeInfo(paths, db_path, output);
        break;
    case "HomeDomain":
        extractHomeDomain(paths, db_path, output);
        break;
    case "RootDomain":
        extractRootDomain(paths, db_path, output);
        break;
}
```

:::info

If you do not know the domain name of the app. You can find it in the output
after running your script and calling `extractBackup` once.

:::
