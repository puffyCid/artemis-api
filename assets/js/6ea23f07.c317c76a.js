"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3509],{3256:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var n=t(74848),r=t(28453);const s={sidebar_position:1,description:"How to script with artemis"},o="Overview",c={id:"Intro/Scripting/deno",title:"Overview",description:"How to script with artemis",source:"@site/docs/Intro/Scripting/deno.md",sourceDirName:"Intro/Scripting",slug:"/Intro/Scripting/deno",permalink:"/artemis-api/docs/Intro/Scripting/deno",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/deno.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,sidebarPosition:1,frontMatter:{sidebar_position:1,description:"How to script with artemis"},sidebar:"artemisStart",previous:{title:"Artemis Scripting",permalink:"/artemis-api/docs/category/artemis-scripting"},next:{title:"TypeScript",permalink:"/artemis-api/docs/Intro/Scripting/typescript"}},a={},d=[];function l(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"overview",children:"Overview"})}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.img,{alt:"a small velociraptor joke. Deno image from https://deno.land/artwork. The image is MIT licensed.",src:t(93824).A+"",width:"1278",height:"631"})}),"\n",(0,n.jsxs)(i.p,{children:["A really cool capability of artemis is it contains an embedded JavaScript\nruntime via ",(0,n.jsx)(i.a,{href:"https://deno.land/",children:"Deno"}),". Deno is V8 based JavaScript runtime\nwritten in Rust. By importing Deno we can create our own JavaScript runtime\ngeared specifically for forensics and IR!"]}),"\n",(0,n.jsxs)(i.p,{children:["For example, the artemis function ",(0,n.jsx)(i.code,{children:"get_registry()"})," can be used to parse a\nprovided Registry file on disk. By registering this function with the Deno\nruntime we can call this function directly from JavaScript! In addition to\nJavaScript, ",(0,n.jsx)(i.a,{href:"https://www.typescriptlang.org/",children:"TypeScript"})," is also supported!"]}),"\n",(0,n.jsx)(i.p,{children:"To summarize:"}),"\n",(0,n.jsxs)(i.ol,{children:["\n",(0,n.jsx)(i.li,{children:"We can create a script using TypeScript and call Rust functions directly"}),"\n",(0,n.jsx)(i.li,{children:"Compile TypeScript to JavaScript"}),"\n",(0,n.jsx)(i.li,{children:"Execute JavaScript using artemis"}),"\n"]}),"\n",(0,n.jsxs)(i.admonition,{type:"info",children:[(0,n.jsxs)(i.p,{children:["The JS runtime in artemis is kind of like the VQL language for\n",(0,n.jsx)(i.a,{href:"https://docs.velociraptor.app/docs/vql/",children:"Velociraptor"})," or the\n",(0,n.jsx)(i.a,{href:"https://github.com/fox-it/dissect",children:"Dissect forensic framework"})]}),(0,n.jsx)(i.p,{children:"All three let you script forensic collections and parsing"})]}),"\n",(0,n.jsx)(i.h1,{id:"prequisites-for-scripting",children:"Prequisites for Scripting."}),"\n",(0,n.jsxs)(i.ol,{children:["\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://deno.land/",children:"Deno"})}),"\n",(0,n.jsxs)(i.li,{children:["A text-editor or IDE that supports Deno. ",(0,n.jsx)(i.a,{href:"https://vscodium.com/",children:"VSCodium"}),"\nand ",(0,n.jsx)(i.a,{href:"https://code.visualstudio.com/",children:"VSCode"})," have been tested"]}),"\n",(0,n.jsx)(i.li,{children:"Deno language server extension. The extension in the VSCodium and VSCode\nmarketplaces has been tested."}),"\n",(0,n.jsxs)(i.li,{children:["A TypeScript to JavaScript bundler. There are multiple options:","\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Deno includes a builtin bundler however it is schedule for depreciation."}),"\n",(0,n.jsxs)(i.li,{children:[(0,n.jsx)(i.a,{href:"https://deno.land/x/esbuild_deno_loader@0.6.0",children:"esbuild Deno loader"}),". Will\nrequire a simple build script in order to bundle our artemis script"]}),"\n"]}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},93824:(e,i,t)=>{t.d(i,{A:()=>n});const n=t.p+"assets/images/deno2-be8805315144c21d5d8cbe70d2b9a147.jpeg"},28453:(e,i,t)=>{t.d(i,{R:()=>o,x:()=>c});var n=t(96540);const r={},s=n.createContext(r);function o(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);