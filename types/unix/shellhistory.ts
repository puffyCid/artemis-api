/**
 * `Bash` (Bourne Again Shell) is a shell environment extremely common on Unix and Linux systems.
 * For most endpoints `Bash` will record commands executed in a history file called `.bash_history`
 *
 * A `.bash_history`file can exist per user on an endpoint
 */
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
  /**Timestamp associated with line entry in UNIXEPOCH. Timestamps are **optional** in `.bash_history`, zero (0) is returned for no timestamp */
  timestamp: number;
  /**Line number */
  line: number;
}

/**
 * `Zsh` (Z Shell) is a shell environment common on Unix and Linux systems. It is the default shell for macOS.
 * For most endpoints `Zsh` will record commands executed in a history file called `.zsh_history`
 *
 * A `.zsh_history`file can exist per user on an endpoint
 */
export interface ZshHistory {
  /**Array of lines associated with `.zs_history` file */
  history: ZshData[];
  /**Path to `.bash_history` file */
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
  /**Timestamp associated with line entry in UNIXEPOCH. Timestamps are **optional** in `.zsh_history`, zero (0) is returned for no timestamp */
  timestamp: number;
  /**Line number */
  line: number;
  /**Duration of command */
  duration: number;
}

/**
 * `Python` is a popular programming language.
 * For most endpoints `Python` will record commands executed in its iteractive shell environment in a history file called `.python_history`
 *
 * A `.python_history`file can exist per user on an endpoint
 */
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
