"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2305],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),p=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(l.Provider,{value:t},e.children)},f="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),f=p(n),m=a,u=f["".concat(l,".").concat(m)]||f[m]||d[m]||r;return n?i.createElement(u,s(s({ref:t},c),{},{components:n})):i.createElement(u,s({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[f]="string"==typeof e?e:a,s[1]=o;for(var p=2;p<r;p++)s[p]=n[p];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8467:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var i=n(7462),a=(n(7294),n(3905));const r={description:"Windows file metadata",keywords:["windows","file meta"]},s="Files",o={unversionedId:"Artifacts/Windows Artfacts/files",id:"Artifacts/Windows Artfacts/files",title:"Files",description:"Windows file metadata",source:"@site/docs/Artifacts/Windows Artfacts/files.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/files",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/files",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/files.md",tags:[],version:"current",frontMatter:{description:"Windows file metadata",keywords:["windows","file meta"]},sidebar:"artemisArtifacts",previous:{title:"Event Logs",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/eventlogs"},next:{title:"Jumplists",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/jumplists"}},l={},p=[],c={toc:p},f="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(f,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"files"},"Files"),(0,a.kt)("p",null,"A regular Windows filelisting. artemis uses the\n",(0,a.kt)("a",{parentName:"p",href:"https://crates.io/crates/walkdir"},"walkdir")," crate to recursively walk the files\nand directories on the system. If hashing or ",(0,a.kt)("inlineCode",{parentName:"p"},"PE")," parsing is enabled this will\nupdate the ",(0,a.kt)("inlineCode",{parentName:"p"},"Last Accessed")," timestamps on files since the native OS APIs are used\nto access the files and it will fail on any locked files. Use\n",(0,a.kt)("a",{parentName:"p",href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/rawfiles"},"RawFiles")," to bypass locked files.\\\nThe standard Rust API does not support getting ",(0,a.kt)("inlineCode",{parentName:"p"},"Changed/Entry Modified"),"\ntimestamp on Windows. Use ",(0,a.kt)("a",{parentName:"p",href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/rawfiles"},"RawFiles")," to include the\n",(0,a.kt)("inlineCode",{parentName:"p"},"Changed/Entry Modified")," timestamp.\\\nSince a filelisting can be extremely large every 100k entries artemis will\noutput the data and then continue."),(0,a.kt)("p",null,"Other Parsers:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Any tool that can recursively list files and directories")),(0,a.kt)("p",null,"References:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"N/A")),(0,a.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "files_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "files" # Name of artifact\n[artifacts.files]\nstart_path = "C:\\\\Windows" # Where to start the listing\n# Optional\ndepth = 1 # How many sub directories to descend\n# Optional\nmetadata = true # Get PE metadata\n# Optional\nmd5 = true # MD5 all files\n# Optional\nsha1 = false # SHA1 all files\n# Optional\nsha256 = false # SHA256 all files\n# Optional\npath_regex = "" # Regex for paths\n# Optional\nfile_regex = "" # Regex for files\n')),(0,a.kt)("h1",{id:"collection-options"},"Collection Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"start_path")," Where to start the file listing. Must exist on the endpoint. To\nstart at root use ",(0,a.kt)("inlineCode",{parentName:"li"},"C:\\\\"),". This configuration is ",(0,a.kt)("strong",{parentName:"li"},"required")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"depth")," Specify how many directories to descend from the ",(0,a.kt)("inlineCode",{parentName:"li"},"start_path"),". Default\nis one (1). Must be a postive number. Max value is 255. This configuration is\n",(0,a.kt)("strong",{parentName:"li"},"optional")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"metadata")," Get ",(0,a.kt)("a",{parentName:"li",href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/pe"},"PE")," data from ",(0,a.kt)("inlineCode",{parentName:"li"},"PE")," files. This configuration is\n",(0,a.kt)("strong",{parentName:"li"},"optional"),". Default is ",(0,a.kt)("strong",{parentName:"li"},"false")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"md5")," Boolean value to enable MD5 hashing on all files. This configuration is\n",(0,a.kt)("strong",{parentName:"li"},"optional"),". Default is ",(0,a.kt)("strong",{parentName:"li"},"false")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"sha1")," Boolean value to enable SHA1 hashing on all files. This configuration\nis ",(0,a.kt)("strong",{parentName:"li"},"optional"),". Default is ",(0,a.kt)("strong",{parentName:"li"},"false")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"sha256")," Boolean value to enable SHA256 hashing on all files. This\nconfiguration is ",(0,a.kt)("strong",{parentName:"li"},"optional"),". Default is ",(0,a.kt)("strong",{parentName:"li"},"false")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"path_regex")," Only descend into paths (directories) that match the provided\nregex. This configuration is ",(0,a.kt)("strong",{parentName:"li"},"optional"),". Default is no Regex"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"file_regex")," Only return entres that match the provided regex. This\nconfiguration is ",(0,a.kt)("strong",{parentName:"li"},"optional"),". Default is no Regex")),(0,a.kt)("h1",{id:"output-structure"},"Output Structure"),(0,a.kt)("p",null,"An array of ",(0,a.kt)("inlineCode",{parentName:"p"},"WindowsFileInfo")," entries"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface WindowsFileInfo {\n  /**Full path to file or directory */\n  full_path: string;\n  /**Directory path */\n  directory: string;\n  /**Filename */\n  filename: string;\n  /**Extension of file if any */\n  extension: string;\n  /**Created timestamp in UNIXEPOCH seconds */\n  created: number;\n  /**Modified timestamp in UNIXEPOCH seconds */\n  modified: number;\n  /**Changed timestamp in UNIXEPOCH seconds */\n  changed: number;\n  /**Accessed timestamp in UNIXEPOCH seconds */\n  accessed: number;\n  /**Size of file in bytes */\n  size: number;\n  /**Inode associated with entry */\n  inode: number;\n  /**Mode of file entry */\n  mode: number;\n  /**User ID associated with file */\n  uid: number;\n  /**Group ID associated with file */\n  gid: number;\n  /**MD5 of file */\n  md5: string;\n  /**SHA1 of file */\n  sha1: string;\n  /**SHA256 of file */\n  sha256: string;\n  /**Is the entry a file */\n  is_file: boolean;\n  /**Is the entry a directory */\n  is_directory: boolean;\n  /**Is the entry a symbolic links */\n  is_symlink: boolean;\n  /**Depth the file from provided start poin */\n  depth: number;\n  /**PE binary metadata */\n  binary_info: PeInfo[];\n}\n")))}d.isMDXComponent=!0}}]);