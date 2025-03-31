import { quarantineEvents } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";

function main() {
  const data = quarantineEvents();
  if (data instanceof MacosError && !data.message.includes("no such table")) {
    throw data;
  }
}

main();
