---
description: Interacting with the Filesystem
---

# Filesystem APIs

The artemis API contains several functions that can be used to interact with the
filesystem.

### stat(path) -> `FileInfo | FileError`

Return basic metadata about a file or directory

| Param | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| path  | `string` | File or directory to get metadata about |

### hash(path, md5, sha1, sha256) -> `Hashes | FileError`

Return hashes for a single file

| Param  | Type      | Description           |
| ------ | --------- | --------------------- |
| path   | `string`  | File to hash          |
| md5    | `boolean` | Enable MD5 hashing    |
| sha1   | `boolean` | Enable SHA1 hashing   |
| sha256 | `boolean` | Enable SHA256 hashing |

### readTextFile(path) -> `string | FileError`

Read a text file. Currently only files less than 2GB in size can be read

| Param | Type     | Description       |
| ----- | -------- | ----------------- |
| path  | `string` | Text file to read |

### readFile(path) -> `Uint8Array | FileError`

Read a file using regular OS APIs. Currently only files less than 2GB in size
can be read

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| path  | `string` | File to read |

### glob(pattern) -> `GlobInfo[] | FileError`

Parse glob patterns based on Rust [glob](https://docs.rs/glob/latest/glob/)
support

| Param   | Type     | Description                                                                                |
| ------- | -------- | ------------------------------------------------------------------------------------------ |
| pattern | `string` | Glob pattern to parse. Ex: `C:\\*` to get all files and directories at Windows C directory |

### readDir(path) -> `Promise<FileInfo[]> | FileError`

Read a provided directory and get list of files. This function is `async`!

| Param | Type     | Description       |
| ----- | -------- | ----------------- |
| path  | `string` | Directory to read |
