"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5849],{9015:(t,e,s)=>{s.r(e),s.d(e,{assets:()=>a,contentTitle:()=>i,default:()=>p,frontMatter:()=>c,metadata:()=>o,toc:()=>l});var n=s(5893),r=s(1151);const c={description:"macOS groups",keywords:["macos","accounts","plist"]},i="Groups",o={id:"Artifacts/macOS Artifacts/groups",title:"Groups",description:"macOS groups",source:"@site/docs/Artifacts/macOS Artifacts/groups.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/groups",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/groups",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/groups.md",tags:[],version:"current",frontMatter:{description:"macOS groups",keywords:["macos","accounts","plist"]},sidebar:"artemisArtifacts",previous:{title:"Fsevents",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/fsevents"},next:{title:"Launchd",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/launchd"}},a={},l=[];function u(t){const e={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"groups",children:"Groups"}),"\n",(0,n.jsxs)(e.p,{children:["Gets group info parsing the ",(0,n.jsx)(e.code,{children:"plist"})," files at\n",(0,n.jsx)(e.code,{children:"/var/db/dslocal/nodes/Default/groups"}),"."]}),"\n",(0,n.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:["Any tool that can parse a ",(0,n.jsx)(e.code,{children:"plist"})," file"]}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:"References:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "groups_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "groups"\n'})}),"\n",(0,n.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["An array of ",(0,n.jsx)(e.code,{children:"Groups"})," entries"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface Groups {\n  /**GID for the group */\n  gid: string[];\n  /**Name of the group */\n  name: string[];\n  /**Real name associated with the group */\n  real_name: string[];\n  /**Users associated with group */\n  users: string[];\n  /**Group members in the group */\n  groupmembers: string[];\n  /**UUID associated with the group */\n  uuid: string[];\n}\n"})})]})}function p(t={}){const{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(u,{...t})}):u(t)}},1151:(t,e,s)=>{s.d(e,{Z:()=>o,a:()=>i});var n=s(7294);const r={},c=n.createContext(r);function i(t){const e=n.useContext(c);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function o(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:i(t.components),n.createElement(c.Provider,{value:e},t.children)}}}]);