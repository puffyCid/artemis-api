"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8692],{404:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>m,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var i=t(7624),c=t(2172);const r={description:"Application execution tracker",keywords:["macOS","sqlite"]},s="ExecPolicy",a={id:"Artifacts/macOS Artifacts/execpolicy",title:"ExecPolicy",description:"Application execution tracker",source:"@site/docs/Artifacts/macOS Artifacts/execpolicy.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/execpolicy",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/execpolicy",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/execpolicy.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"Application execution tracker",keywords:["macOS","sqlite"]},sidebar:"artemisArtifacts",previous:{title:"Emond",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/emond"},next:{title:"Files",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/files"}},o={},l=[];function d(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"execpolicy",children:"ExecPolicy"}),"\n",(0,i.jsxs)(n.p,{children:["macOS Execution Policy (",(0,i.jsx)(n.code,{children:"ExecPolicy"}),") tracks application execution on a system.\nIt only tracks execution of applications that tracked by GateKeeper"]}),"\n",(0,i.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Any SQLITE viewer"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://eclecticlight.co/2023/03/13/ventura-has-changed-app-quarantine-with-a-new-xattr/",children:"ExecPolicy Info"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://knight.sc/reverse%20engineering/2019/02/20/syspolicyd-internals.html",children:"Policy Internals"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "execpolicy_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "execpolicy"\n[artifacts.execpolicy]\n# Optional\n# alt_file = ""\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"alt_file"})," Use an alternative file to the ExecPolicy database. This\nconfiguration is ",(0,i.jsx)(n.strong,{children:"optional"}),". By default artemis will read the default\nExecPolicy database at ",(0,i.jsx)(n.code,{children:"/var/db/SystemPolicyConfiguration/ExecPolicy"})]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["An array of ",(0,i.jsx)(n.code,{children:"ExecPolicy"})," entries"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface ExecPolicy {\n  /**Is file signed */\n  is_signed: number;\n  /**File ID name */\n  file_identifier: string;\n  /**App bundle ID */\n  bundle_identifier: string;\n  /**Bundle version */\n  bundle_version: string;\n  /**Team ID */\n  team_identifier: string;\n  /**Signing ID */\n  signing_identifier: string;\n  /**Code Directory hash*/\n  cdhash: string;\n  /**SHA256 hash of application */\n  main_executable_hash: string;\n  /**Executable timestamp in UNIXEPOCH seconds */\n  executable_timestamp: number;\n  /**Size of file */\n  file_size: number;\n  /**Is library */\n  is_library: number;\n  /**Is file used */\n  is_used: number;\n  /**File ID associated with entry */\n  responsible_file_identifier: string;\n  /**Is valid entry */\n  is_valid: number;\n  /**Is quarantined entry */\n  is_quarantined: number;\n  /**Timestamp for executable measurements in UNIXEPOCH seconds */\n  executable_measurements_v2_timestamp: number;\n  /**Reported timestamp in UNIXEPOCH seconds */\n  reported_timstamp: number;\n  /**Primary key */\n  pk: number;\n  /**Volume UUID for entry */\n  volume_uuid: string;\n  /**Object ID for entry */\n  object_id: number;\n  /**Filesystem type */\n  fs_type_name: string;\n  /**App Bundle ID */\n  bundle_id: string;\n  /**Policy match for entry */\n  policy_match: number;\n  /**Malware result for entry */\n  malware_result: number;\n  /**Flags for entry */\n  flags: number;\n  /**Modified time in UNIXEPOCH seconds */\n  mod_time: number;\n  /**Policy scan cache timestamp in UNIXEPOCH seconds */\n  policy_scan_cache_timestamp: number;\n  /**Revocation check timestamp in UNIXEPOCH seconds */\n  revocation_check_time: number;\n  /**Scan version for entry */\n  scan_version: number;\n  /**Top policy match for entry */\n  top_policy_match: number;\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,c.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>a,M:()=>s});var i=t(1504);const c={},r=i.createContext(c);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);