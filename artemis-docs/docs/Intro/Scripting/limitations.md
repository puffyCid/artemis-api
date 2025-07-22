---
sidebar_position: 6
description: Current limitations
---

# Limitations

It is important to understand the JavaScript runtime for artemis is **not** like
normal JavaScript runtimes like NodeJS, Deno, Bun, etc. These runtimes are
primarily designed to create web apps.

The artemis JavaScript runtime is designed for **DFIR**.

Therefore tutorials or example scripts created for other runtimes may not work
with artemis. For example, common browser Web APIs like `document.getElementbyId()` will not work with artemis.

APIs found at at https://developer.mozilla.org/en-US/docs/Web/API, will not work in artemis because it is not a browser!
Our JavaScript runtime is for DFIR investigations and not the web

There are some additional limitations to scripting:

1. All scripts executed through artemis must be in JavaScript. You **cannot**
   execute TypeScript scripts directly. You **must** compile and bundle them into
   one JavaScript file.
2. The JavaScript must be in common JS format (cjs). EMCAScript (ES) module
   scripts are not supported.