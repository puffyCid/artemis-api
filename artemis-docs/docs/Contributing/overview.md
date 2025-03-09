---
sidebar_position: 2
---

# Getting Started

The artemis source code is about ~87k lines of Rust code across ~717 files as of
March 2025 (this includes tests). However its organized in a pretty simple
structure.

:::tip

Use the just command `just complex` to measure lines of Rust and complexity!\
(requires [scc](https://github.com/boyter/scc))

:::

From the root of the artemis repo:

- `core/` workspace contains the library component of artemis. The bulk of the
  code is located here
- `cli/` workspace contains the executable component artemis.
- `server/` workspace contains the experimental server component of artemis. Its
  currently experimental

From the `core/src/` directory

| Directory  | Description                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| artifacts  | Contains the code related to parsing forensic artifacts.<br/> It is broken down by OS and application artifacts                                                                                                        |
| filesystem | Contains code to help interact with the filesystem. It contains helper functions that can be used when adding new artifacts/features. <br/>Ex: reading/hashing files, getting file timestamps, listing files, etc      |
| output     | Contains code related to outputting parsed data                                                                                                                                                                        |
| runtime    | Contains code related to the embedded JS runtime                                                                                                                                                                     |
| structs    | Contains code related to how TOML collection files are parsed. It <br/> tells artemis how to interpret TOML collections.                                                                                               |
| utils      | Contains code related to help parse artifacts and provide other features to artemis. <br/> Ex: Decompress/compress data, get environment variables,create a Regex expression, extract strings, convert timestamps, etc |
| core.rs    | Contains the entry point to the `core` library.                                                                                                                                                                        |


# Adding New Artifacts

To keep the codebase organized the follow should be followed when adding a new
artifact.

- Artifacts have their own subfolder. Ex: `src/artifacts/os/windows/prefetch`
- The subfolder will probably have the following files at minimum:
  - parser.rs - Contains `pub(crate)` accessible functions for the artifact
  - error.rs - Artifact specific errors

# Timestamps

All timestamps artemis outputs are in ISO RFC 3339 format
(YYYY-MM-DDTHH:mm:ss.SSSZ). The timestamp from should be from UNIXEPOCH time.

If your new artifact has a timestamp, you will need to make sure the timestamp
is in YYYY-MM-DDTHH:mm:ss.SSSZ format. Though exceptions may be allowed if
needed, these exceptions will only be for the duration (ex: seconds vs
nanoseconds).

No other time formats such as Windows FILETIME, FATTIME, Chromium time, etc are
allowed.

:::tip

Use the time functions under `utils` to help with timestamp conversions!

:::

# Artifact Scope

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
artifacts such as `Jumplists` then that is definitely something that could be
worth including as a static parser.

When in doubt or unsure open an issue!

# Suggestions

If you want add a new artifact but want to see how other artifacts are
implemented, some suggested ones to review are:

- `UserAssist`: If you want to add a new Registry artifact. The `UserAssist`
  artifact is less than 300 lines (not counting tests). And includes:
  - Parsing binary data
  - Converting timestamps
  - Collecting user Registry data
- `FsEvents`: If you want to to parse a binary file. The `FsEvents` is less than
  300 lines (not counting tests). And includes:

  - Parsing binary data
  - Decompressing data
  - Getting data flags

    Fun fact: `FsEvents` is the first artifact created for artemis. Its the
    oldest code in the project!

## Useful Helper Functions

The artemis codebase contains a handful of artifacts (ex: `Registry`) that
expose helper functions that allow other artifacts to reuse parts of that
artifact to help get artifact specific data.

For example the Windows `Registry` artifact exposes a helper function that other
`Registry` based artifacts can leverage to help parse the `Registry`:

- `pub(crate) fn get_registry_keys(start_path: &str, regex: &Regex, file_path: &str)`
  will read a Registry file at provided file_path and filter to based on
  start_path and regex. If start_path and regex are empty a full `Registry`
  listing is returned. All Regex comparisons are done in lowercase.

Some other examples listed below:

- `/filesystem` contains code to help interact with the filesystem.

  - `pub(crate) fn list_files(path: &str)` returns list of files
  - `pub(crate) fn read_file(path: &str)` reads a file
  - `pub(crate) fn hash_file(hashes: &Hashes, path: &str)` hashes a file based
    on selected hashes (MD5, SHA1, SHA256)

- `/filesystem/ntfs` contains code to help interact with the raw NTFS
  filesystem. It lets us bypass locked files. This is only available on Windows

  - `pub(crate) fn raw_read_file(path: &str)` reads a file. Will bypass file
    locks
  - `pub(crate) fn read_attribute(path: &str, attribute: &str)` can read an
    Alternative Data Stream (ADS)
  - `pub(crate) fn get_user_registry_files(drive: &char)` returns a Vector that
    contains references to all user Registry files (NTUSER.DAT and
    UsrClass.dat). It does **not** read the files, it just provides all the data
    needed to start reading them.

- `/src/artifacts/os/macos/plist/property_list.rs` contains code help parse
  plist files.
  - `pub(crate) fn parse_plist_file(path: &str)` will parse a plist file and
    return it as a Serde Value
