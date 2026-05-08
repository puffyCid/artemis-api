export interface Syslog {
    message: string;
    datetime: string;
    timestamp_desc: "Syslog Entry Generated";
    artifact: "ESXi Syslog";
    data_type: "esxi:syslog:entry";
    pid: number;
    evidence: string;
    category: string;
    process: string;
}