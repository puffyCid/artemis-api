"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2011],{90494:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=t(74848),r=t(28453);const s={description:"System Resource Utilization Monitor (SRUM) tracks application usage",keywords:["windows","ese"]},a="SRUM",o={id:"Artifacts/Windows Artfacts/srum",title:"SRUM",description:"System Resource Utilization Monitor (SRUM) tracks application usage",source:"@site/docs/Artifacts/Windows Artfacts/srum.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/srum",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/srum",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/srum.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,frontMatter:{description:"System Resource Utilization Monitor (SRUM) tracks application usage",keywords:["windows","ese"]},sidebar:"artemisArtifacts",previous:{title:"Shortcuts",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shortcuts"},next:{title:"SystemInfo",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/systeminfo"}},c={},d=[];function u(n){const e={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"srum",children:"SRUM"})}),"\n",(0,i.jsxs)(e.p,{children:["Windows System Resource Utilization Monitor (",(0,i.jsx)(e.code,{children:"SRUM"}),") is a service that tracks\napplication resource usage. The service tracks application data such as time\nrunning, bytes sent, bytes received, energy usage, and lots more.",(0,i.jsx)("br",{})," This\nservice was introduced in Windows 8 and is stored in an ESE database at\n",(0,i.jsx)(e.code,{children:"C:\\Windows\\System32\\sru\\SRUDB.dat"}),". On Windows 8 some of the data can be found\nin the Registry too (temporary storage before writing to SRUDB.dat), but in\nlater versions of Windows the data is no longer in the Registry."]}),"\n",(0,i.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.velociraptor.app/artifact_references/pages/windows.forensics.srum/",children:"Velociraptor"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://ericzimmerman.github.io/#!index.md",children:"SRUMECmd"})}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"References:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/libyal/esedb-kb/blob/main/documentation/System%20Resource%20Usage%20Monitor%20(SRUM).asciidoc",children:"Libyal"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://velociraptor.velocidex.com/digging-into-the-system-resource-usage-monitor-srum-afbadb1a375",children:"Velociraptor"})}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "srum_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "srum"\n[artifacts.srum]\n# Optional\n# alt_path = "C:\\Windows\\System32\\srum\\SRUDB.dat"\n'})}),"\n",(0,i.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"alt_path"})," An alternative path to the ",(0,i.jsx)(e.code,{children:"SRUM"})," ESE database. This configuration\nis ",(0,i.jsx)(e.strong,{children:"optional"}),". By default artemis will use\n",(0,i.jsx)(e.code,{children:"%systemdrive%\\Windows\\System32\\srum\\SRUDB.dat"})]}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(e.p,{children:["An array of entries based on each ",(0,i.jsx)(e.code,{children:"SRUM"})," table"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with application executions `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}`\n */\nexport interface ApplicationInfo {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Foreground Cycle time for application */\n  foreground_cycle_time: number;\n  /**Background Cycle time for application */\n  background_cycle_time: number;\n  /**Facetime for application */\n  facetime: number;\n  /**Count of foreground context switches */\n  foreground_context_switches: number;\n  /**Count of background context switches */\n  background_context_switches: number;\n  /**Count of foreground bytes read */\n  foreground_bytes_read: number;\n  /**Count of background bytes read */\n  foreground_bytes_written: number;\n  /**Count of foreground read operations */\n  foreground_num_read_operations: number;\n  /**Count of foreground write operations */\n  foreground_num_write_options: number;\n  /**Count of foreground flushes */\n  foreground_number_of_flushes: number;\n  /**Count of background bytes read */\n  background_bytes_read: number;\n  /**Count of background write operations */\n  background_bytes_written: number;\n  /**Count of background read operations */\n  background_num_read_operations: number;\n  /**Count of background write operations */\n  background_num_write_operations: number;\n  /**Count of background flushes */\n  background_number_of_flushes: number;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with the timeline of an application's execution `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}`\n */\nexport interface ApplicationTimeline {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Flags associated with entry */\n  flags: number;\n  /**End time of entry */\n  end_time: string;\n  /**Duration of timeline in microseconds */\n  duration_ms: number;\n  /**Span of timeline in microseconds */\n  span_ms: number;\n  /**Timeline end for entry */\n  timeline_end: number;\n  /**In focus value for entry */\n  in_focus_timeline: number;\n  /**User input value for entry */\n  user_input_timeline: number;\n  /**Comp rendered value for entry */\n  comp_rendered_timeline: number;\n  /**Comp dirtied value for entry */\n  comp_dirtied_timeline: number;\n  /**Comp propagated value for entry */\n  comp_propagated_timeline: number;\n  /**Audio input value for entry */\n  audio_in_timeline: number;\n  /**Audio output value for entry */\n  audio_out_timeline: number;\n  /**CPU value for entry */\n  cpu_timeline: number;\n  /**Disk value for entry */\n  disk_timeline: number;\n  /**Network value for entry */\n  network_timeline: number;\n  /**MBB value for entry */\n  mbb_timeline: number;\n  /**In focus seconds count */\n  in_focus_s: number;\n  /**PSM foreground seconds count */\n  psm_foreground_s: number;\n  /**User input seconds count */\n  user_input_s: number;\n  /**Comp rendered seconds count */\n  comp_rendered_s: number;\n  /**Comp dirtied seconds count */\n  comp_dirtied_s: number;\n  /**Comp propagated seconds count */\n  comp_propagated_s: number;\n  /**Audio input seconds count */\n  audio_in_s: number;\n  /**Audio output seconds count */\n  audio_out_s: number;\n  /**Cycles value for entry */\n  cycles: number;\n  /**Cycles breakdown value for entry */\n  cycles_breakdown: number;\n  /**Cycles attribute value for entry */\n  cycles_attr: number;\n  /**Cycles attribute breakdown for entry */\n  cycles_attr_breakdown: number;\n  /**Cycles WOB value for entry */\n  cycles_wob: number;\n  /**Cycles WOB breakdown value for entry */\n  cycles_wob_breakdown: number;\n  /**Disk raw value for entry */\n  disk_raw: number;\n  /**Network tail raw value for entry */\n  network_tail_raw: number;\n  /**Network bytes associated with entry*/\n  network_bytes_raw: number;\n  /**MBB tail raw value for entry */\n  mbb_tail_raw: number;\n  /**MBB bytes associated with entry */\n  mbb_bytes_raw: number;\n  /**Display required seconds count */\n  display_required_s: number;\n  /**Display required timeline value for entry */\n  display_required_timeline: number;\n  /**Keyboard input timeline value for entry */\n  keyboard_input_timeline: number;\n  /**Keyboard input seconds count */\n  keyboard_input_s: number;\n  /**Mouse input seconds count */\n  mouse_input_s: number;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with VFU `{7ACBBAA3-D029-4BE4-9A7A-0885927F1D8F}`. Unsure what this tracks.\n */\nexport interface AppVfu {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Flags associated with VFU entry */\n  flags: number;\n  /**Start time associated with VFU entry */\n  start_time: string;\n  /**End time associated with VFU entry */\n  end_time: string;\n  /**Base64 encoded usage data associated with VFU entry */\n  usage: string;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with EnergyInfo `{DA73FB89-2BEA-4DDC-86B8-6E048C6DA477}`\n */\nexport interface EnergyInfo {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Base64 encoded binary data associated with EnergyInfo entry */\n  binary_data: string;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with EnergyUsage `{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}` and `{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}LT`\n */\nexport interface EnergyUsage {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Event Timestamp */\n  event_timestamp: string;\n  /**State transition associated with entry */\n  state_transition: number;\n  /**Full charged capacity associated with entry */\n  full_charged_capacity: number;\n  /**Designed capacity associated with entry */\n  designed_capacity: number;\n  /** Charge level associated with entry */\n  charge_level: number;\n  /**Cycle count associated with entry */\n  cycle_count: number;\n  /**Configuration hash associated with entry */\n  configuration_hash: number;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with NetworkInfo `{973F5D5C-1D90-4944-BE8E-24B94231A174}`\n */\nexport interface NetworkInfo {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Interface luid associated with entry */\n  interface_luid: number;\n  /**L2 profile ID associated with entry */\n  l2_profile_id: number;\n  /**L2 profile flags associated with entry */\n  l2_profile_flags: number;\n  /**Bytes sent associated with entry */\n  bytes_sent: number;\n  /**Bytes received associated with entry */\n  bytes_recvd: number;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with NetworkConnectivityInfo `{DD6636C4-8929-4683-974E-22C046A43763}`\n */\nexport interface NetworkConnectivityInfo {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Interface luid associated with entry */\n  interface_luid: number;\n  /**L2 profile ID associated with entry */\n  l2_profile_id: number;\n  /**Connected time associated with entry */\n  connected_time: number;\n  /*Connect start time associated with entry*/\n  connect_start_time: string;\n  /**L2 profile flags associated with entry */\n  l2_profile_flags: number;\n}\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"/**\n * SRUM table associated with NotificationInfo `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}`\n */\nexport interface NotificationInfo {\n  /**ID in for row in the ESE table */\n  auto_inc_id: number;\n  /**Timestamp when ESE table was updated */\n  timestamp: string;\n  /**Application name */\n  app_id: string;\n  /**SID associated with the application process */\n  user_id: string;\n  /**Notification type associated with entry */\n  notification_type: number;\n  /**Size of payload associated with entry */\n  payload_size: number;\n  /**Network type associated with entry */\n  network_type: number;\n}\n"})})]})}function l(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>a,x:()=>o});var i=t(96540);const r={},s=i.createContext(r);function a(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:a(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);