"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[231],{3517:(s,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"Artifacts/Windows Artfacts/users","title":"Users","description":"Users in the SAM Registry file","source":"@site/docs/Artifacts/Windows Artfacts/users.md","sourceDirName":"Artifacts/Windows Artfacts","slug":"/Artifacts/Windows Artfacts/users","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/users","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/users.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Users in the SAM Registry file","keywords":["windows","registry","accounts"]},"sidebar":"artemisArtifacts","previous":{"title":"UserAssist","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/userassist"},"next":{"title":"UsnJrnl","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/usnjrnl"}}');var r=n(4848),i=n(8453);const o={description:"Users in the SAM Registry file",keywords:["windows","registry","accounts"]},a="Users",c={},l=[];function d(s){const e={code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...s.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"users",children:"Users"})}),"\n",(0,r.jsx)(e.p,{children:"Gets user info from SAM Registry file"}),"\n",(0,r.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Any tool that queries user info"}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"References:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"N/A"}),"\n"]}),"\n",(0,r.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "users_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "users-windows"\n[artifacts.users_windows]\n# Optional\n# alt_file = "C:\\\\Artifacts\\\\SAM"\n'})}),"\n",(0,r.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"alt_file"})," Full path to alternative SAM Registry file. This configuration is\n",(0,r.jsx)(e.strong,{children:"optional"}),". By default artemis will parse the SAM Registry file at its\ndefault location."]}),"\n"]}),"\n",(0,r.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(e.p,{children:["An array of ",(0,r.jsx)(e.code,{children:"UserInfo"})," entries"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-typescript",children:"export interface UserInfo {\n  /**Last logon for account */\n  last_logon: string;\n  /**Time when password last set */\n  password_last_set: string;\n  /**Last password failure */\n  last_password_failure: string;\n  /**Relative ID for account. Typically last number of SID */\n  relative_id: number;\n  /**Primary group ID for account */\n  primary_group_id: number;\n  /**UAC flags associated with account */\n  user_account_control_flags: string[];\n  /**Country code for account */\n  country_code: number;\n  /**Code page for account */\n  code_page: number;\n  /**Number of password failures associated with account */\n  number_password_failures: number;\n  /**Number of logons for account */\n  number_logons: number;\n  /**Username for account */\n  username: string;\n  /**SID for account */\n  sid: string;\n}\n"})})]})}function u(s={}){const{wrapper:e}={...(0,i.R)(),...s.components};return e?(0,r.jsx)(e,{...s,children:(0,r.jsx)(d,{...s})}):d(s)}},8453:(s,e,n)=>{n.d(e,{R:()=>o,x:()=>a});var t=n(6540);const r={},i=t.createContext(r);function o(s){const e=t.useContext(i);return t.useMemo((function(){return"function"==typeof s?s(e):{...e,...s}}),[e,s])}function a(s){let e;return e=s.disableParentContext?"function"==typeof s.components?s.components(r):s.components||r:o(s.components),t.createElement(i.Provider,{value:e},s.children)}}}]);