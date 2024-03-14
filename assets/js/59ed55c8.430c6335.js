"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[9060],{7192:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var n=s(7624),t=s(2172);const r={description:"Services installed on Windows",keywords:["windows","registry","persistence"]},c="Services",o={id:"Artifacts/Windows Artfacts/services",title:"Services",description:"Services installed on Windows",source:"@site/docs/Artifacts/Windows Artfacts/services.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/services",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/services",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/services.md",tags:[],version:"current",frontMatter:{description:"Services installed on Windows",keywords:["windows","registry","persistence"]},sidebar:"artemisArtifacts",previous:{title:"Search",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/search"},next:{title:"Shellbags",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shellbags"}},a={},l=[];function d(e){const i={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h1,{id:"services",children:"Services"}),"\n",(0,n.jsxs)(i.p,{children:["Windows ",(0,n.jsx)(i.code,{children:"Services"})," are a common form of persistence and privilege escalation on\nWindows systems. Service data is stored in the SYSTEM Registry file.",(0,n.jsx)("br",{}),"\n",(0,n.jsx)(i.code,{children:"Services"})," run with SYSTEM level privileges."]}),"\n",(0,n.jsx)(i.p,{children:"Other Parsers:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Any tool that can read the Registry"}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://docs.velociraptor.app/artifact_references/pages/windows.system.services/",children:"Velociraptor"})}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"References:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://forensafe.com/blogs/windowsservices.html",children:"Services"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://github.com/Velocidex/velociraptor/blob/master/artifacts/definitions/Windows/System/Services.yaml",children:"Velociraptor"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://winreg-kb.readthedocs.io/en/latest/sources/system-keys/Services-and-drivers.html",children:"Libyal"})}),"\n"]}),"\n",(0,n.jsx)(i.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "services_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "services"\n[artifacts.services]\n# alt_file = "C:\\\\Artifacts\\\\SYSTEM"\n'})}),"\n",(0,n.jsx)(i.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:[(0,n.jsx)(i.code,{children:"alt_file"})," Full path to alternative SYSTEM Registry file. This configuration\nis ",(0,n.jsx)(i.strong,{children:"optional"}),". By default artemis will parse the SYSTEM Registry at the\ndefault location."]}),"\n"]}),"\n",(0,n.jsx)(i.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(i.p,{children:["An array of ",(0,n.jsx)(i.code,{children:"Services"})," entries"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-typescript",children:"export interface Services {\n  /**Current State of the Service */\n  state: string;\n  /**Name of Service */\n  name: string;\n  /**Display name of Service */\n  display_name: string;\n  /**Service description */\n  description: string;\n  /**Start mode of Service */\n  start_mode: string;\n  /**Path to executable for Service */\n  path: string;\n  /**Service types. Ex: KernelDriver */\n  service_type: string[];\n  /**Account associated with Service */\n  account: string;\n  /**Registry modified timestamp in UNIXEPOCH seconds. May be used to determine when the Service was created */\n  modified: number;\n  /**DLL associated with Service */\n  service_dll: string;\n  /**Service command upon failure */\n  failure_command: string;\n  /**Reset period associated with Service */\n  reset_period: number;\n  /**Service actions upon failure */\n  failure_actions: FailureActions[];\n  /**Privileges associated with Service */\n  required_privileges: string[];\n  /**Error associated with Service */\n  error_control: string;\n  /**Registry path associated with Service */\n  reg_path: string;\n}\n\n/**\n * Failure actions executed when Service fails\n */\ninterface FailureActions {\n  /**Action executed upon failure */\n  action: string;\n  /**Delay in seconds on failure */\n  delay: number;\n}\n"})})]})}function h(e={}){const{wrapper:i}={...(0,t.M)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},2172:(e,i,s)=>{s.d(i,{I:()=>o,M:()=>c});var n=s(1504);const t={},r=n.createContext(t);function c(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);