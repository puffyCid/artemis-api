"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3908],{18712:(s,e,t)=>{t.r(e),t.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var n=t(17624),r=t(4552);const i={description:"macOS users",keywords:["macos","accounts","plist"]},a="Users",c={id:"Artifacts/macOS Artifacts/users",title:"Users",description:"macOS users",source:"@site/docs/Artifacts/macOS Artifacts/users.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/users",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/users",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/users.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"macOS users",keywords:["macos","accounts","plist"]},sidebar:"artemisArtifacts",previous:{title:"UnifiedLogs",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/unifiedlogs"},next:{title:"WiFi",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/wifi"}},o={},l=[];function d(s){const e={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.M)(),...s.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"users",children:"Users"}),"\n",(0,n.jsxs)(e.p,{children:["Gets user info parsing the ",(0,n.jsx)(e.code,{children:"plist"})," files at\n",(0,n.jsx)(e.code,{children:"/var/db/dslocal/nodes/Default/users"}),"."]}),"\n",(0,n.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:["Any tool that can parse a ",(0,n.jsx)(e.code,{children:"plist"})," file"]}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:"References:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "users_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "user-macos"\n[artifacts.users]\n# Optional\n# alt_path = ""\n'})}),"\n",(0,n.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"alt_path"})," Use an alternative Users path. This configuration is ",(0,n.jsx)(e.strong,{children:"optional"}),".\nBy default artemis will read all Users at\n",(0,n.jsx)(e.code,{children:"/var/db/dslocal/nodes/Default/users"})]}),"\n"]}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["An array of ",(0,n.jsx)(e.code,{children:"Users"})," entries"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface Users {\n  /**UID for the user */\n  uid: string[];\n  /**GID associated with the user */\n  gid: string[];\n  /**User name */\n  name: string[];\n  /**Real name associated with user */\n  real_name: string[];\n  /**Base64 encoded photo associated with user */\n  account_photo: string[];\n  /**Timestamp the user was created */\n  account_created: string;\n  /**Password last changed for the user */\n  password_last_set: string;\n  /**Shell associated with the user */\n  shell: string[];\n  /**Unlock associated with the user */\n  unlock_options: string[];\n  /**Home path associated with user */\n  home_path: string[];\n  /**UUID associated with user */\n  uuid: string[];\n"})})]})}function u(s={}){const{wrapper:e}={...(0,r.M)(),...s.components};return e?(0,n.jsx)(e,{...s,children:(0,n.jsx)(d,{...s})}):d(s)}},4552:(s,e,t)=>{t.d(e,{I:()=>c,M:()=>a});var n=t(11504);const r={},i=n.createContext(r);function a(s){const e=n.useContext(i);return n.useMemo((function(){return"function"==typeof s?s(e):{...e,...s}}),[e,s])}function c(s){let e;return e=s.disableParentContext?"function"==typeof s.components?s.components(r):s.components||r:a(s.components),n.createElement(i.Provider,{value:e},s.children)}}}]);