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
 * Result of nom unsigned or signed helper
 */
export interface NomNumber {
  /**Remaining bytes provided to nom */
  remaining: Uint8Array;
  /**Unsigned value returned by nom */
  value: number;
}

/**
 * Result of nom unsigned 8 or 16 byte helper
 */
export interface NomUnsignedLarge {
  /**Remaining bytes provided to nom */
  remaining: Uint8Array;
  /**Unsigned value returned by nom */
  value: bigint;
}

/**
 * Result of nom signed 8 or 16 byte helper
 */
export interface NomSignedLarge {
  /**Remaining bytes provided to nom */
  remaining: Uint8Array;
  /**Unsigned value returned by nom */
  value: bigint;
}
