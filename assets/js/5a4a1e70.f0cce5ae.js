"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9607],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=l(n),f=i,d=m["".concat(s,".").concat(f)]||m[f]||u[f]||a;return n?r.createElement(d,c(c({ref:t},p),{},{components:n})):r.createElement(d,c({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,c=new Array(a);c[0]=f;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:i,c[1]=o;for(var l=2;l<a;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2972:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var r=n(7462),i=(n(7294),n(3905));const a={description:"Application execution tracker",keywords:["macOS","sqlite"]},c="ExecPolicy",o={unversionedId:"Artifacts/macOS Artifacts/execpolicy",id:"Artifacts/macOS Artifacts/execpolicy",title:"ExecPolicy",description:"Application execution tracker",source:"@site/docs/Artifacts/macOS Artifacts/execpolicy.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/execpolicy",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/execpolicy",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/execpolicy.md",tags:[],version:"current",frontMatter:{description:"Application execution tracker",keywords:["macOS","sqlite"]},sidebar:"artemisArtifacts",previous:{title:"Emond",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/emond"},next:{title:"Files",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/files"}},s={},l=[],p={toc:l},m="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"execpolicy"},"ExecPolicy"),(0,i.kt)("p",null,"macOS Execution Policy (",(0,i.kt)("inlineCode",{parentName:"p"},"ExecPolicy"),") tracks application execution on a system.\nIt only tracks execution of applications that tracked by GateKeeper"),(0,i.kt)("p",null,"Other Parsers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Any SQLITE viewer")),(0,i.kt)("p",null,"References:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://eclecticlight.co/2023/03/13/ventura-has-changed-app-quarantine-with-a-new-xattr/"},"ExecPolicy Info")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://knight.sc/reverse%20engineering/2019/02/20/syspolicyd-internals.html"},"Policy Internals"))),(0,i.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "execpolicy_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "execpolicy"\n')),(0,i.kt)("h1",{id:"collection-options"},"Collection Options"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"N/A")),(0,i.kt)("h1",{id:"output-structure"},"Output Structure"),(0,i.kt)("p",null,"An array of ",(0,i.kt)("inlineCode",{parentName:"p"},"ExecPolicy")," entries"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface ExecPolicy {\n  /**Is file signed */\n  is_signed: number;\n  /**File ID name */\n  file_identifier: string;\n  /**App bundle ID */\n  bundle_identifier: string;\n  /**Bundle version */\n  bundle_version: string;\n  /**Team ID */\n  team_identifier: string;\n  /**Signing ID */\n  signing_identifier: string;\n  /**Code Directory hash*/\n  cdhash: string;\n  /**SHA256 hash of application */\n  main_executable_hash: string;\n  /**Executable timestamp in UNIXEPOCH seconds */\n  executable_timestamp: number;\n  /**Size of file */\n  file_size: number;\n  /**Is library */\n  is_library: number;\n  /**Is file used */\n  is_used: number;\n  /**File ID associated with entry */\n  responsible_file_identifier: string;\n  /**Is valid entry */\n  is_valid: number;\n  /**Is quarantined entry */\n  is_quarantined: number;\n  /**Timestamp for executable measurements in UNIXEPOCH seconds */\n  executable_measurements_v2_timestamp: number;\n  /**Reported timestamp in UNIXEPOCH seconds */\n  reported_timstamp: number;\n  /**Primary key */\n  pk: number;\n  /**Volume UUID for entry */\n  volume_uuid: string;\n  /**Object ID for entry */\n  object_id: number;\n  /**Filesystem type */\n  fs_type_name: string;\n  /**App Bundle ID */\n  bundle_id: string;\n  /**Policy match for entry */\n  policy_match: number;\n  /**Malware result for entry */\n  malware_result: number;\n  /**Flags for entry */\n  flags: number;\n  /**Modified time in UNIXEPOCH seconds */\n  mod_time: number;\n  /**Policy scan cache timestamp in UNIXEPOCH seconds */\n  policy_scan_cache_timestamp: number;\n  /**Revocation check timestamp in UNIXEPOCH seconds */\n  revocation_check_time: number;\n  /**Scan version for entry */\n  scan_version: number;\n  /**Top policy match for entry */\n  top_policy_match: number;\n}\n")))}u.isMDXComponent=!0}}]);