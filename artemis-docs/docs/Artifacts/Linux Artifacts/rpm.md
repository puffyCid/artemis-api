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

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed RPM packages.

## Sample API Script

```typescript
import { LinuxError } from "./artemis-api/src/linux/errors";
import { getRpmInfo } from "./artemis-api/src/linux/rpm";

function main() {
  let offset = 0;
  const limit = 100;

  while (true) {
    const status = getRpmInfo(offset, limit);
    if (status instanceof LinuxError) {
      break;
    }
    if (status.length < limit) {
      break;
    }

    offset += limit;
    console.log(JSON.stringify(status));
  }
}

main();
```

## Output Structure

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
  install_time: string;
  vendor: string;
  package_group: string;
  summary: string;
  url: string;
  message: string;
  datetime: string;
  timestamp_desc: "RPM Package Installed";
  artifact: "RPM Package";
  data_type: "linux:rpm:entry";
}

```
