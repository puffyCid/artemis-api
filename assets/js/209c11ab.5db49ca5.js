"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5849],{3905:(t,e,r)=>{r.d(e,{Zo:()=>l,kt:()=>d});var n=r(7294);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var c=n.createContext({}),p=function(t){var e=n.useContext(c),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},l=function(t){var e=p(t.components);return n.createElement(c.Provider,{value:e},t.children)},u="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},f=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,o=t.originalType,c=t.parentName,l=s(t,["components","mdxType","originalType","parentName"]),u=p(r),f=a,d=u["".concat(c,".").concat(f)]||u[f]||m[f]||o;return r?n.createElement(d,i(i({ref:e},l),{},{components:r})):n.createElement(d,i({ref:e},l))}));function d(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=r.length,i=new Array(o);i[0]=f;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s[u]="string"==typeof t?t:a,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7643:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={description:"macOS groups",keywords:["macos","accounts","plist"]},i="Groups",s={unversionedId:"Artifacts/macOS Artifacts/groups",id:"Artifacts/macOS Artifacts/groups",title:"Groups",description:"macOS groups",source:"@site/docs/Artifacts/macOS Artifacts/groups.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/groups",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/groups",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/groups.md",tags:[],version:"current",frontMatter:{description:"macOS groups",keywords:["macos","accounts","plist"]},sidebar:"artemisArtifacts",previous:{title:"Fsevents",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/fsevents"},next:{title:"Launchd",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/launchd"}},c={},p=[],l={toc:p},u="wrapper";function m(t){let{components:e,...r}=t;return(0,a.kt)(u,(0,n.Z)({},l,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"groups"},"Groups"),(0,a.kt)("p",null,"Gets group info parsing the ",(0,a.kt)("inlineCode",{parentName:"p"},"plist")," files at\n",(0,a.kt)("inlineCode",{parentName:"p"},"/var/db/dslocal/nodes/Default/groups"),"."),(0,a.kt)("p",null,"Other Parsers:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Any tool that can parse a ",(0,a.kt)("inlineCode",{parentName:"li"},"plist")," file")),(0,a.kt)("p",null,"References:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"N/A")),(0,a.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "groups_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "groups"\n')),(0,a.kt)("h1",{id:"collection-options"},"Collection Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"N/A")),(0,a.kt)("h1",{id:"output-structure"},"Output Structure"),(0,a.kt)("p",null,"An array of ",(0,a.kt)("inlineCode",{parentName:"p"},"Groups")," entries"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface Groups {\n  /**GID for the group */\n  gid: string[];\n  /**Name of the group */\n  name: string[];\n  /**Real name associated with the group */\n  real_name: string[];\n  /**Users associated with group */\n  users: string[];\n  /**Group members in the group */\n  groupmembers: string[];\n  /**UUID associated with the group */\n  uuid: string[];\n}\n")))}m.isMDXComponent=!0}}]);