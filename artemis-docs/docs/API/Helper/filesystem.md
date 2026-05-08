---
description: Interacting with the Filesystem
---

# Filesystem APIs

The artemis API contains several functions that can be used to interact with the
filesystem.

### stat(path) -> FileInfo | FileError

Return basic metadata about a file or directory

| Param | Type   | Description                             |
| ----- | ------ | --------------------------------------- |
| path  | string | File or directory to get metadata about |

### hash(path, md5, sha1, sha256) -> Hashes | FileError

Return hashes for a single file

| Param  | Type    | Description           |
| ------ | ------- | --------------------- |
| path   | string  | File to hash          |
| md5    | boolean | Enable MD5 hashing    |
| sha1   | boolean | Enable SHA1 hashing   |
| sha256 | boolean | Enable SHA256 hashing |

### readTextFile(path) -> string | FileError

Read a text file. Currently only files less than 2GB in size can be read

| Param | Type   | Description       |
| ----- | ------ | ----------------- |
| path  | string | Text file to read |

### readFile(path) -> Uint8Array | FileError

Read a file using regular OS APIs. Currently only files less than 2GB in size
can be read

| Param | Type   | Description  |
| ----- | ------ | ------------ |
| path  | string | File to read |

### glob(pattern) -> GlobInfo[] | FileError

Parse glob patterns based on Rust [glob](https://docs.rs/glob/latest/glob/)
support

| Param   | Type   | Description                                                                              |
| ------- | ------ | ---------------------------------------------------------------------------------------- |
| pattern | string | Glob pattern to parse. Ex: C:\\* to get all files and directories at Windows C directory |

### readDir(path) -> Promise&lt;FileInfo[]&gt; | FileError

Read a provided directory and get list of files. This function is async!

| Param | Type   | Description       |
| ----- | ------ | ----------------- |
| path  | string | Directory to read |

### acquireFile(path, output) -> boolean | FileError

Acquire a local file using OS APIs. Supports copying the file to local location
or uploading to cloud.

| Param  | Type   | Description       |
| ------ | ------ | ----------------- |
| path   | string | Directory to read |
| output | Output | Output object     |

### readLines(path, offset, limit) -> string[] | FileError

Read lines from a text file. You may provide an offset to specific line and limit the number of lines to read.

| Param  | Type    | Description                                                           |
| ------ | ------- | --------------------------------------------------------------------- |
| path   | string  | Text file to read                                                     |
| offset | number  | Line to start reading file at. Must be positive number. Default is 0. |
| limit  | number  | How many lines to read. Must be positive number. Default is 100.      | 


### BufReader class

A basic TypeScript class that lets you open and and read parts of a file.

Sample TypeScript code:
```typescript
import { FileError } from "./artemis-api/src/filesystem/errors";
import { BufReader } from "./artemis-api/src/filesystem/reader";

function main() {
    const reader = new BufReader("C:\\Windows\\explorer.exe");
    const bytes = reader.readBytes(0, 25);
    if(bytes instanceof FileError) {
        return;
    }
    const array = Array.from(bytes);
    if(array.length !== 25) {
        throw "bad length";
    }

    console.log(`I used the Rust BufReader to read the first 25 bytes of explorer.exe! ${array}`);
    const middle = reader.readBytes(1000, 50);
    if(middle instanceof FileError) {
        return;
    }

    console.log(`I used the Rust BufReader to read 50 bytes of explorer.exe at offset 1000! I did not read the entire file into memory! ${array}`);

    return Array.from(bytes);
}

main();
```

#### readBytes(offset, bytes) -> Uint8Array | FileError

Read bytes from a file at provided offset

| Param   | Type   | Description                                       |
| ------- | ------ | ------------------------------------- |
| offset  | number | Starting offset when reading the file |
| bytes   | number | How many bytes to read                |