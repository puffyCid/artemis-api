import { getDebInfo } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";

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
