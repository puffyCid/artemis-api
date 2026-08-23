---
sidebar_position: 2
---

# Getting Started

The artemis source code is about ~88k lines of Rust code across ~690 files as of
December 2025 (this includes tests). However its organized in a pretty simple
structure.

:::tip

Use the just command `just complex` to measure lines of Rust and complexity!\
(requires [scc](https://github.com/boyter/scc))

:::

From the root of the artemis repo:

- `forensics/` workspace contains the library component of artemis. The bulk of the
  code is located here
- `cli/` workspace contains the executable component artemis.
- `timeline/` workspace contains functions to timeline artifacts

From the `forensics/src/` directory

| Directory  | Description                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessor   | Contains the code related to accessing forensic data. We can use the accessor to read data from different sources
| artifacts  | Contains the code related to parsing forensic artifacts.<br/> It is broken down by OS and application artifacts                                                                                                        |
| filesystem | Contains code to help interact with the filesystem. It contains helper functions that can be used when adding new artifacts/features. <br/>Ex: reading/hashing files, getting file timestamps, listing files, etc      |
| output     | Contains code related to outputting parsed data                                                                                                                                                                        |
| runtime    | Contains code related to the embedded JS runtime                                                                                                                                                                     |
| structs    | Contains code related to how TOML collection files are parsed. It tells artemis how to interpret TOML collections.                                                                                               |
| utils      | Contains code related to help parse artifacts and provide other features to artemis. <br/> Ex: Decompress/compress data, get environment variables,create a Regex expression, extract strings, convert timestamps, etc |
| core.rs    | Contains the entry point to the **forensics** workspace.                                                                                                                                                                        |


## Adding New Artifacts

To keep the codebase organized the follow should be followed when adding a new
artifact.

- Artifacts have their own subfolder. Ex: `src/artifacts/os/windows/prefetch`
- The subfolder will probably have the following files at minimum:
  - parser.rs - Contains `pub(crate)` accessible functions for the artifact
  - error.rs - Artifact specific errors

## Timestamps

All timestamps artemis outputs are in ISO RFC 3339 format
(YYYY-MM-DDTHH:mm:ss.SSSZ). The timestamp from should be from UNIXEPOCH time.

If your new artifact has a timestamp, you will need to make sure the timestamp
is in YYYY-MM-DDTHH:mm:ss.SSSZ format. Though exceptions may be allowed if
needed, these exceptions will only be for the duration (ex: seconds vs
nanoseconds).

No other time formats such as Windows FILETIME, FATTIME, Chromium time, etc are
allowed.

:::tip

Use the time functions under **utils** to help with timestamp conversions!

:::

## Evidence Field

All artifacts should include an evidence field that points to the full path of file or folder that is the source of the artifact.

For example, the evidence field for the Amcache artifact would be the full path of the Amcache.hve file.

## Artifact Scope

Currently all artifacts that artemis parses are statically coded in the binary
(they are written in Rust). While this ok, it prevents us from dynamically
updating the parser if the artifact format changes (ex: new Windows release).

Currently the [JS runtime](../Intro/Scripting/boa.md) has minimal support for
creating parsers. If you are interested in adding a small parser to artemis, it
could be worth first trying to code it using the JS runtime.

An simple JS parser can be found in the
[artemis API](https://github.com/puffyCid/artemis-api/blob/main/src/images/icns.ts)
repo.

However, if you want to implement a new parser for parsing common Windows
artifacts such as *Jumplists* then that is definitely something that could be
worth including as a Rust coded parser.

When in doubt or unsure open an issue!

## Suggestions

If you want add a new artifact but want to see how other artifacts are
implemented, some suggested ones to review are:

- `UserAssist`: If you want to add a new Registry artifact. The UserAssist
  artifact is less than 300 lines (not counting tests). And includes:
  - Parsing binary data
  - Converting timestamps
  - Collecting user Registry data
- `FsEvents`: If you want to to parse a binary file. The FsEvents is less than
  300 lines (not counting tests). And includes:

  - Parsing binary data
  - Decompressing data
  - Getting data flags

:::info

FsEvents is the first artifact created for artemis. Its the oldest code in the project!

:::

## Useful Helper Functions

### Artemis Accessor 

Starting in artemis version 0.20.0 a generic accessor has added to abstract reading forensic data.  
It can be used to read data from a variety of sources such as:

- Live system
- Raw NTFS disk
- Zip file


For example to read a file called `test.txt` from a zip:

```rust
let mut accessor = Accessor::with_defaults();
let bytes = accessor.read_file("zip:test.zip!/test.txt);
```

The `Accessor` can also be used to list files and glob for files and directories.

For to glob for all evtx files in a zip file:

```rust
let mut accessor = Accessor::with_defaults();
let bytes = accessor.globfs("zip:test.zip!/**/*.evtx);
```

If you want to read a locked file on a Windows system:

```rust
let mut accessor = Accessor::with_defaults();
let bytes = accessor.read_file("ntfs:C:\\Users\dev\\NTUSER.dat);
```