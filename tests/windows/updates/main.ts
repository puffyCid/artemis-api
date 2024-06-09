import { WindowsError } from "../../../src/windows/errors.ts";
import { Updates } from "../../../src/windows/ese/updates.ts";

function main() {
  const client = new Updates();
  const results = client.updateHistory(client.pages);

  if (results instanceof WindowsError) {
    throw results;
  }
  if (results.length === 0) {
    throw "no entries?";
  }
}

main();
