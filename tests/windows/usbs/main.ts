import { listUsbDevices } from "../../../mod.ts";
import { WindowsError } from "../../../src/windows/errors.ts";

function main() {
  const results = listUsbDevices();

  if (results instanceof WindowsError) {
    throw results;
  }
}

main();
