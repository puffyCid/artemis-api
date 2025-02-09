"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4329],{5584:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>p,frontMatter:()=>c,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"Artifacts/macOS Artifacts/docktile","title":"Dock Tiles","description":"macOS persistence via Dock","source":"@site/docs/Artifacts/macOS Artifacts/docktile.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/docktile","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/docktile","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/docktile.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"macOS persistence via Dock","keywords":["macOS","persistence","plist"]},"sidebar":"artemisArtifacts","previous":{"title":"Cron","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/cron"},"next":{"title":"Emond","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/emond"}}');var s=i(4848),r=i(8453);const c={description:"macOS persistence via Dock",keywords:["macOS","persistence","plist"]},a="Dock Tiles",o={},l=[];function d(e){const t={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"dock-tiles",children:"Dock Tiles"})}),"\n",(0,s.jsx)(t.p,{children:"A Dock Tile is way to maintain persistence on a macOS system. They are\nregistered in Info.plist files for Applications. Artemis supports checking for\nany Applications containing Dock Tile persistence."}),"\n",(0,s.jsx)(t.p,{children:"References:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://theevilbit.github.io/beyond/beyond_0032/",children:"TheEvilBit"})}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(t.p,{children:["You have to use the artemis ",(0,s.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse Dock\nTile data."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'import { dockTiles } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  const results = await dockTiles();\n  console.log(results);\n}\n'})}),"\n",(0,s.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(t.p,{children:["Array of ",(0,s.jsx)(t.code,{children:"Applications"})," with Dock Tile persistence"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"export interface Applications {\n  filename: string;\n  full_path: string;\n  bundle_executable: string;\n  bundle_id: string;\n  bundle_name: string;\n  bundle_short_version: string;\n  bundle_version: string;\n  display_name: string;\n  copyright: string;\n  /**Base64 encoded PNG file*/\n  icon: string;\n  info: string;\n}\n"})})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>c,x:()=>a});var n=i(6540);const s={},r=n.createContext(s);function c(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);