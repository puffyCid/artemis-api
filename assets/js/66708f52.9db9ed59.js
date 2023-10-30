"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3244],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(n),c=r,f=u["".concat(o,".").concat(c)]||u[c]||m[c]||i;return n?a.createElement(f,l(l({ref:t},d),{},{components:n})):a.createElement(f,l({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[u]="string"==typeof e?e:r,l[1]=s;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4096:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:2},l="Getting Started",s={unversionedId:"Contributing/overview",id:"Contributing/overview",title:"Getting Started",description:"The artemis source code is about ~66k lines of Rust code across ~540 files as of",source:"@site/docs/Contributing/overview.md",sourceDirName:"Contributing",slug:"/Contributing/overview",permalink:"/artemis-api/docs/Contributing/overview",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/overview.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"artemisContributing",previous:{title:"Prerequisites",permalink:"/artemis-api/docs/Contributing/building"},next:{title:"Adding a Feature",permalink:"/artemis-api/docs/Contributing/adding"}},o={},p=[{value:"Useful Helper Functions",id:"useful-helper-functions",level:2}],d={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"getting-started"},"Getting Started"),(0,r.kt)("p",null,"The artemis source code is about ~66k lines of Rust code across ~540 files as of\nSeptember 2023 (this includes tests). However its organized in a pretty simple\nstructure."),(0,r.kt)("p",null,"From the root of the artemis repo:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"/artemis-core")," workspace containsthe library component of artemis. The bulk\nof the code is located here"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"/cli")," workspace contains the executable component artemis."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"/server")," workspace contains the experimental server component of artemis. Its\ncurrently experimental")),(0,r.kt)("p",null,"From ",(0,r.kt)("inlineCode",{parentName:"p"},"/artemis-core")," directory:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"/src")," contains the source code of ",(0,r.kt)("inlineCode",{parentName:"li"},"artemis-core"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"/tests")," contains test data and integration tests")),(0,r.kt)("p",null,"From the ",(0,r.kt)("inlineCode",{parentName:"p"},"artemis-core/src/")," directory"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Directory"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"artifacts"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains the code related to parsing forensic artifacts.",(0,r.kt)("br",null)," It is broken down by OS and application artifacts")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"filesystem"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains code to help interact with the filesystem. It contains helper functions that can be used when adding new artifacts/features. ",(0,r.kt)("br",null),"Ex: reading/hashing files, getting file timestamps, listing files, etc")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"output"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains code related to outputing parsed data")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"runtime"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains code related to the embedded Deno runtime")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"structs"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains code related to how TOML collection files are parsed. It ",(0,r.kt)("br",null)," tells artemis how to interpret TOML collections.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"utils"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains code related to help parse artifacts and provide other features to artemis. ",(0,r.kt)("br",null)," Ex: Decompress/compress data, get environment variables,create a Regex expression, extract strings, convert timestamps, etc")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"core.rs"),(0,r.kt)("td",{parentName:"tr",align:null},"Contains the entry point to the ",(0,r.kt)("inlineCode",{parentName:"td"},"artemis_core")," library.")))),(0,r.kt)("h1",{id:"adding-new-artifacts"},"Adding New Artifacts"),(0,r.kt)("p",null,"To keep the codebase organized the follow should be followed when adding a new\nartifact."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Artifacts have their own subfolder. Ex: ",(0,r.kt)("inlineCode",{parentName:"li"},"src/artifacts/os/windows/prefetch")),(0,r.kt)("li",{parentName:"ul"},"The subfolder will probably have the following files at minimum:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"parser.rs")," - Contains the ",(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate)")," accessible functions for the\nartifact"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"error.rs")," - Artifact specific errors")))),(0,r.kt)("h1",{id:"timestamps"},"Timestamps"),(0,r.kt)("p",null,"All timestamps artemis outputs are in UNIXEPOCH seconds. The only exceptions\nare:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"UnifiedLogs")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"EventLogs")," use UNIXEPOCH nanoseconds."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Journals")," use UNIXEPOCH microseconds.")),(0,r.kt)("p",null,"If your new artifact has a timestamp, you will need to make sure the timestamp\nis in UNIXEPOCH seconds. Though exceptions may be allowed if needed, these\nexceptions will only be for the duration (ex: seconds vs nanoseconds)."),(0,r.kt)("p",null,"No other time formats such as Windows FILETIME, FATTIME, Chromium time, etc are\nallowed."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Use the time functions under ",(0,r.kt)("inlineCode",{parentName:"p"},"utils")," to help with timestamp conversions!")),(0,r.kt)("h1",{id:"artifact-scope"},"Artifact Scope"),(0,r.kt)("p",null,"Currently all artifacts that artemis parses are statically coded in the binary\n(they are written in Rust). While this ok, it prevents us from dyanamically\nupating the parser if the artifact format changes (ex: new Windows release)."),(0,r.kt)("p",null,"Currently the ",(0,r.kt)("a",{parentName:"p",href:"/artemis-api/docs/Intro/Scripting/deno"},"JS runtime")," has minimal support for\ncreating parsers. If you are interested in adding a small parser to artemis, it\ncould be worth first trying to code it using the JS runtime."),(0,r.kt)("p",null,"An simple JS parser can be found in the\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/puffyCid/artemis-api/blob/main/src/images/icns.ts"},"artemis API"),"\nrepo."),(0,r.kt)("p",null,"However, if you want to implement a new parser for parsing common Windows\nartifacts such as ",(0,r.kt)("inlineCode",{parentName:"p"},"Jumplists")," then that is definitely something that could be\nworth including as a static parser."),(0,r.kt)("p",null,"When in doubt or unsure open an issue!"),(0,r.kt)("h1",{id:"suggestions"},"Suggestions"),(0,r.kt)("p",null,"If you want add a new artifact but want to see how other artifacts are\nimplemented, some suggested ones to review are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"UserAssist"),": If you want to add a new Registry artifact. The ",(0,r.kt)("inlineCode",{parentName:"p"},"UserAssist"),"\nartifact is less than 300 lines (not counting tests). And includes:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Parsing binary data"),(0,r.kt)("li",{parentName:"ul"},"Converting timestamps"),(0,r.kt)("li",{parentName:"ul"},"Collecting user Registy data"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"FsEvents"),": If you want to to parse a binary file. The ",(0,r.kt)("inlineCode",{parentName:"p"},"FsEvents")," is less than\n300 lines (not counting tests). And includes:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Parsing binary data")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Decompressing data")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Getting data flags"),(0,r.kt)("p",{parentName:"li"},"Fun fact: ",(0,r.kt)("inlineCode",{parentName:"p"},"FsEvents")," is the first artifact created for artemis. Its the\noldest code in the project!"))))),(0,r.kt)("h2",{id:"useful-helper-functions"},"Useful Helper Functions"),(0,r.kt)("p",null,"The artemis codebase contains a handful of artifacts (ex: ",(0,r.kt)("inlineCode",{parentName:"p"},"Registry"),") that\nexpose helper functions that allow other artifacts to reuse parts of that\nartifact to help get artifact specific data."),(0,r.kt)("p",null,"For example the Windows ",(0,r.kt)("inlineCode",{parentName:"p"},"Registry")," artifact exposes a helper function that other\n",(0,r.kt)("inlineCode",{parentName:"p"},"Registry")," based artifacts can leverage to help parse the ",(0,r.kt)("inlineCode",{parentName:"p"},"Registry"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn get_registry_keys(start_path: &str, regex: &Regex, file_path: &str)"),"\nwill read a Registry file at provided ",(0,r.kt)("inlineCode",{parentName:"li"},"file_path")," and filter to based on\n",(0,r.kt)("inlineCode",{parentName:"li"},"start_path")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"regex"),". If ",(0,r.kt)("inlineCode",{parentName:"li"},"start_path")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"regex")," are empty a full\n",(0,r.kt)("inlineCode",{parentName:"li"},"Registry")," listing is returned. All Regex comparisons are done in lowercase.")),(0,r.kt)("p",null,"Some other examples listed below:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"/filesytem")," contains code to help interact with the filesystem."),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn list_files(path: &str)")," returns list of files"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn read_file(path: &str)")," reads a file"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn hash_file(hashes: &Hashes, path: &str)")," hashes a file based\non selected hashes (MD5, SHA1, SHA256)"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"/filesystem/ntfs")," contains code to help iteract with the raw NTFS filesystem.\nIt lets us bypass locked files. This is only available on Windows"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn raw_read_file(path: &str)")," reads a file. Will bypass file\nlocks"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn read_attribute(path: &str, attribute: &str)")," can read an\nAlternative Data Stream (ADS)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn get_user_registry_files(drive: &char)")," returns a Vector that\ncontains references to all user Registry files (NTUSER.DAT and\nUsrClass.dat). It does ",(0,r.kt)("strong",{parentName:"li"},"not")," read the files, it just provides all the data\nneeded to start reading them."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"/src/artifacts/os/macos/plist/property_list.rs")," contains code help parse\n",(0,r.kt)("inlineCode",{parentName:"p"},"plist")," files."),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pub(crate) fn parse_plist_file(path: &str)")," will parse a ",(0,r.kt)("inlineCode",{parentName:"li"},"plist")," file and\nreturn it as a Serde Value")))))}m.isMDXComponent=!0}}]);