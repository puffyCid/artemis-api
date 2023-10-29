"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6842],{3905:(t,n,e)=>{e.d(n,{Zo:()=>u,kt:()=>d});var r=e(7294);function o(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function i(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function a(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?i(Object(e),!0).forEach((function(n){o(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function l(t,n){if(null==t)return{};var e,r,o=function(t,n){if(null==t)return{};var e,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)e=i[r],n.indexOf(e)>=0||(o[e]=t[e]);return o}(t,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)e=i[r],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(o[e]=t[e])}return o}var s=r.createContext({}),c=function(t){var n=r.useContext(s),e=n;return t&&(e="function"==typeof t?t(n):a(a({},n),t)),e},u=function(t){var n=c(t.components);return r.createElement(s.Provider,{value:n},t.children)},p="mdxType",f={inlineCode:"code",wrapper:function(t){var n=t.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(t,n){var e=t.components,o=t.mdxType,i=t.originalType,s=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),p=c(e),m=o,d=p["".concat(s,".").concat(m)]||p[m]||f[m]||i;return e?r.createElement(d,a(a({ref:n},u),{},{components:e})):r.createElement(d,a({ref:n},u))}));function d(t,n){var e=arguments,o=n&&n.mdxType;if("string"==typeof t||o){var i=e.length,a=new Array(i);a[0]=m;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=t,l[p]="string"==typeof t?t:o,a[1]=l;for(var c=2;c<i;c++)a[c]=e[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,e)}m.displayName="MDXCreateElement"},958:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>f,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=e(7462),o=(e(7294),e(3905));const i={description:"Linux logon info",keywords:["linux","binary"]},a="Logons",l={unversionedId:"Artifacts/Linux Artifacts/logons",id:"Artifacts/Linux Artifacts/logons",title:"Logons",description:"Linux logon info",source:"@site/docs/Artifacts/Linux Artifacts/logons.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/logons",permalink:"/docs/Artifacts/Linux Artifacts/logons",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/logons.md",tags:[],version:"current",frontMatter:{description:"Linux logon info",keywords:["linux","binary"]},sidebar:"artemisArtifacts",previous:{title:"Journals",permalink:"/docs/Artifacts/Linux Artifacts/journals"},next:{title:"Processes",permalink:"/docs/Artifacts/Linux Artifacts/processes"}},s={},c=[],u={toc:c},p="wrapper";function f(t){let{components:n,...e}=t;return(0,o.kt)(p,(0,r.Z)({},u,e,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"logons"},"Logons"),(0,o.kt)("p",null,"Linux stores ",(0,o.kt)("inlineCode",{parentName:"p"},"Logon")," information in several different files depending on the\ndistro and software installed. Typically the following files contain logon\ninformation on Linux:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"wtmp - Historical logons"),(0,o.kt)("li",{parentName:"ul"},"btmp - Failed logons"),(0,o.kt)("li",{parentName:"ul"},"utmp - Users currently logged on")),(0,o.kt)("p",null,"In addition, ",(0,o.kt)("a",{parentName:"p",href:"/docs/Artifacts/Linux%20Artifacts/journals"},"Journal")," files may also contain logon information\nCurrently artemis supports all three (3) files above when obtaining ",(0,o.kt)("inlineCode",{parentName:"p"},"Logon"),"\ninformation. When collecting ",(0,o.kt)("inlineCode",{parentName:"p"},"Logon")," information artemis will only parse: wtmp,\nutmp, and btmp files."),(0,o.kt)("p",null,"If you want to check for logons in ",(0,o.kt)("inlineCode",{parentName:"p"},"Journal")," files, you can try to apply a\n",(0,o.kt)("a",{parentName:"p",href:"/docs/Intro/Scripting/filterscripts"},"filter")," to the ",(0,o.kt)("a",{parentName:"p",href:"/docs/Artifacts/Linux%20Artifacts/journals"},"Journal"),"\nartifact"),(0,o.kt)("p",null,"Other Parsers:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"N/A")),(0,o.kt)("p",null,"References:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/libyal/dtformats/blob/main/documentation/Utmp%20login%20records%20format.asciidoc"},"libyal")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://man7.org/linux/man-pages/man5/utmp.5.html"},"utmp"))),(0,o.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'system = "linux"\n\n[output]\nname = "logon_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "logon"\n')),(0,o.kt)("h1",{id:"collection-options"},"Collection Options"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"N/A")),(0,o.kt)("h1",{id:"output-structure"},"Output Structure"),(0,o.kt)("p",null,"An array of ",(0,o.kt)("inlineCode",{parentName:"p"},"Logon")," entries"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface Logon {\n  /**Logon type for logon entry */\n  logon_type: string;\n  /**Process ID */\n  pid: number;\n  /** Terminal info */\n  terminal: string;\n  /**Terminal ID for logon entry */\n  terminal_id: number;\n  /**Username for logon */\n  username: string;\n  /**Hostname for logon source */\n  hostname: string;\n  /**Termination status for logon entry */\n  termination_status: number;\n  /**Exit status logon entry */\n  exit_status: number;\n  /**Session for logon entry */\n  session: number;\n  /**Timestamp for logon in UNIXEPOCH seconds */\n  timestamp: number;\n  /**Source IP for logon entry */\n  ip: string;\n  /**Status of logon entry: `Success` or `Failed` */\n  status: string;\n}\n")))}f.isMDXComponent=!0}}]);