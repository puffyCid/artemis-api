/**
 * macOS `Spotlight` is an indexing service for tracking files and content.
 * The `Spotlight` database can contain a huge amount of metadata associated with the indexed content such as:
 * - Timestamps
 * - Partial file content
 * - File type and much more
 *
 * References:
 *  - https://forensicsandsecurity.com/papers/SpotlightMacForensicsSlides.pdf
 *  - https://en.wikipedia.org/wiki/Spotlight_(Apple)
 *  - https://github.com/libyal/dtformats/blob/main/documentation/Apple%20Spotlight%20store%20database%20file%20format.asciidoc
 */
export interface Spotlight {
  /**Inode number associated with indexed file */
  inode: bigint;
  /**Parent inode associated with indexed file */
  parent_inode: bigint;
  /**Flags associated with indexed entry */
  flags: number;
  /**Store ID associated with indexed entry */
  store_id: number;
  /**Last time Spotlight entry was updated in UNIXEPOCH **microseconds** */
  last_updated: bigint;
  /**Array of properties associated with the entry */
  values: Record<string, SpotlightProperties>;
  /**Location of the Spotlight database that was parsed */
  directory: string;
}

/**
 * Properties associated with the indexed entry
 */
interface SpotlightProperties {
  /**
   * Attribute type associated with the entry.
   * Possible options are:
   * - AttrBool
   * - AttrUnknown
   * - AttrVariableSizeInt
   * - AttrUnknown2
   * - AttrUnknown3
   * - AttrUnknown4
   * - AttrVariableSizeInt2
   * - AttrVariableSizeIntMultiValue
   * - AttrByte
   * - AttrFloat32
   * - AttrFloat64
   * - AttrString
   * - AttrDate (typically will be number of seconds in UNIXEPOCH)
   * - AttrBinary
   * - AttrList
   * - Unknown
   */
  attribute: DataAttribute;
  /**
   * Data associated with the property. Type can be determined based on the attribute.
   * **Important** `value` may also be an array containting data associated with the `attribute`
   */
  value: unknown;
}

/**
 * Metadata needed to parse the Spotlight database
 */
export interface StoreMeta {
  /**Metadata associated with Spotlight properties */
  meta: SpotlightMeta;
  /**Blocks to iterator through when parsing Spotlight */
  blocks: number[];
}

/**
 * Metadata associated with the Spotlight properties
 */
export interface SpotlightMeta {
  /**Property Metadata */
  props: Record<number, DataProperties>;
  /**Categories associated with some properties */
  categories: Record<number, string>;
  /**Index used to parse Spotlight block data */
  indexes1: Record<number, number[]>;
  /**Index used to parse Spotlight block data */
  indexes2: Record<number, number[]>;
}

/**
 * Properties associated with the Spotlight entry
 */
interface DataProperties {
  /**Attribute associated with property */
  attribute: DataAttribute;
  /**Property type value */
  prop_type: number;
  /**Name of property */
  name: string;
}

/**
 * All possible Attribute types
 */
enum DataAttribute {
  /**Boolean value */
  AttrBool = "AttrBool",
  /**This attribute is undocumented */
  AttrUnknown = "AttrUnknown",
  /**A value of variable size */
  AttrVariableSizeInt = "AttrVariableSizeInt",
  /**This attribute is undocumented */
  AttrUnknown2 = "AttrUnknown2",
  /**This attribute is undocumented */
  AttrUnknown3 = "AttrUnknown3",
  /**This attribute is undocumented */
  AttrUnknown4 = "AttrUnknown4",
  /**A value of variable size */
  AttrVariableSizeInt2 = "AttrVariableSizeInt2",
  /**A value of variable size (it may be in an array) */
  AttrVariableSizeIntMultiValue = "AttrVariableSizeIntMultiValue",
  /**A value with a size of one byte */
  AttrByte = "AttrByte",
  /**A 32-bit float value */
  AttrFloat32 = "AttrFloat32",
  /**A 64-bit float value */
  AttrFloat64 = "AttrFloat64",
  /**A string value */
  AttrString = "AttrString",
  /**A date value in seconds in UNIXEPOCH */
  AttrDate = "AttrDate",
  /**Base64 encoded binary value. (Depending on the property this may actually be a normal string value (similar to `AttrString`) */
  AttrBinary = "AttrBinary",
  /**An array of values */
  AttrList = "AttrList",
  /**Artemis failed to determine the attribute */
  Unknown = "Unknown",
}
