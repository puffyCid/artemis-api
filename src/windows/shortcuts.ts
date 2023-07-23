import { ShellItems } from "./shellitems.ts";

/**
 * `Shortcut` files are files that point to another file.
 * They often contain a large amount of metadata related to the target file
 *
 * References:
 *  - https://winprotocoldoc.blob.core.windows.net/productionwindowsarchives/MS-SHLLINK/%5bMS-SHLLINK%5d.pdf
 *  - https://github.com/libyal/liblnk/blob/main/documentation/Windows%20Shortcut%20File%20(LNK)%20format.asciidoc
 */
export interface Shortcut {
  /**Path to `shortcut (lnk)` file */
  source_path: string;
  /**Flags that specify what data structures are in the `lnk` file */
  data_flags: string[];
  /**File attributes of target file */
  attribute_flags: string[];
  /**Standard Information created timestamp of target file */
  created: number;
  /**Standard Information accessed timestamp of target file */
  accessed: number;
  /**Standard Information modified timestamp of target file */
  modified: number;
  /**Size in bytes of target file */
  file_size: number;
  /**Flag associated where target file is located. On volume or network share */
  location_flags: string;
  /**Path to target file */
  path: string;
  /**Serial associated with volume if target file is on drive */
  drive_serial: string;
  /**Drive type associated with volume if target file is on drive */
  drive_type: string;
  /**Name of volume if target file is on drive */
  volume_label: string;
  /**Network type if target file is on network share */
  network_provider: string;
  /**Network share name if target file is on network share */
  network_share_name: string;
  /**Network share device name if target file is on network share */
  network_device_name: string;
  /**Description of shortcut (lnk) file */
  description: string;
  /**Relative path to target file */
  relative_path: string;
  /**Directory of target file */
  working_directory: string;
  /**Command args associated with target file */
  command_line_args: string;
  /**Icon path associated with shortcut (lnk) file */
  icon_location: string;
  /**Hostname of target file */
  hostname: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  droid_volume_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  droid_file_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  birth_droid_volume_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  birth_droid_file_id: string;
  /**Shellitems associated with shortcut (lnk) file */
  shellitems: ShellItems[];
  /**Root guid for a property store */
  property_guid: string;
}

/**
 * Function to parse a `Shortcut (lnk)` file
 * @param path Full path to `lnk` file
 * @returns `Shortcut (lnk) info`
 */
export function getLnkFile(path: string): Shortcut {
  //@ts-ignore: Custom Artemis function
  const data:Shortcut = Deno.core.ops.get_lnk_file(path);

  return data;
}
