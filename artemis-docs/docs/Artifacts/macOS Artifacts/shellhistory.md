---
description: Various shell history metadata
keywords:
  - macOS
  - plaintext
---

# Shell History

Many Unix and Linux like systems provide a shell interface that allows a user to
execute a command or application. Many of these shell interfaces keep a record
of the command executed and depending on the configuration the timestamp when
the command was executed. Popular shells include:

- bash
- zsh
- fish
- sh
- PowerShell

Artemis supports parsing zsh and bash shell history.

Other parsers:

- Any program that read a text file

References:

- [Bash](https://linuxhint.com/bash_command_history_usage/)
- [Zsh](https://www.soberkoder.com/better-zsh-history/)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse Shell History files.

```typescript
import { getBashHistory, getZshHistory, PlatformType } from "./artemis-api/mod";

function main() {
  let results = getBashHistory(PlatformType.Darwin);
  console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `BashHistory` for bash data, `ZshHistory` for zsh data

```typescript
export interface BashHistory {
  /**Line entry */
  history: string;
  /**Timestamp associated with line entry. Timestamps are **optional** in `.bash_history` */
  timestamp: string;
  /**Line number */
  line: number;
  /**Path to `.bash_history` file */
  path: string;
}

export interface ZshHistory {
  /**Line entry */
  history: string;
  /**Timestamp associated with line entry. Timestamps are **optional** in `.zsh_history` */
  timestamp: string;
  /**Line number */
  line: number;
  /**Path to `.zsh_history` file */
  path: string;
}
```
