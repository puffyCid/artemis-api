---
description: Interact with Linux Artifacts
---

# Linux

These functions can be used to pull data related to Linux artifacts

### getLogon(path) -> `Logon[]`

Parse a single logon related file. Path end with one of the following:

1. wtmp
2. btmp
3. utmp

| Param | Type     | Description                        |
| ----- | -------- | ---------------------------------- |
| path  | `string` | Path to `wtmp, utmp, or btmp` file |

### getElf(path) -> `ElfInfo | LinuxError`

Parse an ELF executable file.

| Param | Type     | Description      |
| ----- | -------- | ---------------- |
| path  | `string` | Path to ELF file |

### getJournal(path) -> `Journal[] | LinuxError`

Parse a systemd [Journal](../../Artifacts/Linux%20Artifacts/journals.md) file.

| Param | Type     | Description          |
| ----- | -------- | -------------------- |
| path  | `string` | Path to Journal file |