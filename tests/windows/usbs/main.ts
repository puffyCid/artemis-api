import { listUsbDevices } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";

function main() {
  console.log('Running Windows USB devices tests....');
  console.log(' Starting live test....');
  const results = listUsbDevices();

  if (results instanceof WindowsError) {
    throw results;
  }
  console.log(' Live test passed! 🥳\n');
  console.log('All Windows USB devices tests passed! 🥳💃🕺');
}

main();
