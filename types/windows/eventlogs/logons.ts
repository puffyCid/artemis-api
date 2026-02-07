export interface LogonsWindows {
  logon_type: LogonType;
  sid: string;
  account_name: string;
  account_domain: string;
  logon_id: string;
  logon_process: string;
  authentication_package: string;
  source_ip: string;
  source_workstation: string;
  eventlog_generated: string;
  message: string;
  datetime: string;
  timestamp_desc: "Account Logon" | "Account Logoff";
  artifact: "Logon EventLog" | "Logoff EventLog";
  data_type: "windows:eventlogs:logon:entry" | "windows:eventlogs:logoff:entry";
}

export interface Raw4624Logons {
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
        EventID: number;
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
        };
        Channel: string;
        Computer: string;
        Security: unknown;
      };
      EventData: {
        SubjectUserSid: string;
        SubjectUserName: string;
        SubjectDomainName: string;
        SubjectLogonId: string;
        TargetUserSid: string;
        TargetUserName: string;
        TargetDomainName: string;
        TargetLogonId: string;
        LogonType: number;
        LogonProcessName: string;
        AuthenticationPackageName: string;
        WorkstationName: string;
        LogonGuid: string;
        TransmittedServices: string;
        LmPackageName: string;
        KeyLength: number;
        ProcessId: string;
        ProcessName: string;
        IpAddress: string;
        IpPort: string;
        ImpersonationLevel: string;
        RestrictedAdminMode: string;
        TargetOutboundUserName: string;
        TargetOutboundDomainName: string;
        VirtualAccount: string;
        TargetLinkedLogonId: string;
        ElevatedToken: string;
      };
    };
  };
}

export interface Raw4634Logoffs {
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
        EventID: number;
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
        Correlation: unknown;
      };
      Execution: {
        "#attributes": {
          ProcessID: number;
          ThreadID: number;
        };
      };
      Channel: string;
      Computer: string;
      Security: unknown;
      EventData: {
        TargetUserSid: string;
        TargetUserName: string;
        TargetDomainName: string;
        TargetLogonId: string;
        LogonType: number;
      };
    };
  };
}

export enum LogonType {
  Network = "Network",
  Interactive = "Interactive",
  Batch = "Batch",
  Service = "Service",
  Unlock = "Unlock",
  NetworkCleartext = "NetworkCleartext",
  NewCredentials = "NewCredentials",
  RemoteInteractive = "RemoteInteractive",
  CacheInteractive = "CacheInteractive",
  Unknown = "Unknown",
}
