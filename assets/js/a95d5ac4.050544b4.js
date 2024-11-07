"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3733],{69347:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var n=s(74848),i=s(28453);const r={description:"Windows Service Install events",keywords:["windows","eventlogs"]},c="Service Installs",a={id:"Artifacts/Windows Artfacts/serviceinstall",title:"Service Installs",description:"Windows Service Install events",source:"@site/docs/Artifacts/Windows Artfacts/serviceinstall.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/serviceinstall",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/serviceinstall",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/serviceinstall.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"Windows Service Install events",keywords:["windows","eventlogs"]},sidebar:"artemisArtifacts",previous:{title:"Search",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/search"},next:{title:"Services",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/services"}},o={},l=[];function d(e){const t={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"service-installs",children:"Service Installs"})}),"\n",(0,n.jsx)(t.p,{children:"Artemis supports extracting Service Install events from the Windows EventLog\nSystem.evtx file."}),"\n",(0,n.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(t.p,{children:["You have to use the artemis ",(0,n.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\nService Install entries."]}),"\n",(0,n.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:'import { serviceInstalls } from "./artemis-api/src/windows/eventlogs/services.ts";\n\nfunction main() {\n  const data = serviceInstalls(\n    "C:\\\\Windows\\\\System32\\\\winevt\\\\Logs\\\\System.evtx",\n  );\n  console.log(data);\n}\n\nmain();\n'})}),"\n",(0,n.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(t.p,{children:["An array of ",(0,n.jsx)(t.code,{children:"ServiceInstalls"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface ServiceInstalls {\n  name: string;\n  image_path: string;\n  service_type: string;\n  start_type: string;\n  account: string;\n  hostname: string;\n  timestamp: string;\n  process_id: number;\n  thread_id: number;\n  sid: string;\n}\n"})})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>c,x:()=>a});var n=s(96540);const i={},r=n.createContext(i);function c(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);