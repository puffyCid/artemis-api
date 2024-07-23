"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[180],{61852:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>d});var r=s(17624),n=s(4552);const a={description:"RPM Package Manager",keywords:["linux","sqlite"]},i="RPM Packages",o={id:"Artifacts/Linux Artifacts/rpm",title:"RPM Packages",description:"RPM Package Manager",source:"@site/docs/Artifacts/Linux Artifacts/rpm.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/rpm",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/rpm",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/rpm.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"RPM Package Manager",keywords:["linux","sqlite"]},sidebar:"artemisArtifacts",previous:{title:"Processes",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/processes"},next:{title:"Shell History",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/shellhistory"}},c={},d=[];function p(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",p:"p",pre:"pre",...(0,n.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"rpm-packages",children:"RPM Packages"}),"\n",(0,r.jsx)(t.p,{children:"RPM packages are the default package format for installing software on Fedora\nand OpenSUSE and Fedora derived systems (ex: CentOS, RedHat). Artemis supports\nquerying the /var/lib/rpm/rpmdb.sqlite database to get installed RPM packages."}),"\n",(0,r.jsxs)(t.admonition,{type:"note",children:[(0,r.jsxs)(t.p,{children:["Artemis only supports parsing the SQLite database for RPM packages.",(0,r.jsx)(t.br,{}),"\n","Modern versions of RPM use SQLite to store package info. However, older versions\nused the Berkley database."]}),(0,r.jsxs)(t.p,{children:["For example, Fedora 33 switched over to the sqlite format (released 2020-10-27)",(0,r.jsx)(t.br,{}),"\n","Therefore versions older than Fedora 33 would not be supported by artemis\nbecause they are still using the Berkley database."]})]}),"\n",(0,r.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,r.jsxs)(t.p,{children:["You have to use the artemis ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\ninstalled RPM packages."]}),"\n",(0,r.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'import {\n  getRpmInfo,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const results = getRpmInfo();\n\n  console.log(results);\n}\n'})}),"\n",(0,r.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(t.p,{children:["An array of ",(0,r.jsx)(t.code,{children:"RpmPackages"})," entries."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"export interface RpmPackages {\n  name: string;\n  version: string;\n  release: string;\n  source: string;\n  size: number;\n  sha1: string;\n  arch: string;\n  install_time: string;\n  vendor: string;\n  package_group: string;\n  summary: string;\n  url: string;\n}\n"})})]})}function l(e={}){const{wrapper:t}={...(0,n.M)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},4552:(e,t,s)=>{s.d(t,{I:()=>o,M:()=>i});var r=s(11504);const n={},a=r.createContext(n);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);