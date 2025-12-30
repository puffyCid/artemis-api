export interface FileEntry {
    full_path: string;
    inode: number;
    file_type: FileType;
}

export enum FileType {
    File = "File",
    Directory = "Directory",
    Device = "Device",
    Block = "Block",
    FifoQueue = "FifoQueue",
    Socket = "Socket",
    SymbolicLink = "SymbolicLink",
    Unknown = "Unknown",
}