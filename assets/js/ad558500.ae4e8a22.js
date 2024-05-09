"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[736],{9144:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>f,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=s(7624),r=s(2172);const i={description:"Tracks execution of files on workstations",keywords:["windows","binary"]},c="Prefetch",o={id:"Artifacts/Windows Artfacts/prefetch",title:"Prefetch",description:"Tracks execution of files on workstations",source:"@site/docs/Artifacts/Windows Artfacts/prefetch.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/prefetch",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/prefetch",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/prefetch.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"Tracks execution of files on workstations",keywords:["windows","binary"]},sidebar:"artemisArtifacts",previous:{title:"PowerShell History",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/powershell"},next:{title:"Processes",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/processes"}},a={},d=[];function l(e){const t={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"prefetch",children:"Prefetch"}),"\n",(0,n.jsxs)(t.p,{children:["Windows ",(0,n.jsx)(t.code,{children:"Prefetch"})," data tracks execution of applications on Windows\nWorkstations. ",(0,n.jsx)(t.code,{children:"Prefetch"})," files are typically located at ",(0,n.jsx)(t.code,{children:"C:\\Windows\\Prefetch"}),".\nOn Windows servers ",(0,n.jsx)(t.code,{children:"Prefetch"})," is disabled and may also be disabled on systems\nwith SSDs. Starting on Windows 10, the ",(0,n.jsx)(t.code,{children:"Prefetch"})," files are compressed using\n",(0,n.jsx)(t.code,{children:"LZXPRESS Huffman"}),". artemis uses the Windows API to decompress the data before\nparsing ",(0,n.jsx)(t.code,{children:"Prefetch"})," fiels"]}),"\n",(0,n.jsx)(t.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://docs.velociraptor.app/artifact_references/pages/windows.forensics.prefetch/",children:"Velociraptor"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://ericzimmerman.github.io/",children:"PECmd"})}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["References:\n",(0,n.jsx)(t.a,{href:"https://github.com/libyal/libscca/blob/main/documentation/Windows%20Prefetch%20File%20(PF)%20format.asciidoc",children:"Libyal"})]}),"\n",(0,n.jsx)(t.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "prefetch_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "prefetch"\n[artifacts.prefetch]\n# Optional\n# alt_dir = "C:\\\\Artifacts"\n'})}),"\n",(0,n.jsx)(t.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"alt_dir"})," Full path to an alternative directory containing Prefetch files.\nThis configuration is ",(0,n.jsx)(t.strong,{children:"optional"}),". By default artemis parse all Prefetch\nfiles on the system at the default location"]}),"\n"]}),"\n",(0,n.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(t.p,{children:["An array of ",(0,n.jsx)(t.code,{children:"Prefetch"})," entries"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface Prefetch {\n  /**Path to prefetch file */\n  path: string;\n  /**Name of executed file */\n  filename: string;\n  /**Prefetch hash */\n  hash: string;\n  /**Most recent execution timestamp in UNIXEPOCH seconds */\n  last_run_time: number;\n  /**Array of up to eight (8) execution timestamps in UNIXEPOCH seconds */\n  all_run_times: number[];\n  /**Number of executions */\n  run_count: number;\n  /**Size of executed file */\n  size: number;\n  /**Array of volume serial numbers associated with accessed files/directories */\n  volume_serial: string[];\n  /**Array of volume creation timestamps in UNIXEPOCH seconds associated with accessed files/directories */\n  volume_creation: number[];\n  /**Array of volumes associated accessed files/directories */\n  volume_path: string[];\n  /**Number of files accessed by executed file */\n  accessed_file_count: number;\n  /**Number of directories accessed by executed file */\n  accessed_directories_count: number;\n  /**Array of accessed files by executed file */\n  accessed_files: string[];\n  /**Array of accessed directories by executed file */\n  accessed_directories: string[];\n}\n"})})]})}function f(e={}){const{wrapper:t}={...(0,r.M)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},2172:(e,t,s)=>{s.d(t,{I:()=>o,M:()=>c});var n=s(1504);const r={},i=n.createContext(r);function c(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);