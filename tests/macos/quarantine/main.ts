import { quarantineEvents } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

function main() {
  const data = quarantineEvents();
  if (data instanceof MacosError) {
    throw data;
  }

  if (data.length === 0) {
    throw "no results!";
  }
}

main();
