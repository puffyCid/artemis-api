export interface VeloExecution {
    evidence: string;
    pid: number;
    message: string;
    datetime: string;
    provider: string;
    event_id: number;
    thread_id: number;
    event: string;
    path: string;
    arguments: string[];
    timestamp_desc: "Velociraptor Executed";
    artifact: "Velociraptor EventLog";
    data_type: "windows:eventlogs:velociraptor:entry";
}

export interface VeloRaw {
    event_record_id: number,
    timestamp: string,
    data: {
        Event: {
            "#attributes": {
                xmlns: string
            },
            System: {
                Provider: {
                    "#attributes": {
                        Name: string,
                        Guid: string
                    }
                },
                EventID: {
                    "#attributes": {
                        Qualifiers: number
                    },
                    "#text": number,
                },
                Version: number,
                Level: number,
                Task: number,
                Opcode: number,
                Keywords: string,
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string,
                    }
                },
                EventRecordID: number,
                Execution: {
                    "#attributes": {
                        ProcessID: number,
                        ThreadID: number
                    }
                },
                Channel: string,
                Computer: string,
            },
            EventData: {
                Data: {
                    "#text": string,
                },
            }
        }
    },
    evidence: string;
}
