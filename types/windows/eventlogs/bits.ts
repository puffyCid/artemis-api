export interface BitsEvent {
    status: BitsState;
    evidence: string;
    job_id: string;
    process: string;
    pid: number;
    user: string;
    title: string;
    message: string;
    datetime: string;
    file_count: number;
    provider: string;
    event_id: number;
    bits_event_time: string;
    activity_id: string;
    thread_id: number;
    bytes_transferred: number;
    timestamp_desc: "BITS Job Created" | "BITS Job Completed";
    artifact: "BITS EventLog";
    data_type: "windows:eventlogs:bits:entry";
}

export enum BitsState {
    Completed = "Complete",
    Created = "Created",
}

export interface RawBitsCreate {
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
                jobTitle: string,
                jobId: string,
                jobOwner: string,
                processPath: string,
                processId: number,
                ClientProcessStartKey: number
            }
        }
    },
    evidence: string;
}

export interface RawBitsComplete {
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
                jobTitle: string,
                jobId: string,
                jobOwner: string,
                user: string,
                fileCount: number,
                bytesTransferred: number,
            }
        }
    },
    evidence: string;
}