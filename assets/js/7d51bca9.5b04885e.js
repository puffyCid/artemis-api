"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5555],{28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>o});var s=n(96540);const r={},a=s.createContext(r);function i(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:t},e.children)}},29404:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Artifacts/Windows Artfacts/search","title":"Search","description":"The Windows Search database","source":"@site/docs/Artifacts/Windows Artfacts/search.md","sourceDirName":"Artifacts/Windows Artfacts","slug":"/Artifacts/Windows Artfacts/search","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/search","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/search.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"The Windows Search database","keywords":["windows","ese","sqlite"]},"sidebar":"artemisArtifacts","previous":{"title":"Registry","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/registry"},"next":{"title":"Service Installs","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/serviceinstall"}}');var r=n(74848),a=n(28453);const i={description:"The Windows Search database",keywords:["windows","ese","sqlite"]},o="Search",c={},d=[];function l(e){const t={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"search",children:"Search"})}),"\n",(0,r.jsxs)(t.p,{children:["Windows ",(0,r.jsx)(t.code,{children:"Search"})," is an indexing service for tracking files and content on\nWindows."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"Search"})," can parse a large amount of metadata (properties) for each entry it\nindexes. It has almost 600 different types of properties it can parse. It can\neven index part of the contents of a file."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"Search"})," can index large parts of the file system, so parsing the ",(0,r.jsx)(t.code,{children:"Search"}),"\ndatabase can provide a partial file listing of the system. ",(0,r.jsx)(t.code,{children:"Search"})," is disabled\non Windows Servers and starting on newer versions of Windows 11 it can be stored\nin three (3) SQLITE databases (previously was a single ESE database)."]}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"Search"})," database can get extremely large (4GB+ sizes have been seen). The\nlarger the ESE database the more resources artemis needs to parse the data."]}),"\n",(0,r.jsx)(t.p,{children:"Similar to the filelisting artifact, every 100k entries artemis will output the\ndata and then continue."}),"\n",(0,r.jsx)(t.p,{children:"Other parsers:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/strozfriedberg/sidr",children:"sidr"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/moaistory/WinSearchDBAnalyzer",children:"WinSearchDBAnalyzer"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/libyal/libesedb",children:"libesedb"})}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"References:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://github.com/libyal/esedb-kb/blob/main/documentation/Windows%20Search.asciidoc",children:"libyal"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Windows_Search",children:"Windows Search"})}),"\n"]}),"\n",(0,r.jsx)(t.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "search_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "search"\n[artifacts.search]\n# Optional\n# alt_path = "C:\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows\\Windows.edb"\n'})}),"\n",(0,r.jsx)(t.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"alt_path"})," An alternative path to the ",(0,r.jsx)(t.code,{children:"Search"})," ESE or SQLITE database. This\nconfiguration is ",(0,r.jsx)(t.strong,{children:"optional"}),". By default artemis will use\n",(0,r.jsx)(t.code,{children:"%systemdrive%\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows\\Windows.edb"})]}),"\n"]}),"\n",(0,r.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,r.jsxs)(t.p,{children:["An array of ",(0,r.jsx)(t.code,{children:"SearchEntry"})," entries"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:'export interface SearchEntry {\n  /**Index ID for row */\n  document_id: number;\n  /**Search entry name */\n  entry: string;\n  /**Search entry last modified */\n  last_modified: string;\n  /**\n   * JSON object representing the properties associated with the entry\n   *\n   * Example:\n   * ```\n   * "properties": {\n            "3-System_ItemFolderNameDisplay": "Programs",\n            "4429-System_IsAttachment": "0",\n            "4624-System_Search_AccessCount": "0",\n            "4702-System_VolumeId": "08542f90-0000-0000-0000-501f00000000",\n            "17F-System_DateAccessed": "k8DVxD162QE=",\n            "4392-System_FileExtension": ".lnk",\n            "4631F-System_Search_GatherTime": "7B6taj962QE=",\n            "5-System_ItemTypeText": "Shortcut",\n            "4184-System_ComputerName": "DESKTOP-EIS938N",\n            "15F-System_DateModified": "EVHzDyR22QE=",\n            "4434-System_IsFolder": "0",\n            "4365-System_DateImported": "ABKRqWyI1QE=",\n            "4637-System_Search_Store": "file",\n            "4373-System_Document_DateSaved": "EVHzDyR22QE=",\n            "4448-System_ItemPathDisplayNarrow": "Firefox (C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs)",\n            "4559-System_NotUserContent": "0",\n            "33-System_ItemUrl": "file:C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Firefox.lnk",\n            "4447-System_ItemPathDisplay": "C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs\\\\Firefox.lnk",\n            "13F-System_Size": "7QMAAAAAAAA=",\n            "4441-System_ItemFolderPathDisplayNarrow": "Programs (C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu)",\n            "0-InvertedOnlyPids": "cBFzESgSZRI=",\n            "4443-System_ItemNameDisplay": "Firefox.lnk",\n            "4442-System_ItemName": "Firefox.lnk",\n            "14F-System_FileAttributes": "32",\n            "4403-System_FolderNameDisplay": "Cygwin",\n            "4565-System_ParsingName": "Firefox.lnk",\n            "4456-System_Kind": "bGluawBwcm9ncmFt",\n            "27F-System_Search_Rank": "707406378",\n            "16F-System_DateCreated": "UUZNqWyI1QE=",\n            "4440-System_ItemFolderPathDisplay": "C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs",\n            "4397-System_FilePlaceholderStatus": "6",\n            "4465-System_Link_TargetParsingPath": "C:\\\\Program Files\\\\Mozilla Firefox\\\\firefox.exe",\n            "4431-System_IsEncrypted": "0",\n            "4457-System_KindText": "Link; Program",\n            "4444-System_ItemNameDisplayWithoutExtension": "Firefox",\n            "11-System_FileName": "Firefox.lnk",\n            "4623-System_SFGAOFlags": "1078002039",\n            "0F-InvertedOnlyMD5": "z1gPcor92OaNVyAAzRdOsw==",\n            "4371-System_Document_DateCreated": "ABKRqWyI1QE=",\n            "4633-System_Search_LastIndexedTotalTime": "0.03125",\n            "4396-System_FileOwner": "Administrators",\n            "4438-System_ItemDate": "ABKRqWyI1QE=",\n            "4466-System_Link_TargetSFGAOFlags": "1077936503",\n            "4450-System_ItemType": ".lnk",\n            "4678-System_ThumbnailCacheId": "DzpSS6gn5yg="\n        }\n   * ```\n   */\n  properties: Record<string, string>;\n}\n'})})]})}function h(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}}}]);