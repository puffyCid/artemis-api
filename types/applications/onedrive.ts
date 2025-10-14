export interface OneDriveLog {
  path: string;
  filename: string;
  created: string;
  code_file: string;
  function: string;
  flags: number;
  params: string;
  version: string;
  os_version: string;
  description: string;
  message: string;
  datetime: string;
  timestamp_desc: "OneDrive Log Entry Created";
  artifact: "OneDrive Log";
  data_type: "applications:onedrive:logs:entry";
}

export interface OneDriveSyncEngineRecord {
  parent_resource_id: string;
  resource_id: string;
  etag: string;
  filename: string;
  path: string;
  directory: string;
  file_status: number | null;
  permissions: number | null;
  volume_id: number | null;
  item_index: number | null;
  last_change: string;
  size: number | null;
  hash_digest: string;
  shared_item: string | null;
  media_date_taken: string | null;
  media_width: number | null;
  media_height: number | null;
  media_duration: number | null;
  /**JSON string */
  graph_metadata: string;
  created_by: string;
  modified_by: string;
  last_write_count: number;
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "OneDrive Sync Last Change";
  artifact: "OneDrive Sync Record";
  data_type: "applications:onedrive:sync:entry";
}

export interface OneDriveSyncEngineFolder {
  parent_scope_id: string;
  parent_resource_id: string;
  resource_id: string;
  etag: string;
  folder: string;
  folder_status: number | null;
  permissions: number | null;
  volume_id: number | null;
  item_index: number | null;
  parents: string[];
}

export interface OneDriveAccount {
  email: string;
  device_id: string;
  account_id: string;
  /**Not available on macOS */
  last_signin: string;
  cid: string;
  message: string;
  datetime: string;
  timestamp_desc: "OneDrive Last Signin";
  artifact: "OneDrive Account Info";
  data_type: "applications:onedrive:account:entry";
}

export interface KeyInfo {
  path: string;
  key: string;
}

export interface OnedriveProfile {
  sync_db: string[];
  odl_files: string[];
  key_file: string[];
  config_file: string[];
}