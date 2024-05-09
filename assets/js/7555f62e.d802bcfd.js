"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[3531],{9444:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var n=s(7624),r=s(2172);const i={description:"Windows ShellItems",keywords:["windows","registry"]},o="ShellItems",a={id:"Artifacts/Windows Artfacts/shellitems",title:"ShellItems",description:"Windows ShellItems",source:"@site/docs/Artifacts/Windows Artfacts/shellitems.md",sourceDirName:"Artifacts/Windows Artfacts",slug:"/Artifacts/Windows Artfacts/shellitems",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shellitems",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/shellitems.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:1715224196e3,frontMatter:{description:"Windows ShellItems",keywords:["windows","registry"]},sidebar:"artemisArtifacts",previous:{title:"Shellbags",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shellbags"},next:{title:"Shimcache",permalink:"/artemis-api/docs/Artifacts/Windows Artfacts/shimcache"}},l={},c=[];function d(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"shellitems",children:"ShellItems"}),"\n",(0,n.jsxs)(t.p,{children:["Windows ShellItems are often generated when a user accesses a directory or file\non the system. ShellItems can be found in ",(0,n.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/shortcuts",children:"Shortcut"})," files or in\nthe Registry ",(0,n.jsx)(t.a,{href:"/artemis-api/docs/Artifacts/Windows%20Artfacts/mru",children:"MRU"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Artemis supports parsing ShellItem bytes read from either the Registry or a\nfile."}),"\n",(0,n.jsx)(t.h1,{id:"collection",children:"Collection"}),"\n",(0,n.jsxs)(t.p,{children:["You have to use the artemis ",(0,n.jsx)(t.a,{href:"/artemis-api/docs/API/overview",children:"api"})," in order to parse\nShellItems."]}),"\n",(0,n.jsx)(t.h1,{id:"sample-api-script",children:"Sample API Script"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:'import {\n  pargetShellItemseMru,\n} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";\n\nasync function main() {\n  const results = getShellItem(new Uint8Array());\n\n  console.log(results);\n}\n'})}),"\n",(0,n.jsx)(t.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,n.jsxs)(t.p,{children:["An array of ",(0,n.jsx)(t.code,{children:"Mru"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface JsShellItem {\n  item: ShellItems;\n  /**Remaining bytes associated with the data */\n  remaining: Uint8Array;\n}\n\nexport interface ShellItems {\n  /**\n   * Value of a shelltiem\n   * Ex: A file path, URL, Volume, GUID, etc\n   */\n  value: string;\n  /**\n   * Type of shellitem\n   *\n   * Can be:\n   *   `Directory, URI, RootFolder, Network, Volume, ControlPanel, UserPropertyView, Delegate, Variable, MTP, Unknown, History`\n   *\n   *  Most common is `Directory`\n   */\n  shell_type: string;\n  /**FAT created timestamp in UNIXEPOCH seconds. Only applicable for Directory `shell_type` */\n  created: number;\n  /**FAT modified timestamp in UNIXEPOCH seconds. Only applicable for Directory `shell_type` */\n  modified: number;\n  /**FAT modified timestamp in UNIXEPOCH seconds. Only applicable for Directory `shell_type` */\n  accessed: number;\n  /**Entry number in MFT. Only applicable for Directory `shell_type` */\n  mft_entry: number;\n  /**Sequence number in MFT. Only applicable for Directory `shell_type` */\n  mft_sequence: number;\n  /**Array of Property Stores */\n  stores: Record<string, string | number | boolean | null>;\n}\n"})})]})}function m(e={}){const{wrapper:t}={...(0,r.M)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},2172:(e,t,s)=>{s.d(t,{I:()=>a,M:()=>o});var n=s(1504);const r={},i=n.createContext(r);function o(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);