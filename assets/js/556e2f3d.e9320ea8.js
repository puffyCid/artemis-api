"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1812],{6436:(t,e,s)=>{s.r(e),s.d(e,{assets:()=>a,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var n=s(7624),i=s(2172);const o={description:"macOS sudo records",keywords:["macOS","logs","binary"]},r="Sudo Logs",c={id:"Artifacts/macOS Artifacts/sudo",title:"Sudo Logs",description:"macOS sudo records",source:"@site/docs/Artifacts/macOS Artifacts/sudo.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/sudo",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/sudo",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/sudo.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1718072734e3,frontMatter:{description:"macOS sudo records",keywords:["macOS","logs","binary"]},sidebar:"artemisArtifacts",previous:{title:"Spotlight",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/spotlight"},next:{title:"System Extensions",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/systemextensions"}},a={},d=[];function l(t){const e={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.M)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"sudo-logs",children:"Sudo Logs"}),"\n",(0,n.jsxs)(e.p,{children:["Unix ",(0,n.jsx)(e.code,{children:"SudoLogs"}),' are the log files associated with sudo execution. Sudo ("super\nuser do" or "substitute user") is used to run programs with elevated privileges.']}),"\n",(0,n.jsxs)(e.p,{children:["macOS ",(0,n.jsx)(e.code,{children:"SudoLogs"})," are stored in the Unified Log files. The log entries show\nevidence of commands executed with elevated privileges"]}),"\n",(0,n.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"None"}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:"References:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "sudologs_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "sudologs-macos"\n[artifacts.sudologs_macos]\n# Optional\n# logarchive_path = ""\n'})}),"\n",(0,n.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"logarchive_path"})," Path to a logarchive formatted directory. This configuration\nis ",(0,n.jsx)(e.strong,{children:"optional"})]}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["An array of ",(0,n.jsx)(e.a,{href:"/artemis-api/docs/Artifacts/macOS%20Artifacts/unifiedlogs",children:"UnifiedLog"})," entries associated with sudo activity"]})]})}function u(t={}){const{wrapper:e}={...(0,i.M)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(l,{...t})}):l(t)}},2172:(t,e,s)=>{s.d(e,{I:()=>c,M:()=>r});var n=s(1504);const i={},o=n.createContext(i);function r(t){const e=n.useContext(o);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:r(t.components),n.createElement(o.Provider,{value:e},t.children)}}}]);