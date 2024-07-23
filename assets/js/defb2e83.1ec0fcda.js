"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3008],{90892:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>f,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=t(17624),a=t(4552);const r={description:"The default macOS browser",keywords:["browser","apple"]},s="Safari",o={id:"Artifacts/Application Artifacts/safari",title:"Safari",description:"The default macOS browser",source:"@site/docs/Artifacts/Application Artifacts/safari.md",sourceDirName:"Artifacts/Application Artifacts",slug:"/Artifacts/Application Artifacts/safari",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/safari",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Application Artifacts/safari.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,frontMatter:{description:"The default macOS browser",keywords:["browser","apple"]},sidebar:"artemisArtifacts",previous:{title:"OneDrive",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/onedrive"},next:{title:"SQLite",permalink:"/artemis-api/docs/Artifacts/Application Artifacts/sqlite"}},l={},c=[];function d(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"safari",children:"Safari"}),"\n",(0,i.jsxs)(n.p,{children:["Safari is the builtin web browser an Apple devices. artemis supports parsing\nbrowsing history and downloads from Safari. History data is stored in a SQLITE\nfile while downloads data is stored PLIST file and then stored in\n",(0,i.jsx)(n.a,{href:"https://mac-alias.readthedocs.io/en/latest/index.html",children:"Bookmark"})," format"]}),"\n",(0,i.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Any program that read a SQLITE database for History data"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://gist.github.com/l1x/68e206f56bcc22cde3d76cc8fed49f3f",children:"History Schema"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "safari_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "safari-history"\n\n[[artifacts]]\nartifact_name = "safari-downloads"\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"N/A"}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["An array of ",(0,i.jsx)(n.code,{children:"SafariHistory"})," for history data and ",(0,i.jsx)(n.code,{children:"SafariDownloads"})," for downloads\ndata per user."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface SafariHistory {\n  /**Array of history entries */\n  history: RawSafariHistory[];\n  /**Path associated with the history file */\n  path: string;\n  /**User associated with the history file */\n  user: string;\n}\n\n/**\n * An interface representing the Safari SQLITE tables: `history_items` and `history_visits`\n */\nexport interface RawSafariHistory {\n  /**Row ID value */\n  id: number;\n  /**Page URL */\n  url: string;\n  /**Expansion for domain */\n  domain_expansion: string;\n  /**Page visit count */\n  visit_count: number;\n  /**Daily visist in raw bytes */\n  daily_visit_counts: number[];\n  /**Weekly visist in raw bytes */\n  weekly_visit_counts: number[];\n  /**Autocomplete triggers for page */\n  autocomplete_triggers: number[];\n  /**Recompute visits count */\n  should_recompute_derived_visit_counts: number;\n  /**Visit score value */\n  visit_count_score: number;\n  /**Status code value */\n  status_code: number;\n  /**Visit time */\n  visit_time: string;\n  /**Load successful value */\n  load_successful: boolean;\n  /**Page title */\n  title: string;\n  /**Attributes value */\n  attributes: number;\n  /**Score value */\n  score: number;\n}\n\nexport interface SafariDownloads {\n  /**Array of downloads entries */\n  downloads: RawSafariDownloads[];\n  /**Path associated with the downloads file */\n  path: string;\n  /**User associated with the downloads file */\n  user: string;\n}\n\n/**\n * An interface representing Safari downloads data\n */\nexport interface RawSafariDownloads {\n  /**Source URL for download */\n  source_url: string;\n  /**File download path */\n  download_path: string;\n  /**Sandbox ID value */\n  sandbox_id: string;\n  /**Downloaded bytes */\n  download_bytes: number;\n  /**Download ID value */\n  download_id: string;\n  /**Download start date */\n  download_entry_date: string;\n  /**Download finish date in */\n  download_entry_finish: stirng;\n  /**Path to file to run */\n  path: string;\n  /**Path represented as Catalog Node ID */\n  cnid_path: number;\n  /**Created timestamp of target file */\n  created: string;\n  /**Path to the volume of target file */\n  volume_path: string;\n  /**Target file URL type */\n  volume_url: string;\n  /**Name of volume target file is on */\n  volume_name: string;\n  /**Volume UUID */\n  volume_uuid: string;\n  /**Size of target volume in bytes */\n  volume_size: number;\n  /**Created timestamp of volume */\n  volume_created: string;\n  /**Volume Property flags */\n  volume_flag: VolumeFlags[];\n  /**Flag if volume if the root filesystem */\n  volume_root: boolean;\n  /**Localized name of target file */\n  localized_name: string;\n  /**Read-Write security extension of target file */\n  security_extension_rw: string;\n  /**Read-Only security extension of target file */\n  security_extension_ro: string;\n  /**File property flags */\n  target_flags: TargetFlags[];\n  /**Username associated with `Bookmark` */\n  username: string;\n  /**Folder index number associated with target file */\n  folder_index: number;\n  /**UID associated with `LoginItem` */\n  uid: number;\n  /**`LoginItem` creation flags */\n  creation_options: CreationFlags[];\n  /**Is target file executable */\n  is_executable: boolean;\n  /**Does target file have file reference flag */\n  file_ref_flag: boolean;\n}\n"})})]})}function f(e={}){const{wrapper:n}={...(0,a.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},4552:(e,n,t)=>{t.d(n,{I:()=>o,M:()=>s});var i=t(11504);const a={},r=i.createContext(a);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);