"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[4411],{8142:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"Intro/Scripting/filterscripts","title":"Filtering","description":"Filtering scripts","source":"@site/docs/Intro/Scripting/filterscripts.md","sourceDirName":"Intro/Scripting","slug":"/Intro/Scripting/filterscripts","permalink":"/artemis-api/docs/Intro/Scripting/filterscripts","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/filterscripts.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"sidebarPosition":4,"frontMatter":{"sidebar_position":4,"description":"Filtering scripts"},"sidebar":"artemisStart","previous":{"title":"Bundling","permalink":"/artemis-api/docs/Intro/Scripting/bundling"},"next":{"title":"Scripts","permalink":"/artemis-api/docs/Intro/Scripting/scripts"}}');var s=i(4848),r=i(8453);const a={sidebar_position:4,description:"Filtering scripts"},l="Filtering",c={},o=[];function d(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"filtering",children:"Filtering"})}),"\n",(0,s.jsxs)(t.p,{children:["In addition to creating scripts that call artemis functions. Artemis has the\nability to pass the artifact data as an argument to a script! For most scenarios\ncalling the artemis function is the recommended practice for scripting. However,\nthe sole execption is the ",(0,s.jsx)(t.code,{children:"filelisting"})," and ",(0,s.jsx)(t.code,{children:"rawfilelisting"})," artifacts or if you\nencounter large log files (ex: Linux Journal files)."]}),"\n",(0,s.jsx)(t.p,{children:"When pulling a filelisting artemis will recursively walk the filesystem, but in\norder to keep memory usage low, every 100,000 files artemis will output the\nresults. While this will keep memory usage low, it makes it difficult to use via\nscripting. If we return 100,000 entries to our script, we cannot continue our\nrecursive filelisting because we have lost track where we are in the filesystem."}),"\n",(0,s.jsx)(t.p,{children:"This where filter scripts can help."}),"\n",(0,s.jsxs)(t.p,{children:["Instead of calling an artemis function like ",(0,s.jsx)(t.code,{children:"getRegistry"})," we instead tell\nartemis to pass the artifact data as an argument to our script. So, instead of\nreturning 100,000 files, we pass that data as an argument to our script before\noutputting the results."]}),"\n",(0,s.jsx)(t.p,{children:"A normal artemis script would look like something below:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "plist_data"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "all_users_plist_files"\n# Parses all plist files in /Users/%\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvcGxpc3QudHMKZnVuY3Rpb24gZ2V0UGxpc3QocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9wbGlzdChwYXRoKTsKICBpZiAoZGF0YSA9PT0gIiIpIHsKICAgIHJldHVybiBudWxsOwogIH0KICBjb25zdCBwbGlzdF9kYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gcGxpc3RfZGF0YTsKfQoKLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvc3lzdGVtL291dHB1dC50cwpmdW5jdGlvbiBvdXRwdXRSZXN1bHRzKGRhdGEsIGRhdGFfbmFtZSwgb3V0cHV0KSB7CiAgY29uc3Qgb3V0cHV0X3N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG91dHB1dCk7CiAgY29uc3Qgc3RhdHVzID0gRGVuby5jb3JlLm9wcy5vdXRwdXRfcmVzdWx0cygKICAgIGRhdGEsCiAgICBkYXRhX25hbWUsCiAgICBvdXRwdXRfc3RyaW5nCiAgKTsKICByZXR1cm4gc3RhdHVzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9maWxlc3lzdGVtL2RpcmVjdG9yeS50cwphc3luYyBmdW5jdGlvbiByZWFkRGlyKHBhdGgpIHsKICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShhd2FpdCBmcy5yZWFkRGlyKHBhdGgpKTsKICByZXR1cm4gZGF0YTsKfQoKLy8gbWFpbi50cwphc3luYyBmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IHN0YXJ0X3BhdGggPSAiL1VzZXJzIjsKICBjb25zdCBwbGlzdF9maWxlcyA9IFtdOwogIGF3YWl0IHJlY3Vyc2VfZGlyKHBsaXN0X2ZpbGVzLCBzdGFydF9wYXRoKTsKICByZXR1cm4gcGxpc3RfZmlsZXM7Cn0KYXN5bmMgZnVuY3Rpb24gcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHN0YXJ0X3BhdGgpIHsKICBpZiAocGxpc3RfZmlsZXMubGVuZ3RoID4gMjApIHsKICAgIGNvbnN0IG91dCA9IHsKICAgICAgbmFtZTogImFydGVtaXNfcGxpc3QiLAogICAgICBkaXJlY3Rvcnk6ICIuL3RtcCIsCiAgICAgIGZvcm1hdDogImpzb24iIC8qIEpTT04gKi8sCiAgICAgIGNvbXByZXNzOiBmYWxzZSwKICAgICAgZW5kcG9pbnRfaWQ6ICJhbnl0aGluZy1pLXdhbnQiLAogICAgICBjb2xsZWN0aW9uX2lkOiAxLAogICAgICBvdXRwdXQ6ICJsb2NhbCIgLyogTE9DQUwgKi8KICAgIH07CiAgICBjb25zdCBzdGF0dXMgPSBvdXRwdXRSZXN1bHRzKAogICAgICBKU09OLnN0cmluZ2lmeShwbGlzdF9maWxlcyksCiAgICAgICJhcnRlbWlzX2luZm8iLAogICAgICBvdXQKICAgICk7CiAgICBpZiAoIXN0YXR1cykgewogICAgICBjb25zb2xlLmxvZygiQ291bGQgbm90IG91dHB1dCB0byBsb2NhbCBkaXJlY3RvcnkiKTsKICAgIH0KICAgIHBsaXN0X2ZpbGVzID0gW107CiAgfQogIGZvciAoY29uc3QgZW50cnkgb2YgYXdhaXQgcmVhZERpcihzdGFydF9wYXRoKSkgewogICAgY29uc3QgcGxpc3RfcGF0aCA9IGAke3N0YXJ0X3BhdGh9LyR7ZW50cnkuZmlsZW5hbWV9YDsKICAgIGlmIChlbnRyeS5pc19maWxlICYmIGVudHJ5LmZpbGVuYW1lLmVuZHNXaXRoKCJwbGlzdCIpKSB7CiAgICAgIGNvbnN0IGRhdGEgPSBnZXRQbGlzdChwbGlzdF9wYXRoKTsKICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHsKICAgICAgICBjb250aW51ZTsKICAgICAgfQogICAgICBjb25zdCBwbGlzdF9pbmZvID0gewogICAgICAgIHBsaXN0X2NvbnRlbnQ6IGRhdGEsCiAgICAgICAgZmlsZTogcGxpc3RfcGF0aAogICAgICB9OwogICAgICBwbGlzdF9maWxlcy5wdXNoKHBsaXN0X2luZm8pOwogICAgICBjb250aW51ZTsKICAgIH0KICAgIGlmIChlbnRyeS5pc19kaXJlY3RvcnkpIHsKICAgICAgYXdhaXQgcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHBsaXN0X3BhdGgpOwogICAgfQogIH0KfQptYWluKCk7Cg=="\n'})}),"\n",(0,s.jsxs)(t.admonition,{type:"note",children:[(0,s.jsx)(t.p,{children:"High level overview of what happens:"}),(0,s.jsx)(t.p,{children:"toml file -> decode script -> execute script"})]}),"\n",(0,s.jsx)(t.p,{children:"A filter script would look like something below:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "info_plist_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\nfilter_name = "apps_info_plists"\n# This script will take the files artifact below and filter it to only return Info.plist files\n# We could expand this even further by then using the plist parser on the Info.plist path and include that parsed data too\nfilter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgZmlsdGVyX2ZpbGVzID0gW107CiAgZm9yIChjb25zdCBlbnRyeSBvZiBkYXRhKSB7CiAgICBpZiAoZW50cnkuZmlsZW5hbWUgPT0gIkluZm8ucGxpc3QiKSB7CiAgICAgIGZpbHRlcl9maWxlcy5wdXNoKGVudHJ5KTsKICAgIH0KICB9CiAgcmV0dXJuIGZpbHRlcl9maWxlczsKfQptYWluKCk7Cg=="\n\n[[artifacts]]\nartifact_name = "files" # Name of artifact\nfilter = true\n[artifacts.files]\nstart_path = "/System/Volumes/Data/Applications" # Start of file listing\ndepth = 100 # How many sub directories to descend\nmetadata = false # Get executable metadata\nmd5 = false # MD5 all files\nsha1 = false # SHA1 all files\nsha256 = false # SHA256 all files\npath_regex = "" # Regex for paths\nfile_regex = "" # Regex for files\n'})}),"\n",(0,s.jsx)(t.p,{children:"The biggest differences are:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["We use a ",(0,s.jsx)(t.code,{children:"[[artifacts]]"})," list to parse our data"]}),"\n",(0,s.jsxs)(t.li,{children:["We base64 encode our script and assign to ",(0,s.jsx)(t.code,{children:"filter_script"})," to tell artemis:\ntake the results of the ",(0,s.jsx)(t.code,{children:"[[artifacts]]"})," list and filter them before outputting\nthe data"]}),"\n",(0,s.jsxs)(t.li,{children:["We then set the ",(0,s.jsx)(t.code,{children:"filter"})," value to true"]}),"\n"]}),"\n",(0,s.jsxs)(t.admonition,{type:"note",children:[(0,s.jsx)(t.p,{children:"High level overview of what happens:"}),(0,s.jsx)(t.p,{children:"toml file -> walkthrough artifacts list-> pass data to filter script -> output"})]}),"\n",(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsxs)(t.p,{children:["All entries in a ",(0,s.jsx)(t.code,{children:"[[artifacts]]"})," list can be sent through a filter script with\nthe exception of regular artemis scripts. The output of these scripts will not\ngo through ",(0,s.jsx)(t.code,{children:"filter_script"}),"."]})}),"\n",(0,s.jsx)(t.p,{children:"The TypeScrpt code for a filter script would be something like below:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'import { MacosFileInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/files.ts";\n\n/**\n * Filters a provided file listing argument to only return Info.plist files from /Applications\n * Two arguments are always provided:\n *   - First is the parsed data serialized into JSON string\n *   - Second is the artifact name (ex: "amcache")\n * @returns Array of files only containing Info.plist\n */\nfunction main() {\n  // Since this is a filter script our data will be passed as a Serde Value that is a string\n  const args: string[] = STATIC_ARGS;\n  if (args.length < 2) {\n    return [];\n  }\n\n  // Parse the provide Serde Value (JSON string) as a MacosFileInfo[]\n  const data: MacosFileInfo[] = JSON.parse(args[0]);\n  const artifact_name = args[1]; // Contains "files" string (aka the artifact name)\n  const filter_files: MacosFileInfo[] = [];\n\n  for (const entry of data) {\n    if (entry.filename == "Info.plist") {\n      filter_files.push(entry);\n    }\n  }\n  return filter_files;\n}\n\nmain();\n'})}),"\n",(0,s.jsx)(t.p,{children:"The key difference between a regular artemis script and a filter script is:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'const args: string[] = STATIC_ARGS;\nif (args.length < 2) {\n  return [];\n}\n\n// Parse the provide Serde Value (JSON string) as a MacosFileInfo[]\nconst data: MacosFileInfo[] = JSON.parse(args[0]);\nconst artifact_name = args[1]; // Contains "files" string (aka the artifact name)\n'})}),"\n",(0,s.jsxs)(t.admonition,{type:"info",children:[(0,s.jsxs)(t.p,{children:["When running scripts artemis assigns the variable ",(0,s.jsx)(t.code,{children:"STATIC_ARGS"})," the data we want\nto filter. ",(0,s.jsx)(t.code,{children:"STATIC_ARGS"})," is an array with the first index ([0]) holding the data\nto filer and second index ([1]) the type of data (aka the artifact name), ex:\n",(0,s.jsx)(t.code,{children:"files"})," artifact."]}),(0,s.jsxs)(t.p,{children:["This data is ",(0,s.jsx)(t.strong,{children:"only"})," populated if you enable ",(0,s.jsx)(t.code,{children:"filter = true"})," option in the\ncollection TOML."]})]}),"\n",(0,s.jsxs)(t.p,{children:["Here we are taking the first argument provided to our script and parsing it as a\nJSON ",(0,s.jsx)(t.code,{children:"MacosFileInfo"})," object array. As stated above, artemis will pass the\nresults of each ",(0,s.jsx)(t.code,{children:"[[artifacts]]"})," entry to our script using serde to serialize the\ndata as a JSON formattted string.",(0,s.jsx)(t.br,{}),"\n","According to the macOS ",(0,s.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/macOS%20Artifacts/files",children:"files"}),"\nartifact this data is an array of ",(0,s.jsx)(t.code,{children:"MacosFileInfo"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"We then parse and filter the data based on our script"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:'// Parse the provide Serde Value (JSON string) as a MacosFileInfo[]\nconst data: MacosFileInfo[] = JSON.parse(args[0]);\nconst filter_files: MacosFileInfo[] = [];\n\nfor (const entry of data) {\n  if (entry.filename == "Info.plist") {\n    filter_files.push(entry);\n  }\n}\n'})}),"\n",(0,s.jsx)(t.p,{children:"Finally, we take our filtered output and return it back to artemis"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"return filter_files;\n"})}),"\n",(0,s.jsx)(t.p,{children:"So our initial data provided to our filter script gets filtered and returned. In\nthis example, our 100,000 file listing entry gets filtered to only return\nentries with the filename Info.plist."})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>l});var n=i(6540);const s={},r=n.createContext(s);function a(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);