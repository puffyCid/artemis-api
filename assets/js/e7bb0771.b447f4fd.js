"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4721],{4460:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>i,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=n(7624),o=n(2172);const r={description:"Chocolatey packages",keywords:["windows","plaintext"]},c="Chocolatey",a={id:"Artifacts/Windows Artfacts/chocolatey",title:"Chocolatey",description:"Chocolatey packages",source:"@site/docs/Artifacts/Windows Artfacts/chocolatey.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/chocolatey",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/chocolatey",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/chocolatey.md",tags:[],version:"current",frontMatter:{description:"Chocolatey packages",keywords:["windows","plaintext"]},sidebar:"artemisArtifacts",previous:{title:"BITS",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/bits"},next:{title:"Extensible Storage Engine",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/ese"}},i={},l=[];function d(t){const e={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,o.M)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"chocolatey",children:"Chocolatey"}),"\n",(0,s.jsx)(e.p,{children:"Chocolatey is an open source package manager for Windows. Artemis supports\ngetting a list of installed Chocolatey packages on the system."}),"\n",(0,s.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(e.p,{children:["You have to use the artemis ",(0,s.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to get\ninstalled Chocolatey packages."]}),"\n",(0,s.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:'import {\n  getChocolateyInfo,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  const results = getChocolateyInfo();\n\n  console.log(results);\n}\n'})}),"\n",(0,s.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(e.p,{children:["An array of ",(0,s.jsx)(e.code,{children:"ChocolateyInfo"})]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"export interface ChocolateyInfo {\n  name: string;\n  version: string;\n  summary: string;\n  author: string;\n  license: string;\n  tags: string[];\n  path: string;\n}\n"})})]})}function p(t={}){const{wrapper:e}={...(0,o.M)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(d,{...t})}):d(t)}},2172:(t,e,n)=>{n.d(e,{I:()=>a,M:()=>c});var s=n(1504);const o={},r=s.createContext(o);function c(t){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:c(t.components),s.createElement(r.Provider,{value:e},t.children)}}}]);