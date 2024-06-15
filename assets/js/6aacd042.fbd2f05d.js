"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4840],{8524:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var r=t(7624),i=t(2172);const s={sidebar_position:2},o="Installation",l={id:"Intro/installation",title:"Installation",description:"Currently only Windows, macOS, and Linux binaries from",source:"@site/docs/Intro/installation.md",sourceDirName:"Intro",slug:"/Intro/installation",permalink:"/artemis-api/docs/Intro/installation",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/installation.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1718492978e3,sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"artemisStart",previous:{title:"Introduction",permalink:"/artemis-api/docs/Intro/"},next:{title:"CLI Options",permalink:"/artemis-api/docs/Intro/cli"}},a={},d=[{value:"Supported Systems",id:"supported-systems",level:2},{value:"GitHub Releases",id:"github-releases",level:2},{value:"Build from Source",id:"build-from-source",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(n.p,{children:["Currently only Windows, macOS, and Linux binaries from\n",(0,r.jsx)(n.a,{href:"https://github.com/puffyCid/artemis/releases",children:"GitHub Releases"})," are provided.\nCurrently these binaries are ",(0,r.jsx)(n.strong,{children:"unsigned"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Grab the latest ",(0,r.jsx)(n.strong,{children:"stable"})," release\n",(0,r.jsx)(n.a,{href:"https://github.com/puffyCid/artemis/releases",children:"here"})]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Nightly"})," releases can be downloaded\n",(0,r.jsx)(n.a,{href:"https://github.com/puffyCid/artemis/releases/tag/nightly",children:"here"})]}),"\n",(0,r.jsx)(n.h2,{id:"supported-systems",children:"Supported Systems"}),"\n",(0,r.jsx)(n.p,{children:"Currently artemis has been tested on the following types of systems:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Windows 8.1 and higher. Arch: 64-bit"}),"\n",(0,r.jsx)(n.li,{children:"macOS Catalina and higher. Arch: 64-bit and ARM"}),"\n",(0,r.jsx)(n.li,{children:"Ubuntu, Fedora, Arch Linux. Arch: 64-bit and ARM"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"If you would like support for another OS or architecture please open an issue."}),"\n",(0,r.jsx)(n.h2,{id:"github-releases",children:"GitHub Releases"}),"\n",(0,r.jsx)(n.p,{children:"Once downloaded for you platform from GitHub, extract the binary from the\narchive and you should be able to start collecting forensic data!"}),"\n",(0,r.jsx)(n.h2,{id:"build-from-source",children:"Build from Source"}),"\n",(0,r.jsxs)(n.p,{children:["You may also build artemis from ",(0,r.jsx)(n.a,{href:"https://github.com/puffycid/artemis",children:"source"}),".\nIn order build artemis you will need to install the Rust programming langague.\nIn addition, you will need to install cmake in order to compile the zlib\ndependency"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Instructions to install Rust can be found on the\n",(0,r.jsx)(n.a,{href:"https://www.rust-lang.org/",children:"Rust Homepage"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"Cmake can be install via Homebrew, Chocolatey, or Linux package manager"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Once Rust and cmake are installed you can download the source code for artemis\nusing git:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"git clone https://github.com/puffycid/artemis\n"})}),"\n",(0,r.jsx)(n.p,{children:"Navigate to your downloaded repo and the cli directory and run:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"// from the cli/ directory in the artemis repo\ncargo build\n"})}),"\n",(0,r.jsxs)(n.p,{children:["By default cargo builds a ",(0,r.jsx)(n.code,{children:"debug"})," version of the binary. If you want to build\nthe ",(0,r.jsx)(n.code,{children:"release"})," version (",(0,r.jsx)(n.strong,{children:"recommended"}),") of the binary run:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"cargo build --release\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The release version will be ",(0,r.jsx)(n.strong,{children:"much"})," faster and smaller than the debug version.\nThe compiled binary will be located at:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<path to artemis repo>\\target\\debug\\artemis"})," for the debug version"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<path to artemis repo>\\target\\release\\artemis"})," for the release version"]}),"\n"]}),"\n",(0,r.jsxs)(n.admonition,{type:"info",children:[(0,r.jsx)(n.p,{children:"If you get an error like below:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"error: #[derive(RustEmbed)] folder '/Users/android/Projects/artemis/server/../target/dist/web' does not exist. cwd: '/Users/android/Projects/artemis'\n --\x3e server/src/frontend/webui.rs:7:1\n  |\n7 | / #[folder = \"../target/dist/web\"]\n8 | | struct Frontend;\n  | |________________^\n"})}),(0,r.jsx)(n.p,{children:"It means you are trying to compile the entire artemis project, instead of just\nthe CLI. You will need to navigate to the cli/ directory to just build the\nartemis cli binary"}),(0,r.jsxs)(n.p,{children:["Alternatively, you may also install the command runner\n",(0,r.jsx)(n.a,{href:"https://github.com/casey/just",children:"Just"})," and run:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"just cli\nor for Windows\njust --shell pwsh.exe --shell-arg -c cli\n"})}),(0,r.jsx)(n.p,{children:"to compile the cli"}),(0,r.jsx)(n.p,{children:"Please see the Contributing documentation if you would like to compile the\nentire project including optional experimental components"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.M)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>l,M:()=>o});var r=t(1504);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);