/**History of files in VSCode */
interface FileHistory {
  /**Version of History format */
  version: number;
  /**To source file */
  path: string;
  /**History of source file */
  entries: Entries[];
  /**Path to history source */
  history_path: string;
}

/**
 * Metadata related to file history entry
 */
interface Entries {
  /**Name of history file */
  id: string;
  /**Time when file was saved in UNIXEPOCH milliseconds */
  timestamp: number;
  /**Based64 encoded file content */
  content: string;
}
