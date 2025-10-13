export interface OneDriveDetails {
  logs: OneDriveLog[];
  files: OneDriveSyncEngineRecord[];
  accounts: OneDriveAccount[];
  keys: KeyInfo[];
}

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
}

export interface OneDriveSyncEngine {
  scopes: OneDriveSyncEngineScope[];
  records: OneDriveSyncEngineRecord[];
}

export interface OneDriveSyncEngineScope {
  scope_id: string;
  site_id?: string;
  web_id?: string;
  list_id?: string;
  tenant_id?: string;
  url?: string;
  remote_path?: string;
  permissions?: number;
  library_type?: number;
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
  last_signin: string;
  cid: string;
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