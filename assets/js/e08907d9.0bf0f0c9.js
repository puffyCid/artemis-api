"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[7857],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=i.createContext({}),p=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(o.Provider,{value:t},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,u=d["".concat(o,".").concat(m)]||d[m]||g[m]||r;return n?i.createElement(u,s(s({ref:t},c),{},{components:n})):i.createElement(u,s({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[d]="string"==typeof e?e:a,s[1]=l;for(var p=2;p<r;p++)s[p]=n[p];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8084:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>g,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(7462),a=(n(7294),n(3905));const r={sidebar_position:4,description:"Filtering scripts"},s="Filtering",l={unversionedId:"Intro/Scripting/filterscripts",id:"Intro/Scripting/filterscripts",title:"Filtering",description:"Filtering scripts",source:"@site/docs/Intro/Scripting/filterscripts.md",sourceDirName:"Intro/Scripting",slug:"/Intro/Scripting/filterscripts",permalink:"/artemis-api/docs/Intro/Scripting/filterscripts",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/filterscripts.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,description:"Filtering scripts"},sidebar:"artemisStart",previous:{title:"Bundling",permalink:"/artemis-api/docs/Intro/Scripting/bundling"},next:{title:"Scripts",permalink:"/artemis-api/docs/Intro/Scripting/scripts"}},o={},p=[],c={toc:p},d="wrapper";function g(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"filtering"},"Filtering"),(0,a.kt)("p",null,"In addition to creating scripts that call artemis functions. artemis has the\nability to pass the artifact data as an argument to a script! For most scenarios\ncalling the artemis function is the recommended practice for scripting. However,\nthe sole execption is the ",(0,a.kt)("inlineCode",{parentName:"p"},"filelisting")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"rawfilelisting")," artifacts."),(0,a.kt)("p",null,"When pulling a filelisting artemis will recursively walk the filesystem, but in\norder to keep memory usage low, every 100,000 files artemis will output the\nresults. While this will keep memory usage low, it makes it difficult to use via\nscripting. If we return 100,000 entries to our script, we cannot continue our\nrecursive filelisting because we have lost track where we are in the filesystem."),(0,a.kt)("p",null,"This where filter scripts can help."),(0,a.kt)("p",null,"Instead of calling an artemis function like ",(0,a.kt)("inlineCode",{parentName:"p"},"getRegistry")," we instead tell\nartemis to pass the artifact data as an argument to our script. So, instead of\nreturning 100,000 files, we pass that data as an argument to our script before\noutputting the results."),(0,a.kt)("p",null,"A normal artemis script would look like something below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "plist_data"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "all_users_plist_files"\n# Parses all plist files in /Users/%\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvcGxpc3QudHMKZnVuY3Rpb24gZ2V0UGxpc3QocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9wbGlzdChwYXRoKTsKICBpZiAoZGF0YSA9PT0gIiIpIHsKICAgIHJldHVybiBudWxsOwogIH0KICBjb25zdCBwbGlzdF9kYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gcGxpc3RfZGF0YTsKfQoKLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvc3lzdGVtL291dHB1dC50cwpmdW5jdGlvbiBvdXRwdXRSZXN1bHRzKGRhdGEsIGRhdGFfbmFtZSwgb3V0cHV0KSB7CiAgY29uc3Qgb3V0cHV0X3N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG91dHB1dCk7CiAgY29uc3Qgc3RhdHVzID0gRGVuby5jb3JlLm9wcy5vdXRwdXRfcmVzdWx0cygKICAgIGRhdGEsCiAgICBkYXRhX25hbWUsCiAgICBvdXRwdXRfc3RyaW5nCiAgKTsKICByZXR1cm4gc3RhdHVzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9maWxlc3lzdGVtL2RpcmVjdG9yeS50cwphc3luYyBmdW5jdGlvbiByZWFkRGlyKHBhdGgpIHsKICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShhd2FpdCBmcy5yZWFkRGlyKHBhdGgpKTsKICByZXR1cm4gZGF0YTsKfQoKLy8gbWFpbi50cwphc3luYyBmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IHN0YXJ0X3BhdGggPSAiL1VzZXJzIjsKICBjb25zdCBwbGlzdF9maWxlcyA9IFtdOwogIGF3YWl0IHJlY3Vyc2VfZGlyKHBsaXN0X2ZpbGVzLCBzdGFydF9wYXRoKTsKICByZXR1cm4gcGxpc3RfZmlsZXM7Cn0KYXN5bmMgZnVuY3Rpb24gcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHN0YXJ0X3BhdGgpIHsKICBpZiAocGxpc3RfZmlsZXMubGVuZ3RoID4gMjApIHsKICAgIGNvbnN0IG91dCA9IHsKICAgICAgbmFtZTogImFydGVtaXNfcGxpc3QiLAogICAgICBkaXJlY3Rvcnk6ICIuL3RtcCIsCiAgICAgIGZvcm1hdDogImpzb24iIC8qIEpTT04gKi8sCiAgICAgIGNvbXByZXNzOiBmYWxzZSwKICAgICAgZW5kcG9pbnRfaWQ6ICJhbnl0aGluZy1pLXdhbnQiLAogICAgICBjb2xsZWN0aW9uX2lkOiAxLAogICAgICBvdXRwdXQ6ICJsb2NhbCIgLyogTE9DQUwgKi8KICAgIH07CiAgICBjb25zdCBzdGF0dXMgPSBvdXRwdXRSZXN1bHRzKAogICAgICBKU09OLnN0cmluZ2lmeShwbGlzdF9maWxlcyksCiAgICAgICJhcnRlbWlzX2luZm8iLAogICAgICBvdXQKICAgICk7CiAgICBpZiAoIXN0YXR1cykgewogICAgICBjb25zb2xlLmxvZygiQ291bGQgbm90IG91dHB1dCB0byBsb2NhbCBkaXJlY3RvcnkiKTsKICAgIH0KICAgIHBsaXN0X2ZpbGVzID0gW107CiAgfQogIGZvciAoY29uc3QgZW50cnkgb2YgYXdhaXQgcmVhZERpcihzdGFydF9wYXRoKSkgewogICAgY29uc3QgcGxpc3RfcGF0aCA9IGAke3N0YXJ0X3BhdGh9LyR7ZW50cnkuZmlsZW5hbWV9YDsKICAgIGlmIChlbnRyeS5pc19maWxlICYmIGVudHJ5LmZpbGVuYW1lLmVuZHNXaXRoKCJwbGlzdCIpKSB7CiAgICAgIGNvbnN0IGRhdGEgPSBnZXRQbGlzdChwbGlzdF9wYXRoKTsKICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHsKICAgICAgICBjb250aW51ZTsKICAgICAgfQogICAgICBjb25zdCBwbGlzdF9pbmZvID0gewogICAgICAgIHBsaXN0X2NvbnRlbnQ6IGRhdGEsCiAgICAgICAgZmlsZTogcGxpc3RfcGF0aAogICAgICB9OwogICAgICBwbGlzdF9maWxlcy5wdXNoKHBsaXN0X2luZm8pOwogICAgICBjb250aW51ZTsKICAgIH0KICAgIGlmIChlbnRyeS5pc19kaXJlY3RvcnkpIHsKICAgICAgYXdhaXQgcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHBsaXN0X3BhdGgpOwogICAgfQogIH0KfQptYWluKCk7Cg=="\n')),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"High level overview of what happens:"),(0,a.kt)("mermaid",{parentName:"admonition",value:'graph LR;\n  tomlFile("TOML file");\n  artemis[(artemis)];\n\n  tomlFile--\x3e|decode script|artemis--\x3e|execute script|output;'})),(0,a.kt)("p",null,"A filter script would look like something below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos"\n\n[output]\nname = "info_plist_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\nfilter_name = "apps_info_plists"\n# This script will take the files artifact below and filter it to only return Info.plist files\n# We could expand this even further by then using the plist parser on the Info.plist path and include that parsed data too\nfilter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgZmlsdGVyX2ZpbGVzID0gW107CiAgZm9yIChjb25zdCBlbnRyeSBvZiBkYXRhKSB7CiAgICBpZiAoZW50cnkuZmlsZW5hbWUgPT0gIkluZm8ucGxpc3QiKSB7CiAgICAgIGZpbHRlcl9maWxlcy5wdXNoKGVudHJ5KTsKICAgIH0KICB9CiAgcmV0dXJuIGZpbHRlcl9maWxlczsKfQptYWluKCk7Cg=="\n\n[[artifacts]]\nartifact_name = "files" # Name of artifact\nfilter = true\n[artifacts.files]\nstart_path = "/System/Volumes/Data/Applications" # Start of file listing\ndepth = 100 # How many sub directories to descend\nmetadata = false # Get executable metadata\nmd5 = false # MD5 all files\nsha1 = false # SHA1 all files\nsha256 = false # SHA256 all files\npath_regex = "" # Regex for paths\nfile_regex = "" # Regex for files\n')),(0,a.kt)("p",null,"The biggest differences are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"We use a ",(0,a.kt)("inlineCode",{parentName:"li"},"[[artifacts]]")," list to parse our data"),(0,a.kt)("li",{parentName:"ul"},"We base64 encode our script and assign to ",(0,a.kt)("inlineCode",{parentName:"li"},"filter_script")," to tell artemis:\ntake the results of the ",(0,a.kt)("inlineCode",{parentName:"li"},"[[artifacts]]")," list and filter them before outputting\nthe data"),(0,a.kt)("li",{parentName:"ul"},"We then set the ",(0,a.kt)("inlineCode",{parentName:"li"},"filter")," value to ",(0,a.kt)("inlineCode",{parentName:"li"},"true"))),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"High level overview of what happens:"),(0,a.kt)("mermaid",{parentName:"admonition",value:'graph LR;\n  tomlFile("TOML file");\n  artemis[(artemis)];\n\n  tomlFile--\x3e|walkthrough artifacts list|artemis--\x3e|pass data to filter script|output;'})),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"All entries in a ",(0,a.kt)("inlineCode",{parentName:"p"},"[[artifacts]]")," list can be sent through a filter script with\nthe exception of regular artemis scripts. The output of these scripts will not\ngo through ",(0,a.kt)("inlineCode",{parentName:"p"},"filter_script"),".")),(0,a.kt)("p",null,"The TypeScrpt code for a filter script would be something like below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { MacosFileInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/files.ts";\n\n/**\n * Filters a provided file listing argument to only return Info.plist files from /Applications\n * Two arguments are always provided:\n *   - First is the parsed data serialized into JSON string\n *   - Second is the artifact name (ex: "amcache")\n * @returns Array of files only containing Info.plist\n */\nfunction main() {\n  // Since this is a filter script our data will be passed as a Serde Value that is a string\n  const args: string[] = STATIC_ARGS;\n  if (args.length === 0) {\n    return [];\n  }\n\n  // Parse the provide Serde Value (JSON string) as a MacosFileInfo[]\n  const data: MacosFileInfo[] = JSON.parse(args[0]);\n  const filter_files: MacosFileInfo[] = [];\n\n  for (const entry of data) {\n    if (entry.filename == "Info.plist") {\n      filter_files.push(entry);\n    }\n  }\n  return filter_files;\n}\n\nmain();\n')),(0,a.kt)("p",null,"The key difference between a regular artemis script and a filter script is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const args: string[] = STATIC_ARGS;\nif (args.length === 0) {\n  return [];\n}\n\n// Parse the provide Serde Value (JSON string) as a MacosFileInfo[]\nconst data: MacosFileInfo[] = JSON.parse(args[0]);\n")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"When running scripts artemis assigns the variable ",(0,a.kt)("inlineCode",{parentName:"p"},"STATIC_ARGS")," the data we want\nto filter. ",(0,a.kt)("inlineCode",{parentName:"p"},"STATIC_ARGS")," is an array with the first index (","[0]",") holding the data\nto filer and second index (","[1]",") the type of the data, ex: ",(0,a.kt)("inlineCode",{parentName:"p"},"MacosFileInfo"),"."),(0,a.kt)("p",{parentName:"admonition"},"This data is ",(0,a.kt)("strong",{parentName:"p"},"only")," populated if you enable ",(0,a.kt)("inlineCode",{parentName:"p"},"filter = true")," option in the\nTOML.")),(0,a.kt)("p",null,"Here we are taking the first argument provided to our script and parsing it as a\nJSON ",(0,a.kt)("inlineCode",{parentName:"p"},"MacosFileInfo")," object array. As stated above, artemis will pass the\nresults of each ",(0,a.kt)("inlineCode",{parentName:"p"},"[[artifacts]]")," entry to our script using serde to serialize the\ndata as a JSON formattted string."),(0,a.kt)("p",null,"We then parse and filter the data based on our script"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// Parse the provide Serde Value (JSON string) as a MacosFileInfo[]\nconst data: MacosFileInfo[] = JSON.parse(args[0]);\nconst filter_files: MacosFileInfo[] = [];\n\nfor (const entry of data) {\n  if (entry.filename == "Info.plist") {\n    filter_files.push(entry);\n  }\n}\n')),(0,a.kt)("p",null,"Finally, we take our filtered output and return it back to artemis"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"return filter_files;\n")),(0,a.kt)("p",null,"So our initial data provided to our filter script gets filtered and returned. In\nthis example, our 100,000 file listing entry gets filtered to only return\nentries with the filename ",(0,a.kt)("inlineCode",{parentName:"p"},"Info.plist"),"."))}g.isMDXComponent=!0}}]);