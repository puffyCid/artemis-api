import { getDebInfo } from "../../../mod.ts";
import { LinuxError } from "../../../src/linux/errors.ts";

function main() {
  const results = getDebInfo();
  if (results instanceof LinuxError) {
    throw results;
  }

  if (results[0].name === "") {
    throw "got package with no name?";
  }
}

main();
