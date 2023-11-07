"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5974],{1178:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=t(5893),a=t(1151);const i={sidebar_position:3,description:"What is bundling"},s="Bundling",o={id:"Intro/Scripting/bundling",title:"Bundling",description:"What is bundling",source:"@site/docs/Intro/Scripting/bundling.md",sourceDirName:"Intro/Scripting",slug:"/Intro/Scripting/bundling",permalink:"/artemis-api/docs/Intro/Scripting/bundling",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/bundling.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,description:"What is bundling"},sidebar:"artemisStart",previous:{title:"TypeScript",permalink:"/artemis-api/docs/Intro/Scripting/typescript"},next:{title:"Filtering",permalink:"/artemis-api/docs/Intro/Scripting/filterscripts"}},l={},c=[{value:"Deno Builtin Bundler",id:"deno-builtin-bundler",level:2},{value:"<code>--no-check</code> Flag",id:"--no-check-flag",level:3},{value:"Output",id:"output",level:3},{value:"Esbuild",id:"esbuild",level:2},{value:"Output",id:"output-1",level:3}];function u(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"bundling",children:"Bundling"}),"\n",(0,r.jsx)(e.p,{children:"Currently artemis requires that we have all of our JavaScript code in one .js\nfile. However, while very simple scripts may only be one file, if we decide to\nimport an artemis function, or split our code into multiple files we now have\nmultiple files that need to be combine into one .js file."}),"\n",(0,r.jsx)(e.p,{children:"A Bundler can help us perform this task."}),"\n",(0,r.jsxs)(e.p,{children:["The TypeScrpt code below imports a function and the ",(0,r.jsx)(e.code,{children:"Registry"})," interface from\nartemis."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-typescript",children:'import { getRegistry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\nimport { Registry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts";\n\ninterface InstalledPrograms {\n  name: string;\n  version: string;\n  install_location: string;\n  install_source: string;\n  language: string;\n  publisher: string;\n  install_string: string;\n  install_date: string;\n  uninstall_string: string;\n  url_info: string;\n  reg_path: string;\n}\n\nfunction grab_info(reg: Registry[]): InstalledPrograms[] {\n  const programs: InstalledPrograms[] = [];\n  const min_size = 3;\n  for (const entries of reg) {\n    if (entries.values.length < min_size) {\n      continue;\n    }\n    const program: InstalledPrograms = {\n      name: "",\n      version: "",\n      install_location: "",\n      install_source: "",\n      language: "",\n      publisher: "",\n      install_string: "",\n      install_date: "",\n      uninstall_string: "",\n      url_info: "",\n      reg_path: entries.path,\n    };\n\n    for (const value of entries.values) {\n      switch (value.value) {\n        case "DisplayName":\n          program.name = value.data;\n          break;\n        case "DisplayVersion":\n          program.version = value.data;\n          break;\n        case "InstallDate":\n          program.install_date = value.data;\n          break;\n        case "InstallLocation":\n          program.install_location = value.data;\n          break;\n        case "InstallSource":\n          program.install_source = value.data;\n          break;\n        case "Language":\n          program.language = value.data;\n          break;\n        case "Publisher":\n          program.publisher = value.data;\n          break;\n        case "UninstallString":\n          program.uninstall_string = value.data;\n          break;\n        case "URLInfoAbout":\n          program.url_info = value.data;\n          break;\n        default:\n          continue;\n      }\n    }\n    programs.push(program);\n  }\n  return programs;\n}\n\nfunction main() {\n  const path = "C:\\\\Windows\\\\System32\\\\config\\\\SOFTWARE";\n\n  const reg = getRegistry(path);\n  const programs: Registry[] = [];\n  for (const entries of reg) {\n    if (\n      !entries.path.includes(\n        "Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall",\n      )\n    ) {\n      continue;\n    }\n    programs.push(entries);\n  }\n  return grab_info(programs);\n}\n\nmain();\n'})}),"\n",(0,r.jsxs)(e.p,{children:["Lets save this code to the file ",(0,r.jsx)(e.code,{children:"main.ts"}),". Before we can compile the code to\nJavaScript we have to include (bundle) ",(0,r.jsx)(e.code,{children:"mod.ts"})," and ",(0,r.jsx)(e.code,{children:"registry.ts"}),"."]}),"\n",(0,r.jsx)(e.p,{children:"There are multiple types of bundler applications that can help us with this\ntask. Two (2) we will focus on are:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"The builtin bundler in Deno"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://deno.land/x/esbuild_deno_loader@0.6.0",children:"esbuild Deno loader"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"deno-builtin-bundler",children:"Deno Builtin Bundler"}),"\n",(0,r.jsxs)(e.p,{children:["To bundle our ",(0,r.jsx)(e.code,{children:"main.ts"})," and compile to a ",(0,r.jsx)(e.code,{children:".js"})," file. We just need to run:\n",(0,r.jsx)(e.code,{children:"deno bundle  --no-check main.ts > main.js"}),". By default ",(0,r.jsx)(e.code,{children:"Deno"})," wil output to the\nconsole when bundling."]}),"\n",(0,r.jsxs)(e.h3,{id:"--no-check-flag",children:[(0,r.jsx)(e.code,{children:"--no-check"})," Flag"]}),"\n",(0,r.jsxs)(e.p,{children:["This flag tells ",(0,r.jsx)(e.code,{children:"Deno"})," not to type check values. This flag is required due to:\n",(0,r.jsx)(e.code,{children:"Deno.core.ops.get_registry(path)"})]}),"\n",(0,r.jsx)(e.p,{children:"The Deno binary is designed to support code written for the Deno platform.\nHowever, we are using a custom Deno runtime."}),"\n",(0,r.jsxs)(e.p,{children:["The Deno binary has no idea what ",(0,r.jsx)(e.code,{children:"get_registry"})," is because it is a custom\nfunction we have registered in our own runtime."]}),"\n",(0,r.jsx)(e.h3,{id:"output",children:"Output"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:'// deno-fmt-ignore-file\n// deno-lint-ignore-file\n// This code was bundled using `deno bundle` and it\'s not recommended to edit it manually\n\nfunction get_registry(path) {\n    const data = Deno.core.ops.get_registry(path);\n    const reg_array = JSON.parse(data);\n    return reg_array;\n}\nfunction getRegistry(path) {\n    return get_registry(path);\n}\nfunction grab_info(reg) {\n    const programs = [];\n    for (const entries of reg){\n        if (entries.values.length < 3) {\n            continue;\n        }\n        const program = {\n            name: "",\n            version: "",\n            install_location: "",\n            install_source: "",\n            language: "",\n            publisher: "",\n            install_string: "",\n            install_date: "",\n            uninstall_string: "",\n            url_info: "",\n            reg_path: entries.path\n        };\n        for (const value of entries.values){\n            switch(value.value){\n                case "DisplayName":\n                    program.name = value.data;\n                    break;\n                case "DisplayVersion":\n                    program.version = value.data;\n                    break;\n                case "InstallDate":\n                    program.install_date = value.data;\n                    break;\n                case "InstallLocation":\n                    program.install_location = value.data;\n                    break;\n                case "InstallSource":\n                    program.install_source = value.data;\n                    break;\n                case "Language":\n                    program.language = value.data;\n                    break;\n                case "Publisher":\n                    program.publisher = value.data;\n                    break;\n                case "UninstallString":\n                    program.uninstall_string = value.data;\n                    break;\n                case "URLInfoAbout":\n                    program.url_info = value.data;\n                    break;\n                default:\n                    continue;\n            }\n        }\n        programs.push(program);\n    }\n    return programs;\n}\nfunction main() {\n    const path = "C:\\\\Windows\\\\System32\\\\config\\\\SOFTWARE";\n    const reg = getRegistry(path);\n    const programs = [];\n    for (const entries of reg){\n        if (!entries.path.includes("Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall")) {\n            continue;\n        }\n        programs.push(entries);\n    }\n    return grab_info(programs);\n}\nmain();\n'})}),"\n",(0,r.jsxs)(e.p,{children:["The JavaScript code above was generated with the ",(0,r.jsx)(e.code,{children:"deno bundle"})," command and is\nnow ready to be executed by artemis!"]}),"\n",(0,r.jsx)(e.h2,{id:"esbuild",children:"Esbuild"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://esbuild.github.io/",children:"esbuild"})," is a popular Bundler for JavaScript. It is\nnormally run as a standalone binary, however we can import a module that lets us\ndynamically execute esbuild using Deno. In order to do this we need a build\nscript. Using the same ",(0,r.jsx)(e.code,{children:"main.ts"})," file above, create a ",(0,r.jsx)(e.code,{children:"build.ts"})," file in the\nsame directory. Add the following code to ",(0,r.jsx)(e.code,{children:"build.ts"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-typescript",children:'import * as esbuild from "https://deno.land/x/esbuild@v0.15.10/mod.js";\nimport { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";\n\nasync function main() {\n  const _result = await esbuild.build({\n    plugins: [denoPlugin()],\n    entryPoints: ["./main.ts"],\n    outfile: "main.js",\n    bundle: true,\n    format: "cjs",\n  });\n\n  esbuild.stop();\n}\n\nmain();\n'})}),"\n",(0,r.jsxs)(e.p,{children:["The above script will use the ",(0,r.jsx)(e.code,{children:"main.ts"})," file and bundle all of its pre-requisite\nfiles into one .js file using esbuild. We then execute this code using\n",(0,r.jsx)(e.code,{children:"deno run build.ts"})]}),"\n",(0,r.jsx)(e.h3,{id:"output-1",children:"Output"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:'// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts\nfunction get_registry(path) {\n  const data = Deno.core.ops.get_registry(path);\n  const reg_array = JSON.parse(data);\n  return reg_array;\n}\n\n// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts\nfunction getRegistry(path) {\n  return get_registry(path);\n}\n\n// main.ts\nfunction grab_info(reg) {\n  const programs = [];\n  const min_size = 3;\n  for (const entries of reg) {\n    if (entries.values.length < min_size) {\n      continue;\n    }\n    const program = {\n      name: "",\n      version: "",\n      install_location: "",\n      install_source: "",\n      language: "",\n      publisher: "",\n      install_string: "",\n      install_date: "",\n      uninstall_string: "",\n      url_info: "",\n      reg_path: entries.path,\n    };\n    for (const value of entries.values) {\n      switch (value.value) {\n        case "DisplayName":\n          program.name = value.data;\n          break;\n        case "DisplayVersion":\n          program.version = value.data;\n          break;\n        case "InstallDate":\n          program.install_date = value.data;\n          break;\n        case "InstallLocation":\n          program.install_location = value.data;\n          break;\n        case "InstallSource":\n          program.install_source = value.data;\n          break;\n        case "Language":\n          program.language = value.data;\n          break;\n        case "Publisher":\n          program.publisher = value.data;\n          break;\n        case "UninstallString":\n          program.uninstall_string = value.data;\n          break;\n        case "URLInfoAbout":\n          program.url_info = value.data;\n          break;\n        default:\n          continue;\n      }\n    }\n    programs.push(program);\n  }\n  return programs;\n}\nfunction main() {\n  const path = "C:\\\\Windows\\\\System32\\\\config\\\\SOFTWARE";\n  const reg = getRegistry(path);\n  const programs = [];\n  for (const entries of reg) {\n    if (\n      !entries.path.includes(\n        "Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall",\n      )\n    ) {\n      continue;\n    }\n    programs.push(entries);\n  }\n  return grab_info(programs);\n}\nmain();\n'})}),"\n",(0,r.jsxs)(e.p,{children:["The JavaScript code above was generated by esbuild via ",(0,r.jsx)(e.code,{children:"Deno"})," and is now ready\nto be executed by artemis!"]})]})}function d(n={}){const{wrapper:e}={...(0,a.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(u,{...n})}):u(n)}},1151:(n,e,t)=>{t.d(e,{Z:()=>o,a:()=>s});var r=t(7294);const a={},i=r.createContext(a);function s(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:s(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);