/**History of files in VSCode */
export interface FileHistory {
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
  /**Time when file was saved */
  timestamp: number | string ;
  /**Based64 encoded file content */
  content: string;
}

export interface Extensions {
  path: string;
  data: Record<string, unknown>[];
}
