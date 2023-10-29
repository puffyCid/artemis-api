"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9891],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,g=d["".concat(c,".").concat(m)]||d[m]||p[m]||s;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=m;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[d]="string"==typeof e?e:o,i[1]=a;for(var l=2;l<s;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7056:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=n(7462),o=(n(7294),n(3905));const s={description:"macOS sudo records",keywords:["macOS","logs","binary"]},i="Sudo Logs",a={unversionedId:"Artifacts/macOS Artifacts/sudo",id:"Artifacts/macOS Artifacts/sudo",title:"Sudo Logs",description:"macOS sudo records",source:"@site/docs/Artifacts/macOS Artifacts/sudo.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/sudo",permalink:"/docs/Artifacts/macOS Artifacts/sudo",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/sudo.md",tags:[],version:"current",frontMatter:{description:"macOS sudo records",keywords:["macOS","logs","binary"]},sidebar:"artemisArtifacts",previous:{title:"Shell History",permalink:"/docs/Artifacts/macOS Artifacts/shellhistory"},next:{title:"SystemInfo",permalink:"/docs/Artifacts/macOS Artifacts/systeminfo"}},c={},l=[],u={toc:l},d="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"sudo-logs"},"Sudo Logs"),(0,o.kt)("p",null,"Unix ",(0,o.kt)("inlineCode",{parentName:"p"},"SudoLogs"),' are the log files associated with sudo execution. Sudo ("super\nuser do" or "substitute user") is used to run programs with elevated\nprivileges.\\\nmacOS ',(0,o.kt)("inlineCode",{parentName:"p"},"SudoLogs")," are stored in the Unified Log files.\\\nLinux ",(0,o.kt)("inlineCode",{parentName:"p"},"SudoLogs")," are stored in the Systemd Journal files.\\\nThe log entries show evidence of commands executed with elevated privileges"),(0,o.kt)("p",null,"Other Parsers:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"None")),(0,o.kt)("p",null,"References:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"N/A")),(0,o.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'system = "maco" # or "linux"\n\n[output]\nname = "sudologs_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "sudologs"\n')),(0,o.kt)("h1",{id:"collection-options"},"Collection Options"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"N/A")),(0,o.kt)("h1",{id:"output-structure"},"Output Structure"),(0,o.kt)("p",null,"On a macOS system ",(0,o.kt)("inlineCode",{parentName:"p"},"sudologs")," return an array of ",(0,o.kt)("inlineCode",{parentName:"p"},"UnifiedLog")," entries"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface UnifiedLog {\n  /**Subsystem used by the log entry */\n  subsystem: string;\n  /**Library associated with the log entry */\n  library: string;\n  /**Log entry category */\n  category: string;\n  /**Process ID associated with log entry */\n  pid: number;\n  /**Effective user ID associated with log entry */\n  euid: number;\n  /**Thread ID associated with log entry */\n  thread_id: number;\n  /**Activity ID associated with log entry */\n  activity_id: number;\n  /**UUID of library associated with the log entry */\n  library_uuid: string;\n  /**UNIXEPOCH timestamp of log entry in nanoseconds */\n  time: number;\n  /**Log entry event type */\n  event_type: string;\n  /**Log entry log type */\n  log_type: string;\n  /**Process associated with log entry */\n  process: string;\n  /**UUID of process associated with log entry */\n  process_uuid: string;\n  /**Raw string message  associated with log entry*/\n  raw_message: string;\n  /**Boot UUID associated with log entry */\n  boot_uuid: string;\n  /**Timezone associated with log entry */\n  timezone_name: string;\n  /**Strings associated with the log entry */\n  mesage_entries: Record<string, string | number>;\n  /**\n   * Resolved message entry associated log entry.\n   * Merge of `raw_message` and `message_entries`\n   */\n  message: string;\n}\n")))}p.isMDXComponent=!0}}]);