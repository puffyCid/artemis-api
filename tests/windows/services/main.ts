import { serviceInstalls } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testServiceInstalls } from "../../test";

function main() {
    console.log('Running Windows Service install tests....');
    console.log(' Starting live test....');
    const results = serviceInstalls();
    if (results instanceof WindowsError) {
      throw results;
    }
    console.log(' Live test passed! 🥳\n');
  
    console.log(' Starting Windows Service install test....');
    testServiceInstalls();
  
    console.log(' Windows Service install test passed! 🥳');
    console.log('All Windows Service install tests passed! 🥳💃🕺');
}

main();
