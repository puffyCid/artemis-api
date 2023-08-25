/**
 * Result of nom parser
 */
export interface Nom {
  /**Remaining string or bytes provided to nom */
  remaining: string | Uint8Array;
  /**How much string or bytes was nommed */
  nommed: string | Uint8Array;
}

/**
 * Result of nom unsigned helper
 */
export interface NomUnsigned {
  /**Remaining bytes provided to nom */
  remaining: Uint8Array;
  /**Unsigned value returned by nom */
  value: number;
}

/**
 * Result of nom unsigned 128 byte helper
 */
export interface NomUnsignedLarge {
  /**Remaining bytes provided to nom */
  remaining: Uint8Array;
  /**Unsigned value returned by nom */
  value: string;
}

/**
 * Result of nom signed helper
 */
export interface NomSigned {
  /**Remaining bytes provided to nom */
  remaining: Uint8Array;
  /**Signed value returned by nom */
  value: number;
}
