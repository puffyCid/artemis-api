import { DirectoryTree } from "../../src/filesystem/tree";

export interface RustDeskProfiles {
    /**
     * `DirectoryTree` to the base of the RustDesk directory
     */
    tree: DirectoryTree;
    /** Remote ID associated with application */
    remote_id: string;
}

export interface RustDeskLogs {
    evidence: string;
    message: string;
    datetime: string;
    level: string;
    code_path: string;
    local_time: string;
    remote_id: string;
    timestamp_desc: "Log Event";
    artifact: "RustDesk Log";
    data_type: "applications:rustdesk:log:entry";
}