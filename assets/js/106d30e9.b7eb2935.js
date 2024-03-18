"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9494],{4152:(s,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var t=n(7624),r=n(2172);const i={description:"Linux process metadata",keywords:["linux","proc meta"]},a="Processes",c={id:"Artifacts/Linux Artifacts/processes",title:"Processes",description:"Linux process metadata",source:"@site/docs/Artifacts/Linux Artifacts/processes.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/processes",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/processes",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/processes.md",tags:[],version:"current",frontMatter:{description:"Linux process metadata",keywords:["linux","proc meta"]},sidebar:"artemisArtifacts",previous:{title:"Logons",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/logons"},next:{title:"RPM Packages",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/rpm"}},o={},l=[];function d(s){const e={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.M)(),...s.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"processes",children:"Processes"}),"\n",(0,t.jsx)(e.p,{children:"Gets a standard process listing using the Linux API"}),"\n",(0,t.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Any tool that calls the Linux API"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"References:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-toml",children:'system = "Linux"\n\n[output]\nname = "process_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "processes" # Name of artifact\n[artifacts.processes]\n# Get executable metadata\nmetadata = true \n# MD5 hash process binary\nmd5 = true \n # SHA1 hash process binary\nsha1 = false\n# SHA256 hash process binary\nsha256 = false\n'})}),"\n",(0,t.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"metadata"})," Get ",(0,t.jsx)(e.a,{href:"/artemis-api/docs/Artifacts/Linux%20Artifacts/elf",children:"ELF"})," data from process binary."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"md5"})," Boolean value to MD5 hash process binary"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"sha1"})," Boolean value to SHA1 hash process binary"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"sha256"})," Boolean value to SHA256 hash process binary"]}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,t.jsxs)(e.p,{children:["An array of ",(0,t.jsx)(e.code,{children:"LinuxProcessInfo"})," entries"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:"export interface LinuxProcessInfo {\n  /**Full path to the process binary */\n  full_path: string;\n  /**Name of process */\n  name: string;\n  /**Path to process binary */\n  path: string;\n  /** Process ID */\n  pid: number;\n  /** Parent Process ID */\n  ppid: number;\n  /**Environment variables associated with process */\n  environment: string;\n  /**Status of the process */\n  status: string;\n  /**Process arguments */\n  arguments: string;\n  /**Process memory usage */\n  memory_usage: number;\n  /**Process virtual memory usage */\n  virtual_memory_usage: number;\n  /**Process start time in UNIXEPOCH seconds*/\n  start_time: number;\n  /** User ID associated with process */\n  uid: string;\n  /**Group ID associated with process */\n  gid: string;\n  /**MD5 hash of process binary */\n  md5: string;\n  /**SHA1 hash of process binary */\n  sha1: string;\n  /**SHA256 hash of process binary */\n  sha256: string;\n  /**ELF metadata asssociated with process binary */\n  binary_info: ElfInfo[];\n}\n"})})]})}function u(s={}){const{wrapper:e}={...(0,r.M)(),...s.components};return e?(0,t.jsx)(e,{...s,children:(0,t.jsx)(d,{...s})}):d(s)}},2172:(s,e,n)=>{n.d(e,{I:()=>c,M:()=>a});var t=n(1504);const r={},i=t.createContext(r);function a(s){const e=t.useContext(i);return t.useMemo((function(){return"function"==typeof s?s(e):{...e,...s}}),[e,s])}function c(s){let e;return e=s.disableParentContext?"function"==typeof s.components?s.components(r):s.components||r:a(s.components),t.createElement(i.Provider,{value:e},s.children)}}}]);