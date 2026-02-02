export interface KnownHosts {
    target: string;
    algorithm: string;
    data: string;
    source: string;
    created: string;
    modified: string;
    accessed: string;
    changed: string;
    message: string;
    datetime: string;
    timestamp_desc: "SSH Config Modified";
    artifact: "SSH Config";
    data_type: "unix:ssh:config:entry";
}