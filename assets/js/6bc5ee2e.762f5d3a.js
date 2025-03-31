"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3542],{28453:(n,t,e)=>{e.d(t,{R:()=>a,x:()=>o});var s=e(96540);const i={},r=s.createContext(i);function a(n){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function o(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),s.createElement(r.Provider,{value:t},n.children)}},81900:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Artifacts/Linux Artifacts/journals","title":"Journals","description":"Systemd logging files","source":"@site/docs/Artifacts/Linux Artifacts/journals.md","sourceDirName":"Artifacts/Linux Artifacts","slug":"/Artifacts/Linux Artifacts/journals","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/journals","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/journals.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"Systemd logging files","keywords":["linux","logs","binary"]},"sidebar":"artemisArtifacts","previous":{"title":"GVFS","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/gvfs"},"next":{"title":"Logons","permalink":"/artemis-api/docs/Artifacts/Linux Artifacts/logons"}}');var i=e(74848),r=e(28453);const a={description:"Systemd logging files",keywords:["linux","logs","binary"]},o="Journals",c={},d=[];function l(n){const t={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"journals",children:"Journals"})}),"\n",(0,i.jsxs)(t.p,{children:["Linux ",(0,i.jsx)(t.code,{children:"Journals"})," are the log files associated with the systemd service. Systemd\nis a popular system service that is common on most Linux distros. The logs can\ncontain data related to application activity, sudo commands, and much more."]}),"\n",(0,i.jsx)(t.p,{children:"Similar to macOS Unified Logs and Windows Event Logs, in order to keep memory\nusage low, every 100,000 entries artemis will output the data."}),"\n",(0,i.jsx)(t.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"None"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"References:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://systemd.io/JOURNAL_FILE_FORMAT/",children:"Journal format"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://wiki.archlinux.org/title/Systemd/Journal",children:"Arch Wiki"})}),"\n"]}),"\n",(0,i.jsx)(t.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-toml",children:'system = "linux"\n\n[output]\nname = "journals_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "journals"\n[artifacts.journals]\n# Optional\n# alt_path = ""\n'})}),"\n",(0,i.jsx)(t.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"alt_path"})," Path to a directory containing Journal files. This configuration is\n",(0,i.jsx)(t.strong,{children:"optional"})]}),"\n"]}),"\n",(0,i.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(t.p,{children:["An array of ",(0,i.jsx)(t.code,{children:"Journal"})," entries"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:'export interface Journal {\n  /**User ID associated with entry */\n  uid: number;\n  /**Group ID associated with entry */\n  gid: number;\n  /**Process ID associated with entry */\n  pid: number;\n  /**Thread ID associated with entry */\n  thread_id: number;\n  /**Command associated with entry */\n  comm: string;\n  /**Priority associated with entry */\n  priority: string;\n  /**Syslog facility associated with entry */\n  syslog_facility: string;\n  /**Executable file associated with entry */\n  executable: string;\n  /**Cmdline args associated with entry */\n  cmdline: string;\n  /**Effective capabilities of process associated with entry */\n  cap_effective: string;\n  /**Session of the process associated with entry */\n  audit_session: number;\n  /**Login UID of the process associated with entry */\n  audit_loginuid: number;\n  /**Systemd Control Group associated with entry */\n  systemd_cgroup: string;\n  /**Systemd owner UID associated with entry */\n  systemd_owner_uid: number;\n  /**Systemd unit associated with entry */\n  systemd_unit: string;\n  /**Systemd user unit associated with entry */\n  systemd_user_unit: string;\n  /**Systemd slice associated with entry */\n  systemd_slice: string;\n  /**Systemd user slice associated with entry */\n  systemd_user_slice: string;\n  /**Systemd invocation ID associated with entry */\n  systemd_invocation_id: string;\n  /**Kernel Boot ID associated with entry */\n  boot_id: string;\n  /**Machine ID of host associated with entry */\n  machine_id: string;\n  /**Hostname associated with entry */\n  hostname: string;\n  /**Runtime scope associated with entry */\n  runtime_scope: string;\n  /**Source timestamp associated with entry */\n  source_realtime: string;\n  /**Timestamp associated with entry */\n  realtime: string;\n  /**How entry was received by the Journal service */\n  transport: string;\n  /**Journal message entry */\n  message: string;\n  /**Message ID associated with Journal Catalog */\n  message_id: string;\n  /**Unit result associated with entry */\n  unit_result: string;\n  /**Code line for file associated with entry */\n  code_line: number;\n  /**Code function for file associated with entry */\n  code_function: string;\n  /**Code file associated with entry */\n  code_file: string;\n  /**User invocation ID associated with entry */\n  user_invocation_id: string;\n  /**User unit associated with entry */\n  user_unit: string;\n  /**\n   * Custom fields associated with entry.\n   * Example:\n   * ```\n   * "custom": {\n   *            "_SOURCE_MONOTONIC_TIMESTAMP": "536995",\n   *            "_UDEV_SYSNAME": "0000:00:1c.3",\n   *            "_KERNEL_DEVICE": "+pci:0000:00:1c.3",\n   *            "_KERNEL_SUBSYSTEM": "pci"\n   *        }\n   * ```\n   */\n  custom: Record<string, string>;\n  /**Sequence Number associated with entry */\n  seqnum: number;\n}\n'})})]})}function u(n={}){const{wrapper:t}={...(0,r.R)(),...n.components};return t?(0,i.jsx)(t,{...n,children:(0,i.jsx)(l,{...n})}):l(n)}}}]);