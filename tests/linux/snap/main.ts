import { LinuxError } from "../../../src/linux/errors.ts";
import { listSnaps } from "../../../src/linux/snap.ts";

function main() {
  const results = listSnaps();
  if (results instanceof LinuxError) {
    throw results;
  }

  if (results[0].sequence[0].name === "") {
    throw "got snap with no name?";
  }
}

main();
