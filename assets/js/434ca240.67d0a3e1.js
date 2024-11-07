"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8050],{90135:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var s=n(74848),r=n(28453);const i={description:"Most Recently Used entries",keywords:["windows","registry"]},o="Most Recently Used",c={id:"Artifacts/Windows Artfacts/mru",title:"Most Recently Used",description:"Most Recently Used entries",source:"@site/docs/Artifacts/Windows Artfacts/mru.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/mru",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/mru",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/mru.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"Most Recently Used entries",keywords:["windows","registry"]},sidebar:"artemisArtifacts",previous:{title:"Logons",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/logons"},next:{title:"Outlook",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/outlook"}},a={},d=[];function l(e){const t={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"most-recently-used",children:"Most Recently Used"})}),"\n",(0,s.jsx)(t.p,{children:"Artemis support extracting Most Recently Used (MRU) entries from multiple\nRegistry key paths in the NTUSER.DAT Registry file. MRU keys can provide\nevidence if a was accessed on a system. Artemis currently supports the following\nMRU keys:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU"}),"\n",(0,s.jsx)(t.li,{children:"Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\LastVisitedPidlMRU"}),"\n",(0,s.jsx)(t.li,{children:"Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs"}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(t.p,{children:["You have to use the artemis ",(0,s.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect MRU\nkeys."]}),"\n",(0,s.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'import {\n  parseMru,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  const path = "path to NTUSER.DAT";\n  const results = parseMru(path);\n\n  console.log(results);\n}\n'})}),"\n",(0,s.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(t.p,{children:["An array of ",(0,s.jsx)(t.code,{children:"Mru"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'export interface Mru {\n  ntuser_path: string;\n  kind: MruType;\n  mru: MruValues[];\n}\n\nexport interface MruValues {\n  /**Filename of MRU entry*/\n  filename: string;\n  /**Path to MRU entry */\n  path: string;\n  /**Created time of MRU entry */\n  created: string;\n  /**Modified time of MRU entry */\n  modified: string;\n  /**Accessed time of MRU entry */\n  accessed: string;\n  /**All ShellItems that make up the MRU entry */\n  items: ShellItems[];\n}\n\nexport enum MruType {\n  LASTVISITED = "LastVisisted",\n  OPENSAVE = "OpenSave",\n  RECENTDOCS = "RecentDocs",\n}\n'})})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>c});var s=n(96540);const r={},i=s.createContext(r);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);