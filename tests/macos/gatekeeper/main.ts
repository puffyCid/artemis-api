import { gatekeeperEntries } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";

function main() {
  const results = gatekeeperEntries();
  if (results instanceof MacosError) {
    throw console.log(results);
  }

  if (results.length === 0) {
    throw "no entries?";
  }
}

main();
