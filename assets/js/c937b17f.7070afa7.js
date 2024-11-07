"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4317],{94033:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>o,contentTitle:()=>c,default:()=>l,frontMatter:()=>s,metadata:()=>a,toc:()=>p});var n=r(74848),i=r(28453);const s={description:"The macOS Antivirus engine",keywords:["macOS","plist"]},c="Xprotect",a={id:"Artifacts/macOS Artifacts/xprotect",title:"Xprotect",description:"The macOS Antivirus engine",source:"@site/docs/Artifacts/macOS Artifacts/xprotect.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/xprotect",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/xprotect",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/xprotect.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"The macOS Antivirus engine",keywords:["macOS","plist"]},sidebar:"artemisArtifacts",previous:{title:"WiFi",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/wifi"},next:{title:"Windows Artifacts",permalink:"/artemis-api/docs/category/windows-artifacts"}},o={},p=[];function d(t){const e={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"xprotect",children:"Xprotect"})}),"\n",(0,n.jsx)(e.p,{children:"Xprotect is a signature based macOS AV engine for detecting malicious activity\non a macOS system. Artemis can extract some Xprotect defintions on the system.\nCurrently artemis will try to parse the Xprotect entries at:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"/Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/Xprotect.plist"}),"\n",(0,n.jsx)(e.li,{children:"/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Xprotect.plist"}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(e.p,{children:["You have to use the artemis ",(0,n.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\nXprotect data."]}),"\n",(0,n.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:'import {\n  getXprotectDefinitions,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const results = getXprotectDefinitions();\n\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["An array of ",(0,n.jsx)(e.code,{children:"XprotectEntries"})," entries."]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface XprotectEntries {\n  name: string;\n  launch_type: string;\n  matches: MatchData[];\n}\n\nexport interface MatchData {\n  /**Hex encoded values */\n  pattern: string;\n  filetype: string;\n  sha1: string;\n  filename: string;\n}\n"})})]})}function l(t={}){const{wrapper:e}={...(0,i.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(d,{...t})}):d(t)}},28453:(t,e,r)=>{r.d(e,{R:()=>c,x:()=>a});var n=r(96540);const i={},s=n.createContext(i);function c(t){const e=n.useContext(s);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:c(t.components),n.createElement(s.Provider,{value:e},t.children)}}}]);