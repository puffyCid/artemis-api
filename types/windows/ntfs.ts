import { PeInfo } from "./pe";

/**
 * Windows NTFS is the default filesystem on Windows devices.
 * This parser leverages the `ntfs` Rust crate to parse the raw filesystem
 *
 * References:
 *  - https://www.ntfs.com/index.html
 *  - https://flatcap.github.io/linux-ntfs/ntfs/
 *  - https://github.com/ColinFinck/ntfs
 */
export interface RawFileInfo {
  /**Full path to file or directory */
  full_path: string;
  /**Directory path */
  directory: string;
  /**Filename */
  filename: string;
  /**Extension of file if any */
  extension: string;
  /**Created timestamp */
  created: string;
  /**Modified timestamp */
  modified: string;
  /**Changed timestamp */
  changed: string;
  /**Accessed timestamp */
  accessed: string;
  /**Filename created timestamp */
  filename_created: string;
  /**Filename modified timestamp */
  filename_modified: string;
  /**Filename accessed timestamp */
  filename_accessed: string;
  /**Filename changed timestamp */
  filename_changed: string;
  /**Size of file in bytes */
  size: number;
  /**Size of file if compressed */
  compressed_size: number;
  /**Compression type used on file */
  compression_type: string;
  /**Inode entry */
  inode: number;
  /**NTFS Namespace for the file */
  namespace: string;
  /**Sequence number for entry */
  sequence_number: number;
  /**Parent MFT reference for entry */
  parent_mft_references: number;
  /**Attributes associated with entry */
  attributes: string[];
  /**MD5 of file. Optional */
  md5: string;
  /**SHA1 of file. Optional */
  sha1: string;
  /**SHA256 of file. Optional */
  sha256: string;
  /**Is the entry a file */
  is_file: boolean;
  /**Is the entry a directory */
  is_directory: boolean;
  /** Is the entry carved from $INDX */
  is_indx: boolean;
  /**USN entry */
  usn: number;
  /**SID number associated with entry */
  sid: number;
  /**SID  string associated with entry*/
  user_sid: string;
  /**Group SID associated with entry */
  group_sid: string;
  /**Drive letter */
  drive: string;
  /**ADS info associated with entry */
  ads_info: AdsInfo[];
  /**Depth the file from provided start point*/
  depth: number;
  /**PE binary metadata. Optional */
  binary_info: PeInfo[];
}

/**
 * Alternative Data Streams (ADS) are a NTFS feature to embed data in another data stream
 */
export interface AdsInfo {
  /**Name of the ADS entry */
  name: string;
  /**Size of the ADS entry */
  size: number;
}
