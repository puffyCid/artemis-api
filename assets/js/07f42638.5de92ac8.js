"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9741],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(r),f=a,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||s;return r?n.createElement(d,o(o({ref:t},p),{},{components:r})):n.createElement(d,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[m]="string"==typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5891:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const s={description:"macOS process metadata",keywords:["macOS","proc meta"]},o="Processes",i={unversionedId:"Artifacts/macOS Artifacts/processes",id:"Artifacts/macOS Artifacts/processes",title:"Processes",description:"macOS process metadata",source:"@site/docs/Artifacts/macOS Artifacts/processes.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/processes",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/processes",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/processes.md",tags:[],version:"current",frontMatter:{description:"macOS process metadata",keywords:["macOS","proc meta"]},sidebar:"artemisArtifacts",previous:{title:"Plist",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/plist"},next:{title:"Shell History",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/shellhistory"}},c={},l=[],p={toc:l},m="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"processes"},"Processes"),(0,a.kt)("p",null,"Gets a standard process listing using the macOS API"),(0,a.kt)("p",null,"Other Parsers:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Any tool that calls the macOS API")),(0,a.kt)("p",null,"References:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"N/A")),(0,a.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "process_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "processes" # Name of artifact\n[artifacts.processes]\n# Get executable metadata\nmetadata = true \n# MD5 hash process binary\nmd5 = true \n # SHA1 hash process binary\nsha1 = false\n# SHA256 hash process binary\nsha256 = false\n')),(0,a.kt)("h1",{id:"collection-options"},"Collection Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"metadata")," Get ",(0,a.kt)("a",{parentName:"li",href:"/artemis-api/docs/Artifacts/macOS%20Artifacts/macho"},"Macho")," data from process binary."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"md5")," Boolean value to MD5 hash process binary"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"sha1")," Boolean value to SHA1 hash process binary"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"sha256")," Boolean value to SHA256 hash process binary")),(0,a.kt)("h1",{id:"output-structure"},"Output Structure"),(0,a.kt)("p",null,"An array of ",(0,a.kt)("inlineCode",{parentName:"p"},"MacosProcessInfo")," entries"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface MacosProcessInfo {\n  /**Full path to the process binary */\n  full_path: string;\n  /**Name of process */\n  name: string;\n  /**Path to process binary */\n  path: string;\n  /** Process ID */\n  pid: number;\n  /** Parent Process ID */\n  ppid: number;\n  /**Environment variables associated with process */\n  environment: string;\n  /**Status of the process */\n  status: string;\n  /**Process arguments */\n  arguments: string;\n  /**Process memory usage */\n  memory_usage: number;\n  /**Process virtual memory usage */\n  virtual_memory_usage: number;\n  /**Process start time in UNIXEPOCH seconds*/\n  start_time: number;\n  /** User ID associated with process */\n  uid: string;\n  /**Group ID associated with process */\n  gid: string;\n  /**MD5 hash of process binary */\n  md5: string;\n  /**SHA1 hash of process binary */\n  sha1: string;\n  /**SHA256 hash of process binary */\n  sha256: string;\n  /**MACHO metadata asssociated with process binary */\n  binary_info: MachoInfo[];\n}\n")))}u.isMDXComponent=!0}}]);