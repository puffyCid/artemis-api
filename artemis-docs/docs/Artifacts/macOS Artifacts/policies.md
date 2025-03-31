---
description: macOS system policies
keywords:
  - macOS
  - plist
---

# Policies

Artemis supports parsing some macOS policies applied to the system. Currently
artemis supports parsing the following policies:

- Password Policy

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get macOS
policies.

# Sample API Script

```typescript
import {
  passwordPolicy,
} from "./artemis-api/mod";

async function main() {
  const results = passwordPolicy();

  console.log(results);
}
```

# Output Structure

An array of `PasswordPolicy`

```typescript
export interface PasswordPolicy {
  policy_id: string;
  policy_content: string;
  policy_description: string;
}
```
