"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3568],{23854:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>n,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"API/Artifacts/macos","title":"macOS","description":"Interact with macOS Artifacts","source":"@site/docs/API/Artifacts/macos.md","sourceDirName":"API/Artifacts","slug":"/API/Artifacts/macos","permalink":"/artemis-api/docs/API/Artifacts/macos","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/macos.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"Interact with macOS Artifacts"},"sidebar":"artemisAPI","previous":{"title":"Linux","permalink":"/artemis-api/docs/API/Artifacts/linux"},"next":{"title":"Unix","permalink":"/artemis-api/docs/API/Artifacts/unix"}}');var i=r(74848),a=r(28453);const n={description:"Interact with macOS Artifacts"},l="macOS",o={},d=[{value:"getUsers(path) -&gt; Users[] | MacosError",id:"getuserspath---users--macoserror",level:3},{value:"getGroup(path) -&gt; Groups[] | MacosError",id:"getgrouppath---groups--macoserror",level:3},{value:"parseAlias(data) -&gt; Alias | MacosError",id:"parsealiasdata---alias--macoserror",level:3},{value:"getEmond(path) -&gt; Emond[] | MacosError",id:"getemondpath---emond--macoserror",level:3},{value:"getExecpolicy(path) -&gt; ExecPolicy[] | MacosError",id:"getexecpolicypath---execpolicy--macoserror",level:3},{value:"firewallStatus(alt_path) -&gt; Firewall | MacosError",id:"firewallstatusalt_path---firewall--macoserror",level:3},{value:"getFsevents(path) -&gt; Fsevents[] | MacosError",id:"getfseventspath---fsevents--macoserror",level:3},{value:"getLaunchdDaemons() -&gt; Launchd[] | MacosError",id:"getlaunchddaemons---launchd--macoserror",level:3},{value:"getLaunchdAgents() -&gt; Launchd[] | MacosError",id:"getlaunchdagents---launchd--macoserror",level:3},{value:"getLoginitems(path) -&gt; LoginItems[] | MacosError",id:"getloginitemspath---loginitems--macoserror",level:3},{value:"getMacho(path) -&gt; MachoInfo[] | MacosError",id:"getmachopath---machoinfo--macoserror",level:3},{value:"getPlist(path or Uint8Array) -&gt; Record&lt;string, unknown&gt; | Uint8Array | Record&lt;string, unknown&gt;[] | MacosError",id:"getplistpath-or-uint8array---recordstring-unknown--uint8array--recordstring-unknown--macoserror",level:3},{value:"passwordPolicy(alt_path) -&gt; PasswordPolicy[] | MacosError",id:"passwordpolicyalt_path---passwordpolicy--macoserror",level:3},{value:"getSafariUsersHistory() -&gt; SafariHistory[] | MacosError",id:"getsafariusershistory---safarihistory--macoserror",level:3},{value:"getSafariHistory(path) -&gt; RawSafariHistory[] | MacosError",id:"getsafarihistorypath---rawsafarihistory--macoserror",level:3},{value:"getSafariUsersDownloads() -&gt; SafariDownloads[] | MacosError",id:"getsafariusersdownloads---safaridownloads--macoserror",level:3},{value:"getSafariDownloads(path) -&gt; RawSafariDownloads[] | MacosError",id:"getsafaridownloadspath---rawsafaridownloads--macoserror",level:3},{value:"getUnifiedLog(path, archive_path) -&gt; UnifiedLog[] | MacosError",id:"getunifiedlogpath-archive_path---unifiedlog--macoserror",level:3},{value:"parseRequirementBlob(data) -&gt; SingleRequirement | MacosError",id:"parserequirementblobdata---singlerequirement--macoserror",level:3},{value:"listApps() -&gt; Applications[] | MacosError",id:"listapps---applications--macoserror",level:3},{value:"scanApps() -&gt; Applications[] | MacosError",id:"scanapps---applications--macoserror",level:3},{value:"dockTiles() -&gt; Applications[] | MacosError",id:"docktiles---applications--macoserror",level:3},{value:"getPackages(glob_path) -&gt; HomebrewReceipt[]",id:"getpackagesglob_path---homebrewreceipt",level:3},{value:"getCasks(glob_path) -&gt; HomebrewFormula[]",id:"getcasksglob_path---homebrewformula",level:3},{value:"getHomebrewInfo() -&gt; HomebrewData",id:"gethomebrewinfo---homebrewdata",level:3},{value:"wifiNetworks() -&gt; Wifi[]",id:"wifinetworks---wifi",level:3},{value:"getSudoLogs() -&gt; UnifiedLog[]",id:"getsudologs---unifiedlog",level:3},{value:"parseBom(path) -&gt; Bom",id:"parsebompath---bom",level:3},{value:"systemExtensions(alt_path) -&gt; SystemExtension[]",id:"systemextensionsalt_path---systemextension",level:3},{value:"queryTccDb(alt_db) -&gt; TccValues[] | MacosError",id:"querytccdbalt_db---tccvalues--macoserror",level:3},{value:"setupSpotlightParser(glob_path) -&gt; StoreMeta | MacosError",id:"setupspotlightparserglob_path---storemeta--macoserror",level:3},{value:"getSpotlight(meta, store_file, offset) -&gt; StoreMeta | MacosError",id:"getspotlightmeta-store_file-offset---storemeta--macoserror",level:3},{value:"getXprotectDefinitions(alt_path) -&gt; XprotectEntries[] | MacosError",id:"getxprotectdefinitionsalt_path---xprotectentries--macoserror",level:3},{value:"luluRules(alt_path) -&gt; LuluRules | MacosError",id:"lulurulesalt_path---lulurules--macoserror",level:3},{value:"munkiApplicationUsage(db) -&gt; MunkiApplicationUsage[] | MacosError",id:"munkiapplicationusagedb---munkiapplicationusage--macoserror",level:3},{value:"quarantineEvents(alt_file) -&gt; MacosQuarantine[] | MacosError",id:"quarantineeventsalt_file---macosquarantine--macoserror",level:3},{value:"parseBiome(app_focus_only, alt_file) -&gt; Biome[]",id:"parsebiomeapp_focus_only-alt_file---biome",level:3},{value:"gatekeeperEntries(db) -&gt; GatekeeperEntries[] | MacosError",id:"gatekeeperentriesdb---gatekeeperentries--macoserror",level:3},{value:"logonsMacos(path, archive_path) -&gt; LogonMacos[] | MacosError",id:"logonsmacospath-archive_path---logonmacos--macoserror",level:3},{value:"parseCookies(path) -&gt; Cookie[] | MacosError",id:"parsecookiespath---cookie--macoserror",level:3}];function c(e){const t={a:"a",br:"br",code:"code",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"macos",children:"macOS"})}),"\n",(0,i.jsx)(t.p,{children:"These functions can be used to pull data related to macOS artifacts"}),"\n",(0,i.jsx)(t.h3,{id:"getuserspath---users--macoserror",children:"getUsers(path) -> Users[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return all local users on macOS sysem. Can provide an optional alternative path\nto directory containing users. Otherwise will use default path on system\n/var/db/dslocal/nodes/Default/users"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional alternative path to users directory"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getgrouppath---groups--macoserror",children:"getGroup(path) -> Groups[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return all local groups on macOS sysem. Can provide an optional alternative path\nto directory containing groups. Otherwise will use default path on system\n/var/db/dslocal/nodes/Default/groups"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional alternative path to groups directory"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"parsealiasdata---alias--macoserror",children:"parseAlias(data) -> Alias | MacosError"}),"\n",(0,i.jsxs)(t.p,{children:["Parse macOS ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Alias_(Mac_OS)",children:"alias"})," data. Alias\nfiles are a legacy shortcut format. May be encountered in plist files such as\nthe firewall plist file."]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"data"}),(0,i.jsx)(t.td,{children:"Uint8Array"}),(0,i.jsx)(t.td,{children:"Raw alias bytes"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getemondpath---emond--macoserror",children:"getEmond(path) -> Emond[] | MacosError"}),"\n",(0,i.jsxs)(t.p,{children:["Get all ",(0,i.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/macOS%20Artifacts/emond",children:"Emond"})," rules on macOS. FYI\nEmond was removed on Ventura. Can provide an optional alternative path to\ndirectory containing emond rules. Otherwise will parse emond config on system to\ntry to find rules"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Optional alternative path to emond rules"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getexecpolicypath---execpolicy--macoserror",children:"getExecpolicy(path) -> ExecPolicy[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse the ExecPolicy sqlite database on macOS. Can provide an optional\nalternative path to ExecPolicy database. Otherwise will parse default database\non system at /var/db/SystemPolicyConfiguration/ExecPolicy"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Optional alternative path to ExecPolicy database"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"firewallstatusalt_path---firewall--macoserror",children:"firewallStatus(alt_path) -> Firewall | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return firewall information and status on macOS. Can provide an optional path to\ncom.apple.alf.plist, otherwise will use /Library/Preferences/com.apple.alf.plist"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Alternative full path to the com.apple.alf.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getfseventspath---fsevents--macoserror",children:"getFsevents(path) -> Fsevents[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse macOS FsEvents from provided file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Full path to the FsEvents file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getlaunchddaemons---launchd--macoserror",children:"getLaunchdDaemons() -> Launchd[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return all Launch daemons on macOS"}),"\n",(0,i.jsx)(t.h3,{id:"getlaunchdagents---launchd--macoserror",children:"getLaunchdAgents() -> Launchd[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return all Launch agents on macOS"}),"\n",(0,i.jsx)(t.h3,{id:"getloginitemspath---loginitems--macoserror",children:"getLoginitems(path) -> LoginItems[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return all LoginItems on macOS. Can provide an optional alternative path to a\nLoginItem file (.btm). Otherwise will parse default default locations for\nLoginItems"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Optional alternative path to LoginItem file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getmachopath---machoinfo--macoserror",children:"getMacho(path) -> MachoInfo[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse a macho file and return metadata about the binary."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to macho binary"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getplistpath-or-uint8array---recordstring-unknown--uint8array--recordstring-unknown--macoserror",children:"getPlist(path or Uint8Array) -> Record<string, unknown> | Uint8Array | Record<string, unknown>[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse a plist file. Supports parsing a provide plist file path or the raw bytes\nof plist data. Sometimes a plist file may contain another base64 encoded plist.\nThis function can parse the raw plist bytes."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path or Uint8Array"}),(0,i.jsx)(t.td,{children:"string or Uint8Array"}),(0,i.jsx)(t.td,{children:"Path to plist file or raw plist bytes"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"passwordpolicyalt_path---passwordpolicy--macoserror",children:"passwordPolicy(alt_path) -> PasswordPolicy[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Get password policies on macOS. Will parse plist file at\n/var/db/dslocal/nodes/Default/config/shadowhash.plist. You may also provide an\noptional alternative path to the shadowhash.plist file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Optional alternative path to shadowhash.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getsafariusershistory---safarihistory--macoserror",children:"getSafariUsersHistory() -> SafariHistory[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return Safari history for all users"}),"\n",(0,i.jsx)(t.h3,{id:"getsafarihistorypath---rawsafarihistory--macoserror",children:"getSafariHistory(path) -> RawSafariHistory[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse Safari history from provided History.db sqlite file. Supports locked\nfiles."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to History.db file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getsafariusersdownloads---safaridownloads--macoserror",children:"getSafariUsersDownloads() -> SafariDownloads[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return Safari downloads for all users"}),"\n",(0,i.jsx)(t.h3,{id:"getsafaridownloadspath---rawsafaridownloads--macoserror",children:"getSafariDownloads(path) -> RawSafariDownloads[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse Safari history from provided Downloads.plist file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to Downloads.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getunifiedlogpath-archive_path---unifiedlog--macoserror",children:"getUnifiedLog(path, archive_path) -> UnifiedLog[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse a single UnifiedLog file (.tracev3) on macOS. Typically found at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/private/var/db/diagnostics/Persist"}),"\n",(0,i.jsx)(t.li,{children:"/private/var/db/diagnostics/Signpost"}),"\n",(0,i.jsx)(t.li,{children:"/private/var/db/diagnostics/HighVolume"}),"\n",(0,i.jsx)(t.li,{children:"/private/var/db/diagnostics/Special"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also specify an optional logarchive style directory containing the\nUnified Log metadata (UUID directories, timesync, and dsc directory). Otherwise\nartemis will parse their default locations."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to .tracev3 file"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"archive_path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to a logarchive style directory containing Unified Log metadata"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"parserequirementblobdata---singlerequirement--macoserror",children:"parseRequirementBlob(data) -> SingleRequirement | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse the Requirement Blob from raw codesigning bytes. This part of Apple's\nCodeSigning framework. This data can be found in macho binaries and also plist\nfiles."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"data"}),(0,i.jsx)(t.td,{children:"Uint8Array"}),(0,i.jsx)(t.td,{children:"Raw bytes associated with requirement blob"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"listapps---applications--macoserror",children:"listApps() -> Applications[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Return a simple Application listing. Searches user installed Apps, System Apps,\ndefault Homebrew paths:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/usr/local/Cellar"}),"\n",(0,i.jsx)(t.li,{children:"/opt/homebrew/Cellar"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Use scanApps() if you want to scan the entire filesystem for Apps"}),"\n",(0,i.jsx)(t.h3,{id:"scanapps---applications--macoserror",children:"scanApps() -> Applications[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Scans the entire filesystem under /System/ and tries to parse all Applications."}),"\n",(0,i.jsx)(t.p,{children:"Includes embedded Apps, Frameworks, and any file that ends with\n%/Contents/Info.plist"}),"\n",(0,i.jsx)(t.p,{children:"Use listApps() if you a simpler Application listing"}),"\n",(0,i.jsx)(t.h3,{id:"docktiles---applications--macoserror",children:"dockTiles() -> Applications[] | MacosError"}),"\n",(0,i.jsxs)(t.p,{children:["Scans the entire filesystem under /System looking for Applications that use\nDockTile persistence. See ",(0,i.jsx)(t.a,{href:"https://theevilbit.github.io/beyond/beyond_0032/",children:"https://theevilbit.github.io/beyond/beyond_0032/"})," for\ndetails on Dock Tile PlugIns"]}),"\n",(0,i.jsx)(t.p,{children:"Includes embedded Apps, Frameworks, and any file that ends with\n%/Contents/Info.plist"}),"\n",(0,i.jsx)(t.h3,{id:"getpackagesglob_path---homebrewreceipt",children:"getPackages(glob_path) -> HomebrewReceipt[]"}),"\n",(0,i.jsxs)(t.p,{children:["Get Homebrew packages on the system. Does ",(0,i.jsx)(t.strong,{children:"not"})," include Casks.",(0,i.jsx)(t.br,{}),"\n","Use getHomebrewInfo() to get all packages and Casks."]}),"\n",(0,i.jsx)(t.p,{children:"By default this function will search for all packages at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/opt/homebrew/Cellar"}),"\n",(0,i.jsx)(t.li,{children:"/usr/local/Cellar"}),"\n"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"glob_path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional alternative glob path to use"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getcasksglob_path---homebrewformula",children:"getCasks(glob_path) -> HomebrewFormula[]"}),"\n",(0,i.jsxs)(t.p,{children:["Get Homebrew Casks on the system. Does ",(0,i.jsx)(t.strong,{children:"not"})," include packages.",(0,i.jsx)(t.br,{}),"\n","Use getHomebrewInfo() to get all packages and Casks."]}),"\n",(0,i.jsx)(t.p,{children:"By default this function will search for all packages at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/opt/homebrew/Caskroom"}),"\n",(0,i.jsx)(t.li,{children:"/usr/local/Caskroom"}),"\n"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"glob_path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional alternative glob path to use"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"gethomebrewinfo---homebrewdata",children:"getHomebrewInfo() -> HomebrewData"}),"\n",(0,i.jsx)(t.p,{children:"Get Homebrew packages and Casks on the system. Searches for Homebrew data at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/opt/homebrew"}),"\n",(0,i.jsx)(t.li,{children:"/usr/local"}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"wifinetworks---wifi",children:"wifiNetworks() -> Wifi[]"}),"\n",(0,i.jsx)(t.p,{children:"Get list of joined Wifi networks on macOS. Requires root access."}),"\n",(0,i.jsx)(t.p,{children:"By default it will try to parse WiFi networks at\n/Library/Preferences/com.apple.wifi.known-networks.plist."}),"\n",(0,i.jsx)(t.p,{children:"You may also provide an optional alnternative path to\ncom.apple.wifi.known-networks.plist."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Optional alternative path to com.apple.wifi.known-networks.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getsudologs---unifiedlog",children:"getSudoLogs() -> UnifiedLog[]"}),"\n",(0,i.jsx)(t.p,{children:"Parse the UnifiedLogs and extract entries related to sudo activity."}),"\n",(0,i.jsx)(t.h3,{id:"parsebompath---bom",children:"parseBom(path) -> Bom"}),"\n",(0,i.jsxs)(t.p,{children:["Parse Bill of Materials (BOM) files. BOM files are created whenever the macOS\nInstaller is used to install an application.",(0,i.jsx)(t.br,{}),"\n","BOM files track what files were created by the Installer. It is commonly used to\nensure files are removed when the application is uninstalled. This function will\nalso try to parse the plist receipt associated with the BOM file (if found in\nsame directory)."]}),"\n",(0,i.jsx)(t.p,{children:"BOM files are located at /var/db/receipts/*.bom"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to BOM file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"systemextensionsalt_path---systemextension",children:"systemExtensions(alt_path) -> SystemExtension[]"}),"\n",(0,i.jsx)(t.p,{children:"Get list of macOS System Extensions. By default artemis will try to extract\ninstalled extensions at /Library/SystemExtensions/db.plist."}),"\n",(0,i.jsx)(t.p,{children:"However, you may also provide an optional alternative path to db.plist."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_path"}),(0,i.jsx)(t.td,{children:"String"}),(0,i.jsx)(t.td,{children:"Optional alternative path to db.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"querytccdbalt_db---tccvalues--macoserror",children:"queryTccDb(alt_db) -> TccValues[] | MacosError"}),"\n",(0,i.jsxs)(t.p,{children:["Query all TCC.db files on the system. TCC.db contains granted permissions for\napplications.",(0,i.jsx)(t.br,{}),"\n","An optional path to the TCC.db can be provided. Otherwise will parse all user\nand System TCC.db files."]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_db"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to TCC.db file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"setupspotlightparserglob_path---storemeta--macoserror",children:"setupSpotlightParser(glob_path) -> StoreMeta | MacosError"}),"\n",(0,i.jsxs)(t.p,{children:["Collect and setup the required data needed to parse the macOS Spotlight\ndatabase.",(0,i.jsx)(t.br,{}),"\n","This function must be called before a user can parse the Spotlight database\nusing the JS API."]}),"\n",(0,i.jsxs)(t.p,{children:["The glob_path should point to the directory containing the Spotlight database\nfiles.",(0,i.jsx)(t.br,{}),"\n","The primary Spotlight database can be found at:\n/System/Volumes/Data/.Spotlight-V100/Store-V*/*/*",(0,i.jsx)(t.br,{}),"\n","Would return something like:\n/System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/*"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"glob_path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Glob path to a directory containing the Spotlight Database files"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"getspotlightmeta-store_file-offset---storemeta--macoserror",children:"getSpotlight(meta, store_file, offset) -> StoreMeta | MacosError"}),"\n",(0,i.jsxs)(t.p,{children:["Parse the macOS Spotlight database. The database can potentially return a large\namount of data (5+GBs).",(0,i.jsx)(t.br,{}),"\n","To prevent excessive memory usage, this function will parse the database in\nblocks (chunks)."]}),"\n",(0,i.jsxs)(t.p,{children:["It will parse ",(0,i.jsx)(t.strong,{children:"10"})," blocks at a time before returning the results. The\n",(0,i.jsx)(t.code,{children:"StoreMeta"})," value obtaind from setupSpotlightParser, contains the ",(0,i.jsx)(t.strong,{children:"TOTAL"}),"\namount of blocks in the Spotlight database! You must loop through the blocks and\ntrack what block offset the parser should start at!"]}),"\n",(0,i.jsxs)(t.p,{children:["If you want to the parser to start at the beginning of the Spotlight database,\nprovide an offset of zero (0). Once the parser returns data, your next offset\nwill now be ten (10) because it parsed ",(0,i.jsx)(t.strong,{children:"10"})," blocks starting at zero (0-9)."]}),"\n",(0,i.jsxs)(t.p,{children:["Finally, you must provide the full path to the Spotlight database file\n(store.db). This is typically found in in the directory provided to\n",(0,i.jsx)(t.code,{children:"setupSpotlightParser"}),(0,i.jsx)(t.br,{}),"\n","(ex:\n/System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/store.db)"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"meta"}),(0,i.jsx)(t.td,{children:"StoreMeta"}),(0,i.jsx)(t.td,{children:"Spotlight metadata obtained from setupSpotlightParser"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"store_file"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Full path to the store.db file"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"offset"}),(0,i.jsx)(t.td,{children:"number"}),(0,i.jsx)(t.td,{children:"Offset to start parsing the Spotlight database"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"getxprotectdefinitionsalt_path---xprotectentries--macoserror",children:"getXprotectDefinitions(alt_path) -> XprotectEntries[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Grab Xprotect definitions on macOS. By default artemis will check for\nXprotect.plist files at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/Xprotect.plist"}),"\n",(0,i.jsx)(t.li,{children:"/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Xprotect.plist"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also provide an optional alternative path to the Xprotect.plist file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to Xprotect.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"lulurulesalt_path---lulurules--macoserror",children:"luluRules(alt_path) -> LuluRules | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Grab LuLu rules on macOS. By default artemis will check for rule.plist file at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/Library/Objective-See/LuLu/rules.plist"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also provide an optional alternative path to the rules.plist file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_file"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to rules.plist file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"munkiapplicationusagedb---munkiapplicationusage--macoserror",children:"munkiApplicationUsage(db) -> MunkiApplicationUsage[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Grab application usage tracked by Munki on macOS. By default artemis will check\nfor application_usage.sqlite file at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/Library/Managed Installs/application_usage.sqlite"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also provide an optional alternative path to the\napplication_usage.sqlite file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"db"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to application_usage.sqlite file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"quarantineeventsalt_file---macosquarantine--macoserror",children:"quarantineEvents(alt_file) -> MacosQuarantine[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Grab quarantine events tracked by macOS. By default artemis will check for\nquarantine events for all users file at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/Users/*/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also provide an optional alternative path to the\ncom.apple.LaunchServices.QuarantineEventsV2 file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_file"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to com.apple.LaunchServices.QuarantineEventsV2 file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"parsebiomeapp_focus_only-alt_file---biome",children:"parseBiome(app_focus_only, alt_file) -> Biome[]"}),"\n",(0,i.jsx)(t.p,{children:"Parse a Biome files and try to extract data. By default artemis will only parse\nApp.InFocus files located at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/Users/*/Library/Biome/streams/*/*/local/*"}),"\n",(0,i.jsx)(t.li,{children:"/Users/*/Library/Biome/streams/*/*/local/tombstone/*"}),"\n",(0,i.jsx)(t.li,{children:"/private/var/db/biome/streams/*/*/local/*"}),"\n",(0,i.jsx)(t.li,{children:"/private/var/db/biome/streams/*/*/local/tombstone/*"}),"\n"]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"app_focus_only"}),(0,i.jsx)(t.td,{children:"boolean"}),(0,i.jsxs)(t.td,{children:["Only parse App.InFocus files. Default is ",(0,i.jsx)(t.strong,{children:"true"})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"alt_file"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to an alternative Biome file"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"gatekeeperentriesdb---gatekeeperentries--macoserror",children:"gatekeeperEntries(db) -> GatekeeperEntries[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Grab Gatekeeper entries on macOS. By default artemis will parse the sqlite\ndatabase at:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/var/db/SystemPolicy"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also provide an optional alternative path to the SystemPolicy file."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"db"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to SystemPolicy file"})]})})]}),"\n",(0,i.jsx)(t.h3,{id:"logonsmacospath-archive_path---logonmacos--macoserror",children:"logonsMacos(path, archive_path) -> LogonMacos[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Extract Logon entries from UnifiedLog files (.tracev3) on macOS. Typically found\nat:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"/private/var/db/diagnostics/Special"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"You may also specify an optional logarchive style directory containing the\nUnified Log metadata (UUID directories, timesync, and dsc directory). Otherwise\nartemis will parse their default locations."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to .tracev3 file"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"archive_path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Optional path to a logarchive style directory containing Unified Log metadata"})]})]})]}),"\n",(0,i.jsx)(t.h3,{id:"parsecookiespath---cookie--macoserror",children:"parseCookies(path) -> Cookie[] | MacosError"}),"\n",(0,i.jsx)(t.p,{children:"Parse binary Safri cookie at provided path."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Param"}),(0,i.jsx)(t.th,{children:"Type"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"path"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:"Path to binary cookie file"})]})})]})]})}function h(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},28453:(e,t,r)=>{r.d(t,{R:()=>n,x:()=>l});var s=r(96540);const i={},a=s.createContext(i);function n(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:n(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);