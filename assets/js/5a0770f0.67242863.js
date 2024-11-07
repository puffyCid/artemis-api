"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6929],{36277:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>a,contentTitle:()=>c,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>f});var n=t(74848),r=t(28453);const s={description:"Open source Office application",keywords:["office software"]},c="LibreOffice",o={id:"Artifacts/Application Artifacts/libreoffice",title:"LibreOffice",description:"Open source Office application",source:"@site/docs/Artifacts/Application Artifacts/libreoffice.md",sourceDirName:"Artifacts/Application Artifacts",slug:"/Artifacts/Application Artifacts/libreoffice",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/libreoffice",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Application Artifacts/libreoffice.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"Open source Office application",keywords:["office software"]},sidebar:"artemisArtifacts",previous:{title:"Firefox",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/firefox"},next:{title:"Microsoft Office",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/office"}},a={},f=[];function p(e){const i={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"libreoffice",children:"LibreOffice"})}),"\n",(0,n.jsx)(i.p,{children:"LibreOffice is a popular open source office software. Artemis supports parsing\nrecently opened files by the LibreOffice applications."}),"\n",(0,n.jsx)(i.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(i.p,{children:["You have to use the artemis ",(0,n.jsx)(i.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\nLibreOffice information."]}),"\n",(0,n.jsx)(i.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-typescript",children:'import {\n  PlatformType,\n  recentFiles,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const results = recentFiles(PlatformType.Darwin);\n\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(i.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(i.p,{children:["An array of ",(0,n.jsx)(i.code,{children:"RecentFilesLibreOffice"})," entries."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-typescript",children:"/**\n * List of files opened by LibreOffice\n */\ninterface RecentFilesLibreOffice {\n  /**Path to file */\n  path: string;\n  /**Document title */\n  title: string;\n  /**Filter for file */\n  filter: string;\n  /**If file is pinned */\n  pinned: boolean;\n  /**If file is password protected */\n  password: string;\n  /**If file is marked readonly */\n  readonly: boolean;\n  /**Base64 encoded thumbnail of file */\n  thumbnail: string;\n  /**Path to registrymodifications.xcu */\n  source: string;\n}\n"})})]})}function l(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>c,x:()=>o});var n=t(96540);const r={},s=n.createContext(r);function c(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);