import { getRunKeys } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testGetRunKeys } from "../../test";

function main() {
    console.log('Running Windows Registry Run Key tests....');
    console.log(' Starting live test....');
    const results = getRunKeys();
    if (results instanceof WindowsError) {
      throw results;
    }
    console.log(' Live test passed! 🥳\n');
  
    console.log(' Starting Windows Registry Run Key test....');
    testGetRunKeys();
  
    console.log(' Windows Registry Run Key test passed! 🥳');
    console.log('All Windows Registry Run Key tests passed! 🥳💃🕺');
}

main();
