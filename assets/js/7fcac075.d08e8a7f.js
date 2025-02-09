"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4833],{64:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"Artifacts/macOS Artifacts/bom","title":"Bill of Materials","description":"macOS bill of materials (BOM)","source":"@site/docs/Artifacts/macOS Artifacts/bom.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/bom","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/bom","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/bom.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"macOS bill of materials (BOM)","keywords":["macos","file metadata","binary"]},"sidebar":"artemisArtifacts","previous":{"title":"Biome","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/biome"},"next":{"title":"Bookmarks","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/bookmarks"}}');var n=a(4848),s=a(8453);const r={description:"macOS bill of materials (BOM)",keywords:["macos","file metadata","binary"]},c="Bill of Materials",o={},l=[];function m(t){const e={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,s.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"bill-of-materials",children:"Bill of Materials"})}),"\n",(0,n.jsxs)(e.p,{children:["macOS Bill of Materials (",(0,n.jsx)(e.code,{children:"BOM"}),") files are created when a user installs an\napplication using the builtin package installer on macOS. BOM files contain\nmetadata associated with the install application."]}),"\n",(0,n.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(e.p,{children:["You have to use the artemis ",(0,n.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse ",(0,n.jsx)(e.code,{children:"BOM"}),"\ndata."]}),"\n",(0,n.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:'import { parseBom } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const path = "path to bom file";\n  const results = parseBom(path);\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["A ",(0,n.jsx)(e.code,{children:"BOM"})," object structure"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface Bom {\n  package_name: string;\n  install_data: string;\n  package_id: string;\n  package_version: string;\n  install_process_name: string;\n  install_prefix_path: string;\n  path: string;\n  /**Path to BOM file */\n  bom_path: string;\n  files: BomFiles[];\n}\n\n/**\n * Bill of Materials (BOM) data\n */\nexport interface BomFiles {\n  /**User ID. Often blank */\n  uid: number;\n  /**Group ID. Often blank */\n  gid: number;\n  /**File permissions as decimal value */\n  mode: number;\n  /**File size */\n  size: number;\n  /**Path to file */\n  path: string;\n  /**Modified timestamp of file */\n  modified: string;\n  /**CRC-32 checksum for file */\n  checksum: string;\n}\n"})})]})}function d(t={}){const{wrapper:e}={...(0,s.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(m,{...t})}):m(t)}},8453:(t,e,a)=>{a.d(e,{R:()=>r,x:()=>c});var i=a(6540);const n={},s=i.createContext(n);function r(t){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(n):t.components||n:r(t.components),i.createElement(s.Provider,{value:e},t.children)}}}]);