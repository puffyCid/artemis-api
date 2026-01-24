export interface Bam {
    key_path: string;
    reg_path: string;
    sid: string;
    path: string;
    last_execution: string;
    message: string;
    datetime: string;
    timestamp_desc: "Last Execution";
    artifact: "Windows Background Activity Monitor";
    data_type: "windows:registry:bam:entry";
}