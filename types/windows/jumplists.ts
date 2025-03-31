import { Shortcut } from "./shortcuts";

/**
 * Windows `Jumplists` files track opened files via applications in the Taskbar or Start Menu
 * Jumplists contain `lnk` data and therefore can show evidence of file interaction.
 * There are two (2) types of Jumplist files:
 *
 * - Custom - Files that are pinned to Taskbar applications
 * - Automatic - Files that are not pinned to Taskbar applications
 *
 * References:
 *  - https://github.com/libyal/dtformats/blob/main/documentation/Jump%20lists%20format.asciidoc
 *  - https://binaryforay.blogspot.com/2016/02/jump-lists-in-depth-understand-format.html
 */
export interface Jumplists {
  /**Path to Jumplist file */
  path: string;
  /**Jupmlist type. Custom or Automatic */
  jumplist_type: string;
  /**Application ID for Jumplist file */
  app_id: string;
  /**Metadata associated with Jumplist entry */
  jumplist_metadata: DestEntries;
  /**Shortcut information for Jumplist entry */
  lnk_info: Shortcut;
}

/**
 * Metadata associated with Jumplist entry
 */
interface DestEntries {
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
  /**Hostname associated with Jumplist entry */
  hostname: string;
  /**Jumplist entry number */
  entry: number;
  /**Modified timestamp of Jumplist entry */
  modified: string;
  /**Status if Jumplist entry is pinned. `Pinned` or `NotPinned` */
  pin_status: string;
  /**Path associated with Jumplist entry */
  path: string;
}
