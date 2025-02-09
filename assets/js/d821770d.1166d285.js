"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4030],{5303:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"Artifacts/Application Artifacts/onedrive","title":"OneDrive","description":"Cloud storage software","source":"@site/docs/Artifacts/Application Artifacts/onedrive.md","sourceDirName":"Artifacts/Application Artifacts","slug":"/Artifacts/Application Artifacts/onedrive","permalink":"/artemis-api/docs/Artifacts/Application Artifacts/onedrive","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Application Artifacts/onedrive.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Cloud storage software","keywords":["office software","sqlite","registry","plist"]},"sidebar":"artemisArtifacts","previous":{"title":"Microsoft Office","permalink":"/artemis-api/docs/Artifacts/Application Artifacts/office"},"next":{"title":"SQLite","permalink":"/artemis-api/docs/Artifacts/Application Artifacts/sqlite"}}');var t=i(4848),s=i(8453);const o={description:"Cloud storage software",keywords:["office software","sqlite","registry","plist"]},a="OneDrive",c={},l=[];function d(n){const e={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"onedrive",children:"OneDrive"})}),"\n",(0,t.jsx)(e.p,{children:"Microsoft OneDrive is a cloud storage service that is used to store files in the\ncloud. Artemis supports parsing several artifacts containing OneDrive metadata\nsuch as:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Basic support for OneDrive Logs (ODL files, version 3 only)"}),"\n",(0,t.jsx)(e.li,{children:"SQLITE files"}),"\n",(0,t.jsx)(e.li,{children:"Registry files (NTUSER.DAT)"}),"\n",(0,t.jsx)(e.li,{children:"PLIST files"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"References:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"http://www.swiftforensics.com/2022/02/reading-onedrive-logs.html",children:"OneDrive blog"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"http://www.swiftforensics.com/2022/11/reading-onedrive-logs-part-2.html",children:"OneDrive blog part 2"})}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/Beercow/OneDriveExplorer",children:"OneDrive Explorer"})}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,t.jsxs)(e.p,{children:["You have to use the artemis ",(0,t.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\nMicrosoft Office information."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:'import { PlatformType } from "./artemis-api/mod.ts";\nimport { onedriveDetails } from "./artemis-api/src/applications/onedrive/parser.ts";\n\nfunction main() {\n  const values = onedriveDetails(PlatformType.Windows);\n  console.log(values);\n}\n\nmain();\n'})}),"\n",(0,t.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"OneDriveDetails"})," object containing artifacts associated with OneDrive"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:"export interface OneDriveDetails {\n  logs: OneDriveLog[];\n  files: OneDriveSyncEngineRecord[];\n  accounts: OneDriveAccount[];\n  keys: KeyInfo[];\n}\n\nexport interface OneDriveLog {\n  path: string;\n  filename: string;\n  created: string;\n  code_file: string;\n  function: string;\n  flags: number;\n  params: string;\n  version: string;\n  os_version: string;\n  description: string;\n}\n\nexport interface OneDriveSyncEngine {\n  scopes: OneDriveSyncEngineScope[];\n  records: OneDriveSyncEngineRecord[];\n}\n\nexport interface OneDriveSyncEngineScope {\n  scope_id: string;\n  site_id?: string;\n  web_id?: string;\n  list_id?: string;\n  tenant_id?: string;\n  url?: string;\n  remote_path?: string;\n  permissions?: number;\n  library_type?: number;\n}\n\nexport interface OneDriveSyncEngineRecord {\n  parent_resource_id: string;\n  resource_id: string;\n  etag: string;\n  filename: string;\n  path: string;\n  directory: string;\n  file_status: number | null;\n  permissions: number | null;\n  volume_id: number | null;\n  item_index: number | null;\n  last_change: string;\n  size: number | null;\n  hash_digest: string;\n  shared_item: string | null;\n  media_date_taken: string | null;\n  media_width: number | null;\n  media_height: number | null;\n  media_duration: number | null;\n  /**JSON string */\n  graph_metadata: string;\n  created_by: string;\n  modified_by: string;\n  last_write_count: number;\n  db_path: string;\n}\n\nexport interface OneDriveSyncEngineFolder {\n  parent_scope_id: string;\n  parent_resource_id: string;\n  resource_id: string;\n  etag: string;\n  folder: string;\n  folder_status: number | null;\n  permissions: number | null;\n  volume_id: number | null;\n  item_index: number | null;\n  parents: string[];\n}\n\nexport interface OneDriveAccount {\n  email: string;\n  device_id: string;\n  account_id: string;\n  last_signin: string;\n  cid: string;\n}\n\nexport interface KeyInfo {\n  path: string;\n  key: string;\n}\n"})})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},8453:(n,e,i)=>{i.d(e,{R:()=>o,x:()=>a});var r=i(6540);const t={},s=r.createContext(t);function o(n){const e=r.useContext(s);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),r.createElement(s.Provider,{value:e},n.children)}}}]);