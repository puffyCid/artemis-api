/**
 * Object representing a reassembled process tree from 4688 Security EventLog
 * This object is Timesketch compatible.  It does **not** need to be timeline
 */
export interface EventLogProcessTree {
    pid: number;
    parent_pid: number;
    process_name: string;
    process_path: string;
    parent_name: string;
    parent_path: string;
    user: string;
    sid: string;
    domain: string;
    commandline: string;
    /**Complete process tree for a process */
    message: string;
    datetime: string;
    timestamp_desc: "EventLog Generated";
    artifact: "EventLogs Process Tree";
    evtx_path: string;
    data_type: "windows:eventlogs:proctree:entry";
    record: number;
    logon_id: number;
}

export interface RawProcess {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    }
                }
                EventID: number;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    }
                }
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    }
                }
                Execution: {
                    "#attributes": {
                        ProcessID: number;
                        ThreadID: number;
                    }
                }
                Channel: string;
                Computer: string;
                Security: {
                    "#attributes": {
                        UserID: string;
                    } | null
                }
            }
            EventData: {
                SubjectUserSid: string;
                SubjectUserName: string;
                SubjectDomainName: string;
                SubjectLogonId: string;
                NewProcessId: string;
                NewProcessName: string;
                TokenElevationType: string;
                ProcessId: string;
                CommandLine?: string;
                TargetUserSid?: string;
                TargetUserName?: string;
                TargetDomainName?: string;
                TargetLogonId?: string;
                ParentProcessName?: string;
                MandatoryLabel?: string;
            }
        }
    }
}
export interface ProcTracker {
    login_id: number;
    pid: number,
    parent: number,
    name: string,
    parent_name: string,
    record: number;
}