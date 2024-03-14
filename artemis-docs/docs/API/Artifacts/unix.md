---
description: Interact with Unix Artifacts
---

# Unix

These functions can be used to pull data related to Unix artifacts. They are
supported on both Linux and macOS.

### getBashHistory() -> BashHistory[] | UnixError

Get bash history for all users.

### getZshHistory() -> ZshHistory[] | UnixError

Get zsh history for all users.

### getPythonHistory() -> PythonHistory[] | UnixError

Get python history for all users.

### getCron() -> Cron[] | UnixError

Get Cron entries
