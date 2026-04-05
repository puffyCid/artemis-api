---
description: Interact with ESXi Artifacts
---

# ESXi

These functions can be used to pull data related to ESXi artifacts.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { getVibs } from "./artemis-api/mod";

function main() {

  const results = getVibs();
  console.log(JSON.stringify(results));
  return results;
}

main();
```

### getVibs(alt_path?: string) -> Vib[] | EsxiError

Get info of installed VIBs on the system. You may provide an optional alternative
glob to the directory containing VIB xml files.


| Param    | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| alt_path | string | Optional glob to VIB xml files  |


### sysLogEsxi(alt_path?: string) -> Syslog[] | EsxiError

Get ESXi syslog entries. You may provide an optional alternative
glob to the syslog.log file.


| Param    | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| alt_path | string | Optional glob to syslog.log file  |


### shellLogHistory(alt_path?: string) -> ShellHistory[] | EsxiError

Get ESXi shell.log entries. You may provide an optional alternative
glob to the shell.log file.


| Param    | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| alt_path | string | Optional glob to shell.log file  |


### esxiAccounts(alt_path?: string) -> Users[] | EsxiError

Get ESXi user accounts. You may provide an optional alternative
path to the file /etc/passwd.


| Param    | Type   | Description                       |
| -------- | ------ | -----------------------=---------- |
| alt_path | string | Optional path to /etc/passwd file  |