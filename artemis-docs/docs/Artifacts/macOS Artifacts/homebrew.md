---
description: Homebrew package manager
keywords:
  - macOS
  - plaintext
---

# Homebrew

Homebrew is a popular package manager for macOS systems. Artemis supports
getting a list of installed Homebrew packages and Casks from the default
Homebrew paths.

- /usr/local/Cellar
- /opt/homebrew/Cellar
- /usr/local/Caskroom/
- /opt/homebrew/Caskroom

You may also provide an optional alternative path to Homebrew directory.,

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get
installed Homebrew applications.

# Sample API Script

```typescript
import {
  getCasks,
  getHomebrewInfo,
  getPackages,
} from "./artemis-api/mod.ts";

async function main() {
  // Get all packages and Casks
  const all_data = getHomebrewInfo();
  // Get only packages
  const packages = getPackages();
  // Get only Casks
  const casks = getCasks();

  console.log(all_data);
}
```

# Output Structure

A `HomebrewData` object structure

```typescript
export interface HomebrewReceipt extends HomebrewFormula {
  installedAsDependency: boolean;
  installedOnRequest: boolean;
  installTime: string;
  sourceModified: string;
  name: string;
}

export interface HomebrewFormula {
  description: string;
  homepage: string;
  url: string;
  license: string;
  caskName: string;
  formulaPath: string;
  version: string;
}

export interface HomebrewData {
  packages: HomebrewReceipt[];
  casks: HomebrewFormula[];
}
```
