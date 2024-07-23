"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4896],{6692:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=t(17624),s=t(4552);const r={description:"Windows NTFS file metadata",keywords:["windows","file meta"]},a="Raw Files",o={id:"Artifacts/Windows Artfacts/rawfiles",title:"Raw Files",description:"Windows NTFS file metadata",source:"@site/docs/Artifacts/Windows Artfacts/rawfiles.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/rawfiles",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/rawfiles",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/rawfiles.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"Windows NTFS file metadata",keywords:["windows","file meta"]},sidebar:"artemisArtifacts",previous:{title:"Processes",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/processes"},next:{title:"RecycleBin",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/recyclebin"}},l={},c=[];function d(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"raw-files",children:"Raw Files"}),"\n",(0,i.jsxs)(n.p,{children:["A raw Windows filelisting by parsing the ",(0,i.jsx)(n.code,{children:"NTFS"})," file system using the\n",(0,i.jsx)(n.a,{href:"https://github.com/ColinFinck/ntfs",children:"ntfs"})," crate to recursively walk the files\nand directories on the system. If hashing or ",(0,i.jsx)(n.code,{children:"PE"})," parsing is enabled this will\nalso read the file contents. ",(0,i.jsx)(n.code,{children:"Raw Files"})," also supports decompressing compressed\nfiles with the ",(0,i.jsx)(n.code,{children:"WofCompression"})," alternative data stream (ADS) attribute."]}),"\n",(0,i.jsx)(n.p,{children:"Since a filelisting can be extremely large, every 100k entries artemis will\noutput the data and then continue."}),"\n",(0,i.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Any tool that parse the NTFS file system"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/libyal/libfsntfs/blob/main/documentation/New%20Technologies%20File%20System%20(NTFS).asciidoc",children:"Libyal"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "ntfs_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "rawfiles"\n[artifacts.rawfiles]\ndrive_letter = \'C\'\nstart_path = "C:\\\\"\ndepth = 20\nrecover_indx = false\n# Optional\nmetadata = true # Get PE metadata\n# Optional\nmd5 = false\n# Optional\nsha1 = false\n# Optional\nsha256 = false\n# Optional\nmetadata = false\n# Optional\npath_regex = ""\n# Optional\nfilename_regex = ""\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"drive_letter"})," Drive letter to use to parse the NTFS file system. This\nconfiguration is ",(0,i.jsx)(n.strong,{children:"required"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"start_path"})," Directory to start walking the filesystem. This configuration is\n",(0,i.jsx)(n.strong,{children:"required"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"depth"})," How many directories to descend from the ",(0,i.jsx)(n.code,{children:"start_path"}),". Must be a\npostive number. Max value is 255. This configuration is ",(0,i.jsx)(n.strong,{children:"required"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"recover_indx"})," Boolean value to carve deleted entries from the ",(0,i.jsx)(n.code,{children:"$INDX"}),"\nattribute. Can show evidence of deleted files"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"metadata"})," Get ",(0,i.jsx)(n.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/pe",children:"PE"})," data from ",(0,i.jsx)(n.code,{children:"PE"})," files. This configuration is\n",(0,i.jsx)(n.strong,{children:"optional"}),". Default is ",(0,i.jsx)(n.strong,{children:"false"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"md5"})," Boolean value to enable MD5 hashing on all files. This configuration is\n",(0,i.jsx)(n.strong,{children:"optional"}),". Default is ",(0,i.jsx)(n.strong,{children:"false"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"sha1"})," Boolean value to enable SHA1 hashing on all files. This configuration\nis ",(0,i.jsx)(n.strong,{children:"optional"}),". Default is ",(0,i.jsx)(n.strong,{children:"false"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"sha256"})," Boolean value to enable SHA256 hashing on all files. This\nconfiguration is ",(0,i.jsx)(n.strong,{children:"optional"}),". Default is ",(0,i.jsx)(n.strong,{children:"false"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"path_regex"})," Only descend into paths (directories) that match the provided\nregex. This configuration is ",(0,i.jsx)(n.strong,{children:"optional"}),". Default is no Regex"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"file_regex"})," Only return entres that match the provided regex. This\nconfiguration is ",(0,i.jsx)(n.strong,{children:"optional"}),". Default is no Regex"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["An array of ",(0,i.jsx)(n.code,{children:"WindowsRawFileInfo"})," entries"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface RawFileInfo {\n  /**Full path to file or directory */\n  full_path: string;\n  /**Directory path */\n  directory: string;\n  /**Filename */\n  filename: string;\n  /**Extension of file if any */\n  extension: string;\n  /**Created timestamp */\n  created: string;\n  /**Modified timestamp */\n  modified: string;\n  /**Changed timestamp */\n  changed: string;\n  /**Accessed timestamp */\n  accessed: string;\n  /**Filename created timestamp */\n  filename_created: string;\n  /**Filename modified timestamp */\n  filename_modified: string;\n  /**Filename accessed timestamp */\n  filename_accessed: string;\n  /**Filename changed timestamp */\n  filename_changed: string;\n  /**Size of file in bytes */\n  size: number;\n  /**Size of file if compressed */\n  compressed_size: number;\n  /**Compression type used on file */\n  compression_type: string;\n  /**Inode entry */\n  inode: number;\n  /**Sequence number for entry */\n  sequence_number: number;\n  /**Parent MFT reference for entry */\n  parent_mft_references: number;\n  /**Attributes associated with entry */\n  attributes: string[];\n  /**MD5 of file. Optional */\n  md5: string;\n  /**SHA1 of file. Optional */\n  sha1: string;\n  /**SHA256 of file. Optional */\n  sha256: string;\n  /**Is the entry a file */\n  is_file: boolean;\n  /**Is the entry a directory */\n  is_directory: boolean;\n  /** Is the entry carved from $INDX */\n  is_indx: boolean;\n  /**USN entry */\n  usn: number;\n  /**SID number associated with entry */\n  sid: number;\n  /**SID  string associated with entry*/\n  user_sid: string;\n  /**Group SID associated with entry */\n  group_sid: string;\n  /**Drive letter */\n  drive: string;\n  /**ADS info associated with entry */\n  ads_info: AdsInfo[];\n  /**Depth the file from provided start point*/\n  depth: number;\n  /**PE binary metadata. Optional */\n  binary_info: PeInfo[];\n}\n\n/**\n * Alternative Data Streams (ADS) are a NTFS feature to embed data in another data stream\n */\nexport interface AdsInfo {\n  /**Name of the ADS entry */\n  name: string;\n  /**Size of the ADS entry */\n  size: number;\n}\n"})})]})}function f(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},4552:(e,n,t)=>{t.d(n,{I:()=>o,M:()=>a});var i=t(11504);const s={},r=i.createContext(s);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);