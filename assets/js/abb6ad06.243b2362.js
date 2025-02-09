"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1939],{2542:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});const s=JSON.parse('{"id":"Artifacts/Linux Artifacts/snap","title":"Snap Packages","description":"Canonical Snap packages","source":"@site/docs/Artifacts/Linux Artifacts/snap.md","sourceDirName":"Artifacts/Linux Artifacts","slug":"/Artifacts/Linux Artifacts/snap","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/snap","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/snap.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Canonical Snap packages","keywords":["linux","plaintext"]},"sidebar":"artemisArtifacts","previous":{"title":"Shell History","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/shellhistory"},"next":{"title":"Sudo Logs","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/sudo"}}');var i=e(4848),a=e(8453);const r={description:"Canonical Snap packages",keywords:["linux","plaintext"]},c="Snap Packages",o={},p=[];function l(n){const t={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,a.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"snap-packages",children:"Snap Packages"})}),"\n",(0,i.jsx)(t.p,{children:"Snap packages is a package format developed by Canonical that allows developers\nto distribute universal Linux packages that will run on a variety of Linux\ndistributions. Snap is enabled by default on Ubuntu and can be installed on\nother Linux distributions. Artemis supports listing installed Snap packages"}),"\n",(0,i.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,i.jsxs)(t.p,{children:["You have to use the artemis ",(0,i.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\ninstalled Snap packages."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:'import { listSnaps } from "./artemis-api/src/linux/snap.ts";\n\nfunction main() {\n    const results = listSnaps();\n    console.log(results);\n}\n\nmain();\n'})}),"\n",(0,i.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(t.p,{children:["An array of Object containing ",(0,i.jsx)(t.code,{children:"SnapState"})," entries."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:'export interface SnapState {\n    type: string;\n    /**Array of Snap revisions */\n    sequence: Snap[];\n    active: boolean;\n    /**Current Active revision */\n    current: string;\n    channel: string;\n    /**Last refresh timestamp in UTC */\n    "last-refresh-time": string;\n    [key: string]: unknown;\n}\n\nexport interface Snap {\n    /**Name of snap */\n    name: string;\n    /**Application version */\n    version: string;\n    /**Snap revision */\n    revision: number;\n    summary?: string;\n    description?: string;\n    "snap-id": string;\n    chanel?: string;\n    title?: string;\n    [key: string]: unknown;\n}\n'})})]})}function d(n={}){const{wrapper:t}={...(0,a.R)(),...n.components};return t?(0,i.jsx)(t,{...n,children:(0,i.jsx)(l,{...n})}):l(n)}},8453:(n,t,e)=>{e.d(t,{R:()=>r,x:()=>c});var s=e(6540);const i={},a=s.createContext(i);function r(n){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function c(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),s.createElement(a.Provider,{value:t},n.children)}}}]);