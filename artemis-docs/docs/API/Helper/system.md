---
description: Information about the OS
---

# System APIs

These functions help get metadata about the OS

### cpus() -> Cpus[]

Function to get system CPU information

### disks() -> Disks[]

Function to get disk information on the system

### memory() -> Memory

Function to get memory information

### processListing(md5, sha1, sha256, binary) -> LinuxProcessInfo[] | WindowsProcessInfo[] | MacosProcessInfo[]

Function to pull a process listing from the system

| Param  | Type    | Description                                             |
| ------ | ------- | ------------------------------------------------------- |
| md5    | boolean | Enable MD5 hashing. Optional. Default is false          |
| sha1   | boolean | Enable SHA1 hashing. Optional. Default is false         |
| sha256 | boolean | Enable SHA256 hashing. Optional. Default is false       |
| binary | boolean | Process process binary data. Optional. Default is false |

### outputResults(data, data_name, output) -> boolean

Function to pass data to artemis to save. Returns true on success and false on
failure.

| Param     | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| data      | string | A JSON string of data                                   |
| data_name | string | Name of the type of data. Ex: processes                 |
| output    | Output | An Output object telling artemis how to output the data |

### getSysteminfo() -> SystemInfo

Function to pull systeminfo data

### uptime() -> number

Function to get system uptime in seconds

### hostname() -> string

Function to get hostname of system

### osVersion() -> string

Function to get OS version

### kernelVersion() -> string

Function to get kernel version information

### platform() -> string

Function to get platform type of the system. Ex: Darwin

### executeCommand(command, args) -> CommandResult | Error

Execute a command on the system. If the command can be found via ENV variables
then full path not needed. Args are optional.

| Param   | Type     | Description                       |
| ------- | -------- | --------------------------------- |
| command | string   | Command to execute                |
| args    | string[] | Arguements to pass to the command |
