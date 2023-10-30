"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5933],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(r),m=a,f=c["".concat(s,".").concat(m)]||c[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3500:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:2},i="Installation",l={unversionedId:"Intro/installation",id:"Intro/installation",title:"Installation",description:"Currently only Windows, macOS, and Linux binaries from",source:"@site/docs/Intro/installation.md",sourceDirName:"Intro",slug:"/Intro/installation",permalink:"/artemis-api/docs/Intro/installation",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/installation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"artemisStart",previous:{title:"Introduction",permalink:"/artemis-api/docs/Intro/"},next:{title:"CLI Options",permalink:"/artemis-api/docs/Intro/cli"}},s={},p=[{value:"Supported Systems",id:"supported-systems",level:2},{value:"GitHub Releases",id:"github-releases",level:2},{value:"Build from Source",id:"build-from-source",level:2}],u={toc:p},c="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(c,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"installation"},"Installation"),(0,a.kt)("p",null,"Currently only Windows, macOS, and Linux binaries from\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/puffyCid/artemis/releases"},"GitHub Releases")," are provided.\nCurrently these binaries are ",(0,a.kt)("strong",{parentName:"p"},"unsigned"),"."),(0,a.kt)("p",null,"Grab the latest ",(0,a.kt)("strong",{parentName:"p"},"stable")," release\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/puffyCid/artemis/releases"},"here")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Nightly")," releases can be downloaded\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/puffyCid/artemis/releases/tag/nightly"},"here")),(0,a.kt)("h2",{id:"supported-systems"},"Supported Systems"),(0,a.kt)("p",null,"Currently artemis has been tested on the following types of systems:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Windows 8.1 and higher. Arch: 64-bit"),(0,a.kt)("li",{parentName:"ul"},"macOS Catalina and higher. Arch: 64-bit and ARM"),(0,a.kt)("li",{parentName:"ul"},"Ubuntu, Fedora, Arch Linux. Arch: 64-bit and ARM")),(0,a.kt)("p",null,"If you would like support for another OS or architecture please open an issue."),(0,a.kt)("h2",{id:"github-releases"},"GitHub Releases"),(0,a.kt)("p",null,"Once downloaded for you platform from GitHub, extract the binary from the\narchive and you should be able to start collecting forensic data!"),(0,a.kt)("h2",{id:"build-from-source"},"Build from Source"),(0,a.kt)("p",null,"You may also build artemis from ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/puffycid/artemis"},"source"),".\nIn order build artemis you will need to install the Rust programming\nlangague.",(0,a.kt)("br",null)," Instructions to install Rust can be found on the\n",(0,a.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/"},"Rust Homepage"),"."),(0,a.kt)("p",null,"Once ",(0,a.kt)("inlineCode",{parentName:"p"},"Rust")," is installed you can download the source code for artemis using\n",(0,a.kt)("inlineCode",{parentName:"p"},"git"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"git clone https://github.com/puffycid/artemis\n")),(0,a.kt)("p",null,"Navigate to your downloaded repo and run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cargo build\n")),(0,a.kt)("p",null,"By default cargo builds a ",(0,a.kt)("inlineCode",{parentName:"p"},"debug")," version of the binary. If you want to build\nthe ",(0,a.kt)("inlineCode",{parentName:"p"},"release")," version (",(0,a.kt)("strong",{parentName:"p"},"recommended"),") of the binary run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cargo build --release\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"release")," version will be ",(0,a.kt)("strong",{parentName:"p"},"much")," faster and smaller than the ",(0,a.kt)("inlineCode",{parentName:"p"},"debug"),"\nversion. The compiled binary will be located at:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"<path to artemis repo>\\target\\debug\\artemis")," for the debug version"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"<path to artemis repo>\\target\\release\\artemis")," for the release version")))}d.isMDXComponent=!0}}]);