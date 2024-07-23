"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5528],{10668:(t,e,s)=>{s.r(e),s.d(e,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var n=s(17624),r=s(4552);const i={description:"macOS groups",keywords:["macos","accounts","plist"]},o="Groups",c={id:"Artifacts/macOS Artifacts/groups",title:"Groups",description:"macOS groups",source:"@site/docs/Artifacts/macOS Artifacts/groups.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/groups",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/groups",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/groups.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"macOS groups",keywords:["macos","accounts","plist"]},sidebar:"artemisArtifacts",previous:{title:"Gatekeeper",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/gatekeeper"},next:{title:"Homebrew",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/homebrew"}},a={},l=[];function p(t){const e={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.M)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"groups",children:"Groups"}),"\n",(0,n.jsxs)(e.p,{children:["Gets group info parsing the ",(0,n.jsx)(e.code,{children:"plist"})," files at\n",(0,n.jsx)(e.code,{children:"/var/db/dslocal/nodes/Default/groups"}),"."]}),"\n",(0,n.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:["Any tool that can parse a ",(0,n.jsx)(e.code,{children:"plist"})," file"]}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:"References:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "groups_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "groups-macos"\n[artifacts.groups_macos]\n# Optional\n# alt_path = ""\n'})}),"\n",(0,n.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"alt_path"})," Use an alternative Groups path. This configuration is ",(0,n.jsx)(e.strong,{children:"optional"}),".\nBy default artemis will read all Groups at\n",(0,n.jsx)(e.code,{children:"/var/db/dslocal/nodes/Default/groups"})]}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["An array of ",(0,n.jsx)(e.code,{children:"Groups"})," entries"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface Groups {\n  /**GID for the group */\n  gid: string[];\n  /**Name of the group */\n  name: string[];\n  /**Real name associated with the group */\n  real_name: string[];\n  /**Users associated with group */\n  users: string[];\n  /**Group members in the group */\n  groupmembers: string[];\n  /**UUID associated with the group */\n  uuid: string[];\n}\n"})})]})}function d(t={}){const{wrapper:e}={...(0,r.M)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(p,{...t})}):p(t)}},4552:(t,e,s)=>{s.d(e,{I:()=>c,M:()=>o});var n=s(11504);const r={},i=n.createContext(r);function o(t){const e=n.useContext(i);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:o(t.components),n.createElement(i.Provider,{value:e},t.children)}}}]);