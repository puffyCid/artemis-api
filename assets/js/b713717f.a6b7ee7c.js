"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9538],{4352:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var o=e(7624),s=e(2172);const r={description:"Windows Logon events",keywords:["windows","eventlogs"]},i="Logons",c={id:"Artifacts/Windows Artfacts/logons",title:"Logons",description:"Windows Logon events",source:"@site/docs/Artifacts/Windows Artfacts/logons.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/logons",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/logons",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/logons.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1717993766e3,frontMatter:{description:"Windows Logon events",keywords:["windows","eventlogs"]},sidebar:"artemisArtifacts",previous:{title:"Jumplists",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/jumplists"},next:{title:"Most Recently Used",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/mru"}},a={},d=[];function l(t){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,s.M)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"logons",children:"Logons"}),"\n",(0,o.jsx)(n.p,{children:"Artemis supports extracting Logon entries from the Windows EventLog\nSecurity.evtx file. Artemis will try to correlate logon and logoff entries."}),"\n",(0,o.jsx)(n.h1,{id:"collection",children:"Collection"}),"\n",(0,o.jsxs)(n.p,{children:["You have to use the artemis ",(0,o.jsx)(n.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\nLogon entries."]}),"\n",(0,o.jsx)(n.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:'import {\n  logons,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const path = "path to Security.evtx";\n  const results = logons(path);\n\n  console.log(results);\n}\n'})}),"\n",(0,o.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,o.jsxs)(n.p,{children:["An array of ",(0,o.jsx)(n.code,{children:"Logons"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:'export interface Logons {\n  logon_type: LogonType;\n  sid: string;\n  account_name: string;\n  account_domain: string;\n  logon_id: string;\n  logon_process: string;\n  authentication_package: string;\n  source_ip: string;\n  source_workstation: string;\n  logon_time: string;\n  logoff_time: string;\n  duration: number;\n}\n\nexport enum LogonType {\n  Network = "Network",\n  Interactive = "Interactive",\n  Batch = "Batch",\n  Service = "Service",\n  Unlock = "Unlock",\n  NetworkCleartext = "NetworkCleartext",\n  NewCredentials = "NewCredentials",\n  RemoteInteractive = "RemoteInteractive",\n  CacheInteractive = "CacheInteractive",\n  Unknown = "Unknown",\n}\n'})})]})}function p(t={}){const{wrapper:n}={...(0,s.M)(),...t.components};return n?(0,o.jsx)(n,{...t,children:(0,o.jsx)(l,{...t})}):l(t)}},2172:(t,n,e)=>{e.d(n,{I:()=>c,M:()=>i});var o=e(1504);const s={},r=o.createContext(s);function i(t){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function c(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:i(t.components),o.createElement(r.Provider,{value:n},t.children)}}}]);