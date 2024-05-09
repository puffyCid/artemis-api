import { quarantineEvents } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

function main() {
  const data = quarantineEvents();
  if (data instanceof MacosError && !data.message.includes("no such table")) {
    throw data;
  }
}

main();
