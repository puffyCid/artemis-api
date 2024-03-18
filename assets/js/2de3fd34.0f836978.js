"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[592],{3660:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>h});var s=e(7624),i=e(2172);const r={description:"Various shell history metadata",keywords:["linux","plaintext"]},o="Shell History",a={id:"Artifacts/Linux Artifacts/shellhistory",title:"Shell History",description:"Various shell history metadata",source:"@site/docs/Artifacts/Linux Artifacts/shellhistory.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/shellhistory",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/shellhistory",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/shellhistory.md",tags:[],version:"current",frontMatter:{description:"Various shell history metadata",keywords:["linux","plaintext"]},sidebar:"artemisArtifacts",previous:{title:"RPM Packages",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/rpm"},next:{title:"Sudo Logs",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/sudo"}},c={},h=[];function l(n){const t={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.M)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"shell-history",children:"Shell History"}),"\n",(0,s.jsx)(t.p,{children:"Many Unix and Linux like systems provide a shell interface that allows a user to\nexecute a command or application. Many of these shell interfaces keep a record\nof the command executed and depending on the configuration the timestamp when\nthe command was executed. Popular shells include:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"bash"}),"\n",(0,s.jsx)(t.li,{children:"zsh"}),"\n",(0,s.jsx)(t.li,{children:"fish"}),"\n",(0,s.jsx)(t.li,{children:"sh"}),"\n",(0,s.jsx)(t.li,{children:"PowerShell"}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["artemis supports parsing ",(0,s.jsx)(t.code,{children:"zsh"})," and ",(0,s.jsx)(t.code,{children:"bash"})," shell history. In addition, it\nsupports parsing ",(0,s.jsx)(t.code,{children:"Python"})," history (despite not being a shell)."]}),"\n",(0,s.jsx)(t.p,{children:"Other parsers:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Any program that read a text file"}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"References:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://linuxhint.com/bash_command_history_usage/",children:"Bash"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.soberkoder.com/better-zsh-history/",children:"Zsh"})}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-toml",children:'system = "macos" # or "linux"\n\n[output]\nname = "shellhistory_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "shell_history"\n'})}),"\n",(0,s.jsx)(t.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"N/A"}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(t.p,{children:["An array of ",(0,s.jsx)(t.code,{children:"BashHistory"})," for ",(0,s.jsx)(t.code,{children:"bash"})," data, ",(0,s.jsx)(t.code,{children:"ZshHistory"})," for ",(0,s.jsx)(t.code,{children:"zsh"})," data, and\n",(0,s.jsx)(t.code,{children:"PythonHistory"})," for ",(0,s.jsx)(t.code,{children:"Python"})," data per user."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"export interface BashHistory {\n  /**Array of lines associated with `.bash_history` file */\n  history: BashData[];\n  /**Path to `.bash_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.bash_history`\n */\nexport interface BashData {\n  /**Line entry */\n  history: string;\n  /**Timestamp associated with line entry in UNIXEPOCH. Timestamps are **optional** in `.bash_history`, zero (0) is returned for no timestamp */\n  timestamp: number;\n  /**Line number */\n  line: number;\n}\n\nexport interface ZshHistory {\n  /**Array of lines associated with `.zs_history` file */\n  history: ZshData[];\n  /**Path to `.bash_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.zsh_history`\n */\nexport interface ZshData {\n  /**Line entry */\n  history: string;\n  /**Timestamp associated with line entry in UNIXEPOCH. Timestamps are **optional** in `.zsh_history`, zero (0) is returned for no timestamp */\n  timestamp: number;\n  /**Line number */\n  line: number;\n  /**Duration of command */\n  duration: number;\n}\n\nexport interface PythonHistory {\n  /**Array of lines associated with `.python_history` file */\n  history: PythonData[];\n  /**Path to `.python_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.python_history`\n */\nexport interface PythonData {\n  /**Line entry */\n  history: string;\n  /**Line number */\n  line: number;\n}\n"})})]})}function d(n={}){const{wrapper:t}={...(0,i.M)(),...n.components};return t?(0,s.jsx)(t,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}},2172:(n,t,e)=>{e.d(t,{I:()=>a,M:()=>o});var s=e(1504);const i={},r=s.createContext(i);function o(n){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function a(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:o(n.components),s.createElement(r.Provider,{value:t},n.children)}}}]);