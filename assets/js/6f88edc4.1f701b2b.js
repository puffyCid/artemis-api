"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[2977],{4354:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>a,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var t=r(5893),n=r(1151);const o={description:"Connecting to the World Wide Web!"},i="Networking APIs",d={id:"API/Helper/network",title:"Networking APIs",description:"Connecting to the World Wide Web!",source:"@site/docs/API/Helper/network.md",sourceDirName:"API/Helper",slug:"/API/Helper/network",permalink:"/artemis-api/docs/API/Helper/network",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Helper/network.md",tags:[],version:"current",frontMatter:{description:"Connecting to the World Wide Web!"},sidebar:"artemisAPI",previous:{title:"Filesystem APIs",permalink:"/artemis-api/docs/API/Helper/filesystem"},next:{title:"Nom APIs",permalink:"/artemis-api/docs/API/Helper/nom"}},l={},c=[{value:"request(url, protocol, body, headers) -&gt; <code>ClientResponse | HttpError</code>",id:"requesturl-protocol-body-headers---clientresponse--httperror",level:3},{value:"VirusTotal Class",id:"virustotal-class",level:3},{value:"lookupHash(hash) -&gt; <code>VTResponse | HttpError</code>",id:"lookuphashhash---vtresponse--httperror",level:4},{value:"lookupDomain(domain) -&gt; <code>VTResponse | HttpError</code>",id:"lookupdomaindomain---vtresponse--httperror",level:4},{value:"lookupIP(ip) -&gt; <code>VTResponse | HttpError</code>",id:"lookupipip---vtresponse--httperror",level:4}];function h(e){const s={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h3:"h3",h4:"h4",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"networking-apis",children:"Networking APIs"}),"\n",(0,t.jsxs)(s.p,{children:["The artemis API allows a user to make HTTP network requests using the\n",(0,t.jsx)(s.a,{href:"https://docs.rs/reqwest/latest/reqwest/index.html",children:"reqwest"})," crate. It can be\nused to interact with external services or services that expose an API."]}),"\n",(0,t.jsxs)(s.h3,{id:"requesturl-protocol-body-headers---clientresponse--httperror",children:["request(url, protocol, body, headers) -> ",(0,t.jsx)(s.code,{children:"ClientResponse | HttpError"})]}),"\n",(0,t.jsxs)(s.p,{children:["Make a very simple GET or POST request to the provided URL. You may specify an\noptional body or headers. By default headers will use\n",(0,t.jsx)(s.code,{children:"Content-Type: application/json"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["The body must be in raw bytes if provided. This function is ",(0,t.jsx)(s.code,{children:"async"})]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Param"}),(0,t.jsx)(s.th,{children:"Type"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"url"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"string"})}),(0,t.jsx)(s.td,{children:"URL to target"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"protocol"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"Protocol"})}),(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.code,{children:"Protocol"})," to use. Currently only GET or POST"]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"body"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"Uint8Array"})}),(0,t.jsx)(s.td,{children:"Optional body to send with request"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"headers"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"Record<string, string>"})}),(0,t.jsxs)(s.td,{children:["Optional headers to use. Default is ",(0,t.jsx)(s.code,{children:"Content-Type: application/json"})]})]})]})]}),"\n",(0,t.jsx)(s.h3,{id:"virustotal-class",children:"VirusTotal Class"}),"\n",(0,t.jsxs)(s.p,{children:["A ",(0,t.jsx)(s.em,{children:"very"})," basic class to help interact with the VirusTotal API using the JS HTTP\nclient. Can be used to check VT for any additional data on hashes. Requires an\nAPI key."]}),"\n",(0,t.jsxs)(s.admonition,{type:"warning",children:[(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"DO NOT"})," use this to lookup hashes for your entire filesystem!"]}),(0,t.jsxs)(s.p,{children:["Your key or IP will be ",(0,t.jsx)(s.strong,{children:"blocked"})," if you do!"]})]}),"\n",(0,t.jsxs)(s.h4,{id:"lookuphashhash---vtresponse--httperror",children:["lookupHash(hash) -> ",(0,t.jsx)(s.code,{children:"VTResponse | HttpError"})]}),"\n",(0,t.jsxs)(s.p,{children:["Lookup a MD5, SHA1, or SHA256 hash on VirusTotal. This function is ",(0,t.jsx)(s.code,{children:"async"})]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Param"}),(0,t.jsx)(s.th,{children:"Type"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"hash"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"string"})}),(0,t.jsx)(s.td,{children:"MD5, SHA1, or SHA256 hash"})]})})]}),"\n",(0,t.jsxs)(s.h4,{id:"lookupdomaindomain---vtresponse--httperror",children:["lookupDomain(domain) -> ",(0,t.jsx)(s.code,{children:"VTResponse | HttpError"})]}),"\n",(0,t.jsxs)(s.p,{children:["Lookup a domain on VirusTotal. This function is ",(0,t.jsx)(s.code,{children:"async"})]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Param"}),(0,t.jsx)(s.th,{children:"Type"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"domain"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"string"})}),(0,t.jsx)(s.td,{children:"Domain to submit"})]})})]}),"\n",(0,t.jsxs)(s.h4,{id:"lookupipip---vtresponse--httperror",children:["lookupIP(ip) -> ",(0,t.jsx)(s.code,{children:"VTResponse | HttpError"})]}),"\n",(0,t.jsxs)(s.p,{children:["Lookup an IP on VirusTotal. This function is ",(0,t.jsx)(s.code,{children:"async"})]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:"Param"}),(0,t.jsx)(s.th,{children:"Type"}),(0,t.jsx)(s.th,{children:"Description"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"ip"}),(0,t.jsx)(s.td,{children:(0,t.jsx)(s.code,{children:"string"})}),(0,t.jsx)(s.td,{children:"IP to submit"})]})})]})]})}function a(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,s,r)=>{r.d(s,{Z:()=>d,a:()=>i});var t=r(7294);const n={},o=t.createContext(n);function i(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);