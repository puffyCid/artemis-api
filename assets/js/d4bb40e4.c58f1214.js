"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8416],{1785:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>n,default:()=>o,frontMatter:()=>d,metadata:()=>c,toc:()=>h});var r=s(5893),i=s(1151);const d={description:"Interact with Windows Artifacts"},n="Windows",c={id:"API/Artifacts/windows",title:"Windows",description:"Interact with Windows Artifacts",source:"@site/docs/API/Artifacts/windows.md",sourceDirName:"API/Artifacts",slug:"/API/Artifacts/windows",permalink:"/artemis-api/docs/API/Artifacts/windows",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/windows.md",tags:[],version:"current",frontMatter:{description:"Interact with Windows Artifacts"},sidebar:"artemisAPI",previous:{title:"Unix",permalink:"/artemis-api/docs/API/Artifacts/unix"}},l={},h=[{value:"getAmcache() -&gt; <code>Amcache[]</code>",id:"getamcache---amcache",level:3},{value:"getAltAmcache(drive) -&gt; <code>Amcache[]</code>",id:"getaltamcachedrive---amcache",level:3},{value:"getBits(carve) -&gt; <code>Bits</code>",id:"getbitscarve---bits",level:3},{value:"getBitsPath(path, carve) -&gt; <code>Amcache[]</code>",id:"getbitspathpath-carve---amcache",level:3},{value:"getEventlogs(path) -&gt; <code>EventLogRecord[]</code>",id:"geteventlogspath---eventlogrecord",level:3},{value:"getJumplists() -&gt; <code>Jumplists[]</code>",id:"getjumplists---jumplists",level:3},{value:"getAltJumplists(drive) -&gt; <code>Jumplists[]</code>",id:"getaltjumplistsdrive---jumplists",level:3},{value:"getJumplistPath(path) -&gt; <code>Jumplists[]</code>",id:"getjumplistpathpath---jumplists",level:3},{value:"readRawFile(path) -&gt; <code>Uint8Array</code>",id:"readrawfilepath---uint8array",level:3},{value:"readAdsData(path, ads_name) -&gt; <code>Uint8Array</code>",id:"readadsdatapath-ads_name---uint8array",level:3},{value:"getPe(path) -&gt; <code>PeInfo | WindowsError</code>",id:"getpepath---peinfo--windowserror",level:3},{value:"getPrefetch() -&gt; <code>Prefetch[]</code>",id:"getprefetch---prefetch",level:3},{value:"getAltPrefetch(drive) -&gt; <code>Prefetch[]</code>",id:"getaltprefetchdrive---prefetch",level:3},{value:"getPrefetchPath(path) -&gt; <code>Prefetch[]</code>",id:"getprefetchpathpath---prefetch",level:3},{value:"getRecycleBin(drive) -&gt; <code>RecycleBin[]</code>",id:"getrecyclebindrive---recyclebin",level:3},{value:"getRecycleBinFile(path) -&gt; <code>RecycleBin[]</code>",id:"getrecyclebinfilepath---recyclebin",level:3},{value:"getRegistry(path) -&gt; <code>Registry[]</code>",id:"getregistrypath---registry",level:3},{value:"getSearch(path) -&gt; <code>SearchEntry[]</code>",id:"getsearchpath---searchentry",level:3},{value:"getServices() -&gt; <code>Services[] | Error</code>",id:"getservices---services--error",level:3},{value:"getAltServices(drive) -&gt; <code>Services[] | Error</code>",id:"getaltservicesdrive---services--error",level:3},{value:"getServiceFile(path) -&gt; <code>Services[] | Error</code>",id:"getservicefilepath---services--error",level:3},{value:"getShellbags() -&gt; <code>Shellbags[]</code>",id:"getshellbags---shellbags",level:3},{value:"getAltShellbags(drive) -&gt; <code>Shellbags[]</code>",id:"getaltshellbagsdrive---shellbags",level:3},{value:"getShimcache() -&gt; <code>Shimcache[]</code>",id:"getshimcache---shimcache",level:3},{value:"getAltShimcache(drive) -&gt; <code>Shimcache[]</code>",id:"getaltshimcachedrive---shimcache",level:3},{value:"getShimdb() -&gt; <code>Shimdb[]</code>",id:"getshimdb---shimdb",level:3},{value:"getAltShimdb(drive) -&gt; <code>Shimdb[]</code>",id:"getaltshimdbdrive---shimdb",level:3},{value:"getCustomShimdb(path) -&gt; <code>Shimdb[]</code>",id:"getcustomshimdbpath---shimdb",level:3},{value:"getLnkFile(path) -&gt; <code>Shortcut</code>",id:"getlnkfilepath---shortcut",level:3},{value:"getSrumApplicationInfo(path) -&gt; <code>ApplicationInfo[]</code>",id:"getsrumapplicationinfopath---applicationinfo",level:3},{value:"getSrumApplicationTimeline(path) -&gt; <code>ApplicationTimeline[]</code>",id:"getsrumapplicationtimelinepath---applicationtimeline",level:3},{value:"getSrumApplicationVfu(path) -&gt; <code>AppVfu[]</code>",id:"getsrumapplicationvfupath---appvfu",level:3},{value:"getSrumEnergyInfo(path) -&gt; <code>EnergyInfo[]</code>",id:"getsrumenergyinfopath---energyinfo",level:3},{value:"getSrumEnergyUsage(path) -&gt; <code>EnergyUsage[]</code>",id:"getsrumenergyusagepath---energyusage",level:3},{value:"getSrumNetworkInfo(path) -&gt; <code>NetworkInfo[]</code>",id:"getsrumnetworkinfopath---networkinfo",level:3},{value:"getSrumNetworkConnectivity(path) -&gt; <code>NetworkConnectivityInfo[]</code>",id:"getsrumnetworkconnectivitypath---networkconnectivityinfo",level:3},{value:"getSrumNotifications(path) -&gt; <code>NotificationInfo[]</code>",id:"getsrumnotificationspath---notificationinfo",level:3},{value:"getTasks() -&gt; <code>TaskData | Error</code>",id:"gettasks---taskdata--error",level:3},{value:"getAltTasks(drive) -&gt; <code>TaskData | Error</code>",id:"getalttasksdrive---taskdata--error",level:3},{value:"getTaskFile(path) -&gt; <code>TaskXml | TaskJob | Error</code>",id:"gettaskfilepath---taskxml--taskjob--error",level:3},{value:"getUserassist() -&gt; <code>UserAssist[]</code>",id:"getuserassist---userassist",level:3},{value:"getAltUserassist(drive) -&gt; <code>UserAssist[]</code>",id:"getaltuserassistdrive---userassist",level:3},{value:"getUsersWin() -&gt; <code>UserInfo[]</code>",id:"getuserswin---userinfo",level:3},{value:"getAltUsersWin(drive) -&gt; <code>UserInfo[]</code>",id:"getaltuserswindrive---userinfo",level:3},{value:"getUsnjrnl() -&gt; <code>UsnJrnl[]</code>",id:"getusnjrnl---usnjrnl",level:3},{value:"getAltUsnjrnl(drive) -&gt; <code>UsnJrnl[]</code>",id:"getaltusnjrnldrive---usnjrnl",level:3},{value:"logons(path) -&gt; <code>Logons[]</code>",id:"logonspath---logons",level:3},{value:"lookupSecurityKey(path, offset) -&gt; <code>SecurityKey</code>",id:"lookupsecuritykeypath-offset---securitykey",level:3},{value:"parseTable(path, tables) -&gt; <code>Record&lt;string, EseTable[][]&gt; | Error</code>",id:"parsetablepath-tables---recordstring-esetable--error",level:3}];function a(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"windows",children:"Windows"}),"\n",(0,r.jsx)(t.p,{children:"These functions can be used to pull data related to Windows artifacts."}),"\n",(0,r.jsxs)(t.h3,{id:"getamcache---amcache",children:["getAmcache() -> ",(0,r.jsx)(t.code,{children:"Amcache[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Amcache Registry file on the systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltamcachedrive---amcache",children:["getAltAmcache(drive) -> ",(0,r.jsx)(t.code,{children:"Amcache[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Amcache Registry file on the provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Alternative drive letter to parse Amcache Registry file on"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getbitscarve---bits",children:["getBits(carve) -> ",(0,r.jsx)(t.code,{children:"Bits"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Windows ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/bits",children:"BITS"})," data. Supports\ncarving deleted entries."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"carve"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"boolean"})}),(0,r.jsx)(t.td,{children:"Attempt to carve deleted BITS entries"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getbitspathpath-carve---amcache",children:["getBitsPath(path, carve) -> ",(0,r.jsx)(t.code,{children:"Amcache[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Windows ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/bits",children:"BITS"})," data at\nprovided path. Supports carving deleted entries."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows BITS file"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"carve"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"boolean"})}),(0,r.jsx)(t.td,{children:"Attempt to carve deleted BITS entries"})]})]})]}),"\n",(0,r.jsxs)(t.h3,{id:"geteventlogspath---eventlogrecord",children:["getEventlogs(path) -> ",(0,r.jsx)(t.code,{children:"EventLogRecord[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows EventLog file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows EventLog file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getjumplists---jumplists",children:["getJumplists() -> ",(0,r.jsx)(t.code,{children:"Jumplists[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Get all ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/jumplists",children:"JumpLists"})," for all\nusers at default systemdrive."]}),"\n",(0,r.jsxs)(t.h3,{id:"getaltjumplistsdrive---jumplists",children:["getAltJumplists(drive) -> ",(0,r.jsx)(t.code,{children:"Jumplists[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Get all ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/jumplists",children:"JumpLists"})," for all\nusers at provided drive."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getjumplistpathpath---jumplists",children:["getJumplistPath(path) -> ",(0,r.jsx)(t.code,{children:"Jumplists[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/jumplists",children:"JumpLists"})," file at\nprovided path."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Jumplist file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"readrawfilepath---uint8array",children:["readRawFile(path) -> ",(0,r.jsx)(t.code,{children:"Uint8Array"})]}),"\n",(0,r.jsx)(t.p,{children:"Read a file at provided path by parsing the NTFS. You can read locked files with\nthis function."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to file read"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"readadsdatapath-ads_name---uint8array",children:["readAdsData(path, ads_name) -> ",(0,r.jsx)(t.code,{children:"Uint8Array"})]}),"\n",(0,r.jsx)(t.p,{children:"Read an Alternative Data Stream at provided file path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to file read"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"ads_name"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"ADS data to read"})]})]})]}),"\n",(0,r.jsxs)(t.h3,{id:"getpepath---peinfo--windowserror",children:["getPe(path) -> ",(0,r.jsx)(t.code,{children:"PeInfo | WindowsError"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse PE file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to PE file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getprefetch---prefetch",children:["getPrefetch() -> ",(0,r.jsx)(t.code,{children:"Prefetch[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse all Prefetch files at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltprefetchdrive---prefetch",children:["getAltPrefetch(drive) -> ",(0,r.jsx)(t.code,{children:"Prefetch[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse all Prefetch files at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to Prefetch files"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getprefetchpathpath---prefetch",children:["getPrefetchPath(path) -> ",(0,r.jsx)(t.code,{children:"Prefetch[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Prefetch files at provided directory."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Prefetch directory"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getrecyclebindrive---recyclebin",children:["getRecycleBin(drive) -> ",(0,r.jsx)(t.code,{children:"RecycleBin[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse all RecycleBin files at provided drive (optional)."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to RecycleBin files. Default is systemdrive."})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getrecyclebinfilepath---recyclebin",children:["getRecycleBinFile(path) -> ",(0,r.jsx)(t.code,{children:"RecycleBin[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse RecycleBin file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to RecycleBin file."})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getregistrypath---registry",children:["getRegistry(path) -> ",(0,r.jsx)(t.code,{children:"Registry[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Registry file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Registry file."})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsearchpath---searchentry",children:["getSearch(path) -> ",(0,r.jsx)(t.code,{children:"SearchEntry[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Windows ",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/search",children:"Search"})," database at\nprovided path."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows Search database."})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getservices---services--error",children:["getServices() -> ",(0,r.jsx)(t.code,{children:"Services[] | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Services at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltservicesdrive---services--error",children:["getAltServices(drive) -> ",(0,r.jsx)(t.code,{children:"Services[] | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Services at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows Services"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getservicefilepath---services--error",children:["getServiceFile(path) -> ",(0,r.jsx)(t.code,{children:"Services[] | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Services (SYSTEM Registry) file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SYSTEM Registry file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getshellbags---shellbags",children:["getShellbags() -> ",(0,r.jsx)(t.code,{children:"Shellbags[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Shellbags at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltshellbagsdrive---shellbags",children:["getAltShellbags(drive) -> ",(0,r.jsx)(t.code,{children:"Shellbags[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Shellbags at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows Shellbags"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getshimcache---shimcache",children:["getShimcache() -> ",(0,r.jsx)(t.code,{children:"Shimcache[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Shimcache at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltshimcachedrive---shimcache",children:["getAltShimcache(drive) -> ",(0,r.jsx)(t.code,{children:"Shimcache[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Shimcache at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows Shimcache"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getshimdb---shimdb",children:["getShimdb() -> ",(0,r.jsx)(t.code,{children:"Shimdb[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows ShimDB files at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltshimdbdrive---shimdb",children:["getAltShimdb(drive) -> ",(0,r.jsx)(t.code,{children:"Shimdb[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows ShimDB files at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows ShimDB"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getcustomshimdbpath---shimdb",children:["getCustomShimdb(path) -> ",(0,r.jsx)(t.code,{children:"Shimdb[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows ShimDB file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows ShimDB file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getlnkfilepath---shortcut",children:["getLnkFile(path) -> ",(0,r.jsx)(t.code,{children:"Shortcut"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Shortcut file at provided path."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows Shortcut file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumapplicationinfopath---applicationinfo",children:["getSrumApplicationInfo(path) -> ",(0,r.jsx)(t.code,{children:"ApplicationInfo[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Application info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumapplicationtimelinepath---applicationtimeline",children:["getSrumApplicationTimeline(path) -> ",(0,r.jsx)(t.code,{children:"ApplicationTimeline[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Application Timeline info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumapplicationvfupath---appvfu",children:["getSrumApplicationVfu(path) -> ",(0,r.jsx)(t.code,{children:"AppVfu[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Application VFU info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumenergyinfopath---energyinfo",children:["getSrumEnergyInfo(path) -> ",(0,r.jsx)(t.code,{children:"EnergyInfo[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Energy info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumenergyusagepath---energyusage",children:["getSrumEnergyUsage(path) -> ",(0,r.jsx)(t.code,{children:"EnergyUsage[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Energy usage from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumnetworkinfopath---networkinfo",children:["getSrumNetworkInfo(path) -> ",(0,r.jsx)(t.code,{children:"NetworkInfo[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Network info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumnetworkconnectivitypath---networkconnectivityinfo",children:["getSrumNetworkConnectivity(path) -> ",(0,r.jsx)(t.code,{children:"NetworkConnectivityInfo[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Network connectivity info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getsrumnotificationspath---notificationinfo",children:["getSrumNotifications(path) -> ",(0,r.jsx)(t.code,{children:"NotificationInfo[]"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse notification info from Windows\n",(0,r.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/srum",children:"SRUM"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows SRUM file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"gettasks---taskdata--error",children:["getTasks() -> ",(0,r.jsx)(t.code,{children:"TaskData | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Schedule Tasks at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getalttasksdrive---taskdata--error",children:["getAltTasks(drive) -> ",(0,r.jsx)(t.code,{children:"TaskData | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Schedule Tasks at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows Schedule Tasks"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"gettaskfilepath---taskxml--taskjob--error",children:["getTaskFile(path) -> ",(0,r.jsx)(t.code,{children:"TaskXml | TaskJob | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Schedule Task file at provided path. Supports XML and older binary\nJob files."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows Schedule Task file. Can be either XML or Job"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getuserassist---userassist",children:["getUserassist() -> ",(0,r.jsx)(t.code,{children:"UserAssist[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Userassist entries at default systemdrive."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltuserassistdrive---userassist",children:["getAltUserassist(drive) -> ",(0,r.jsx)(t.code,{children:"UserAssist[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse Windows Userassist entries at provided drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows Userassist"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getuserswin---userinfo",children:["getUsersWin() -> ",(0,r.jsx)(t.code,{children:"UserInfo[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Get local Windows User accounts from SAM Registry file. Uses default systemdrive\nletter."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltuserswindrive---userinfo",children:["getAltUsersWin(drive) -> ",(0,r.jsx)(t.code,{children:"UserInfo[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Get local Windows User accounts from SAM Registry file from alternative drive\nletter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows Users"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"getusnjrnl---usnjrnl",children:["getUsnjrnl() -> ",(0,r.jsx)(t.code,{children:"UsnJrnl[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parses Windows UsnJrnl data. Uses default systemdrive letter."}),"\n",(0,r.jsxs)(t.h3,{id:"getaltusnjrnldrive---usnjrnl",children:["getAltUsnjrnl(drive) -> ",(0,r.jsx)(t.code,{children:"UsnJrnl[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parses Windows UsnJrnl data from alternative drive letter."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"drive"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Drive letter to get Windows UsnJrnl"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"logonspath---logons",children:["logons(path) -> ",(0,r.jsx)(t.code,{children:"Logons[]"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse the Windows Security.evtx and try to correlate Logon and Logoff events."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows Security.evtx file"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"lookupsecuritykeypath-offset---securitykey",children:["lookupSecurityKey(path, offset) -> ",(0,r.jsx)(t.code,{children:"SecurityKey"})]}),"\n",(0,r.jsxs)(t.p,{children:["Parse Security Key data from Registry at provided Security Key offset. The\noffset must be a postive number greater than 0. You can use ",(0,r.jsx)(t.code,{children:"getRegistry(path)"}),"\nto pull a list of keys which contain Security Key offset data."]}),"\n",(0,r.jsx)(t.p,{children:"It is not recommended to bulk lookup Security Key info due the amount of data.\nSecurity Keys contain information about Registry key permissions and ACLs. Its\nnot super useful."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows Registry file"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"offset"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"number"})}),(0,r.jsx)(t.td,{children:"Offset to Security Key"})]})]})]}),"\n",(0,r.jsxs)(t.h3,{id:"parsetablepath-tables---recordstring-esetable--error",children:["parseTable(path, tables) -> ",(0,r.jsx)(t.code,{children:"Record<string, EseTable[][]> | Error"})]}),"\n",(0,r.jsx)(t.p,{children:"Parse an ESE database table at provided path. Will return a HashMap of tables.\nWhere there string key is the table name. Table rows are returned in double\narray where each row is an array. Will bypass locked files and works dirty or\nclean ESE databases."}),"\n",(0,r.jsx)(t.admonition,{type:"warning",children:(0,r.jsx)(t.p,{children:"Larger ESE databases will consume more memory and resources"})}),"\n",(0,r.jsx)(t.p,{children:"Sample output for one table (SmTbleSmp) that has two rows:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'{\n    "SmTblSmp": [\n        [\n            {\n                "column_type": "Float64",\n                "column_name": "SectionID",\n                "column_data": "1"\n            },\n            {\n                "column_type": "LongBinary",\n                "column_name": "Name",\n                "column_data": "bABzAGEAYQBuAG8AbgB5AG0AbwB1AHMAbgBhAG0AZQBsAG8AbwBrAHUAcAA="\n            },\n            {\n                "column_type": "LongBinary",\n                "column_name": "Value",\n                "column_data": "MAAAAA=="\n            }\n        ],\n        [\n            {\n                "column_type": "Float64",\n                "column_name": "SectionID",\n                "column_data": "1"\n            },\n            {\n                "column_type": "LongBinary",\n                "column_name": "Name",\n                "column_data": "ZQBuAGEAYgBsAGUAZwB1AGUAcwB0AGEAYwBjAG8AdQBuAHQA"\n            },\n            {\n                "column_type": "LongBinary",\n                "column_name": "Value",\n                "column_data": "MAAAAA=="\n            }\n        ]\n    ]\n}\n'})}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to Windows ESE database"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"tables"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string[]"})}),(0,r.jsx)(t.td,{children:"One or more tables to parse"})]})]})]})]})}function o(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1151:(e,t,s)=>{s.d(t,{Z:()=>c,a:()=>n});var r=s(7294);const i={},d=r.createContext(i);function n(e){const t=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:n(e.components),r.createElement(d.Provider,{value:t},e.children)}}}]);