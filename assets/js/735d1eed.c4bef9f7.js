"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2678],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=n.createContext({}),c=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),m=a,f=u["".concat(o,".").concat(m)]||u[m]||d[m]||i;return r?n.createElement(f,l(l({ref:t},p),{},{components:r})):n.createElement(f,l({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=m;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[u]="string"==typeof e?e:a,l[1]=s;for(var c=2;c<i;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1927:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const i={description:"List of directories accessed by Windows Explorer",keywords:["windows","registry"]},l="Shellbags",s={unversionedId:"Artifacts/Windows Artfacts/shellbags",id:"Artifacts/Windows Artfacts/shellbags",title:"Shellbags",description:"List of directories accessed by Windows Explorer",source:"@site/docs/Artifacts/Windows Artfacts/shellbags.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/shellbags",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shellbags",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/shellbags.md",tags:[],version:"current",frontMatter:{description:"List of directories accessed by Windows Explorer",keywords:["windows","registry"]},sidebar:"artemisArtifacts",previous:{title:"Services",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/services"},next:{title:"Shimcache",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shimcache"}},o={},c=[],p={toc:c},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"shellbags"},"Shellbags"),(0,a.kt)("p",null,"Windows ",(0,a.kt)("inlineCode",{parentName:"p"},"Shellbags")," are ",(0,a.kt)("inlineCode",{parentName:"p"},"Registry")," entries that track what directories a user\nhas browsed via Explorer GUI. These entries are stored in the undocumented\n",(0,a.kt)("inlineCode",{parentName:"p"},"ShellItem")," binary format."),(0,a.kt)("p",null,"artemis supports parsing the most common types of ",(0,a.kt)("inlineCode",{parentName:"p"},"shellitems"),", but if you\nencounter a ",(0,a.kt)("inlineCode",{parentName:"p"},"shellitem")," entry that is not supported please open an issue!"),(0,a.kt)("p",null,"Other parsers:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://ericzimmerman.github.io/"},"ShllBagsExplorer")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.velociraptor.app/artifact_references/pages/windows.forensics.shellbags/"},"Velociraptor"))),(0,a.kt)("p",null,"References:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/libyal/libfwsi/blob/main/documentation/Windows%20Shell%20Item%20format.asciidoc"},"Libyal"))),(0,a.kt)("h1",{id:"toml-collection"},"TOML Collection"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "shellbags_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "shellbags"\n[artifacts.shellbags]\nresolve_guids = true\n# Optional\n# alt_drive = \'C\'\n')),(0,a.kt)("h1",{id:"collection-options"},"Collection Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"alt_drive")," Expects a single character value. Will use an alternative drive\nletter when parsing ",(0,a.kt)("inlineCode",{parentName:"li"},"Shellbags"),". This configuration is ",(0,a.kt)("strong",{parentName:"li"},"optional"),". By\ndefault artemis will use the ",(0,a.kt)("inlineCode",{parentName:"li"},"%systemdrive%")," value (typically ",(0,a.kt)("inlineCode",{parentName:"li"},"C"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"resolve_guids")," Boolean value whether to try to resolve GUIDS found when\nparsing ",(0,a.kt)("inlineCode",{parentName:"li"},"Shellbags"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"If ",(0,a.kt)("strong",{parentName:"li"},"false"),":\n",(0,a.kt)("inlineCode",{parentName:"li"},'"resolve_path": "20d04fe0-3aea-1069-a2d8-08002b30309d\\C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\MSBuild\\Current",')),(0,a.kt)("li",{parentName:"ul"},"If ",(0,a.kt)("strong",{parentName:"li"},"true"),":\n",(0,a.kt)("inlineCode",{parentName:"li"},'"resolve_path": "This PC\\C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\MSBuild\\Current",'))))),(0,a.kt)("h1",{id:"output-structure"},"Output Structure"),(0,a.kt)("p",null,"An array of ",(0,a.kt)("inlineCode",{parentName:"p"},"Shellbag")," entries"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface Shellbags {\n  /**Reconstructed directory path */\n  path: string;\n  /**FAT created timestamp. Only applicable for Directory `shell_type` */\n  created: number;\n  /**FAT modified timestamp. Only applicable for Directory `shell_type` */\n  modified: number;\n  /**FAT modified timestamp. Only applicable for Directory `shell_type` */\n  accessed: number;\n  /**Entry number in MFT. Only applicable for Directory `shell_type` */\n  mft_entry: number;\n  /**Sequence number in MFT. Only applicable for Directory `shell_type` */\n  mft_sequence: number;\n  /**\n   * Type of shellitem\n   *\n   * Can be:\n   *   `Directory, URI, RootFolder, Network, Volume, ControlPanel, UserPropertyView, Delegate, Variable, MTP, Unknown, History`\n   *\n   *  Most common is typically `Directory`\n   */\n  shell_type: string;\n  /**\n   * Reconstructed directory with any GUIDs resolved\n   * Ex: `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`\n   */\n  resolve_path: string;\n  /**User Registry file associated with `Shellbags` */\n  reg_file: string;\n  /**Registry key path to `Shellbags` data */\n  reg_path: string;\n  /**Full file path to the User Registry file */\n  reg_file_path: string;\n}\n")))}d.isMDXComponent=!0}}]);