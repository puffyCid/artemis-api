import { WindowsError } from "../../../src/windows/errors";
import { powershellHistory, testPowerShellHistory } from "../../../src/windows/powershell";

function main() {
  console.log('Running PowerShell history tests....');
  console.log(' Starting live test....');
  const results = powershellHistory();
  if (results instanceof WindowsError) {
    throw results;
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting PowerShell history test....');
  testPowerShellHistory();

  console.log(' PowerShell history test passed! 🥳');
  console.log('All PowerShell history tests passed! 🥳💃🕺');
}

main();
