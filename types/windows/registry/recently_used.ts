import { ShellItems } from "../shellitems";

export interface Mru {
  ntuser_path: string;
  kind: MruType;
  mru: MruValues[];
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
  LASTVISITED = "LastVisisted",
  OPENSAVE = "OpenSave",
  RECENTDOCS = "RecentDocs",
}
