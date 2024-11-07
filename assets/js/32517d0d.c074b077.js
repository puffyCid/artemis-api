"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5751],{27872:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>a,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var n=s(74848),i=s(28453);const r={sidebar_position:1},d="Prerequisites",l={id:"Contributing/building",title:"Prerequisites",description:"Automated Setup",source:"@site/docs/Contributing/building.md",sourceDirName:"Contributing",slug:"/Contributing/building",permalink:"/artemis-api/docs/Contributing/building",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/building.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"artemisContributing",next:{title:"Getting Started",permalink:"/artemis-api/docs/Contributing/overview"}},c={},o=[{value:"Automated Setup",id:"automated-setup",level:2},{value:"Server Interaction",id:"server-interaction",level:3}];function h(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"prerequisites",children:"Prerequisites"})}),"\n",(0,n.jsx)(t.h2,{id:"automated-setup",children:"Automated Setup"}),"\n",(0,n.jsx)(t.p,{children:"If you would like to build and develop Artemis yourself you will need a few\nrequired applications:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["Artemis is written in Rust. So you will need to download and install the\n",(0,n.jsx)(t.a,{href:"https://www.rust-lang.org/",children:"Rust"})," programming language"]}),"\n",(0,n.jsx)(t.li,{children:"Git"}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://rust-analyzer.github.io/",children:"Rust analyzer"})}),"\n",(0,n.jsxs)(t.li,{children:["An IDE or text editor. ",(0,n.jsx)(t.a,{href:"https://code.visualstudio.com/",children:"VSCode"})," or\n",(0,n.jsx)(t.a,{href:"https://vscodium.com/",children:"VSCodium"})," are great choices."]}),"\n",(0,n.jsxs)(t.li,{children:["The command runner ",(0,n.jsx)(t.a,{href:"https://github.com/casey/just",children:"Just"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Windows users will need to install\n",(0,n.jsx)(t.a,{href:"https://community.chocolatey.org/",children:"Chocolatey"}),". In addition, you will need to\ninstall the MSVC version of ",(0,n.jsx)(t.a,{href:"https://www.rust-lang.org/",children:"Rust"})," macOS users will\nneed to install ",(0,n.jsx)(t.a,{href:"https://brew.sh/",children:"Homebrew"})]}),"\n",(0,n.jsx)(t.p,{children:"You can use Just to automate most of the setup process."}),"\n",(0,n.jsxs)(t.admonition,{type:"info",children:[(0,n.jsxs)(t.p,{children:["Ubuntu users can run: ",(0,n.jsx)(t.code,{children:"just setup-ubuntu"}),(0,n.jsx)(t.br,{}),"\n","Fedora users can run ",(0,n.jsx)(t.code,{children:"just setup-fedora"}),(0,n.jsx)(t.br,{}),"\n","Windows users can run ",(0,n.jsx)(t.code,{children:"just setup-windows"})," (after you have installed Chocolatey\nand Rust)",(0,n.jsx)(t.br,{}),"\n","macOS users can run ",(0,n.jsx)(t.code,{children:"just setup-macos"})," (after you have installed Homebrew)"]}),(0,n.jsxs)(t.p,{children:["Windows users will need to add extra arguments to the just command:",(0,n.jsx)(t.br,{}),"\n",(0,n.jsx)(t.code,{children:"just --shell pwsh.exe --shell-arg -c"})]}),(0,n.jsxs)(t.p,{children:["On Windows if you get an error like:",(0,n.jsx)(t.br,{}),"\n",(0,n.jsx)(t.code,{children:"error: Recipe _wasm could not be run because just could not find the shell: program not found"})]}),(0,n.jsxs)(t.p,{children:["it means you forgot provide: ",(0,n.jsx)(t.code,{children:"just --shell pwsh.exe  --shell-arg -c"})]})]}),"\n",(0,n.jsx)(t.p,{children:"If you would like to install the build dependencies manaully, review the Just\nfiles .setup folder in the artemis repo for your platform."}),"\n",(0,n.jsx)(t.p,{children:"Artemis has been developed on:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"macOS 12 (Monterey) and higher"}),"\n",(0,n.jsx)(t.li,{children:"Windows 10 and higher"}),"\n",(0,n.jsx)(t.li,{children:"Linux distros such as Ubuntu, Debian, and Fedora"}),"\n"]}),"\n",(0,n.jsx)(t.h1,{id:"building",children:"Building"}),"\n",(0,n.jsx)(t.p,{children:"Once you have the prerequisites installed you can build artemis."}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["Clone artemis repo at\n",(0,n.jsx)(t.a,{href:"https://github.com/puffycid/artemis",children:"https://github.com/puffycid/artemis"})]}),"\n",(0,n.jsx)(t.li,{children:"Navigate to the repo"}),"\n",(0,n.jsxs)(t.li,{children:["Run ",(0,n.jsx)(t.code,{children:"just cli"})," or ",(0,n.jsx)(t.code,{children:"just --shell pwsh.exe  --shell-arg -c cli"})," for Windows"]}),"\n"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sh",children:"# Download artemis source code\ngit clone https://github.com/puffycid/artemis\ncd artemis\n\n# Build just the CLI executable\njust cli\n\n# Build just the library\njust core\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Full list of just commands (via ",(0,n.jsx)(t.code,{children:"just --list"}),")"]}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Command"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"build"}),(0,n.jsx)(t.td,{children:"Build the entire artemis project"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"cli"}),(0,n.jsx)(t.td,{children:"Build the artemis executable"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"complex"}),(0,n.jsx)(t.td,{children:"Run the scc tool against the artemis source code"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"core"}),(0,n.jsx)(t.td,{children:"Build the artemis library"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"default"}),(0,n.jsx)(t.td,{children:"Run clippy"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"ese"}),(0,n.jsx)(t.td,{children:"Run all the ESE parsing tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"filesystem"}),(0,n.jsx)(t.td,{children:"Run all the filesystem tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"linux"}),(0,n.jsx)(t.td,{children:"Run all the Linux tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"macos"}),(0,n.jsx)(t.td,{children:"Run all the macOS tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"nextest"}),(0,n.jsx)(t.td,{children:"Run all tests using nextest"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"runtime"}),(0,n.jsx)(t.td,{children:"Run all the JS runtime tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"server"}),(0,n.jsx)(t.td,{children:"Build the artemis server and start it"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"client"}),(0,n.jsx)(t.td,{children:"Build the artemis client and attempt to connect to artemis server"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"shellitems"}),(0,n.jsx)(t.td,{children:"Run all the ShellItem parsing tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"test"}),(0,n.jsx)(t.td,{children:"Run all artemis tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"unix"}),(0,n.jsx)(t.td,{children:"Run all Unix tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"windows"}),(0,n.jsx)(t.td,{children:"Run all Windows tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"wmi"}),(0,n.jsx)(t.td,{children:"Run all WMI parsing tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"outlook"}),(0,n.jsx)(t.td,{children:"Run all the Outlook parsing tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"spotlight"}),(0,n.jsx)(t.td,{children:"Run all the Spotlight parsing tests"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"setup-ubuntu"}),(0,n.jsx)(t.td,{children:"Install all artemis development dependencies on Ubuntu"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"setup-fedora"}),(0,n.jsx)(t.td,{children:"Install all artemis development dependencies on Fedora"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"setup-windows"}),(0,n.jsx)(t.td,{children:"Install all artemis development dependencies on Windows"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"setup-macos"}),(0,n.jsx)(t.td,{children:"Install all artemis development dependencies on macOS"})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"server-interaction",children:"Server Interaction"}),"\n",(0,n.jsx)(t.p,{children:"Download and import the Insomnia config from the repository to interact with the\nserver. The server is experimental and not bundled in the GitHub binaries"})]})}function a(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>d,x:()=>l});var n=s(96540);const i={},r=n.createContext(i);function d(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);