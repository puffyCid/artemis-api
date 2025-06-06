/**
 * Metadata about parsed Outlook messagse
 */
export interface OutlookMessage {
  /**Body of the message. Can be either plaintext, html, rtf */
  body: string;
  /**Subject line */
  subject: string;
  /**From line */
  from: string;
  /**Who received the email */
  recipient: string;
  /**Delivered timestamp */
  delivered: string;
  /**Other recipients */
  recipients: string[];
  /**Attachment message metadata */
  attachments: AttachmentInfo[] | undefined;
  /**Full path to the folder containing the message */
  folder_path: string;
  /**Source path to the OST file */
  source_file: string;
  /**Yara rule that matched if Yara scanning was enabled */
  yara_hits: string[] | undefined;
}

/**
 * Metadata about an Outlook folder
 */
export interface FolderInfo {
  /**Name of the folder */
  name: string;
  /**Created timestamp of folder */
  created: string;
  /**Modified timestamp of folder */
  modified: string;
  /**Array of properties for the folder */
  properties: PropertyContext[];
  /**Array of sub-folders */
  subfolders: SubFolder[];
  /**Array of sub-folders pointing to more metadata */
  associated_content: SubFolder[];
  /**Count of subfolders */
  subfolder_count: number;
  /**Count of messages in the folder */
  message_count: number;
  /**Internal structure containing information required to extract messages */
  messages_table: TableInfo;
}

/**
 * Additional metadata associated with a folder
 */
export interface FolderMetadata {
  message_class: string;
  created: string;
  properties: PropertyContext[];
}

export interface NameEntry {
  reference: number;
  entry_type: number;
  value: unknown;
  index: number;
  guid: string;
  name_type: NameType;
}

export enum NameType {
  String = "String",
  Guid = "Guid",
}

/**
 * Preview of sub-folder metadata
 */
export interface SubFolder {
  /**Name of the sub-folder */
  name: string;
  /**Folder ID */
  node: number;
}

/**
 * Primary source of metadata for OST data
 */
export interface PropertyContext {
  /**Property name(s) */
  name: string[];
  /**Type of property. Such as string, int, GUID, date, etc */
  property_type: string;
  /**Property ID */
  prop_id: number;
  /**Reference to the property in the OST */
  reference: number;
  /**Property value. Value will depend on type. Ex: string, int, array, int, etc */
  value: unknown;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface TableInfo {
  block_data: number[][];
  block_descriptors: Record<number, DescriptorData>;
  rows: number[];
  columns: TableRows[];
  include_cols: string[];
  row_size: number;
  map_offset: number;
  node: HeapNode;
  total_rows: number;
  has_branch: TableBranchInfo | undefined;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface DescriptorData {
  node_level: string;
  node: Node;
  block_subnode_id: number;
  block_data_id: number;
  block_descriptor_id: number;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface Node {
  node_id: string;
  node_id_num: number;
  node: number;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface TableRows {
  value: undefined;
  column: ColumnDescriptor;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface ColumnDescriptor {
  property_type: string;
  id: number;
  property_name: string[];
  offset: number;
  size: number;
  index: number;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface HeapNode {
  node: string;
  index: number;
  block_index: number;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface TableBranchInfo {
  node: HeapNode;
  rows_info: RowsInfo;
}

/**
 * Internal structure containing information requried to extract messages
 */
export interface RowsInfo {
  row_end: number;
  count: number;
}

/**
 * Metadata associated with email messages
 */
export interface MessageDetails {
  /**Array of properties for the message */
  props: PropertyContext[];
  /**Message body. Can be plaintext, html, or rtf */
  body: string;
  /**Subject line for message */
  subject: string;
  /**From address of the email */
  from: string;
  /**Recipient of the email */
  recipient: string;
  /**Delivered timestamp */
  delivered: string;
  /**Preview of attachments in the email */
  attachments: AttachmentInfo[];
  /**Array of  other recipients who also received the email*/
  recipients: TableRows[][];
}

/**
 * Preview of the attachment metadata
 */
export interface AttachmentInfo {
  /**Name of the attachment */
  name: string;
  /**Size of the attachment */
  size: number;
  /**How the attachmented was attached */
  method: string;
  /**Node ID for the attachment */
  node: number;
  /**Block ID for the attachment */
  block_id: number;
  /**Descriptor ID for the attachment */
  descriptor_id: number;
}

/**
 * Metadata about the attachment
 */
export interface Attachment {
  /**Base64 string containing attachment*/
  data: string;
  /**Size of the attachment */
  size: bigint;
  /**Name of the attachment */
  name: string;
  /**Mime type of the attachment */
  mime: string;
  /**Attachment extension (includes the dot) */
  extension: string;
  /**How the attachment was attached */
  method: string;
  /**Array of properties for the attachment */
  props: PropertyContext[];
}
