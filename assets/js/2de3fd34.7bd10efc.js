"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[7934],{3905:(t,e,n)=>{n.d(e,{Zo:()=>c,kt:()=>y});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var l=r.createContext({}),p=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},c=function(t){var e=p(t.components);return r.createElement(l.Provider,{value:e},t.children)},u="mdxType",h={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,a=t.originalType,l=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),u=p(n),m=i,y=u["".concat(l,".").concat(m)]||u[m]||h[m]||a;return n?r.createElement(y,s(s({ref:e},c),{},{components:n})):r.createElement(y,s({ref:e},c))}));function y(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var a=n.length,s=new Array(a);s[0]=m;var o={};for(var l in e)hasOwnProperty.call(e,l)&&(o[l]=e[l]);o.originalType=t,o[u]="string"==typeof t?t:i,s[1]=o;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5884:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var r=n(7462),i=(n(7294),n(3905));const a={description:"Various shell history metadata",keywords:["linux","plaintext"]},s="Shell History",o={unversionedId:"Artifacts/Linux Artifacts/shellhistory",id:"Artifacts/Linux Artifacts/shellhistory",title:"Shell History",description:"Various shell history metadata",source:"@site/docs/Artifacts/Linux Artifacts/shellhistory.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/shellhistory",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/shellhistory",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/shellhistory.md",tags:[],version:"current",frontMatter:{description:"Various shell history metadata",keywords:["linux","plaintext"]},sidebar:"artemisArtifacts",previous:{title:"Processes",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/processes"},next:{title:"Sudo Logs",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/sudo"}},l={},p=[],c={toc:p},u="wrapper";function h(t){let{components:e,...n}=t;return(0,i.kt)(u,(0,r.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"shell-history"},"Shell History"),(0,i.kt)("p",null,"Many Unix and Linux like systems provide a shell interface that allows a user to\nexecute a command or application. Many of these shell interfaces keep a record\nof the command executed and depending on the configuration the timestamp when\nthe command was executed. Popular shells include:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"bash"),(0,i.kt)("li",{parentName:"ul"},"zsh"),(0,i.kt)("li",{parentName:"ul"},"fish"),(0,i.kt)("li",{parentName:"ul"},"sh"),(0,i.kt)("li",{parentName:"ul"},"PowerShell")),(0,i.kt)("p",null,"artemis supports parsing ",(0,i.kt)("inlineCode",{parentName:"p"},"zsh")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"bash")," shell history. In addition, it\nsupports parsing ",(0,i.kt)("inlineCode",{parentName:"p"},"Python")," history (despite not being a shell)."),(0,i.kt)("p",null,"Other parsers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Any program that read a text file")),(0,i.kt)("p",null,"References:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://linuxhint.com/bash_command_history_usage/"},"Bash")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.soberkoder.com/better-zsh-history/"},"Zsh"))),(0,i.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos" # or "linux"\n\n[output]\nname = "shellhistory_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "shell_history"\n')),(0,i.kt)("h1",{id:"collection-options"},"Collection Options"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"N/A")),(0,i.kt)("h1",{id:"output-structure"},"Output Structure"),(0,i.kt)("p",null,"An array of ",(0,i.kt)("inlineCode",{parentName:"p"},"BashHistory")," for ",(0,i.kt)("inlineCode",{parentName:"p"},"bash")," data, ",(0,i.kt)("inlineCode",{parentName:"p"},"ZshHistory")," for ",(0,i.kt)("inlineCode",{parentName:"p"},"zsh")," data, and\n",(0,i.kt)("inlineCode",{parentName:"p"},"PythonHistory")," for ",(0,i.kt)("inlineCode",{parentName:"p"},"Python")," data per user."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface BashHistory {\n  /**Array of lines associated with `.bash_history` file */\n  history: BashData[];\n  /**Path to `.bash_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.bash_history`\n */\nexport interface BashData {\n  /**Line entry */\n  history: string;\n  /**Timestamp associated with line entry in UNIXEPOCH. Timestamps are **optional** in `.bash_history`, zero (0) is returned for no timestamp */\n  timestamp: number;\n  /**Line number */\n  line: number;\n}\n\nexport interface ZshHistory {\n  /**Array of lines associated with `.zs_history` file */\n  history: ZshData[];\n  /**Path to `.bash_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.zsh_history`\n */\nexport interface ZshData {\n  /**Line entry */\n  history: string;\n  /**Timestamp associated with line entry in UNIXEPOCH. Timestamps are **optional** in `.zsh_history`, zero (0) is returned for no timestamp */\n  timestamp: number;\n  /**Line number */\n  line: number;\n  /**Duration of command */\n  duration: number;\n}\n\nexport interface PythonHistory {\n  /**Array of lines associated with `.python_history` file */\n  history: PythonData[];\n  /**Path to `.python_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.python_history`\n */\nexport interface PythonData {\n  /**Line entry */\n  history: string;\n  /**Line number */\n  line: number;\n}\n")))}h.isMDXComponent=!0}}]);