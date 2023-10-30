"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[7377],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},m=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=c(n),y=a,f=p["".concat(l,".").concat(y)]||p[y]||d[y]||i;return n?r.createElement(f,s(s({ref:t},m),{},{components:n})):r.createElement(f,s({ref:t},m))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,s=new Array(i);s[0]=y;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:a,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},5582:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const i={description:"The Windows Search database",keywords:["windows","ese","sqlite"]},s="Search",o={unversionedId:"Artifacts/Windows Artfacts/search",id:"Artifacts/Windows Artfacts/search",title:"Search",description:"The Windows Search database",source:"@site/docs/Artifacts/Windows Artfacts/search.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/search",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/search",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/search.md",tags:[],version:"current",frontMatter:{description:"The Windows Search database",keywords:["windows","ese","sqlite"]},sidebar:"artemisArtifacts",previous:{title:"Registry",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/registry"},next:{title:"Services",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/services"}},l={},c=[],m={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"search"},"Search"),(0,a.kt)("p",null,"Windows ",(0,a.kt)("inlineCode",{parentName:"p"},"Search")," is an indexing service for tracking files and content on\nWindows."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Search")," can parse a large amount of metadata (properties) for each entry it\nindexes. It has almost 600 different types of properties it can parse. It can\neven index part of the contents of a file."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Search")," can index large parts of the file system, so parsing the ",(0,a.kt)("inlineCode",{parentName:"p"},"Search"),"\ndatabase can provide a partial file listing of the system. ",(0,a.kt)("inlineCode",{parentName:"p"},"Search")," is disabled\non Windows Servers and starting on newer versions of Windows 11 it can be stored\nin three (3) SQLITE databases (previously was a single ESE database)",(0,a.kt)("br",null)," The\n",(0,a.kt)("inlineCode",{parentName:"p"},"Search")," database can get extremely large (4GB+ sizes have been seen). The\nlarger the ESE database the more resources artemis needs to parse the\ndata.",(0,a.kt)("br",null)," Similar to the filelisting artifact, every 100k entries artemis will\noutput the data and then continue."),(0,a.kt)("p",null,"Other parsers:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/strozfriedberg/sidr"},"sidr")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/moaistory/WinSearchDBAnalyzer"},"WinSearchDBAnalyzer")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/libyal/libesedb"},"libesedb"))),(0,a.kt)("p",null,"References:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/libyal/esedb-kb/blob/main/documentation/Windows%20Search.asciidoc"},"libyal")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Windows_Search"},"Windows Search"))),(0,a.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "search_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "search"\n[artifacts.search]\n# Optional\n# alt_path = "C:\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows\\Windows.edb"\n')),(0,a.kt)("h1",{id:"collection-options"},"Collection Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"alt_path")," An alternative path to the ",(0,a.kt)("inlineCode",{parentName:"li"},"Search")," ESE or SQLITE database. This\nconfiguration is ",(0,a.kt)("strong",{parentName:"li"},"optional"),". By default artemis will use\n",(0,a.kt)("inlineCode",{parentName:"li"},"%systemdrive%\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows\\Windows.edb"))),(0,a.kt)("h1",{id:"output-structure"},"Output Structure"),(0,a.kt)("p",null,"An array of ",(0,a.kt)("inlineCode",{parentName:"p"},"SearchEntry")," entries"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'export interface SearchEntry {\n  /**Index ID for row */\n  document_id: number;\n  /**Search entry name */\n  entry: string;\n  /**Search entry last modified in UNIXEPOCH seconds */\n  last_modified: number;\n  /**\n   * JSON object representing the properties associated with the entry\n   *\n   * Example:\n   * ```\n   * "properties": {\n            "3-System_ItemFolderNameDisplay": "Programs",\n            "4429-System_IsAttachment": "0",\n            "4624-System_Search_AccessCount": "0",\n            "4702-System_VolumeId": "08542f90-0000-0000-0000-501f00000000",\n            "17F-System_DateAccessed": "k8DVxD162QE=",\n            "4392-System_FileExtension": ".lnk",\n            "4631F-System_Search_GatherTime": "7B6taj962QE=",\n            "5-System_ItemTypeText": "Shortcut",\n            "4184-System_ComputerName": "DESKTOP-EIS938N",\n            "15F-System_DateModified": "EVHzDyR22QE=",\n            "4434-System_IsFolder": "0",\n            "4365-System_DateImported": "ABKRqWyI1QE=",\n            "4637-System_Search_Store": "file",\n            "4373-System_Document_DateSaved": "EVHzDyR22QE=",\n            "4448-System_ItemPathDisplayNarrow": "Firefox (C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs)",\n            "4559-System_NotUserContent": "0",\n            "33-System_ItemUrl": "file:C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Firefox.lnk",\n            "4447-System_ItemPathDisplay": "C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs\\\\Firefox.lnk",\n            "13F-System_Size": "7QMAAAAAAAA=",\n            "4441-System_ItemFolderPathDisplayNarrow": "Programs (C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu)",\n            "0-InvertedOnlyPids": "cBFzESgSZRI=",\n            "4443-System_ItemNameDisplay": "Firefox.lnk",\n            "4442-System_ItemName": "Firefox.lnk",\n            "14F-System_FileAttributes": "32",\n            "4403-System_FolderNameDisplay": "Cygwin",\n            "4565-System_ParsingName": "Firefox.lnk",\n            "4456-System_Kind": "bGluawBwcm9ncmFt",\n            "27F-System_Search_Rank": "707406378",\n            "16F-System_DateCreated": "UUZNqWyI1QE=",\n            "4440-System_ItemFolderPathDisplay": "C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs",\n            "4397-System_FilePlaceholderStatus": "6",\n            "4465-System_Link_TargetParsingPath": "C:\\\\Program Files\\\\Mozilla Firefox\\\\firefox.exe",\n            "4431-System_IsEncrypted": "0",\n            "4457-System_KindText": "Link; Program",\n            "4444-System_ItemNameDisplayWithoutExtension": "Firefox",\n            "11-System_FileName": "Firefox.lnk",\n            "4623-System_SFGAOFlags": "1078002039",\n            "0F-InvertedOnlyMD5": "z1gPcor92OaNVyAAzRdOsw==",\n            "4371-System_Document_DateCreated": "ABKRqWyI1QE=",\n            "4633-System_Search_LastIndexedTotalTime": "0.03125",\n            "4396-System_FileOwner": "Administrators",\n            "4438-System_ItemDate": "ABKRqWyI1QE=",\n            "4466-System_Link_TargetSFGAOFlags": "1077936503",\n            "4450-System_ItemType": ".lnk",\n            "4678-System_ThumbnailCacheId": "DzpSS6gn5yg="\n        }\n   * ```\n   */\n  properties: Record<string, string>;\n}\n')))}d.isMDXComponent=!0}}]);