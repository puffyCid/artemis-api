---
description: Interacting with Environment Variables
---

# Environment APIs

These functions can be used to get Environment variable(s) data

### listEnv() -> Record&lt;string, string&gt;

Get all Environment variables associated with the artemis process

### getEnvValue(key) -> string

Get a single Environment variable value. Returns empty string if variable does
not exist

| Param | Type   | Description                           |
| ----- | ------ | ------------------------------------- |
| key   | string | Environment variable name to get info |
