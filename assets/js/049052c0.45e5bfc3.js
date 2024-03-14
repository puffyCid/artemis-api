"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2224],{52:(r,i,e)=>{e.r(i),e.d(i,{assets:()=>a,contentTitle:()=>n,default:()=>c,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var t=e(7624),o=e(2172);const s={description:"Interact with Application Artifacts"},n="Applications",l={id:"API/Artifacts/applications",title:"Applications",description:"Interact with Application Artifacts",source:"@site/docs/API/Artifacts/applications.md",sourceDirName:"API/Artifacts",slug:"/API/Artifacts/applications",permalink:"/artemis-api/docs/API/Artifacts/applications",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Artifacts/applications.md",tags:[],version:"current",frontMatter:{description:"Interact with Application Artifacts"},sidebar:"artemisAPI",previous:{title:"Forensic Aritfacts",permalink:"/artemis-api/docs/category/forensic-aritfacts"},next:{title:"Linux",permalink:"/artemis-api/docs/API/Artifacts/linux"}},a={},d=[{value:"getChromiumUsersHistory() -&gt; ChromiumHistory[] | ApplicationError",id:"getchromiumusershistory---chromiumhistory--applicationerror",level:3},{value:"getChromiumHistory(path) -&gt; RawChromiumHistory[] | ApplicationError",id:"getchromiumhistorypath---rawchromiumhistory--applicationerror",level:3},{value:"getChromiumUsersDownloads() -&gt; ChromiumDownloads[] | ApplicationError",id:"getchromiumusersdownloads---chromiumdownloads--applicationerror",level:3},{value:"getChromiumDownloads(path) -&gt; RawChromiumDownloads[] | ApplicationError",id:"getchromiumdownloadspath---rawchromiumdownloads--applicationerror",level:3},{value:"chromiumExtensions(platform) -&gt; Record&lt;string, unknown&gt;[] | ApplicationError",id:"chromiumextensionsplatform---recordstring-unknown--applicationerror",level:3},{value:"getFirefoxUsersHistory() -&gt; FirefoxHistory[] | ApplicationError",id:"getfirefoxusershistory---firefoxhistory--applicationerror",level:3},{value:"getFirefoxHistory(path) -&gt; RawFirefoxHistory[] | ApplicationError",id:"getfirefoxhistorypath---rawfirefoxhistory--applicationerror",level:3},{value:"getFirefoxUsersDownloads() -&gt; FirefoxDownloads[] | ApplicationError",id:"getfirefoxusersdownloads---firefoxdownloads--applicationerror",level:3},{value:"getFirefoxDownloads(path) -&gt; RawFirefoxDownloads[] | ApplicationError",id:"getfirefoxdownloadspath---rawfirefoxdownloads--applicationerror",level:3},{value:"firefoxAddons(platform) -&gt; Record&lt;string, unknown&gt;[] | ApplicationError",id:"firefoxaddonsplatform---recordstring-unknown--applicationerror",level:3},{value:"recentFiles(platform) -&gt; History[] | ApplicationError",id:"recentfilesplatform---history--applicationerror",level:3},{value:"fileHistory(platform) -&gt; FileHistory[] | ApplicationError",id:"filehistoryplatform---filehistory--applicationerror",level:3},{value:"querySqlite(path, query) -&gt; Record&lt;string, unknown&gt;[] | ApplicationError",id:"querysqlitepath-query---recordstring-unknown--applicationerror",level:3},{value:"getFirefoxCookies(platform, path) -&gt; FirefoxCookies[] | ApplicationError",id:"getfirefoxcookiesplatform-path---firefoxcookies--applicationerror",level:3},{value:"getChromiumCookies(platform, path) -&gt; Chromium[] | ApplicationError",id:"getchromiumcookiesplatform-path---chromium--applicationerror",level:3}];function h(r){const i={h1:"h1",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.M)(),...r.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"applications",children:"Applications"}),"\n",(0,t.jsx)(i.p,{children:"These functions can be used to pull data related to common third-party software"}),"\n",(0,t.jsx)(i.h3,{id:"getchromiumusershistory---chromiumhistory--applicationerror",children:"getChromiumUsersHistory() -> ChromiumHistory[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Return Chromium history for all users"}),"\n",(0,t.jsx)(i.h3,{id:"getchromiumhistorypath---rawchromiumhistory--applicationerror",children:"getChromiumHistory(path) -> RawChromiumHistory[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Parse the Chromium History sqlite file at provided path. Will parse locked\nsqlite files."}),"\n",(0,t.jsx)(i.p,{children:"All Chromium derived browsers should be supported."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Chromium History file"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"getchromiumusersdownloads---chromiumdownloads--applicationerror",children:"getChromiumUsersDownloads() -> ChromiumDownloads[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Return Chromium downloads for all users"}),"\n",(0,t.jsx)(i.h3,{id:"getchromiumdownloadspath---rawchromiumdownloads--applicationerror",children:"getChromiumDownloads(path) -> RawChromiumDownloads[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Parse the Chromium History sqlite file at provided path for downloads. Will\nparse locked sqlite files."}),"\n",(0,t.jsx)(i.p,{children:"All Chromium derived browsers should be supported."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Chromium History file"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"chromiumextensionsplatform---recordstring-unknown--applicationerror",children:"chromiumExtensions(platform) -> Record<string, unknown>[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Parse all Chromium extensions (manifest.json files) for all users. Returns array\nJSON objects."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"platform"}),(0,t.jsx)(i.td,{children:"PlatformType"}),(0,t.jsx)(i.td,{children:"OS platform to parse. Supports Windows and macOS (Darwin)"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"getfirefoxusershistory---firefoxhistory--applicationerror",children:"getFirefoxUsersHistory() -> FirefoxHistory[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Return Firefox history for all users"}),"\n",(0,t.jsx)(i.h3,{id:"getfirefoxhistorypath---rawfirefoxhistory--applicationerror",children:"getFirefoxHistory(path) -> RawFirefoxHistory[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Get Firefox history from provided places.sqlite file. Will parse locked sqlite\nfiles."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Chromium History file"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"getfirefoxusersdownloads---firefoxdownloads--applicationerror",children:"getFirefoxUsersDownloads() -> FirefoxDownloads[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Return Firefox downloads for all users"}),"\n",(0,t.jsx)(i.h3,{id:"getfirefoxdownloadspath---rawfirefoxdownloads--applicationerror",children:"getFirefoxDownloads(path) -> RawFirefoxDownloads[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Get Firefox downloads from provided places.sqlite file. Will parse locked sqlite\nfiles."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Chromium History file"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"firefoxaddonsplatform---recordstring-unknown--applicationerror",children:"firefoxAddons(platform) -> Record<string, unknown>[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Parse all Firefox addons (addons.json files) for all users. Returns array JSON\nobjects."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"platform"}),(0,t.jsx)(i.td,{children:"PlatformType"}),(0,t.jsx)(i.td,{children:"OS platform to parse. Supports Windows and macOS (Darwin)"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"recentfilesplatform---history--applicationerror",children:"recentFiles(platform) -> History[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Return a list of files opened by LibreOffice for all users."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"platform"}),(0,t.jsx)(i.td,{children:"PlatformType"}),(0,t.jsx)(i.td,{children:"OS platform to parse"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"filehistoryplatform---filehistory--applicationerror",children:"fileHistory(platform) -> FileHistory[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Parse the local file history for VSCode. Returns list of history entries. Also\nsupports VSCodium."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsx)(i.tbody,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"platform"}),(0,t.jsx)(i.td,{children:"PlatformType"}),(0,t.jsx)(i.td,{children:"OS platform to parse"})]})})]}),"\n",(0,t.jsx)(i.h3,{id:"querysqlitepath-query---recordstring-unknown--applicationerror",children:"querySqlite(path, query) -> Record<string, unknown>[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Execute a SQLITe query against a provided database file. Databases are opened in\nread-only mode. In addition, this function will bypass locked SQLITE databases."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Path to the sqlite db"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"query"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Query to execute against the sqlite db"})]})]})]}),"\n",(0,t.jsx)(i.h3,{id:"getfirefoxcookiesplatform-path---firefoxcookies--applicationerror",children:"getFirefoxCookies(platform, path) -> FirefoxCookies[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Get Firefox cookies for all users based on platform. Can also provide an\noptional alternative path to the Cookie sqlite database instead"}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"platform"}),(0,t.jsx)(i.td,{children:"PlatformType"}),(0,t.jsx)(i.td,{children:"OS platform to parse. Supports Windows and macOS (Darwin)"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Optional path to a Firefox cookie database"})]})]})]}),"\n",(0,t.jsx)(i.h3,{id:"getchromiumcookiesplatform-path---chromium--applicationerror",children:"getChromiumCookies(platform, path) -> Chromium[] | ApplicationError"}),"\n",(0,t.jsx)(i.p,{children:"Get Chromium cookies for all users based on platform. Can also provide an\noptional alternative path to the Cookie sqlite database instead."}),"\n",(0,t.jsx)(i.p,{children:"All Chromium derived browsers should be supported."}),"\n",(0,t.jsxs)(i.table,{children:[(0,t.jsx)(i.thead,{children:(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.th,{children:"Param"}),(0,t.jsx)(i.th,{children:"Type"}),(0,t.jsx)(i.th,{children:"Description"})]})}),(0,t.jsxs)(i.tbody,{children:[(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"platform"}),(0,t.jsx)(i.td,{children:"PlatformType"}),(0,t.jsx)(i.td,{children:"OS platform to parse. Supports Windows and macOS (Darwin)"})]}),(0,t.jsxs)(i.tr,{children:[(0,t.jsx)(i.td,{children:"path"}),(0,t.jsx)(i.td,{children:"string"}),(0,t.jsx)(i.td,{children:"Optional path to a Chromium cookie database"})]})]})]})]})}function c(r={}){const{wrapper:i}={...(0,o.M)(),...r.components};return i?(0,t.jsx)(i,{...r,children:(0,t.jsx)(h,{...r})}):h(r)}},2172:(r,i,e)=>{e.d(i,{I:()=>l,M:()=>n});var t=e(1504);const o={},s=t.createContext(o);function n(r){const i=t.useContext(s);return t.useMemo((function(){return"function"==typeof r?r(i):{...i,...r}}),[i,r])}function l(r){let i;return i=r.disableParentContext?"function"==typeof r.components?r.components(o):r.components||o:n(r.components),t.createElement(s.Provider,{value:i},r.children)}}}]);