"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1088],{13176:(n,e,a)=>{a.r(e),a.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var t=a(17624),r=a(4552);const i={description:"Extensible Storage Engine (ESE) database",keywords:["windows","ese","persistence"]},s="Extensible Storage Engine",o={id:"Artifacts/Windows Artfacts/ese",title:"Extensible Storage Engine",description:"Extensible Storage Engine (ESE) database",source:"@site/docs/Artifacts/Windows Artfacts/ese.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/ese",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/ese",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/ese.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"Extensible Storage Engine (ESE) database",keywords:["windows","ese","persistence"]},sidebar:"artemisArtifacts",previous:{title:"Chocolatey",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/chocolatey"},next:{title:"Event Logs",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/eventlogs"}},l={},d=[];function c(n){const e={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.M)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"extensible-storage-engine",children:"Extensible Storage Engine"}),"\n",(0,t.jsx)(e.p,{children:"Extensible Storage Engine (ESE) database is an open source database used on\nWindows systems. ESE databases are used by many different kinds of Windows\napplications such as:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Windows Search"}),"\n",(0,t.jsx)(e.li,{children:"BITS (pre-Windows 11)"}),"\n",(0,t.jsx)(e.li,{children:"UAL"}),"\n",(0,t.jsx)(e.li,{children:"Edge (pre-Chromium version)"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"Artemis supports parsing both unlocked and locked ESE databases."}),"\n",(0,t.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,t.jsxs)(e.p,{children:["You have to use the artemis ",(0,t.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse a\nsingle ESE database."]}),"\n",(0,t.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:'import { EseDatabase } from "./artemis-api/src/windows/ese.ts";\nimport { WindowsError } from "./artemis-api/src/windows/errors.ts";\n\nfunction main() {\n  // Provide path to the UAL file\n  const path = "C:\\\\Windows\\\\System32\\\\LogFiles\\\\sum\\\\Current.mdb";\n\n  const ese = new EseDatabase(path);\n\n  const catalog = ese.catalogInfo();\n  if (catalog === WindowsError) {\n    return catalog;\n  }\n\n  for (const entry of catalog) {\n    console.log(`${entry.name} - Catalog Type: ${entry.catalog_type}`);\n  }\n}\n'})}),"\n",(0,t.jsx)(e.h1,{id:"output-structures",children:"Output Structures"}),"\n",(0,t.jsx)(e.p,{children:"Depending on functions used the artemis API will returning the following objects"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:'/** Generic Interface for dumping ESE tables */\nexport interface EseTable {\n  column_type: ColumnType;\n  column_name: string;\n  /**Binary data is base64 encoded. All data is decompressed if possible */\n  column_data: string;\n}\n\nexport enum ColumnType {\n  Nil = "Nil",\n  Bit = "Bit",\n  UnsignedByte = "UnsignedByte",\n  Short = "Short",\n  Long = "Long",\n  Currency = "Currency",\n  Float32 = "Float32",\n  Float64 = "Float64",\n  /** All timestamps have been converted to UNIXEPOCH seconds */\n  DateTime = "DateTime",\n  Binary = "Binary",\n  /** Can be ASCII or Unicode */\n  Text = "Text",\n  LongBinary = "LongBinary",\n  /**Can be ASCII or Unicode */\n  LongText = "LongText",\n  SuperLong = "SuperLong",\n  UnsignedLong = "UnsignedLong",\n  LongLong = "LongLong",\n  Guid = "Guid",\n  UnsignedShort = "UnsignedShort",\n  Unknown = "Unknown",\n}\n\n/**\n * Metadata about the ESE database Catalog\n */\nexport interface Catalog {\n  /**Fixed data */\n  obj_id_table: number;\n  /**Fixed data */\n  catalog_type: CatalogType;\n  /**Fixed data */\n  id: number;\n  /** Fixed data - Column only if the `catalog_type` is Column, otherwise father data page (FDP) */\n  column_or_father_data_page: number;\n  /**Fixed data */\n  space_usage: number;\n  /**Fixed data - If `catalog_type` is Column then these are columns flags */\n  flags: number;\n  /**Fixed data */\n  pages_or_locale: number;\n  /**Fixed data */\n  root_flag: number;\n  /**Fixed data */\n  record_offset: number;\n  /**Fixed data */\n  lc_map_flags: number;\n  /**Fixed data */\n  key_most: number;\n  /**Fixed data */\n  lv_chunk_max: number;\n  /**Variable data */\n  name: string;\n  /**Variable data */\n  stats: Uint8Array;\n  /**Variable data */\n  template_table: string;\n  /**Variable data */\n  default_value: Uint8Array;\n  /**Variable data */\n  key_fld_ids: Uint8Array;\n  /**Variable data */\n  var_seg_mac: Uint8Array;\n  /**Variable data */\n  conditional_columns: Uint8Array;\n  /**Variable data */\n  tuple_limits: Uint8Array;\n  /**Variable data */\n  version: Uint8Array;\n  /**Variable data */\n  sort_id: Uint8Array;\n  /**Tagged data */\n  callback_data: Uint8Array;\n  /**Tagged data */\n  callback_dependencies: Uint8Array;\n  /**Tagged data */\n  separate_lv: Uint8Array;\n  /**Tagged data */\n  space_hints: Uint8Array;\n  /**Tagged data */\n  space_deferred_lv_hints: Uint8Array;\n  /**Tagged data */\n  local_name: Uint8Array;\n}\n\nexport enum CatalogType {\n  Table = "Table",\n  Column = "Column",\n  Index = "Index",\n  LongValue = "LongValue",\n  Callback = "Callback",\n  SlvAvail = "SlvAvail",\n  SlvSpaceMap = "SlvSpaceMap",\n  Unknown = "Unknown",\n}\n\nexport interface TableInfo {\n  obj_id_table: number;\n  table_page: number;\n  table_name: string;\n  column_info: ColumnInfo[];\n  long_value_page: number;\n}\n\nexport interface ColumnInfo {\n  column_type: ColumnType;\n  column_name: string;\n  column_data: number[];\n  column_id: number;\n  column_flags: ColumnFlags[];\n  column_space_usage: number;\n  column_tagged_flags: TaggedDataFlag[];\n}\n\nexport enum ColumnFlags {\n  NotNull = "NotNull",\n  Version = "Version",\n  AutoIncrement = "AutoIncrement",\n  MultiValued = "MultiValued",\n  Default = "Default",\n  EscrowUpdate = "EscrowUpdate",\n  Finalize = "Finalize",\n  UserDefinedDefault = "UserDefinedDefault",\n  TemplateColumnESE98 = "TemplateColumnESE98",\n  DeleteOnZero = "DeleteOnZero",\n  PrimaryIndexPlaceholder = "PrimaryIndexPlaceholder",\n  Compressed = "Compressed",\n  Encrypted = "Encrypted",\n  Versioned = "Versioned",\n  Deleted = "Deleted",\n  VersionedAdd = "VersionedAdd",\n}\n\nenum TaggedDataFlag {\n  Variable = "Variable",\n  Compressed = "Compressed",\n  LongValue = "LongValue",\n  MultiValue = "MultiValue",\n  MultiValueSizeDefinition = "MultiValueSizeDefinition",\n  Unknown = "Unknown",\n}\n'})})]})}function u(n={}){const{wrapper:e}={...(0,r.M)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(c,{...n})}):c(n)}},4552:(n,e,a)=>{a.d(e,{I:()=>o,M:()=>s});var t=a(11504);const r={},i=t.createContext(r);function s(n){const e=t.useContext(i);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:s(n.components),t.createElement(i.Provider,{value:e},n.children)}}}]);