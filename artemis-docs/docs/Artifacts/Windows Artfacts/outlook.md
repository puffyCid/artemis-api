---
description: Windows Email Client
keywords:
  - windows
---

# Outlook

Outlook is a popular email client on Windows systems. Outlook on Windows stores
messages in OST or PST files. PST was used by older Outlook versions (prior to
Outlook 2013). OST is used by Outlook 2013+.

Artemis supports parsing and extracting emails and attachments from OST files.

:::note

Outlook was re-written in 2022 (New Outlook for Windows). Which is an online
only web app. This parser does not support that version

:::

Other parsers:

- [libpff](https://github.com/libyal/libpff)

References:

- [libyal](https://github.com/libyal/libpff/blob/main/documentation/Personal%20Folder%20File%20(PFF)%20format.asciidoc)
- [Outlook Messages](https://www.forensafe.com/blogs/outlook.html)

# TOML Collection

```toml
system = "windows"

[output]
name = "outlook_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "outlook"
[artifacts.outlook]
include_attahcments = true
```

# Collection Options

- `alt_path` An alternative path to the OST file. This configuration is
  **optional**. By default will parse all OST files under
  `%systemdrive%\Users\*\AppData\Local\Microsoft\Outlook\*.ost`
- `include_attachments` - Boolean value whether to extract attachments in email
  messages. This configuration is **required**.
- `start_date` - Only extract emails after this date. This configuration is
  **optional**. By default artemis will extract all emails
- `end_date` - Only extract emails before this date. This configuration is
  **optional**. By default artemis will extract all emails
- `yara_rule_message` - Run provided Yara-X rule against the message. Only
  matches will be returned. This configuration is **optional**. By default
  artemis will not scan with Yara
- `yara_rule_attachment` - Run provided Yara-X rule against attachments. Only
  matches will be returned. This configuration is **optional**. By default
  artemis will not scan with Yara

# Output Structure

Array of `OutlookMessage`

```typescript
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
```

For the API multiple structures can be returned based on functions that are
called

```typescript
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
```
