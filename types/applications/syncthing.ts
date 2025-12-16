export interface SyncthingClient {
    full_path: string;
}

export interface SyncthingLogs {
    full_path: string;
    tag: string;
    datetime: string;
    timestamp_desc: "Syncthing Log Entry";
    level: string;
    message: string;
    artifact: "Syncthing Log";
    data_type: "application:syncthing:log:entry";
}