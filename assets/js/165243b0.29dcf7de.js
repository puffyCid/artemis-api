"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6392],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),u=i,f=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8148:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:7,description:"A full walkthrough"},o="Step by Step Guide",s={unversionedId:"Intro/Scripting/walkthrough",id:"Intro/Scripting/walkthrough",title:"Step by Step Guide",description:"A full walkthrough",source:"@site/docs/Intro/Scripting/walkthrough.md",sourceDirName:"Intro/Scripting",slug:"/Intro/Scripting/walkthrough",permalink:"/artemis-api/docs/Intro/Scripting/walkthrough",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Scripting/walkthrough.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,description:"A full walkthrough"},sidebar:"artemisStart",previous:{title:"Limitations",permalink:"/artemis-api/docs/Intro/Scripting/limitations"},next:{title:"Artemis Library",permalink:"/artemis-api/docs/category/artemis-library"}},l={},p=[],c={toc:p},m="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"step-by-step-guide"},"Step by Step Guide"),(0,i.kt)("p",null,"Lets create an simple script that will collect a process listing that returns\nonly processes that are using more than 200MB of memory. Make sure you have all\nof the ",(0,i.kt)("a",{parentName:"p",href:"/artemis-api/docs/Intro/Scripting/deno"},"prequisites")," before getting started!"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"First we need to initialize our script. You can name it anything you want.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"deno init process_usage\n")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Deno created two extra files we do not need.\n",(0,i.kt)("inlineCode",{parentName:"li"},"main_bench.ts and main_test.ts"),". We can delete them. In addition, lets clear\nthe ",(0,i.kt)("inlineCode",{parentName:"li"},"main.ts")," and make sure its empty."),(0,i.kt)("li",{parentName:"ol"},"Now using a text editor or IDE we need to import the necessary functions to\ncollect our data. Since we are only collecting a process listing we only need\nto import one function. In the ",(0,i.kt)("inlineCode",{parentName:"li"},"main.ts")," file add the following")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";\n')),(0,i.kt)("p",null,"You may get a warning or error about ",(0,i.kt)("inlineCode",{parentName:"p"},"processListing")," not found. We should be\nable to resolve this by right clicking the URL and selecting ",(0,i.kt)("inlineCode",{parentName:"p"},"cache module"),".\nDeno will cache the entire ",(0,i.kt)("inlineCode",{parentName:"p"},"artemis-api")," to our local system."),(0,i.kt)("ol",{start:4},(0,i.kt)("li",{parentName:"ol"},"Now lets call our ",(0,i.kt)("inlineCode",{parentName:"li"},"processListing")," function!")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";\n\nfunction main() {\n  const md5 = false;\n  const sha1 = false;\n  const sha256 = false;\n  const binary_info = true;\n\n  const proc_list = processListing(md5, sha1, sha256, binary_info);\n}\n')),(0,i.kt)("p",null,"If you hover over ",(0,i.kt)("inlineCode",{parentName:"p"},"processListing")," function you should see the function expects\nfour optional arguments:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Enable MD5 hashing"),(0,i.kt)("li",{parentName:"ul"},"Enable SHA1 hashing"),(0,i.kt)("li",{parentName:"ul"},"Enable SHA256 hashing"),(0,i.kt)("li",{parentName:"ul"},"Collect binary metadata")),(0,i.kt)("p",null,"All of these arguments are optional. The default values are ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),". In this\nexample, we will provide arguments but will still set them to false."),(0,i.kt)("ol",{start:5},(0,i.kt)("li",{parentName:"ol"},"Now since we have called our function, we want to now filter the data to only\ninclude processes using more than 200MB of memory. We can use a simple ",(0,i.kt)("inlineCode",{parentName:"li"},"for"),"\nloop to do this")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";\n\nfunction main() {\n  const md5 = false;\n  const sha1 = false;\n  const sha256 = false;\n  const binary_info = false;\n\n  const proc_list = processListing(md5, sha1, sha256, binary_info);\n\n  const filter_list = [];\n  for (const entry of proc_list) {\n    if (entry.memory_usage > 200204864) {\n      console.log(`High memory usage ${entry.full_path}`);\n      filter_list.push(entry);\n    }\n  }\n}\n')),(0,i.kt)("p",null,"Here we are looping through the process list data and only keeping entries that\nhave memory usage above 200MB. Your IDE or text editor ",(0,i.kt)("strong",{parentName:"p"},"should")," provide\nauto-complete suggestions for the process listing. This should help make\nscripting less challenging!"),(0,i.kt)("ol",{start:6},(0,i.kt)("li",{parentName:"ol"},"Now lets return our data and make sure artemis will call our ",(0,i.kt)("inlineCode",{parentName:"li"},"main()"),"\nfunction.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";\n\nfunction main() {\n  const md5 = false;\n  const sha1 = false;\n  const sha256 = false;\n  const binary_info = true;\n\n  const proc_list = processListing(md5, sha1, sha256, binary_info);\n\n  const filter_list = [];\n  for (const entry of proc_list) {\n    if (entry.memory_usage > 200204864) {\n      console.log(`High memory usage ${entry.full_path}`);\n      filter_list.push(entry);\n    }\n  }\n\n  return filter_list;\n}\n\nmain();\n')),(0,i.kt)("p",null,"Thats it! We now have a simple script that filters a process listing."),(0,i.kt)("ol",{start:7},(0,i.kt)("li",{parentName:"ol"},"Now before we run our script, we need to ",(0,i.kt)("a",{parentName:"li",href:"/artemis-api/docs/Intro/Scripting/bundling"},"bundle")," all of the\ncode into one JavaScript file. Create the file ",(0,i.kt)("inlineCode",{parentName:"li"},"build.ts")," in the same\ndirectory as ",(0,i.kt)("inlineCode",{parentName:"li"},"main.ts"),". And copy the following into ",(0,i.kt)("inlineCode",{parentName:"li"},"build.ts"),":")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'import * as esbuild from "https://deno.land/x/esbuild@v0.15.10/mod.js";\nimport { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";\n\nasync function main() {\n  const _result = await esbuild.build({\n    plugins: [denoPlugin()],\n    entryPoints: ["./main.ts"],\n    outfile: "main.js",\n    bundle: true,\n    format: "cjs",\n  });\n\n  esbuild.stop();\n}\n\nmain();\n')),(0,i.kt)("p",null,"The above code uses\n",(0,i.kt)("a",{parentName:"p",href:"https://deno.land/x/esbuild_deno_loader@0.6.0"},"esbuild Deno loader")," to bundle\nand ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Source-to-source_compiler"},"transpile")," our\nTypeScript code into JavaScript using the Common JS ",(0,i.kt)("inlineCode",{parentName:"p"},"(CJS)")," format"),(0,i.kt)("ol",{start:8},(0,i.kt)("li",{parentName:"ol"},"Lets bundle the code! Execute ",(0,i.kt)("inlineCode",{parentName:"li"},"deno run build.ts"),". Since Deno uses sandbox\npermissions to run code you may receive prompts like the following:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'\u2705 Granted read access to <CWD>.\n\u2705 Granted env access to "ESBUILD_BINARY_PATH".\n\u2705 Granted env access to "HOME".\n\u2705 Granted read access to "/Users/dev/Library/Caches/esbuild/bin/esbuild-darwin-64@0.15.10".\n\u2705 Granted run access to "/Users/dev/Library/Caches/esbuild/bin/esbuild-darwin-64@0.15.10".\n\u250c \u26a0\ufe0f  Deno requests net access to "raw.githubusercontent.com".\n\u251c Requested by `fetch()` API.\n\u251c Run again with --allow-net to bypass this prompt.\n\u2514 Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >\n')),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The Deno binary will prompt for access to certain Deno APIs. If you want to\ngrant automatically grant required access you can run with the following\naguments: ",(0,i.kt)("inlineCode",{parentName:"p"},"deno run -A build.ts"))),(0,i.kt)("ol",{start:9},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Once Deno has finished running we should now have our ",(0,i.kt)("inlineCode",{parentName:"p"},"main.js")," file! We can\nnow run it with artemis! There are two ways to run JavaScript code with\nartemis:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Use a TOML ",(0,i.kt)("a",{parentName:"li",href:"/artemis-api/docs/Intro/Collections/format"},"collection")," file"),(0,i.kt)("li",{parentName:"ul"},"run directly via ",(0,i.kt)("inlineCode",{parentName:"li"},"artemis -j <path to main.js>"))),(0,i.kt)("p",{parentName:"li"},"There are slight differences between both options. If we use a TOML\ncollection file, artemis will handle the output format for us based on the\nTOML configuration."),(0,i.kt)("p",{parentName:"li"},"If we decide to run the JavaScript code directly, we would need to include\ncode to tell artemis how to output the data. See the artemis\n",(0,i.kt)("a",{parentName:"p",href:"/artemis-api/docs/API/overview"},"API")," docs for scripting the output options."),(0,i.kt)("p",{parentName:"li"},"For this example we will use a TOML collection file")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Base64 encode our ",(0,i.kt)("inlineCode",{parentName:"p"},"main.js")," file.\n",(0,i.kt)("a",{parentName:"p",href:"https://gchq.github.io/CyberChef/"},"CyberChef")," works great for this task.\nThen add our base64 blob to a TOML file with the following configuration:"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-toml"},'system = "macos" # Change this based on ur platform\n\n[output]\nname = "custom_proc_list"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "this can be anything"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "script"\n[artifacts.script]\nname = "proc_memory_usage_list"\nscript = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvc3lzdGVtL21lbW9yeS50cwpmdW5jdGlvbiBwcm9jZXNzTGlzdGluZyhtZDUgPSBmYWxzZSwgc2hhMSA9IGZhbHNlLCBzaGEyNTYgPSBmYWxzZSwgYmluYXJ5ID0gZmFsc2UpIHsKICBjb25zdCBoYXNoZXMgPSB7CiAgICBtZDUsCiAgICBzaGExLAogICAgc2hhMjU2CiAgfTsKICBjb25zdCBkYXRhID0gRGVuby5jb3JlLm9wcy5nZXRfcHJvY2Vzc2VzKAogICAgaGFzaGVzLAogICAgYmluYXJ5CiAgKTsKICBjb25zdCBwcm9jX2FycmF5ID0gSlNPTi5wYXJzZShkYXRhKTsKICByZXR1cm4gcHJvY19hcnJheTsKfQoKLy8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IG1kNSA9IGZhbHNlOwogIGNvbnN0IHNoYTEgPSBmYWxzZTsKICBjb25zdCBzaGEyNTYgPSBmYWxzZTsKICBjb25zdCBiaW5hcnlfaW5mbyA9IHRydWU7CiAgY29uc3QgcHJvY19saXN0ID0gcHJvY2Vzc0xpc3RpbmcobWQ1LCBzaGExLCBzaGEyNTYsIGJpbmFyeV9pbmZvKTsKICBjb25zdCBmaWx0ZXJfbGlzdCA9IFtdOwogIGZvciAoY29uc3QgZW50cnkgb2YgcHJvY19saXN0KSB7CiAgICBpZiAoZW50cnkubWVtb3J5X3VzYWdlID4gMTUpIHsKICAgICAgY29uc29sZS5sb2coYEhpZ2ggbWVtb3J5IHVzYWdlICR7ZW50cnl9YCk7CiAgICAgIGZpbHRlcl9saXN0LnB1c2goZW50cnkpOwogICAgfQogIH0KICByZXR1cm4gZmlsdGVyX2xpc3Q7Cn0KbWFpbigpOwo="\n')),(0,i.kt)("ol",{start:11},(0,i.kt)("li",{parentName:"ol"},"Now run our TOML file collection with artemis!\n",(0,i.kt)("inlineCode",{parentName:"li"},"artemis -t <path to TOML fil>"),".")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"You should see results similar to below depending on you OS. In addition, to\noutput files at ",(0,i.kt)("inlineCode",{parentName:"p"},"./tmp/custom_proc_list"),"."),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre"},'[runtime]: "High memory usage /Applications/iTerm.app/Contents/MacOS/iTerm2"\n[runtime]: "High memory usage /usr/local/bin/node"\n[runtime]: "High memory usage /System/Library/Frameworks/WebKit.framework/Versions/A/XPCServices/com.apple.WebKit.WebContent.xpc/Contents/MacOS/com.apple.WebKit.WebContent"\n[runtime]: "High memory usage /System/Library/Frameworks/WebKit.framework/Versions/A/XPCServices/com.apple.WebKit.WebContent.xpc/Contents/MacOS/com.apple.WebKit.WebContent"\n'))),(0,i.kt)("p",null,"The directory ",(0,i.kt)("inlineCode",{parentName:"p"},"./tmp/custom_proc_list")," should contain three files:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"3d6573f5-9eda-4945-b324-06dd5a8fba1b.json   b76ed71a-9333-49b9-be2d-b3c77a4d1497.log    status.log\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"status.log maps script name to our json file\n",(0,i.kt)("inlineCode",{parentName:"li"},"proc_memory_usage_list:3d6573f5-9eda-4945-b324-06dd5a8fba1b.json"),". ",(0,i.kt)("strong",{parentName:"li"},"NOTE"),"\nwe can also find the same info in ",(0,i.kt)("inlineCode",{parentName:"li"},"3d6573f5-9eda-4945-b324-06dd5a8fba1b.json")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"b76ed71a-9333-49b9-be2d-b3c77a4d1497.log")," contains any errors or warnings.\nSince we did ",(0,i.kt)("strong",{parentName:"li"},"not")," run with elevated privileges, artemis will not be able to\nget information for all processes."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"3d6573f5-9eda-4945-b324-06dd5a8fba1b.json")," should contain all processes using\nmore the 200MB of memory!")),(0,i.kt)("p",null,"Snippet below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "metadata": {\n    "endpoint_id": "this can be anything",\n    "uuid": "4f58d2e4-d2fa-4e91-9dcb-8bbe44c2efdb",\n    "id": 1,\n    "artifact_name": "proc_memory_usage_list",\n    "complete_time": 1694831851,\n    "start_time": 1694831851,\n    "hostname": "dev-MBP.lan",\n    "os_version": "13.4.1",\n    "platform": "Darwin",\n    "kernel_version": "22.5.0",\n    "load_performance": {\n      "avg_one_min": 1.74755859375,\n      "avg_five_min": 1.62744140625,\n      "avg_fifteen_min": 1.6484375\n    }\n  },\n  "data": [\n    {\n      "full_path": "/Applications/VSCodium.app/Contents/Frameworks/VSCodium Helper (Renderer).app/Contents/MacOS/VSCodium Helper (Renderer)",\n      "name": "VSCodium Helper (Renderer)",\n      "path": "/Applications/VSCodium.app/Contents/Frameworks/VSCodium Helper (Renderer).app/Contents/MacOS",\n      "pid": 924,\n      "ppid": 910,\n      "environment": "MallocNanoZone=0 USER=dev COMMAND_MODE=unix2003 __CFBundleIdentifier=com.vscodium PATH=/usr/bin:/bin:/usr/sbin:/sbin LOGNAME=dev SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.EMaeAUplCi/Listeners HOME=/Users/dev SHELL=/bin/zsh TMPDIR=/var/folders/ms/hq39v4_x1sq20cz108g3_6cw0000gn/T/ __CF_USER_TEXT_ENCODING=0x1F5:0x0:0x0 XPC_SERVICE_NAME=application.com.vscodium.52768860.61870812 XPC_FLAGS=0x0 ORIGINAL_XDG_CURRENT_DESKTOP=undefined VSCODE_CWD=/ VSCODE_NLS_CONFIG={\\"locale\\":\\"en-us\\",\\"osLocale\\":\\"en-us\\",\\"availableLanguages\\":{},\\"_languagePackSupport\\":true} VSCODE_CODE_CACHE_PATH=/Users/dev/Library/Application Support/VSCodium/CachedData/13ae69686c4390a9aee7b71b44337eb488319f26 VSCODE_IPC_HOOK=/Users/dev/Library/Application Support/VSCodium/1.82-main.sock VSCODE_PID=910 OS_ACTIVITY_MODE=disable",\n      "status": "Runnable",\n      "arguments": " --type=renderer --user-data-dir=/Users/dev/Library/Application Support/VSCodium --standard-schemes=vscode-webview,vscode-file --enable-sandbox --secure-schemes=vscode-webview,vscode-file --bypasscsp-schemes --cors-schemes=vscode-webview,vscode-file --fetch-schemes=vscode-webview,vscode-file --service-worker-schemes=vscode-webview --streaming-schemes --app-path=/Applications/VSCodium.app/Contents/Resources/app --enable-sandbox --enable-blink-features=HighlightAPI --lang=en-US --num-raster-threads=4 --enable-zero-copy --enable-gpu-memory-buffer-compositor-resources --enable-main-frame-before-activation --renderer-client-id=5 --time-ticks-at-unix-epoch=-1694820653253440 --launch-time-ticks=1314885816 --shared-files --field-trial-handle=1718379636,r,10495113946754946208,8514878387345791811,262144 --disable-features=CalculateNativeWinOcclusion,SpareRendererForSitePerProcess --vscode-window-config=vscode:15d59b34-a78d-4dc2-963f-171fa490be8d --seatbelt-client=62",\n      "memory_usage": 573014016,\n      "virtual_memory_usage": 1252417200128.0,\n      "start_time": 1694821968,\n      "uid": "501",\n      "gid": "20",\n      "md5": "",\n      "sha1": "",\n      "sha256": "",\n      "binary_info": []\n    }\n  ]\n}\n')))}d.isMDXComponent=!0}}]);