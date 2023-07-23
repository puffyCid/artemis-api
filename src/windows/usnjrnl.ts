/**
 * Windows `UsnJrnl` is a sparse binary file that tracks changes to files and directories.
 * Located at the alternative data stream (ADS) `\<drive\>:\$Extend\$UsnJrnl:$J`.
 * Parsing this data can sometimes show files that have been deleted. However, depending on the file activity
 * on the system entries in the `UsnJrnl` may get overwritten quickly
 *
 * References:
 *  - https://learn.microsoft.com/en-us/windows/win32/api/winioctl/ns-winioctl-usn_record_v2?redirectedfrom=MSDN
 *  - https://github.com/libyal/libfsntfs/blob/main/documentation/New%20Technologies%20File%20System%20(NTFS).asciidoc#usn_change_journal
 */
export interface UsnJrnl {
  /**Entry number in the MFT */
  mft_entry: number;
  /**Sequence number in the MFT */
  mft_sequence: number;
  /**Parent entry number in the MFT */
  parent_mft_entry: number;
  /**Parent sequence number in the MFT */
  parent_mft_sequence: number;
  /**ID number in the Update Sequence Number Journal (UsnJrnl) */
  update_sequence_number: number;
  /**Timestamp of of entry update in UNIXEPOCH seconds */
  update_time: number;
  /**Reason for update action */
  update_reason: string;
  /**Source information of the update */
  update_source_flags: string;
  /**Security ID associated with entry */
  security_descriptor_id: number;
  /**Attributes associate with entry */
  file_attributes: string[];
  /**Name associated with entry. Can be file or directory */
  filename: string;
  /**Extension if available for filename */
  extension: string;
  /**Full path for the UsnJrnl entry. Obtained by parsing `$MFT` and referencing the `parent_mft_entry` */
  full_path: string;
}

/**
 * Function to parse the `UsnJrnl` on the systemdrive
 * @returns Array of `UsnJrnl` entries from sysystemdrive letter
 */
export function getUsnjrnl(): UsnJrnl[] {
  //@ts-ignore: Custom Artemis function
  const data:UsnJrnl[] = Deno.core.ops.get_usnjrnl();

  return data;
}

/**
 * Function to parse the `UsnJrnl` on an alternative driver
 * @returns Array of `UsnJrnl` entries from a Windows driver letter
 */
export function getAltUsnjrnl(drive: string): UsnJrnl[] {
  //@ts-ignore: Custom Artemis function
  const data:UsnJrnl[] = Deno.core.ops.get_alt_usnjrnl(drive);

  return data;
}
