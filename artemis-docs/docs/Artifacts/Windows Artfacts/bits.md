---
description: The Background Intelligent Transer Service (BITS)
keywords:
  - windows
  - ese
  - persistence
---

# BITS

Windows Background Intelligent Transfer Service (`BITS`) is a service that
allows applications and users to register jobs to upload/download file(s).

It is commonly used by applications to download updates. Starting on Windows 10
BITS data is stored in an ESE database. Pre-Windows 10 it is stored in a
proprietary binary format<br /> `BITS` data is stored at
`C:\ProgramData\Microsoft\Network\Downloader\qmgr.db`

Other Parsers:

- [BitsParser](https://github.com/fireeye/BitsParser)
- [Bits_Parser](https://github.com/ANSSI-FR/bits_parser) (Only supports
  pre-Windows 10 BITS files)

References:

- [BitsAdmin](https://ss64.com/nt/bitsadmin.html)
- [Background Intelligent Transfer Service](https://en.wikipedia.org/wiki/Background_Intelligent_Transfer_Service)
- [BITS](https://www.mandiant.com/resources/blog/attacker-use-of-windows-background-intelligent-transfer-service)

# TOML Collection

```toml
system = "windows"

[output]
name = "bits_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "bits"
[artifacts.bits]
carve = true
# Optional
# alt_path = "D:\\ProgramData\\Microsoft\\Network\\Downloader\\qmgr.db"
```

# Collection Options

- `carve` Boolean value to carve deleted `BITS` jobs and files from `qmgr.db`
- `alt_path` Use an alternative path to the `qmgr.db` file. This configuration
  is **optional**. By default artemis will use
  `%systemdrive%\ProgramData\Microsoft\Network\Downloader\qmgr.db`

# Output Structure

A `Bits` object that contains an array of jobs and carved jobs and files

```typescript
export interface Bits {
  /**Array of data containing BITS info */
  bits: BitsInfo[];
  /**Array of carved jobs */
  carved_jobs: Jobs[];
  /**Array of carved files */
  carved_files: Files[];
}

/**
 * Combination of parsed Jobs and File info from BITS
 */
export interface BitsInfo {
  /**ID for the Job */
  job_id: string;
  /**ID for the File */
  file_id: string;
  /**SID associated with the Job */
  owner_sid: string;
  /**Timestamp when the Job was created in UNIXEPOCH seconds */
  created: number;
  /**Timestamp when the Job was modified in UNIXEPOCH seconds */
  modified: number;
  /**Timestamp when the Job was completed in UNIXEPOCH seconds */
  completed: number;
  /**Timestamp when the Job was expired in UNIXEPOCH seconds */
  expiration: number;
  /**Files associated with the Job */
  files_total: number;
  /**Number of bytes downloaded */
  bytes_downloaded: number;
  /**Number of bytes transferred */
  bytes_transferred: number;
  /**Name associated with Job */
  job_name: string;
  /**Description associated with Job */
  job_description: string;
  /**Commands associated with Job */
  job_command: string;
  /**Arguments associated with Job */
  job_arguments: string;
  /**Error count with the Job */
  error_count: number;
  /**BITS Job type */
  job_type: string;
  /**BITS Job state */
  job_state: string;
  /**Job priority */
  priority: string;
  /**BITS Job flags */
  flags: string;
  /**HTTP Method associated with Job */
  http_method: string;
  /**Full file path associated with Job */
  full_path: string;
  /**Filename associated with Job */
  filename: string;
  /**Target file path associated with Job */
  target_path: string;
  /**TMP file path associated with the JOb */
  tmp_file: string;
  /**Volume path associated with the file */
  volume: string;
  /**URL associated with the Job */
  url: string;
  /**If the BITS info was carved */
  carved: boolean;
  /**Transient error count with Job */
  transient_error_count: number;
  /**Permissions associated with the Job */
  acls: AccessControl[];
  /**Job timeout in seconds */
  timeout: number;
  /**Job retry delay in seconds */
  retry_delay: number;
  /**Additional SIDs associated with Job */
  additional_sids: string[];
}

/**
 * Jobs from BITS
 */
export interface Jobs {
  /**ID for the Job */
  job_id: string;
  /**ID for the File */
  file_id: string;
  /**SID associated with the Job */
  owner_sid: string;
  /**Timestamp when the Job was created in UNIXEPOCH seconds */
  created: number;
  /**Timestamp when the Job was modified in UNIXEPOCH seconds */
  modified: number;
  /**Timestamp when the Job was completed in UNIXEPOCH seconds */
  completed: number;
  /**Timestamp when the Job was expired in UNIXEPOCH seconds */
  expiration: number;
  /**Name associated with Job */
  job_name: string;
  /**Description associated with Job */
  job_description: string;
  /**Commands associated with Job */
  job_command: string;
  /**Arguments associated with Job */
  job_arguments: string;
  /**Error count with the Job */
  error_count: number;
  /**BITS Job type */
  job_type: string;
  /**BITS Job state */
  job_state: string;
  /**Job priority */
  priority: string;
  /**BITS Job flags */
  flags: string;
  /**HTTP Method associated with Job */
  http_method: string;
  /**Transient error count with Job */
  transient_error_count: number;
  /**Permissions associated with the Job */
  acls: AccessControl[];
  /**Job timeout in seconds */
  timeout: number;
  /**Job retry delay in seconds */
  retry_delay: number;
}

/**
 * File(s) associated with Jobs
 */
export interface Files {
  /**ID for the File */
  file_id: string;
  /**Files associated with the JOb */
  files_transferred: number;
  /**Number of bytes downloaded */
  download_bytes_size: number;
  /**Number of bytes transferred */
  transfer_bytes_size: number;
  /**Full file path associated with Job */
  full_path: string;
  /**Filename associated with Job */
  filename: string;
  /**Target file path associated with Job */
  target_path: string;
  /**TMP file path associated with the JOb */
  tmp_file: string;
  /**Volume path associated with the file */
  volume: string;
  /**URL associated with the Job */
  url: string;
}
```
