export interface AppCrash {
    timestamp_desc: "Application Crash";
    artifact: "AppCrash File";
    data_type: "windows:app:crash:entry";
    evidence: string;
    message: string;
    path: string;
    datetime: string;
    report_id: string;
    report_type: number;
    application_name: string;
}