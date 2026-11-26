import { DirectoryTree } from "../../src/filesystem/tree";

export interface SyncthingProfile {
    /**
     * `DirectoryTree` to the base of the Syncthing directory
     */
    tree: DirectoryTree;
}

export interface SyncthingLogs {
    tag: string;
    datetime: string;
    timestamp_desc: "Syncthing Log Entry (Local Time)";
    level: string;
    message: string;
    artifact: "Syncthing Log";
    data_type: "application:syncthing:log:entry";
    evidence: string;
}