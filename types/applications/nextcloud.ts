export interface NextcloudClientUsers {
    full_path: string;
    version: string;
}

export interface NextcloudClientConfig {
    client_version: string;
    url: string;
    user: string;
    display_name: string;
    local_path: string;
    config_path: string;
}

export interface NextcloudClientSyncLog {
    timestamp: string;
    duration: number;
    file: string;
    instruction: SyncInstruction;
    dir: number;
    modified: string;
    etag: string;
    size: number;
    file_id: string;
    status: number;
    error_string: string;
    http_code: number;
    other_size: number;
    other_modified: string;
    x_request_id: string;
    sync_log_path: string;
}

/**
 * Nextcloud client sync instructions.  
 * From <https://github.com/nextcloud/desktop/blob/master/src/csync/csync.h#L130>
 */
export enum SyncInstruction {
    None = "None",
    Eval = "Eval",
    Remove = "Remove",
    Rename = "Rename",
    New = "New",
    Conflict = "Conflict",
    Ignore = "Ignore",
    Sync = "Sync",
    StatError = "StatError",
    Error = "Error",
    TypeChange = "TypeChange",
    UpdateMetadata = "UpdateMetadata",
    ClashConflict = "ClashConflict",
    UpdateVfsMetadata = "UpdateVFSMetadata",
    UpdateEncryptionMetadata = "UpdateEncryptionMetadata",
    Unknown = "Unknown",
}

export interface NextcloudClientActivityLog {
    timestamp: string;
    category: string;
    function: string;
    source_file: string;
    source_file_line: number;
    message: string;
    log_source: string;
}