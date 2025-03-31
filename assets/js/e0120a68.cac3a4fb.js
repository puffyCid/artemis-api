"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2834],{28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var i=t(96540);const r={},a=i.createContext(r);function s(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(a.Provider,{value:n},e.children)}},31846:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>m});const i=JSON.parse('{"id":"Artifacts/macOS Artifacts/macho","title":"Macho","description":"The native executable format for macOS","source":"@site/docs/Artifacts/macOS Artifacts/macho.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/macho","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/macho","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/macho.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"The native executable format for macOS","keywords":["macOS","executable","binary"]},"sidebar":"artemisArtifacts","previous":{"title":"LuLu Firewall","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/lulu"},"next":{"title":"Munki","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/munki"}}');var r=t(74848),a=t(28453);const s={description:"The native executable format for macOS",keywords:["macOS","executable","binary"]},c="Macho",o={},m=[];function l(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"macho",children:"Macho"})}),"\n",(0,r.jsxs)(n.p,{children:["macOS Mach object (",(0,r.jsx)(n.code,{children:"macho"}),") is the executable format for applications on macOS.\nartemis is able to parse basic metadata from ",(0,r.jsx)(n.code,{children:"macho"})," files."]}),"\n",(0,r.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rada.re/n/",children:"radare2"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://lief-project.github.io/",children:"LIEF"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/horsicq/XMachOViewer",children:"XMachOView"})}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"References:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://lief-project.github.io/",children:"LIEF"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/aidansteele/osx-abi-macho-file-format-reference",children:"Macho"})}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,r.jsxs)(n.p,{children:["There is no way to collect just ",(0,r.jsx)(n.code,{children:"macho"})," data with artemis instead it is an\noptional feature for the macOS ",(0,r.jsx)(n.code,{children:"filelisting"})," and ",(0,r.jsx)(n.code,{children:"processes"})," artifacts."]}),"\n",(0,r.jsxs)(n.p,{children:["However, it is possible to directly parse ",(0,r.jsx)(n.code,{children:"macho"})," files by using JavaScript. See\nthe ",(0,r.jsx)(n.a,{href:"/artemis-api/docs/Intro/Scripting/scripts",children:"scripts"})," chapter for examples."]}),"\n",(0,r.jsx)(n.h1,{id:"configuration-optaions",children:"Configuration Optaions"}),"\n",(0,r.jsx)(n.p,{children:"N/A"}),"\n",(0,r.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(n.p,{children:["An array of ",(0,r.jsx)(n.code,{children:"macho"})," entries"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"export interface MachoInfo {\n  /**CPU arch */\n  cpu_type: string;\n  /**CPU model */\n  cpu_subtype: string;\n  /**File type, ex: executable, dylib, object, core, etc*/\n  filetype: string;\n  /**Segments of the macho binary */\n  segments: Segment64[];\n  /**Dynamic libraries in the macho binary */\n  dylib_command: DylibCommand[];\n  /**Macho binary id */\n  id: string;\n  /**Macho team id */\n  team_id: string;\n  /**Parsed out macho entitlements from plist */\n  entitlements: Record<string, unknown>;\n  /**Base64 encoded embedded certs within the binary */\n  certs: string;\n  /**Minium OS binary can run on */\n  minos: string;\n  /**SDK version macho was compiled for */\n  sdk: string;\n}\n\n/**\n * Metadata about macho Segments\n */\nexport interface Segment64 {\n  /**Name of segment */\n  name: string;\n  /**Virtual memory address */\n  vmaddr: number;\n  /**Virtual memory size */\n  vmsize: number;\n  /**Offset in the macho binary */\n  file_offset: number;\n  /**Size of segment */\n  file_size: number;\n  /**Maxmimum permitted memory protection */\n  max_prot: number;\n  /**Initial memory protection */\n  init_prot: number;\n  /**Number of sections in the semgent */\n  nsects: number;\n  /**Segment flags */\n  flags: number;\n  /**Array of section data */\n  sections: Sections[];\n}\n\n/**\n * Metadata about macho Sections\n */\nexport interface Sections {\n  /**Name of section */\n  section_name: string;\n  /**Name of segment the section belongs to */\n  segment_name: string;\n  /**Virtual memory address */\n  addr: number;\n  /**Size of section */\n  size: number;\n  /**Section offset in file */\n  offset: number;\n  /**Section byte alignment */\n  align: number;\n  /**File offset to relocation entries */\n  relocation_offset: number;\n  /**Number of relocation entries */\n  number_relocation_entries: number;\n  /**Flags related to the section */\n  flags: number;\n  /**Reserved */\n  reserved: number;\n  /**Reserved */\n  reserved2: number;\n  /**Reserved */\n  reserved3: number;\n}\n\n/**\n * Metadata about macho dylibcommand\n */\nexport interface DylibCommand {\n  /**Name of dynamic library */\n  name: string;\n  /**Timestamp when the library was build */\n  timestamp: number;\n  /**Version of dynamic library */\n  current_version: number;\n  /**Compatiblity version of dynamic library */\n  compatibility_version: string;\n}\n"})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}}}]);