/**
 * Result of nom parser
 */
export interface Nom {
  /**Remaining string or bytes provided to nom */
  remaining: string | Uint8Array;
  /**How much string or bytes was nommed */
  result: string | Uint8Array;
}
