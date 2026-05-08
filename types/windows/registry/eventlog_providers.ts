export interface RegistryEventlogProviders {
    key_path: string;
    name: string;
    channel_names: string[];
    message_file: string;
    last_modified: string;
    parameter_file: string;
    guid: string;
    enabled: boolean;
    channel_types: ChannelType[];
    message: string;
    datetime: string;
    timestamp_desc: "Registry Last Modified";
    artifact: "Windows EventLog Provider";
    data_type: "windows:registry:eventlogprovider:entry";
    evidence: string;
}

export enum ChannelType {
    Admin = "Admin",
    Operational = "Operational",
    Analytic = "Analytic",
    Debug = "Debug",
    Unknown = "Unknown",
}