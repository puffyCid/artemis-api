---
description: How to extract data from browsers
---

# Browser Artifacts

Artemis supports extracting forensic artifacts for a lot of different browser applications:

- Chrome
- Edge
- Chromium
- FireFox
- Epiphany
- Falkon

Example artifacts artemis supports include: URL history, cookies, bookmarks, preferences, and a lot more

Using the API we can easily extract all supported artifacts and timeline them into a format that we can then easily upload to [Timesketch](https://timesketch.org/).

## Retrospect

The easiest want to extract browser artifacts is to use the API function `retrospect`.  
This function has very similar capabilities as the tool [Hindsight](https://github.com/obsidianforensics/hindsight).  
It will automatically parse and extract all supported artifacts from a provided browser application.

An example is below:

```typescript
import { Chrome, Format, Output, OutputType, PlatformType } from "./artemis-api/mod";

function main() {
    // Change this if you are going to run on a different platform.
    // Ex: Linux (PlatformType.Linux) or macOS (PlatformType.Darwin)
    const plat = PlatformType.Windows;

    // If we acquired a user's Chrome profile
    // We could also provide that as an alternative path
    // Ex: /home/analyst/Downloads/user1_chrome
    // This is optional
    const alt_path = undefined;
    // This is optional. The default value is false
    const enable_unfold = false;

    // Initialize a Chrome application class
    // By default this will extract Chrome artifacts for all users on the PlatformType
    // This example will attempt to extract Chrome artifacts for the Platform.Type Windows
    // If the alt_path != undefined. That will override the default Chrome paths for the provided platform
    // Ex: If alt_path = "/home/analyst/Downloads/user1_chrome" then that will override the default Chrome paths
    const chrome = new Chrome(plat, enable_unfold, alt_path);

    // Since `retrospect` is handling everything
    // We have to specify how `retrospect` should output our data
    const out: Output = {
        /** Directory will be created if it does not exist */
        name: "chrome_info",
        /** Directory will be created if it does not exist */
        directory: "./tmp",
        /** JSONL is the easiest format to upload to Timesketch */
        format: Format.JSONL,
        compress: false,
        /** This can be set to false. The artemis API will automatically timeline for us */
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        /** Artemis also supports uploading to GCP, AZURE, and AWS */
        output: OutputType.LOCAL
    };

    // Now timeline all supported artifacts
    chrome.retrospect(out);
}

main();
```

Now we can compile the code above to JavaScript using [esbuild](https://esbuild.github.io/) and then run with artemis!

- esbuild --bundle --outfile=main.js main.ts
- artemis -j main.js

You should get output at `./tmp/chrome_info`.

### Multi Browser Support

Retrospect supports additional browsers besides Chromium based browsers. You can run against all browsers supported by artemis!

```typescript
import { Chrome, Firefox, Chromium, Edge, Epiphany, Falkon, 
         Format, Output, OutputType, PlatformType } from "./artemis-api/mod";

function main() {
    // Change this if you are going to run on a different platform.
    // Ex: Windows (PlatformType.Windows) or macOS (PlatformType.Darwin)
    const plat = PlatformType.Linux;

    // If we acquired a user's Chrome profile
    // We could also provide that as an alternative path
    // Ex: /home/analyst/Downloads/user1_chrome
    // This is optional
    const alt_path = undefined;
    // This is optional. The default value is false
    const enable_unfold = false;

    // Initialize a Chrome application class
    // By default this will extract Chrome artifacts for all users on the PlatformType
    // This example will attempt to extract Chrome artifacts for the Platform.Type Windows
    // If the alt_path != undefined. That will override the default Chrome paths for the provided platform
    // Ex: If alt_path = "/home/analyst/Downloads/user1_chrome" then that will override the default Chrome paths
    const chrome = new Chrome(plat, enable_unfold, alt_path);

    const fire = new Firefox(plat);
    const edge = new Edge(plat);
    const chromium = new Chromium(plat);
    // Epiphany only supports the Linux platform.
    // But we can also provide an alt_path if we want to parse on a non-linux platform
    const epiphany = new Epiphany();
    const falkon = new Falkon(plat);

    // Since `retrospect` is handling everything
    // We have to specify how `retrospect` should output our data
    const out: Output = {
        /** Directory will be created if it does not exist */
        name: "browsers_info",
        /** Directory will be created if it does not exist */
        directory: "./tmp",
        /** JSONL is the easiest format to upload to Timesketch */
        format: Format.JSONL,
        compress: false,
        /** This can be set to false. The artemis API will automatically timeline for us */
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        /** Artemis also supports uploading to GCP, AZURE, and AWS */
        output: OutputType.LOCAL
    };

    // Now timeline all supported artifacts for all browsers!
    chrome.retrospect(out);
    edge.retrospect(out);
    fire.retrospect(out);
    chromium.retrospect(out);
    epiphany.retrospect(out);
    falkon.retrospect(out);
}

main();
```

Now we can compile the code above to JavaScript using [esbuild](https://esbuild.github.io/) and then run with artemis!

- esbuild --bundle --outfile=main.js main.ts
- artemis -j main.js

You should get output at `./tmp/browsers_info`.

:::info

You can shrink to size of you JavaScript script by using the minify option in esbuild
- esbuild --minify --bundle --outfile=main.js main.ts

:::

### Unfold

Artemis has one optional feature that can be used to enhance browser artifacts. This feature is called `unfold`.  
Unfold is a URL parser that attempts to extract data in URLs. It is very similar to the tool [unfurl](https://github.com/obsidianforensics/unfurl).  
By default unfold is **disabled**.  

But enabling unfold is very easy! Just add it as an parameter when initializing a browser artifact class.

An example is below:
```typescript
import { Chrome, Format, Output, OutputType, PlatformType } from "./artemis-api/mod";

function main() {
    // Change this if you are going to run on a different platform.
    // Ex: Linux (PlatformType.Linux) or macOS (PlatformType.Darwin)
    const plat = PlatformType.Windows;
    const enable_unfold = true;

    // Initialize a Chrome application class
    // By default this will extract Chrome artifacts for all users on the PlatformType
    // When unfold is enabled, artemis will attempt to extract additional information from URLs
    const chrome = new Chrome(plat, enable_unfold);

    // Since `retrospect` is handling everything
    // We have to specify how `retrospect` should output our data
    const out: Output = {
        /** Directory will be created if it does not exist */
        name: "chrome_info",
        /** Directory will be created if it does not exist */
        directory: "./tmp",
        /** JSONL is the easiest format to upload to Timesketch */
        format: Format.JSONL,
        compress: false,
        /** This can be set to false. The artemis API will automatically timeline for us */
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        /** Artemis also supports uploading to GCP, AZURE, and AWS */
        output: OutputType.LOCAL
    };

    // Now timeline all supported artifacts
    chrome.retrospect(out);
}

main();
```

Now we can compile the code above to JavaScript using [esbuild](https://esbuild.github.io/) and then run with artemis!

- esbuild --bundle --outfile=main.js main.ts
- artemis -j main.js

You should get output at `./tmp/chrome_info`.