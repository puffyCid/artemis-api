"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6620],{28453:(t,e,n)=>{n.d(e,{R:()=>r,x:()=>c});var s=n(96540);const o={},a=s.createContext(o);function r(t){const e=s.useContext(a);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:r(t.components),s.createElement(a.Provider,{value:e},t.children)}},90114:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>i,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"Artifacts/Windows Artfacts/chocolatey","title":"Chocolatey","description":"Chocolatey packages","source":"@site/docs/Artifacts/Windows Artfacts/chocolatey.md","sourceDirName":"Artifacts/Windows Artfacts","slug":"/Artifacts/Windows Artfacts/chocolatey","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/chocolatey","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/chocolatey.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"Chocolatey packages","keywords":["windows","plaintext"]},"sidebar":"artemisArtifacts","previous":{"title":"BITS","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/bits"},"next":{"title":"Connections","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/connections"}}');var o=n(74848),a=n(28453);const r={description:"Chocolatey packages",keywords:["windows","plaintext"]},c="Chocolatey",i={},l=[];function d(t){const e={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,a.R)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.header,{children:(0,o.jsx)(e.h1,{id:"chocolatey",children:"Chocolatey"})}),"\n",(0,o.jsx)(e.p,{children:"Chocolatey is an open source package manager for Windows. Artemis supports\ngetting a list of installed Chocolatey packages on the system."}),"\n",(0,o.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,o.jsxs)(e.p,{children:["You have to use the artemis ",(0,o.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to get\ninstalled Chocolatey packages."]}),"\n",(0,o.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-typescript",children:'import {\n  getChocolateyInfo,\n} from "./artemis-api/mod";\n\nfunction main() {\n  const results = getChocolateyInfo();\n\n  console.log(results);\n}\n'})}),"\n",(0,o.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,o.jsxs)(e.p,{children:["An array of ",(0,o.jsx)(e.code,{children:"ChocolateyInfo"})]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-typescript",children:"export interface ChocolateyInfo {\n  name: string;\n  version: string;\n  summary: string;\n  author: string;\n  license: string;\n  tags: string[];\n  path: string;\n}\n"})})]})}function p(t={}){const{wrapper:e}={...(0,a.R)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(d,{...t})}):d(t)}}}]);