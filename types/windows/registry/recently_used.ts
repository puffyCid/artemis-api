import { ShellItems } from "../shellitems.ts";

export interface Mru {
    ntuser_path: string;
    kind: MruType;
    mru: MruValues[]
}

export interface MruValues {
    /**Filename of MRU entry*/
    filename: string;
    /**Path to MRU entry */
    path: string;
    /**Created time of MRU entry in UNIXEPOCH seconds */
    created: number;
    /**Modified time of MRU entry in UNIXEPOCH seconds */
    modified: number;
    /**Accessed time of MRU entry in UNIXEPOCH seconds */
    accessed: number;
    /**All ShellItems that make up the MRU entry */
    items: ShellItems[];
}

export enum MruType {
    LASTVISITED = "LastVisisted",
    OPENSAVE = "OpenSave",
    RECENTDOCS = "RecentDocs"
}