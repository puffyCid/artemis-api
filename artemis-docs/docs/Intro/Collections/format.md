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

However, providing the same artifact mutliple times can be repetitive. See the
chapter on [scripting](../Scripting/boa.md) to see how we can automate and
enhance artifact collection using artemis and a tiny amount of JavaScript!

Finally you can review the full list of all supported artifacts and their
configuration under the [artifact](../../Artifacts/overview.md) chapter
