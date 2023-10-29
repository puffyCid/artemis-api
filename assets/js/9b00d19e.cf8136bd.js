"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4102],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},f="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=c(n),u=i,m=f["".concat(l,".").concat(u)]||f[u]||d[u]||a;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[f]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1069:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={description:"The Mozilla browser",keywords:["browser","mozilla"]},o="Firefox",s={unversionedId:"Artifacts/Application Artifacts/firefox",id:"Artifacts/Application Artifacts/firefox",title:"Firefox",description:"The Mozilla browser",source:"@site/docs/Artifacts/Application Artifacts/firefox.md",sourceDirName:"Artifacts/Application Artifacts",slug:"/Artifacts/Application Artifacts/firefox",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/firefox",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Application Artifacts/firefox.md",tags:[],version:"current",frontMatter:{description:"The Mozilla browser",keywords:["browser","mozilla"]},sidebar:"artemisArtifacts",previous:{title:"Chromium",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/chromium"},next:{title:"Safari",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/safari"}},l={},c=[],p={toc:c},f="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(f,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"firefox"},"Firefox"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Firefox")," is a popular open source web browser created and maintained by\nMozilla. artemis supports parsing browsing history and downloads from ",(0,i.kt)("inlineCode",{parentName:"p"},"Firefox"),".\nHistory and downloads data are stored in a SQLITE file."),(0,i.kt)("p",null,"Other parsers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Any program that read a SQLITE database")),(0,i.kt)("p",null,"References:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://kb.mozillazine.org/Places.sqlite"},"Schema"))),(0,i.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "firefox_tester"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "firefox-history"\n\n[[artifacts]]\nartifact_name = "firefox-downloads"\n')),(0,i.kt)("h1",{id:"collection-options"},"Collection Options"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"N/A")),(0,i.kt)("h1",{id:"output-structure"},"Output Structure"),(0,i.kt)("p",null,"An array of ",(0,i.kt)("inlineCode",{parentName:"p"},"FirefoxHistory")," for history data and ",(0,i.kt)("inlineCode",{parentName:"p"},"FirefoxDownloads")," for\ndownloads data per user."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface FirefoxHistory {\n  /**Array of history entries */\n  history: RawFirefoxHistory[];\n  /**Path associated with the history file */\n  path: string;\n  /**User associated with the history file */\n  user: string;\n}\n\n/**\n * An interface representing the Firefox SQLITE tables: `moz_places` and `moz_origins`\n */\nexport interface RawFirefoxHistory {\n  /**SQLITE row id */\n  moz_places_id: number;\n  /**Page URL */\n  url: string;\n  /**Page title */\n  title: string;\n  /**URL in reverse */\n  rev_host: string;\n  /**Page visit count */\n  visit_count: number;\n  /**Hidden value */\n  hidden: number;\n  /**Typed value */\n  typed: number;\n  /**Frequency value */\n  frequency: number;\n  /**Last visit time in UNIXEPOCH seconds */\n  last_visit_date: number;\n  /**GUID for entry */\n  guid: string;\n  /**Foreign count value */\n  foreign_count: number;\n  /**Hash of URL */\n  url_hash: number;\n  /**Page description */\n  description: string;\n  /**Preview image URL value */\n  preview_image_url: string;\n  /**Prefix value (ex: https://) */\n  prefix: string;\n  /** Host value */\n  host: string;\n}\n\nexport interface FirefoxDownloads {\n  /**Array of downloads entries */\n  downloads: RawFirefoxDownloads[];\n  /**Path associated with the downloads file */\n  path: string;\n  /**User associated with the downloads file */\n  user: string;\n}\n\n/**\n * An interface representing the Firefox SQLITE tables: `moz_places`, `moz_origins`, `moz_annos`, `moz_anno_attributes`\n */\nexport interface RawFirefoxDownloads {\n  /**ID for SQLITE row */\n  id: number;\n  /**ID to history entry */\n  place_id: number;\n  /**ID to anno_attribute entry */\n  anno_attribute_id: number;\n  /**Content value */\n  content: string;\n  /**Flags value */\n  flags: number;\n  /**Expiration value */\n  expiration: number;\n  /**Download type value */\n  download_type: number;\n  /**Date added in UNIXEPOCH seconds */\n  date_added: number;\n  /**Last modified in UNIXEPOCH seconds */\n  last_modified: number;\n  /**Downloaded file name */\n  name: string;\n  /**History data associated with downloaded file */\n  history: RawFirefoxHistory;\n}\n")))}d.isMDXComponent=!0}}]);