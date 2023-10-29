"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[978],{3905:(n,e,t)=>{t.d(e,{Zo:()=>l,kt:()=>d});var r=t(7294);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function a(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var m=r.createContext({}),c=function(n){var e=r.useContext(m),t=e;return n&&(t="function"==typeof n?n(e):s(s({},e),n)),t},l=function(n){var e=c(n.components);return r.createElement(m.Provider,{value:e},n.children)},p="mdxType",f={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(n,e){var t=n.components,o=n.mdxType,i=n.originalType,m=n.parentName,l=a(n,["components","mdxType","originalType","parentName"]),p=c(t),u=o,d=p["".concat(m,".").concat(u)]||p[u]||f[u]||i;return t?r.createElement(d,s(s({ref:e},l),{},{components:t})):r.createElement(d,s({ref:e},l))}));function d(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var i=t.length,s=new Array(i);s[0]=u;var a={};for(var m in e)hasOwnProperty.call(e,m)&&(a[m]=e[m]);a.originalType=n,a[p]="string"==typeof n?n:o,s[1]=a;for(var c=2;c<i;c++)s[c]=t[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},4068:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>m,contentTitle:()=>s,default:()=>f,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=t(7462),o=(t(7294),t(3905));const i={description:"Windows system information",keywords:["windows"]},s="SystemInfo",a={unversionedId:"Artifacts/Windows Artfacts/systeminfo",id:"Artifacts/Windows Artfacts/systeminfo",title:"SystemInfo",description:"Windows system information",source:"@site/docs/Artifacts/Windows Artfacts/systeminfo.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/systeminfo",permalink:"/docs/Artifacts/Windows Artfacts/systeminfo",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/systeminfo.md",tags:[],version:"current",frontMatter:{description:"Windows system information",keywords:["windows"]},sidebar:"artemisArtifacts",previous:{title:"SRUM",permalink:"/docs/Artifacts/Windows Artfacts/srum"},next:{title:"Scheduled Tasks",permalink:"/docs/Artifacts/Windows Artfacts/tasks"}},m={},c=[],l={toc:c},p="wrapper";function f(n){let{components:e,...t}=n;return(0,o.kt)(p,(0,r.Z)({},l,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"systeminfo"},"SystemInfo"),(0,o.kt)("p",null,"Gets system metadata associated with the endpoint"),(0,o.kt)("p",null,"Other Parsers:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Any tool that calls the Windows API or queries system information")),(0,o.kt)("p",null,"Refernces:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"N/A")),(0,o.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "systeminfo_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "systeminfo"\n')),(0,o.kt)("h1",{id:"collection-options"},"Collection Options"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"N/A")),(0,o.kt)("h1",{id:"output-structure"},"Output Structure"),(0,o.kt)("p",null,"A ",(0,o.kt)("inlineCode",{parentName:"p"},"SystemInfo")," object structure"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface SystemInfo {\n  /**Boot time for endpoint */\n  boot_time: number;\n  /**Endpoint hostname */\n  hostname: string;\n  /**Endpoint OS version */\n  os_version: string;\n  /**Uptime of endpoint */\n  uptime: number;\n  /**Endpoint kernel version */\n  kernel_version: string;\n  /**Endpoint platform */\n  platform: string;\n  /**CPU information */\n  cpu: Cpus[];\n  /**Disks information */\n  disks: Disks[];\n  /**Memory information */\n  memory: Memory;\n  /**Performance information */\n  performance: LoadPerformance;\n}\n\n/**\n * CPU information on endpoint\n */\nexport interface Cpus {\n  /**CPU frequency */\n  frequency: number;\n  /**CPU usage on endpoint */\n  cpu_usage: number;\n  /**Name of CPU */\n  name: string;\n  /**Vendor ID for CPU */\n  vendor_id: string;\n  /**CPU brand */\n  brand: string;\n  /**Core Count */\n  physical_core_count: number;\n}\n\n/**\n * Disk information on endpoint\n */\nexport interface Disks {\n  /**Type of disk */\n  disk_type: string;\n  /**Filesystem for disk */\n  file_system: string;\n  /**Disk mount point */\n  mount_point: string;\n  /**Disk storage */\n  total_space: number;\n  /**Storage remaining */\n  available_space: number;\n  /**If disk is removable */\n  removable: boolean;\n}\n\n/**\n * Memory information on endpoint\n */\nexport interface Memory {\n  /**Available memory on endpoint */\n  available_memory: number;\n  /**Free memory on endpoint */\n  free_memory: number;\n  /**Free swap on endpoint */\n  free_swap: number;\n  /**Total memory on endpoint */\n  total_memory: number;\n  /**Total swap on endpoint */\n  total_swap: number;\n  /**Memory in use */\n  used_memory: number;\n  /**Swap in use */\n  used_swap: number;\n}\n\n/**\n * Average CPU load. These values are always zero (0) on Windows\n */\nexport interface LoadPerformance {\n  /**Average load for one (1) min */\n  avg_one_min: number;\n  /**Average load for five (5) min */\n  avg_five_min: number;\n  /**Average load for fifteen (15) min */\n  avg_fifteen_min: number;\n}\n")))}f.isMDXComponent=!0}}]);