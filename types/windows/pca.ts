export interface ProgramCompatabilityAssist {
    last_run: string;
    path: string;
    run_status: number;
    file_description: string;
    vendor: string;
    version: string;
    program_id: string;
    exit_message: string;
    pca_type: PcaType;
    message: string;
    datetime: string;
    source: string;
    timestamp_desc: "Last Run";
    artifact: "Windows Program Compatability Assist";
    data_type: "windows:pca:entry";
}

export enum PcaType {
    AppLaunch = "AppLaunch",
    General = "General",
}