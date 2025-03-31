"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8906],{348:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Artifacts/macOS Artifacts/emond","title":"Emond","description":"Emond jobs on macOS","source":"@site/docs/Artifacts/macOS Artifacts/emond.md","sourceDirName":"Artifacts/macOS Artifacts","slug":"/Artifacts/macOS Artifacts/emond","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/emond","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/macOS Artifacts/emond.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"Emond jobs on macOS","keywords":["macOS","persistence","plaintext"]},"sidebar":"artemisArtifacts","previous":{"title":"Dock Tiles","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/docktile"},"next":{"title":"ExecPolicy","permalink":"/artemis-api/docs/Artifacts/macOS Artifacts/execpolicy"}}');var i=t(74848),r=t(28453);const a={description:"Emond jobs on macOS",keywords:["macOS","persistence","plaintext"]},o="Emond",c={},d=[];function l(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"emond",children:"Emond"})}),"\n",(0,i.jsxs)(n.p,{children:["macOS Event Monitor Daemon (",(0,i.jsx)(n.code,{children:"Emond"}),') is a srvices that allows users to register\nrules to perform actions when specific events are triggered, for example "system\nstartup". ',(0,i.jsx)(n.code,{children:"Emond"})," can be leveraged to acheive persistence on macOS. Starting on\nmacOS Ventura (13) ",(0,i.jsx)(n.code,{children:"emond"})," has been removed."]}),"\n",(0,i.jsx)(n.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"None"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://magnusviri.com/what-is-emond.html",children:"What is emond"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.xorrior.com/emond-persistence/",children:"Emond for Persistence"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "emond_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "emond"\n[artifacts.emond]\n# Optional\n# alt_path = ""\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"alt_path"}),"Use an alternative path to the Emond files. This configuration is\n",(0,i.jsx)(n.strong,{children:"optional"}),". By default artemis will read the Emond config file to determine\nfile paths"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["An array of ",(0,i.jsx)(n.code,{children:"Emond"})," entries"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export interface Emond {\n  /**Name of `Emond` rule */\n  name: string;\n  /**Is rule enabled */\n  enabled: boolean;\n  /**Event types associated with the rule */\n  event_types: string[];\n  /**Start time of the rule */\n  start_tiem: string;\n  /**If partial criteria match should trigger the rule */\n  allow_partial_criterion_match: boolean;\n  /**Array of commad actions if rule is triggered */\n  command_actions: Command[];\n  /**Array of log actions if rule is triggered  */\n  log_actions: Log[];\n  /**Array of send email actions if rule is triggered */\n  send_email_actions: SendEmailSms[];\n  /**Array of send sms actions if rule is triggered. Has same structure as send email */\n  send_sms_actions: SendEmailSms[];\n  /**Criteria for the `Emond` rule */\n  criterion: Record<string, unknown>[];\n  /**Variables associated with the criterion  */\n  variables: Record<string, unknown>[];\n  /**If the emond client is enabled */\n  emond_clients_enabled: boolean;\n  /**Emond plist created  */\n  plist_created: string;\n  /**Emond plist modified  */\n  plist_modifed: string;\n  /**Emond plist changed  */\n  plist_changed: string;\n  /**Emond plist accessed  */\n  plist_accessed: string;\n}\n\n/**\n * Commands to execute if rule is triggered\n */\ninterface Command {\n  /**Command name */\n  command: string;\n  /**User associated with command */\n  user: string;\n  /**Group associated with command */\n  group: string;\n  /**Arguments associated with command */\n  arguments: string[];\n}\n\n/**\n * Log settings if rule is triggered\n */\ninterface Log {\n  /**Log message content */\n  message: string;\n  /**Facility associated with log action */\n  facility: string;\n  /**Level of log */\n  log_level: string;\n  /**Log type */\n  log_type: string;\n  /**Parameters associated with log action */\n  parameters: Record<string, unknown>;\n}\n\n/**\n * Email or SMS to send if rule is triggered\n */\ninterface SendEmailSms {\n  /**Content of the email/sms */\n  message: string;\n  /**Subject of the email/sms */\n  subject: string;\n  /**Path to local binary */\n  localization_bundle_path: string;\n  /**Remote URL to send the message */\n  relay_host: string;\n  /**Email associated with email/sms action */\n  admin_email: string;\n  /**Targerts to receive email/sms */\n  recipient_addresses: string[];\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var s=t(96540);const i={},r=s.createContext(i);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);