"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5650],{38992:(n,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>f,frontMatter:()=>i,metadata:()=>r,toc:()=>l});var e=a(74848),s=a(28453);const i={sidebar_position:3,description:"Live Response Collectino"},c="Live Response",r={id:"Intro/Collections/Examples/live_response",title:"Live Response",description:"Live Response Collectino",source:"@site/docs/Intro/Collections/Examples/live_response.md",sourceDirName:"Intro/Collections/Examples",slug:"/Intro/Collections/Examples/live_response",permalink:"/artemis-api/docs/Intro/Collections/Examples/live_response",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Collections/Examples/live_response.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:173094914e4,sidebarPosition:3,frontMatter:{sidebar_position:3,description:"Live Response Collectino"},sidebar:"artemisStart",previous:{title:"File Listings",permalink:"/artemis-api/docs/Intro/Collections/Examples/file_listings"},next:{title:"Scripts",permalink:"/artemis-api/docs/Intro/Collections/Examples/scripts"}},o={},l=[];function m(n){const t={code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.header,{children:(0,e.jsx)(t.h1,{id:"live-response",children:"Live Response"})}),"\n",(0,e.jsx)(t.p,{children:"Windows TOML collection focusing on collecting data to help investigate a\nWindows incident."}),"\n",(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "windows_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "prefetch"\n[artifacts.prefetch]\n\n[[artifacts]]\nartifact_name = "processes"\n[artifacts.processes]\nmd5 = true\nsha1 = false\nsha256 = false\nmetadata = true\n\n[[artifacts]]\nartifact_name = "systeminfo"\n\n[[artifacts]]\nartifact_name = "chromium-history"\n\n[[artifacts]]\nartifact_name = "chromium-downloads"\n\n[[artifacts]]\nartifact_name = "firefox-history"\n\n[[artifacts]]\nartifact_name = "firefox-downloads"\n\n[[artifacts]]\nartifact_name = "amcache"\n[artifacts.amcache]\n\n[[artifacts]]\nartifact_name = "bits"\n[artifacts.bits]\ncarve = true\n\n[[artifacts]]\nartifact_name = "eventlogs"\n[artifacts.eventlogs]\n\n[[artifacts]]\nartifact_name = "rawfiles"\n[artifacts.rawfiles]\ndrive_letter = \'C\'\nstart_path = "C:\\\\"\ndepth = 40\nrecover_indx = true\nmd5 = true\nsha1 = false\nsha256 = false\nmetadata = true\n\n[[artifacts]]\nartifact_name = "registry" # Parses the whole Registry file\n[artifacts.registry]\nuser_hives = true # All NTUSER.DAT and UsrClass.dat\nsystem_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY\n\n[[artifacts]]\nartifact_name = "shellbags"\n[artifacts.shellbags]\nresolve_guids = true\n\n[[artifacts]]\nartifact_name = "shimcache"\n[artifacts.shimcache]\n\n[[artifacts]]\nartifact_name = "srum"\n[artifacts.srum]\n\n[[artifacts]]\nartifact_name = "userassist"\n[artifacts.userassist]\n\n[[artifacts]]\nartifact_name = "users"\n[artifacts.users]\n\n[[artifacts]]\nartifact_name = "usnjrnl"\n[artifacts.usnjrnl]\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "recent_files"\n# Parses all recent accessed files (shortcuts/lnk files) for all users\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvd2luZG93cy9zaG9ydGN1dHMudHMKZnVuY3Rpb24gZ2V0TG5rRmlsZShwYXRoKSB7CiAgY29uc3QgZGF0YSA9IERlbm8uY29yZS5vcHMuZ2V0X2xua19maWxlKHBhdGgpOwogIGNvbnN0IHJlc3VsdHMgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiByZXN1bHRzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9lbnZpcm9ubWVudC9lbnYudHMKZnVuY3Rpb24gZ2V0RW52VmFsdWUoa2V5KSB7CiAgY29uc3QgZGF0YSA9IGVudi5lbnZpcm9ubWVudFZhbHVlKGtleSk7CiAgcmV0dXJuIGRhdGE7Cn0KCi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdWZmeWNpZC9hcnRlbWlzLWFwaS9tYXN0ZXIvc3JjL2ZpbGVzeXN0ZW0vZGlyZWN0b3J5LnRzCmFzeW5jIGZ1bmN0aW9uIHJlYWREaXIocGF0aCkgewogIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGF3YWl0IGZzLnJlYWREaXIocGF0aCkpOwogIHJldHVybiBkYXRhOwp9CgovLyBtYWluLnRzCmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7CiAgY29uc3QgZHJpdmUgPSBnZXRFbnZWYWx1ZSgiU3lzdGVtRHJpdmUiKTsKICBpZiAoZHJpdmUgPT09ICIiKSB7CiAgICByZXR1cm4gW107CiAgfQogIGNvbnN0IHVzZXJzID0gYCR7ZHJpdmV9XFxVc2Vyc2A7CiAgY29uc3QgcmVjZW50X2ZpbGVzID0gW107CiAgZm9yIChjb25zdCBlbnRyeSBvZiBhd2FpdCByZWFkRGlyKHVzZXJzKSkgewogICAgdHJ5IHsKICAgICAgY29uc3QgcGF0aCA9IGAke3VzZXJzfVxcJHtlbnRyeS5maWxlbmFtZX1cXEFwcERhdGFcXFJvYW1pbmdcXE1pY3Jvc29mdFxcV2luZG93c1xcUmVjZW50YDsKICAgICAgZm9yIChjb25zdCBlbnRyeTIgb2YgYXdhaXQgcmVhZERpcihwYXRoKSkgewogICAgICAgIGlmICghZW50cnkyLmZpbGVuYW1lLmVuZHNXaXRoKCJsbmsiKSkgewogICAgICAgICAgY29udGludWU7CiAgICAgICAgfQogICAgICAgIGNvbnN0IGxua19maWxlID0gYCR7cGF0aH1cXCR7ZW50cnkyLmZpbGVuYW1lfWA7CiAgICAgICAgY29uc3QgbG5rID0gZ2V0TG5rRmlsZShsbmtfZmlsZSk7CiAgICAgICAgcmVjZW50X2ZpbGVzLnB1c2gobG5rKTsKICAgICAgfQogICAgfSBjYXRjaCAoX2Vycm9yKSB7CiAgICAgIGNvbnRpbnVlOwogICAgfQogIH0KICByZXR1cm4gcmVjZW50X2ZpbGVzOwp9Cm1haW4oKTsK"\n'})}),"\n",(0,e.jsx)(t.p,{children:"macOS colleciton focusing on collecting data to help investigate a macOS\nincident."}),"\n",(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "macos_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "processes"\n[artifacts.processes]\nmd5 = true\nsha1 = false\nsha256 = false\nmetadata = true\n\n[[artifacts]]\nartifact_name = "loginitems"\n\n[[artifacts]]\nartifact_name = "emond"\n\n[[artifacts]]\nartifact_name = "fseventsd"\n\n[[artifacts]]\nartifact_name = "launchd"\n\n[[artifacts]]\nartifact_name = "files"\n[artifacts.files]\nstart_path = "/"\ndepth = 90\nmetadata = true\nmd5 = true\nsha1 = false\nsha256 = false\nregex_filter = ""\n\n[[artifacts]]\nartifact_name = "users"\n\n[[artifacts]]\nartifact_name = "groups"\n\n[[artifacts]]\nartifact_name = "systeminfo"\n\n[[artifacts]]\nartifact_name = "shell_history"\n\n[[artifacts]]\nartifact_name = "chromium-history"\n\n[[artifacts]]\nartifact_name = "chromium-downloads"\n\n[[artifacts]]\nartifact_name = "firefox-history"\n\n[[artifacts]]\nartifact_name = "firefox-downloads"\n\n[[artifacts]]\nartifact_name = "safari-history"\n\n[[artifacts]]\nartifact_name = "safari-downloads"\n\n[[artifacts]]\nartifact_name = "cron"\n\n[[artifacts]]\nartifact_name = "unifiedlogs"\n[artifacts.unifiedlogs]\nsources = ["Persist", "Special", "Signpost", "HighVolume"] # Option to specify the log directories (sources)\n'})})]})}function f(n={}){const{wrapper:t}={...(0,s.R)(),...n.components};return t?(0,e.jsx)(t,{...n,children:(0,e.jsx)(m,{...n})}):m(n)}},28453:(n,t,a)=>{a.d(t,{R:()=>c,x:()=>r});var e=a(96540);const s={},i=e.createContext(s);function c(n){const t=e.useContext(i);return e.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function r(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),e.createElement(i.Provider,{value:t},n.children)}}}]);