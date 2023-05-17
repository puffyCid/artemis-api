import { decode } from "https://deno.land/std@0.177.0/encoding/base64.ts";
import { PeInfo } from "./pe.ts";

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
  /**Created timestamp in UNIXEPOCH seconds */
  created: number;
  /**Modified timestamp in UNIXEPOCH seconds */
  modified: number;
  /**Changed timestamp in UNIXEPOCH seconds */
  changed: number;
  /**Accessed timestamp in UNIXEPOCH seconds */
  accessed: number;
  /**Filename created timestamp in UNIXEPOCH seconds */
  filename_created: number;
  /**Filename modified timestamp in UNIXEPOCH seconds */
  filename_modified: number;
  /**Filename accessed timestamp in UNIXEPOCH seconds */
  filename_accessed: number;
  /**Filename changed timestamp in UNIXEPOCH seconds */
  filename_changed: number;
  /**Size of file in bytes */
  size: number;
  /**Size of file if compressed */
  compressed_size: number;
  /**Compression type used on file */
  compression_type: string;
  /**Inode entry */
  inode: number;
  /**Sequence number for entry */
  sequence_number: number;
  /**Parent MFT reference for entry */
  parent_mft_references: number;
  /**Attributes associated with entry */
  attributess: string[];
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
  /**Group SID associated with enry */
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

/**
 * Function to read a file by accessing the raw `NTFS` filesystem.
 * This function can be used to read locked files.
 * It currently reads the whole file into memory!
 * Use with **CAUTION**
 * @param path Full path to file to read
 * @returns Bytes read
 */
export function read_raw_file(path: string): Uint8Array {
  const data: string = Deno[Deno.internal].core.ops.read_raw_file(path);
  return decode(data);
}

/**
 * Function to read an `Alternative data stream (ADS)`.
 * This function has a data size limit of 2GB. It will not read ADS data greater than 2GBs.
 * It will skip sparse data when reading the ADS data
 * Supports resident and non-resident ADS data
 * @param path Full path to file
 * @param ads_name Name of `Alternative data stream (ADS)` to read
 * @returns Bytes read
 */
export function read_ads_data(path: string, ads_name: string): Uint8Array {
  const data: string = Deno[Deno.internal].core.ops.read_ads_data(
    path,
    ads_name,
  );
  return decode(data);
}
