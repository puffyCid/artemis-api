---
description: Interact with FreeBSD Artifacts
---

# FreeBSD


### getPkgs(offset, limit, path) -> Pkg[] | LinuxError

Get list of installed pkgs on the system. You may provide an optional alternative
full path to the local.sqlite file.

You must provided an offset and the amount of packages to query from the
database.


| Param    | Type   | Description                                                                |
| -------- | ------ | -------------------------------------------------------------------------- |
| offset   | number | Query offset to start at. 0 will start at the first package inthe database |
| limit    | number | How many packages to query                                                 |
| alt_path | string | Optional path to the local.sqlite file                                     |