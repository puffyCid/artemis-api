import { LinuxError } from "../../../src/linux/errors";
import { listSnaps } from "../../../src/linux/snap";

function main() {
  const results = listSnaps();
  if (results instanceof LinuxError) {
    throw results;
  }
}

main();
