import { WindowsError } from "../../../src/windows/errors.ts";
import { getChocolateyInfo } from "../../../src/windows/chocolatey.ts";

function main() {
  const results = getChocolateyInfo();
  if (results instanceof WindowsError) {
    throw results;
  }
  if (results.length === 0) {
    throw "no entries?";
  }
}

main();
