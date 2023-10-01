---
description: Windows system information
keywords:
  - windows
---

# SystemInfo

Gets system metadata associated with the endpoint

Other Parsers:

- Any tool that calls the Windows API or queries system information

Refernces:

- N/A

# TOML Collection

```toml
system = "windows"

[output]
name = "systeminfo_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "systeminfo"
```

# Collection Options

- N/A

# Output Structure

A `SystemInfo` object structure

```typescript
export interface SystemInfo {
  /**Boot time for endpoint */
  boot_time: number;
  /**Endpoint hostname */
  hostname: string;
  /**Endpoint OS version */
  os_version: string;
  /**Uptime of endpoint */
  uptime: number;
  /**Endpoint kernel version */
  kernel_version: string;
  /**Endpoint platform */
  platform: string;
  /**CPU information */
  cpu: Cpus[];
  /**Disks information */
  disks: Disks[];
  /**Memory information */
  memory: Memory;
  /**Performance information */
  performance: LoadPerformance;
}

/**
 * CPU information on endpoint
 */
export interface Cpus {
  /**CPU frequency */
  frequency: number;
  /**CPU usage on endpoint */
  cpu_usage: number;
  /**Name of CPU */
  name: string;
  /**Vendor ID for CPU */
  vendor_id: string;
  /**CPU brand */
  brand: string;
  /**Core Count */
  physical_core_count: number;
}

/**
 * Disk information on endpoint
 */
export interface Disks {
  /**Type of disk */
  disk_type: string;
  /**Filesystem for disk */
  file_system: string;
  /**Disk mount point */
  mount_point: string;
  /**Disk storage */
  total_space: number;
  /**Storage remaining */
  available_space: number;
  /**If disk is removable */
  removable: boolean;
}

/**
 * Memory information on endpoint
 */
export interface Memory {
  /**Available memory on endpoint */
  available_memory: number;
  /**Free memory on endpoint */
  free_memory: number;
  /**Free swap on endpoint */
  free_swap: number;
  /**Total memory on endpoint */
  total_memory: number;
  /**Total swap on endpoint */
  total_swap: number;
  /**Memory in use */
  used_memory: number;
  /**Swap in use */
  used_swap: number;
}

/**
 * Average CPU load. These values are always zero (0) on Windows
 */
export interface LoadPerformance {
  /**Average load for one (1) min */
  avg_one_min: number;
  /**Average load for five (5) min */
  avg_five_min: number;
  /**Average load for fifteen (15) min */
  avg_fifteen_min: number;
}
```
