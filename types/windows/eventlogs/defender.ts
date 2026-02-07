export interface EventLogDefenderQuarantine {
    threat_name: string;
    threat_id: number;
    path: string;
    thread_id: number;
    process_id: number;
    product_name: string;
    product_version: string;    
    detection_id: string;
    detection_time: string;
    severity_id: number;
    severity_name: string;
    category_id: number;
    category_name: string;
    fwlink: string;
    status_code: number;
    status_description: string;
    state: number;
    source_id: number;
    source_name: string;
    process_name: string;
    detection_user: string;
    origin_id: number;
    origin_name: string;
    execution_id: number;
    execution_name: string;
    type_id: number;
    type_name: string;
    pre_execution_status: number;
    action_id: number;
    action_name: string;
    error_code: string;
    error_description: string;
    post_clean_status: number;
    additional_actions_id: number;
    additional_actions_string: string;
    remediation_user: string;
    message: string;
    datetime: string;
    security_intelligence_version: string;
    av_version: string;
    anti_spyware_version: string;
    network_inspection_version: string;
    engine_version: string;
    anti_malware_version: string;
    network_inspection_engine_version: string;
    event_id: number;
    timestamp_desc: "Malware Detected" | "Malware Remediated";
    artifact: "Malware Detection";
    data_type: "windows:eventlogs:defender:entry";
    evidence: string;
}

export interface RawDefenderQuarantine {
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
        Security: unknown;
      };
      EventData: {
        "Product Name": string;
        "Product Version": string;
        "Detection ID": string;
        "Detection Time": string;
        Unused: string;
        Unused2: string;
        "Threat ID": string;
        "Threat Name": string;
        "Severity ID": string;
        "Severity Name": string;
        "Category ID": string;
        "Category Name": string;
        FWLink: string;
        "Status Code": string;
        "Status Description": string;
        State: string;
        "Source ID": string;
        "Source Name": string;
        "Process Name": string;
        "Detection User": string;
        Unused3: string;
        Path: string;
        "Origin ID": string;
        "Origin Name": string;
        "Execution ID": string;
        "Execution Name": string;
        "Type ID": string;
        "Type Name": string;
        "Pre Execution Status": string;
        "Action ID": string;
        "Action Name": string;
        Unused4: string;
        "Error Code": string;
        "Error Description": string;
        Unused5: string;
        "Post Clean Status": string;
        "Additional Actions ID": string;
        "Additional Actions String": string;
        "Remediation User": string;
        Unused6: string;
        "Security intelligence Version": string;
        "Engine Version": string;
      };
    };
  };
}