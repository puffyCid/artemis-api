export interface RdpActivity {
    session_id: number;
    user: string;
    domain: string;
    account: string;
    source_ip: string;
    logon_time: string;
    logoff_time: string;
    hostname: string;
    /** RDP Session duration in seconds */
    duration: number;
    message: string;
    datetime: string;
    timestamp_desc: "RDP Logon" | "RDP Reconnect";
    artifact: "RDP EventLog";
    reconnections: number;
    disconnections: number;
    session_arbitration_started: string;
    session_arbitration_ended: string;
    data_type: "windows:eventlogs:rdp:entry";
}

export interface Raw21Logons {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string;
            };
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    };
                };
                EventID: 21;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                } | null;
                Channel: string;
                Computer: string;
                Security: unknown;
            };
            UserData: {
                EventXML: {
                    User: string;
                    SessionID: number;
                    Address: string;
                    "#attributes": {
                        xmlns: string;
                    };
                }

            };
        };
    };
}

export interface Raw25Reconnect {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string;
            };
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    };
                };
                EventID: 25;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                } | null;
                Channel: string;
                Computer: string;
                Security: unknown;
            };
            UserData: {
                EventXML: {
                    User: string;
                    SessionID: number;
                    Address: string;
                    "#attributes": {
                        xmlns: string;
                    };
                }

            };
        };
    };
}

export interface Raw23Logoff {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string;
            };
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    };
                };
                EventID: 23;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                } | null;
                Channel: string;
                Computer: string;
                Security: unknown;
            };
            UserData: {
                EventXML: {
                    User: string;
                    SessionID: number;
                    "#attributes": {
                        xmlns: string;
                    };
                }

            };
        };
    };
}

export interface Raw24Disconnect {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string;
            };
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    };
                };
                EventID: 24;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                } | null;
                Channel: string;
                Computer: string;
                Security: unknown;
            };
            UserData: {
                EventXML: {
                    SessionID: number;
                    User: string;
                    Address: string;
                    "#attributes": {
                        xmlns: string;
                    };
                }

            };
        };
    };
}

export interface Raw41SessionStart {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string;
            };
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    };
                };
                EventID: 41;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                } | null;
                Channel: string;
                Computer: string;
                Security: unknown;
            };
            UserData: {
                EventXML: {
                    SessionID: number;
                    User: string;
                    "#attributes": {
                        xmlns: string;
                    };
                }

            };
        };
    };
}

export interface Raw42SessionEnd {
    event_record_id: number;
    timestamp: string;
    data: {
        Event: {
            "#attributes": {
                xmlns: string;
            };
            System: {
                Provider: {
                    "#attributes": {
                        Name: string;
                        Guid: string;
                    };
                };
                EventID: 42;
                Version: number;
                Level: number;
                Task: number;
                Opcode: number;
                Keywords: string;
                TimeCreated: {
                    "#attributes": {
                        SystemTime: string;
                    };
                };
                EventRecordID: number;
                Correlation: {
                    "#attributes": {
                        ActivityID: string;
                    };
                } | null;
                Channel: string;
                Computer: string;
                Security: unknown;
            };
            UserData: {
                EventXML: {
                    SessionID: number;
                    User: string;
                    "#attributes": {
                        xmlns: string;
                    };
                }

            };
        };
    };
}