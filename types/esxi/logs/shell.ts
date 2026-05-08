export interface ShellHistory {
    message: string;
    datetime: string;
    timestamp_desc: "Shell Command Execution";
    artifact: "ESXi Shell History";
    data_type: "esxi:shell:entry";
    pid: number;
    account: string;
    command: string;
    evidence: string;
    category: string;
}