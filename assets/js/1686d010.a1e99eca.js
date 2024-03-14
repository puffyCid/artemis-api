"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9100],{9180:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var i=n(7624),t=n(2172);const o={sidebar_position:3},r="CLI Options",a={id:"Intro/cli",title:"CLI Options",description:"artemis is designed to have a very simple CLI menu. All of the complex data",source:"@site/docs/Intro/cli.md",sourceDirName:"Intro",slug:"/Intro/cli",permalink:"/artemis-api/docs/Intro/cli",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/cli.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"artemisStart",previous:{title:"Installation",permalink:"/artemis-api/docs/Intro/installation"},next:{title:"Privileges",permalink:"/artemis-api/docs/Intro/privileges"}},c={},l=[{value:"Collecting Artifacts",id:"collecting-artifacts",level:2},{value:"TOML Collections",id:"toml-collections",level:2},{value:"JavaScript Collections",id:"javascript-collections",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"cli-options",children:"CLI Options"}),"\n",(0,i.jsxs)(s.p,{children:["artemis is designed to have a very simple CLI menu. All of the complex data\nparsing is handle in the ",(0,i.jsx)(s.code,{children:"artemis-core"})," library."]}),"\n",(0,i.jsx)(s.h1,{id:"running-artemis",children:"Running Artemis"}),"\n",(0,i.jsxs)(s.p,{children:["Once you have ",(0,i.jsx)(s.a,{href:"/artemis-api/docs/Intro/installation",children:"installed"})," artemis you can access its help\nmenu with the command below:"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"artemis -h\nUsage: artemis [OPTIONS] [COMMAND]\n\nCommands:\n  acquire  Acquire forensic artifacts\n  help     Print this message or the help of the given subcommand(s)\n\nOptions:\n  -t, --toml <TOML>              Full path to TOML collector\n  -d, --decode <DECODE>          Base64 encoded TOML file\n  -j, --javascript <JAVASCRIPT>  Full path to JavaScript file\n  -h, --help                     Print help\n  -V, --version                  Print version\n"})}),"\n",(0,i.jsx)(s.h2,{id:"collecting-artifacts",children:"Collecting Artifacts"}),"\n",(0,i.jsxs)(s.p,{children:["The easiest way to start collecting forensic artifacts is to use the ",(0,i.jsx)(s.code,{children:"acquire"}),"\ncommand. This will allow you to select specific artifacts."]}),"\n",(0,i.jsx)(s.p,{children:"For example for macOS a user can acquire any of the artifacts below:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"artemis acquire -h\nAcquire forensic artifacts\n\nUsage: artemis acquire [OPTIONS] [COMMAND]\n\nCommands:\n  processes          Collect processes\n  filelisting        Pull filelisting\n  systeminfo         Get systeminfo\n  firefoxhistory     Parse Firefox History\n  chromiumhistory    Parse Chromium History\n  firefoxdownloads   Parse Firefox Downloads\n  chromiumdownloads  Parse Chromium Downloads\n  prefetch           windows: Parse Prefetch\n  eventlogs          windows: Parse EventLogs\n  rawfilelisting     windows: Parse NTFS to get filelisting\n  shimdb             windows: Parse ShimDatabase\n  registry           windows: Parse Registry\n  userassist         windows: Parse Userassist\n  shimcache          windows: Parse Shimcache\n  shellbags          windows: Parse Shellbags\n  amcache            windows: Parse Amcache\n  shortcuts          windows: Parse Shortcuts\n  usnjrnl            windows: Parse UsnJrnl\n  bits               windows: Parse BITS\n  srum               windows: Parse SRUM\n  users-windows      windows: Parse Users\n  search             windows: Parse Windows Search\n  tasks              windows: Parse Windows Tasks\n  services           windows: Parse Windows Services\n  jumplists          windows: Parse Jumplists\n  recyclebin         windows: Parse RecycleBin\n  wmipersist         windows: Parse WMI Repository\n  execpolicy         macos: Parse ExecPolicy\n  users-macos        macos: Collect local users\n  fsevents           macos: Parse FsEvents entries\n  emond              macos: Parse Emond persistence. Removed in Ventura\n  loginitems         macos: Parse LoginItems\n  launchd            macos: Parse Launch Daemons and Agents\n  groups-macos       macos: Collect local groups\n  safari-history     macos: Collect Safari History\n  safari-downloads   macos: Collect Safari Downloads\n  unifiedlogs        macos: Parse the Unified Logs\n  sudologs-macos     macos: Parse Sudo log entries from Unified Logs\n  spotlight          macos: Parse the Spotlight database\n  shellhistory       unix: Parse Shellhistory\n  cron               unix: Parse Cron Jobs\n  sudologs-linux     linux: Grab Sudo logs\n  journals           linux: Parse systemd Journal files\n  logons             linux: Parse Logon files\n  help               Print this message or the help of the given subcommand(s)\n\nOptions:\n      --format <FORMAT>  Output format. JSON or JSON [default: json]\n  -h, --help             Print help\n"})}),"\n",(0,i.jsx)(s.p,{children:"To collect a process listing you would type:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"artemis acquire processes\n"})}),"\n",(0,i.jsx)(s.h2,{id:"toml-collections",children:"TOML Collections"}),"\n",(0,i.jsx)(s.p,{children:"If you want to collect multiple artifacts the easiest way to do that is to\ncreate a TOML file and provide the TOML file to artemis. There are two (2) ways\nto provide TOML collections:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Provide the full path the TOML file on disk"}),"\n",(0,i.jsx)(s.li,{children:"base64 encode a TOML file and provide that as an argument"}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"The artemis source code provides several pre-made TOML collection files that can\nused as examples."}),"\n",(0,i.jsxs)(s.p,{children:["For example on ",(0,i.jsx)(s.strong,{children:"macOS"})," we downloaded the\n",(0,i.jsx)(s.a,{href:"https://github.com/puffycid/artemis/blob/main/artemis-core/tests/test_data/macos/processes.toml",children:"processes.toml"}),"\nfile from the artemis repo to the same directory as the ",(0,i.jsx)(s.strong,{children:"macOS"})," artemis binary\nand ran using ",(0,i.jsx)(s.strong,{children:"sudo"})]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"sudo ./artemis -t processes.toml\n[artemis] Starting artemis collection!\n[artemis] Finished artemis collection!\n"})}),"\n",(0,i.jsxs)(s.p,{children:["On ",(0,i.jsx)(s.strong,{children:"Windows"})," we downloaded the\n",(0,i.jsx)(s.a,{href:"https://github.com/puffycid/artemis/blob/main/artemis-core/tests/test_data/windows/processes.toml",children:"processes.toml"}),"\nfile from the artemis repo to the same directory as the ",(0,i.jsx)(s.strong,{children:"Windows"})," artemis\nbinary and ran using ",(0,i.jsx)(s.strong,{children:"Administrator"})," privileges"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"artemis.exe -t processes.toml\n[artemis] Starting artemis collection!\n[artemis] Finished artemis collection!\n"})}),"\n",(0,i.jsxs)(s.p,{children:["Both ",(0,i.jsx)(s.code,{children:"processes.toml"})," files tell artemis to output the results to a directory\ncalled ",(0,i.jsx)(s.code,{children:"tmp/process_collection"})," in the current directory and output using\n",(0,i.jsx)(s.code,{children:"jsonl"})," format"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"./tmp\n\u2514\u2500\u2500 process_collection\n    \u2514\u2500\u2500 d7f89e7b-fcd8-42e8-8769-6fe7eaf58bee.jsonl\n"})}),"\n",(0,i.jsxs)(s.p,{children:["To run the same collection except as a base64 encoded string on ",(0,i.jsx)(s.strong,{children:"macOS"})," we can\ndo the following:"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"sudo ./artemis -d c3lzdGVtID0gIm1hY29zIgoKW291dHB1dF0KbmFtZSA9ICJwcm9jZXNzX2NvbGxlY3Rpb24iCmRpcmVjdG9yeSA9ICIuL3RtcCIKZm9ybWF0ID0gImpzb25sIgpjb21wcmVzcyA9IGZhbHNlCmVuZHBvaW50X2lkID0gImFiZGMiCmNvbGxlY3Rpb25faWQgPSAxCm91dHB1dCA9ICJsb2NhbCIKCltbYXJ0aWZhY3RzXV0KYXJ0aWZhY3RfbmFtZSA9ICJwcm9jZXNzZXMiICMgTmFtZSBvZiBhcnRpZmFjdApbYXJ0aWZhY3RzLnByb2Nlc3Nlc10KbWV0YWRhdGEgPSB0cnVlICMgR2V0IGV4ZWN1dGFibGUgbWV0YWRhdGEKbWQ1ID0gdHJ1ZSAjIE1ENSBhbGwgZmlsZXMKc2hhMSA9IGZhbHNlICMgU0hBMSBhbGwgZmlsZXMKc2hhMjU2ID0gZmFsc2UgIyBTSEEyNTYgYWxsIGZpbGVz\n[artemis] Starting artemis collection!\n[artemis] Finished artemis collection!\n"})}),"\n",(0,i.jsxs)(s.p,{children:["On ",(0,i.jsx)(s.strong,{children:"Windows"})," it would be (using ",(0,i.jsx)(s.strong,{children:"Administrator"})," privileges again):"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"artemis.exe -d c3lzdGVtID0gIndpbmRvd3MiCgpbb3V0cHV0XQpuYW1lID0gInByb2Nlc3Nlc19jb2xsZWN0aW9uIgpkaXJlY3RvcnkgPSAiLi90bXAiCmZvcm1hdCA9ICJqc29uIgpjb21wcmVzcyA9IGZhbHNlCmVuZHBvaW50X2lkID0gImFiZGMiCmNvbGxlY3Rpb25faWQgPSAxCm91dHB1dCA9ICJsb2NhbCIKCltbYXJ0aWZhY3RzXV0KYXJ0aWZhY3RfbmFtZSA9ICJwcm9jZXNzZXMiICMgTmFtZSBvZiBhcnRpZmFjdApbYXJ0aWZhY3RzLnByb2Nlc3Nlc10KbWV0YWRhdGEgPSB0cnVlICMgR2V0IGV4ZWN1dGFibGUgbWV0YWRhdGEKbWQ1ID0gdHJ1ZSAjIE1ENSBhbGwgZmlsZXMKc2hhMSA9IGZhbHNlICMgU0hBMSBhbGwgZmlsZXMKc2hhMjU2ID0gZmFsc2UgIyBTSEEyNTYgYWxsIGZpbGVz\n[artemis] Starting artemis collection!\n[artemis] Finished artemis collection!\n"})}),"\n",(0,i.jsx)(s.h2,{id:"javascript-collections",children:"JavaScript Collections"}),"\n",(0,i.jsx)(s.p,{children:"You can also execute JavaScript code using artemis."}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-javascript",children:"function getProcesses(md5, sha1, sha256, binary_info) {\n  const hashes = {\n    md5,\n    sha1,\n    sha256,\n  };\n  const data = Deno.core.ops.get_processes(\n    JSON.stringify(hashes),\n    binary_info,\n  );\n  const results = JSON.parse(data);\n  return results;\n}\n\nfunction main() {\n  const md5 = false;\n  const sha1 = false;\n  const sha256 = false;\n  const binary_info = false;\n  const proc_list = getProcesses(md5, sha1, sha256, binary_info);\n  console.log(proc_list[0].full_path);\n  return proc_list;\n}\nmain();\n"})}),"\n",(0,i.jsx)(s.p,{children:"To execute the above code"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:'sudo ./artemis -j ../../artemis-core/tests/test_data/deno_scripts/vanilla.js\n[artemis] Starting artemis collection!\n[runtime]: "/usr/libexec/nesessionmanager"\n[artemis] Finished artemis collection!\n'})}),"\n",(0,i.jsx)(s.p,{children:"Collecting data via JavaScript is a bit more complex than other methods. But it\nprovides alot more flexiblity on what you can do with the data."}),"\n",(0,i.jsxs)(s.p,{children:["See the section on ",(0,i.jsx)(s.a,{href:"/artemis-api/docs/Intro/Scripting/deno",children:"Scripting"})," to learn more!"]})]})}function h(e={}){const{wrapper:s}={...(0,t.M)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},2172:(e,s,n)=>{n.d(s,{I:()=>a,M:()=>r});var i=n(1504);const t={},o=i.createContext(t);function r(e){const s=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:s},e.children)}}}]);