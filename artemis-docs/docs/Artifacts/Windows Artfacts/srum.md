---
description: System Resource Utilization Monitor (SRUM) tracks application usage
keywords:
  - windows
  - ese
---

# SRUM

Windows System Resource Utilization Monitor (`SRUM`) is a service that tracks
application resource usage. The service tracks application data such as time
running, bytes sent, bytes received, energy usage, and lots more.<br /> This
service was introduced in Windows 8 and is stored in an ESE database at
`C:\Windows\System32\sru\SRUDB.dat`. On Windows 8 some of the data can be found
in the Registry too (temporary storage before writing to SRUDB.dat), but in
later versions of Windows the data is no longer in the Registry.

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.srum/)

References:

- [Libyal](https://github.com/libyal/esedb-kb/blob/main/documentation/System%20Resource%20Usage%20Monitor%20(SRUM).asciidoc)
- [Velociraptor](https://velociraptor.velocidex.com/digging-into-the-system-resource-usage-monitor-srum-afbadb1a375)

# TOML Collection

```toml
[output]
name = "srum_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "srum"
[artifacts.srum]
# Optional
# alt_path = "C:\Windows\System32\srum\SRUDB.dat"
```

# Collection Options

- `alt_path` An alternative path to the `SRUM` ESE database. This configuration
  is **optional**. By default artemis will use
  `%systemdrive%\Windows\System32\srum\SRUDB.dat`

# Output Structure

An array of entries based on each `SRUM` table

```typescript
/**
 * SRUM table associated with application executions `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}`
 */
export interface ApplicationInfo {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Foreground Cycle time for application */
  foreground_cycle_time: number;
  /**Background Cycle time for application */
  background_cycle_time: number;
  /**Facetime for application */
  facetime: number;
  /**Count of foreground context switches */
  foreground_context_switches: number;
  /**Count of background context switches */
  background_context_switches: number;
  /**Count of foreground bytes read */
  foreground_bytes_read: number;
  /**Count of background bytes read */
  foreground_bytes_written: number;
  /**Count of foreground read operations */
  foreground_num_read_operations: number;
  /**Count of foreground write operations */
  foreground_num_write_options: number;
  /**Count of foreground flushes */
  foreground_number_of_flushes: number;
  /**Count of background bytes read */
  background_bytes_read: number;
  /**Count of background write operations */
  background_bytes_written: number;
  /**Count of background read operations */
  background_num_read_operations: number;
  /**Count of background write operations */
  background_num_write_operations: number;
  /**Count of background flushes */
  background_number_of_flushes: number;
}
```

```typescript
/**
 * SRUM table associated with the timeline of an application's execution `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}`
 */
export interface ApplicationTimeline {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Flags associated with entry */
  flags: number;
  /**End time of entry */
  end_time: string;
  /**Duration of timeline in microseconds */
  duration_ms: number;
  /**Span of timeline in microseconds */
  span_ms: number;
  /**Timeline end for entry */
  timeline_end: number;
  /**In focus value for entry */
  in_focus_timeline: number;
  /**User input value for entry */
  user_input_timeline: number;
  /**Comp rendered value for entry */
  comp_rendered_timeline: number;
  /**Comp dirtied value for entry */
  comp_dirtied_timeline: number;
  /**Comp propagated value for entry */
  comp_propagated_timeline: number;
  /**Audio input value for entry */
  audio_in_timeline: number;
  /**Audio output value for entry */
  audio_out_timeline: number;
  /**CPU value for entry */
  cpu_timeline: number;
  /**Disk value for entry */
  disk_timeline: number;
  /**Network value for entry */
  network_timeline: number;
  /**MBB value for entry */
  mbb_timeline: number;
  /**In focus seconds count */
  in_focus_s: number;
  /**PSM foreground seconds count */
  psm_foreground_s: number;
  /**User input seconds count */
  user_input_s: number;
  /**Comp rendered seconds count */
  comp_rendered_s: number;
  /**Comp dirtied seconds count */
  comp_dirtied_s: number;
  /**Comp propagated seconds count */
  comp_propagated_s: number;
  /**Audio input seconds count */
  audio_in_s: number;
  /**Audio output seconds count */
  audio_out_s: number;
  /**Cycles value for entry */
  cycles: number;
  /**Cycles breakdown value for entry */
  cycles_breakdown: number;
  /**Cycles attribute value for entry */
  cycles_attr: number;
  /**Cycles attribute breakdown for entry */
  cycles_attr_breakdown: number;
  /**Cycles WOB value for entry */
  cycles_wob: number;
  /**Cycles WOB breakdown value for entry */
  cycles_wob_breakdown: number;
  /**Disk raw value for entry */
  disk_raw: number;
  /**Network tail raw value for entry */
  network_tail_raw: number;
  /**Network bytes associated with entry*/
  network_bytes_raw: number;
  /**MBB tail raw value for entry */
  mbb_tail_raw: number;
  /**MBB bytes associated with entry */
  mbb_bytes_raw: number;
  /**Display required seconds count */
  display_required_s: number;
  /**Display required timeline value for entry */
  display_required_timeline: number;
  /**Keyboard input timeline value for entry */
  keyboard_input_timeline: number;
  /**Keyboard input seconds count */
  keyboard_input_s: number;
  /**Mouse input seconds count */
  mouse_input_s: number;
}
```

```typescript
/**
 * SRUM table associated with VFU `{7ACBBAA3-D029-4BE4-9A7A-0885927F1D8F}`. Unsure what this tracks.
 */
export interface AppVfu {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Flags associated with VFU entry */
  flags: number;
  /**Start time associated with VFU entry */
  start_time: string;
  /**End time associated with VFU entry */
  end_time: string;
  /**Base64 encoded usage data associated with VFU entry */
  usage: string;
}
```

```typescript
/**
 * SRUM table associated with EnergyInfo `{DA73FB89-2BEA-4DDC-86B8-6E048C6DA477}`
 */
export interface EnergyInfo {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Base64 encoded binary data associated with EnergyInfo entry */
  binary_data: string;
}
```

```typescript
/**
 * SRUM table associated with EnergyUsage `{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}` and `{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}LT`
 */
export interface EnergyUsage {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Event Timestamp */
  event_timestamp: string;
  /**State transition associated with entry */
  state_transition: number;
  /**Full charged capacity associated with entry */
  full_charged_capacity: number;
  /**Designed capacity associated with entry */
  designed_capacity: number;
  /** Charge level associated with entry */
  charge_level: number;
  /**Cycle count associated with entry */
  cycle_count: number;
  /**Configuration hash associated with entry */
  configuration_hash: number;
}
```

```typescript
/**
 * SRUM table associated with NetworkInfo `{973F5D5C-1D90-4944-BE8E-24B94231A174}`
 */
export interface NetworkInfo {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Interface luid associated with entry */
  interface_luid: number;
  /**L2 profile ID associated with entry */
  l2_profile_id: number;
  /**L2 profile flags associated with entry */
  l2_profile_flags: number;
  /**Bytes sent associated with entry */
  bytes_sent: number;
  /**Bytes received associated with entry */
  bytes_recvd: number;
}
```

```typescript
/**
 * SRUM table associated with NetworkConnectivityInfo `{DD6636C4-8929-4683-974E-22C046A43763}`
 */
export interface NetworkConnectivityInfo {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Interface luid associated with entry */
  interface_luid: number;
  /**L2 profile ID associated with entry */
  l2_profile_id: number;
  /**Connected time associated with entry */
  connected_time: number;
  /*Connect start time associated with entry*/
  connect_start_time: string;
  /**L2 profile flags associated with entry */
  l2_profile_flags: number;
}
```

```typescript
/**
 * SRUM table associated with NotificationInfo `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}`
 */
export interface NotificationInfo {
  /**ID in for row in the ESE table */
  auto_inc_id: number;
  /**Timestamp when ESE table was updated */
  timestamp: string;
  /**Application name */
  app_id: string;
  /**SID associated with the application process */
  user_id: string;
  /**Notification type associated with entry */
  notification_type: number;
  /**Size of payload associated with entry */
  payload_size: number;
  /**Network type associated with entry */
  network_type: number;
}
```
