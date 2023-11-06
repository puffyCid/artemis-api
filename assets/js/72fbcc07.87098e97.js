"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9499],{3442:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>a});var i=n(5893),r=n(1151);const s={description:"Interact with Linux Artifacts"},l="Linux",c={id:"API/Artifacts/linux",title:"Linux",description:"Interact with Linux Artifacts",source:"@site/docs/API/Artifacts/linux.md",sourceDirName:"API/Artifacts",slug:"/API/Artifacts/linux",permalink:"/artemis-api/docs/API/Artifacts/linux",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/linux.md",tags:[],version:"current",frontMatter:{description:"Interact with Linux Artifacts"},sidebar:"artemisAPI",previous:{title:"Applications",permalink:"/artemis-api/docs/API/Artifacts/applications"},next:{title:"macOS",permalink:"/artemis-api/docs/API/Artifacts/macos"}},d={},a=[{value:"getLogon(path) -&gt; <code>Logon[]</code>",id:"getlogonpath---logon",level:3},{value:"getElf(path) -&gt; <code>ElfInfo | null</code>",id:"getelfpath---elfinfo--null",level:3},{value:"getJournal(path) -&gt; <code>Journal[] | null</code>",id:"getjournalpath---journal--null",level:3}];function o(t){const e={a:"a",code:"code",h1:"h1",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"linux",children:"Linux"}),"\n",(0,i.jsx)(e.p,{children:"These functions can be used to pull data related to Linux artifacts"}),"\n",(0,i.jsxs)(e.h3,{id:"getlogonpath---logon",children:["getLogon(path) -> ",(0,i.jsx)(e.code,{children:"Logon[]"})]}),"\n",(0,i.jsx)(e.p,{children:"Parse a single logon related file. Path end with one of the following:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:"wtmp"}),"\n",(0,i.jsx)(e.li,{children:"btmp"}),"\n",(0,i.jsx)(e.li,{children:"utmp"}),"\n"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsx)(e.tbody,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"path"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"string"})}),(0,i.jsxs)(e.td,{children:["Path to ",(0,i.jsx)(e.code,{children:"wtmp, utmp, or btmp"})," file"]})]})})]}),"\n",(0,i.jsxs)(e.h3,{id:"getelfpath---elfinfo--null",children:["getElf(path) -> ",(0,i.jsx)(e.code,{children:"ElfInfo | null"})]}),"\n",(0,i.jsx)(e.p,{children:"Parse an ELF executable file."}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsx)(e.tbody,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"path"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"string"})}),(0,i.jsx)(e.td,{children:"Path to ELF file"})]})})]}),"\n",(0,i.jsxs)(e.h3,{id:"getjournalpath---journal--null",children:["getJournal(path) -> ",(0,i.jsx)(e.code,{children:"Journal[] | null"})]}),"\n",(0,i.jsxs)(e.p,{children:["Parse a systemd ",(0,i.jsx)(e.a,{href:"/artemis-api/docs/Artifacts/Linux%20Artifacts/journals",children:"Journal"})," file."]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsx)(e.tbody,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"path"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"string"})}),(0,i.jsx)(e.td,{children:"Path to Journal file"})]})})]})]})}function h(t={}){const{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(o,{...t})}):o(t)}},1151:(t,e,n)=>{n.d(e,{Z:()=>c,a:()=>l});var i=n(7294);const r={},s=i.createContext(r);function l(t){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:l(t.components),i.createElement(s.Provider,{value:e},t.children)}}}]);