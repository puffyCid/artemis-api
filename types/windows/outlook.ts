export interface FolderInfo {
  name: string;
  created: string;
  modified: string;
  properties: PropertyContext[];
  subfolders: SubFolder[];
  associated_content: SubFolder[];
  subfolder_count: number;
  message_count: number;
  messages_table: TableInfo;
}

export interface SubFolder {
  name: string;
  node: number;
}

export interface PropertyContext {
  name: string[];
  property_type: string;
  prop_id: number;
  reference: number;
  value: unknown;
}

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

export interface DescriptorData {
  node_level: string;
  node: Node;
  block_subnode_id: number;
  block_data_id: number;
  block_descriptor_id: number;
}

export interface Node {
  node_id: string;
  node_id_num: number;
  node: number;
}

export interface TableRows {
  value: undefined;
  column: ColumnDescriptor;
}

export interface ColumnDescriptor {
  property_type: string;
  id: number;
  property_name: string[];
  offset: number;
  size: number;
  index: number;
}

export interface HeapNode {
  node: string;
  index: number;
  block_index: number;
}

export interface TableBranchInfo {
  node: HeapNode;
  rows_info: RowsInfo;
}

export interface RowsInfo {
  row_end: number;
  count: number;
}

export interface MessageDetails {
  props: PropertyContext[];
  body: string;
  subject: string;
  from: string;
  recipient: string;
  delivered: string;
  attachments: AttachmentInfo[];
  recipients: TableRows[][];
}

export interface AttachmentInfo {
  name: string;
  size: number;
  method: string;
  node: number;
  block_id: number;
  descriptor_id: number;
}
