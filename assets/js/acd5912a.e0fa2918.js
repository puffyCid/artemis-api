"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5263],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1577:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_position:4},o="Testing",s={unversionedId:"Contributing/testing",id:"Contributing/testing",title:"Testing",description:"artemis has a single basic guideline for testing:",source:"@site/docs/Contributing/testing.md",sourceDirName:"Contributing",slug:"/Contributing/testing",permalink:"/artemis-api/docs/Contributing/testing",draft:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/testing.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"artemisContributing",previous:{title:"Adding a Feature",permalink:"/artemis-api/docs/Contributing/adding"},next:{title:"Learning",permalink:"/artemis-api/docs/Contributing/learning"}},l={},p=[{value:"Integration Tests",id:"integration-tests",level:2},{value:"Test Data",id:"test-data",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"testing"},"Testing"),(0,a.kt)("p",null,"artemis has a single basic guideline for testing:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"All functions should ideally have a test")),(0,a.kt)("p",null,"For example, if you open a pull request to add a new feature and create three\nnew functions. Your should have a test for each new function (three tests\ntotal)."),(0,a.kt)("p",null,"To run tests"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Its recommended to run in release mode for tests. This will greatly speed up the\ntests."),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"cargo test --release"))),(0,a.kt)("p",null,"If you are unfamilar with creating Rust tests. The Rust\n",(0,a.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/book/ch11-03-test-organization.html"},"book")," and\n",(0,a.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/rust-by-example/testing/unit_testing.html"},"Rust by example"),"\nhave great learning resources."),(0,a.kt)("h2",{id:"integration-tests"},"Integration Tests"),(0,a.kt)("p",null,"If you are adding a new forensic aritfact to artemis, including an integration\ntest for the artifact can also be very useful. Writing an integration is a two\n(2) step process:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Create a TOML collection file. This should be TOML collection file that\nanyone could download and run themselves"),(0,a.kt)("li",{parentName:"ol"},"Create a ",(0,a.kt)("inlineCode",{parentName:"li"},"artifact_tester.rs")," file")),(0,a.kt)("p",null,"An example ",(0,a.kt)("inlineCode",{parentName:"p"},"prefetch")," integration test:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"TOML file created at\n",(0,a.kt)("inlineCode",{parentName:"li"},"<path to repo>/artemis-core/tests/test_data/windows/prefetch.toml"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'system = "windows"\n\n[output]\nname = "prefetch_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "prefetch"\n[artifacts.prefetch]\nalt_drive = \'C\'\n')),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"prefetch_tester.rs")," created at\n",(0,a.kt)("inlineCode",{parentName:"li"},"<path to repo>/artemis-core/tests/prefetch_tester.rs"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},'#[test]\n#[cfg(target_os = "windows")]\nfn test_prefetch_parser() {\n    use std::path::PathBuf;\n\n    use artemis_core::core::parse_toml_file;\n    let mut test_location = PathBuf::from(env!("CARGO_MANIFEST_DIR"));\n    test_location.push("tests/test_data/windows/prefetch.toml");\n\n    let results = parse_toml_file(&test_location.display().to_string()).unwrap();\n    assert_eq!(results, ())\n}\n')),(0,a.kt)("p",null,"Our ",(0,a.kt)("inlineCode",{parentName:"p"},"prefetch_tester.rs")," file runs the ",(0,a.kt)("inlineCode",{parentName:"p"},"prefetch.toml")," file through the whole\nartemis program."),(0,a.kt)("h2",{id:"test-data"},"Test Data"),(0,a.kt)("p",null,"If you are adding a new forensic artifact to artemis, if you can include a\nsample of the artifact that can be used for tests that would be very helpful.\nSome things to keep in mind though:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Size. If the artifact is large (10-20MB) then including the sample in the\nartemis repo is unecessary."),(0,a.kt)("li",{parentName:"ul"},"Licensing. If you can provide the artifact from your own system that is ideal.\nHowever, if you find the sample aritfact in another GitHub repo make sure that\nrepo's LICENSE is compatible with artemis.")))}m.isMDXComponent=!0}}]);