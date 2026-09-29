/**
 * Hashing algorithms supported by the Runtime
 */
export interface Hashes {
  /**MD5 hash value */
  md5: string;
  /**SHA1 hash value */
  sha1: string;
  /**SHA256 value */
  sha256: string;
}

export interface FileHostInfo {
  full_path: string;
  directory: string;
  filename: string;
  extension: string;
  created: string;
  modified: string;
  changed: string;
  accessed: string;
  uid: string;
  gid: string;
  inode: number,
  attributes: Attributes[],
  size: number,
  md5: string;
  sha1: string;
  sha256: string;
  kind: EntryKind,
  depth: number,
  yara_hits: string[],
  binary_info: Record<string, unknown>,
  display_path: string;
  evidence: string;
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
  // Windows
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
  ExtendedAttributes = "ExtendedAttributes",
  Pinned = "Pinned",
  Unpinned = "Unpinned",
  RecallOnOpen = "RecallOnOpen",
  RecallOnDataAccess = "RecallOnDataAccess",

  // Unix
  UserRead = "UserRead",
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

export interface FileNtfsInfo {
  full_path: string;
  directory: string;
  filename: string;
  extension: string;
  created: string;
  modified: string;
  changed: string;
  accessed: string;
  filename_created: string;
  filename_modified: string;
  filename_changed: string;
  filename_accessed: string;
  attributes: Attributes[];
  size: number;
  md5: string;
  sha1: string;
  sha256: string;
  kind: EntryKind;
  depth: number;
  yara_hits: string[],
  binary_info: Record<string, unknown>,
  display_path: string;
  compressed_size: number;
  compression_type: CompressionType,
  inode: number;
  sequence_number: number,
  parent_sequence_number: number,
  parent_mft_reference: number,
  owner: number,
  namespace: Namespace,
  ads_info: ADSInfo[];
  usn: number;
  sid: number;
  user_sid: string;
  group_sid: string;
  drive: string;
  is_indx: boolean;
  evidence: string;
}

export enum CompressionType {
  NTFSCompressed = "NTFSCompressed",
  WofCompressed = "WofCompressed",
  None = "None"
}

export enum Namespace {
  Posix = "Posix",
  Windows = "Windows",
  Dos = "Dos",
  WindowsDos = "WindowsDos",
  Unknown = "Unknown",
}

export interface ADSInfo {
  name: string;
  size: number;
}

export interface FilesZipInfo {
  full_path: string;
  directory: string;
  filename: string;
  extension: string;
  modified: string;
  size: number;
  compressed_size: number;
  compression: string;
  crc32: number;
  encrypted: boolean;
  md5: string;
  sha1: string;
  sha256: string;
  kind: EntryKind,
  depth: number;
  yara_hits: string[];
  binary_info: Record<string, unknown>;
  display_path: string;
  evidence: string;
}