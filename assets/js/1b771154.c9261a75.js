"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2757],{1931:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"Artifacts/macOS Artifacts/apps","title":"Applications","description":"Applications on macOS","source":"@site/docs/Artifacts/macOS Artifacts/apps.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/apps","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/apps","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/apps.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Applications on macOS","keywords":["macOS","file metadata","plist"]},"sidebar":"artemisArtifacts","previous":{"title":"Alias","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/alias"},"next":{"title":"Biome","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/biome"}}');var s=e(4848),a=e(8453);const r={description:"Applications on macOS",keywords:["macOS","file metadata","plist"]},c="Applications",o={},l=[];function p(t){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"applications",children:"Applications"})}),"\n",(0,s.jsx)(n.p,{children:"Users often install applications on macOS devices. Artemis has the ability to\nparse Application metadata at common paths. In addition, it can scan the entire\nfilesystem (asynchronously) looking for installed applications."}),"\n",(0,s.jsx)(n.p,{children:"By default artemis will look for apps at:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"/usr/local/Cellar"}),"\n",(0,s.jsx)(n.li,{children:"/opt/homebrew/Cellar"}),"\n",(0,s.jsx)(n.li,{children:"/Applications"}),"\n",(0,s.jsx)(n.li,{children:"/System/Applications"}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(n.p,{children:["You have to use the artemis ",(0,s.jsx)(n.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to get\ninstalled applications."]}),"\n",(0,s.jsx)(n.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'import {\n  listApps,\n  scanApps,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  // Gets simple application listing at known macOS paths.\n  const results = listApps();\n  // Scans the entire filesystem looking for installed apps\n  const data = await scanApps();\n\n  console.log(data);\n}\n'})}),"\n",(0,s.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(n.p,{children:["Array of ",(0,s.jsx)(n.code,{children:"Applications"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"export interface Applications {\n  filename: string;\n  full_path: string;\n  bundle_executable: string;\n  bundle_id: string;\n  bundle_name: string;\n  bundle_short_version: string;\n  bundle_version: string;\n  display_name: string;\n  copyright: string;\n  /**Base64 encoded PNG file*/\n  icon: string;\n  info: string;\n}\n"})})]})}function d(t={}){const{wrapper:n}={...(0,a.R)(),...t.components};return n?(0,s.jsx)(n,{...t,children:(0,s.jsx)(p,{...t})}):p(t)}},8453:(t,n,e)=>{e.d(n,{R:()=>r,x:()=>c});var i=e(6540);const s={},a=i.createContext(s);function r(t){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function c(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:r(t.components),i.createElement(a.Provider,{value:n},t.children)}}}]);