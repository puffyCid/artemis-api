---
description: Users in the SAM Registry file
keywords:
  - windows
  - registry
  - accounts
---

# Users

Gets user info from SAM Registry file

Other Parsers:

- Any tool that queries user info

References:

- N/A

# TOML Collection

```toml
system = "windows"

[output]
name = "users_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "users"
[artifacts.users]
# Optional
# alt_file = "C:\\Artifacts\\SAM"
```

# Collection Options

- `alt_file` Full path to alternative SAM Registry file. This configuration is
  **optional**. By default artemis will parse the SAM Registry file at its
  default location.

# Output Structure

An array of `UserInfo` entries

```typescript
export interface UserInfo {
  /**Last logon for account */
  last_logon: number;
  /**Time when password last set in UNIXEPOCH seconds */
  password_last_set: number;
  /**Last password failure in UNIXEPOCH seconds */
  last_password_failure: number;
  /**Relative ID for account. Typically last number of SID */
  relative_id: number;
  /**Primary group ID for account */
  primary_group_id: number;
  /**UAC flags associated with account */
  user_account_control_flags: string[];
  /**Country code for account */
  country_code: number;
  /**Code page for account */
  code_page: number;
  /**Number of password failures associated with account */
  number_password_failures: number;
  /**Number of logons for account */
  number_logons: number;
  /**Username for account */
  username: string;
  /**SID for account */
  sid: string;
}
```
