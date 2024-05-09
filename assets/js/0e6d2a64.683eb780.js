"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3552],{7084:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var r=n(7624),a=n(2172);const s={description:"Homebrew package manager",keywords:["macOS","plaintext"]},i="Homebrew",o={id:"Artifacts/macOS Artifacts/homebrew",title:"Homebrew",description:"Homebrew package manager",source:"@site/docs/Artifacts/macOS Artifacts/homebrew.md",sourceDirName:"Artifacts/macOS Artifacts",slug:"/Artifacts/macOS Artifacts/homebrew",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/homebrew",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/homebrew.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"Homebrew package manager",keywords:["macOS","plaintext"]},sidebar:"artemisArtifacts",previous:{title:"Groups",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/groups"},next:{title:"Launchd",permalink:"/artemis-api/docs/Artifacts/macOS Artifacts/launchd"}},c={},l=[];function m(e){const t={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"homebrew",children:"Homebrew"}),"\n",(0,r.jsx)(t.p,{children:"Homebrew is a popular package manager for macOS systems. Artemis supports\ngetting a list of installed Homebrew packages and Casks from the default\nHomebrew paths."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"/usr/local/Cellar"}),"\n",(0,r.jsx)(t.li,{children:"/opt/homebrew/Cellar"}),"\n",(0,r.jsx)(t.li,{children:"/usr/local/Caskroom/"}),"\n",(0,r.jsx)(t.li,{children:"/opt/homebrew/Caskroom"}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"You may also provide an optional alternative path to Homebrew directory.,"}),"\n",(0,r.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,r.jsxs)(t.p,{children:["You have to use the artemis ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to get\ninstalled Homebrew applications."]}),"\n",(0,r.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'import {\n  getCasks,\n  getHomebrewInfo,\n  getPackages,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  // Get all packages and Casks\n  const all_data = getHomebrewInfo();\n  // Get only packages\n  const packages = getPackages();\n  // Get only Casks\n  const casks = getCasks();\n\n  console.log(all_data);\n}\n'})}),"\n",(0,r.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(t.p,{children:["A ",(0,r.jsx)(t.code,{children:"HomebrewData"})," object structure"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"export interface HomebrewReceipt extends HomebrewFormula {\n  installedAsDependency: boolean;\n  installedOnRequest: boolean;\n  installTime: number;\n  sourceModified: number;\n  name: string;\n}\n\nexport interface HomebrewFormula {\n  description: string;\n  homepage: string;\n  url: string;\n  license: string;\n  caskName: string;\n  formulaPath: string;\n  version: string;\n}\n\nexport interface HomebrewData {\n  packages: HomebrewReceipt[];\n  casks: HomebrewFormula[];\n}\n"})})]})}function p(e={}){const{wrapper:t}={...(0,a.M)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},2172:(e,t,n)=>{n.d(t,{I:()=>o,M:()=>i});var r=n(1504);const a={},s=r.createContext(a);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);