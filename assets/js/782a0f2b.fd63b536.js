"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5951],{28943:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var n=i(74848),r=i(28453);const s={sidebar_position:6,description:"Current limitations"},o="Limitations",a={id:"Intro/Scripting/limitations",title:"Limitations",description:"Current limitations",source:"@site/docs/Intro/Scripting/limitations.md",sourceDirName:"Intro/Scripting",slug:"/Intro/Scripting/limitations",permalink:"/artemis-api/docs/Intro/Scripting/limitations",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/limitations.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,sidebarPosition:6,frontMatter:{sidebar_position:6,description:"Current limitations"},sidebar:"artemisStart",previous:{title:"Scripts",permalink:"/artemis-api/docs/Intro/Scripting/scripts"},next:{title:"Step by Step Guide",permalink:"/artemis-api/docs/Intro/Scripting/walkthrough"}},c={},d=[];function l(t){const e={code:"code",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"limitations",children:"Limitations"})}),"\n",(0,n.jsxs)(e.p,{children:["It is important to understand the JavaScript runtime for artemis is ",(0,n.jsx)(e.strong,{children:"not"})," like\nnormal JavaScript runtimes like NodeJS, Deno, Bun, etc. These runtimes are\nprimarily designed to create web apps."]}),"\n",(0,n.jsxs)(e.p,{children:["Therefore tutorials or example scripts created for other runtimes may not work\nwith artemis. For example, the JavaScript function ",(0,n.jsx)(e.code,{children:"console.table()"})," does not\nexist in artemis. However, the functions ",(0,n.jsx)(e.code,{children:"console.log()"})," and ",(0,n.jsx)(e.code,{children:"console.error()"}),"\ndo exist in artemis."]}),"\n",(0,n.jsx)(e.p,{children:"The JavaScript runtime for artemis is designed specifically to assist with\nscripting for IR and forensic investigations."}),"\n",(0,n.jsx)(e.p,{children:"There are currently some additional limitations to scripting:"}),"\n",(0,n.jsxs)(e.ol,{children:["\n",(0,n.jsxs)(e.li,{children:["All scripts executed through artemis must be in JavaScript. You ",(0,n.jsx)(e.strong,{children:"cannot"}),"\nexecute TypeScrpt scripts directly. You ",(0,n.jsx)(e.strong,{children:"must"})," compile and bundle them into\none JavaScript file."]}),"\n",(0,n.jsxs)(e.li,{children:["The JavaScript must be in common JS format (cjs). EMCAScript (ES) module\nscripts are not supported. The example code below uses esbuild to bundle the\nmain.ts file to JavaScript using CJS format via ",(0,n.jsx)(e.code,{children:"deno run build.ts"}),":"]}),"\n"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:'import * as esbuild from "https://deno.land/x/esbuild@v0.15.10/mod.js";\nimport { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";\n\nasync function main() {\n  const _result = await esbuild.build({\n    plugins: [denoPlugin()],\n    entryPoints: ["./main.ts"],\n    outfile: "main.js",\n    bundle: true,\n    format: "cjs",\n  });\n\n  esbuild.stop();\n}\n\nmain();\n'})})]})}function p(t={}){const{wrapper:e}={...(0,r.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(l,{...t})}):l(t)}},28453:(t,e,i)=>{i.d(e,{R:()=>o,x:()=>a});var n=i(96540);const r={},s=n.createContext(r);function o(t){const e=n.useContext(s);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:o(t.components),n.createElement(s.Provider,{value:e},t.children)}}}]);