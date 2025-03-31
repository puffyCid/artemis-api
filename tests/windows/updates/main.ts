import { WindowsError } from "../../../src/windows/errors";
import { Updates } from "../../../src/windows/ese/updates";

function main() {
  const client = new Updates();
  const results = client.updateHistory(client.pages);

  if (results instanceof WindowsError) {
    if (results.message.includes("Table name is empty")) {
      return;
    }

    throw results;
  }
}

main();
