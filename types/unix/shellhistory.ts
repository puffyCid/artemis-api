/**
 * `Bash` (Bourne Again Shell) is a shell environment extremely common on Unix and Linux systems.
 * For most endpoints `Bash` will record commands executed in a history file called `.bash_history`
 *
 * A `.bash_history`file can exist per user on an endpoint
 */
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

/**
 * `Zsh` (Z Shell) is a shell environment common on Unix and Linux systems. It is the default shell for macOS.
 * For most endpoints `Zsh` will record commands executed in a history file called `.zsh_history`
 *
 * A `.zsh_history`file can exist per user on an endpoint
 */
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


/**
 * `Python` is a popular programming language.
 * For most endpoints `Python` will record commands executed in its interactive shell environment in a history file called `.python_history`
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
