"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1019],{9625:(r,e,i)=>{i.r(e),i.d(e,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>n,toc:()=>c});var o=i(5893),t=i(1151);const s={description:"Interact with Application Artifacts"},l="Applications",n={id:"API/Artifacts/applications",title:"Applications",description:"Interact with Application Artifacts",source:"@site/docs/API/Artifacts/applications.md",sourceDirName:"API/Artifacts",slug:"/API/Artifacts/applications",permalink:"/artemis-api/docs/API/Artifacts/applications",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/applications.md",tags:[],version:"current",frontMatter:{description:"Interact with Application Artifacts"},sidebar:"artemisAPI",previous:{title:"Forensic Aritfacts",permalink:"/artemis-api/docs/category/forensic-aritfacts"},next:{title:"Linux",permalink:"/artemis-api/docs/API/Artifacts/linux"}},d={},c=[{value:"getChromiumUsersHistory() -&gt; <code>ChromiumHistory[] | ApplicationError</code>",id:"getchromiumusershistory---chromiumhistory--applicationerror",level:3},{value:"getChromiumHistory(path) -&gt; <code>RawChromiumHistory[] | ApplicationError</code>",id:"getchromiumhistorypath---rawchromiumhistory--applicationerror",level:3},{value:"getChromiumUsersDownloads() -&gt; <code>ChromiumDownloads[] | ApplicationError</code>",id:"getchromiumusersdownloads---chromiumdownloads--applicationerror",level:3},{value:"getChromiumDownloads(path) -&gt; <code>RawChromiumDownloads[] | ApplicationError</code>",id:"getchromiumdownloadspath---rawchromiumdownloads--applicationerror",level:3},{value:"chromiumExtensions(platform) -&gt; <code>Record&lt;string, object&gt;[] | ApplicationError</code>",id:"chromiumextensionsplatform---recordstring-object--applicationerror",level:3},{value:"getFirefoxUsersHistory() -&gt; <code>FirefoxHistory[] | ApplicationError</code>",id:"getfirefoxusershistory---firefoxhistory--applicationerror",level:3},{value:"getFirefoxHistory(path) -&gt; <code>RawFirefoxHistory[] | ApplicationError</code>",id:"getfirefoxhistorypath---rawfirefoxhistory--applicationerror",level:3},{value:"getFirefoxUsersDownloads() -&gt; <code>FirefoxDownloads[] | ApplicationError</code>",id:"getfirefoxusersdownloads---firefoxdownloads--applicationerror",level:3},{value:"getFirefoxDownloads(path) -&gt; <code>RawFirefoxDownloads[] | ApplicationError</code>",id:"getfirefoxdownloadspath---rawfirefoxdownloads--applicationerror",level:3},{value:"firefoxAddons(platform) -&gt; <code>Record&lt;string, object&gt;[] | ApplicationError</code>",id:"firefoxaddonsplatform---recordstring-object--applicationerror",level:3},{value:"recentFiles(platform) -&gt; <code>History[] | ApplicationError</code>",id:"recentfilesplatform---history--applicationerror",level:3},{value:"fileHistory(platform) -&gt; <code>FileHistory[] | ApplicationError</code>",id:"filehistoryplatform---filehistory--applicationerror",level:3}];function a(r){const e={code:"code",h1:"h1",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.a)(),...r.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{id:"applications",children:"Applications"}),"\n",(0,o.jsx)(e.p,{children:"These functions can be used to pull data related to common third-party software"}),"\n",(0,o.jsxs)(e.h3,{id:"getchromiumusershistory---chromiumhistory--applicationerror",children:["getChromiumUsersHistory() -> ",(0,o.jsx)(e.code,{children:"ChromiumHistory[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Return Chromium history for all users"}),"\n",(0,o.jsxs)(e.h3,{id:"getchromiumhistorypath---rawchromiumhistory--applicationerror",children:["getChromiumHistory(path) -> ",(0,o.jsx)(e.code,{children:"RawChromiumHistory[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Parse the Chromium History sqlite file at provided path. Will parse locked\nsqlite files."}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"path"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"string"})}),(0,o.jsx)(e.td,{children:"Chromium History file"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"getchromiumusersdownloads---chromiumdownloads--applicationerror",children:["getChromiumUsersDownloads() -> ",(0,o.jsx)(e.code,{children:"ChromiumDownloads[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Return Chromium downloads for all users"}),"\n",(0,o.jsxs)(e.h3,{id:"getchromiumdownloadspath---rawchromiumdownloads--applicationerror",children:["getChromiumDownloads(path) -> ",(0,o.jsx)(e.code,{children:"RawChromiumDownloads[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Parse the Chromium History sqlite file at provided path for downloads. Will\nparse locked sqlite files."}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"path"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"string"})}),(0,o.jsx)(e.td,{children:"Chromium History file"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"chromiumextensionsplatform---recordstring-object--applicationerror",children:["chromiumExtensions(platform) -> ",(0,o.jsx)(e.code,{children:"Record<string, object>[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Parse all Chromium extensions (manifest.json files) for all users. Returns array\nJSON objects."}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"platform"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"PlatformType"})}),(0,o.jsx)(e.td,{children:"OS platform to parse. Supports Windows and macOS (Darwin)"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"getfirefoxusershistory---firefoxhistory--applicationerror",children:["getFirefoxUsersHistory() -> ",(0,o.jsx)(e.code,{children:"FirefoxHistory[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Return Firefox history for all users"}),"\n",(0,o.jsxs)(e.h3,{id:"getfirefoxhistorypath---rawfirefoxhistory--applicationerror",children:["getFirefoxHistory(path) -> ",(0,o.jsx)(e.code,{children:"RawFirefoxHistory[] | ApplicationError"})]}),"\n",(0,o.jsxs)(e.p,{children:["Get Firefox history from provided ",(0,o.jsx)(e.code,{children:"places.sqlite"})," file. Will parse locked sqlite\nfiles."]}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"path"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"string"})}),(0,o.jsx)(e.td,{children:"Chromium History file"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"getfirefoxusersdownloads---firefoxdownloads--applicationerror",children:["getFirefoxUsersDownloads() -> ",(0,o.jsx)(e.code,{children:"FirefoxDownloads[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Return Firefox downloads for all users"}),"\n",(0,o.jsxs)(e.h3,{id:"getfirefoxdownloadspath---rawfirefoxdownloads--applicationerror",children:["getFirefoxDownloads(path) -> ",(0,o.jsx)(e.code,{children:"RawFirefoxDownloads[] | ApplicationError"})]}),"\n",(0,o.jsxs)(e.p,{children:["Get Firefox downloads from provided ",(0,o.jsx)(e.code,{children:"places.sqlite"})," file. Will parse locked\nsqlite files."]}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"path"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"string"})}),(0,o.jsx)(e.td,{children:"Chromium History file"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"firefoxaddonsplatform---recordstring-object--applicationerror",children:["firefoxAddons(platform) -> ",(0,o.jsx)(e.code,{children:"Record<string, object>[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Parse all Firefox addons (addons.json files) for all users. Returns array JSON\nobjects."}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"platform"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"PlatformType"})}),(0,o.jsx)(e.td,{children:"OS platform to parse. Supports Windows and macOS (Darwin)"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"recentfilesplatform---history--applicationerror",children:["recentFiles(platform) -> ",(0,o.jsx)(e.code,{children:"History[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Return a list of files opened by LibreOffice for all users."}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"platform"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"PlatformType"})}),(0,o.jsx)(e.td,{children:"OS platform to parse"})]})})]}),"\n",(0,o.jsxs)(e.h3,{id:"filehistoryplatform---filehistory--applicationerror",children:["fileHistory(platform) -> ",(0,o.jsx)(e.code,{children:"FileHistory[] | ApplicationError"})]}),"\n",(0,o.jsx)(e.p,{children:"Parse the local file history for VSCode. Returns list of history entries. Also\nsupports VSCodium."}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Param"}),(0,o.jsx)(e.th,{children:"Type"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsx)(e.tbody,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:"platform"}),(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"PlatformType"})}),(0,o.jsx)(e.td,{children:"OS platform to parse"})]})})]})]})}function h(r={}){const{wrapper:e}={...(0,t.a)(),...r.components};return e?(0,o.jsx)(e,{...r,children:(0,o.jsx)(a,{...r})}):a(r)}},1151:(r,e,i)=>{i.d(e,{Z:()=>n,a:()=>l});var o=i(7294);const t={},s=o.createContext(t);function l(r){const e=o.useContext(s);return o.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function n(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(t):r.components||t:l(r.components),o.createElement(s.Provider,{value:e},r.children)}}}]);