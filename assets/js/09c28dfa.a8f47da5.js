"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5946],{28453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(96540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}},72586:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"Artifacts/Windows Artfacts/registry","title":"Registry","description":"Primary source of Windows configuration settings","source":"@site/docs/Artifacts/Windows Artfacts/registry.md","sourceDirName":"Artifacts/Windows Artfacts","slug":"/Artifacts/Windows Artfacts/registry","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/registry","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/registry.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"Primary source of Windows configuration settings","keywords":["windows","registry"]},"sidebar":"artemisArtifacts","previous":{"title":"RecycleBin","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/recyclebin"},"next":{"title":"Search","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/search"}}');var i=s(74848),r=s(28453);const o={description:"Primary source of Windows configuration settings",keywords:["windows","registry"]},a="Registry",c={},l=[];function d(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"registry",children:"Registry"})}),"\n",(0,i.jsxs)(n.p,{children:["Windows ",(0,i.jsx)(n.code,{children:"Registry"})," is a collection of binary files that store Windows\nconfiguration settings and OS information. There are multiple ",(0,i.jsx)(n.code,{children:"Registry"})," files\non a system such as:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"C:\\Windows\\System32\\config\\SYSTEM"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"C:\\Windows\\System32\\config\\SOFTWARE"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"C:\\Windows\\System32\\config\\SAM"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"C:\\Windows\\System32\\config\\SECURITY"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"C:\\Users\\%\\NTUSER.DAT"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"C:\\Users\\%\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Other Parser:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.velociraptor.app/artifact_references/pages/windows.registry.ntuser/",children:"Velociraptor"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/libyal/libregf",children:"Libyal"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md",children:"Registry Format"})}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "registry_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "registry" # Parses the whole Registry file\n[artifacts.registry]\nuser_hives = true # All NTUSER.DAT and UsrClass.dat\nsystem_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY\n# Optional\n# alt_file = "C:\\\\Artifacts\\\\SYSTEM"\n# Optional\n# path_regex = "" # Registry is converted to lowercase before all comparison operations. So any regex input will also be converted to lowercase\n'})}),"\n",(0,i.jsx)(n.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"user_hives"})," Parse all user Registry files ",(0,i.jsx)(n.code,{children:"NTUSER.DAT"})," and ",(0,i.jsx)(n.code,{children:"UsrClass.dat"}),".\nThis configuration is ",(0,i.jsx)(n.strong,{children:"required"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"system_hives"})," Parse all system Registry files ",(0,i.jsx)(n.code,{children:"SYSTEM"}),", ",(0,i.jsx)(n.code,{children:"SAM"}),", ",(0,i.jsx)(n.code,{children:"SOFTWARE"}),",\n",(0,i.jsx)(n.code,{children:"SECURITY"}),". This configuration is ",(0,i.jsx)(n.strong,{children:"required"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"alt_file"})," Full path to alternative Registry file. This configuration is\n",(0,i.jsx)(n.strong,{children:"optional"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"path_regex"})," Only return Registry keys that match provided ",(0,i.jsx)(n.code,{children:"path_regex"}),". All\ncomparisons are first converted to lowercase. This configuration is\n",(0,i.jsx)(n.strong,{children:"optional"}),". Default is no Regex"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(n.p,{children:["An array of ",(0,i.jsx)(n.code,{children:"Registry"})," entries for each parsed file"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"/**\n * Inteface representing the parsed `Registry` structure\n */\nexport interface Registry {\n  /**\n   * Full path to `Registry` key and name.\n   * Ex: ` ROOT\\...\\CurrentVersion\\Run`\n   */\n  path: string;\n  /**\n   * Path to Key\n   * Ex: ` ROOT\\...\\CurrentVersion`\n   */\n  key: string;\n  /**\n   * Key name\n   * Ex: `Run`\n   */\n  name: string;\n  /**\n   * Values associated with key name\n   * Ex: `Run => Vmware`. Where Run is the `key` name and `Vmware` is the value name\n   */\n  values: Value[];\n  /**Timestamp of when the path was last modified */\n  last_modified: number;\n  /**Depth of key name */\n  depth: number;\n  /**Path to Registry file */\n  registry_path: string;\n  /**Registry file name */\n  registry_file: string;\n}\n\n/**\n * The value data associated with Registry key\n * References:\n *   https://github.com/libyal/libregf\n *   https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md\n */\nexport interface Value {\n  /**Name of Value */\n  value: string;\n  /**\n   * Data associated with value. All types are strings by default. The real type can be determined by `data_type`.\n   * `REG_BINARY` is a base64 encoded string\n   */\n  data: string;\n  /**\n   * Value type.\n   * Full list of types at: https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry-value-types\n   */\n  data_type: string;\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);