import { WindowsError } from "../../../src/windows/errors.ts";
import { Updates } from "../../../src/windows/ese/updates.ts";

function main() {
  const client = new Updates();
  const results = client.updateHistory(client.pages);

  if (results instanceof WindowsError) {
    if (results.message.includes("Table name is empty")) {
      return;
    }

    throw results;
  }
  if (results.length === 0) {
    throw "no entries?";
  }
}

main();
