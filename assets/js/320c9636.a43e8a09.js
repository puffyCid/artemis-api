"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1904],{2448:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>m,contentTitle:()=>s,default:()=>l,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=t(7624),o=t(2172);const r={description:"Linux system information",keywords:["linux"]},s="SystemInfo",a={id:"Artifacts/Linux Artifacts/systeminfo",title:"SystemInfo",description:"Linux system information",source:"@site/docs/Artifacts/Linux Artifacts/systeminfo.md",sourceDirName:"Artifacts/Linux Artifacts",slug:"/Artifacts/Linux Artifacts/systeminfo",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/systeminfo",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Linux Artifacts/systeminfo.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"Linux system information",keywords:["linux"]},sidebar:"artemisArtifacts",previous:{title:"Sudo Logs",permalink:"/artemis-api/docs/Artifacts/Linux Artifacts/sudo"},next:{title:"macOS Artifacts",permalink:"/artemis-api/docs/category/macos-artifacts"}},m={},c=[];function d(n){const e={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.M)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"systeminfo",children:"SystemInfo"}),"\n",(0,i.jsx)(e.p,{children:"Gets system metadata associated with the endpoint"}),"\n",(0,i.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Any tool that calls the Linux API or queries system information"}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Refernces:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-toml",children:'system = "Linux"\n\n[output]\nname = "systeminfo_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "systeminfo"\n'})}),"\n",(0,i.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(e.p,{children:["A ",(0,i.jsx)(e.code,{children:"SystemInfo"})," object structure"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"export interface SystemInfo {\n  /**Boot time for endpoint */\n  boot_time: number;\n  /**Endpoint hostname */\n  hostname: string;\n  /**Endpoint OS version */\n  os_version: string;\n  /**Uptime of endpoint */\n  uptime: number;\n  /**Endpoint kernel version */\n  kernel_version: string;\n  /**Endpoint platform */\n  platform: string;\n  /**CPU information */\n  cpu: Cpus[];\n  /**Disks information */\n  disks: Disks[];\n  /**Memory information */\n  memory: Memory;\n  /**Performance information */\n  performance: LoadPerformance;\n}\n\n/**\n * CPU information on endpoint\n */\nexport interface Cpus {\n  /**CPU frequency */\n  frequency: number;\n  /**CPU usage on endpoint */\n  cpu_usage: number;\n  /**Name of CPU */\n  name: string;\n  /**Vendor ID for CPU */\n  vendor_id: string;\n  /**CPU brand */\n  brand: string;\n  /**Core Count */\n  physical_core_count: number;\n}\n\n/**\n * Disk information on endpoint\n */\nexport interface Disks {\n  /**Type of disk */\n  disk_type: string;\n  /**Filesystem for disk */\n  file_system: string;\n  /**Disk mount point */\n  mount_point: string;\n  /**Disk storage */\n  total_space: number;\n  /**Storage remaining */\n  available_space: number;\n  /**If disk is removable */\n  removable: boolean;\n}\n\n/**\n * Memory information on endpoint\n */\nexport interface Memory {\n  /**Available memory on endpoint */\n  available_memory: number;\n  /**Free memory on endpoint */\n  free_memory: number;\n  /**Free swap on endpoint */\n  free_swap: number;\n  /**Total memory on endpoint */\n  total_memory: number;\n  /**Total swap on endpoint */\n  total_swap: number;\n  /**Memory in use */\n  used_memory: number;\n  /**Swap in use */\n  used_swap: number;\n}\n\n/**\n * Average CPU load\n */\nexport interface LoadPerformance {\n  /**Average load for one (1) min */\n  avg_one_min: number;\n  /**Average load for five (5) min */\n  avg_five_min: number;\n  /**Average load for fifteen (15) min */\n  avg_fifteen_min: number;\n}\n"})})]})}function l(n={}){const{wrapper:e}={...(0,o.M)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},2172:(n,e,t)=>{t.d(e,{I:()=>a,M:()=>s});var i=t(1504);const o={},r=i.createContext(o);function s(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:s(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);