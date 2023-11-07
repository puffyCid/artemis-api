"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4147],{2678:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var i=t(5893),n=t(1151);const o={sidebar_position:1,description:"Import as a library"},s="Library Usage",a={id:"Intro/Library/overview",title:"Library Usage",description:"Import as a library",source:"@site/docs/Intro/Library/overview.md",sourceDirName:"Intro/Library",slug:"/Intro/Library/overview",permalink:"/artemis-api/docs/Intro/Library/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Library/overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"Import as a library"},sidebar:"artemisStart",previous:{title:"Artemis Library",permalink:"/artemis-api/docs/category/artemis-library"}},c={},l=[];function d(e){const r={code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h1,{id:"library-usage",children:"Library Usage"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.code,{children:"artemis-core"})," is a very simple Rust library. It currently only exposes two (2)\nfunctions:"]}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"parse_toml_file(path: &str)"})," - Parse a TOML collection file at provided path"]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"parse_toml_data(data: &[u8])"})," - Parse bytes associated with a TOML collection"]}),"\n"]}),"\n",(0,i.jsxs)(r.p,{children:["Both functions will return nothing on success (",(0,i.jsx)(r.code,{children:"artemis-core"})," handles data\noutput) or an error."]}),"\n",(0,i.jsx)(r.h1,{id:"logging",children:"Logging"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.code,{children:"artemis-core"})," includes a logging feature that tracks internal issues it may\nencounter when executing. If you import ",(0,i.jsx)(r.code,{children:"artemis-core"})," into your own project you\nmay register you own logger, however that will then disable the builtin logger\nin ",(0,i.jsx)(r.code,{children:"artemis-core"}),"."]})]})}function u(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>a,a:()=>s});var i=t(7294);const n={},o=i.createContext(n);function s(e){const r=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),i.createElement(o.Provider,{value:r},e.children)}}}]);