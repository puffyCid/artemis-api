"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1856],{3308:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var t=i(7624),r=i(2172);const s={sidebar_position:6},o="API Contributions",a={id:"Contributing/api",title:"API Contributions",description:"Contributing to the artemis-api is slightly different than contributing directly",source:"@site/docs/Contributing/api.md",sourceDirName:"Contributing",slug:"/Contributing/api",permalink:"/artemis-api/docs/Contributing/api",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/api.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"artemisContributing",previous:{title:"Learning",permalink:"/artemis-api/docs/Contributing/learning"}},c={},l=[];function d(e){const n={a:"a",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"api-contributions",children:"API Contributions"}),"\n",(0,t.jsx)(n.p,{children:"Contributing to the artemis-api is slightly different than contributing directly\nto artemis. The biggest difference is the API is coded in TypeScript instead of\nRust."}),"\n",(0,t.jsx)(n.p,{children:"This can make contributions significantly easier if interested in contributing\nto artemis."}),"\n",(0,t.jsxs)(n.p,{children:["The Prerequisites for adding API features are the same as creating artemis\nscripts as mentioned in ",(0,t.jsx)(n.a,{href:"/artemis-api/docs/Intro/Scripting/deno",children:"scripting"}),". You will need:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Deno installed"}),"\n",(0,t.jsx)(n.li,{children:"VSCode or VSCodium"}),"\n",(0,t.jsx)(n.li,{children:"The Deno extension"}),"\n"]}),"\n",(0,t.jsx)(n.h1,{id:"adding-a-feature",children:"Adding a Feature"}),"\n",(0,t.jsx)(n.p,{children:"Please try to creae an issue before working on a feature. Basic overview of\nadding a new feature:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Create an issue. If you want to work on it, make sure to explictly volunteer!"}),"\n",(0,t.jsx)(n.li,{children:"Create a branch on your clone artemis repo"}),"\n",(0,t.jsx)(n.li,{children:"Work on feature"}),"\n",(0,t.jsx)(n.li,{children:"If you are adding a new artifact make sure you have updated the artemis docs"}),"\n",(0,t.jsx)(n.li,{children:"Open a pull request!"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Please checkout available ",(0,t.jsx)(n.a,{href:"/artemis-api/docs/API/overview",children:"API"})," functions that can be used\nto make scripting easier."]}),"\n",(0,t.jsx)(n.h1,{id:"artifact-scope",children:"Artifact Scope"}),"\n",(0,t.jsx)(n.p,{children:"Unlike artemis, the API does not have strict limits on what can be included. You\nmay include non-forensic related artifacts or features such as:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"WiFi information"}),"\n",(0,t.jsx)(n.li,{children:"Installed applications"}),"\n",(0,t.jsx)(n.li,{children:"Generic system information"}),"\n",(0,t.jsx)(n.li,{children:"Shelling out to other tools or applications (ex: You may execute PowerShell\ncommands from the API if you want to)"}),"\n",(0,t.jsx)(n.li,{children:"Submit data to network services (ex: Submit hashes to VirusTotal API)"}),"\n"]}),"\n",(0,t.jsx)(n.h1,{id:"testing-scripts",children:"Testing Scripts"}),"\n",(0,t.jsx)(n.p,{children:"Currently there is no easy way to write tests for the artemis API. If you are\nworking on a new feature the current recommended approach to testing your\nfeature is:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Write you feature and export it to mod.ts file located at the root of the\n",(0,t.jsx)(n.code,{children:"artemis-api"})," repo."]}),"\n",(0,t.jsxs)(n.li,{children:["Create a deno project in a separate directory outsdie of ",(0,t.jsx)(n.code,{children:"artemis-api"})," using\n",(0,t.jsx)(n.code,{children:"deno init <feature>"})]}),"\n",(0,t.jsxs)(n.li,{children:["Follow the ",(0,t.jsx)(n.a,{href:"/artemis-api/docs/Intro/Scripting/walkthrough",children:"walkthrough"})," guide, except\ninstead of importing functions from GitHub import functions from your local\nclone repo."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'import { processListing } from "../../path/to/local/artemis-api/mod.ts";\n\nfunction main() {\n  const md5 = false;\n  const sha1 = false;\n  const sha256 = false;\n  const binary_info = true;\n\n  const proc_list = processListing(md5, sha1, sha256, binary_info);\n}\n'})}),"\n",(0,t.jsxs)(n.ol,{start:"4",children:["\n",(0,t.jsx)(n.li,{children:"Test you feature with your deno project"}),"\n",(0,t.jsx)(n.li,{children:"If everything works, open a pull request!"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,r.M)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},2172:(e,n,i)=>{i.d(n,{I:()=>a,M:()=>o});var t=i(1504);const r={},s=t.createContext(r);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);