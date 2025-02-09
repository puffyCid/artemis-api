"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[8374],{4472:(I,g,c)=>{c.r(g),c.d(g,{assets:()=>s,contentTitle:()=>n,default:()=>m,frontMatter:()=>i,metadata:()=>C,toc:()=>Z});const C=JSON.parse('{"id":"Intro/Collections/Examples/scripts","title":"Scripts","description":"JavaScript Collections","source":"@site/docs/Intro/Collections/Examples/scripts.md","sourceDirName":"Intro/Collections/Examples","slug":"/Intro/Collections/Examples/scripts","permalink":"/artemis-api/docs/Intro/Collections/Examples/scripts","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Collections/Examples/scripts.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"sidebarPosition":4,"frontMatter":{"sidebar_position":4,"description":"JavaScript Collections"},"sidebar":"artemisStart","previous":{"title":"Live Response","permalink":"/artemis-api/docs/Intro/Collections/Examples/live_response"},"next":{"title":"Triage","permalink":"/artemis-api/docs/Intro/Collections/Examples/triage"}}');var d=c(4848),l=c(8453);const i={sidebar_position:4,description:"JavaScript Collections"},n="Scripts",s={},Z=[];function b(I){const g={code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...I.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(g.header,{children:(0,d.jsx)(g.h1,{id:"scripts",children:"Scripts"})}),"\n",(0,d.jsx)(g.p,{children:"A Windows collection script that does tha following:"}),"\n",(0,d.jsxs)(g.ul,{children:["\n",(0,d.jsxs)(g.li,{children:["Parses and filters user Registry Run\\RunOnce keys that contain the values:\n",(0,d.jsx)(g.code,{children:'["cmd.exe", "powershell", "temp", "appdata", "script"]'})]}),"\n",(0,d.jsxs)(g.li,{children:["Parses and filters the System Event Log for service installs that contain the\nvalues: ",(0,d.jsx)(g.code,{children:'[".bat", "powershell", "cmd.exe", "COMSPEC"]'})]}),"\n",(0,d.jsx)(g.li,{children:"Parses and filters BITS jobs looking for uncommon BITS jobs"}),"\n"]}),"\n",(0,d.jsx)(g.pre,{children:(0,d.jsx)(g.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "win_filter"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\nfilter_name = "regs_bits"\n# This script will filter for sus Run\\RunOnce Reg keys and non-builtin BITS jobs\nfilter_script = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvd2luZG93cy9ldmVudGxvZ3MudHMKZnVuY3Rpb24gZ2V0RXZlbnRsb2dzKHBhdGgpIHsKICBjb25zdCByZXN1bHRzID0gRGVuby5jb3JlLm9wcy5nZXRfZXZlbnRsb2dzKHBhdGgpOwogIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3VsdHMpOwogIHJldHVybiBkYXRhOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9lbnZpcm9ubWVudC9lbnYudHMKZnVuY3Rpb24gZ2V0RW52VmFsdWUoa2V5KSB7CiAgY29uc3QgZGF0YSA9IGVudi5lbnZpcm9ubWVudFZhbHVlKGtleSk7CiAgcmV0dXJuIGRhdGE7Cn0KCi8vIG1haW4udHMKZnVuY3Rpb24gZ3JhYkV2ZW50TG9ncygpIHsKICBjb25zdCBkcml2ZSA9IGdldEVudlZhbHVlKCJTeXN0ZW1Ecml2ZSIpOwogIGlmIChkcml2ZSA9PT0gIiIpIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IGdldEV2ZW50bG9ncygKICAgIGAke2RyaXZlfVxcV2luZG93c1xcU3lzdGVtMzJcXHdpbmV2dFxcTG9nc1xcU3lzdGVtLmV2dHhgCiAgKTsKICBjb25zdCBzZXJ2aWNlX2luc3RhbGxzID0gW107CiAgY29uc3Qgc3VzX3NlcnZpY2VzID0gWyIuYmF0IiwgInBvd2Vyc2hlbGwiLCAiY21kLmV4ZSIsICJDT01TUEVDIl07CiAgZm9yIChjb25zdCByZWNvcmQgb2YgZGF0YSkgewogICAgaWYgKHJlY29yZC5kYXRhWyJFdmVudCJdWyJTeXN0ZW0iXVsiRXZlbnRJRCJdICE9IDcwNDUgJiYgcmVjb3JkLmRhdGFbIkV2ZW50Il1bIlN5c3RlbSJdWyJFdmVudElEIl1bIiN0ZXh0Il0gIT0gNzA0NSkgewogICAgICBjb250aW51ZTsKICAgIH0KICAgIGlmIChyZWNvcmQuZGF0YVsiRXZlbnQiXVsiRXZlbnREYXRhIl1bIlNlcnZpY2VOYW1lIl0ubGVuZ3RoID09PSAxNiB8fCBzdXNfc2VydmljZXMuc29tZSgKICAgICAgKHZhbHVlKSA9PiByZWNvcmQuZGF0YVsiRXZlbnQiXVsiRXZlbnREYXRhIl1bIkltYWdlUGF0aCJdLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUpCiAgICApKSB7CiAgICAgIHNlcnZpY2VfaW5zdGFsbHMucHVzaChyZWNvcmQpOwogICAgfQogIH0KICByZXR1cm4gc2VydmljZV9pbnN0YWxsczsKfQpmdW5jdGlvbiBmaWx0ZXJSZWdpc3RyeShkYXRhKSB7CiAgY29uc3QgcmVncyA9IEpTT04ucGFyc2UoZGF0YSk7CiAgY29uc3Qgc3VzX3J1bl9rZXlzID0gWyJjbWQuZXhlIiwgInBvd2Vyc2hlbGwiLCAidGVtcCIsICJhcHBkYXRhIiwgInNjcmlwdCJdOwogIGNvbnN0IHN1c19oaXQgPSB7CiAgICByZWdpc3RyeV9maWxlOiByZWdzLnJlZ2lzdHJ5X2ZpbGUsCiAgICByZWdpc3RyeV9wYXRoOiByZWdzLnJlZ2lzdHJ5X3BhdGgsCiAgICByZWdpc3RyeV9lbnRyaWVzOiBbXQogIH07CiAgZm9yIChjb25zdCByZWNvcmQgb2YgcmVncy5yZWdpc3RyeV9lbnRyaWVzKSB7CiAgICBpZiAocmVjb3JkLm5hbWUgPT09ICJSdW4iIHx8IHJlY29yZC5uYW1lID09PSAiUnVuT25jZSIpIHsKICAgICAgY29uc3QgcmVnX2hpdCA9IHsKICAgICAgICBrZXk6IHJlY29yZC5rZXksCiAgICAgICAgbmFtZTogcmVjb3JkLm5hbWUsCiAgICAgICAgcGF0aDogcmVjb3JkLnBhdGgsCiAgICAgICAgdmFsdWVzOiBbXSwKICAgICAgICBsYXN0X21vZGlmaWVkOiByZWNvcmQubGFzdF9tb2RpZmllZCwKICAgICAgICBkZXB0aDogcmVjb3JkLmRlcHRoCiAgICAgIH07CiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgcmVjb3JkLnZhbHVlcykgewogICAgICAgIGlmIChzdXNfcnVuX2tleXMuc29tZSgKICAgICAgICAgIChyZWdfdmFsdWUpID0+IHZhbHVlLmRhdGEudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhyZWdfdmFsdWUpCiAgICAgICAgKSkgewogICAgICAgICAgcmVnX2hpdC52YWx1ZXMucHVzaCh2YWx1ZSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGlmIChyZWdfaGl0LnZhbHVlcy5sZW5ndGggPT09IDApIHsKICAgICAgICBjb250aW51ZTsKICAgICAgfQogICAgICBzdXNfaGl0LnJlZ2lzdHJ5X2VudHJpZXMucHVzaChyZWdfaGl0KTsKICAgIH0KICB9CiAgcmV0dXJuIHN1c19oaXQ7Cn0KZnVuY3Rpb24gZmlsdGVyQml0cyhkYXRhKSB7CiAgY29uc3QgYml0c19kYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICBjb25zdCBzdXNfYml0cyA9IHsKICAgIGJpdHM6IFtdLAogICAgY2FydmVkX2ZpbGVzOiBbXSwKICAgIGNhcnZlZF9qb2JzOiBbXQogIH07CiAgY29uc3Qgc3RhbmRhcmRfYml0cyA9IFsKICAgICJtb3ppbGxhIiwKICAgICJvdXRsb29rIiwKICAgICJlZGdlIiwKICAgICJvbmVkcml2ZSIsCiAgICAiZ29vZ2xlIiwKICAgICJzcGVlY2giCiAgXTsKICBmb3IgKGNvbnN0IGJpdCBvZiBiaXRzX2RhdGEuYml0cykgewogICAgaWYgKCFzdGFuZGFyZF9iaXRzLnNvbWUoCiAgICAgICh2YWx1ZSkgPT4gYml0LmZ1bGxfcGF0aC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlKQogICAgKSAmJiAhc3RhbmRhcmRfYml0cy5zb21lKCh2YWx1ZSkgPT4gYml0LnVybC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlKSkpIHsKICAgICAgc3VzX2JpdHMuYml0cy5wdXNoKGJpdCk7CiAgICB9CiAgfQogIGZvciAoY29uc3QgYml0IG9mIGJpdHNfZGF0YS5jYXJ2ZWRfZmlsZXMpIHsKICAgIGlmICghc3RhbmRhcmRfYml0cy5zb21lKAogICAgICAodmFsdWUpID0+IGJpdC5mdWxsX3BhdGgudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZSkKICAgICkgJiYgIXN0YW5kYXJkX2JpdHMuc29tZSgodmFsdWUpID0+IGJpdC51cmwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZSkpKSB7CiAgICAgIHN1c19iaXRzLmNhcnZlZF9maWxlcy5wdXNoKGJpdCk7CiAgICB9CiAgfQogIGZvciAoY29uc3QgYml0IG9mIGJpdHNfZGF0YS5jYXJ2ZWRfam9icykgewogICAgaWYgKCFzdGFuZGFyZF9iaXRzLnNvbWUoCiAgICAgICh2YWx1ZSkgPT4gYml0LnRhcmdldF9wYXRoLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUpCiAgICApKSB7CiAgICAgIHN1c19iaXRzLmNhcnZlZF9qb2JzLnB1c2goYml0KTsKICAgIH0KICB9CiAgcmV0dXJuIHN1c19iaXRzOwp9CmZ1bmN0aW9uIG1haW4oKSB7CiAgY29uc3QgYXJncyA9IFNUQVRJQ19BUkdTOwogIGlmIChhcmdzLmxlbmd0aCA8IDIpIHsKICAgIHJldHVybiBncmFiRXZlbnRMb2dzKCk7CiAgfQogIGlmIChhcmdzWzFdID09PSAicmVnaXN0cnkiKSB7CiAgICByZXR1cm4gZmlsdGVyUmVnaXN0cnkoYXJnc1swXSk7CiAgfQogIGlmIChhcmdzWzFdID09PSAiYml0cyIpIHsKICAgIHJldHVybiBmaWx0ZXJCaXRzKGFyZ3NbMF0pOwogIH0KICByZXR1cm4gSlNPTi5wYXJzZShhcmdzWzBdKTsKfQptYWluKCk7Cg=="\n\n[[artifacts]]\nartifact_name = "bits"\nfilter = true\n[artifacts.bits]\ncarve = true\n\n[[artifacts]]\nartifact_name = "registry"\nfilter = true\n[artifacts.registry]\nuser_hives = true\nsystem_hives = false\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "sus_7045_eids"\n# The script below is the same as the filter script. Its coded in a manner that will work as a filter and normal script\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvd2luZG93cy9ldmVudGxvZ3MudHMKZnVuY3Rpb24gZ2V0RXZlbnRsb2dzKHBhdGgpIHsKICBjb25zdCByZXN1bHRzID0gRGVuby5jb3JlLm9wcy5nZXRfZXZlbnRsb2dzKHBhdGgpOwogIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3VsdHMpOwogIHJldHVybiBkYXRhOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9lbnZpcm9ubWVudC9lbnYudHMKZnVuY3Rpb24gZ2V0RW52VmFsdWUoa2V5KSB7CiAgY29uc3QgZGF0YSA9IGVudi5lbnZpcm9ubWVudFZhbHVlKGtleSk7CiAgcmV0dXJuIGRhdGE7Cn0KCi8vIG1haW4udHMKZnVuY3Rpb24gZ3JhYkV2ZW50TG9ncygpIHsKICBjb25zdCBkcml2ZSA9IGdldEVudlZhbHVlKCJTeXN0ZW1Ecml2ZSIpOwogIGlmIChkcml2ZSA9PT0gIiIpIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IGdldEV2ZW50bG9ncygKICAgIGAke2RyaXZlfVxcV2luZG93c1xcU3lzdGVtMzJcXHdpbmV2dFxcTG9nc1xcU3lzdGVtLmV2dHhgCiAgKTsKICBjb25zdCBzZXJ2aWNlX2luc3RhbGxzID0gW107CiAgY29uc3Qgc3VzX3NlcnZpY2VzID0gWyIuYmF0IiwgInBvd2Vyc2hlbGwiLCAiY21kLmV4ZSIsICJDT01TUEVDIl07CiAgZm9yIChjb25zdCByZWNvcmQgb2YgZGF0YSkgewogICAgaWYgKHJlY29yZC5kYXRhWyJFdmVudCJdWyJTeXN0ZW0iXVsiRXZlbnRJRCJdICE9IDcwNDUgJiYgcmVjb3JkLmRhdGFbIkV2ZW50Il1bIlN5c3RlbSJdWyJFdmVudElEIl1bIiN0ZXh0Il0gIT0gNzA0NSkgewogICAgICBjb250aW51ZTsKICAgIH0KICAgIGlmIChyZWNvcmQuZGF0YVsiRXZlbnQiXVsiRXZlbnREYXRhIl1bIlNlcnZpY2VOYW1lIl0ubGVuZ3RoID09PSAxNiB8fCBzdXNfc2VydmljZXMuc29tZSgKICAgICAgKHZhbHVlKSA9PiByZWNvcmQuZGF0YVsiRXZlbnQiXVsiRXZlbnREYXRhIl1bIkltYWdlUGF0aCJdLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUpCiAgICApKSB7CiAgICAgIHNlcnZpY2VfaW5zdGFsbHMucHVzaChyZWNvcmQpOwogICAgfQogIH0KICByZXR1cm4gc2VydmljZV9pbnN0YWxsczsKfQpmdW5jdGlvbiBmaWx0ZXJSZWdpc3RyeShkYXRhKSB7CiAgY29uc3QgcmVncyA9IEpTT04ucGFyc2UoZGF0YSk7CiAgY29uc3Qgc3VzX3J1bl9rZXlzID0gWyJjbWQuZXhlIiwgInBvd2Vyc2hlbGwiLCAidGVtcCIsICJhcHBkYXRhIiwgInNjcmlwdCJdOwogIGNvbnN0IHN1c19oaXQgPSB7CiAgICByZWdpc3RyeV9maWxlOiByZWdzLnJlZ2lzdHJ5X2ZpbGUsCiAgICByZWdpc3RyeV9wYXRoOiByZWdzLnJlZ2lzdHJ5X3BhdGgsCiAgICByZWdpc3RyeV9lbnRyaWVzOiBbXQogIH07CiAgZm9yIChjb25zdCByZWNvcmQgb2YgcmVncy5yZWdpc3RyeV9lbnRyaWVzKSB7CiAgICBpZiAocmVjb3JkLm5hbWUgPT09ICJSdW4iIHx8IHJlY29yZC5uYW1lID09PSAiUnVuT25jZSIpIHsKICAgICAgY29uc3QgcmVnX2hpdCA9IHsKICAgICAgICBrZXk6IHJlY29yZC5rZXksCiAgICAgICAgbmFtZTogcmVjb3JkLm5hbWUsCiAgICAgICAgcGF0aDogcmVjb3JkLnBhdGgsCiAgICAgICAgdmFsdWVzOiBbXSwKICAgICAgICBsYXN0X21vZGlmaWVkOiByZWNvcmQubGFzdF9tb2RpZmllZCwKICAgICAgICBkZXB0aDogcmVjb3JkLmRlcHRoCiAgICAgIH07CiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgcmVjb3JkLnZhbHVlcykgewogICAgICAgIGlmIChzdXNfcnVuX2tleXMuc29tZSgKICAgICAgICAgIChyZWdfdmFsdWUpID0+IHZhbHVlLmRhdGEudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhyZWdfdmFsdWUpCiAgICAgICAgKSkgewogICAgICAgICAgcmVnX2hpdC52YWx1ZXMucHVzaCh2YWx1ZSk7CiAgICAgICAgfQogICAgICB9CiAgICAgIGlmIChyZWdfaGl0LnZhbHVlcy5sZW5ndGggPT09IDApIHsKICAgICAgICBjb250aW51ZTsKICAgICAgfQogICAgICBzdXNfaGl0LnJlZ2lzdHJ5X2VudHJpZXMucHVzaChyZWdfaGl0KTsKICAgIH0KICB9CiAgcmV0dXJuIHN1c19oaXQ7Cn0KZnVuY3Rpb24gZmlsdGVyQml0cyhkYXRhKSB7CiAgY29uc3QgYml0c19kYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICBjb25zdCBzdXNfYml0cyA9IHsKICAgIGJpdHM6IFtdLAogICAgY2FydmVkX2ZpbGVzOiBbXSwKICAgIGNhcnZlZF9qb2JzOiBbXQogIH07CiAgY29uc3Qgc3RhbmRhcmRfYml0cyA9IFsKICAgICJtb3ppbGxhIiwKICAgICJvdXRsb29rIiwKICAgICJlZGdlIiwKICAgICJvbmVkcml2ZSIsCiAgICAiZ29vZ2xlIiwKICAgICJzcGVlY2giCiAgXTsKICBmb3IgKGNvbnN0IGJpdCBvZiBiaXRzX2RhdGEuYml0cykgewogICAgaWYgKCFzdGFuZGFyZF9iaXRzLnNvbWUoCiAgICAgICh2YWx1ZSkgPT4gYml0LmZ1bGxfcGF0aC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlKQogICAgKSAmJiAhc3RhbmRhcmRfYml0cy5zb21lKCh2YWx1ZSkgPT4gYml0LnVybC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlKSkpIHsKICAgICAgc3VzX2JpdHMuYml0cy5wdXNoKGJpdCk7CiAgICB9CiAgfQogIGZvciAoY29uc3QgYml0IG9mIGJpdHNfZGF0YS5jYXJ2ZWRfZmlsZXMpIHsKICAgIGlmICghc3RhbmRhcmRfYml0cy5zb21lKAogICAgICAodmFsdWUpID0+IGJpdC5mdWxsX3BhdGgudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZSkKICAgICkgJiYgIXN0YW5kYXJkX2JpdHMuc29tZSgodmFsdWUpID0+IGJpdC51cmwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZSkpKSB7CiAgICAgIHN1c19iaXRzLmNhcnZlZF9maWxlcy5wdXNoKGJpdCk7CiAgICB9CiAgfQogIGZvciAoY29uc3QgYml0IG9mIGJpdHNfZGF0YS5jYXJ2ZWRfam9icykgewogICAgaWYgKCFzdGFuZGFyZF9iaXRzLnNvbWUoCiAgICAgICh2YWx1ZSkgPT4gYml0LnRhcmdldF9wYXRoLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUpCiAgICApKSB7CiAgICAgIHN1c19iaXRzLmNhcnZlZF9qb2JzLnB1c2goYml0KTsKICAgIH0KICB9CiAgcmV0dXJuIHN1c19iaXRzOwp9CmZ1bmN0aW9uIG1haW4oKSB7CiAgY29uc3QgYXJncyA9IFNUQVRJQ19BUkdTOwogIGlmIChhcmdzLmxlbmd0aCA8IDIpIHsKICAgIHJldHVybiBncmFiRXZlbnRMb2dzKCk7CiAgfQogIGlmIChhcmdzWzFdID09PSAicmVnaXN0cnkiKSB7CiAgICByZXR1cm4gZmlsdGVyUmVnaXN0cnkoYXJnc1swXSk7CiAgfQogIGlmIChhcmdzWzFdID09PSAiYml0cyIpIHsKICAgIHJldHVybiBmaWx0ZXJCaXRzKGFyZ3NbMF0pOwogIH0KICByZXR1cm4gSlNPTi5wYXJzZShhcmdzWzBdKTsKfQptYWluKCk7Cg=="\n'})}),"\n",(0,d.jsx)(g.p,{children:"A macOS collection script that does the following:"}),"\n",(0,d.jsxs)(g.ul,{children:["\n",(0,d.jsxs)(g.li,{children:["Parses and filters the ",(0,d.jsx)(g.strong,{children:"Persist"})," UnifiedLog files for log messags that\ncontain ",(0,d.jsx)(g.code,{children:"sudo"})," or ",(0,d.jsx)(g.code,{children:"osascript"})]}),"\n",(0,d.jsxs)(g.li,{children:["Parses and filters Fseventsd entries for evidence of ",(0,d.jsx)(g.code,{children:".dmg"})," files or files in\n",(0,d.jsx)(g.code,{children:"/tmp"})]}),"\n",(0,d.jsxs)(g.li,{children:["Parses and filters an App filelisting to list Applications and their\nassociated ",(0,d.jsx)(g.code,{children:"Info.plist"})," content"]}),"\n",(0,d.jsx)(g.li,{children:"Parses LoginItems and try to parse the associated persistence binary (if it\nexists and is a macho executable)"}),"\n"]}),"\n",(0,d.jsx)(g.p,{children:"The script is coded in a manner so that it can run as a filter or a normal\nscript."}),"\n",(0,d.jsx)(g.pre,{children:(0,d.jsx)(g.code,{className:"language-toml",children:'system = "macos"\n\n[output]\nname = "mac_filter"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "abdc"\ncollection_id = 1\noutput = "local"\nfilter_name = "unifiedlogs_fsevents_filter"\n# This script will filter for unifiedlogs, fseventsd, and files\nfilter_script = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvbG9naW5pdGVtcy50cwpmdW5jdGlvbiBnZXRMb2dpbml0ZW1zKCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9sb2dpbml0ZW1zKCk7CiAgY29uc3QgaXRlbXMgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiBpdGVtczsKfQoKLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvbWFjaG8udHMKZnVuY3Rpb24gZ2V0TWFjaG8ocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9tYWNobyhwYXRoKTsKICBpZiAoZGF0YSA9PT0gIiIpIHsKICAgIHJldHVybiBudWxsOwogIH0KICBjb25zdCBtYWNobyA9IEpTT04ucGFyc2UoZGF0YSk7CiAgcmV0dXJuIG1hY2hvOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9tYWNvcy9wbGlzdC50cwpmdW5jdGlvbiBnZXRQbGlzdChwYXRoKSB7CiAgY29uc3QgZGF0YSA9IERlbm8uY29yZS5vcHMuZ2V0X3BsaXN0KHBhdGgpOwogIGlmIChkYXRhID09PSAiIikgewogICAgcmV0dXJuIG51bGw7CiAgfQogIGNvbnN0IHBsaXN0X2RhdGEgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiBwbGlzdF9kYXRhOwp9CgovLyBtYWluLnRzCmZ1bmN0aW9uIGdyYWJMb2dpbkl0ZW1zKCkgewogIGNvbnN0IGRhdGEgPSBnZXRMb2dpbml0ZW1zKCk7CiAgY29uc3QgaXRlbXNNYWNobyA9IFtdOwogIGZvciAoY29uc3QgZW50cnkgb2YgZGF0YSkgewogICAgdHJ5IHsKICAgICAgY29uc3QgaXRlbSA9IHsKICAgICAgICBpdGVtczogZW50cnksCiAgICAgICAgbWFjaG86IGdldE1hY2hvKGVudHJ5LnBhdGguam9pbigiLyIpKQogICAgICB9OwogICAgICBpdGVtc01hY2hvLnB1c2goaXRlbSk7CiAgICB9IGNhdGNoIChfZSkgewogICAgICBjb25zdCBpdGVtID0gewogICAgICAgIGl0ZW1zOiBlbnRyeSwKICAgICAgICBtYWNobzogbnVsbAogICAgICB9OwogICAgICBpdGVtc01hY2hvLnB1c2goaXRlbSk7CiAgICB9CiAgfQogIHJldHVybiBpdGVtc01hY2hvOwp9CmZ1bmN0aW9uIGZpbHRlckxvZ3MoZGF0YSkgewogIGNvbnN0IGxvZ3MgPSBbXTsKICBjb25zdCBsb2dEYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICBmb3IgKGxldCBlbnRyeSA9IDA7IGVudHJ5IDwgbG9nRGF0YS5sZW5ndGg7IGVudHJ5KyspIHsKICAgIGlmICghbG9nRGF0YVtlbnRyeV0ubWVzc2FnZS5pbmNsdWRlcygic3VkbyIpICYmICFsb2dEYXRhW2VudHJ5XS5tZXNzYWdlLmluY2x1ZGVzKCJvc2FzY3JpcHQiKSkgewogICAgICBjb250aW51ZTsKICAgIH0KICAgIGxvZ3MucHVzaChsb2dEYXRhW2VudHJ5XSk7CiAgfQogIHJldHVybiBsb2dzOwp9CmZ1bmN0aW9uIGZpbHRlckV2ZW50cyhkYXRhKSB7CiAgY29uc3QgZXZlbnRzID0gW107CiAgY29uc3QgZXZlbnRzRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7CiAgZm9yIChjb25zdCBlbnRyeSBvZiBldmVudHNEYXRhKSB7CiAgICBpZiAoIWVudHJ5LnBhdGguaW5jbHVkZXMoIi5kbWciKSAmJiAhZW50cnkucGF0aC5zdGFydHNXaXRoKCIvdG1wIikpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBldmVudHMucHVzaChlbnRyeSk7CiAgfQogIHJldHVybiBldmVudHM7Cn0KZnVuY3Rpb24gZmlsdGVyQXBwcyhkYXRhKSB7CiAgY29uc3QgYXBwcyA9IFtdOwogIGNvbnN0IGZpbGVzRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7CiAgZm9yIChsZXQgZW50cnkgPSAwOyBlbnRyeSA8IGZpbGVzRGF0YS5sZW5ndGg7IGVudHJ5KyspIHsKICAgIGlmIChmaWxlc0RhdGFbZW50cnldLmZ1bGxfcGF0aC5pbmNsdWRlcygiLmFwcCIpICYmIGZpbGVzRGF0YVtlbnRyeV0uZmlsZW5hbWUgIT0gIkluZm8ucGxpc3QiKSB7CiAgICAgIGNvbnRpbnVlOwogICAgfQogICAgY29uc3QgYXBwID0gewogICAgICBhcHBfcGF0aDogZmlsZXNEYXRhW2VudHJ5XS5kaXJlY3RvcnksCiAgICAgIGluZm9fcGxpc3Q6IGZpbGVzRGF0YVtlbnRyeV0uZnVsbF9wYXRoLAogICAgICBwbGlzdDogZ2V0UGxpc3QoZmlsZXNEYXRhW2VudHJ5XS5mdWxsX3BhdGgpCiAgICB9OwogICAgYXBwcy5wdXNoKGFwcCk7CiAgfQogIHJldHVybiBhcHBzOwp9CmZ1bmN0aW9uIG1haW4oKSB7CiAgY29uc3QgYXJncyA9IFNUQVRJQ19BUkdTOwogIGlmIChhcmdzLmxlbmd0aCA8IDIpIHsKICAgIHJldHVybiBncmFiTG9naW5JdGVtcygpOwogIH0KICBpZiAoYXJnc1sxXSA9PT0gInVuaWZpZWRsb2dzIikgewogICAgcmV0dXJuIGZpbHRlckxvZ3MoYXJnc1swXSk7CiAgfQogIGlmIChhcmdzWzFdID09PSAiZnNldmVudHNkIikgewogICAgcmV0dXJuIGZpbHRlckV2ZW50cyhhcmdzWzBdKTsKICB9CiAgaWYgKGFyZ3NbMV0gPT09ICJmaWxlcyIpIHsKICAgIHJldHVybiBmaWx0ZXJBcHBzKGFyZ3NbMF0pOwogIH0KICByZXR1cm4gSlNPTi5wYXJzZShhcmdzWzBdKTsKfQptYWluKCk7Cg=="\n\n\n[[artifacts]]\nartifact_name = "unifiedlogs"\nfilter = true\n[artifacts.unifiedlogs]\nsources = ["Persist"]\n\n[[artifacts]]\nartifact_name = "fseventsd"\nfilter = true\n\n[[artifacts]]\nartifact_name = "files"\nfilter = true\n[artifacts.files]\nstart_path = "/System/Volumes/Data/Applications"\ndepth = 15\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "loginitems_macho" # No filtering applied\n# The script below is the same as the filter script. Its coded in a manner that will work as a filter and normal script\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvbG9naW5pdGVtcy50cwpmdW5jdGlvbiBnZXRMb2dpbml0ZW1zKCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9sb2dpbml0ZW1zKCk7CiAgY29uc3QgaXRlbXMgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiBpdGVtczsKfQoKLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvbWFjb3MvbWFjaG8udHMKZnVuY3Rpb24gZ2V0TWFjaG8ocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9tYWNobyhwYXRoKTsKICBpZiAoZGF0YSA9PT0gIiIpIHsKICAgIHJldHVybiBudWxsOwogIH0KICBjb25zdCBtYWNobyA9IEpTT04ucGFyc2UoZGF0YSk7CiAgcmV0dXJuIG1hY2hvOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9tYWNvcy9wbGlzdC50cwpmdW5jdGlvbiBnZXRQbGlzdChwYXRoKSB7CiAgY29uc3QgZGF0YSA9IERlbm8uY29yZS5vcHMuZ2V0X3BsaXN0KHBhdGgpOwogIGlmIChkYXRhID09PSAiIikgewogICAgcmV0dXJuIG51bGw7CiAgfQogIGNvbnN0IHBsaXN0X2RhdGEgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiBwbGlzdF9kYXRhOwp9CgovLyBtYWluLnRzCmZ1bmN0aW9uIGdyYWJMb2dpbkl0ZW1zKCkgewogIGNvbnN0IGRhdGEgPSBnZXRMb2dpbml0ZW1zKCk7CiAgY29uc3QgaXRlbXNNYWNobyA9IFtdOwogIGZvciAoY29uc3QgZW50cnkgb2YgZGF0YSkgewogICAgdHJ5IHsKICAgICAgY29uc3QgaXRlbSA9IHsKICAgICAgICBpdGVtczogZW50cnksCiAgICAgICAgbWFjaG86IGdldE1hY2hvKGVudHJ5LnBhdGguam9pbigiLyIpKQogICAgICB9OwogICAgICBpdGVtc01hY2hvLnB1c2goaXRlbSk7CiAgICB9IGNhdGNoIChfZSkgewogICAgICBjb25zdCBpdGVtID0gewogICAgICAgIGl0ZW1zOiBlbnRyeSwKICAgICAgICBtYWNobzogbnVsbAogICAgICB9OwogICAgICBpdGVtc01hY2hvLnB1c2goaXRlbSk7CiAgICB9CiAgfQogIHJldHVybiBpdGVtc01hY2hvOwp9CmZ1bmN0aW9uIGZpbHRlckxvZ3MoZGF0YSkgewogIGNvbnN0IGxvZ3MgPSBbXTsKICBjb25zdCBsb2dEYXRhID0gSlNPTi5wYXJzZShkYXRhKTsKICBmb3IgKGxldCBlbnRyeSA9IDA7IGVudHJ5IDwgbG9nRGF0YS5sZW5ndGg7IGVudHJ5KyspIHsKICAgIGlmICghbG9nRGF0YVtlbnRyeV0ubWVzc2FnZS5pbmNsdWRlcygic3VkbyIpICYmICFsb2dEYXRhW2VudHJ5XS5tZXNzYWdlLmluY2x1ZGVzKCJvc2FzY3JpcHQiKSkgewogICAgICBjb250aW51ZTsKICAgIH0KICAgIGxvZ3MucHVzaChsb2dEYXRhW2VudHJ5XSk7CiAgfQogIHJldHVybiBsb2dzOwp9CmZ1bmN0aW9uIGZpbHRlckV2ZW50cyhkYXRhKSB7CiAgY29uc3QgZXZlbnRzID0gW107CiAgY29uc3QgZXZlbnRzRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7CiAgZm9yIChjb25zdCBlbnRyeSBvZiBldmVudHNEYXRhKSB7CiAgICBpZiAoIWVudHJ5LnBhdGguaW5jbHVkZXMoIi5kbWciKSAmJiAhZW50cnkucGF0aC5zdGFydHNXaXRoKCIvdG1wIikpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBldmVudHMucHVzaChlbnRyeSk7CiAgfQogIHJldHVybiBldmVudHM7Cn0KZnVuY3Rpb24gZmlsdGVyQXBwcyhkYXRhKSB7CiAgY29uc3QgYXBwcyA9IFtdOwogIGNvbnN0IGZpbGVzRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7CiAgZm9yIChsZXQgZW50cnkgPSAwOyBlbnRyeSA8IGZpbGVzRGF0YS5sZW5ndGg7IGVudHJ5KyspIHsKICAgIGlmIChmaWxlc0RhdGFbZW50cnldLmZ1bGxfcGF0aC5pbmNsdWRlcygiLmFwcCIpICYmIGZpbGVzRGF0YVtlbnRyeV0uZmlsZW5hbWUgIT0gIkluZm8ucGxpc3QiKSB7CiAgICAgIGNvbnRpbnVlOwogICAgfQogICAgY29uc3QgYXBwID0gewogICAgICBhcHBfcGF0aDogZmlsZXNEYXRhW2VudHJ5XS5kaXJlY3RvcnksCiAgICAgIGluZm9fcGxpc3Q6IGZpbGVzRGF0YVtlbnRyeV0uZnVsbF9wYXRoLAogICAgICBwbGlzdDogZ2V0UGxpc3QoZmlsZXNEYXRhW2VudHJ5XS5mdWxsX3BhdGgpCiAgICB9OwogICAgYXBwcy5wdXNoKGFwcCk7CiAgfQogIHJldHVybiBhcHBzOwp9CmZ1bmN0aW9uIG1haW4oKSB7CiAgY29uc3QgYXJncyA9IFNUQVRJQ19BUkdTOwogIGlmIChhcmdzLmxlbmd0aCA8IDIpIHsKICAgIHJldHVybiBncmFiTG9naW5JdGVtcygpOwogIH0KICBpZiAoYXJnc1sxXSA9PT0gInVuaWZpZWRsb2dzIikgewogICAgcmV0dXJuIGZpbHRlckxvZ3MoYXJnc1swXSk7CiAgfQogIGlmIChhcmdzWzFdID09PSAiZnNldmVudHNkIikgewogICAgcmV0dXJuIGZpbHRlckV2ZW50cyhhcmdzWzBdKTsKICB9CiAgaWYgKGFyZ3NbMV0gPT09ICJmaWxlcyIpIHsKICAgIHJldHVybiBmaWx0ZXJBcHBzKGFyZ3NbMF0pOwogIH0KICByZXR1cm4gSlNPTi5wYXJzZShhcmdzWzBdKTsKfQptYWluKCk7Cg=="\n'})})]})}function m(I={}){const{wrapper:g}={...(0,l.R)(),...I.components};return g?(0,d.jsx)(g,{...I,children:(0,d.jsx)(b,{...I})}):b(I)}},8453:(I,g,c)=>{c.d(g,{R:()=>i,x:()=>n});var C=c(6540);const d={},l=C.createContext(d);function i(I){const g=C.useContext(l);return C.useMemo((function(){return"function"==typeof I?I(g):{...g,...I}}),[g,I])}function n(I){let g;return g=I.disableParentContext?"function"==typeof I.components?I.components(d):I.components||d:i(I.components),C.createElement(l.Provider,{value:g},I.children)}}}]);