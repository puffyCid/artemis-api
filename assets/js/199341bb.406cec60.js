"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2244],{52240:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var t=i(17624),s=i(4552);const r={description:"Windows file metadata",keywords:["windows","file meta"]},a="Files",o={id:"Artifacts/Windows Artfacts/files",title:"Files",description:"Windows file metadata",source:"@site/docs/Artifacts/Windows Artfacts/files.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/files",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/files",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/files.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"Windows file metadata",keywords:["windows","file meta"]},sidebar:"artemisArtifacts",previous:{title:"Event Logs",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/eventlogs"},next:{title:"Jumplists",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/jumplists"}},l={},d=[];function c(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"files",children:"Files"}),"\n",(0,t.jsxs)(n.p,{children:["A regular Windows filelisting. Artemis uses the\n",(0,t.jsx)(n.a,{href:"https://crates.io/crates/walkdir",children:"walkdir"})," crate to recursively walk the files\nand directories on the system. If hashing or ",(0,t.jsx)(n.code,{children:"PE"})," parsing is enabled this will\nupdate the ",(0,t.jsx)(n.code,{children:"Last Accessed"})," timestamps on files since the native OS APIs are used\nto access the files and it will fail on any locked files. Use\n",(0,t.jsx)(n.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/rawfiles",children:"RawFiles"})," to bypass locked files."]}),"\n",(0,t.jsxs)(n.p,{children:["The standard Rust API does not support getting ",(0,t.jsx)(n.code,{children:"Changed/Entry Modified"}),"\ntimestamp on Windows. Use ",(0,t.jsx)(n.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/rawfiles",children:"RawFiles"})," to include the\n",(0,t.jsx)(n.code,{children:"Changed/Entry Modified"})," timestamp."]}),"\n",(0,t.jsx)(n.p,{children:"Since a filelisting can be extremely large, every 100k entries artemis will\noutput the data and then continue."}),"\n",(0,t.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Any tool that can recursively list files and directories"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"References:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"N/A"}),"\n"]}),"\n",(0,t.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "files_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "files" # Name of artifact\n[artifacts.files]\nstart_path = "C:\\\\Windows" # Where to start the listing\n# Optional\ndepth = 1 # How many sub directories to descend\n# Optional\nmetadata = true # Get PE metadata\n# Optional\nmd5 = true # MD5 all files\n# Optional\nsha1 = false # SHA1 all files\n# Optional\nsha256 = false # SHA256 all files\n# Optional\npath_regex = "" # Regex for paths\n# Optional\nfile_regex = "" # Regex for files\n'})}),"\n",(0,t.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"start_path"})," Where to start the file listing. Must exist on the endpoint. To\nstart at root use ",(0,t.jsx)(n.code,{children:"C:\\\\"}),". This configuration is ",(0,t.jsx)(n.strong,{children:"required"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"depth"})," Specify how many directories to descend from the ",(0,t.jsx)(n.code,{children:"start_path"}),". Default\nis one (1). Must be a postive number. Max value is 255. This configuration is\n",(0,t.jsx)(n.strong,{children:"optional"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"metadata"})," Get ",(0,t.jsx)(n.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/pe",children:"PE"})," data from ",(0,t.jsx)(n.code,{children:"PE"})," files. This configuration is\n",(0,t.jsx)(n.strong,{children:"optional"}),". Default is ",(0,t.jsx)(n.strong,{children:"false"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"md5"})," Boolean value to enable MD5 hashing on all files. This configuration is\n",(0,t.jsx)(n.strong,{children:"optional"}),". Default is ",(0,t.jsx)(n.strong,{children:"false"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"sha1"})," Boolean value to enable SHA1 hashing on all files. This configuration\nis ",(0,t.jsx)(n.strong,{children:"optional"}),". Default is ",(0,t.jsx)(n.strong,{children:"false"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"sha256"})," Boolean value to enable SHA256 hashing on all files. This\nconfiguration is ",(0,t.jsx)(n.strong,{children:"optional"}),". Default is ",(0,t.jsx)(n.strong,{children:"false"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"path_regex"})," Only descend into paths (directories) that match the provided\nregex. This configuration is ",(0,t.jsx)(n.strong,{children:"optional"}),". Default is no Regex"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"file_regex"})," Only return entres that match the provided regex. This\nconfiguration is ",(0,t.jsx)(n.strong,{children:"optional"}),". Default is no Regex"]}),"\n"]}),"\n",(0,t.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,t.jsxs)(n.p,{children:["An array of ",(0,t.jsx)(n.code,{children:"WindowsFileInfo"})," entries"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"export interface WindowsFileInfo {\n  /**Full path to file or directory */\n  full_path: string;\n  /**Directory path */\n  directory: string;\n  /**Filename */\n  filename: string;\n  /**Extension of file if any */\n  extension: string;\n  /**Created timestamp */\n  created: string;\n  /**Modified timestamp */\n  modified: string;\n  /**Changed timestamp */\n  changed: string;\n  /**Accessed timestamp */\n  accessed: string;\n  /**Size of file in bytes */\n  size: number;\n  /**Inode associated with entry */\n  inode: number;\n  /**Mode of file entry */\n  mode: number;\n  /**User ID associated with file */\n  uid: number;\n  /**Group ID associated with file */\n  gid: number;\n  /**MD5 of file */\n  md5: string;\n  /**SHA1 of file */\n  sha1: string;\n  /**SHA256 of file */\n  sha256: string;\n  /**Is the entry a file */\n  is_file: boolean;\n  /**Is the entry a directory */\n  is_directory: boolean;\n  /**Is the entry a symbolic links */\n  is_symlink: boolean;\n  /**Depth the file from provided start poin */\n  depth: number;\n  /**PE binary metadata */\n  binary_info: PeInfo[];\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},4552:(e,n,i)=>{i.d(n,{I:()=>o,M:()=>a});var t=i(11504);const s={},r=t.createContext(s);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);