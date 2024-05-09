/**
 * macOS BIOME data contains data related to application runtime. It partially replaces the KnowledgeC.db.
 * Its kind of similar to Windows SRUM
 *
 * References:
 * - version 2: https://cellebrite.com/en/understanding-and-decoding-the-newest-ios-segb-format/
 * - version 1: https://blog.d204n6.com/search/label/Breaking%20Down%20The%20Biomes
 */
export interface Biome {
  path: string;
  /**
   * BIOME files contain Protobuf data. Each type of BIOME needs to be extracted.
   * Further research could be done to extract raw data into specific interfaces
   * If parsing fails, we base64 encode the protobuf data and include that
   */
  raw: Record<string, unknown>[];
}
