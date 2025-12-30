/**History of files in VSCode */
export interface FileHistory {
  /**Version of History format */
  version: number;
  /**To source file */
  path?: string;
  /**Path to source file */
  resource: string;
  /**Path to history source */
  history_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "File Saved";
  artifact: "File History";
  data_type: "applications:vscode:filehistory:entry";
  /**Name of history file */
  id: string;
  /**Time when file was saved */
  file_saved: number | string;
  /**Based64 encoded file content */
  content?: string;
  source?: string;
  sourceDescription?: string;
  [ key: string ]: unknown;
}

/**
 * Metadata related to file history entry
 */
export interface Entries {
  /**Name of history file */
  id: string;
  /**Time when file was saved */
  timestamp: number | string;
  /**Based64 encoded file content */
  content: string;
  source?: string;
  sourceDescription?: string;
}

export interface Extensions {
  path: string;
  data: Record<string, unknown>[];
}


export interface RecentFiles {
  path_type: RecentType;
  path: string;
  enabled: boolean;
  label: string;
  external: string;
  storage_path: string;
}

export enum RecentType {
  File = "File",
  Folder = "Folder"
}

export interface VscodeStorage {
  lastKnownMenubarData: {
    menus: {
      File: {
        items: {
          id: string;
          label: string;
          submenu?: {
            items: {
              id: string;
              label?: string;
              enabled?: boolean;
              uri?: {
                external: string;
                path: string;
                scheme: string;
              };
            }[];
          };
        }[];
      };
    };
  };
}