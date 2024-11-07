"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2028],{58986:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=t(74848),o=t(28453);const i={description:"Windows Email Client",keywords:["windows"]},s="Outlook",a={id:"Artifacts/Windows Artfacts/outlook",title:"Outlook",description:"Windows Email Client",source:"@site/docs/Artifacts/Windows Artfacts/outlook.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/outlook",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/outlook",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/outlook.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"Windows Email Client",keywords:["windows"]},sidebar:"artemisArtifacts",previous:{title:"Most Recently Used",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/mru"},next:{title:"Portable Executable",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/pe"}},l={},c=[{value:"Limitations",id:"limitations",level:2}];function d(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"outlook",children:"Outlook"})}),"\n",(0,r.jsx)(e.p,{children:"Outlook is a popular email client on Windows systems. Outlook on Windows stores\nmessages in OST or PST files. PST was used by older Outlook versions (prior to\nOutlook 2013). OST is used by Outlook 2013+."}),"\n",(0,r.jsx)(e.p,{children:"Artemis supports parsing and extracting emails and attachments from OST files."}),"\n",(0,r.jsx)(e.h2,{id:"limitations",children:"Limitations"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Only OST files are supported, PST is not yet fully supported."}),"\n",(0,r.jsx)(e.li,{children:"Encrypted OST/PST files are not supported yet"}),"\n"]}),"\n",(0,r.jsx)(e.admonition,{type:"note",children:(0,r.jsx)(e.p,{children:"Outlook was re-written in 2022 (New Outlook for Windows). Which is an online\nonly web app. This parser does not support that version"})}),"\n",(0,r.jsx)(e.p,{children:"Other parsers:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/libyal/libpff",children:"libpff"})}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"References:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/libyal/libpff/blob/main/documentation/Personal%20Folder%20File%20(PFF)%20format.asciidoc",children:"libyal"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.forensafe.com/blogs/outlook.html",children:"Outlook Messages"})}),"\n"]}),"\n",(0,r.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "outlook_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "outlook"\n[artifacts.outlook]\ninclude_attahcments = true\n'})}),"\n",(0,r.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"alt_path"})," An alternative path to the OST file. This configuration is\n",(0,r.jsx)(e.strong,{children:"optional"}),". By default will parse all OST files under\n",(0,r.jsx)(e.code,{children:"%systemdrive%\\Users\\*\\AppData\\Local\\Microsoft\\Outlook\\*.ost"})]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"include_attachments"})," - Boolean value whether to extract attachments in email\nmessages. This configuration is ",(0,r.jsx)(e.strong,{children:"required"}),"."]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"start_date"})," - Only extract emails after this date. This configuration is\n",(0,r.jsx)(e.strong,{children:"optional"}),". By default artemis will extract all emails"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"end_date"})," - Only extract emails before this date. This configuration is\n",(0,r.jsx)(e.strong,{children:"optional"}),". By default artemis will extract all emails"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"yara_rule_message"})," - Run provided Yara-X rule against the message. Only\nmatches will be returned. This configuration is ",(0,r.jsx)(e.strong,{children:"optional"}),". By default\nartemis will not scan with Yara"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"yara_rule_attachment"})," - Run provided Yara-X rule against attachments. Only\nmatches will be returned. This configuration is ",(0,r.jsx)(e.strong,{children:"optional"}),". By default\nartemis will not scan with Yara"]}),"\n"]}),"\n",(0,r.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(e.p,{children:["Array of ",(0,r.jsx)(e.code,{children:"OutlookMessage"})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-typescript",children:"export interface OutlookMessage {\n  /**Body of the message. Can be either plaintext, html, rtf */\n  body: string;\n  /**Subject line */\n  subject: string;\n  /**From line */\n  from: string;\n  /**Who received the email */\n  recipient: string;\n  /**Delivered timestamp */\n  delivered: string;\n  /**Other recipients */\n  recipients: string[];\n  /**Attachment message metadata */\n  attachments: AttachmentInfo[] | undefined;\n  /**Full path to the folder containing the message */\n  folder_path: string;\n  /**Source path to the OST file */\n  source_file: string;\n  /**Yara rule that matched if Yara scanning was enabled */\n  yara_hits: string[] | undefined;\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:"For the API multiple structures can be returned based on functions that are\ncalled"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-typescript",children:"/**\n * Metadata about an Outlook folder\n */\nexport interface FolderInfo {\n  /**Name of the folder */\n  name: string;\n  /**Created timestamp of folder */\n  created: string;\n  /**Modified timestamp of folder */\n  modified: string;\n  /**Array of properties for the folder */\n  properties: PropertyContext[];\n  /**Array of sub-folders */\n  subfolders: SubFolder[];\n  /**Array of sub-folders pointing to more metadata */\n  associated_content: SubFolder[];\n  /**Count of subfolders */\n  subfolder_count: number;\n  /**Count of messages in the folder */\n  message_count: number;\n  /**Internal structure containing information required to extract messages */\n  messages_table: TableInfo;\n}\n\n/**\n * Preview of sub-folder metadata\n */\nexport interface SubFolder {\n  /**Name of the sub-folder */\n  name: string;\n  /**Folder ID */\n  node: number;\n}\n\n/**\n * Primary source of metadata for OST data\n */\nexport interface PropertyContext {\n  /**Property name(s) */\n  name: string[];\n  /**Type of property. Such as string, int, GUID, date, etc */\n  property_type: string;\n  /**Property ID */\n  prop_id: number;\n  /**Reference to the property in the OST */\n  reference: number;\n  /**Property value. Value will depend on type. Ex: string, int, array, int, etc */\n  value: unknown;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface TableInfo {\n  block_data: number[][];\n  block_descriptors: Record<number, DescriptorData>;\n  rows: number[];\n  columns: TableRows[];\n  include_cols: string[];\n  row_size: number;\n  map_offset: number;\n  node: HeapNode;\n  total_rows: number;\n  has_branch: TableBranchInfo | undefined;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface DescriptorData {\n  node_level: string;\n  node: Node;\n  block_subnode_id: number;\n  block_data_id: number;\n  block_descriptor_id: number;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface Node {\n  node_id: string;\n  node_id_num: number;\n  node: number;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface TableRows {\n  value: undefined;\n  column: ColumnDescriptor;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface ColumnDescriptor {\n  property_type: string;\n  id: number;\n  property_name: string[];\n  offset: number;\n  size: number;\n  index: number;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface HeapNode {\n  node: string;\n  index: number;\n  block_index: number;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface TableBranchInfo {\n  node: HeapNode;\n  rows_info: RowsInfo;\n}\n\n/**\n * Internal structure containing information requried to extract messages\n */\nexport interface RowsInfo {\n  row_end: number;\n  count: number;\n}\n\n/**\n * Metadata associated with email messages\n */\nexport interface MessageDetails {\n  /**Array of properties for the message */\n  props: PropertyContext[];\n  /**Message body. Can be plaintext, html, or rtf */\n  body: string;\n  /**Subject line for message */\n  subject: string;\n  /**From address of the email */\n  from: string;\n  /**Recipient of the email */\n  recipient: string;\n  /**Delivered timestamp */\n  delivered: string;\n  /**Preview of attachments in the email */\n  attachments: AttachmentInfo[];\n  /**Array of  other recipients who also received the email*/\n  recipients: TableRows[][];\n}\n\n/**\n * Preview of the attachment metadata\n */\nexport interface AttachmentInfo {\n  /**Name of the attachment */\n  name: string;\n  /**Size of the attachment */\n  size: number;\n  /**How the attachmented was attached */\n  method: string;\n  /**Node ID for the attachment */\n  node: number;\n  /**Block ID for the attachment */\n  block_id: number;\n  /**Descriptor ID for the attachment */\n  descriptor_id: number;\n}\n\n/**\n * Metadata about the attachment\n */\nexport interface Attachment {\n  /**Base64 string containing attachment*/\n  data: string;\n  /**Size of the attachment */\n  size: bigint;\n  /**Name of the attachment */\n  name: string;\n  /**Mime type of the attachment */\n  mime: string;\n  /**Attachment extension (includes the dot) */\n  extension: string;\n  /**How the attachment was attached */\n  method: string;\n  /**Array of properties for the attachment */\n  props: PropertyContext[];\n}\n"})})]})}function u(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>s,x:()=>a});var r=t(96540);const o={},i=r.createContext(o);function s(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:s(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);