"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1829],{92496:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>n,default:()=>m,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var s=a(74848),i=a(28453);const r={description:"Alias data on macOS",keywords:["macOS","binary","file metadata"]},n="Alias",c={id:"Artifacts/macOS Artifacts/alias",title:"Alias",description:"Alias data on macOS",source:"@site/docs/Artifacts/macOS Artifacts/alias.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/alias",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/alias",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/alias.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"Alias data on macOS",keywords:["macOS","binary","file metadata"]},sidebar:"artemisArtifacts",previous:{title:"macOS Artifacts",permalink:"/artemis-api/docs/category/macos-artifacts"},next:{title:"Applications",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/apps"}},o={},l=[];function d(t){const e={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,i.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"alias",children:"Alias"})}),"\n",(0,s.jsxs)(e.p,{children:["macOS ",(0,s.jsx)(e.code,{children:"alias"})," data is similar to Windows ",(0,s.jsx)(e.code,{children:"Shortcut"})," artifacts. It points to\nanother file on the system. Alias data is sometimes found in plist files. The\nmacOS ",(0,s.jsx)(e.a,{href:"/artemis-api/docs/Artifacts/macOS%20Artifacts/firewall",children:"Firewall"})," artifact contains alias data."]}),"\n",(0,s.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(e.p,{children:["You have to use the artemis ",(0,s.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse\n",(0,s.jsx)(e.code,{children:"alias"})," data."]}),"\n",(0,s.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:'import { parseAlias } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  // Need to obtain alias bytes from another file. Plist files may have alias data.\n  // Ex: The macOS Firewall artifact contains alias data\n  const results = parseAlias(new Uint8Array());\n  console.log(results);\n}\n'})}),"\n",(0,s.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(e.p,{children:["An ",(0,s.jsx)(e.code,{children:"alias"})," object structure"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"export interface Alias {\n  kind: string;\n  volume_name: string;\n  volume_created: string;\n  filesystem_type: number;\n  disk_type: number;\n  cnid: number;\n  target_name: string;\n  target_cnid: number;\n  target_created: string;\n  target_creator_code: number;\n  target_type_code: number;\n  number_directory_levels_from_alias_to_root: number;\n  number_directory_levels_from_root_to_target: number;\n  volume_attributes: number;\n  volume_filesystem_id: number;\n  tags: AliasTags;\n}\n\nexport interface AliasTags {\n  carbon_paths: string[];\n  paths: string[];\n}\n"})})]})}function m(t={}){const{wrapper:e}={...(0,i.R)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(d,{...t})}):d(t)}},28453:(t,e,a)=>{a.d(e,{R:()=>n,x:()=>c});var s=a(96540);const i={},r=s.createContext(i);function n(t){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:n(t.components),s.createElement(r.Provider,{value:e},t.children)}}}]);