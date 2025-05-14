export interface Scriptblock {
    total_parts: number;
    message: string;
    timestamp: string;
    datetime_desc: string;
    entry_type: string;
    id: string;
    source_file: string;
    path: string;
    script_length: number;
    has_signature_block: boolean;
    has_copyright_string: boolean;
    hostname: string;
    version: number;
    activity_id: string;
    channel: string;
    user_id: string;
    process_id: number;
    threat_id: number;
    system_time: string;
    created_time: string;
}

export interface RawBlock {
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
                    }
                }
            }
            EventData: {
                MessageNumber: number;
                MessageTotal: number;
                ScriptBlockText: string;
                ScriptBlockId: string;
                Path: string;
            }
        }
    }
}