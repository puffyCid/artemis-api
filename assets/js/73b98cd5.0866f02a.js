"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[444],{1276:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>l,frontMatter:()=>r,metadata:()=>c,toc:()=>p});var n=i(7624),s=i(2172);const r={description:"macOS WiFi connections",keywords:["macOS","plist"]},a="WiFi",c={id:"Artifacts/macOS Artifacts/wifi",title:"WiFi",description:"macOS WiFi connections",source:"@site/docs/Artifacts/macOS Artifacts/wifi.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/wifi",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/wifi",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/wifi.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"macOS WiFi connections",keywords:["macOS","plist"]},sidebar:"artemisArtifacts",previous:{title:"Users",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/users"},next:{title:"Xprotect",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/xprotect"}},o={},p=[];function d(t){const e={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,s.M)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{id:"wifi",children:"WiFi"}),"\n",(0,n.jsx)(e.p,{children:"Artemis supports extract WiFi access points that the macOS system has connected\nto. By default it will try to parse WiFi networks at\n/Library/Preferences/com.apple.wifi.known-networks.plist."}),"\n",(0,n.jsx)(e.p,{children:"You may also provide an optional alnternative path to\ncom.apple.wifi.known-networks.plist."}),"\n",(0,n.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(e.p,{children:["You have to use the artemis ",(0,n.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to get WiFi\nnetwork."]}),"\n",(0,n.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:'import {\n  wifiNetworks,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  const results = wifiNetworks();\n\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(e.p,{children:["An array of ",(0,n.jsx)(e.code,{children:"Wifi"})]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"export interface Wifi {\n  name: string;\n  security: string;\n  hidden: boolean;\n  roaming_profile: string;\n  add_reason: string;\n  added_at: string;\n  auto_join: boolean;\n  personal_hotspot: boolean;\n  joined_by_user_at: string;\n  last_discovered: string;\n  updated_at: string;\n}\n"})})]})}function l(t={}){const{wrapper:e}={...(0,s.M)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(d,{...t})}):d(t)}},2172:(t,e,i)=>{i.d(e,{I:()=>c,M:()=>a});var n=i(1504);const s={},r=n.createContext(s);function a(t){const e=n.useContext(r);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:a(t.components),n.createElement(r.Provider,{value:e},t.children)}}}]);