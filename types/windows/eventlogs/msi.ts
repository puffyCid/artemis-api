export interface MsiInstalled {
    name: string;
    language: number;
    version: string;
    mnufacturer: string;
    installation_status: number;
    hostname: string;
    sid: string;
    pid: number;
    thread_id: number;
    message: string;
    datetime: string;
    timestamp_desc: "MSI Installed";
    artifact: "EventLog MSI Installed 1033";
    data_type: "windows:eventlog:application:msi";
    evidence: string;
}

export interface RawMsiInstalled {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string
            }

            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                    }
                } | string
                EventID: {
                    "#attributes": {
                        Qualifiers: number;
                    }
                    "#text": number;
                } | number
                Version: number;
                Level: number;
                Task: number;
                Keywords: string;
                Opcode: number;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                Execution: {
                    "#attributes": {
                        ProcessID: number;
                        ThreadID: number;
                    }
                }
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                };
                Channel: string;
                Computer: string;
                Security: {
                    "#attributes": {
                        "UserID": string;
                    }
                };
            }
            EventData: {
                Data: {
                    "#text": string[];
                }
                Binary: string;
            }
        }
    }
}