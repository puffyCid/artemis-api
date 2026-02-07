import { AccessControl } from "./acls";

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
export interface BitsInfo {
  /**ID for the Job */
  job_id: string;
  /**ID for the File */
  file_id: string;
  /**SID associated with the Job */
  owner_sid: string;
  /**Timestamp when the Job was created */
  created: string;
  /**Timestamp when the Job was modified */
  modified: string;
  /**Timestamp when the Job was completed */
  completed: string;
  /**Timestamp when the Job was expired */
  expiration: string;
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
  /**Drive associated with the BITS Job */
  drive: string;
  /**Temporary file path for the file download */
  tmp_fullpath: string;
}
