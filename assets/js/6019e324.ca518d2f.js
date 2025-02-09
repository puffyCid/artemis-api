"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2909],{7773:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"Intro/Library/overview","title":"Library Usage","description":"Import as a library","source":"@site/docs/Intro/Library/overview.md","sourceDirName":"Intro/Library","slug":"/Intro/Library/overview","permalink":"/artemis-api/docs/Intro/Library/overview","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Library/overview.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1,"description":"Import as a library"},"sidebar":"artemisStart","previous":{"title":"Artemis Library","permalink":"/artemis-api/docs/category/artemis-library"}}');var s=t(4848),n=t(8453);const o={sidebar_position:1,description:"Import as a library"},a="Library Usage",c={},d=[];function l(e){const r={code:"code",h1:"h1",header:"header",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"library-usage",children:"Library Usage"})}),"\n",(0,s.jsxs)(r.p,{children:["The ",(0,s.jsx)(r.code,{children:"core"})," (also referred to as ",(0,s.jsx)(r.code,{children:"artemis-core"}),") workspace is a very simple Rust\nlibrary. It exposes two (2) primary functions:"]}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"parse_toml_file(path: &str)"})," - Parse a TOML collection file at provided path"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"parse_toml_data(data: &[u8])"})," - Parse bytes associated with a TOML collection"]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["Both functions will return nothing on success (",(0,s.jsx)(r.code,{children:"artemis-core"})," handles data\noutput) or an error."]}),"\n",(0,s.jsx)(r.h1,{id:"logging",children:"Logging"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"artemis-core"})," includes a logging feature that tracks internal issues it may\nencounter when executing. If you import ",(0,s.jsx)(r.code,{children:"artemis-core"})," into your own project you\nmay register you own logger, however that will then disable the builtin logger\nin ",(0,s.jsx)(r.code,{children:"artemis-core"}),"."]})]})}function u(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>o,x:()=>a});var i=t(6540);const s={},n=i.createContext(s);function o(e){const r=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(n.Provider,{value:r},e.children)}}}]);