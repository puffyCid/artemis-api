import { firewallStatus } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

function main() {
  const results = firewallStatus();
  if (results instanceof MacosError) {
    throw results;
  }

  if (results.version.length === 0) {
    throw "no version?";
  }
}

main();
