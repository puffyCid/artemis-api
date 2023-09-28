---
description: macOS configuration files
keywords:
  - macOS
  - binary
  - plaintext
---

# Plist

macOS property lists (`plist`) are the primary format for application
configurations. The contents of `plists` can be: xml, json, or binary. XML is
most common.

# TOML Collection

There is no way to collect `plist` data with artemis instead it is an feature
for scripting. See the [scripts](../../Intro/Scripting/scripts.md) chapter for
examples.

# Configuration Optaions

N/A

# Output Structure

A JSON representation of the `plist` contents

```typescript
Record<String, unknown>;
```
