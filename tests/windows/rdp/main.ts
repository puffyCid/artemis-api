import { WindowsError } from "../../../src/windows/errors";
import { rdpLogons } from "../../../src/windows/eventlogs/rdp";
import { testRdpLogons } from "../../test";

function main() {
    console.log('Running Windows RDP Logons tests....');
    console.log(' Starting live test....');
    const results = rdpLogons();
    if (results instanceof WindowsError) {
      throw results;
    }
    console.log(' Live test passed! 🥳\n');
  
    console.log(' Starting Windows RDP Logons test....');
    testRdpLogons();
  
    console.log(' Windows RDP Logons test passed! 🥳');
    console.log('All Windows RDP Logons tests passed! 🥳💃🕺');
}

main();
