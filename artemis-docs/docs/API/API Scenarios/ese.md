---
description: How to extract data from ESE databases
---

# ESE Databases

The Windows Extensible Storage Engine ([ESE](https://en.wikipedia.org/wiki/Extensible_Storage_Engine)) is an open source database file used by several Windows components. It is used by several different types of interesting forensic artifacts such as:

- Windows BITS
- Windows Search

Artemis allows analysts to extract and explorer ESE databases using the TypeScript API.
However, these database files may become very large. For example, the Windows Search database can range from 200MBs to 8GBs in size.

So we must careful that we do not read all of the data into memory.

Artemis provides a TypeScript EseDatabase class to help us parse and interact with ESE databases.

## ESE Parsing Guide

Let walkthrough a scenario where we can leverage the artemis API to extract data from the Windows [User Access Logging database](https://www.crowdstrike.com/blog/user-access-logging-ual-overview/) (UAL).
The guide below assumes you have cloned the artemis API repository to your local system. However, you may also import the API remotely, you will just need to update the imports.

The functions in this guide are documented [here](../Artifacts/windows.md#ese-database-class)

### Create a EseDatabase class instance

Before we can parse a ESE database we need to initialize an instance of the EseDatabase class. This is not too difficult :)

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);
}

main();
```

The above code initializes a new EseDatabase instance that we will use to parse the UAL database.

### Extract the Catalog

Before we can do any parsing of the ESE database must get the Catalog associated with the ESE database.
The Catalog is a special table in all ESE databases that contains metadata on all tables and columns in the database.

There are 4 high level steps required in order to extract data from an ESE database:

1. Parse and extract the Catalog
2. Get the metadata associated with the ESE table(s) we are interested in
3. Get an array of pages associated with the table. Pages contain the table data
4. Extract the table data based on the pages provided

The code below shows how to extract the Catalog from the Current.mdb database.

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";
import { WindowsError } from "./artemis-api/src/windows/errors.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  // Get array of Catalog entries
  const catalog = ese.catalogInfo();
  if (catalog instanceof WindowsError) {
    return catalog;
  }
}

main();
```

As mentioned the Catalog contains metadata on all Tables and Columns in an ESE database. We can use this the help explore what kind of data exists in the database.

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";
import { WindowsError } from "./artemis-api/src/windows/errors.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  // Get array of Catalog entries
  const catalog = ese.catalogInfo();
  if (catalog instanceof WindowsError) {
    return catalog;
  }

  for (const entry of catalog) {
    console.log(`${entry.name} - Catalog Type: ${entry.catalog_type}`);
  }
}

main();
```

:::warning

Make sure you are checking for errors when parsing the ESE database. If artemis encounters an error you will probably not be able to parse the entire database.
If artemis fails to parse the Catalog, then you will not be able to parse the database.

:::

The code above loops through the Catalog and prints out probably the most interesting properties in the object:

- The name of the Catalog entry
- The CatalogType for that entry.

The CatalogType will be one of the following:

```typescript
export enum CatalogType {
  Table = "Table",
  Column = "Column",
  Index = "Index",
  LongValue = "LongValue",
  Callback = "Callback",
  SlvAvail = "SlvAvail",
  SlvSpaceMap = "SlvSpaceMap",
  Unknown = "Unknown",
}
```

Only the enums Table and Column are the most interesting. The remaining types are associated with the database internals.

:::info

All ESE objects that artemis returns are defined in the [ESE](../../Artifacts/Windows%20Artfacts/ese.md) artifact.
Do not worry too much about the large amount of objects, artemis will handle all of the complexity and heavy lifting for parsing the data.

:::

### Getting Table information

Since we are parsing the Current.mdb database, we are mainly interesting the CLIENTS table.

The code below shows how to extract metadata associated with the CLIENTS table.

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";
import { WindowsError } from "./artemis-api/src/windows/errors.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  // Get array of Catalog entries
  const catalog = ese.catalogInfo();
  if (catalog instanceof WindowsError) {
    return catalog;
  }

  const name = "CLIENTS";
  const info = ese.tableInfo(catalog, name);
  console.log(info);
}

main();
```

The tableInfo function will extract all metadata from the Catalog that is associated with our table name (CLIENTS).

### Get Pages associated with Table

We are now at step 3 of the 4 step process. We now must get all of the pages associated with our table (CLIENTS). These pages will point to where our data is.

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";
import { WindowsError } from "./artemis-api/src/windows/errors.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  // Get array of Catalog entries
  const catalog = ese.catalogInfo();
  if (catalog instanceof WindowsError) {
    return catalog;
  }

  const name = "CLIENTS";
  const info = ese.tableInfo(catalog, name);

  const pages = ese.getPages(info.table_page);
  if (pages instanceof WindowsError) {
    return;
  }

  console.log(pages.length);
}

main();
```

The code above will now also get all of the pages associated with the table CLIENTS!

### Getting our data

We are now at the last step in order to get our data! This last step is the most important, because **you** will decide how much memory artemis will use in order to parse the database to get our data.

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";
import { WindowsError } from "./artemis-api/src/windows/errors.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  // Get array of Catalog entries
  const catalog = ese.catalogInfo();
  if (catalog instanceof WindowsError) {
    return catalog;
  }

  const name = "CLIENTS";
  const info = ese.tableInfo(catalog, name);

  const pages = ese.getPages(info.table_page);
  if (pages instanceof WindowsError) {
    return;
  }

  console.log(pages.length);

  // getRows() returns Record<string, EseTable[][]>
  const data = ese.getRows(pages, info);
  if (data instanceof WindowsError) {
    return;
  }

  console.log(data["CLIENTS"].length);
}

main();
```

The code above calls the function getRows() which will get our data associated with CLIENTS table.

:::warning

The number of pages and table content will determine the amount of memory artemis uses.

Ex: If a table has 5 columns and 1000 pages and provide 1000 pages to getRows(), artemis will return back all of the data.
This **may** be ok. If the 5 columns only have numbers or small text then it **probably** will not require a lot of memory.

However, if each column contain 1MB of data and there are 1000 rows, then artemis will end up using a lot of memory.

:::

Since the Current.mdb database can potentially be very large we do not want to parse all pages at once.
We will need to parse them in chunks.

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese.ts";
import { WindowsError } from "./artemis-api/src/windows/errors.ts";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  // Get array of Catalog entries
  const catalog = ese.catalogInfo();
  if (catalog instanceof WindowsError) {
    return catalog;
  }

  const name = "CLIENTS";
  const info = ese.tableInfo(catalog, name);

  const pages = ese.getPages(info.table_page);
  if (pages instanceof WindowsError) {
    return;
  }

  console.log(pages.length);

  const chunk_limit = 80;
  let page_chunks = [];

  // Instead of using all pages at once. Divide the pages into smaller chunks and parse them
  for (const page of pages) {
    if (page_chunks.length != chunk_limit) {
      page_chunks.push(page);
      continue;
    }
    // getRows() returns Record<string, EseTable[][]>
    const data = ese.getRows(page_chunks, info);
    if (data instanceof WindowsError) {
      return;
    }

    console.log(data["CLIENTS"].length);

    // Go through all rows
    for (const row of data["CLIENTS"]) {
      // Go through all columns
      for (const column of row) {
        console.log(
          `Name: ${column.column_name} - Type: ${column.column_type} - Data: ${column.column_data}`
        );
      }
    }

    page_chunks = [];
  }

  // Just in case we have any leftover pages
  if (page_chunks.length != 0) {
    const data = ese.getRows(page_chunks, info);
    if (data instanceof WindowsError) {
      return;
    }

    console.log(data["CLIENTS"].length);
  }
}

main();
```

The above code puts our pages into smaller chunks before calling the function getRows(), this allows to us to get all of the data associated with the CLIENTS table while keeping memory usage low.

Additional details on ColumnTypes and EseTable structure can be found [here](../../Artifacts/Windows%20Artfacts/ese.md)

:::info

There is no perfect number when deciding the number of pages to provide to getRows(). In general the higher the page number the faster artemis will be when parsing the database but at the cost of memory usage.

If you do not know what kind of data is an ESE database table:

- Review the TableInfo object!
- A safe page number would probably be between 50-100

For additional background, the Windows Search database contains almost 600 columns and can grow to be very very large.
Artemis uses 400 page chunks to parse the Search database, which uses ~800-900MBs of memory.

:::
