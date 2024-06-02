import { getXprotectDefinitions } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

function main() {
  const results = getXprotectDefinitions();
  if (results instanceof MacosError) {
    throw results;
  }

  if (results.length === 0) {
    throw "no xprotect entries?!";
  }
}

main();
