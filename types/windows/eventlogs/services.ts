export interface ServiceInstalls {
  name: string;
  image_path: string;
  service_type: string;
  start_type: string;
  account: string;
  hostname: string;
  timestamp: string;
  process_id: number;
  thread_id: number;
  sid: string;
}

export interface RawService7045 {
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
            EventSourceName: string;
          };
        };
        EventID: number | {
          "#attributes": {
            Qualifiers: number;
          };
          "#text": number;
        };
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
        Execution: {
          "#attributes": {
            ProcessID: number;
            ThreadID: number;
          };
        };
        Channel: string;
        Computer: string;
        Security: {
          "#attributes": {
            UserID: string;
          };
        };
      };
      EventData: {
        ServiceName: string;
        ImagePath: string;
        ServiceType: string;
        StartType: string;
        AccountName: string;
      };
    };
  };
}
