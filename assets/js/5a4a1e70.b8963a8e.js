"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1515],{28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var i=t(96540);const r={},c=i.createContext(r);function s(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(c.Provider,{value:n},e.children)}},86874:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"Artifacts/macOS Artifacts/execpolicy","title":"ExecPolicy","description":"Application execution tracker","source":"@site/docs/Artifacts/macOS Artifacts/execpolicy.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/execpolicy","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/execpolicy","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/execpolicy.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"Application execution tracker","keywords":["macOS","sqlite"]},"sidebar":"artemisArtifacts","previous":{"title":"Emond","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/emond"},"next":{"title":"Files","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/files"}}');var r=t(74848),c=t(28453);const s={description:"Application execution tracker",keywords:["macOS","sqlite"]},a="ExecPolicy",o={},l=[];function d(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"execpolicy",children:"ExecPolicy"})}),"\n",(0,r.jsxs)(n.p,{children:["macOS Execution Policy (",(0,r.jsx)(n.code,{children:"ExecPolicy"}),") tracks application execution on a system.\nIt only tracks execution of applications that tracked by GateKeeper"]}),"\n",(0,r.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Any SQLITE viewer"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"References:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://eclecticlight.co/2023/03/13/ventura-has-changed-app-quarantine-with-a-new-xattr/",children:"ExecPolicy Info"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://knight.sc/reverse%20engineering/2019/02/20/syspolicyd-internals.html",children:"Policy Internals"})}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "execpolicy_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "execpolicy"\n[artifacts.execpolicy]\n# Optional\n# alt_file = ""\n'})}),"\n",(0,r.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"alt_file"})," Use an alternative file to the ExecPolicy database. This\nconfiguration is ",(0,r.jsx)(n.strong,{children:"optional"}),". By default artemis will read the default\nExecPolicy database at ",(0,r.jsx)(n.code,{children:"/var/db/SystemPolicyConfiguration/ExecPolicy"})]}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(n.p,{children:["An array of ",(0,r.jsx)(n.code,{children:"ExecPolicy"})," entries"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"export interface ExecPolicy {\n  /**Is file signed */\n  is_signed: number;\n  /**File ID name */\n  file_identifier: string;\n  /**App bundle ID */\n  bundle_identifier: string;\n  /**Bundle version */\n  bundle_version: string;\n  /**Team ID */\n  team_identifier: string;\n  /**Signing ID */\n  signing_identifier: string;\n  /**Code Directory hash*/\n  cdhash: string;\n  /**SHA256 hash of application */\n  main_executable_hash: string;\n  /**Executable timestamp */\n  executable_timestamp: string;\n  /**Size of file */\n  file_size: number;\n  /**Is library */\n  is_library: number;\n  /**Is file used */\n  is_used: number;\n  /**File ID associated with entry */\n  responsible_file_identifier: string;\n  /**Is valid entry */\n  is_valid: number;\n  /**Is quarantined entry */\n  is_quarantined: number;\n  /**Timestamp for executable measurements */\n  executable_measurements_v2_timestamp: string;\n  /**Reported timestamp */\n  reported_timstamp: string;\n  /**Primary key */\n  pk: number;\n  /**Volume UUID for entry */\n  volume_uuid: string;\n  /**Object ID for entry */\n  object_id: number;\n  /**Filesystem type */\n  fs_type_name: string;\n  /**App Bundle ID */\n  bundle_id: string;\n  /**Policy match for entry */\n  policy_match: number;\n  /**Malware result for entry */\n  malware_result: number;\n  /**Flags for entry */\n  flags: number;\n  /**Modified time */\n  mod_time: string;\n  /**Policy scan cache timestamp */\n  policy_scan_cache_timestamp: number;\n  /**Revocation check timestamp */\n  revocation_check_time: string;\n  /**Scan version for entry */\n  scan_version: number;\n  /**Top policy match for entry */\n  top_policy_match: number;\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);