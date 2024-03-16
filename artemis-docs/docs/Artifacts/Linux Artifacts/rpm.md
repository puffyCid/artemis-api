---
description: RPM Package Manager
keywords:
  - linux
  - sqlite
---

# RPM Packages

RPM packages are the default package format for installing software on Fedora
and OpenSUSE and Fedora derived systems (ex: CentOS, RedHat). Artemis supports
querying the /var/lib/rpm/rpmdb.sqlite database to get installed RPM packages.

:::note

Artemis only supports parsing the SQLite database for RPM packages.\
Modern versions of RPM use SQLite to store package info. However, older versions
used the Berkley database.

For example, Fedora 33 switched over to the sqlite format (released 2020-10-27)\
Therefore versions older than Fedora 33 would not be supported by artemis
because they are still using the Berkley database.

:::

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed RPM packages.

# Sample API Script

```typescript
import {
  getRpmInfo,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const results = getRpmInfo();

  console.log(results);
}
```

# Output Structure

An array of `RpmPackages` entries.

```typescript
export interface RpmPackages {
  name: string;
  version: string;
  release: string;
  source: string;
  size: number;
  sha1: string;
  arch: string;
  /**In UNIXEPOCH seconds */
  install_time: number;
  vendor: string;
  package_group: string;
  summary: string;
  url: string;
}
```
