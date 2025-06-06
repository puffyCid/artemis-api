---
sidebar_position: 6
description: Current limitations
---

# Limitations

It is important to understand the JavaScript runtime for artemis is **not** like
normal JavaScript runtimes like NodeJS, Deno, Bun, etc. These runtimes are
primarily designed to create web apps.

Therefore tutorials or example scripts created for other runtimes may not work
with artemis. For example, the JavaScript function `console.table()` does not
exist in artemis. However, the functions `console.log()` and `console.error()`
do exist in artemis.

The JavaScript runtime for artemis is designed specifically to assist with
scripting for IR and forensic investigations.

There are currently some additional limitations to scripting:

1. All scripts executed through artemis must be in JavaScript. You **cannot**
   execute TypeScrpt scripts directly. You **must** compile and bundle them into
   one JavaScript file.
2. The JavaScript must be in common JS format (cjs). EMCAScript (ES) module
   scripts are not supported.