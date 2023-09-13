import { AccessControl } from "./acls.d.ts";

/**
 * Windows Background Intelligent Transfer Service (`BITS`) is a service that allows applications and users to register jobs to upload/download files.
 * It is commonly used by applications to download updates.  In addition, Windows Updates are downloaded through BITS.
 * Starting on Windows 10 BITS data is stored in an ESE database.
 * Pre-Win10 it is stored in a proprietary binary format.
 *
 * References:
 *  - https://ss64.com/nt/bitsadmin.html
 *  - https://en.wikipedia.org/wiki/Background_Intelligent_Transfer_Service
 *  - https://www.mandiant.com/resources/blog/attacker-use-of-windows-background-intelligent-transfer-service
 */
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
  /**Files associated with the JOb */
  files_total: number;
  /**Number of bytes downloaded */
  bytes_downloaded: number | bigint | string;
  /**Number of bytes transferred */
  bytes_transferred: number | bigint | string;
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
  /**TMP file path associated with the Job */
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
  /**Target file path associated with Job */
  target_path: string;
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
  download_bytes_size: number | bigint | string;
  /**Number of bytes transferred */
  trasfer_bytes_size: number | bigint | string;
  /**Fulll file path associated with Job */
  full_path: string;
  /**Filename associated with Job */
  filename: string;
  /**TMP file path associated with the JOb */
  tmp_file: string;
  /**Volume path associated with the file */
  volume: string;
  /**URL associated with the Job */
  url: string;
}
