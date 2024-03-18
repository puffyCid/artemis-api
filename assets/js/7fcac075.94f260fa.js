"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6432],{9796:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>o,contentTitle:()=>r,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var n=i(7624),a=i(2172);const s={description:"macOS bill of materials (BOM)",keywords:["macos","file metadata","binary"]},r="Bill of Materials",c={id:"Artifacts/macOS Artifacts/bom",title:"Bill of Materials",description:"macOS bill of materials (BOM)",source:"@site/docs/Artifacts/macOS Artifacts/bom.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/bom",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/bom",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/bom.md",tags:[],version:"current",frontMatter:{description:"macOS bill of materials (BOM)",keywords:["macos","file metadata","binary"]},sidebar:"artemisArtifacts",previous:{title:"Applications",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/apps"},next:{title:"Codesigning",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/codesigning"}},o={},l=[];function m(t){const e={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,a.M)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"bill-of-materials",children:"Bill of Materials"}),"\n",(0,n.jsxs)(e.p,{children:["macOS Bill of Materials (",(0,n.jsx)(e.code,{children:"BOM"}),") files are created when a user installs an\napplication using the builtin package installer on macOS. BOM files contain\nmetadata associated with the install application."]}),"\n",(0,n.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(e.p,{children:["You have to use the artemis ",(0,n.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse ",(0,n.jsx)(e.code,{children:"BOM"}),"\ndata."]}),"\n",(0,n.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:'import { parseBom } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const path = "path to bom file";\n  const results = parseBom(path);\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["A ",(0,n.jsx)(e.code,{children:"BOM"})," object structure"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface Bom {\n  package_name: string;\n  install_data: string;\n  package_id: string;\n  package_version: string;\n  install_process_name: string;\n  install_prefix_path: string;\n  path: string;\n  /**Path to BOM file */\n  bom_path: string;\n  files: BomFiles[];\n}\n\n/**\n * Bill of Materials (BOM) data\n */\nexport interface BomFiles {\n  /**User ID. Often blank */\n  uid: number;\n  /**Group ID. Often blank */\n  gid: number;\n  /**File permissions as decimal value */\n  mode: number;\n  /**File size */\n  size: number;\n  /**Path to file */\n  path: string;\n  /**Modified timestamp of file in UNIXEPOCH seconds */\n  modified: number;\n  /**CRC-32 checksum for file */\n  checksum: string;\n}\n"})})]})}function p(t={}){const{wrapper:e}={...(0,a.M)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(m,{...t})}):m(t)}},2172:(t,e,i)=>{i.d(e,{I:()=>c,M:()=>r});var n=i(1504);const a={},s=n.createContext(a);function r(t){const e=n.useContext(s);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(a):t.components||a:r(t.components),n.createElement(s.Provider,{value:e},t.children)}}}]);