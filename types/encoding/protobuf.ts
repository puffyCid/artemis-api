export interface ProtoTag {
  tag: Tag;
  value: unknown;
  /**Allow user to add definitions if they want to */
  [key: string]: unknown;
}

interface Tag {
  tag_byte: number;
  wire_type: WireType;
  field: number;
}

enum WireType {
  VarInt = "VarInt",
  Fixed64 = "Fixed64",
  Len = "Len",
  /**Deprecated */
  StartGroup = "StartGroup",
  /**Deprecated */
  EndGroup = "EndGroup",
  Fixed32 = "Fixed32",
  Unknown = "Unknown",
}
