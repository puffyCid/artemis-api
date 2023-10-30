"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9064],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(r),d=s,m=p["".concat(c,".").concat(d)]||p[d]||f[d]||a;return r?n.createElement(m,o(o({ref:t},u),{},{components:r})):n.createElement(m,o({ref:t},u))}));function m(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var a=r.length,o=new Array(a);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:s,o[1]=i;for(var l=2;l<a;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8155:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>f,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var n=r(7462),s=(r(7294),r(3905));const a={description:"Users in the SAM Registry file",keywords:["windows","registry","accounts"]},o="Users",i={unversionedId:"Artifacts/Windows Artfacts/users",id:"Artifacts/Windows Artfacts/users",title:"Users",description:"Users in the SAM Registry file",source:"@site/docs/Artifacts/Windows Artfacts/users.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/users",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/users",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/users.md",tags:[],version:"current",frontMatter:{description:"Users in the SAM Registry file",keywords:["windows","registry","accounts"]},sidebar:"artemisArtifacts",previous:{title:"UserAssist",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/userassist"},next:{title:"UsnJrnl",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/usnjrnl"}},c={},l=[],u={toc:l},p="wrapper";function f(e){let{components:t,...r}=e;return(0,s.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"users"},"Users"),(0,s.kt)("p",null,"Gets user info from SAM Registry file"),(0,s.kt)("p",null,"Other Parsers:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Any tool that queries user info")),(0,s.kt)("p",null,"References:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"N/A")),(0,s.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "users_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "users"\n[artifacts.users]\n# Optional\n# alt_drive = \'C\'\n')),(0,s.kt)("h1",{id:"collection-options"},"Collection Options"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"alt_drive")," Expects a single character value. Will use an alternative drive\nletter when parsing the ",(0,s.kt)("inlineCode",{parentName:"li"},"SAM")," file. This configuration is ",(0,s.kt)("strong",{parentName:"li"},"optional"),". By\ndefault artemis will use the ",(0,s.kt)("inlineCode",{parentName:"li"},"%systemdrive%")," value (typically ",(0,s.kt)("inlineCode",{parentName:"li"},"C"),")")),(0,s.kt)("h1",{id:"output-structure"},"Output Structure"),(0,s.kt)("p",null,"An array of ",(0,s.kt)("inlineCode",{parentName:"p"},"UserInfo")," entries"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface UserInfo {\n  /**Last logon for account */\n  last_logon: number;\n  /**Time when password last set in UNIXEPOCH seconds */\n  password_last_set: number;\n  /**Last password failure in UNIXEPOCH seconds */\n  last_password_failure: number;\n  /**Relative ID for account. Typically last number of SID */\n  relative_id: number;\n  /**Primary group ID for account */\n  primary_group_id: number;\n  /**UAC flags associated with account */\n  user_account_control_flags: string[];\n  /**Country code for account */\n  country_code: number;\n  /**Code page for account */\n  code_page: number;\n  /**Number of password failures associated with account */\n  number_password_failures: number;\n  /**Number of logons for account */\n  number_logons: number;\n  /**Username for account */\n  username: string;\n  /**SID for account */\n  sid: string;\n}\n")))}f.isMDXComponent=!0}}]);