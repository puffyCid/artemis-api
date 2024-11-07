"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2092],{51504:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>n,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var a=r(74848),i=r(28453);const s={description:"macOS BIOME data",keywords:["macos","protobuf","binary"]},n="Biome",o={id:"Artifacts/macOS Artifacts/biome",title:"Biome",description:"macOS BIOME data",source:"@site/docs/Artifacts/macOS Artifacts/biome.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/biome",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/biome",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/biome.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"macOS BIOME data",keywords:["macos","protobuf","binary"]},sidebar:"artemisArtifacts",previous:{title:"Applications",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/apps"},next:{title:"Bill of Materials",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/bom"}},c={},d=[];function p(t){const e={a:"a",br:"br",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...t.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"biome",children:"Biome"})}),"\n",(0,a.jsxs)(e.p,{children:["macOS BIOME data contains data related to application runtime. It partially\nreplaces the KnowledgeC.db.",(0,a.jsx)(e.br,{}),"\n","Its kind of similar to Windows SRUM"]}),"\n",(0,a.jsxs)(e.p,{children:["Biome files are stored in binary format that contains\n",(0,a.jsx)(e.a,{href:"https://protobuf.dev/",children:"Protobuf"})," data. It is very difficult (nearly impossible)\nto parse Protobuf data perfectly without the associated Proto file."]}),"\n",(0,a.jsxs)(e.p,{children:["Artemis has been heavily tested to parse App.InFocus Biome data which contains\ninformation related to application runtime. By default artemis will ",(0,a.jsx)(e.strong,{children:"only"}),"\nparse App.InFocus Biome files.",(0,a.jsx)(e.br,{}),"\n","However, you may enable parsing of all Biome files."]}),"\n",(0,a.jsx)(e.p,{children:"As mentioned in the output structure below, currently artemis does not do any\npost-processing of the data."}),"\n",(0,a.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,a.jsxs)(e.p,{children:["You have to use the artemis ",(0,a.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse\n",(0,a.jsx)(e.code,{children:"BIOME"})," data."]}),"\n",(0,a.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-typescript",children:'import { parseBiome } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const results = parseBom();\n  console.log(results);\n}\n'})}),"\n",(0,a.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,a.jsxs)(e.p,{children:["A ",(0,a.jsx)(e.code,{children:"Biome"})," object structure"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-typescript",children:"export interface Biome {\n  path: string;\n  /**\n   * BIOME files contain Protobuf data. Each type of BIOME needs to be extracted.\n   * Further research could be done to extract raw data into specific interfaces\n   * If parsing fails, we base64 encode the protobuf data and include that\n   */\n  raw: Record<string, unknown>[];\n}\n"})})]})}function l(t={}){const{wrapper:e}={...(0,i.R)(),...t.components};return e?(0,a.jsx)(e,{...t,children:(0,a.jsx)(p,{...t})}):p(t)}},28453:(t,e,r)=>{r.d(e,{R:()=>n,x:()=>o});var a=r(96540);const i={},s=a.createContext(i);function n(t){const e=a.useContext(s);return a.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function o(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:n(t.components),a.createElement(s.Provider,{value:e},t.children)}}}]);