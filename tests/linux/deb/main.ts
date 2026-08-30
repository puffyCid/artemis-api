import { getDebInfo } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testDebInfo } from "../../test";

function main() {
  console.log('Running DEB tests....');
  console.log(' Starting live test....');
  const results = getDebInfo();
  if (results instanceof LinuxError) {
    throw results;
  }

  if (results[ 0 ]?.name === "") {
    throw "got package with no name?";
  }

  console.log(' Live test passed! 🥳\n');

  console.log(' Starting DEB info test....');
  testDebInfo();

  console.log(' DEB info test passed! 🥳');
  console.log('All DEB tests passed! 🥳💃🕺');
}

main();
