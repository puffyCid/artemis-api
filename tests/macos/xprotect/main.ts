import { getXprotectDefinitions } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";

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
