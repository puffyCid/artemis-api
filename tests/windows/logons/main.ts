import { WindowsError } from "../../../src/windows/errors";
import { logonsWindows } from "../../../src/windows/eventlogs/logons";
import { testLogonsWindows } from "../../test";

function main() {
  console.log('Running Windows Logons tests....');
  console.log(' Starting live test....');
  const results = logonsWindows("C:\\Windows\\System32\\winevt\\Logs\\Security.evtx");
  if (results instanceof WindowsError) {
    throw results;
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting Windows Logons test....');
  testLogonsWindows();

  console.log(' Windows Logons test passed! 🥳');
  console.log('All Windows Logons tests passed! 🥳💃🕺');
}

main();
