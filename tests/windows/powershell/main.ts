import { WindowsError } from "../../../src/windows/errors.ts";
import { powershellHistory } from "../../../src/windows/powershell.ts";

function main() {
  const results = powershellHistory();
  if (results instanceof WindowsError) {
    throw results;
  }
  if (Array.isArray(results) && results.length === 0) {
    throw "no entries?";
  }
}

main();
