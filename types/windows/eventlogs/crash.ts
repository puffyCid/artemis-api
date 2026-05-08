export interface CrashEvent {
    evidence: string;
    pid: number;
    path: string;
    application_start: string;
    crash_time: string;
    crash_time_from_start: number;
    hostname: string;
    provider: string;
    guid: string;
    channel: string;
    sid: string;
    trigger: string;
    message: string;
    datetime: string;
    timestamp_desc: "Application Crash";
    artifact: "Crash EventLog";
    data_type: "windows:eventlogs:crash:entry";
}

export interface RawCrash {
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
                EventID: number,
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
                Correlation: {
                    "#attributes": {
                        ActivityID: string,
                    }
                },
                Execution: {
                    "#attributes": {
                        ProcessID: number,
                        ThreadID: number
                    }
                },
                Channel: string,
                Computer: string,
                Security: {
                    "#attributes": {
                        UserID: string
                    }
                }
            },
            EventData: {
                "#attributes": {
                    Name: string
                }
                ProcessId: string,
                ModuleName: string,
                StartTime: bigint,
                CrashTimeFromStart: string,
            }
        }
    },
    evidence: string;
}