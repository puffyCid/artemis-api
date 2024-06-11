---
description: Various shell history metadata
keywords:
  - linux
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

artemis supports parsing `zsh` and `bash` shell history. In addition, it
supports parsing `Python` history (despite not being a shell).

Other parsers:

- Any program that read a text file

References:

- [Bash](https://linuxhint.com/bash_command_history_usage/)
- [Zsh](https://www.soberkoder.com/better-zsh-history/)

# TOML Collection

```toml
system = "macos" # or "linux"

[output]
name = "shellhistory_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "shell_history"
```

# Collection Options

- N/A

# Output Structure

An array of `BashHistory` for bash data, `ZshHistory` for zsh data, and
`PythonHistory` for Python data per user.

```typescript
export interface BashHistory {
  /**Array of lines associated with `.bash_history` file */
  history: BashData[];
  /**Path to `.bash_history` file */
  path: string;
  /**User directory name */
  user: string;
}

/**
 * History data associated with `.bash_history`
 */
export interface BashData {
  /**Line entry */
  history: string;
  /**Timestamp associated with line entry. Timestamps are **optional** in `.bash_history` */
  timestamp: string;
  /**Line number */
  line: number;
}

export interface ZshHistory {
  /**Array of lines associated with `.zs_history` file */
  history: ZshData[];
  /**Path to `.zsh_history` file */
  path: string;
  /**User directory name */
  user: string;
}

/**
 * History data associated with `.zsh_history`
 */
export interface ZshData {
  /**Line entry */
  history: string;
  /**Timestamp associated with line entry. Timestamps are **optional** in `.zsh_history` */
  timestamp: string;
  /**Line number */
  line: number;
  /**Duration of command */
  duration: number;
}

export interface PythonHistory {
  /**Array of lines associated with `.python_history` file */
  history: PythonData[];
  /**Path to `.python_history` file */
  path: string;
  /**User directory name */
  user: string;
}

/**
 * History data associated with `.python_history`
 */
export interface PythonData {
  /**Line entry */
  history: string;
  /**Line number */
  line: number;
}
```
