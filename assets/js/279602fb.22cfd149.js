"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1088],{4764:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=t(7624),i=t(2172);const r={description:"Extensible Storage Engine (ESE) database",keywords:["windows","ese","persistence"]},o="Extensible Storage Engine",a={id:"Artifacts/Windows Artfacts/ese",title:"Extensible Storage Engine",description:"Extensible Storage Engine (ESE) database",source:"@site/docs/Artifacts/Windows Artfacts/ese.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/ese",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/ese",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/ese.md",tags:[],version:"current",frontMatter:{description:"Extensible Storage Engine (ESE) database",keywords:["windows","ese","persistence"]},sidebar:"artemisArtifacts",previous:{title:"Chocolatey",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/chocolatey"},next:{title:"Event Logs",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/eventlogs"}},c={},d=[];function l(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"extensible-storage-engine",children:"Extensible Storage Engine"}),"\n",(0,s.jsx)(n.p,{children:"Extensible Storage Engine (ESE) database is an open source database used on\nWindows systems. ESE databases are used by many different kinds of Windows\napplications such as:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Windows Search"}),"\n",(0,s.jsx)(n.li,{children:"BITS (pre-Windows 11)"}),"\n",(0,s.jsx)(n.li,{children:"UAL"}),"\n",(0,s.jsx)(n.li,{children:"Edge (pre-Chromium version)"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Artemis supports parsing both unlocked and locked ESE databases."}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"Larger ESE databases will consume more memory and resources"})}),"\n",(0,s.jsx)(n.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(n.p,{children:["You have to use the artemis ",(0,s.jsx)(n.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse a\nsingle ESE database."]}),"\n",(0,s.jsx)(n.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'import {\n  parseTable,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  const path = "path to ese file";\n  const tables = ["table1", "table2"];\n\n  const results = parseTable(path, tables);\n\n  console.log(results);\n}\n'})}),"\n",(0,s.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(n.p,{children:["A ",(0,s.jsx)(n.code,{children:"Record<string, EseTable[][]>"})," object structure. Where ",(0,s.jsx)(n.code,{children:"string"})," is your table\nname and ",(0,s.jsx)(n.code,{children:"EseTable[][]"})," is an array of rows and columns."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const data: EseTable[][] = [];\n\nfor (const row of data) {\n  for (const column of row) {\n    console.log(column.column_name);\n  }\n}\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'export interface EseTable {\n  column_type: ColumnType;\n  column_name: string;\n  /**Binary data is base64 encoded. All data is decompressed if possible */\n  column_data: string;\n}\n\nexport enum ColumnType {\n  Nil = "Nil",\n  Bit = "Bit",\n  UnsignedByte = "UnsignedByte",\n  Short = "Short",\n  Long = "Long",\n  Currency = "Currency",\n  Float32 = "Float32",\n  Float64 = "Float64",\n  DateTime = "DateTime",\n  Binary = "Binary",\n  /** Can be ASCII or Unicode */\n  Text = "Text",\n  LongBinary = "LongBinary",\n  /**Can be ASCII or Unicode */\n  LongText = "LongText",\n  SuperLong = "SuperLong",\n  UnsignedLong = "UnsignedLong",\n  LongLong = "LongLong",\n  Guid = "Guid",\n  UnsingedShort = "UnsingedShort",\n  Unknown = "Unknown",\n}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,i.M)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>a,M:()=>o});var s=t(1504);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);