import { firewallStatus } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";

function main() {
  const results = firewallStatus();
  if (results instanceof MacosError) {
    throw results;
  }

  if (results[0].version.length === 0) {
    throw "no version?";
  }
}

main();
