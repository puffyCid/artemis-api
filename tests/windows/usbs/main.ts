import { listUsbDevices } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";

function main() {
  const results = listUsbDevices();

  if (results instanceof WindowsError) {
    throw results;
  }
}

main();
