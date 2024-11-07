"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6026],{61798:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=s(74848),i=s(28453);const r={description:"Connected USB devices",keywords:["windows","registry"]},c="USBs",o={id:"Artifacts/Windows Artfacts/usbs",title:"USBs",description:"Connected USB devices",source:"@site/docs/Artifacts/Windows Artfacts/usbs.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/usbs",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/usbs",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/usbs.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"Connected USB devices",keywords:["windows","registry"]},sidebar:"artemisArtifacts",previous:{title:"Updates",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/updates"},next:{title:"UserAssist",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/userassist"}},a={},d=[];function l(e){const t={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"usbs",children:"USBs"})}),"\n",(0,n.jsx)(t.p,{children:"Artemis support attempting to extract USB devices that have been connected to\nthe Windows system. It will parse the SYSTEM Registry file to look for USB\ndevices that have been connected."}),"\n",(0,n.jsx)(t.p,{children:"References:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://www.sans.org/blog/the-truth-about-usb-device-serial-numbers/",children:"Truth about USBs"})}),"\n"]}),"\n",(0,n.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(t.p,{children:["You have to use the artemis ",(0,n.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect MRU\nkeys."]}),"\n",(0,n.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:'import { listUsbDevices } from "./artemis-api/src/windows/registry/usb.ts";\n\nfunction main() {\n  const results = listUsbDevices();\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(t.p,{children:["An array of ",(0,n.jsx)(t.code,{children:"UsbDevices"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface UsbDevices {\n  device_class_id: string;\n  friendly_name: string;\n  /**Last drive letter assigned to the USB */\n  drive_letter: string;\n  last_connected: string;\n  last_insertion: string;\n  last_removal: string;\n  install: string;\n  first_install: string;\n  usb_type: string;\n  vendor: string;\n  product: string;\n  revision: string;\n  tracking_id: string;\n  disk_id: string;\n}\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>c,x:()=>o});var n=s(96540);const i={},r=n.createContext(i);function c(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);