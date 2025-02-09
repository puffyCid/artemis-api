"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3487],{4959:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>f,frontMatter:()=>a,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"Artifacts/Linux Artifacts/elf","title":"ELF","description":"The native executable format for Linux","source":"@site/docs/Artifacts/Linux Artifacts/elf.md","sourceDirName":"Artifacts/Linux Artifacts","slug":"/Artifacts/Linux Artifacts/elf","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/elf","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/elf.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"The native executable format for Linux","keywords":["linux","executable","binary"]},"sidebar":"artemisArtifacts","previous":{"title":"Deb Packages","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/deb"},"next":{"title":"Files","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/files"}}');var r=i(4848),s=i(8453);const a={description:"The native executable format for Linux",keywords:["linux","executable","binary"]},c="ELF",o={},l=[];function d(e){const t={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"elf",children:"ELF"})}),"\n",(0,r.jsxs)(t.p,{children:["Linux Executable Linkable Format (",(0,r.jsx)(t.code,{children:"ELF"}),") is the executable format for\napplications on Linux systems."]}),"\n",(0,r.jsxs)(t.p,{children:["artemis is able to parse basic metadata from ",(0,r.jsx)(t.code,{children:"ELF"})," files."]}),"\n",(0,r.jsx)(t.p,{children:"Other Parsers:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://rada.re/n/",children:"radare2"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://lief-project.github.io/",children:"LIEF"})}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"References:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://lief-project.github.io/",children:"LIEF"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Executable_and_Linkable_Format",children:"ELF"})}),"\n"]}),"\n",(0,r.jsx)(t.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,r.jsxs)(t.p,{children:["There is no way to collect just ELF data with artemis instead it is an optional\nfeature for the Linux ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Linux%20Artifacts/files",children:"filelisting"})," and ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Linux%20Artifacts/processes",children:"processes"}),"\nartifacts."]}),"\n",(0,r.jsxs)(t.p,{children:["However, it is possible to directly parse ELF files by using JavaScript. See the\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Intro/Scripting/scripts",children:"scripts"})," chapter for examples."]}),"\n",(0,r.jsx)(t.h1,{id:"configuration-options",children:"Configuration Options"}),"\n",(0,r.jsx)(t.p,{children:"N/A"}),"\n",(0,r.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(t.p,{children:["An array of ",(0,r.jsx)(t.code,{children:"ElfInfo"})," entries"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"export interface ElfInfo {\n  /**Array of symbols in ELF binary */\n  symbols: string[];\n  /**Array of sections in ELF binary */\n  sections: string[];\n  /**Machine type information in ELF binary */\n  machine_type: string;\n}\n"})})]})}function f(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>c});var n=i(6540);const r={},s=n.createContext(r);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);