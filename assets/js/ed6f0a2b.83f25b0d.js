"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5858],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var a=i.createContext({}),c=function(e){var t=i.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return i.createElement(a.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,a=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),u=r,g=d["".concat(a,".").concat(u)]||d[u]||m[u]||l;return n?i.createElement(g,o(o({ref:t},p),{},{components:n})):i.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=u;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s[d]="string"==typeof e?e:r,o[1]=s;for(var c=2;c<l;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9338:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var i=n(7462),r=(n(7294),n(3905));const l={sidebar_position:2,description:"Custom Filelisting"},o="File Listings",s={unversionedId:"Intro/Collections/Examples/file_listings",id:"Intro/Collections/Examples/file_listings",title:"File Listings",description:"Custom Filelisting",source:"@site/docs/Intro/Collections/Examples/file_listings.md",sourceDirName:"Intro/Collections/Examples",slug:"/Intro/Collections/Examples/file_listings",permalink:"/artemis-api/docs/Intro/Collections/Examples/file_listings",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Collections/Examples/file_listings.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"Custom Filelisting"},sidebar:"artemisStart",previous:{title:"Execution",permalink:"/artemis-api/docs/Intro/Collections/Examples/execution"},next:{title:"Live Response",permalink:"/artemis-api/docs/Intro/Collections/Examples/live_response"}},a={},c=[],p={toc:c},d="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"file-listings"},"File Listings"),(0,r.kt)("p",null,"Windows TOML collection looking for all files created in the last 14 days"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "recent_files"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\nfilter_name = "recently_created_files"\n# This script will take the search artifact below and filter it to only return files that were created in the past 14 days\nfilter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgdGltZV9ub3cgPSBuZXcgRGF0ZSgpOwogIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHRpbWVfbm93LmdldFRpbWUoKTsKICBjb25zdCBzZWNvbmRzID0gbWlsbGlzZWNvbmRzIC8gMWUzOwogIGNvbnN0IGZvdXJ0ZWVuX2RheXMgPSAxMjA5NjAwOwogIGNvbnN0IGVhcmxpZXN0X3N0YXJ0ID0gc2Vjb25kcyAtIGZvdXJ0ZWVuX2RheXM7CiAgY29uc3QgZmlsdGVyX2RhdGEgPSBbXTsKICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRhdGEpIHsKICAgIGlmIChlbnRyeS5jcmVhdGVkIDwgZWFybGllc3Rfc3RhcnQpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBmaWx0ZXJfZGF0YS5wdXNoKGVudHJ5KTsKICB9CiAgcmV0dXJuIGZpbHRlcl9kYXRhOwp9Cm1haW4oKTsK"\n\n[[artifacts]]\nartifact_name = "files" # Name of artifact\nfilter = true\n[artifacts.files]\nstart_path = "C:\\\\" # Start of file listing\ndepth = 100 # How many sub directories to descend\n')),(0,r.kt)("p",null,"macOS TOML collection looking for all files created in the last 14 days"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "recent_files"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\nfilter_name = "recently_created_files"\n# This script will take the search artifact below and filter it to only return files that were created in the past 14 days\nfilter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgdGltZV9ub3cgPSBuZXcgRGF0ZSgpOwogIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHRpbWVfbm93LmdldFRpbWUoKTsKICBjb25zdCBzZWNvbmRzID0gbWlsbGlzZWNvbmRzIC8gMWUzOwogIGNvbnN0IGZvdXJ0ZWVuX2RheXMgPSAxMjA5NjAwOwogIGNvbnN0IGVhcmxpZXN0X3N0YXJ0ID0gc2Vjb25kcyAtIGZvdXJ0ZWVuX2RheXM7CiAgY29uc3QgZmlsdGVyX2RhdGEgPSBbXTsKICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRhdGEpIHsKICAgIGlmIChlbnRyeS5jcmVhdGVkIDwgZWFybGllc3Rfc3RhcnQpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBmaWx0ZXJfZGF0YS5wdXNoKGVudHJ5KTsKICB9CiAgcmV0dXJuIGZpbHRlcl9kYXRhOwp9Cm1haW4oKTsK"\n\n[[artifacts]]\nartifact_name = "files" # Name of artifact\nfilter = true\n[artifacts.files]\nstart_path = "/" # Start of file listing\ndepth = 100 # How many sub directories to descend\n')))}m.isMDXComponent=!0}}]);