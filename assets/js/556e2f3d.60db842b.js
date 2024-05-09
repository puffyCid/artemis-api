"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1812],{1888:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var n=s(7624),i=s(2172);const r={description:"macOS sudo records",keywords:["macOS","logs","binary"]},o="Sudo Logs",a={id:"Artifacts/macOS Artifacts/sudo",title:"Sudo Logs",description:"macOS sudo records",source:"@site/docs/Artifacts/macOS Artifacts/sudo.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/sudo",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/sudo",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/sudo.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"macOS sudo records",keywords:["macOS","logs","binary"]},sidebar:"artemisArtifacts",previous:{title:"Spotlight",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/spotlight"},next:{title:"System Extensions",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/systemextensions"}},c={},d=[];function l(e){const t={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"sudo-logs",children:"Sudo Logs"}),"\n",(0,n.jsxs)(t.p,{children:["Unix ",(0,n.jsx)(t.code,{children:"SudoLogs"}),' are the log files associated with sudo execution. Sudo ("super\nuser do" or "substitute user") is used to run programs with elevated privileges.']}),"\n",(0,n.jsxs)(t.p,{children:["macOS ",(0,n.jsx)(t.code,{children:"SudoLogs"})," are stored in the Unified Log files. The log entries show\nevidence of commands executed with elevated privileges"]}),"\n",(0,n.jsx)(t.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"None"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"References:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"N/A"}),"\n"]}),"\n",(0,n.jsx)(t.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "sudologs_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "sudologs-macos"\n[artifacts.sudologs_macos]\n# Optional\n# logarchive_path = ""\n'})}),"\n",(0,n.jsx)(t.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"logarchive_path"})," Path to a logarchive formatted directory. This configuration\nis ",(0,n.jsx)(t.strong,{children:"optional"})]}),"\n"]}),"\n",(0,n.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(t.p,{children:["An array of ",(0,n.jsx)(t.code,{children:"UnifiedLog"})," entries associated with sudo activity"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface UnifiedLog {\n  /**Subsystem used by the log entry */\n  subsystem: string;\n  /**Library associated with the log entry */\n  library: string;\n  /**Log entry category */\n  category: string;\n  /**Process ID associated with log entry */\n  pid: number;\n  /**Effective user ID associated with log entry */\n  euid: number;\n  /**Thread ID associated with log entry */\n  thread_id: number;\n  /**Activity ID associated with log entry */\n  activity_id: number;\n  /**UUID of library associated with the log entry */\n  library_uuid: string;\n  /**UNIXEPOCH timestamp of log entry in nanoseconds */\n  time: number;\n  /**Log entry event type */\n  event_type: string;\n  /**Log entry log type */\n  log_type: string;\n  /**Process associated with log entry */\n  process: string;\n  /**UUID of process associated with log entry */\n  process_uuid: string;\n  /**Raw string message  associated with log entry*/\n  raw_message: string;\n  /**Boot UUID associated with log entry */\n  boot_uuid: string;\n  /**Timezone associated with log entry */\n  timezone_name: string;\n  /**Strings associated with the log entry */\n  mesage_entries: Record<string, string | number>;\n  /**\n   * Resolved message entry associated log entry.\n   * Merge of `raw_message` and `message_entries`\n   */\n  message: string;\n}\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.M)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},2172:(e,t,s)=>{s.d(t,{I:()=>a,M:()=>o});var n=s(1504);const i={},r=n.createContext(i);function o(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);