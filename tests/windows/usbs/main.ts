import { listUsbDevices } from "../../../mod.ts";
import { WindowsError } from "../../../src/windows/errors.ts";

function main() {
  const results = listUsbDevices();

  if (results instanceof WindowsError) {
    throw results;
  }
  if (results.length === 0) {
    throw "no entries?";
  }
}

main();
