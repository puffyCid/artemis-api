import { WindowsError } from "../../../src/windows/errors";
import { powershellHistory } from "../../../src/windows/powershell";

function main() {
  const results = powershellHistory();
  if (results instanceof WindowsError) {
    throw results;
  }
}

main();
