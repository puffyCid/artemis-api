---
sidebar_position: 2
description: The TOML collection format
---

# Format

An example TOML collection is provided below:

```toml
[output]
name = "amcache_collection"
directory = "./tmp"
format = "json"
compress = false
timeline = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
url = ""
api_key = ""
filter_name = ""
filter_script = ""
logging = "warn"

[[artifacts]]
artifact_name = "amcache"
filter = false
[artifacts.amcache]
# Optional
# alt_file = "C:\\Artifacts\\Amcache.hve"
```

- `[output]` Defines the output configuration
  - `name` The output name. This can be any string value
  - `directory` The directory where the output should be written. This example
    outputs to a directory called tmp in the current working directory
  - `format` The output format can be either json or jsonl or csv
  - `compress` Whether to compress the output with **gzip** compression. Once
    the collection is complete the output directory will be compressed with
    **zip** compression.
  - `timeline` Whether to timeline the parsed data. This forces the output format to JSONL and is compatible with [Timesketch](https://timesketch.org/)
  - `endpoint_id` An ID assigned to the endpoint. This can be any string value
  - `collection_id` A number assigned to the collection. This can be any postive number
  - `output` The output type. Values can be: **local**, **aws**, **gcp**, or
    **azure**
  - `url` The URL associated with either aws, gcp, or azure. This is required
    only if using **remote upload** output
  - `api_key` The API key associated with either aws, gcp, or azure. This is
    required only if using **remote upload** output
  - `filter_name` The name of the provided filter_script. This is **optional**
    but if you are using a filter_script you should provide a name. Otherwise
    the default name **UnknownFilterName** is used
  - `filter_script` An advanced **optional** output option. Artemis will pass
    the results of each **[[artifacts]]** entry into a script. See
    [scripting](../Scripting/boa.md) section for detailed overview of this
    option.
  - `logging` Set the logging level for artemis. This is **optional** by default
    artemis will log errors and warnings. Valid options are: **warn**,
    **error**, **debug**, or **info**
- `[[artifacts]]` A list of artifacts to collect
  - `artifact_name` Name of artifact
  - `filter` Whether to filter the artifact data through the filter_script. This
    is **optional** by default nothing is filtered. This option will send
    artifact results to your provided filter_script
  - `[artifacts.amcache]` Artifact configuration parameters
    - `alt_file` Use an alternative amcache file when collecting data. This
      configuration is **optional**

The example above collects one artifact (Amcache) on a Windows system and
outputs the results the local system at the path ./tmp/amcache_collection

If we wanted to collect more than one artifact we could use a collection like
the one below:

```toml
[output]
name = "execution_collection"
directory = "./tmp"
format = "jsonl"
compress = false
timeline = true
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "amcache"
[artifacts.amcache]

[[artifacts]]
artifact_name = "shortcuts"
[artifacts.shortcuts]
path = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"
```

The TOML collection above collects both `amcache` and `shortcuts` data on a
Windows system and outputs the results to the local system at the path
./tmp/execution_collection.

Notable changes:\
**name** our collection is now named `execution_collection`

```toml
[[artifacts]]
artifact_name = "amcache"
[artifacts.amcache]
```

Since the `alt_drive` parameter is optional for **amcache** we do not need to
specifiy it

```toml
[[artifacts]]
artifact_name = "shortcuts"
[artifacts.shortcuts]
path = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"
```

- `[[artifacts]]` The second entry in our list of artifacts to collect
  - **artifact_name** Name of artifact
  - `[artifacts.shortcuts]` Artifact configuration parameters
    - **path** Use the provided path to collect **shortcuts** data. This
      parameter is **required**

Since `[[artifacts]]` is a list we can even provide the same artifact multiple
times:

```toml
[[artifacts]]
artifact_name = "shortcuts"
[artifacts.shortcuts]
path = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"

[[artifacts]]
artifact_name = "shortcuts"
[artifacts.shortcuts]
path = "D:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"

[[artifacts]]
artifact_name = "shortcuts"
[artifacts.shortcuts]
path = "E:\\Users\\rust\\Downloads"
```

However, providing the same artifact multiple times can be repetitive. See the
chapter on [scripting](../Scripting/boa.md) to see how we can automate and
enhance artifact collection using artemis and a tiny amount of JavaScript!

Finally you can review the full list of all supported artifacts and their
configuration under the [artifact](../../Artifacts/overview.md) chapter

## Marker File

Starting with artemis version 0.18.0 you may optionally have artemis generate a marker file after it completes a collection.  
A marker file is a tracker that artemis can use to determine if artifacts previously collected should be skipped.  
This is useful when you are using artemis to parse data on multiple systems with toml files that overlap

For example, the toml collection below parses the following artifacts:
- amcache
- registry

```toml
[output]
name = "marker_collection"
directory = "./tmp"
format = "json"
compress = false
timeline = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
url = ""
api_key = ""
filter_name = ""
filter_script = ""
logging = "warn"

[[artifacts]]
artifact_name = "amcache"
filter = false
[artifacts.amcache]
[[artifacts]]
artifact_name = "registry" # Parses the whole Registry file
[artifacts.registry]
user_hives = true # All NTUSER.DAT and UsrClass.dat files
system_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY
```

If you want to run this against system A, artemis will output amcache and registry data.  If you later want to run this TOML file on system B but include eventlogs you would add the eventlog artifact.  

```toml
[output]
name = "marker_collection"
directory = "./tmp"
format = "json"
compress = false
timeline = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
url = ""
api_key = ""
filter_name = ""
filter_script = ""
logging = "warn"

[[artifacts]]
artifact_name = "amcache"
filter = false
[artifacts.amcache]
[[artifacts]]
artifact_name = "registry" # Parses the whole Registry file
[artifacts.registry]
user_hives = true # All NTUSER.DAT and UsrClass.dat files
system_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY

# Add eventlogs
[[artifacts]]
artifact_name = "eventlogs"
[artifacts.eventlogs]
include_templates = true
dump_templates = false 
only_templates = false 
```

However, if you wanted to run this again on SystemA artemis would collect eventlogs but also re-collect amcache and registry data too.

A marker file will allow artemis to skip previously collected artifacts.
By adding the following options to a TOML collection, artemis will generate a marker file that can be used to track previous collections on a system.

```toml
[output]
name = "marker_collection"
directory = "./tmp"
format = "json"
compress = false
timeline = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
url = ""
api_key = ""
filter_name = ""
filter_script = ""
logging = "warn"

[marker]
path = "./tmp/marker_collection/marker_tracker"
name = "marker.json"
age = 900

[[artifacts]]
artifact_name = "amcache"
filter = false
[artifacts.amcache]
[[artifacts]]
artifact_name = "registry" # Parses the whole Registry file
[artifacts.registry]
user_hives = true # All NTUSER.DAT and UsrClass.dat files
system_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY

# Add eventlogs
[[artifacts]]
artifact_name = "eventlogs"
[artifacts.eventlogs]
include_templates = true
dump_templates = false 
only_templates = false
```

- **marker** Optional configuration setting that will cause artemis to create a tracker file that can be used to skip previously collected artifacts
  - **path** Where artemis should store the marker file on the system
  - **age** How old the marker file at **path** in minutes should be before artemis recollects the data again.

:::info

Age is in minutes! 900 minutes = 15 hours

:::

If you run the toml collection above on a Windows system, you should see the following file in the output:
- tmp/marker_collection/marker_tracker/marker.json

```json
[
    {
        "hash": "10ba60f1ac1dbbc63f0abcf7d78a44f9",
        "name": "amcache",
        "last_run": "2026-01-23T01:39:57.000Z",
        "unixepoch": 1769132397
    },
    {
        "hash": "a33ab357c6460215ea911e09630290a9",
        "name": "registry",
        "last_run": "2026-01-23T01:40:37.000Z",
        "unixepoch": 1769132437
    },
    {
        "hash": "b97f429acee0c4b4e08d22a3b6d5b9fd",
        "name": "eventlogs",
        "last_run": "2026-01-23T01:41:20.000Z",
        "unixepoch": 1769132480
    }
]
```

The marker output file is an array of JSON objects with the following key pair values:
- **hash** The hash value of the artifact with its configuration options
- **name** The artifact name
- **last_run** When the artifact collection was completed
- **unixepoch** When the artifact collection was completed in unixepoch seconds

If you try running the TOML collection above again, you should see artemis skip the artifacts because the marker option is configured to only re-collect the artifacts after 900 minutes