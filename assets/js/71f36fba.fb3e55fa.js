"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[7601],{28453:(n,e,t)=>{t.d(e,{R:()=>d,x:()=>a});var s=t(96540);const i={},r=s.createContext(i);function d(n){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:d(n.components),s.createElement(r.Provider,{value:e},n.children)}},38262:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>d,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"API/Helper/nom","title":"Nom APIs","description":"How to make custom parsers","source":"@site/docs/API/Helper/nom.md","sourceDirName":"API/Helper","slug":"/API/Helper/nom","permalink":"/artemis-api/docs/API/Helper/nom","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/API/Helper/nom.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1743403591000,"frontMatter":{"description":"How to make custom parsers"},"sidebar":"artemisAPI","previous":{"title":"Networking APIs","permalink":"/artemis-api/docs/API/Helper/network"},"next":{"title":"System APIs","permalink":"/artemis-api/docs/API/Helper/system"}}');var i=t(74848),r=t(28453);const d={description:"How to make custom parsers"},a="Nom APIs",o={},l=[{value:"nomUnsignedFourBytes(data, endianess) -&gt; NomUnsigned | NomError",id:"nomunsignedfourbytesdata-endianess---nomunsigned--nomerror",level:3},{value:"nomUnsignedEightBytes(data, endianess) -&gt; NomUnsigned | NomError",id:"nomunsignedeightbytesdata-endianess---nomunsigned--nomerror",level:3},{value:"nomUnsignedTwoBytes(data, endianess) -&gt; NomUnsigned | NomError",id:"nomunsignedtwobytesdata-endianess---nomunsigned--nomerror",level:3},{value:"nomUnsignedOneBytes(data, endianess) -&gt; NomUnsigned | NomError",id:"nomunsignedonebytesdata-endianess---nomunsigned--nomerror",level:3},{value:"nomUnsignedSixteenBytes(data, endianess) -&gt; NomUnsignedLarge | NomError",id:"nomunsignedsixteenbytesdata-endianess---nomunsignedlarge--nomerror",level:3},{value:"nomSignedFourBytes(data, endianess) -&gt; NomSigned | NomError",id:"nomsignedfourbytesdata-endianess---nomsigned--nomerror",level:3},{value:"nomSignedEightBytes(data, endianess) -&gt; NomSigned | NomError",id:"nomsignedeightbytesdata-endianess---nomsigned--nomerror",level:3},{value:"nomSignedTwoBytes(data, endianess) -&gt; NomSigned | NomError",id:"nomsignedtwobytesdata-endianess---nomsigned--nomerror",level:3},{value:"take(data, input) -&gt; Nom | NomError",id:"takedata-input---nom--nomerror",level:3},{value:"takeUntil(data, input) -&gt; Nom | NomError",id:"takeuntildata-input---nom--nomerror",level:3},{value:"takeWhile(data, input) -&gt; Nom | NomError",id:"takewhiledata-input---nom--nomerror",level:3}];function c(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"nom-apis",children:"Nom APIs"})}),"\n",(0,i.jsxs)(e.p,{children:["Artemis uses the ",(0,i.jsx)(e.a,{href:"https://github.com/rust-bakery/nom",children:"nom"})," Rust library to parse\ndata on the system. Only some of the nom API is exposed to JavaScript runtime.\nIn addition, several nom helper functions are exposed to assist with common\nparsing tasks."]}),"\n",(0,i.jsx)(e.p,{children:"Nom is a powerful parsing framework but can be a little complex when first\nstarting. It works on both plaintext and binary data. Artemis mainly uses it for\nbinary data. But parts of the artemis-api will support plaintext as well."}),"\n",(0,i.jsx)(e.p,{children:"An highlevel overview of the way nom works:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:'You give nom X bytes and tell nom to "eat" (nom) Y bytes'}),"\n",(0,i.jsxs)(e.li,{children:["Nom wil consume Y bytes then return Y bytes AND the ",(0,i.jsx)(e.strong,{children:"remaining"})," X bytes"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"So if you give nom 10 bytes and tell it eat/consume 2 bytes. You would get 2\nbytes and 8 bytes returned. Pseudo-code below"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"let input  = [0,1,2,3,4,5,6,7,8,9]; // 10 bytes\nlet take = 2;\n\nlet remaining, consumed = nom(input, take)\n\nassert!(remaining.len(), 8); // We consumed 2 bytes, we have 8 remaining\nassert!(remaining, [2,3,4,5,6,7,8,9]); // our remaining bytes!\nassert!(consumed, [0,1]); // we consumed the first 2 bytes!\n"})}),"\n",(0,i.jsxs)(e.admonition,{type:"warning",children:[(0,i.jsx)(e.p,{children:"Using nom might add additional overhead to your script. Everytime you use nom,\nartemis needs to send JS data to Rust code. If your JS script is slow, try\nparsing the raw bytes using only JS (ex: .slice() or buffer.slice())"}),(0,i.jsx)(e.p,{children:"An example can be found in macOS BOM or Linux RPM parser. It uses both nom and\nnative JS to parse some data."})]}),"\n",(0,i.jsx)(e.h3,{id:"nomunsignedfourbytesdata-endianess---nomunsigned--nomerror",children:"nomUnsignedFourBytes(data, endianess) -> NomUnsigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse four bytes into unsigned 32 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomunsignedeightbytesdata-endianess---nomunsigned--nomerror",children:"nomUnsignedEightBytes(data, endianess) -> NomUnsigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse eight bytes into unsigned 64 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomunsignedtwobytesdata-endianess---nomunsigned--nomerror",children:"nomUnsignedTwoBytes(data, endianess) -> NomUnsigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse two bytes into unsigned 16 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomunsignedonebytesdata-endianess---nomunsigned--nomerror",children:"nomUnsignedOneBytes(data, endianess) -> NomUnsigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse one bytes into unsigned 8 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomunsignedsixteenbytesdata-endianess---nomunsignedlarge--nomerror",children:"nomUnsignedSixteenBytes(data, endianess) -> NomUnsignedLarge | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse sixteen bytes into unsigned 128 bit integer as a string"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomsignedfourbytesdata-endianess---nomsigned--nomerror",children:"nomSignedFourBytes(data, endianess) -> NomSigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse four bytes into signed 32 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomsignedeightbytesdata-endianess---nomsigned--nomerror",children:"nomSignedEightBytes(data, endianess) -> NomSigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse eight bytes into signed 64 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"nomsignedtwobytesdata-endianess---nomsigned--nomerror",children:"nomSignedTwoBytes(data, endianess) -> NomSigned | NomError"}),"\n",(0,i.jsx)(e.p,{children:"Nom helper to parse two bytes into signed 16 bit integer"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"Uint8Array"}),(0,i.jsx)(e.td,{children:"Bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"endianess"}),(0,i.jsx)(e.td,{children:"Endian"}),(0,i.jsx)(e.td,{children:"Endian type of data"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"takedata-input---nom--nomerror",children:"take(data, input) -> Nom | NomError"}),"\n",(0,i.jsxs)(e.p,{children:["Nom provided string or bytes based on input length. This function exposes the\nnom ",(0,i.jsx)(e.a,{href:"https://docs.rs/nom/latest/nom/bytes/complete/fn.take.html",children:"take"})," function."]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"string OR Uint8Array"}),(0,i.jsx)(e.td,{children:"String or bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"input"}),(0,i.jsx)(e.td,{children:"number"}),(0,i.jsx)(e.td,{children:"How many bytes or characters nom should consume"})]})]})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:'function main() {\n  let test = "Hello TypeScript!";\n  let len = "Hello".length;\n  let nom_data: Nom | NomError = take(test, len);\n  if (nom_data instanceof NomError) {\n    console.error(`Error when parsing data ${nom_data}`);\n    return nom_data;\n  }\n\n  // We nommed ("consumed") the length of `hello`\n  console.assert(nom_data.nommed, "Hello");\n  // We stil have some string data remaining\n  console.assert(nom_data.remaining, " TypeScript!");\n}\n'})}),"\n",(0,i.jsx)(e.p,{children:"Pseudo-code below for practical example"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:'let data = read_file("file.bin");\n// Now have bytes of a file. The file is in Little Endian format\n\n// First four bytes are the file signature\nlet sig = nomUnsignedFourBytes(data, endian.LE);\nif (sig instanceof NomError) {\n  return sig;\n}\n\n// Our nom function consumed and converted the first 4 bytes to unsigned integer\nconsole.log(sig.value);\n\n// Next 2 bytes are length of UTF8 string. Our sig object contains the remaining bytes\nlet string_len = nomUnsignedTwoBytes(sig.remaining, endian.LE);\nif (string_len instanceof NomError) {\n  return string_len;\n}\n\n// string_len now contains the length of the string that is next\n// Take the length of the string\nlet string_data = take(string_len.remaining, string_len.value);\nif (string_data instanceof NomError) {\n  return string_data;\n}\n\n// Extract the string from the raw bytes we consumed\nlet string_value = extractUt8String(string_data.nommed);\n\nconsole.log(string_value);\n\n// Continue parsing remaining bytes with string_data.remaining\n'})}),"\n",(0,i.jsx)(e.h3,{id:"takeuntildata-input---nom--nomerror",children:"takeUntil(data, input) -> Nom | NomError"}),"\n",(0,i.jsxs)(e.p,{children:["Nom data ",(0,i.jsx)(e.strong,{children:"until"})," provided input. This function exposes the nom\n",(0,i.jsx)(e.a,{href:"https://docs.rs/nom/latest/nom/bytes/complete/fn.take_until.html",children:"take_until"}),"\nfunction. If the ",(0,i.jsx)(e.code,{children:"input"})," does not exist, you will get an error."]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"string OR Uint8Array"}),(0,i.jsx)(e.td,{children:"String or bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"input"}),(0,i.jsx)(e.td,{children:"string OR Uint8Array"}),(0,i.jsx)(e.td,{children:"Nom data until input. Must be same type as data"})]})]})]}),"\n",(0,i.jsx)(e.p,{children:"Psuedo-code example below:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:'function main() {\n  /** Here we have a very complex artifact. With lots of flags and extra data.\n   * We are only interested in some data.\n   * Luckily the data we want has signatures we can scan for\n   */\n  const data = read_file("complexArtifact.bin");\n\n  let first_sig = [1, 23, 33, 56];\n  const first_data = takeUntil(data, first_sig);\n  if (first_data instanceof NomError) {\n    console.error(`Got error searching for first_data ${first_data}`);\n    return first_data;\n  }\n\n  // Now we have arrived at first_data sig. We dont care about anything we consumed to get here\n  // We have **NOT** consumed the signature yet!\n  const sig = nomUnsignedFourBytes(first_data.remaining, Endian.Le);\n  // Could technically skip this since, `takUntil` has guaranteed that we have 4 bytes remaining. Since we searched for `[1, 23, 33, 56]`\n  if (sig instanceof NomError) {\n    return sig;\n  }\n\n  // Now lets get FILETIME timestamp\n  const time_data = nomUnsignedEightBytes(sig.remaining, Endian.Le);\n  if (time_data instanceof NomError) {\n    return time_data;\n  }\n\n  // Convert FILETIME unsigned 64 bit value to unixepoch seconds\n  let unix_time = filetimeToUnixEpoch(time_data.value);\n  const pretty_data = new Date(unix_time * 1000);\n  const utcString = pretty_data.toUtcString();\n  console.log(`${utcString}`);\n\n  const second_sig = [83, 134, 54, 99];\n  const second_data = takeUntil(time_data.remaining, second_sig);\n  // Repeat same process above\n}\n'})}),"\n",(0,i.jsx)(e.h3,{id:"takewhiledata-input---nom--nomerror",children:"takeWhile(data, input) -> Nom | NomError"}),"\n",(0,i.jsxs)(e.p,{children:["Nom data while data ",(0,i.jsx)(e.strong,{children:"IS"})," equal to input. This function exposes the nom\n",(0,i.jsx)(e.a,{href:"https://docs.rs/nom/latest/nom/bytes/complete/fn.take_while.html",children:"take_while"}),"\nfunction."]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Param"}),(0,i.jsx)(e.th,{children:"Type"}),(0,i.jsx)(e.th,{children:"Description"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"data"}),(0,i.jsx)(e.td,{children:"string OR Uint8Array"}),(0,i.jsx)(e.td,{children:"String or bytes to provide to nom"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"input"}),(0,i.jsx)(e.td,{children:"string OR number"}),(0,i.jsx)(e.td,{children:"Nom data until input. Must be single character if data is string or a number (<= 255) if data is Uint8Array"})]})]})]}),"\n",(0,i.jsx)(e.p,{children:"Psuedo-code example below:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:'function main() {\n  // This file has an unknown amount of padding we have to deal with\n  const data = read_file("complexFile.bin");\n\n  const sig = nomUnsignedTwoBytes(data, Endian.Be);\n  if (sig instanceof NomError) {\n    return sig;\n  }\n\n  // The next interesting piece of the file we want is a timestamp.\n  // But after the sig there is an unknown amount of zero padding we need to consume\n  // We **cannot** use `takeUntil` because our timestamp bytes can be anything\n\n  const pad = 0;\n  const padding_data = takeWhile(sig.remaining, pad);\n  if (padding_data instanceof NomError) {\n    return padding_data;\n  }\n\n  // Our complex file uses both Big and Little Endian!\n  const time_data = nomUnsignedEightBytes(padding_data.remaining, Endian.Le);\n  const time = filetimeToUnixEpoch(time_data.value);\n  console.lot(time);\n\n  const unknown_data = nomUnsignedFourBytes(time_data.remaining, Endian.Be);\n  // Continue parsing the file\n}\n'})})]})}function h(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(c,{...n})}):c(n)}}}]);