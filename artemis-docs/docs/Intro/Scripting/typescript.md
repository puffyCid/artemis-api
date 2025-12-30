---
sidebar_position: 2
description: Using TypeScript
---

# TypeScript 

To make scripting even easier a simple TypeScript library is available that can be used to create scripts. 
This allows users to create scripts without needing to
know what Rust functions are registered and allow us to avoid writing JavaScript. 

In order to access the TypeScript library you just need to clone the artemis-api repo:
- https://github.com/puffyCid/artemis-api

Then just import into your TypeScript code!

## Examples

### Beginner

Lets start with a very simple example that adds two numbers:

1. Create a file called main.ts and add the following:

```typescript
function main() {

  console.log(`Hello world!`);
  console.log(`2 + 2 = ${2 + 2}`);
}
main();
```

This example is so simple, that we do not even need to compile to JavaScript.

You can run it with `artemis -j main.ts`

You should get the following output:
```
> artemis -j main.ts 
[artemis] Starting artemis collection!
Hello world!
2 + 2 = 4
[artemis] Finished artemis collection!
```

### Lets get silly

JavaScript is loosely typed language. It does not prevent odd or silly scenarios. Lets update code above and rename our file: main.ts to main.js.

```javascript
function main() {
  console.log(`Hello world!`);
  console.log(`2 + true = ${2 + true}`);

  console.log("Why am I a " + typeof + "");
  console.log(`0o38 - 0o37 = ${038 - 037}`);
}

main();
```

You can run it with `artemis -j main.js`

You should get the following output:
```
> artemis -j main.js
[artemis] Starting artemis collection!
Hello world!
2 + true = 3
Why am I a number
038 - 037 = 7
[artemis] Finished artemis collection!
```

### Lets get serious

TypeScript provides static type checking to help catch common errors in JavaScript code. 

If you rename main.js back to main.ts your text editor should highlight a few errors. 

Lets clean the code up again to try to remove the errors:

```typescript
function main() {
  console.log(`Hello world!`);
  console.log(`2 + 2 = ${2 + 2}`);
  console.log(`Octal: 0o38 - 0o37 = ${parseInt('038', 8) - parseInt('037', 8)} `);
}

main();
```

Again this example is really simple, you can run it with `artemis -j main.ts`

You should get the following output:
```
> artemis -j main.ts
[artemis] Starting artemis collection!
Hello world!
2 + 2 = 4
0o38 - 0o37 = -28 
[artemis] Finished artemis collection!
```

## References

The examples above show very simple usage on coding in TypeScript and JavaScript.  
There are a lot of online resources to help get started learning TypeScript.

The most useful is the official TypeScript homepage:
- https://www.typescriptlang.org/

Other resources:
- https://en.wikipedia.org/wiki/TypeScript
- https://en.wikipedia.org/wiki/JavaScript
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects


:::important

The artemis TypeScript/JavaScript runtime is designed for DFIR investigations. 
Most online documentation and tutorials assume TypeScript is being used with NodeJS, Deno, or Bun!

Artemis does not have any web APIs, node modules, browser APIs, etc.

:::