---
description: Windows Defender Quarantine events
keywords:
  - windows
  - eventlogs
---

# Defender Quarantine

Artemis supports extracting Defender quarantine entries from the Windows EventLog
Microsoft-Windows-Windows Defender%4Operational.evtx file. 

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Defender Quarantine entries.

## Sample API Script

```typescript
import { defenderQuarantineEventLog, } from "./artemis-api/mod";

function main() {
    const results = defenderQuarantineEventLog();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `EventLogDefenderQuarantine`

```typescript
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
```
