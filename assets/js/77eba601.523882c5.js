"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5760],{93928:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>l,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var i=n(17624),s=n(4552);const r={description:"Codesigning info",keywords:["macos","binary"]},a="Codesigning",c={id:"Artifacts/macOS Artifacts/codesigning",title:"Codesigning",description:"Codesigning info",source:"@site/docs/Artifacts/macOS Artifacts/codesigning.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/codesigning",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/codesigning",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/codesigning.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"Codesigning info",keywords:["macos","binary"]},sidebar:"artemisArtifacts",previous:{title:"Bookmarks",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/bookmarks"},next:{title:"Cron",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/cron"}},o={},d=[];function m(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,s.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"codesigning",children:"Codesigning"}),"\n",(0,i.jsxs)(t.p,{children:["Artemis can extract some parts of macOS ",(0,i.jsx)(t.code,{children:"Codesigning"})," metadata. Currently it\nonly supports parsing the Requirements blob from Codesigning metadata."]}),"\n",(0,i.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,i.jsxs)(t.p,{children:["You have to use the artemis ",(0,i.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse\nCodesigning data."]}),"\n",(0,i.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:'import { parseRequirementBlob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  // Need to obtain alias bytes from another file. Plist files may have Codesigning data.\n  // Ex: The macOS Firewall artifact contains codesigning data\n  const results = parseRequirementBlob(new Uint8Array());\n  // The macOS command: csreq -v -r- -t < bytes.raw\n  // can be used to compare results\n  console.log(results);\n}\n'})}),"\n",(0,i.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(t.p,{children:["A ",(0,i.jsx)(t.code,{children:"SingleRequirement"})," object structure"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:"export interface SingleRequirement {\n  identifier: string;\n  team_id: string;\n  cdhash: string;\n}\n"})})]})}function l(e={}){const{wrapper:t}={...(0,s.M)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},4552:(e,t,n)=>{n.d(t,{I:()=>c,M:()=>a});var i=n(11504);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);