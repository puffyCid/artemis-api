"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8316],{10913:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"Contributing/api","title":"API Contributions","description":"Contributing to the artemis-api is slightly different than contributing directly","source":"@site/docs/Contributing/api.md","sourceDirName":"Contributing","slug":"/Contributing/api","permalink":"/artemis-api/docs/Contributing/api","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/api.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"artemisContributing","previous":{"title":"Learning","permalink":"/artemis-api/docs/Contributing/learning"}}');var s=n(74848),r=n(28453);const o={sidebar_position:6},a="API Contributions",l={},c=[{value:"Testing Scripts on GitHub Actions",id:"testing-scripts-on-github-actions",level:2},{value:"Testing Scripts on GitHub Actions Locally",id:"testing-scripts-on-github-actions-locally",level:3}];function d(e){const t={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"api-contributions",children:"API Contributions"})}),"\n",(0,s.jsx)(t.p,{children:"Contributing to the artemis-api is slightly different than contributing directly\nto artemis. The biggest difference is the API is coded in TypeScript instead of\nRust."}),"\n",(0,s.jsx)(t.p,{children:"This can make contributions significantly easier if interested in contributing\nto artemis."}),"\n",(0,s.jsxs)(t.p,{children:["The Prerequisites for adding API features are the same as creating artemis\nscripts as mentioned in ",(0,s.jsx)(t.a,{href:"/artemis-api/docs/Intro/Scripting/boa",children:"scripting"}),". You will need:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"A text editor that supports TypeScript"}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"adding-a-feature",children:"Adding a Feature"}),"\n",(0,s.jsx)(t.p,{children:"Please try to create an issue before working on a feature. Basic overview of\nadding a new feature:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:"Create an issue. If you want to work on it, make sure to explicitly\nvolunteer!"}),"\n",(0,s.jsx)(t.li,{children:"Create a branch on your clone artemis repo"}),"\n",(0,s.jsx)(t.li,{children:"Work on feature"}),"\n",(0,s.jsx)(t.li,{children:"If you are adding a new artifact make sure you have updated the artemis docs"}),"\n",(0,s.jsx)(t.li,{children:"Open a pull request!"}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Please checkout available ",(0,s.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"API"})," functions that can be used\nto make scripting easier."]}),"\n",(0,s.jsx)(t.h1,{id:"artifact-scope",children:"Artifact Scope"}),"\n",(0,s.jsx)(t.p,{children:"Unlike artemis, the API does not have strict limits on what can be included. You\nmay include non-forensic related artifacts or features such as:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"WiFi information"}),"\n",(0,s.jsx)(t.li,{children:"Installed applications"}),"\n",(0,s.jsx)(t.li,{children:"Generic system information"}),"\n",(0,s.jsx)(t.li,{children:"Shelling out to other tools or applications (ex: You may execute PowerShell\ncommands from the API if you want to)"}),"\n",(0,s.jsx)(t.li,{children:"Submit data to network services (ex: Submit hashes to VirusTotal API)"}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"testing-scripts-locally",children:"Testing Scripts Locally"}),"\n",(0,s.jsx)(t.p,{children:"Currently there is no easy way to write tests for the artemis API. If you are\nworking on a new feature the current recommended approach to testing your\nfeature is:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["Write you feature and export it to mod.ts file located at the root of the\n",(0,s.jsx)(t.code,{children:"artemis-api"})," repo."]}),"\n",(0,s.jsxs)(t.li,{children:["Create a project in a separate directory outside of ",(0,s.jsx)(t.code,{children:"artemis-api"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["Follow the ",(0,s.jsx)(t.a,{href:"/artemis-api/docs/Intro/Scripting/walkthrough",children:"walkthrough"})," guide."]}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'import { processListing } from "../../path/to/local/artemis-api/mod";\n\nfunction main() {\n  const md5 = false;\n  const sha1 = false;\n  const sha256 = false;\n  const binary_info = true;\n\n  const proc_list = processListing(md5, sha1, sha256, binary_info);\n}\n'})}),"\n",(0,s.jsxs)(t.ol,{start:"4",children:["\n",(0,s.jsx)(t.li,{children:"Test you feature with your project"}),"\n",(0,s.jsx)(t.li,{children:"If everything works, open a pull request!"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"testing-scripts-on-github-actions",children:"Testing Scripts on GitHub Actions"}),"\n",(0,s.jsxs)(t.p,{children:["Even though writing tests for the artemis API locally can be tricky. There is\nprocess to create tests to run on GitHub Actions.",(0,s.jsx)(t.br,{}),"\n","When you open a PR it will trigger the Artemis API test suite. Ideally ",(0,s.jsx)(t.strong,{children:"if\npossible"})," you should include a test for you feature."]}),"\n",(0,s.jsx)(t.p,{children:"Artemis API tests are located at the tests directory and are broken down by OS.\nAll you need to do is create a new folder and add a main.ts and build.ts file\nand write your test."}),"\n",(0,s.jsxs)(t.p,{children:["A ",(0,s.jsx)(t.strong,{children:"very basic"})," example is below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'import { firewallStatus } from "../../../mod";\nimport { MacosError } from "../../../src/macos/errors";\n\nfunction main() {\n  const results = firewallStatus();\n  if (results instanceof MacosError) {\n    throw results;\n  }\n\n  if (results.version.length === 0) {\n    throw "no version?";\n  }\n}\n\nmain();\n'})}),"\n",(0,s.jsx)(t.p,{children:"The example above will test the macOS Firewall artifact and make sure it does\nnot return an error and that the version info is not empty."}),"\n",(0,s.jsx)(t.p,{children:"You may make you test as complex or thorough as you would like. But it should at\nleast always check for errors."}),"\n",(0,s.jsx)(t.h3,{id:"testing-scripts-on-github-actions-locally",children:"Testing Scripts on GitHub Actions Locally"}),"\n",(0,s.jsx)(t.p,{children:"If you want to run the test scripts locally you will need one of the options\nbelow:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Download\n",(0,s.jsx)(t.a,{href:"https://github.com/puffyCid/artemis/releases/tag/v0.1.0",children:"script_tester"})]}),"\n",(0,s.jsxs)(t.li,{children:["Compile the\n",(0,s.jsx)(t.a,{href:"https://github.com/puffyCid/artemis/tree/main/core/examples",children:"script_tester"}),"\nvia ",(0,s.jsx)(t.code,{children:"cargo build --release --examples"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Place the script tester binary in the folder you want to test."})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var i=n(96540);const s={},r=i.createContext(s);function o(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);