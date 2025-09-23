export interface AnyDeskUsers {
    user_path: string;
    version: string;
    account: string;
    id: string;
}

/**
 * Object representing a Trace log entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface TraceEntry {
    message: string;
    datetime: string;
    timestamp_desc: "Trace Entry";
    artifact: "AnyDesk Trace Log";
    data_type: "applications:anydesk:trace:entry";
    path: string;
    level: string;
    entry_timestamp: string;
    component: string;
    code_function: string;
    pid: number;
    ppid: number;
    subfunction: string;
    log_message: string;
    account: string;
    version: string;
    id: string;
}

export interface Config {
    message: string;
    datetime: string;
    timestamp_desc: "Config Created";
    artifact: "AnyDesk Config";
    data_type: "applications:anydesk:config:entry";
    [key:string]: string;
}