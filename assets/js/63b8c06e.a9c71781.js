"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[1831],{5466:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>a});var r=n(5893),d=n(1151);const i={description:"Encoding bytes and strings"},s="Encoding APIs",c={id:"API/Helper/encoding",title:"Encoding APIs",description:"Encoding bytes and strings",source:"@site/docs/API/Helper/encoding.md",sourceDirName:"API/Helper",slug:"/API/Helper/encoding",permalink:"/artemis-api/docs/API/Helper/encoding",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Helper/encoding.md",tags:[],version:"current",frontMatter:{description:"Encoding bytes and strings"},sidebar:"artemisAPI",previous:{title:"Helper Functions",permalink:"/artemis-api/docs/category/helper-functions"},next:{title:"Environment APIs",permalink:"/artemis-api/docs/API/Helper/environment"}},o={},a=[{value:"encode(data) -&gt; <code>string</code>",id:"encodedata---string",level:3},{value:"decode(b64) -&gt; <code>Uint8Array</code>",id:"decodeb64---uint8array",level:3},{value:"encodeBytes(data) -&gt; <code>Uint8Array</code>",id:"encodebytesdata---uint8array",level:3},{value:"extractUtf8String(data) -&gt; <code>string</code>",id:"extractutf8stringdata---string",level:3},{value:"bytesToHexString(data) -&gt; <code>string</code>",id:"bytestohexstringdata---string",level:3},{value:"readXml(path) -&gt; <code>Record&lt;string, unknown&gt; | EncodingError</code>",id:"readxmlpath---recordstring-unknown--encodingerror",level:3}];function l(e){const t={code:"code",h1:"h1",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"encoding-apis",children:"Encoding APIs"}),"\n",(0,r.jsx)(t.p,{children:"These functions are related to encoding data"}),"\n",(0,r.jsxs)(t.h3,{id:"encodedata---string",children:["encode(data) -> ",(0,r.jsx)(t.code,{children:"string"})]}),"\n",(0,r.jsx)(t.p,{children:"Base64 encode raw bytes. The encoding is not URL safe"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"data"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"Uint8Array"})}),(0,r.jsx)(t.td,{children:"The raw bytes to encode"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"decodeb64---uint8array",children:["decode(b64) -> ",(0,r.jsx)(t.code,{children:"Uint8Array"})]}),"\n",(0,r.jsx)(t.p,{children:"Decode a valid RFC4648 Base64 encoded string"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"b64"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"A base64 encoded string"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"encodebytesdata---uint8array",children:["encodeBytes(data) -> ",(0,r.jsx)(t.code,{children:"Uint8Array"})]}),"\n",(0,r.jsx)(t.p,{children:"Convert provided string to raw bytes"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"data"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"String to convert to bytes"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"extractutf8stringdata---string",children:["extractUtf8String(data) -> ",(0,r.jsx)(t.code,{children:"string"})]}),"\n",(0,r.jsx)(t.p,{children:"Extract a UTF8 string from provided bytes"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"data"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"Uint8Array"})}),(0,r.jsx)(t.td,{children:"Raw bytes to extract UTF8 string from"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"bytestohexstringdata---string",children:["bytesToHexString(data) -> ",(0,r.jsx)(t.code,{children:"string"})]}),"\n",(0,r.jsx)(t.p,{children:"Convert bytes to Hex string"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"data"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"Uint8Array"})}),(0,r.jsx)(t.td,{children:"Raw bytes to convert to hex"})]})})]}),"\n",(0,r.jsxs)(t.h3,{id:"readxmlpath---recordstring-unknown--encodingerror",children:["readXml(path) -> ",(0,r.jsx)(t.code,{children:"Record<string, unknown> | EncodingError"})]}),"\n",(0,r.jsx)(t.p,{children:"Read a XML file into a JSON object. Supports either UTF8 or UTF16 encoded XML\nfiles"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Param"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"path"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"string"})}),(0,r.jsx)(t.td,{children:"Path to XML file to read"})]})})]})]})}function h(e={}){const{wrapper:t}={...(0,d.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>s});var r=n(7294);const d={},i=r.createContext(d);function s(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);