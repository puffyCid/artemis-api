"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[7748],{7820:(t,s,e)=>{e.r(s),e.d(s,{assets:()=>a,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var n=e(7624),i=e(2172);const o={description:"Linux sudo records",keywords:["linux","logs","binary"]},r="Sudo Logs",c={id:"Artifacts/Linux Artifacts/sudo",title:"Sudo Logs",description:"Linux sudo records",source:"@site/docs/Artifacts/Linux Artifacts/sudo.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/sudo",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/sudo",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/sudo.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1718072734e3,frontMatter:{description:"Linux sudo records",keywords:["linux","logs","binary"]},sidebar:"artemisArtifacts",previous:{title:"Shell History",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/shellhistory"},next:{title:"SystemInfo",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/systeminfo"}},a={},d=[];function l(t){const s={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.M)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"sudo-logs",children:"Sudo Logs"}),"\n",(0,n.jsxs)(s.p,{children:["Unix ",(0,n.jsx)(s.code,{children:"SudoLogs"}),' are the log files associated with sudo execution. Sudo ("super\nuser do" or "substitute user") is used to run programs with elevated privileges.']}),"\n",(0,n.jsxs)(s.p,{children:["Linux ",(0,n.jsx)(s.code,{children:"SudoLogs"})," are stored in the Systemd Journal files.",(0,n.jsx)("br",{})," The log entries\nshow evidence of commands executed with elevated privileges"]}),"\n",(0,n.jsx)(s.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"None"}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"References:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(s.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-toml",children:'system = "linux"\n\n[output]\nname = "sudologs_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "sudologs-linux"\n[artifacts.sudologs_linux]\n# Optional\n# alt_path = ""\n'})}),"\n",(0,n.jsx)(s.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"alt_path"})," Path to a directory containing Journal files. This configuration is\n",(0,n.jsx)(s.strong,{children:"optional"})]}),"\n"]}),"\n",(0,n.jsx)(s.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(s.p,{children:["An array of ",(0,n.jsx)(s.a,{href:"/artemis-api/docs/Artifacts/Linux%20Artifacts/journals",children:"Journal"})," entries containing sudo activity"]})]})}function u(t={}){const{wrapper:s}={...(0,i.M)(),...t.components};return s?(0,n.jsx)(s,{...t,children:(0,n.jsx)(l,{...t})}):l(t)}},2172:(t,s,e)=>{e.d(s,{I:()=>c,M:()=>r});var n=e(1504);const i={},o=n.createContext(i);function r(t){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof t?t(s):{...s,...t}}),[s,t])}function c(t){let s;return s=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:r(t.components),n.createElement(o.Provider,{value:s},t.children)}}}]);