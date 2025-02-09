"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[945],{4875:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"Artifacts/macOS Artifacts/shellhistory","title":"Shell History","description":"Various shell history metadata","source":"@site/docs/Artifacts/macOS Artifacts/shellhistory.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/shellhistory","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/shellhistory","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/shellhistory.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Various shell history metadata","keywords":["macOS","plaintext"]},"sidebar":"artemisArtifacts","previous":{"title":"Safari","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/safari"},"next":{"title":"Spotlight","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/spotlight"}}');var i=e(4848),r=e(8453);const a={description:"Various shell history metadata",keywords:["macOS","plaintext"]},o="Shell History",c={},h=[];function l(t){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"shell-history",children:"Shell History"})}),"\n",(0,i.jsx)(n.p,{children:"Many Unix and Linux like systems provide a shell interface that allows a user to\nexecute a command or application. Many of these shell interfaces keep a record\nof the command executed and depending on the configuration the timestamp when\nthe command was executed. Popular shells include:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"bash"}),"\n",(0,i.jsx)(n.li,{children:"zsh"}),"\n",(0,i.jsx)(n.li,{children:"fish"}),"\n",(0,i.jsx)(n.li,{children:"sh"}),"\n",(0,i.jsx)(n.li,{children:"PowerShell"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["artemis supports parsing ",(0,i.jsx)(n.code,{children:"zsh"})," and ",(0,i.jsx)(n.code,{children:"bash"})," shell history. In addition, it\nsupports parsing ",(0,i.jsx)(n.code,{children:"Python"})," history (despite not being a shell)."]}),"\n",(0,i.jsx)(n.p,{children:"Other parsers:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Any program that read a text file"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://linuxhint.com/bash_command_history_usage/",children:"Bash"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.soberkoder.com/better-zsh-history/",children:"Zsh"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "macos" # or "linux"\n\n[output]\nname = "shellhistory_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "shell_history"\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"N/A"}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["An array of ",(0,i.jsx)(n.code,{children:"BashHistory"})," for bash data, ",(0,i.jsx)(n.code,{children:"ZshHistory"})," for zsh data, and\n",(0,i.jsx)(n.code,{children:"PythonHistory"})," for Python data per user."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface BashHistory {\n  /**Array of lines associated with `.bash_history` file */\n  history: BashData[];\n  /**Path to `.bash_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.bash_history`\n */\nexport interface BashData {\n  /**Line entry */\n  history: string;\n  /**Timestamp associated with line entry. Timestamps are **optional** in `.bash_history` */\n  timestamp: string;\n  /**Line number */\n  line: number;\n}\n\nexport interface ZshHistory {\n  /**Array of lines associated with `.zs_history` file */\n  history: ZshData[];\n  /**Path to `.zsh_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.zsh_history`\n */\nexport interface ZshData {\n  /**Line entry */\n  history: string;\n  /**Timestamp associated with line entry. Timestamps are **optional** in `.zsh_history` */\n  timestamp: string;\n  /**Line number */\n  line: number;\n  /**Duration of command */\n  duration: number;\n}\n\nexport interface PythonHistory {\n  /**Array of lines associated with `.python_history` file */\n  history: PythonData[];\n  /**Path to `.python_history` file */\n  path: string;\n  /**User directory name */\n  user: string;\n}\n\n/**\n * History data associated with `.python_history`\n */\nexport interface PythonData {\n  /**Line entry */\n  history: string;\n  /**Line number */\n  line: number;\n}\n"})})]})}function d(t={}){const{wrapper:n}={...(0,r.R)(),...t.components};return n?(0,i.jsx)(n,{...t,children:(0,i.jsx)(l,{...t})}):l(t)}},8453:(t,n,e)=>{e.d(n,{R:()=>a,x:()=>o});var s=e(6540);const i={},r=s.createContext(i);function a(t){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function o(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:a(t.components),s.createElement(r.Provider,{value:n},t.children)}}}]);