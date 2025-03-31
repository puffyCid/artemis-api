"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6069],{2643:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"Intro/Scripting/boa","title":"Overview","description":"How to script with artemis","source":"@site/docs/Intro/Scripting/boa.md","sourceDirName":"Intro/Scripting","slug":"/Intro/Scripting/boa","permalink":"/artemis-api/docs/Intro/Scripting/boa","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/boa.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1,"description":"How to script with artemis"},"sidebar":"artemisStart","previous":{"title":"Artemis Scripting","permalink":"/artemis-api/docs/category/artemis-scripting"},"next":{"title":"TypeScript","permalink":"/artemis-api/docs/Intro/Scripting/typescript"}}');var r=t(74848),s=t(28453);const o={sidebar_position:1,description:"How to script with artemis"},a="Overview",c={},d=[];function l(e){const i={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.header,{children:(0,r.jsx)(i.h1,{id:"overview",children:"Overview"})}),"\n",(0,r.jsxs)(i.p,{children:["A really cool capability of artemis is it contains an embedded JavaScript\nruntime thats designed specifically for DFIR! Artemis uses\n",(0,r.jsx)(i.a,{href:"https://boajs.dev/",children:"Boa"})," a JS engine written in Rust."]}),"\n",(0,r.jsxs)(i.p,{children:["Using an embedded JS enginge allows us to call Rust functions from JavaScript!",(0,r.jsx)(i.br,{}),"\n","For example, the artemis function ",(0,r.jsx)(i.code,{children:"get_registry()"})," can be used to parse a\nprovided Registry file on disk. By registering this function with Boa we can\ncall this function directly from JavaScript! In addition to JavaScript, we have\n",(0,r.jsx)(i.a,{href:"https://www.typescriptlang.org/",children:"TypeScript"})," bindings that we can leverage!"]}),"\n",(0,r.jsx)(i.p,{children:"To summarize:"}),"\n",(0,r.jsxs)(i.ol,{children:["\n",(0,r.jsx)(i.li,{children:"We can create a script using TypeScript and call Rust functions directly"}),"\n",(0,r.jsx)(i.li,{children:"Compile TypeScript to JavaScript"}),"\n",(0,r.jsx)(i.li,{children:"Execute JavaScript using artemis"}),"\n"]}),"\n",(0,r.jsxs)(i.admonition,{type:"info",children:[(0,r.jsxs)(i.p,{children:["The JS runtime in artemis is kind of like the VQL language for\n",(0,r.jsx)(i.a,{href:"https://docs.velociraptor.app/docs/vql/",children:"Velociraptor"})," or the\n",(0,r.jsx)(i.a,{href:"https://github.com/fox-it/dissect",children:"Dissect forensic framework"})]}),(0,r.jsx)(i.p,{children:"All three let you script forensic collections and parsing"})]}),"\n",(0,r.jsx)(i.h1,{id:"prequisites-for-scripting",children:"Prequisites for Scripting."}),"\n",(0,r.jsxs)(i.ol,{children:["\n",(0,r.jsxs)(i.li,{children:["A text-editor or IDE that supports TypeScript.\n",(0,r.jsx)(i.a,{href:"https://vscodium.com/",children:"VSCodium"})," and\n",(0,r.jsx)(i.a,{href:"https://code.visualstudio.com/",children:"VSCode"})," have been tested"]}),"\n",(0,r.jsxs)(i.li,{children:["A TypeScript to JavaScript bundler","\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:"https://esbuild.github.io/",children:"esbuild"}),". Is a a popular one and is extremely\nfast"]}),"\n"]}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>o,x:()=>a});var n=t(96540);const r={},s=n.createContext(r);function o(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);