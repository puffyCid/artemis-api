"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1717],{97471:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var n=t(74848),i=t(28453);const r={sidebar_position:2},a="Getting Started",c={id:"Contributing/overview",title:"Getting Started",description:"The artemis source code is about ~78k lines of Rust code across ~645 files as of",source:"@site/docs/Contributing/overview.md",sourceDirName:"Contributing",slug:"/Contributing/overview",permalink:"/artemis-api/docs/Contributing/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/overview.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"artemisContributing",previous:{title:"Prerequisites",permalink:"/artemis-api/docs/Contributing/building"},next:{title:"Adding a Feature",permalink:"/artemis-api/docs/Contributing/adding"}},d={},l=[{value:"Useful Helper Functions",id:"useful-helper-functions",level:2}];function o(e){const s={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,n.jsx)(s.p,{children:"The artemis source code is about ~78k lines of Rust code across ~645 files as of\nMarch 2024 (this includes tests). However its organized in a pretty simple\nstructure."}),"\n",(0,n.jsx)(s.admonition,{type:"tip",children:(0,n.jsxs)(s.p,{children:["Use the just command ",(0,n.jsx)(s.code,{children:"just complex"})," to measure lines of Rust and complexity!",(0,n.jsx)(s.br,{}),"\n","(requires ",(0,n.jsx)(s.a,{href:"https://github.com/boyter/scc",children:"scc"}),")"]})}),"\n",(0,n.jsx)(s.p,{children:"From the root of the artemis repo:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"core/"})," workspace contains the library component of artemis. The bulk of the\ncode is located here"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"cli/"})," workspace contains the executable component artemis."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"server/"})," workspace contains the experimental server component of artemis. Its\ncurrently experimental"]}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["From the ",(0,n.jsx)(s.code,{children:"core/src/"})," directory"]}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"Directory"}),(0,n.jsx)(s.th,{children:"Description"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"artifacts"}),(0,n.jsxs)(s.td,{children:["Contains the code related to parsing forensic artifacts.",(0,n.jsx)("br",{})," It is broken down by OS and application artifacts"]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"filesystem"}),(0,n.jsxs)(s.td,{children:["Contains code to help interact with the filesystem. It contains helper functions that can be used when adding new artifacts/features. ",(0,n.jsx)("br",{}),"Ex: reading/hashing files, getting file timestamps, listing files, etc"]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"output"}),(0,n.jsx)(s.td,{children:"Contains code related to outputting parsed data"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"runtime"}),(0,n.jsx)(s.td,{children:"Contains code related to the embedded Deno runtime"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"structs"}),(0,n.jsxs)(s.td,{children:["Contains code related to how TOML collection files are parsed. It ",(0,n.jsx)("br",{})," tells artemis how to interpret TOML collections."]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"utils"}),(0,n.jsxs)(s.td,{children:["Contains code related to help parse artifacts and provide other features to artemis. ",(0,n.jsx)("br",{})," Ex: Decompress/compress data, get environment variables,create a Regex expression, extract strings, convert timestamps, etc"]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"core.rs"}),(0,n.jsxs)(s.td,{children:["Contains the entry point to the ",(0,n.jsx)(s.code,{children:"core"})," library."]})]})]})]}),"\n",(0,n.jsxs)(s.p,{children:["A basic graph of the code structure can be found\n",(0,n.jsx)(s.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:t(48267).A+"",children:"here"})]}),"\n",(0,n.jsx)(s.h1,{id:"adding-new-artifacts",children:"Adding New Artifacts"}),"\n",(0,n.jsx)(s.p,{children:"To keep the codebase organized the follow should be followed when adding a new\nartifact."}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Artifacts have their own subfolder. Ex: ",(0,n.jsx)(s.code,{children:"src/artifacts/os/windows/prefetch"})]}),"\n",(0,n.jsxs)(s.li,{children:["The subfolder will probably have the following files at minimum:","\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["parser.rs - Contains ",(0,n.jsx)(s.code,{children:"pub(crate)"})," accessible functions for the artifact"]}),"\n",(0,n.jsx)(s.li,{children:"error.rs - Artifact specific errors"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h1,{id:"timestamps",children:"Timestamps"}),"\n",(0,n.jsxs)(s.p,{children:["All timestamps artemis outputs are in ISO RFC 3339 format\n(YYYY-MM-DDTHH:mm",":ss",".SSSZ). The timestamp from should be from UNIXEPOCH time."]}),"\n",(0,n.jsxs)(s.p,{children:["If your new artifact has a timestamp, you will need to make sure the timestamp\nis in YYYY-MM-DDTHH:mm",":ss",".SSSZ format. Though exceptions may be allowed if\nneeded, these exceptions will only be for the duration (ex: seconds vs\nnanoseconds)."]}),"\n",(0,n.jsx)(s.p,{children:"No other time formats such as Windows FILETIME, FATTIME, Chromium time, etc are\nallowed."}),"\n",(0,n.jsx)(s.admonition,{type:"tip",children:(0,n.jsxs)(s.p,{children:["Use the time functions under ",(0,n.jsx)(s.code,{children:"utils"})," to help with timestamp conversions!"]})}),"\n",(0,n.jsx)(s.h1,{id:"artifact-scope",children:"Artifact Scope"}),"\n",(0,n.jsx)(s.p,{children:"Currently all artifacts that artemis parses are statically coded in the binary\n(they are written in Rust). While this ok, it prevents us from dynamically\nupdating the parser if the artifact format changes (ex: new Windows release)."}),"\n",(0,n.jsxs)(s.p,{children:["Currently the ",(0,n.jsx)(s.a,{href:"/artemis-api/docs/Intro/Scripting/deno",children:"JS runtime"})," has minimal support for\ncreating parsers. If you are interested in adding a small parser to artemis, it\ncould be worth first trying to code it using the JS runtime."]}),"\n",(0,n.jsxs)(s.p,{children:["An simple JS parser can be found in the\n",(0,n.jsx)(s.a,{href:"https://github.com/puffyCid/artemis-api/blob/main/src/images/icns.ts",children:"artemis API"}),"\nrepo."]}),"\n",(0,n.jsxs)(s.p,{children:["However, if you want to implement a new parser for parsing common Windows\nartifacts such as ",(0,n.jsx)(s.code,{children:"Jumplists"})," then that is definitely something that could be\nworth including as a static parser."]}),"\n",(0,n.jsx)(s.p,{children:"When in doubt or unsure open an issue!"}),"\n",(0,n.jsx)(s.h1,{id:"suggestions",children:"Suggestions"}),"\n",(0,n.jsx)(s.p,{children:"If you want add a new artifact but want to see how other artifacts are\nimplemented, some suggested ones to review are:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"UserAssist"}),": If you want to add a new Registry artifact. The ",(0,n.jsx)(s.code,{children:"UserAssist"}),"\nartifact is less than 300 lines (not counting tests). And includes:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Parsing binary data"}),"\n",(0,n.jsx)(s.li,{children:"Converting timestamps"}),"\n",(0,n.jsx)(s.li,{children:"Collecting user Registry data"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"FsEvents"}),": If you want to to parse a binary file. The ",(0,n.jsx)(s.code,{children:"FsEvents"})," is less than\n300 lines (not counting tests). And includes:"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Parsing binary data"}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Decompressing data"}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsx)(s.p,{children:"Getting data flags"}),"\n",(0,n.jsxs)(s.p,{children:["Fun fact: ",(0,n.jsx)(s.code,{children:"FsEvents"})," is the first artifact created for artemis. Its the\noldest code in the project!"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"useful-helper-functions",children:"Useful Helper Functions"}),"\n",(0,n.jsxs)(s.p,{children:["The artemis codebase contains a handful of artifacts (ex: ",(0,n.jsx)(s.code,{children:"Registry"}),") that\nexpose helper functions that allow other artifacts to reuse parts of that\nartifact to help get artifact specific data."]}),"\n",(0,n.jsxs)(s.p,{children:["For example the Windows ",(0,n.jsx)(s.code,{children:"Registry"})," artifact exposes a helper function that other\n",(0,n.jsx)(s.code,{children:"Registry"})," based artifacts can leverage to help parse the ",(0,n.jsx)(s.code,{children:"Registry"}),":"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn get_registry_keys(start_path: &str, regex: &Regex, file_path: &str)"}),"\nwill read a Registry file at provided file_path and filter to based on\nstart_path and regex. If start_path and regex are empty a full ",(0,n.jsx)(s.code,{children:"Registry"}),"\nlisting is returned. All Regex comparisons are done in lowercase."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"Some other examples listed below:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"/filesystem"})," contains code to help interact with the filesystem."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn list_files(path: &str)"})," returns list of files"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn read_file(path: &str)"})," reads a file"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn hash_file(hashes: &Hashes, path: &str)"})," hashes a file based\non selected hashes (MD5, SHA1, SHA256)"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"/filesystem/ntfs"})," contains code to help interact with the raw NTFS\nfilesystem. It lets us bypass locked files. This is only available on Windows"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn raw_read_file(path: &str)"})," reads a file. Will bypass file\nlocks"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn read_attribute(path: &str, attribute: &str)"})," can read an\nAlternative Data Stream (ADS)"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn get_user_registry_files(drive: &char)"})," returns a Vector that\ncontains references to all user Registry files (NTUSER.DAT and\nUsrClass.dat). It does ",(0,n.jsx)(s.strong,{children:"not"})," read the files, it just provides all the data\nneeded to start reading them."]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"/src/artifacts/os/macos/plist/property_list.rs"})," contains code help parse\nplist files."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"pub(crate) fn parse_plist_file(path: &str)"})," will parse a plist file and\nreturn it as a Serde Value"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},48267:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/files/core-4ee5f94e6ecc4229597e0adb3bca6297.svg"},28453:(e,s,t)=>{t.d(s,{R:()=>a,x:()=>c});var n=t(96540);const i={},r=n.createContext(i);function a(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);