"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5057],{63193:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>d});var s=t(74848),i=t(28453);const c={description:"macOS launch daemons and agents",keywords:["macOS","persistence","plist"]},a="Launchd",r={id:"Artifacts/macOS Artifacts/launchd",title:"Launchd",description:"macOS launch daemons and agents",source:"@site/docs/Artifacts/macOS Artifacts/launchd.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/launchd",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/launchd",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/launchd.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"macOS launch daemons and agents",keywords:["macOS","persistence","plist"]},sidebar:"artemisArtifacts",previous:{title:"Homebrew",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/homebrew"},next:{title:"Loginitems",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/loginitems"}},l={},d=[];function o(n){const e={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"launchd",children:"Launchd"})}),"\n",(0,s.jsxs)(e.p,{children:["macOS launch daemons (",(0,s.jsx)(e.code,{children:"launchd"}),") are the most common way to register\napplications for persistence on macOS. ",(0,s.jsx)(e.code,{children:"launchd"})," can be registered for a singler\nuser or system wide. artemis will try to parse all known",(0,s.jsx)(e.code,{children:"launchd"})," locations by\ndefault."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/Users/%/Library/LaunchDaemons/"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/Users/%/Library/LaunchAgents/"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/System/Library/LaunchDaemons/"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/Library/Apple/System/Library/LaunchDaemons/"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/System/Library/LaunchAgents/"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"/Library/Apple/System/Library/LaunchAgents/"})}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Any tool that can parse a ",(0,s.jsx)(e.code,{children:"plist"})," file"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"References:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://www.launchd.info/",children:"launchd"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"man launchd.plist"})}),"\n"]}),"\n",(0,s.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "launchd_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "launchd"\n[artifacts.launchd]\n# Optional\n# alt_file = ""\n'})}),"\n",(0,s.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"alt_file"})," Use an alternative Launchd file. This configuration is\n",(0,s.jsx)(e.strong,{children:"optional"}),". By default artemis will read all Launchd Daemons and Agents"]}),"\n"]}),"\n",(0,s.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(e.p,{children:["An array of ",(0,s.jsx)(e.code,{children:"Launchd"})," entries"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"export interface Launchd {\n  /**JSON representation of launchd plist contents */\n  launchd_data: Record<string, unknown>;\n  /**Full path of the plist file */\n  plist_path: string;\n  /**Created timestamp for plist file */\n  created: string;\n  /**Modified timestamp for plist file */\n  modified: string;\n  /**Accessed timestamp for plist file */\n  accessed: string;\n  /**Changed timestamp for plist file */\n  changed: string;\n}\n"})})]})}function h(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(o,{...n})}):o(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>a,x:()=>r});var s=t(96540);const i={},c=s.createContext(i);function a(n){const e=s.useContext(c);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),s.createElement(c.Provider,{value:e},n.children)}}}]);