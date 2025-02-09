import { LinuxError } from "../../../src/linux/errors.ts";
import { listSnaps } from "../../../src/linux/snap.ts";

function main() {
  const results = listSnaps();
  if (results instanceof LinuxError) {
    throw results;
  }
}

main();
