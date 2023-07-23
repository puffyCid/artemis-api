/**
 * An interface to parse and get basic PE information
 *
 * References:
 *  - https://learn.microsoft.com/en-us/windows/win32/debug/pe-format
 */
export interface PeInfo {
  /**Array of imported DLLs */
  imports: string[];
  /**Array of section names */
  sections: string[];
  /**Base64 encoded certificate information */
  cert: string;
  /**Path to PDB file */
  pdb: string;
  /**PE product version */
  product_version: string;
  /**PE file version */
  file_version: string;
  /**PE product name */
  product_name: string;
  /**PE company name */
  company_name: string;
  /**PE file description */
  file_description: string;
  /**PE internal name */
  internal_name: string;
  /**PE copyright */
  legal_copyright: string;
  /**PE original filename */
  original_filename: string;
  /**PE manifest info */
  manifest: string;
  /**Array of base64 icons */
  icons: string[];
}

/**
 * Function to parse a `pe` executable.
 * @param path Full path to a `pe` file
 * @returns Basic `PeInfo` interface or null
 */
export function getPe(path: string): PeInfo {
    //@ts-ignore: Custom Artemis function
  const data:PeInfo = Deno.core.ops.get_pe(path);
  
  return data;
}
