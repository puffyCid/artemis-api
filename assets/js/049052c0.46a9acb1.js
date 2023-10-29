"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1019],{3905:(t,e,r)=>{r.d(e,{Zo:()=>m,kt:()=>f});var a=r(7294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function i(t,e){if(null==t)return{};var r,a,n=function(t,e){if(null==t)return{};var r,a,n={},o=Object.keys(t);for(a=0;a<o.length;a++)r=o[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)r=o[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var s=a.createContext({}),p=function(t){var e=a.useContext(s),r=e;return t&&(r="function"==typeof t?t(e):l(l({},e),t)),r},m=function(t){var e=p(t.components);return a.createElement(s.Provider,{value:e},t.children)},d="mdxType",u={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,o=t.originalType,s=t.parentName,m=i(t,["components","mdxType","originalType","parentName"]),d=p(r),c=n,f=d["".concat(s,".").concat(c)]||d[c]||u[c]||o;return r?a.createElement(f,l(l({ref:e},m),{},{components:r})):a.createElement(f,l({ref:e},m))}));function f(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var o=r.length,l=new Array(o);l[0]=c;var i={};for(var s in e)hasOwnProperty.call(e,s)&&(i[s]=e[s]);i.originalType=t,i[d]="string"==typeof t?t:n,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},4729:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=r(7462),n=(r(7294),r(3905));const o={description:"Interact with Application Artifacts"},l="Applications",i={unversionedId:"API/Artifacts/applications",id:"API/Artifacts/applications",title:"Applications",description:"Interact with Application Artifacts",source:"@site/docs/API/Artifacts/applications.md",sourceDirName:"API/Artifacts",slug:"/API/Artifacts/applications",permalink:"/docs/API/Artifacts/applications",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/applications.md",tags:[],version:"current",frontMatter:{description:"Interact with Application Artifacts"},sidebar:"artemisAPI",previous:{title:"Forensic Aritfacts",permalink:"/docs/category/forensic-aritfacts"},next:{title:"Linux",permalink:"/docs/API/Artifacts/linux"}},s={},p=[{value:"getChromiumUsersHistory() -&gt; <code>ChromiumHistory[]</code>",id:"getchromiumusershistory---chromiumhistory",level:3},{value:"getChromiumHistory(path) -&gt; <code>RawChromiumHistory[]</code>",id:"getchromiumhistorypath---rawchromiumhistory",level:3},{value:"getChromiumUsersDownloads() -&gt; <code>ChromiumDownloads[]</code>",id:"getchromiumusersdownloads---chromiumdownloads",level:3},{value:"getChromiumDownloads(path) -&gt; <code>RawChromiumDownloads[]</code>",id:"getchromiumdownloadspath---rawchromiumdownloads",level:3},{value:"chromiumExtensions(platform) -&gt; <code>Record&lt;string, object&gt;[] | Error</code>",id:"chromiumextensionsplatform---recordstring-object--error",level:3},{value:"getFirefoxUsersHistory() -&gt; <code>FirefoxHistory[]</code>",id:"getfirefoxusershistory---firefoxhistory",level:3},{value:"getFirefoxHistory(path) -&gt; <code>RawFirefoxHistory[]</code>",id:"getfirefoxhistorypath---rawfirefoxhistory",level:3},{value:"getFirefoxUsersDownloads() -&gt; <code>FirefoxDownloads[]</code>",id:"getfirefoxusersdownloads---firefoxdownloads",level:3},{value:"getFirefoxDownloads(path) -&gt; <code>RawFirefoxDownloads[]</code>",id:"getfirefoxdownloadspath---rawfirefoxdownloads",level:3},{value:"firefoxAddons(platform) -&gt; <code>Record&lt;string, object&gt;[] | Error</code>",id:"firefoxaddonsplatform---recordstring-object--error",level:3},{value:"recentFiles(platform) -&gt; <code>History[] | Error</code>",id:"recentfilesplatform---history--error",level:3},{value:"fileHistory(platform) -&gt; <code>FileHistory[] | Error</code>",id:"filehistoryplatform---filehistory--error",level:3}],m={toc:p},d="wrapper";function u(t){let{components:e,...r}=t;return(0,n.kt)(d,(0,a.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"applications"},"Applications"),(0,n.kt)("p",null,"These functions can be used to pull data related to common third-party software"),(0,n.kt)("h3",{id:"getchromiumusershistory---chromiumhistory"},"getChromiumUsersHistory() -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"ChromiumHistory[]")),(0,n.kt)("p",null,"Return Chromium history for all users"),(0,n.kt)("h3",{id:"getchromiumhistorypath---rawchromiumhistory"},"getChromiumHistory(path) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"RawChromiumHistory[]")),(0,n.kt)("p",null,"Parse the Chromium History sqlite file at provided path. Will parse locked\nsqlite files."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Chromium History file")))),(0,n.kt)("h3",{id:"getchromiumusersdownloads---chromiumdownloads"},"getChromiumUsersDownloads() -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"ChromiumDownloads[]")),(0,n.kt)("p",null,"Return Chromium downloads for all users"),(0,n.kt)("h3",{id:"getchromiumdownloadspath---rawchromiumdownloads"},"getChromiumDownloads(path) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"RawChromiumDownloads[]")),(0,n.kt)("p",null,"Parse the Chromium History sqlite file at provided path for downloads. Will\nparse locked sqlite files."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Chromium History file")))),(0,n.kt)("h3",{id:"chromiumextensionsplatform---recordstring-object--error"},"chromiumExtensions(platform) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"Record<string, object>[] | Error")),(0,n.kt)("p",null,"Parse all Chromium extensions (manifest.json files) for all users. Returns array\nJSON objects."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"platform"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"PlatformType")),(0,n.kt)("td",{parentName:"tr",align:null},"OS platform to parse. Supports Windows and macOS (Darwin)")))),(0,n.kt)("h3",{id:"getfirefoxusershistory---firefoxhistory"},"getFirefoxUsersHistory() -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"FirefoxHistory[]")),(0,n.kt)("p",null,"Return Firefox history for all users"),(0,n.kt)("h3",{id:"getfirefoxhistorypath---rawfirefoxhistory"},"getFirefoxHistory(path) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"RawFirefoxHistory[]")),(0,n.kt)("p",null,"Get Firefox history from provided ",(0,n.kt)("inlineCode",{parentName:"p"},"places.sqlite")," file. Will parse locked sqlite\nfiles."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Chromium History file")))),(0,n.kt)("h3",{id:"getfirefoxusersdownloads---firefoxdownloads"},"getFirefoxUsersDownloads() -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"FirefoxDownloads[]")),(0,n.kt)("p",null,"Return Firefox downloads for all users"),(0,n.kt)("h3",{id:"getfirefoxdownloadspath---rawfirefoxdownloads"},"getFirefoxDownloads(path) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"RawFirefoxDownloads[]")),(0,n.kt)("p",null,"Get Firefox downloads from provided ",(0,n.kt)("inlineCode",{parentName:"p"},"places.sqlite")," file. Will parse locked\nsqlite files."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"path"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:null},"Chromium History file")))),(0,n.kt)("h3",{id:"firefoxaddonsplatform---recordstring-object--error"},"firefoxAddons(platform) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"Record<string, object>[] | Error")),(0,n.kt)("p",null,"Parse all Firefox addons (addons.json files) for all users. Returns array JSON\nobjects."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"platform"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"PlatformType")),(0,n.kt)("td",{parentName:"tr",align:null},"OS platform to parse. Supports Windows and macOS (Darwin)")))),(0,n.kt)("h3",{id:"recentfilesplatform---history--error"},"recentFiles(platform) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"History[] | Error")),(0,n.kt)("p",null,"Return a list of files opened by LibreOffice for all users."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"platform"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"PlatformType")),(0,n.kt)("td",{parentName:"tr",align:null},"OS platform to parse")))),(0,n.kt)("h3",{id:"filehistoryplatform---filehistory--error"},"fileHistory(platform) -> ",(0,n.kt)("inlineCode",{parentName:"h3"},"FileHistory[] | Error")),(0,n.kt)("p",null,"Parse the local file history for VSCode. Returns list of history entries. Also\nsupports VSCodium."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Param"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"platform"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"PlatformType")),(0,n.kt)("td",{parentName:"tr",align:null},"OS platform to parse")))))}u.isMDXComponent=!0}}]);