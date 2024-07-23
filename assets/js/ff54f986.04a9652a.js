"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3848],{50516:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var t=i(17624),o=i(4552);const s={sidebar_position:3,description:"Supported output formats"},a="Output Formats",r={id:"Intro/Collections/output",title:"Output Formats",description:"Supported output formats",source:"@site/docs/Intro/Collections/output.md",sourceDirName:"Intro/Collections",slug:"/Intro/Collections/output",permalink:"/artemis-api/docs/Intro/Collections/output",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Collections/output.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,sidebarPosition:3,frontMatter:{sidebar_position:3,description:"Supported output formats"},sidebar:"artemisStart",previous:{title:"Format",permalink:"/artemis-api/docs/Intro/Collections/format"},next:{title:"Remote Uploads",permalink:"/artemis-api/docs/Intro/Collections/uploads"}},c={},d=[{value:"Other Files",id:"other-files",level:2}];function l(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"output-formats",children:"Output Formats"}),"\n",(0,t.jsxs)(n.p,{children:["Artemis supports two (2) types of output formats:\n",(0,t.jsx)(n.a,{href:"https://jsonlines.org/",children:"jsonl"})," and json. Both types will output the results\nusing a random uuid for the filename such as\n68330d32-c35e-4d43-8655-1cb5e9d90b83.json"]}),"\n",(0,t.jsx)(n.p,{children:"When you run artemis three (3) types of files will be generated:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}"})," a unique filename dependent on the format selected.\nThese files contain the artifact data output. Depending on the collection\nmultiple ",(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}"})," files will be created"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"<uuid>.log"})," a log file containing any errors or warnings generated by artemis\nduring the collection. Only one (1) per collection will exist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"status.log"})," a log file that maps the ",(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}"})," to an artifact\nname. The json or jsonl will also contain the artifact name. The status.log\njust provides a quick way to see what files contain a specific artifact. Only\none (1) per collection will exist"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The json output from the ",(0,t.jsx)(n.code,{children:"amcache"})," TOML collection from the previous page would\nlook like the following:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "metadata": {\n    "endpoint_id": "6c51b123-1522-4572-9f2a-0bd5abd81b82",\n    "id": 1,\n    "uuid": "41bc55e4-bc7b-4798-8808-4351092595a5",\n    "artifact_name": "amcache",\n    "complete_time": 1680466070,\n    "start_time": 1680466065,\n    "hostname": "DESKTOP-UQQDFT8",\n    "os_version": "11 (22000)",\n    "platform": "Windows",\n    "kernel_version": "22000",\n    "load_performance": {\n      "avg_one_min": 0.0,\n      "avg_five_min": 0.0,\n      "avg_fifteen_min": 0.0\n    }\n  },\n  "data": [\n    {\n      "first_execution": 1641252583,\n      "path": "c:\\\\program files (x86)\\\\windows kits\\\\10\\\\debuggers\\\\x86\\\\1394\\\\1394kdbg.sys",\n      "name": "1394kdbg.sys",\n      "original_name": "1394dbg.sys",\n      "version": "10.0.19041.685 (winbuild.160101.0800)",\n      "binary_type": "pe32_i386",\n      "product_version": "10.0.19041.685",\n      "product_name": "microsoft\xae windows\xae operating system",\n      "language": "",\n      "file_id": "",\n      "link_date": "10/28/2087 21:21:59",\n      "path_hash": "1394kdbg.sys|2912931c5988cc06",\n      "program_id": "00a68cd0bda5b35cd2f03e8556cad622f00000904",\n      "size": "38352",\n      "publisher": "microsoft corporation",\n      "usn": "4010442296",\n      "sha1": "",\n      "reg_path": "{11517B7C-E79D-4e20-961B-75A811715ADD}\\\\Root\\\\InventoryApplicationFile\\\\1394kdbg.sys|2912931c5988cc06"\n    }\n  ]\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"All artifacts parsed by artemis will be formatted similar to the output above."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"metadata"})," object that contains metadata about the system. All artifacts will\ncontain a metadata object","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"endpoint_id"})," The ID associated with the endpoint. This is from the ",(0,t.jsx)(n.code,{children:"TOML"}),"\ninput"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"id"})," The ID associated with the collection. This is from the ",(0,t.jsx)(n.code,{children:"TOML"})," input"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"uuid"})," Unique ID associated with the output"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"artifact_name"})," The name of the artifact collected. This is from the ",(0,t.jsx)(n.code,{children:"TOML"}),"\ninput"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"complete_time"})," The time artemis completed parsing the data"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"start_time"})," The time artemis started parsing the data"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"hostname"})," The hostname of the endpoint"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"os_version"})," Thes OS version of the endpoint"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"platform"})," The platform of the endpoint. Ex: Windows or macOS"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kernel_version"})," The kernel version of the endpoint"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"load_performance"})," The endpoint performance for one, five, and fifteen\nminutes. On Windows these values are always zero","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"avg_one_min"})," Average load performance for one minute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"avg_five_mine"})," Average load performance for five minutes"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"avg_fifteen_min"})," Average load performance for fifteen minutes"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"data"})," object that contains the artifact specific data.",(0,t.jsx)(n.br,{}),"\n","See the ",(0,t.jsx)(n.a,{href:"/artemis-api/docs/Artifacts/overview",children:"artifact"})," chapter to see the structure\nfor each artifact.",(0,t.jsx)(n.br,{}),"\n","If you choose to execute JavaScript you can control what the ",(0,t.jsx)(n.code,{children:"data"})," contains.\nFor example you can return a string instead of an object or even combine\nmultiple artifacts!"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The jsonl output from the ",(0,t.jsx)(n.code,{children:"amcache"})," TOML collection from the previous page would\nlook like the following:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsonl",children:'{"metadata":{"endpoint_id":"6c51b123-1522-4572-9f2a-0bd5abd81b82","id":1,"artifact_name":"amcache","complete_time":1680467122,"start_time":1680467120,"hostname":"DESKTOP-UQQDFT8","os_version":"11 (22000)","platform":"Windows","kernel_version":"22000","load_performance":{"avg_one_min":0.0,"avg_five_min":0.0,"avg_fifteen_min":0.0},"uuid":"64702816-0f24-4e6e-a72a-118cb51c55b4"},"data":{"first_execution":1641252583,"path":"c:\\\\program files (x86)\\\\windows kits\\\\10\\\\debuggers\\\\x86\\\\1394\\\\1394kdbg.sys","name":"1394kdbg.sys","original_name":"1394dbg.sys","version":"10.0.19041.685 (winbuild.160101.0800)","binary_type":"pe32_i386","product_version":"10.0.19041.685","product_name":"microsoft\xae windows\xae operating system","language":"","file_id":"","link_date":"10/28/2087 21:21:59","path_hash":"1394kdbg.sys|2912931c5988cc06","program_id":"00a68cd0bda5b35cd2f03e8556cad622f00000904","size":"38352","publisher":"microsoft corporation","usn":"4010442296","sha1":"","reg_path":"{11517B7C-E79D-4e20-961B-75A811715ADD}\\\\Root\\\\InventoryApplicationFile\\\\1394kdbg.sys|2912931c5988cc06"}}\n{"metadata":{"endpoint_id":"6c51b123-1522-4572-9f2a-0bd5abd81b82","id":1,"artifact_name":"amcache","complete_time":1680467122,"start_time":1680467120,"hostname":"DESKTOP-UQQDFT8","os_version":"11 (22000)","platform":"Windows","kernel_version":"22000","load_performance":{"avg_one_min":0.0,"avg_five_min":0.0,"avg_fifteen_min":0.0},"uuid":"5afa02eb-1e11-48a0-993e-3bb852667db7"},"data":{"first_execution":1641252583,"path":"c:\\\\program files (x86)\\\\windows kits\\\\10\\\\debuggers\\\\x64\\\\1394\\\\1394kdbg.sys","name":"1394kdbg.sys","original_name":"1394dbg.sys","version":"10.0.19041.685 (winbuild.160101.0800)","binary_type":"pe64_amd64","product_version":"10.0.19041.685","product_name":"microsoft\xae windows\xae operating system","language":"","file_id":"","link_date":"11/30/2005 17:06:22","path_hash":"1394kdbg.sys|7e05880d5bf9d27b","program_id":"00a68cd0bda5b35cd2f03e8556cad622f00000904","size":"47568","publisher":"microsoft corporation","usn":"4010568800","sha1":"","reg_path":"{11517B7C-E79D-4e20-961B-75A811715ADD}\\\\Root\\\\InventoryApplicationFile\\\\1394kdbg.sys|7e05880d5bf9d27b"}}\n...\n{"metadata":{"endpoint_id":"6c51b123-1522-4572-9f2a-0bd5abd81b82","id":1,"artifact_name":"amcache","complete_time":1680467122,"start_time":1680467120,"hostname":"DESKTOP-UQQDFT8","os_version":"11 (22000)","platform":"Windows","kernel_version":"22000","load_performance":{"avg_one_min":0.0,"avg_five_min":0.0,"avg_fifteen_min":0.0},"uuid":"bce5fccc-9f13-40cd-bebd-95a32ead119a"},"data":{"first_execution":1641252542,"path":"c:\\\\program files\\\\git\\\\mingw64\\\\bin\\\\ziptool.exe","name":"ziptool.exe","original_name":"","version":"","binary_type":"pe64_amd64","product_version":"","product_name":"","language":"","file_id":"","link_date":"01/01/1970 00:00:00","path_hash":"ziptool.exe|7269435f129e6e01","program_id":"01286cf3cc5f1d161abf355f10fee583c0000ffff","size":"162258","publisher":"","usn":"3869400664","sha1":"","reg_path":"{11517B7C-E79D-4e20-961B-75A811715ADD}\\\\Root\\\\InventoryApplicationFile\\\\ziptool.exe|7269435f129e6e01"}}\n{"metadata":{"endpoint_id":"6c51b123-1522-4572-9f2a-0bd5abd81b82","id":1,"artifact_name":"amcache","complete_time":1680467122,"start_time":1680467120,"hostname":"DESKTOP-UQQDFT8","os_version":"11 (22000)","platform":"Windows","kernel_version":"22000","load_performance":{"avg_one_min":0.0,"avg_five_min":0.0,"avg_fifteen_min":0.0},"uuid":"8437907f-53a4-43a2-8ff4-22acb3d06d72"},"data":{"first_execution":1641252542,"path":"c:\\\\program files\\\\git\\\\usr\\\\bin\\\\[.exe","name":"[.exe","original_name":"","version":"","binary_type":"pe64_amd64","product_version":"","product_name":"","language":"","file_id":"","link_date":"01/01/1970 00:00:00","path_hash":"[.exe|b6eac39997c90239","program_id":"01286cf3cc5f1d161abf355f10fee583c0000ffff","size":"68322","publisher":"","usn":"3870610520","sha1":"","reg_path":"{11517B7C-E79D-4e20-961B-75A811715ADD}\\\\Root\\\\InventoryApplicationFile\\\\[.exe|b6eac39997c90239"}}\n'})}),"\n",(0,t.jsx)(n.p,{children:"The jsonl output is identical to json with the following differences:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The values in ",(0,t.jsx)(n.code,{children:"data"})," are split into separate lines instead of an array"]}),"\n",(0,t.jsxs)(n.li,{children:["The ",(0,t.jsx)(n.code,{children:"uuid"})," is unique for each json line"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["This data would be saved in a ",(0,t.jsx)(n.code,{children:"<uuid>.jsonl"})," file"]}),"\n",(0,t.jsx)(n.h2,{id:"other-files",children:"Other Files"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"<uuid>.log"})," output from a collection contains any errors or warnings\nencountered during the collection."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"status.log"})," output from a collection maps the ",(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}"}),"\nfiles to an artifact name. A possible example from the macOS ",(0,t.jsx)(n.code,{children:"UnifiedLogs"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"unifiedlogs:d45221df-349b-4467-b726-a9446865b259.json\nunifiedlogs:eccd7b5b-4941-4134-a790-b073eb992188.json\n"})}),"\n",(0,t.jsxs)(n.p,{children:["As mentioned and seen above you can also check the actual\n",(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}"})," files to find the ",(0,t.jsx)(n.code,{children:"artifact_name"})]}),"\n",(0,t.jsx)(n.h1,{id:"compression",children:"Compression"}),"\n",(0,t.jsxs)(n.p,{children:["If you choose to enable compression for the output artemis will compress each\n",(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}"})," using gzip compression. The files will be saved as\n",(0,t.jsx)(n.code,{children:"<uuid>.{json or jsonl}.gz"}),". The log files are not compressed."]}),"\n",(0,t.jsx)(n.p,{children:"Once the collection is complete artemis will compress the whole output directory\ninto a zip file and remove the output directory. Leaving only the zip file."}),"\n",(0,t.jsx)(n.p,{children:"Since artemis is running using elevated privileges it uses a cautious approach\nto deleting its data:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"It gets a list of files in its output directory and deletes files one at a\ntime that end in: json, jsonl, gz, or log"}),"\n",(0,t.jsx)(n.li,{children:"Once all output files are deleted, it will delete the empty directory."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.M)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},4552:(e,n,i)=>{i.d(n,{I:()=>r,M:()=>a});var t=i(11504);const o={},s=t.createContext(o);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);