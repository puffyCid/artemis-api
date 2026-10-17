/**
 * Supported protocols that can be used by the `Accessor`
 */
export enum AccessorProtocol {
    /**
     * Read a file on a live system. If a file is locked,
     * then this protocol will fail
     * 
     * Example: `C:\Users\text.txt` or `/etc/host.txt`
     */
    Host,
    /**
     * Read a file on a live NTFS filesystem. This protocol
     * will bypass file locks and can also read ADS data
     * 
     * Example: `ntfs:C:\Users\test.txt` or `ntfs:C:\Users\test.txt:ZONE_INFO`
     */
    Ntfs,
    /**
     * Read a file inside a zip file. The path to
     * the zip file must be an absolute path (no **relative** paths!)
     * 
     * Example: `zip:/home/user/Downloads/file.zip!/test/file.txt`
     */
    Zip,
    /**
     * Read a raw disk image. The path to
     * the raw disk must be an absolute path (no **relative** paths!)
     * 
     * Example: `raw:/home/user/Downloads/file.raw!/test/file.txt`
     */
    Raw,
    /**
     * Read a QCOW disk image. The path to
     * the raw disk must be an absolute path (no **relative** paths!)
     * 
     * Example: `qcow:/home/user/Downloads/file.qcow!/test/file.txt`
     */
    Qcow,
}

/**
 * Entries return from reading a directory
 */
export interface DirEntry {
    /**
     * Name of the entry
     */
    name: string;
    handle: FileHandle | DirHandle;
    meta: EntryMeta;
    times: Timestamp;
}

export interface FileHandle {
    File: ItemHandle;
}

export interface DirHandle {
    Directory: ItemHandle;
}

export interface ItemHandle {
    locator: HandleLocator | undefined;
}

export interface HandleLocator {
    Host: {
        path: string;
    } | undefined;
    Ntfs: {
        drive: string;
        file_ref: NtfsEntryRef;
        display_path: string;
    } | undefined;
    Zip: {
        archive: string;
        entry_index: number;
        entry: string;
    } | undefined;
    Disk: {
        image: string;
        format: DiskFormat;
        partition_id: string;
        filesystem_path: string;
        entry: DiskEntryRef | NtfsEntryRef;
    } | undefined;
}

export interface NtfsEntryRef {
    file_record_number: number;
    sequence_number: number;
}

export enum DiskFormat {
    Raw = "Raw",
}

export enum DiskEntryRef {
    PartitionRoot = "PartitionRoot"
}

export interface EntryMeta {
    kind: EntryKind;
    size: bigint;
    full_path: string;
    filename: string;
    directory: string;
    extension: string;
    inode: bigint;
    uid: number;
    gid: number;
    attributes: Attributes[];
    display_path: string;
}

export enum EntryKind {
    File = "File",
    Directory = "Directory",
    Symlink = "Symlink",
    Socket = "Socket",
    BlockDevice = "BlockDevice",
    Pipe = "Pipe",
    CharDevice = "CharDevice",
    Unsupported = "Unsupported",
}

export enum Attributes {
    ReadOnly = "ReadOnly",
    Hidden = "Hidden",
    System = "System",
    Directory = "Directory",
    Archive = "Archive",
    Device = "Device",
    Normal = "Normal",
    Temporary = "Temporary",
    Sparse = "Sparse",
    ReparsePoint = "ReparsePoint",
    Compressed = "Compressed",
    Offline = "Offline",
    NotContentIndexed = "NotContentIndexed",
    Encrypted = "Encrypted",
    IntegritySystem = "IntegritySystem",
    Virtual = "Virtual",
    NoScrubData = "NoScrubData",
    ExtendedAttributs = "ExtendedAttributes",
    Pinned = "Pinned",
    Unpinned = "Unpinned",
    RecallOnOpen = "RecallOnOpen",
    RecallOnDataAccess = "RecallOnDataAccess",
    UserRad = "UserRead",
    GroupRead = "GroupRead",
    OtherRead = "OtherRead",
    UserWrite = "UserWrite",
    GroupWrite = "GroupWrite",
    OtherWrite = "OtherWrite",
    UserExecute = "UserExecute",
    GroupExecute = "GroupExecute",
    OtherExecute = "OtherExecute",
    SetUid = "SetUid",
    SetGid = "SetGid",
    Sticky = "Sticky",
}

export interface Timestamp {
    created: string;
    modified: string;
    accessed: string;
    changed: string;
}

export interface GlobMatch {
    handle: FileHandle | DirHandle;
    meta: EntryMeta;
}

export interface SourceHandle {
    id: SourceId;
}

export interface SourceId {
    Host: string | undefined;
    Ntfs: string | undefined;
    Zip: string | undefined;
    Disk: {
        format: DiskFormat;
        path: string;
    } | undefined;
}

export enum AccessorReader {
    Reader
}