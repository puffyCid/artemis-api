"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2721],{1458:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"Artifacts/Application Artifacts/vscode","title":"VSCode","description":"Open source text editor","source":"@site/docs/Artifacts/Application Artifacts/vscode.md","sourceDirName":"Artifacts/Application Artifacts","slug":"/Artifacts/Application Artifacts/vscode","permalink":"/artemis-api/docs/Artifacts/Application Artifacts/vscode","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Application Artifacts/vscode.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Open source text editor","keywords":["text editor","microsoft"]},"sidebar":"artemisArtifacts","previous":{"title":"SQLite","permalink":"/artemis-api/docs/Artifacts/Application Artifacts/sqlite"},"next":{"title":"Linux Artifacts","permalink":"/artemis-api/docs/category/linux-artifacts"}}');var s=n(4848),r=n(8453);const o={description:"Open source text editor",keywords:["text editor","microsoft"]},a="VSCode",c={},d=[];function p(t){const e={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,r.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"vscode",children:"VSCode"})}),"\n",(0,s.jsx)(e.p,{children:"VSCode is a popular open source text editor created by Microsoft. Artemis\nsupports parsing installed extensions and getting file history from the\napplication. Artemis also supports parsing the VSCodium application."}),"\n",(0,s.jsx)(e.h1,{id:"collection",children:"Collection"}),"\n",(0,s.jsxs)(e.p,{children:["You have to use the artemis ",(0,s.jsx)(e.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to collect\nVSCode information."]}),"\n",(0,s.jsx)(e.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:'import {\n  fileHistory,\n  getExtensions,\n  PlatformType,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nfunction main() {\n  const results = fileHistory(PlatformType.Darwin);\n  const data = getExtensions(PlatformType.Darwin);\n\n  console.log(results);\n}\n'})}),"\n",(0,s.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,s.jsxs)(e.p,{children:["An array of ",(0,s.jsx)(e.code,{children:"FileHistory"})," for file history and ",(0,s.jsx)(e.code,{children:"Extensions"})," for installed\nextensions."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"/**History of files in VSCode */\nexport interface FileHistory {\n  /**Version of History format */\n  version: number;\n  /**To source file */\n  path: string;\n  /**History of source file */\n  entries: Entries[];\n  /**Path to history source */\n  history_path: string;\n}\n\n/**\n * Metadata related to file history entry\n */\ninterface Entries {\n  /**Name of history file */\n  id: string;\n  /**Time when file was saved */\n  timestamp: string;\n  /**Based64 encoded file content */\n  content: string;\n}\n\nexport interface Extensions {\n  path: string;\n  data: Record<string, unknown>[];\n}\n"})})]})}function l(t={}){const{wrapper:e}={...(0,r.R)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(p,{...t})}):p(t)}},8453:(t,e,n)=>{n.d(e,{R:()=>o,x:()=>a});var i=n(6540);const s={},r=i.createContext(s);function o(t){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:o(t.components),i.createElement(r.Provider,{value:e},t.children)}}}]);