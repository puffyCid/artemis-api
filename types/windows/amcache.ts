/**
 * Amcache stores metadata related to execution of Windows applications.
 * Data is stored in the Amcache.hve Registry file. It also contains other metadata such as OS, hardware, and application info
 *
 * References:
 *  - https://github.com/libyal/dtformats/blob/main/documentation/AMCache%20file%20(AMCache.hve)%20format.asciidoc
 *  - https://www.ssi.gouv.fr/uploads/2019/01/anssi-coriin_2019-analysis_amcache.pdf
 */
export interface Amcache {
  /**Last modified time for Registry key in UNIXEPOCH seconds */
  last_modified: number;
  /**Path to application */
  path: string;
  /**Name of application */
  name: string;
  /**Original name of application from PE metadata */
  original_name: string;
  /**Version of application from PE metadata */
  version: string;
  /**Executable type and arch information */
  binary_type: string;
  /**Application product version from PE metadata */
  product_version: string;
  /**Application product name from PE metadata */
  product_name: string;
  /**Application language */
  language: string;
  /**Application file ID. This is also the SHA1 hash */
  file_id: string;
  /**Application linking timestamp as MM/DD/YYYY HH:mm:ss*/
  link_date: string;
  /**Hash of application path */
  path_hash: string;
  /**Program ID associated with the application */
  program_id: string;
  /**Size of application */
  size: string;
  /**Application publisher from PE metadata */
  publisher: string;
  /**Application Update Seqeuence Number (USN) */
  usn: string;
  /**SHA1 hash of the first ~31MBs of the application */
  sha1: string;
  /**Path in the Amcache.hve file */
  reg_path: string;
}
