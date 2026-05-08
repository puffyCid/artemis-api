export interface RustDeskUsers {
    config_path: string;
    logs_path: string;
    version: string;
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