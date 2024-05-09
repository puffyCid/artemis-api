"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[7074],{2108:(c,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>C,frontMatter:()=>g,metadata:()=>d,toc:()=>s});var e=t(7624),i=t(2172);const g={sidebar_position:1,description:"Windows Execution Artifacts"},o="Execution",d={id:"Intro/Collections/Examples/execution",title:"Execution",description:"Windows Execution Artifacts",source:"@site/docs/Intro/Collections/Examples/execution.md",sourceDirName:"Intro/Collections/Examples",slug:"/Intro/Collections/Examples/execution",permalink:"/artemis-api/docs/Intro/Collections/Examples/execution",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Collections/Examples/execution.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,sidebarPosition:1,frontMatter:{sidebar_position:1,description:"Windows Execution Artifacts"},sidebar:"artemisStart",previous:{title:"Examples",permalink:"/artemis-api/docs/category/examples"},next:{title:"File Listings",permalink:"/artemis-api/docs/Intro/Collections/Examples/file_listings"}},a={},s=[];function I(c){const n={code:"code",h1:"h1",p:"p",pre:"pre",...(0,i.M)(),...c.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.h1,{id:"execution",children:"Execution"}),"\n",(0,e.jsx)(n.p,{children:"Windows TOML collection to parse artifacts commonly associated with execution"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "execution_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "prefetch"\n[artifacts.prefetch]\n\n[[artifacts]]\nartifact_name = "amcache"\n[artifacts.amcache]\n\n[[artifacts]]\nartifact_name = "shimcache"\n[artifacts.shimcache]\n\n[[artifacts]]\nartifact_name = "userassist"\n[artifacts.userassist]\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "muicache"\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvd2luZG93cy9yZWdpc3RyeS50cwpmdW5jdGlvbiBnZXRSZWdpc3RyeShwYXRoKSB7CiAgY29uc3QgZGF0YSA9IERlbm8uY29yZS5vcHMuZ2V0X3JlZ2lzdHJ5KHBhdGgpOwogIGNvbnN0IHJlc3VsdHMgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiByZXN1bHRzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9lbnZpcm9ubWVudC9lbnYudHMKZnVuY3Rpb24gZ2V0RW52VmFsdWUoa2V5KSB7CiAgY29uc3QgZGF0YSA9IGVudi5lbnZpcm9ubWVudFZhbHVlKGtleSk7CiAgcmV0dXJuIGRhdGE7Cn0KCi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdWZmeWNpZC9hcnRlbWlzLWFwaS9tYXN0ZXIvc3JjL2ZpbGVzeXN0ZW0vZGlyZWN0b3J5LnRzCmFzeW5jIGZ1bmN0aW9uIHJlYWREaXIocGF0aCkgewogIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGF3YWl0IGZzLnJlYWREaXIocGF0aCkpOwogIHJldHVybiBkYXRhOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9maWxlc3lzdGVtL2ZpbGVzLnRzCmZ1bmN0aW9uIHN0YXQocGF0aCkgewogIGNvbnN0IGRhdGEgPSBmcy5zdGF0KHBhdGgpOwogIGNvbnN0IHZhbHVlID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gdmFsdWU7Cn0KCi8vIG1haW4udHMKYXN5bmMgZnVuY3Rpb24gbWFpbigpIHsKICBjb25zdCBkcml2ZSA9IGdldEVudlZhbHVlKCJTeXN0ZW1Ecml2ZSIpOwogIGlmIChkcml2ZSA9PT0gIiIpIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgbXVpX2FycmF5ID0gW107CiAgY29uc3QgdXNlcnMgPSBgJHtkcml2ZX1cXFVzZXJzYDsKICBmb3IgKGNvbnN0IGVudHJ5IG9mIGF3YWl0IHJlYWREaXIodXNlcnMpKSB7CiAgICB0cnkgewogICAgICBjb25zdCBwYXRoID0gYCR7dXNlcnN9XFwke2VudHJ5LmZpbGVuYW1lfVxcQXBwRGF0YVxcTG9jYWxcXE1pY3Jvc29mdFxcV2luZG93c1xcVXNyQ2xhc3MuZGF0YDsKICAgICAgY29uc3Qgc3RhdHVzID0gc3RhdChwYXRoKTsKICAgICAgaWYgKCFzdGF0dXMuaXNfZmlsZSkgewogICAgICAgIGNvbnRpbnVlOwogICAgICB9CiAgICAgIGNvbnN0IHJlZ19yZXN1bHRzID0gZ2V0UmVnaXN0cnkocGF0aCk7CiAgICAgIGZvciAoY29uc3QgcmVnX2VudHJ5IG9mIHJlZ19yZXN1bHRzKSB7CiAgICAgICAgaWYgKHJlZ19lbnRyeS5wYXRoLmluY2x1ZGVzKAogICAgICAgICAgIkxvY2FsIFNldHRpbmdzXFxTb2Z0d2FyZVxcTWljcm9zb2Z0XFxXaW5kb3dzXFxTaGVsbFxcTXVpQ2FjaGUiCiAgICAgICAgKSkgewogICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiByZWdfZW50cnkudmFsdWVzKSB7CiAgICAgICAgICAgIGlmICh2YWx1ZS5kYXRhX3R5cGUgIT0gIlJFR19TWiIpIHsKICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zdCBtdWljYWNoZSA9IHsKICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogdmFsdWUudmFsdWUsCiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbHVlLmRhdGEKICAgICAgICAgICAgfTsKICAgICAgICAgICAgbXVpX2FycmF5LnB1c2gobXVpY2FjaGUpOwogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfQogICAgfSBjYXRjaCAoX2UpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgfQogIHJldHVybiBtdWlfYXJyYXk7Cn0KbWFpbigpOwo="\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "eventlogs_4688"\nscript = "Ly8gLi4vLi4vYXJ0ZW1pcy1hcGkvc3JjL3dpbmRvd3MvZXZlbnRsb2dzLnRzCmZ1bmN0aW9uIGdldF9ldmVudGxvZ3MocGF0aCkgewogIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9ldmVudGxvZ3MocGF0aCk7CiAgY29uc3QgbG9nX2FycmF5ID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gbG9nX2FycmF5Owp9CgovLyAuLi8uLi9hcnRlbWlzLWFwaS9tb2QudHMKZnVuY3Rpb24gZ2V0RXZlbnRMb2dzKHBhdGgpIHsKICByZXR1cm4gZ2V0X2V2ZW50bG9ncyhwYXRoKTsKfQoKLy8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IHBhdGggPSAiQzpcXFdpbmRvd3NcXFN5c3RlbTMyXFx3aW5ldnRcXExvZ3NcXFNlY3VyaXR5LmV2dHgiOwogIGNvbnN0IHJlY29yZHMgPSBnZXRFdmVudExvZ3MocGF0aCk7CiAgY29uc3QgcHJvY2Vzc2VzID0gW107CiAgZm9yIChjb25zdCByZWNvcmQgb2YgcmVjb3JkcykgewogICAgaWYgKHJlY29yZC5kYXRhWyJFdmVudCJdWyJTeXN0ZW0iXVsiRXZlbnRJRCJdICE9IDQ2ODgpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBwcm9jZXNzZXMucHVzaChyZWNvcmQpOwogIH0KICByZXR1cm4gcHJvY2Vzc2VzOwp9Cm1haW4oKTsK"\n'})})]})}function C(c={}){const{wrapper:n}={...(0,i.M)(),...c.components};return n?(0,e.jsx)(n,{...c,children:(0,e.jsx)(I,{...c})}):I(c)}},2172:(c,n,t)=>{t.d(n,{I:()=>d,M:()=>o});var e=t(1504);const i={},g=e.createContext(i);function o(c){const n=e.useContext(g);return e.useMemo((function(){return"function"==typeof c?c(n):{...n,...c}}),[n,c])}function d(c){let n;return n=c.disableParentContext?"function"==typeof c.components?c.components(i):c.components||i:o(c.components),e.createElement(g.Provider,{value:n},c.children)}}}]);