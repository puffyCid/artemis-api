"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8581],{4223:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"Apollo/README","title":"Introduction","description":"Apollo is an experimental cross platform timelining GUI tool to review","source":"@site/docs/Apollo/README.md","sourceDirName":"Apollo","slug":"/Apollo/","permalink":"/artemis-api/docs/Apollo/","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Apollo/README.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"apollo"}');var s=i(4848),o=i(8453);const r={sidebar_position:1},a="Introduction",l={},d=[];function c(e){const t={a:"a",code:"code",em:"em",h1:"h1",header:"header",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"introduction",children:"Introduction"})}),"\n",(0,s.jsxs)(t.p,{children:["Apollo is an ",(0,s.jsx)(t.strong,{children:"experimental"})," cross platform timelining GUI tool to review\nartemis data. It is heavily inspired by the\n",(0,s.jsx)(t.a,{href:"https://timesketch.org/",children:"Timesketch"})," project. However, Apollo uses the\n",(0,s.jsx)(t.a,{href:"https://tauri.app",children:"Tauri"})," GUI framework and is ",(0,s.jsx)(t.em,{children:"not"})," a web app."]}),"\n",(0,s.jsxs)(t.p,{children:["Similar to Timesketch, apollo uses ",(0,s.jsx)(t.a,{href:"https://opensearch.org/",children:"OpenSearch"})," to\nstore and query data."]}),"\n",(0,s.jsx)(t.h1,{id:"how-to-build",children:"How to build"}),"\n",(0,s.jsx)(t.p,{children:"Apollo requires a OpenSearch instance in order to store and query data. Podman\nor docker is the easiest way to setup OpenSearch"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:"Install Podman or Docker on your system. Podman is recommended"}),"\n",(0,s.jsxs)(t.li,{children:["You can use the\n",(0,s.jsx)(t.a,{href:"https://github.com/puffyCid/artemis/tree/main/apollo",children:"setup scripts"})," in the\nartemis repo to quickly spin up a Podman OpenSearch container"]}),"\n",(0,s.jsx)(t.li,{children:"Install NodeJS and npm"}),"\n",(0,s.jsxs)(t.li,{children:["Clone the ",(0,s.jsx)(t.a,{href:"https://github.com/puffyCid/artemis",children:"artemis"})," repo"]}),"\n",(0,s.jsx)(t.li,{children:"Navigate to apollo directory"}),"\n",(0,s.jsxs)(t.li,{children:["Setup TailwindCSS: ",(0,s.jsx)(t.code,{children:"npm run tailwind"})]}),"\n",(0,s.jsxs)(t.li,{children:["Run ",(0,s.jsx)(t.code,{children:"npm run tauri dev"})," to start a local instance or use\n",(0,s.jsx)(t.code,{children:"npm run tauri build"})," to compile a release binary"]}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"uploading-data",children:"Uploading data"}),"\n",(0,s.jsx)(t.p,{children:"Apollo uses the same timeline format as Timesketch. Timelined data must have the\nfollowing fields:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:"Datetime (datetime)"}),"\n",(0,s.jsx)(t.li,{children:"Timestamp Description (timestamp_desc)"}),"\n",(0,s.jsx)(t.li,{children:"Message (message)"}),"\n",(0,s.jsx)(t.li,{children:"Data type (data_type)"}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Apollo supports timelining JSONL output from artemis. For example, if you\ncollect and parse Windows Registry data\n(",(0,s.jsx)(t.code,{children:"artemis acquire --format jsonl registry --alt-file <path to NTUSER.DAT>"}),")."]}),"\n",(0,s.jsx)(t.p,{children:"Apollo can timeline and upload the data to OpenSearch"}),"\n",(0,s.jsx)(t.h1,{id:"screenshots",children:"Screenshots"}),"\n",(0,s.jsxs)(t.p,{children:["Timeline View ",(0,s.jsx)(t.img,{alt:"timeline screen",src:i(193).A+"",title:"Timeline View",width:"3840",height:"2336"})]}),"\n",(0,s.jsxs)(t.p,{children:["Timeline Entry Details ",(0,s.jsx)(t.img,{alt:"entry view",src:i(1210).A+"",title:"Entry View",width:"3840",height:"2336"})]}),"\n",(0,s.jsxs)(t.p,{children:["Timeline Additional Details\n",(0,s.jsx)(t.img,{alt:"entry additional view",src:i(1971).A+"",title:"Entry Additional Details",width:"3840",height:"2336"})]})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},193:(e,t,i)=>{i.d(t,{A:()=>n});const n=i.p+"assets/images/image1-dc9a1c4236cc61769e39424bd3b988ea.png"},1210:(e,t,i)=>{i.d(t,{A:()=>n});const n=i.p+"assets/images/image2-588b5a7950ea866d8353e364c7ab06fc.png"},1971:(e,t,i)=>{i.d(t,{A:()=>n});const n=i.p+"assets/images/image3-d4d8e6d41912e8f887c64060d3915d40.png"},8453:(e,t,i)=>{i.d(t,{R:()=>r,x:()=>a});var n=i(6540);const s={},o=n.createContext(s);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);