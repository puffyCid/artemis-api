import { WindowsError } from "../../../src/windows/errors";
import { getChocolateyInfo } from "../../../src/windows/chocolatey";

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
