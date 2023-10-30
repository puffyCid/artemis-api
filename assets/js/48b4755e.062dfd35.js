"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1514],{3905:(t,e,n)=>{n.d(e,{Zo:()=>c,kt:()=>f});var i=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},a=Object.keys(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var l=i.createContext({}),p=function(t){var e=i.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},c=function(t){var e=p(t.components);return i.createElement(l.Provider,{value:e},t.children)},u="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return i.createElement(i.Fragment,{},e)}},d=i.forwardRef((function(t,e){var n=t.components,r=t.mdxType,a=t.originalType,l=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),u=p(n),d=r,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||a;return n?i.createElement(f,s(s({ref:e},c),{},{components:n})):i.createElement(f,s({ref:e},c))}));function f(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=n.length,s=new Array(a);s[0]=d;var o={};for(var l in e)hasOwnProperty.call(e,l)&&(o[l]=e[l]);o.originalType=t,o[u]="string"==typeof t?t:r,s[1]=o;for(var p=2;p<a;p++)s[p]=n[p];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},27:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var i=n(7462),r=(n(7294),n(3905));const a={description:"Tracks files opened by applications in Windows Taskbar",keywords:["windows","binary"]},s="Jumplists",o={unversionedId:"Artifacts/Windows Artfacts/jumplists",id:"Artifacts/Windows Artfacts/jumplists",title:"Jumplists",description:"Tracks files opened by applications in Windows Taskbar",source:"@site/docs/Artifacts/Windows Artfacts/jumplists.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/jumplists",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/jumplists",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/jumplists.md",tags:[],version:"current",frontMatter:{description:"Tracks files opened by applications in Windows Taskbar",keywords:["windows","binary"]},sidebar:"artemisArtifacts",previous:{title:"Files",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/files"},next:{title:"Portable Executable",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/pe"}},l={},p=[],c={toc:p},u="wrapper";function m(t){let{components:e,...n}=t;return(0,r.kt)(u,(0,i.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"jumplists"},"Jumplists"),(0,r.kt)("p",null,"Windows ",(0,r.kt)("inlineCode",{parentName:"p"},"Jumplists")," files track opened files via applications in the Taskbar or\nStart Menu. Jumplists are actually a collection of embedded\n",(0,r.kt)("a",{parentName:"p",href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/shortcuts"},"Shortcut")," files and therefore can show evidence of file\ninteraction."),(0,r.kt)("p",null,"There are two (2) types of Jumplist files:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Custom - Files that are pinned to Taskbar applications"),(0,r.kt)("li",{parentName:"ul"},"Automatic - Files that are not pinned to Taskbar applications")),(0,r.kt)("p",null,"Other parsers:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://ericzimmerman.github.io/"},"Jumplist Explorer"))),(0,r.kt)("p",null,"References:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/libyal/dtformats/blob/main/documentation/Jump%20lists%20format.asciidoc"},"Libyal")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://binaryforay.blogspot.com/2016/02/jump-lists-in-depth-understand-format.html"},"Zimmerman blog"))),(0,r.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "jumplists_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "jumplists"\n[artifacts.jumplists]\n# Optional\n# alt_drive = \'C\'\n')),(0,r.kt)("h1",{id:"collection-options"},"Collection Options"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"alt_drive")," Expects a single character value. Will use an alternative drive\nletter when parsing ",(0,r.kt)("inlineCode",{parentName:"li"},"Jumplists"),". This configuration is ",(0,r.kt)("strong",{parentName:"li"},"optional"),". By\ndefault artemis will use the ",(0,r.kt)("inlineCode",{parentName:"li"},"%systemdrive%")," value (typically ",(0,r.kt)("inlineCode",{parentName:"li"},"C"),")")),(0,r.kt)("h1",{id:"output-structure"},"Output Structure"),(0,r.kt)("p",null,"An array of ",(0,r.kt)("inlineCode",{parentName:"p"},"Jumplists")," entries"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface Jumplists {\n  /**Path to Jumplist file */\n  path: string;\n  /**Jupmlist type. Custom or Automatic */\n  jumplist_type: string;\n  /**Application ID for Jumplist file */\n  app_id: string;\n  /**Metadata associated with Jumplist entry */\n  jumplist_metadata: DestEntries;\n  /**Shortcut information for Jumplist entry */\n  lnk_info: Shortcut;\n}\n\n/**\n * Metadata associated with Jumplist entry\n */\ninterface DestEntries {\n  /**\n   * Digital Record Object Identification (DROID) used to track lnk file\n   */\n  droid_volume_id: string;\n  /**\n   * Digital Record Object Identification (DROID) used to track lnk file\n   */\n  droid_file_id: string;\n  /**\n   * Digital Record Object Identification (DROID) used to track lnk file\n   */\n  birth_droid_volume_id: string;\n  /**\n   * Digital Record Object Identification (DROID) used to track lnk file\n   */\n  birth_droid_file_id: string;\n  /**Hostname associated with Jumplist entry */\n  hostname: string;\n  /**Jumplist entry number */\n  entry: number;\n  /**Modified timestamp of Jumplist entry in UNIXEPOCH seconds */\n  modified: number;\n  /**Status if Jumplist entry is pinned. `Pinned` or `NotPinned` */\n  pin_status: string;\n  /**Path associated with Jumplist entry */\n  path: string;\n}\n")))}m.isMDXComponent=!0}}]);