"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5865],{28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(96540);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}},99216:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"Artifacts/Windows Artfacts/bits","title":"BITS","description":"The Background Intelligent Transer Service (BITS)","source":"@site/docs/Artifacts/Windows Artfacts/bits.md","sourceDirName":"Artifacts/Windows Artfacts","slug":"/Artifacts/Windows Artfacts/bits","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/bits","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/bits.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"The Background Intelligent Transer Service (BITS)","keywords":["windows","ese","persistence"]},"sidebar":"artemisArtifacts","previous":{"title":"Amcache","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/amcache"},"next":{"title":"Chocolatey","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/chocolatey"}}');var i=t(74848),r=t(28453);const o={description:"The Background Intelligent Transer Service (BITS)",keywords:["windows","ese","persistence"]},a="BITS",d={},c=[];function l(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"bits",children:"BITS"})}),"\n",(0,i.jsxs)(n.p,{children:["Windows Background Intelligent Transfer Service (",(0,i.jsx)(n.code,{children:"BITS"}),") is a service that\nallows applications and users to register jobs to upload/download file(s)."]}),"\n",(0,i.jsxs)(n.p,{children:["It is commonly used by applications to download updates. Starting on Windows 10\nBITS data is stored in an ESE database. Pre-Windows 10 it is stored in a\nproprietary binary format",(0,i.jsx)("br",{})," ",(0,i.jsx)(n.code,{children:"BITS"})," data is stored at\n",(0,i.jsx)(n.code,{children:"C:\\ProgramData\\Microsoft\\Network\\Downloader\\qmgr.db"})]}),"\n",(0,i.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/fireeye/BitsParser",children:"BitsParser"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/ANSSI-FR/bits_parser",children:"Bits_Parser"})," (Only supports\npre-Windows 10 BITS files)"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://ss64.com/nt/bitsadmin.html",children:"BitsAdmin"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Background_Intelligent_Transfer_Service",children:"Background Intelligent Transfer Service"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.mandiant.com/resources/blog/attacker-use-of-windows-background-intelligent-transfer-service",children:"BITS"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "bits_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "bits"\n[artifacts.bits]\ncarve = true\n# Optional\n# alt_path = "D:\\\\ProgramData\\\\Microsoft\\\\Network\\\\Downloader\\\\qmgr.db"\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"carve"})," Boolean value to carve deleted ",(0,i.jsx)(n.code,{children:"BITS"})," jobs and files from ",(0,i.jsx)(n.code,{children:"qmgr.db"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"alt_path"})," Use an alternative path to the ",(0,i.jsx)(n.code,{children:"qmgr.db"})," file. This configuration\nis ",(0,i.jsx)(n.strong,{children:"optional"}),". By default artemis will use\n",(0,i.jsx)(n.code,{children:"%systemdrive%\\ProgramData\\Microsoft\\Network\\Downloader\\qmgr.db"})]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["A ",(0,i.jsx)(n.code,{children:"Bits"})," object that contains an array of jobs and carved jobs and files"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface Bits {\n  /**Array of data containing BITS info */\n  bits: BitsInfo[];\n  /**Array of carved jobs */\n  carved_jobs: Jobs[];\n  /**Array of carved files */\n  carved_files: Files[];\n}\n\n/**\n * Combination of parsed Jobs and File info from BITS\n */\nexport interface BitsInfo {\n  /**ID for the Job */\n  job_id: string;\n  /**ID for the File */\n  file_id: string;\n  /**SID associated with the Job */\n  owner_sid: string;\n  /**Timestamp when the Job was created */\n  created: string;\n  /**Timestamp when the Job was modified */\n  modified: string;\n  /**Timestamp when the Job was completed */\n  completed: string;\n  /**Timestamp when the Job was expired */\n  expiration: string;\n  /**Files associated with the Job */\n  files_total: number;\n  /**Number of bytes downloaded */\n  bytes_downloaded: number;\n  /**Number of bytes transferred */\n  bytes_transferred: number;\n  /**Name associated with Job */\n  job_name: string;\n  /**Description associated with Job */\n  job_description: string;\n  /**Commands associated with Job */\n  job_command: string;\n  /**Arguments associated with Job */\n  job_arguments: string;\n  /**Error count with the Job */\n  error_count: number;\n  /**BITS Job type */\n  job_type: string;\n  /**BITS Job state */\n  job_state: string;\n  /**Job priority */\n  priority: string;\n  /**BITS Job flags */\n  flags: string;\n  /**HTTP Method associated with Job */\n  http_method: string;\n  /**Full file path associated with Job */\n  full_path: string;\n  /**Filename associated with Job */\n  filename: string;\n  /**Target file path associated with Job */\n  target_path: string;\n  /**TMP file path associated with the JOb */\n  tmp_file: string;\n  /**Volume path associated with the file */\n  volume: string;\n  /**URL associated with the Job */\n  url: string;\n  /**If the BITS info was carved */\n  carved: boolean;\n  /**Transient error count with Job */\n  transient_error_count: number;\n  /**Permissions associated with the Job */\n  acls: AccessControl[];\n  /**Job timeout in seconds */\n  timeout: number;\n  /**Job retry delay in seconds */\n  retry_delay: number;\n  /**Additional SIDs associated with Job */\n  additional_sids: string[];\n}\n\n/**\n * Jobs from BITS\n */\nexport interface Jobs {\n  /**ID for the Job */\n  job_id: string;\n  /**ID for the File */\n  file_id: string;\n  /**SID associated with the Job */\n  owner_sid: string;\n  /**Timestamp when the Job was created */\n  created: string;\n  /**Timestamp when the Job was modified */\n  modified: string;\n  /**Timestamp when the Job was completed */\n  completed: string;\n  /**Timestamp when the Job was expired */\n  expiration: string;\n  /**Name associated with Job */\n  job_name: string;\n  /**Description associated with Job */\n  job_description: string;\n  /**Commands associated with Job */\n  job_command: string;\n  /**Arguments associated with Job */\n  job_arguments: string;\n  /**Error count with the Job */\n  error_count: number;\n  /**BITS Job type */\n  job_type: string;\n  /**BITS Job state */\n  job_state: string;\n  /**Job priority */\n  priority: string;\n  /**BITS Job flags */\n  flags: string;\n  /**HTTP Method associated with Job */\n  http_method: string;\n  /**Transient error count with Job */\n  transient_error_count: number;\n  /**Permissions associated with the Job */\n  acls: AccessControl[];\n  /**Job timeout in seconds */\n  timeout: number;\n  /**Job retry delay in seconds */\n  retry_delay: number;\n}\n\n/**\n * File(s) associated with Jobs\n */\nexport interface Files {\n  /**ID for the File */\n  file_id: string;\n  /**Files associated with the JOb */\n  files_transferred: number;\n  /**Number of bytes downloaded */\n  download_bytes_size: number;\n  /**Number of bytes transferred */\n  transfer_bytes_size: number;\n  /**Full file path associated with Job */\n  full_path: string;\n  /**Filename associated with Job */\n  filename: string;\n  /**Target file path associated with Job */\n  target_path: string;\n  /**TMP file path associated with the JOb */\n  tmp_file: string;\n  /**Volume path associated with the file */\n  volume: string;\n  /**URL associated with the Job */\n  url: string;\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}}}]);