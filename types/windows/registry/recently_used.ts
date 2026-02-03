import { ShellItems } from "../shellitems";

export interface Mru {
  ntuser_path: string;
  kind: MruType;
  /**Filename of MRU entry*/
  filename: string;
  /**Path to MRU entry */
  path: string;
  /**Created time of MRU entry */
  created: string;
  /**Modified time of MRU entry */
  modified: string;
  /**Accessed time of MRU entry */
  accessed: string;
  /**All ShellItems that make up the MRU entry */
  items: ShellItems[];
  message: string;
  datetime: string;
  timestamp_desc: "MRU Entry Created";
  artifact: "Windows Most Recently Used" | "MRU Open Save" | "MRU Last Visit" | "MRU Recent Docs";
  data_type: "windows:registry:mru:entry";
}

export interface MruValues {
  /**Filename of MRU entry*/
  filename: string;
  /**Path to MRU entry */
  path: string;
  /**Created time of MRU entry */
  created: string;
  /**Modified time of MRU entry */
  modified: string;
  /**Accessed time of MRU entry */
  accessed: string;
  /**All ShellItems that make up the MRU entry */
  items: ShellItems[];
}

export enum MruType {
  LASTVISITED = "LastVisited",
  OPENSAVE = "OpenSave",
  RECENTDOCS = "RecentDocs",
}
