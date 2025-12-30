import { WindowsError } from "../../../src/windows/errors";
import { Updates } from "../../../src/windows/ese/updates";

function main() {
  const client = new Updates();
  console.log('Running Windows Update History tests....');
  console.log(' Starting live test....');
  const results = client.updateHistory(client.pages);

  if (results instanceof WindowsError) {
    if (results.message.includes("Table name is empty")) {
      return;
    }

    throw results;
  }
  console.log(' Live test passed! 🥳\n');
  console.log('All Windows Update History tests passed! 🥳💃🕺');

}

main();
