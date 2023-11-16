"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9499],{3442:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var r=n(5893),i=n(1151);const s={description:"Interact with Linux Artifacts"},l="Linux",c={id:"API/Artifacts/linux",title:"Linux",description:"Interact with Linux Artifacts",source:"@site/docs/API/Artifacts/linux.md",sourceDirName:"API/Artifacts",slug:"/API/Artifacts/linux",permalink:"/artemis-api/docs/API/Artifacts/linux",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/linux.md",tags:[],version:"current",frontMatter:{description:"Interact with Linux Artifacts"},sidebar:"artemisAPI",previous:{title:"Applications",permalink:"/artemis-api/docs/API/Artifacts/applications"},next:{title:"macOS",permalink:"/artemis-api/docs/API/Artifacts/macos"}},o={},d=[{value:"getLogon(path) -&gt; <code>Logon[] | LinuxError</code>",id:"getlogonpath---logon--linuxerror",level:3},{value:"getElf(path) -&gt; <code>ElfInfo | LinuxError</code>",id:"getelfpath---elfinfo--linuxerror",level:3},{value:"getJournal(path) -&gt; <code>Journal[] | LinuxError</code>",id:"getjournalpath---journal--linuxerror",level:3}];function a(t){const e={a:"a",code:"code",h1:"h1",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...t.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"linux",children:"Linux"}),"\n",(0,r.jsx)(e.p,{children:"These functions can be used to pull data related to Linux artifacts"}),"\n",(0,r.jsxs)(e.h3,{id:"getlogonpath---logon--linuxerror",children:["getLogon(path) -> ",(0,r.jsx)(e.code,{children:"Logon[] | LinuxError"})]}),"\n",(0,r.jsx)(e.p,{children:"Parse a single logon related file. Path end with one of the following:"}),"\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"wtmp"}),"\n",(0,r.jsx)(e.li,{children:"btmp"}),"\n",(0,r.jsx)(e.li,{children:"utmp"}),"\n"]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Param"}),(0,r.jsx)(e.th,{children:"Type"}),(0,r.jsx)(e.th,{children:"Description"})]})}),(0,r.jsx)(e.tbody,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"path"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"string"})}),(0,r.jsxs)(e.td,{children:["Path to ",(0,r.jsx)(e.code,{children:"wtmp, utmp, or btmp"})," file"]})]})})]}),"\n",(0,r.jsxs)(e.h3,{id:"getelfpath---elfinfo--linuxerror",children:["getElf(path) -> ",(0,r.jsx)(e.code,{children:"ElfInfo | LinuxError"})]}),"\n",(0,r.jsx)(e.p,{children:"Parse an ELF executable file."}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Param"}),(0,r.jsx)(e.th,{children:"Type"}),(0,r.jsx)(e.th,{children:"Description"})]})}),(0,r.jsx)(e.tbody,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"path"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"string"})}),(0,r.jsx)(e.td,{children:"Path to ELF file"})]})})]}),"\n",(0,r.jsxs)(e.h3,{id:"getjournalpath---journal--linuxerror",children:["getJournal(path) -> ",(0,r.jsx)(e.code,{children:"Journal[] | LinuxError"})]}),"\n",(0,r.jsxs)(e.p,{children:["Parse a systemd ",(0,r.jsx)(e.a,{href:"/artemis-api/docs/Artifacts/Linux%20Artifacts/journals",children:"Journal"})," file."]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Param"}),(0,r.jsx)(e.th,{children:"Type"}),(0,r.jsx)(e.th,{children:"Description"})]})}),(0,r.jsx)(e.tbody,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"path"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"string"})}),(0,r.jsx)(e.td,{children:"Path to Journal file"})]})})]})]})}function h(t={}){const{wrapper:e}={...(0,i.a)(),...t.components};return e?(0,r.jsx)(e,{...t,children:(0,r.jsx)(a,{...t})}):a(t)}},1151:(t,e,n)=>{n.d(e,{Z:()=>c,a:()=>l});var r=n(7294);const i={},s=r.createContext(i);function l(t){const e=r.useContext(s);return r.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:l(t.components),r.createElement(s.Provider,{value:e},t.children)}}}]);