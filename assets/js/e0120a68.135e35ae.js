"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3065],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),m=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=m(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=m(n),u=a,d=p["".concat(s,".").concat(u)]||p[u]||f[u]||i;return n?r.createElement(d,o(o({ref:t},l),{},{components:n})):r.createElement(d,o({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:a,o[1]=c;for(var m=2;m<i;m++)o[m]=n[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6504:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const i={description:"The native executable format for macOS",keywords:["macOS","executable","binary"]},o="Macho",c={unversionedId:"Artifacts/macOS Artifacts/macho",id:"Artifacts/macOS Artifacts/macho",title:"Macho",description:"The native executable format for macOS",source:"@site/docs/Artifacts/macOS Artifacts/macho.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/macho",permalink:"/docs/Artifacts/macOS Artifacts/macho",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/macho.md",tags:[],version:"current",frontMatter:{description:"The native executable format for macOS",keywords:["macOS","executable","binary"]},sidebar:"artemisArtifacts",previous:{title:"Loginitems",permalink:"/docs/Artifacts/macOS Artifacts/loginitems"},next:{title:"Plist",permalink:"/docs/Artifacts/macOS Artifacts/plist"}},s={},m=[],l={toc:m},p="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"macho"},"Macho"),(0,a.kt)("p",null,"macOS Mach object (",(0,a.kt)("inlineCode",{parentName:"p"},"macho"),") is the executable format for applications on macOS.\nartemis is able to parse basic metadata from ",(0,a.kt)("inlineCode",{parentName:"p"},"macho")," files."),(0,a.kt)("p",null,"Other Parsers:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://rada.re/n/"},"radare2")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://lief-project.github.io/"},"LIEF")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/horsicq/XMachOViewer"},"XMachOView"))),(0,a.kt)("p",null,"References:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://lief-project.github.io/"},"LIEF")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/aidansteele/osx-abi-macho-file-format-reference"},"Macho"))),(0,a.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,a.kt)("p",null,"There is no way to collect just ",(0,a.kt)("inlineCode",{parentName:"p"},"macho")," data with artemis instead it is an\noptional feature for the macOS ",(0,a.kt)("inlineCode",{parentName:"p"},"filelisting")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"processes")," artifacts.\\\nHowever, it is possible to directly parse ",(0,a.kt)("inlineCode",{parentName:"p"},"macho")," files by using JavaScript. See\nthe ",(0,a.kt)("a",{parentName:"p",href:"/docs/Intro/Scripting/scripts"},"scripts")," chapter for examples."),(0,a.kt)("h1",{id:"configuration-optaions"},"Configuration Optaions"),(0,a.kt)("p",null,"N/A"),(0,a.kt)("h1",{id:"output-structure"},"Output Structure"),(0,a.kt)("p",null,"An array of ",(0,a.kt)("inlineCode",{parentName:"p"},"macho")," entries"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface MachoInfo {\n  /**CPU arch */\n  cpu_type: string;\n  /**CPU model */\n  cpu_subtype: string;\n  /**File type, ex: executable, dylib, object, core, etc*/\n  filetype: string;\n  /**Segments of the macho binary */\n  sgements: Segment64[];\n  /**Dynamic libraries in the macho binary */\n  dylib_commands: DylibCommand[];\n  /**Macho binary id */\n  id: string;\n  /**Macho team id */\n  team_id: string;\n  /**Parsed out macho entitlements from plist */\n  entitlements: Record<string, unknown>;\n  /**Base64 encoded embedded certs within the binary */\n  certs: string;\n  /**Minium OS binary can run on */\n  minos: string;\n  /**SDK version macho was compiled for */\n  sdk: string;\n}\n\n/**\n * Metadata about macho Segments\n */\nexport interface Segment64 {\n  /**Name of segment */\n  name: string;\n  /**Virtual memory address */\n  vmaddr: number;\n  /**Virtual memory size */\n  vmsize: number;\n  /**Offset in the macho binary */\n  file_offset: number;\n  /**Size of segment */\n  file_size: number;\n  /**Maxmimum permitted memory protection */\n  max_prot: number;\n  /**Initial memory protection */\n  init_prot: number;\n  /**Number of sections in the semgent */\n  nsects: number;\n  /**Segment flags */\n  flags: number;\n  /**Array of section data */\n  sections: Sections[];\n}\n\n/**\n * Metadata about macho Sections\n */\nexport interface Sections {\n  /**Name of section */\n  section_name: string;\n  /**Name of segment the section belongs to */\n  segment_name: string;\n  /**Virtual memory address */\n  addr: number;\n  /**Size of section */\n  size: number;\n  /**Section offset in file */\n  offset: number;\n  /**Section byte alignment */\n  align: number;\n  /**File offset to relocation entries */\n  relocation_offset: number;\n  /**Number of relocation entries */\n  number_relocation_entries: number;\n  /**Flags related to the section */\n  flags: number;\n  /**Reserved */\n  reserved: number;\n  /**Reserved */\n  reserved2: number;\n  /**Reserved */\n  reserved3: number;\n}\n\n/**\n * Metadata about macho dylibcommand\n */\nexport interface DylibCommand {\n  /**Name of dynamic library */\n  name: string;\n  /**Timestamp when the library was build */\n  timestamp: number;\n  /**Version of dynamic library */\n  current_version: number;\n  /**Compatiblity version of dynamic library */\n  compatibility_version: string;\n}\n")))}f.isMDXComponent=!0}}]);