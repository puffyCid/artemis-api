"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6135],{28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var s=n(96540);const i={},r=s.createContext(i);function a(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:t},e.children)}},96086:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"Contributing/testing","title":"Testing","description":"All functions should ideally have a test.\\\\","source":"@site/docs/Contributing/testing.md","sourceDirName":"Contributing","slug":"/Contributing/testing","permalink":"/artemis-api/docs/Contributing/testing","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Contributing/testing.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"artemisContributing","previous":{"title":"Adding a Feature","permalink":"/artemis-api/docs/Contributing/adding"},"next":{"title":"Learning","permalink":"/artemis-api/docs/Contributing/learning"}}');var i=n(74848),r=n(28453);const a={sidebar_position:4},o="Testing",l={},c=[{value:"Integration Tests",id:"integration-tests",level:2},{value:"Test Data",id:"test-data",level:2}];function d(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"testing",children:"Testing"})}),"\n",(0,i.jsxs)(t.p,{children:["All functions should ideally have a test.",(0,i.jsx)(t.br,{}),"\n","For example, if you open a pull request to add a new feature and create three\nnew functions. Your should have a test for each new function (three tests\ntotal)."]}),"\n",(0,i.jsxs)(t.admonition,{type:"tip",children:[(0,i.jsx)(t.p,{children:"Its recommended to run in release mode for tests. This will greatly speed up the\ntests. Tests may need to be run with root or Administrator privileges."}),(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"just test or just nextest"})})]}),"\n",(0,i.jsx)(t.admonition,{type:"warning",children:(0,i.jsxs)(t.p,{children:["macOS and Linux users might need to increase the ulimit for open files.\n",(0,i.jsx)(t.code,{children:"ulimit -n 1024"})]})}),"\n",(0,i.jsxs)(t.p,{children:["If you are unfamiliar with creating Rust tests. The Rust\n",(0,i.jsx)(t.a,{href:"https://doc.rust-lang.org/book/ch11-03-test-organization.html",children:"book"})," and\n",(0,i.jsx)(t.a,{href:"https://doc.rust-lang.org/rust-by-example/testing/unit_testing.html",children:"Rust by example"}),"\nhave great learning resources."]}),"\n",(0,i.jsx)(t.h2,{id:"integration-tests",children:"Integration Tests"}),"\n",(0,i.jsx)(t.p,{children:"If you are adding a new forensic artifact to artemis, including an integration\ntest for the artifact can also be very useful. Writing an integration is a two\n(2) step process:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Create a TOML collection file. This should be TOML collection file that\nanyone could download and run themselves"}),"\n",(0,i.jsxs)(t.li,{children:["Create a ",(0,i.jsx)(t.code,{children:"artifact_tester.rs"})," file"]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["An example ",(0,i.jsx)(t.code,{children:"prefetch"})," integration test:"]}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsxs)(t.li,{children:["TOML file created at\n",(0,i.jsx)(t.code,{children:"<path to repo>/artemis-core/tests/test_data/windows/prefetch.toml"})]}),"\n"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "prefetch_collection"\ndirectory = "./tmp"\nformat = "json"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "prefetch"\n[artifacts.prefetch]\n'})}),"\n",(0,i.jsxs)(t.ol,{start:"2",children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"prefetch_tester.rs"})," created at\n",(0,i.jsx)(t.code,{children:"<path to repo>/artemis-core/tests/prefetch_tester.rs"})]}),"\n"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-rust",children:'#[test]\n#[cfg(target_os = "windows")]\nfn test_prefetch_parser() {\n    use std::path::PathBuf;\n\n    use artemis_core::core::parse_toml_file;\n    let mut test_location = PathBuf::from(env!("CARGO_MANIFEST_DIR"));\n    test_location.push("tests/test_data/windows/prefetch.toml");\n\n    let results = parse_toml_file(&test_location.display().to_string()).unwrap();\n    assert_eq!(results, ())\n}\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Our ",(0,i.jsx)(t.code,{children:"prefetch_tester.rs"})," file runs the ",(0,i.jsx)(t.code,{children:"prefetch.toml"})," file through the whole\nartemis program."]}),"\n",(0,i.jsx)(t.h2,{id:"test-data",children:"Test Data"}),"\n",(0,i.jsx)(t.p,{children:"If you are adding a new forensic artifact to artemis, if you can include a\nsample of the artifact that can be used for tests that would be very helpful.\nSome things to keep in mind though:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Size. If the artifact is large (10-20MB) then including the sample in the\nartemis repo is unnecessary."}),"\n",(0,i.jsx)(t.li,{children:"Licensing. If you can provide the artifact from your own system that is ideal.\nHowever, if you find the sample artifact in another GitHub repo make sure that\nrepo's LICENSE is compatible with artemis."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);